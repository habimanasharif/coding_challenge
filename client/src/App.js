import react,{useEffect,useState} from 'react';
import "./App.css"
import Spinner from './Spinner';

function App() {
  //states
 const [sectors,setSectors]=useState([])
 const [status,setStatus] = useState(false)
 const [name,setName]=useState("")
 const[sector,setSector]=useState("")
 const [agreeTerms,setagreeTerms]=useState("")
 const [id,setUserId]=useState(undefined)

//use effect hook
  useEffect(() => {
    fetch('https://coding-challenge-api.vercel.app/sectors').then(responce => responce.json()).then(data=>setSectors(data))
  }, []);

  //save
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
        setStatus(true)
      const body = {name,sector:sector.replace(/^&nbsp;/, ''),agree_terms:agreeTerms,id };
      if(!name){
        setStatus(false)
        return alert('Please enter a name')
      } 
      if(!sector){
        setStatus(false)
        return alert('Please select a sector')
      }
      if(!agreeTerms){
        setStatus(false)
        return alert('You need to accept the terms first')
      }
      fetch("https://coding-challenge-api.vercel.app/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }).then(response => response.json())
      .then(data => {
        setStatus(false)
        if(!id){
          alert("Info added successfully")
        }
        else{
          alert("Info updated successfully")
        }
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
      <div className='form'>
        <h1>
       Please enter your name and pick the Sectors you are currently involved in.
       </h1>
       <div className='mt'>
       <label className='mt' htmlFor="">Name: </label>
      
      <input  className='input' value={name} onChange={(e)=>setName(e.target.value)} type="text"/>
      </div>
     <div className='mt'>
     <label  htmlFor=""> Sectors: </label> 
      <select className='input' size="6" value={sector} onChange={(e)=>setSector(e.target.value)}>
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
      </div>
      <div className='mt'>
      <input type="checkbox" onChange={(e)=>setagreeTerms(e.target.checked)}/> Agree to terms
      </div>
      <button class="btn mt" type="submit" value="Save" onClick={onSubmitForm}>{status ?(<><Spinner/> saving</>):("Save")} </button>
      </div>
    </div>
  );
}

export default App;
