import React, { useState, useEffect} from 'react'
import './Senatordatapage.css'
import { useParams } from 'react-router-dom'





const Senatordatapage = (props) => {
    const params = useParams()
    const id = params.id

    const [senator, set_senator] = useState({})
    const [trade_data, set_trade_data] = useState([])
    const [buttonText, set_following_button_text] = useState(['Follow senator'])

    useEffect(()=>{
        fetch("http://localhost:8000/get/senator/"+id+"",{
        method:"GET",
        headers:{"Content-Type":"application/json"},
        credentials: 'include',
        }).then(response =>{
            if(response.ok){
                return response.json()
            }
        }).then(data=>{
            set_senator(data)
        }).catch(err=>console.log(err))


        fetch("http://localhost:8000/get/senator_trades/"+id+"",{
        method:"GET",
        headers:{"Content-Type":"application/json"},
        credentials: 'include',
    }).then(response =>{
        if(response.ok){
            return response.json()
        }
    }).then(data=>{
        var d=[]
        for(var i of data){
            d.push([i])
        }
        set_trade_data(d)
    }).catch(err=>console.log(err))
  },[])

    function handleButton(){
        console.log("in here")
        fetch("http://localhost:8000/user/submit_payment",{
        method:"GET",
        headers:{"Content-Type":"application/json"},
        credentials: 'include',
    }).then(response =>{
        if(response.ok){
            return response.json()
        }
    })
    }

    function handleFollowBtn(){
        set_following_button_text('Following');
    }

    return (

    <div class='main'>
        <div className='senator-info'>
            <img src={require(`../../images/${id}.jpg`)} width="150" height="190"></img>
            {console.log(senator)}
            <h1 id='name'>{senator[0]!=undefined? senator[0].first_name : "" } {senator[0]!=undefined? senator[0].last_name: ""}</h1>
            <h2 id='party'>{senator[0]!=undefined?senator[0].party:""}</h2>
            <h3 id='state'>{senator[0]!=undefined?senator[0].state:""}</h3>
            <div className="button-div">
                <button onClick={handleButton} className='follow-button'>
                    Buy senator's stocks
                </button>
               
            </div>
            <div className="button-div second-button">
                <button onClick={handleFollowBtn} className='follow-button button2'>
                    {buttonText}
                </button>
        
            </div>
        </div>
        
       
        <div class="trade-container">
            <h2  className='mainheader' id="trade-data">Past Trade Data:</h2>
        <table className='main_table'>
            <tr>
                <th>Company Name</th>
                <th>Trade Date</th>
                <th>Trade Type</th>
                <th>Amount</th>
            </tr>
            {trade_data.map((i)=>{
                return(
                    <tr>
                        <td>{i[0].company_id}</td>
                        <td>{i[0].trade_date}</td>
                        <td>{i[0].trade_type}</td>
                        <td>{i[0].amount}</td>
                    </tr>
                )
            })}
        </table>
        </div>

        
    </div>
    

        
  )
}

export default Senatordatapage  