import React from 'react';
import './Table.css';

function Table({table}) {
    // console.log( table?.sort((a, b) => b.cases["1M_pop"] - a.cases["1M_pop"]).map(x => x.cases["1M_pop"]))
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
    {/* {console.log(table.cases)} */}
          
            
        </div>
    );
}

export default Table;