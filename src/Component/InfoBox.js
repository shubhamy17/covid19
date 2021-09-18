import React from 'react';
import './Info.css';
import {Card,CardContent,Typography}from "@material-ui/core";

function InfoBox({title,cases,active,red,total,...props}) {
    return (
       <Card onClick={props.onClick} className={`infobox ${active && "infobox--selected"} ${red && "infobox--red"}`}>
           <CardContent>
               {/*title*/}
               <Typography  className="infobox__title" color="textSecondary">
                    {title}
               </Typography>

               {/*+120k Number of cases*/}
               <h2 className="infobox__cases_recovery">{cases}</h2>

               {/*1.2M total*/}
               <Typography className="infobox__total" color="textSecondary">
                      {total} Total
               </Typography>



            </CardContent>


       </Card>
    )
}

export default InfoBox
