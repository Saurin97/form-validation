import React from 'react';

interface Props {
    id: string,
    type: string,
    name: string,
    placeholder: string,
    value : string | number,
    changed : any
}
const input = (props:Props) => {
    return (
        <input
            id = {props.id}
            type={props.type}
            name={props.name}
            placeholder={props.placeholder}
            onChange ={props.changed}
            value = {props.value}
            autoComplete="off"
        />
    )
}

export default input;