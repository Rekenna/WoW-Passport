import React from 'react'
import {Link} from 'react-router-dom'


export default function Result(result){
    return(
        <div className={`result`} key={`${result.realm}_${result.region}_${result.name}`}>
            <Link to={`/${result.region}/${result.realm}/character/${result.name.toLowerCase()}`}>
                <div className={`class-icon ${result.classIcon.replace(' ', '-')}`}></div>
                <span className={`name ${result.faction.toLowerCase()}`}>{result.name}</span><span className={`region`}>{result.region}</span><span className={`realm`}>{result.realm}</span>
            </Link>
        </div>
    );
}