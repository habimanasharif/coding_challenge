import React from 'react';

function SectorSelect({ sectors, sector, setSector }) {
  const handleSectorChange = (e) => {
    const value = e.target.value.replaceAll('&nbsp;', '');
    console.log(value)
    setSector(value);
  };

  return (
    <select className='input-sector' size="6" value={sector} onChange={handleSectorChange}>
      {sectors && sectors.map((sector)=>{
        return(
          <React.Fragment key={sector.industryId}>
            <option value={sector.industryId} key={sector.industryId} >{sector.industry_name}</option>
            {sector.sectors.map((item)=>{
              return(<React.Fragment key={item.sector_id}>
                <option value={item.sector_id} key={item.sector_id}>&nbsp;&nbsp;&nbsp;&nbsp;{item.sector_name}</option>
                {item.sub_sectors&&item.sub_sectors.map((sub_item)=>{
                  return(< React.Fragment key={sub_item.sub_sectors_id}>
                    <option value={sub_item.sub_sectors_id} key={sub_item.sub_sectors_id}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{sub_item.sub_sectors_name}</option>
                    {sub_item.sub_sub_sectors.map((sub_sub_item)=>(< React.Fragment key={sub_sub_item.sector_id}>
                      <option value={sub_sub_item.sector_id} key={sub_sub_item.sector_id}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{sub_sub_item.sector_name}</option>
                    </React.Fragment>))}
                  </React.Fragment>)
                })}
              </React.Fragment>)
            })}
          </React.Fragment>
        );
      })}
    </select>
  );
}

export default SectorSelect;
