import React from 'react';
import { Link } from 'react-router-dom';
import s from './LandingPage.module.css'

export default function LandingPage(){
    return (
        <div className={s.container}>
        <div className={s.div}>
            <h1>¡Welcome chef!</h1>
            <Link to = '/home'>
                <button className = {s.btn}>Go in</button>
            </Link>
        </div>
        </div>
    )
}

