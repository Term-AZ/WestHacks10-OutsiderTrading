import React, { useState, useEffect} from 'react'
import './SenatorCardStyle.css'
import { Link } from 'react-router-dom';
import pelosi from './pelosi.jpeg'
const SenatorCard = () => {
    const [useIsDemocrat, setIsDemocrat] = useState(false);
    const [useIdType, setIdType] = useState('');

    useEffect(() => {
        setIdType(useIsDemocrat ? 'democrat' : 'republican');
      }, [useIsDemocrat]);
  return (
    <Link to="/senator-details" className='link'>
        <div className={'Card'+' '+useIdType}>
            <div className='image-container'>
                <img src={pelosi} width="150" height="190"></img>
            </div>
            <div className='senator-info'>
                <h2 id='name'>Nancy Pelosi</h2>
                <h3 id='party'>Democrat</h3>
                <h4 id='state'>New York</h4>
            </div>
        </div>
    </Link>
  )
}

export default SenatorCard