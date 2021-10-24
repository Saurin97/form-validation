import React from 'react';

interface Props {
    clicked : () => void
}

const deleteIcon = (props: Props) => (
    <svg viewBox="0 0 384 384" className='svg-icon danger' onClick ={props.clicked}>
		<g>
			<path d="M64,341.333C64,364.907,83.093,384,106.667,384h170.667C300.907,384,320,364.907,320,341.333v-256H64V341.333z"/>
			<polygon points="266.667,21.333 245.333,0 138.667,0 117.333,21.333 42.667,21.333 42.667,64 341.333,64 341.333,21.333"/>
		</g>
</svg> 
)

export default deleteIcon;