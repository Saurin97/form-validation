import React,{Fragment} from 'react';
import BackDrop from '../ui/backDrop/backDrop';
interface model {
    show : boolean,
    children : any
    modelClosed : () => void
}
const model = (props : model) => (
    <Fragment>
    <BackDrop show ={props.show} clicked ={props.modelClosed} />
    <div className='modal'
        style = {{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0'
        }}
    >
        {props.children}
    </div>
    </Fragment>
)

export default model;