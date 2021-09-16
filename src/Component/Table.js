import React from 'react';
import './Table.css';

function Table({table}) {

    return (
        <div className="table">
           {
           table?.sort((a, b) => b.cases["1M_pop"] - a.cases["1M_pop"]).map((x) => (
               <tr>
                   <td>{x.country}</td>
                   <td>
                       <strong>{x.cases["1M_pop"]}</strong>
                   </td>
               </tr>


           ))
    }
  
          
            
        </div>
    );
}

export default Table;