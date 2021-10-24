import React from 'react';

interface Props {
    children : any
}
const tableRaw = (props:Props) => <tr>{props.children}</tr>

export default tableRaw;