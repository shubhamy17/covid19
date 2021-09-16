import React ,{useState,useEffect}from 'react';
import './App.css';
import axios from 'axios';
import {MenuItem,FormControl,Select,Card,CardContent}from "@material-ui/core";
import Map from './Component/Map';
import InfoBox from './Component/InfoBox';
import Table from './Component/Table';
import { sortData } from './sort';
function App() {
  const [countries,setCountries]=useState([]);
  const [country,setCountry]=useState("WorldWide");
  const[countryInfo,setcountryInfo]=useState({});
  const[cases,setCases]=useState({});
  const [table,setTable]=useState([]);
  const [tablecase,setTableCases]=useState([]);

 

const   headers={
  'x-rapidapi-host': 'covid-193.p.rapidapi.com',
  'x-rapidapi-key': 'efbe52b8c8msh9d23e0bfc5a84dep191bc1jsn0e5905dfcf31'
}

  useEffect(() => {
    var axios = require("axios").default;

    var options = {
      method: 'GET',
      url: 'https://covid-193.p.rapidapi.com/countries',
      headers
    };
    
    axios.request(options).then(function (response) {
      // console.log(response.data.response);
     
      setCountries(response.data.response);
     
      // console.log(response.data);
    
    }).catch(function (error) {
      console.error(error);
    });
 
    },[setCountries]);

    useEffect(()=>{
      var axios = require("axios").default;

      var options = {
      method: 'GET',
      url: 'https://covid-193.p.rapidapi.com/statistics',
        headers
    };

      axios.request(options).then(function (response) {
	    console.log(response.data);
      // const sortedData=sortData(response.data);

      setTable(response.data);
      
      }).catch(function (error) {
	    console.error(error);
      });
    },[])






    const onCountryChange=async (event)=>{
      const countryCode=event.target.value;
    
      setCountry(countryCode);
              var axios = require("axios").default;

            var options = {
              method: 'GET',
              url: `https://covid-193.p.rapidapi.com/history?country=${countryCode}`,
            headers
            
            };

            axios.request(options).then(function (response) {
              setCountry(countryCode);
              console.log(response.data);
              setcountryInfo(response.data.response[0]);
              setCases(response.data.response[0].cases);
            }).catch(function (error) {
              console.error(error);
            });

          
        
    };
  
 

  return (
    <div className="App">
      <div className="app__left">
      <div className="app__header">
      <h1>COVID-19 TRACKER</h1>

      <FormControl className="app_dropdown">
        <Select
        variant="outlined"
        onChange={onCountryChange}
        value={country}
    
        
        >
          {/* <MenuItem value={country}>WorldWide</MenuItem> */}
          {countries.map(key=><MenuItem value={key}>{key}</MenuItem>)}
          
        </Select>
        
        
        </FormControl>
      </div>

      <div className="app_stats">
         <InfoBox title="Coronavirus cases" cases={countryInfo?.cases?.new}  total={countryInfo?.cases?.active} />
        <InfoBox  title="Recovered" cases={countryInfo?.cases?.recovered}  total={countryInfo?.cases?.total}/>
        <InfoBox  title="Deaths"  cases={countryInfo?.deaths?.new}  total={countryInfo?.deaths?.total} /> 
      </div>
     
      <Map/>
      </div>
     
    
    
     

      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
      {/*table*/}
      <Table table={table.response} />
      <h3>WorldWide new</h3>
      {/*graph*/}
      </CardContent>
      </Card>
      
    
  
    </div>
  );
}

export default App;
