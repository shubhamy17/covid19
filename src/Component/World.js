import React from 'react';
import './Info.css';
import {Card,CardContent,Typography}from "@material-ui/core";
import NewCard from './NewCard';
;

function World({title,world,convertnumber}) {
    return (
        <div>
            <div className="infoBox">
               {/*+120k Number of cases*/}
               <div className="newcardcontainer">
                    <NewCard title="New Cases ⬆️" desc={convertnumber(world?.new)}/>
                    <NewCard title="Active cases 🤒" desc={convertnumber(world?.active)}/>
                    <NewCard title="Recovered 💪🏻 " desc={convertnumber(world?.recovered)} recovery={1}/>
                    <NewCard title="Deaths 💀" desc={convertnumber(world?.deaths_new)}/>
               </div>

               <div className="newcardcontainer">
                    <NewCard title="Total Cases" desc={convertnumber(world?.total)} bigcard={1}/>
                    <NewCard title="Total Deaths" desc={convertnumber(world?.deaths_total)} bigcard={1} />
               </div>
             </div> 
        </div>
    );
}

export default World;