import React from 'react';

const LadderListItem = ({ id , name , pos, index }) => (
    <div>
        <h3>{index+1} . {name}</h3>
    </div>
)

export default LadderListItem