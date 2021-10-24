import React from 'react';

interface Props {
    show: boolean,
    clicked : () => void
}

const backDrop = (props:Props) => (
    props.show ? <div className= 'backDrop' onClick={props.clicked}></div> : null
);

export default backDrop;