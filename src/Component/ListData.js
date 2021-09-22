import React from 'react';
import TableNew from './TableNew';
import './Table.css';

function ListData({countriesData,convertnumber,setCountriesData,sortData}) {

    const handleSorts = function(e){
        const sortedList = sortData(countriesData,e.target.value)
        setCountriesData(sortedList);
    }
    
    return (
        <div className="outer"> 
            <table className="table" >
                
            <tr>
                    <td className="serialColumn"><button onClick={handleSorts}>#</button></td>
                    <td><button onClick={handleSorts} value="country">Country Name <i class="fas fa-sort-amount-down"></i> </button></td>
                    <td><button onClick={handleSorts} value="new">New Cases <i class="fas fa-sort-amount-down"></i></button></td>
                   

                    <td><button onClick={handleSorts} value="active" className="active">Active Cases <i class="fas fa-sort-amount-down"></i></button></td>
                    <td><button onClick={handleSorts} value="recovered" className="recoverd">Recovered Cases <i class="fas fa-sort-amount-down"></i></button></td>
                    <td><button onClick={handleSorts} value="deaths">Total Deaths <i class="fas fa-sort-amount-down"></i></button></td>
                </tr>
                {countriesData.map((country, index) => {
                    return (
                        <TableNew
                        

                            SNo={index + 1}
                            country={country.country}
                            newCases={convertnumber(country.cases.new != null ? country.cases.new : "+0")}
                            active={convertnumber(country.cases.active)}
                            recovered={convertnumber(country.cases.recovered)}
                            deaths={convertnumber(country.deaths.total)}
                        />
                    );
                })}
            </table>
        </div>
    );
}

export default ListData;