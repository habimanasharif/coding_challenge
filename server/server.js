const express = require('express')
const path = require('path');
const db = require('./db')
const cors =require ('cors');
const bodyParser = require('body-parser')
//Getting sector controller
const getSectors=async (req,res)=>{
    try {
        
      
   const industries= await db.query('SELECT * from sector where parent_sector is null');
     result=  Promise.all(industries.rows.map(async(industry)=>{
        let sectors= await db.query(`SELECT * from sector where parent_sector =${industry.sector_id}`);
        let sector_result= Promise.all(sectors.rows.map(async(sector)=>{
            let sub_sectors= await db.query(`SELECT * from sector where parent_sector =${sector.sector_id}`);
            
              if(!sub_sectors.rows.length){
                return {
                    sector_id:sector.sector_id,
                    sector_name:sector.sector_name,
                    sub_sectors: []
                  }
              }
              let sub_sector_result=Promise.all(sub_sectors.rows.map(async(sub_sector)=>{
                let sub_sub_sectors= await db.query(`SELECT * from sector where parent_sector =${sub_sector.sector_id}`)
                  
                    return {
                        sub_sectors_id:sub_sector.sector_id,
                        sub_sectors_name:sub_sector.sector_name,
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
            industryId:industry.sector_id,
            industry_name:industry.sector_name,
            sectors:await sector_result
        }
     }))

      res.send(await result)
    } catch (error) {
        res.send(error)
      }
}


//Adding User Controller
const addUser=async(req,res)=>{
    try {
        
    
    const {id,name,sector,agree_terms}=req.body
    let result
    if(!id){
   result=await db.query("INSERT INTO users (userName,userSector,agreeTerms) values($1,$2,$3) RETURNING *",[name,sector,agree_terms])
  }
   else{
     result=await db.query("UPDATE users SET username = $2, usersector = $3, agreeterms = $4 WHERE userid = $1 RETURNING *",[id,name,sector,agree_terms])
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