import React from 'react';

interface Props {
    entry : any
}

const tableColumn = (props : Props) => <td>{props.entry}</td>;

export default tableColumn;