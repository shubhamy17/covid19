import React from 'react';
import './Info.css';
import {Card,CardContent,Typography}from "@material-ui/core";
// import numeral from "numeral";

function World({title,world,convertnumber}) {
    return (
        <div>
            <Card className="infoBox">
           <CardContent>
               <Typography  className="infobox__title" color="textSecondary">
                 {title}
               </Typography>
                    
               {/*+120k Number of cases*/}
               <h3>New cases</h3>
               <h2 className="infobox__cases">{convertnumber(world?.new)}</h2>
               <h3>Active cases</h3>
               <h2 className="infobox__cases">{convertnumber(world?.active)}</h2>
               <h3>Recovered cases</h3>
               <h2 className="infobox__cases_recovery">{convertnumber(world?.recovered)}</h2>
               <h3>New Deaths cases</h3>
               <h2 className="infobox__cases">{convertnumber(world?.deaths_new)}</h2>

               {/*1.2M total*/}
               <Typography className="infobox__total" color="textSecondary">
                      Total Cases :{convertnumber(world?.total)}
                      <br/>
                      Total Deaths:{convertnumber(world?.deaths_total)}
               </Typography>



            </CardContent>


       </Card>
            
        </div>
    );
}

export default World;