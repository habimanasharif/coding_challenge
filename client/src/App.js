import react,{useEffect,useState} from 'react';

function App() {
 const [sectors,setSectors]=useState([])
  useEffect(() => {
    fetch('https://coding-challenge-api.vercel.app/sectors').then(responce => responce.json()).then(data=>setSectors(data))
  }, []);
  return (
    <div className="App">
       Please enter your name and pick the Sectors you are currently involved in.
      <br/>
      <br/>
      Name: 
      <input type="text"/>
      <br/>
      <br/>
      Sectors: 
      <select multiple="" size="5">
        {sectors && sectors.map((sector)=>{
          return(
            <>
          <option value={sector.industryId} key={`${sector.industry_name}-${sector.industryId}`}>{sector.industry_name}</option>
            {sector.sectors.map((item)=>{
              return(<>
                  <option value={item.sector_id} key={`${item.sector_name}-${item.sector_id}`}>&nbsp;&nbsp;&nbsp;&nbsp;{item.sector_name}</option>
                  {item.sub_sectors&&item.sub_sectors.map((sub_item)=>{
                    return(<>
                    <option value={sub_item.sub_sector_id} key={`${sub_item.sub_sector_name}-${sub_item.sub_sector_id}`}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{sub_item.sub_sectors_name}</option>
                  {sub_item.sub_sub_sectors.map((sub_sub_item)=>(<>
                    <option value={sub_sub_item.sub_sub_sector_id} key={`${sub_sub_item.sub_sub_sector_name}-${sub_sub_item.sub_sub_sector_id}`}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{sub_sub_item.sub_sub_sector_name}</option>
                  </>))}
                  </>)})}
              </>)
            })} 
          </>
          )

        })}
      </select>
      <br/>
      <br/>
      <input type="checkbox"/> Agree to terms
      <br/>
      <br/>
      <input type="submit" value="Save"></input>
    </div>
  );
}

export default App;
