import React from 'react'
import './NewCard.css'
function NewCard({title, desc, recovery, bigcard }) {
    return (
        <div className={bigcard? "bigcardhai Card mybg":"Card mybg"}>
            <h2 >{title}</h2>    
            <h1 className={recovery ? "infobox__cases_recovery_world":"infobox__cases"}>{desc}</h1>
            
        </div>
    )
}


export default NewCard
