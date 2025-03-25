// import s from "./Header.module.css"
import { useState } from "react";
import { Link, NavLink } from "react-router-dom"
export function Header() {
    let [token, setToken] = useState(localStorage.getItem('token'))
    console.log(token);

    return (
        <header>
            <Link to={'/'}>TODO LIST</Link>
            <nav>
                {token ?
                    <button onClick={() => { localStorage.removeItem('token'); setToken(null) }}>Log Out</button>
                    :
                    <>
                        <NavLink to={'/sign-up'}>Sign Up</NavLink>
                        <NavLink to={'/sign-in'}>Sign IN</NavLink>
                    </>
                }
            </nav>
        </header>
    )
};

