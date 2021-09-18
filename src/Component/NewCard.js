import React from 'react'
import './NewCard.css'
function NewCard({title, desc, recovery, bigcard }) {
    return (
        <div className={bigcard? "bigcardhai Card mybg":"Card mybg"}>
          
            
            <h2 >{title}</h2>
            {/* <img src="https://elegant-hermann-b02c50.netlify.app/static/wallpaper2-50ab8e7c6285c1faf7b9622e76651892.jpg" alt={title} /> */}
            
            <h1 className={recovery ? "infobox__cases_recovery":"infobox__cases"}>{desc}</h1>
            
        </div>
    )
}


export default NewCard
