import React from 'react';
import './Table.css';
import numeral from "numeral";

function Table({table,convertnumber}) {

    return (
        <div className="table">
           {
           table?.sort((a, b) => b.cases["1M_pop"] - a.cases["1M_pop"]).map((x) => (
               <tr>
                   <td>{x.country}</td>
                   <td>
                       <strong>{numeral(x.cases["1M_pop"]).format()}</strong>
                   </td>
               </tr>


           ))
    }
  
          
            
        </div>
    );
}

export default Table;