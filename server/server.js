const express = require('express')
const path = require('path');
const db = require('./db.js')

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

    const app = express()
    
    app.get('/sectors', getSectors);
    app.get('/', (req, res) => {
        res.send('pong 🏓')
    })

    const port = process.env.PORT || 8080

    app.listen(port, (err, res) => {
        if (err) {
            console.log(err)
            return res.status(500).send(err.message)
        } else {
            console.log('[INFO] Server Running on port:', port)
        }
    })