import React from 'react';
import './LoginPage.css'
import {useState, useEffect} from "react"
import {Link, useNavigate} from 'react-router-dom'


const LoginPage = () =>{
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // useEffect(()=>{
    //     fetch("http://localhost:8000/verify/",{
    //         method:"GET",
    //         headers:{"Content-Type":"application/json"},
    //         credentials: 'include'
    //     }).then(response =>{
    //         if(response.ok){
    //             setIsLoggedIn(true)
    //             return response.json()
    //         }
    //     }).catch(err => console.log(err))
    // },[])

    if(isLoggedIn){
        navigate("/mainpage")
    }

    const [userInput, setUserInput] = useState({
        email: "",
        password: ""
    })

    const handleLogin = async() =>{
        console.log(userInput)
        try{
            const endpoint = "http://localhost:8000/login/"
            const response = await fetch(endpoint, {
                method:"POST",
                headers: {"Content-Type":"application/json"},
                credentials: 'include',
                body: JSON.stringify(userInput)
            })
            if(response.ok){
                navigate({
                    pathname: "/mainpage"
                })
            }else{
                document.getElementById("ErrorText").innerHTML ="Email or Password did not match"
            }
        }catch{
            document.getElementById("ErrorText").innerHTML ="Email or Password did not match"
        }
    }
    const onTChange = event =>{
        setUserInput({...userInput, [event.target.name]: event.target.value})
    }

    const onEnterPress = event =>{
        if(event.key === 'Enter'){
            handleLogin()
        }
    }
    return(
        <div className = 'Background'>
            <p className='TitleText'>Login</p>
            <div className='LoginContainer'>
                <div className='EntryContainer'>
                    <p className='EntryText' >Email</p>
                    <input type="text" className='UserInput' onChange={onTChange} name = "email" id="email" onKeyUp={onEnterPress}></input>
                    <p className='EntryText'>Password</p>
                    <input type="password" className='UserInput' onChange={onTChange} name="password" id="password" onKeyUp={onEnterPress}></input>
                    <button className='LoginButton' onClick={handleLogin}>Login</button>
                    <p className="loginError" Id="ErrorText"></p>
                </div>
            </div>
            <a className='OppositeText'><Link to="/signup">Don’t have an account? Sign up here</Link></a>
        </div>
    )

}

export default LoginPage