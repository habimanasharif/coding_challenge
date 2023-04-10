import React, { useEffect, useState } from 'react';
import './App.css';
import Spinner from './Spinner';
import SectorSelect from './SectorSelect';

function App() {
  //states
  const [sectors, setSectors] = useState([]);
  const [status, setStatus] = useState(false);
  const [name, setName] = useState('');
  const [sector, setSector] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [userId, setUserId] = useState(undefined);

//use effect hook
useEffect(() => {
  fetch('https://coding-challenge-api.vercel.app/sectors')
    .then((response) => response.json())
    .then((data) => setSectors(data));
}, []);

  //save
  const onSubmitForm = async (event) => {
    event.preventDefault();
    try {
      setStatus(true);
      const body = { name, sector, agree_terms: agreeTerms, id: userId };
      if (!name) {
        return alert('Please enter a name');
      }
      if (!sector) {
        return alert('Please select a sector');
      }
      if (!agreeTerms) {
        return alert('You need to accept the terms first');
      }
      const response = await fetch('https://coding-challenge-api.vercel.app/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      setStatus(false);
      if (!userId) {
        alert('Info added successfully');
      } else {
        alert('Info updated successfully');
      }
      setUserId(data.user_id);
      console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="App">
      <div className='form'>
      <h1>Please enter your name and pick the Sectors you are currently involved in.</h1>
        <form onSubmit={onSubmitForm}>
          <div className="mt">
            <label htmlFor="name">Name:</label>
            <input className="input" id="name" value={name} onChange={(event) => setName(event.target.value)} type="text" />
          </div>
          <div className="mt">
            <label htmlFor="sector">Sectors:</label>
            <SectorSelect sectors={sectors} value={sector} setSector={setSector} />
          </div>
          <div className="mt">
            <input id="agreeTerms" type="checkbox" checked={agreeTerms} onChange={(event) => setAgreeTerms(event.target.checked)} />
            <label htmlFor="agreeTerms">Agree to terms</label>
          </div>
      <button className="btn mt" type="submit" value="Save">{status ?(<><Spinner/> saving</>):("Save")} </button>
      </form>
      </div>
    </div>
  );
}

export default App;
