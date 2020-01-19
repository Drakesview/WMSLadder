import React from 'react';

const LadderListItem = ({ id , name, pos, index }) => (
    <div>
        <h3>{pos} . {name}</h3>
    </div>
)

export default LadderListItem