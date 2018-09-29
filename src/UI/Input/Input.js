import React from 'react';

const input= (props)=>{
    return(
<input
autoComplete="off"
style={props.styles}
placeholder={props.placeholder}
type={props.type}
value={props.value}
onChange={props.changed}
></input>)}

export default input;

