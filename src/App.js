import React ,{useState,useEffect}from 'react';
import './App.css';
import axios from 'axios';
import {MenuItem,FormControl,Select,Card,CardContent}from "@material-ui/core";
import Map from './Component/Map';
import InfoBox from './Component/InfoBox';
function App() {
  const [countries,setCountries]=useState([]);
  const [country,setCountry]=useState("");
  const[countryInfo,setcountryInfo]=useState({});
  const[cases,setCases]=useState({});
  useEffect(() => {
    var axios = require("axios").default;

    var options = {
      method: 'GET',
      url: 'https://covid-193.p.rapidapi.com/countries',
      headers: {
        'x-rapidapi-host': 'covid-193.p.rapidapi.com',
        'x-rapidapi-key': 'efbe52b8c8msh9d23e0bfc5a84dep191bc1jsn0e5905dfcf31'
      }
    };
    
    axios.request(options).then(function (response) {
      // console.log(response.data.response);
     
      setCountries(response.data.response);
    
    }).catch(function (error) {
      console.error(error);
    });
 
    },[setCountries]);

    const onCountryChange=async (event)=>{
      const countryCode=event.target.value;
    
      setCountry(countryCode);
              var axios = require("axios").default;

            var options = {
              method: 'GET',
              url: `https://covid-193.p.rapidapi.com/history?country=${countryCode}`,
            
              headers: {
                'x-rapidapi-host': 'covid-193.p.rapidapi.com',
                'x-rapidapi-key': 'efbe52b8c8msh9d23e0bfc5a84dep191bc1jsn0e5905dfcf31'
              }
            };

            axios.request(options).then(function (response) {
              console.log(response.data.response[0]);
              // setCountry()
              setCountry(countryCode);
              console.log(response.data.response[0]);
              // setCountry(response.data.parameters.country);
              setcountryInfo(response.data.response[0]);
              setCases(response.data.response[0].cases)
            }).catch(function (error) {
              console.error(error);
            });

          
        
    };
  
 

// var axios = require("axios").default;

// var options = {
//   method: 'GET',
//   url: 'https://covid-193.p.rapidapi.com/history',
//   params: {country: 'usa'},
//   headers: {
//     'x-rapidapi-host': 'covid-193.p.rapidapi.com',
//     'x-rapidapi-key': 'efbe52b8c8msh9d23e0bfc5a84dep191bc1jsn0e5905dfcf31'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });

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
        <InfoBox title="Coronavirus cases" cases={countryInfo.cases.new}  total={countryInfo.cases.active} />
        <InfoBox  title="Recovered" cases={countryInfo.cases.recovered}  total={countryInfo.cases.total}/>
        <InfoBox  title="Deaths"  cases={countryInfo.deaths.new}  total={countryInfo.deaths.total} />
      </div>
     
      <Map/>
      </div>
     
    
    
     

      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
      {/*table*/}
      <h3>WorldWide new</h3>
      {/*graph*/}
      </CardContent>
      </Card>
      
    
  
    </div>
  );
}

export default App;
