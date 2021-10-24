import React from 'react';
import { NavLink } from 'react-router-dom';
interface Props {
    username : string | null,
    userLogoutHandle : () => void,
    showModel : boolean,
    closeModelHandle : () => void,
    confirmLogout : () => void,
}

const header:any = (props:Props) => {
    let navbar:any = '';
    const isUserLogin = localStorage.getItem('isUserLogIn');
    const userName = localStorage.getItem('userName');
    if (isUserLogin) {
        navbar = <div className='navbar'>
                    <ul className='nav-list'>
                        <li className='nav-item'>Welcome {userName}</li>
                        <li className='nav-item'>
                            <NavLink to='/users' exact className='nav-link'>table Data</NavLink>
                        </li>
                        <li className='nav-item logout-btn' onClick={props.userLogoutHandle}>logout</li>
                    </ul>
                </div>;
    }
    
    return (
        <header>
            <nav className='full-height'>
                <div className= 'container flex justify-between full-height'>
                    <div className='logo flex'>
                        <svg height="25" viewBox="0 0 512 512" width="25">
                            <path d="m346 120h96.211l-111.211-111.211v96.211c0 8.276 6.724 15 15 15z"/>
                            <path d="m106 512h300c24.814 0 45-20.186 45-45v-317h-105c-24.814 0-45-20.186-45-45v-105h-195c-24.814 0-45 20.186-45 45v422c0 24.814 20.186 45 45 45zm90-271h150c8.291 0 15 6.709 15 15s-6.709 15-15 15h-150c-8.291 0-15-6.709-15-15s6.709-15 15-15zm0 60h150c8.291 0 15 6.709 15 15s-6.709 15-15 15h-150c-8.291 0-15-6.709-15-15s6.709-15 15-15zm0 60h150c8.291 0 15 6.709 15 15s-6.709 15-15 15h-150c-8.291 0-15-6.709-15-15s6.709-15 15-15zm-60-120c8.284 0 15 6.716 15 15s-6.716 15-15 15-15-6.716-15-15 6.716-15 15-15zm0 60c8.284 0 15 6.716 15 15s-6.716 15-15 15-15-6.716-15-15 6.716-15 15-15zm0 60c8.284 0 15 6.716 15 15s-6.716 15-15 15-15-6.716-15-15 6.716-15 15-15z"/>
                        </svg>
                        <span className='font-bold'>UserData</span>
                    </div>
                    {navbar}
                </div>
            </nav>
        </header>
    )
}

export default header;