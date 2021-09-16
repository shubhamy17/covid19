import React from 'react';
import {Card,CardContent,Typography}from "@material-ui/core";

function World({title,world}) {
    return (
        <div>
            <Card className="infoBox">
           <CardContent>
               <Typography  className="infobox__title" color="textSecondary">
                 {title}
               </Typography>
                    
               {/*+120k Number of cases*/}
               <h1>New cases</h1>
               <h2 className="infobox__cases">{world?.new}</h2>
               <h1>Active cases</h1>
               <h2 className="infobox__cases">{world?.active}</h2>
               <h1>Recovered cases</h1>
               <h2 className="infobox__cases">{world?.recovered}</h2>
               <h1>New Deaths cases</h1>
               <h2 className="infobox__cases">{world?.deaths_new}</h2>

               {/*1.2M total*/}
               <Typography className="infobox__total" color="textSecondary">
                      Total Cases :{world?.total}
                      <br/>
                      Total Deaths:{world?.deaths_total}
               </Typography>



            </CardContent>


       </Card>
            
        </div>
    );
}

export default World;