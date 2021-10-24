import React from 'react';

interface Props {
    children : string,
    clicked? : () => void
}

const button = (props:Props) => (
    <button className='button' onClick={props.clicked}>{props.children}</button> 
)

export default button;