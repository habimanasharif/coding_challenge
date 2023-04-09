import react,{useEffect,useState} from 'react';

function App() {
 const [sectors,setSectors]=useState([])
 const [name,setName]=useState("")
 const[sector,setSector]=useState("")
 const [agreeTerms,setagreeTerms]=useState("")
 const [id,setUserId]=useState(undefined)
  useEffect(() => {
    fetch('https://coding-challenge-api.vercel.app/sectors').then(responce => responce.json()).then(data=>setSectors(data))
  }, []);
  const onSubmitForm = async e => {
    e.preventDefault();
    try {

      const body = {name,sector:sector.replace(/^&nbsp;/, ''),agree_terms:agreeTerms,id };
       fetch("https://coding-challenge-api.vercel.app/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }).then(response => response.json())
      .then(data => {
        setUserId(data.user_id)
        console.log(data)
      })
      .catch(error => console.error(error));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="App">
       Please enter your name and pick the Sectors you are currently involved in.
      <br/>
      <br/>
      Name: 
      <input  value={name} onChange={(e)=>setName(e.target.value)} type="text"/>
      <br/>
      <br/>
      Sectors: 
      <select  size="5" value={sector} onChange={(e)=>setSector(e.target.value)}>
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
      <input type="checkbox" onChange={(e)=>setagreeTerms(e.target.checked)}/> Agree to terms
      <br/>
      <br/>
      <input type="submit" value="Save" onClick={onSubmitForm}></input>
    </div>
  );
}

export default App;
