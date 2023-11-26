import React from 'react'
import './Portfolio.css'
import { useEffect, useState } from 'react'
import { Chart } from "react-google-charts";


const PortfolioPage = () => {
  const [graph_data,set_graph_data] = useState()
  const [investment, set_investment] = useState()
  const [following, set_following] = useState([])
  useEffect(()=>{
    fetch("/user/portfolio/history",{
        method:"GET",
        headers:{"Content-Type":"application/json"},
        credentials: 'include',
    }).then(response =>{
        if(response.ok){
            return response.json()
        }
    }).then(data=>{
        var d=[["Date","Investment Value"]]
        for(var i of data){

          d.push([i["history_date"].split('T')[0], i["investment_worth"]])
        }
        set_graph_data(d)

      
    }).catch(err=>console.log(err))
    
    fetch("/user/portfolio/netinvestment",{
        method:"GET",
        headers:{"Content-Type":"application/json"},
        credentials: 'include',
    }).then(response =>{
      if(response.ok){
          return response.json()
      }
  }).then(data=>{
      set_investment(data)
  }).catch(err=>console.log(err))
    
  fetch("/user/portfolio/following",{
    method:"GET",
    headers:{"Content-Type":"application/json"},
    credentials: 'include',
  }).then(response =>{
    if(response.ok){
        return response.json()
    }
  }).then(data=>{
    set_following(data)
  }).catch(err=>console.log(err))

  },[])
  
  const options = {
    chart: {
      title: "Investment Value",
      subtitle: "in $USD",
    },
    legend: { position: 'top', alignment: 'end' },
  };


  return (
    <div className='portfolio_background'>
      <div className='main_portfolio_container'>

        <div className='portfolio_header_container'>
          <h1 >
            OutsiderTrading
          </h1>
        </div>

        <div>
          <h1 >
              Your Portfolio
          </h1>
          <div className='portfolio_data_container'>
            <div className='portfolio_left'>

              <div className='portfolio_chart_container'>
                <Chart
                  chartType="Line"
                  width="100%"
                  height="69vh"
                  data={graph_data==null? [["Date","Investment Value"]]: graph_data}
                  options={options}
                />
              </div>
            </div>
            <div className='portfolio_right'>
              <h2>
                Following:
              </h2>
              <ul>
                {following.map((i)=>{
                  return(
                      <li>
                        {i.first_name} {i.last_name} 
                      </li>
                  )
                })}
              </ul>
            </div>
          </div>   
        </div>     
      </div>
    </div>
  )
}

export default PortfolioPage