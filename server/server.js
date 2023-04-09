const express = require('express')
const path = require('path');
const db = require('./db')
const cors =require ('cors');
const bodyParser = require('body-parser')

const getSectors=async (req,res)=>{
    try {
        
    
   const industries= await db.query('SELECT * from "industries"');
     result=  Promise.all(industries.rows.map(async(industry)=>{
        let sectors= await db.query(`SELECT * from "sector" where industry_id =${industry.industry_id}`);
        let sector_result= Promise.all(sectors.rows.map(async(sector)=>{
            let sub_sectors= await db.query(`SELECT * from "sub_sector" where sector_id =${sector.sector_id}`);
              if(!sub_sectors.rows.length){
                return {
                    sector_id:sector.sector_id,
                    sector_name:sector.sector_name,
                    sub_sectors: []
                  }
              }
              let sub_sector_result=Promise.all(sub_sectors.rows.map(async(sub_sector)=>{
                let sub_sub_sectors= await db.query(`SELECT * from "sub_sub_sector" where sub_sector_id =${sub_sector.sub_sector_id}`)
                  
                    return {
                        sub_sectors_id:sub_sector.sub_sector_id,
                        sub_sectors_name:sub_sector.sub_sector_name,
                        sub_sub_sectors: sub_sub_sectors.rows
                    }
               
                
              }))
               
              return {
                sector_id:sector.sector_id,
                sector_name:sector.sector_name,
                sub_sectors:await sub_sector_result
              }
        }))
        return{
            industryId:industry.industry_id,
            industry_name:industry.industry_name,
            sectors:await sector_result
        }
     }))

      res.send(await result)
    } catch (error) {
        res.send(error)
      }
}

const addUser=async(req,res)=>{
    try {
        
    
    const {id,name,sector,agree_terms}=req.body
    let result
    if(!id){
   result=await db.query("INSERT INTO users (user_name,user_sector,agree_terms) values($1,$2,$3) RETURNING *",[name,sector,agree_terms])
  }
   else{
     result=await db.query("UPDATE users SET user_name = $2, user_sector = $3, agree_terms = $4 WHERE user_id = $1 RETURNING *",[id,name,sector,agree_terms])
   }
   res.json(result.rows[0])
} catch (error) {
    res.send(error)   
}
}

    const app = express()
    app.enable('trust proxy');
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    
    app.get('/sectors', getSectors);
    app.get('/', (req, res) => {
        res.send('welcome 🏓')
    })
    app.post('/user',addUser)

    const port = process.env.PORT || 8080

    app.listen(port, (err, res) => {
        if (err) {
            console.log(err)
            return res.status(500).send(err.message)
        } else {
            console.log('[INFO] Server Running on port:', port)
        }
    })