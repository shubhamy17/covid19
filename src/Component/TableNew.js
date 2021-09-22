import React from 'react';
import "./TableNew.css";

function TableNew({SNo,country,newCases,active,recovered,deaths}) {
    return (
        <>
        <tr>
            <td>{SNo}</td>
            <td >{country}</td>
            <td>{newCases}</td>
            <td className="active">{active}</td>
            <td className="recovered">{recovered}</td>
            <td>{deaths}</td>
            
        </tr>
        </>
    )
}

export default TableNew