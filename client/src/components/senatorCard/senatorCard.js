import React, { useState, useEffect} from 'react'
import './SenatorCardStyle.css'
import { Link } from 'react-router-dom';
import pelosi from './pelosi.jpeg'


const SenatorCard = (props) => {
    console.log(props.props[0])
    const [useIsDemocrat, setIsDemocrat] = useState(props[3]=="Democrat"? true:false);
    const [useIdType, setIdType] = useState('');
    console.log(props.props[0])
    useEffect(() => {
        setIdType(useIsDemocrat ? 'democrat' : 'republican');
      }, [useIsDemocrat]);
  return (
    <Link to={'/senator/'+props.props[0]}  className='link'>
        <div className={'Card'+' '+useIdType}>
            <div className='image-container'>
                <img src={require(`../../images/${props.props[0]}.jpg`)} width="150" height="190"></img>
            </div>
            <div className='senator-info'>
                <h2 id='name'>{props.props[1]} {props.props[2]}</h2>
                <h3 id='party'>{props.props[3]}</h3>
                <h4 id='state'>{props.props[4]}</h4>
            </div>
        </div>
    </Link>
  )
}

export default SenatorCard