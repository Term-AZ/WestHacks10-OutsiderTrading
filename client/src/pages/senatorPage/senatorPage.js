import React from 'react'
import './SenatorPageStyle.css'
import Card from '../../components/senatorCard/SenatorCard.js'
import { useEffect, useState } from 'react'



const SenatorPage = () => {
  const [senators, set_senators] = useState([])

  useEffect(()=>{
    fetch("http://localhost:8000/get/senators",{
        method:"GET",
        headers:{"Content-Type":"application/json"},
        credentials: 'include',
    }).then(response =>{
        if(response.ok){
            return response.json()
        }
    }).then(data=>{
      var d =[]
      for(var i of data){
        d.push([i.id, i.first_name, i.last_name, i.party, i.state])
      }
      set_senators(d)
      
    }).catch(err=>console.log(err))
  },[])

  return (
    <div className="senator_page_main">

      
      <div className='page-container'>
          {senators.map((i)=>{
            return(
              <Card props={i} image={i.id}/>
            )
          })}
      </div>
    </div>
  )
}

export default SenatorPage