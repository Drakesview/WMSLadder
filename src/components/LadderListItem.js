import React from 'react';
import { Link } from 'react-router-dom'

const LadderListItem = ({ id , name, pos, index }) => (
    <Link className="ladder-item" to={'/profile/'+id}>
    <div>
        {pos === 1 ?  <h3 className="ladder-item__title"> {pos}</h3>: 
        <h3 className="ladder-item__title">{pos}</h3>
    }
    </div>
        {pos === 1 ?  <h3 className="ladder-item__data"> {name}</h3>: 
            <h3 className="ladder-item__data">{name}</h3>
        }   
    </Link>
)

export default LadderListItem