import React ,{useState,useEffect}from 'react';
import './App.css';
import axios from 'axios';
import {MenuItem,FormControl,Select,Card,CardContent}from "@material-ui/core";
import Map from './Component/Map';
import InfoBox from './Component/InfoBox';
import Table from './Component/Table';
import World from './Component/World';
import LineGraph from './Component/LineGraph';
import numeral from "numeral";
function App() {
  const [countries,setCountries]=useState([]);
  const [country,setCountry]=useState("WorldWide");
  const[countryInfo,setcountryInfo]=useState({});
  const[cases,setCases]=useState("cases");
  const [table,setTable]=useState([]);
  const [tablecase,setTableCases]=useState([]);
  const [world,setWorld]=useState(null);

 

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
	    // console.log("response ", response);

      const mapped = response?.data?.response?.map(x => ({
        active: x.cases.active,
        new:x.cases.new,
        recovered:x.cases.recovered,
        total:x.cases.total,
        deaths_new: x.deaths.new,
        deaths_total:x.deaths.total,
      }))

      const getNum = x => isNaN(parseInt(x)) ? 0 : parseInt(x)

      console.log(mapped)
      const all = mapped.reduce((a, b) => {
        return {
        active: a.active + b.active,
        new: getNum(a.new) + getNum(b.new),
        recovered:a.recovered+b.recovered,
        total:a.total+b.total,
        deaths_new: getNum(a.deaths_new) + getNum(b.deaths_new),
        deaths_total:a.total+b.total,
        } 
      }, {
        active: 0,
        new:0,
        recovered:0,
        total:0,
        deaths_new: 0,
        deaths_total:0,
      })

setWorld(all)

      // {
      //   active
      //   total
      //   ...
      // }
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
              // console.log(response.data.response);
              setcountryInfo(response?.data?.response[0]);
              setCases(response?.data?.response[0]?.cases);
            }).catch(function (error) {
              console.error(error);
            });

          
        
    };
    const convertnumber = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";
  
 

  return (
    <div className="App">
      <div className="app__left">
      <div className="app__header">
       <div className="headercss">
          <img src={require('./assets/img/covidlogo.png').default} /> <h1>COVID-19 TRACKER</h1>
         </div> 
      

         <span className="selectcss"> <FormControl className="app_dropdown">
        <Select
        variant="outlined"
        onChange={onCountryChange}
        value={country}
    
        
        >
          <MenuItem value={country} >Select Country </MenuItem>
          {countries.map(key=><MenuItem value={key}>{key}</MenuItem>)}
          
        </Select>
        
        
        </FormControl></span>
      </div>

<div>
  {/* {JSON.stringify(world)} */}
 
  <div className="app_stats">
   

  <InfoBox  onClick={e=>setCases('cases')} title="Coronavirus 🦠 cases ⬆️ " cases={convertnumber(countryInfo?.cases?.new)}  total={convertnumber(countryInfo?.cases?.active)} />

 
       
       
   
        <InfoBox   onClick={e=>setCases('recovered')}   title="Recovered" cases={convertnumber(countryInfo?.cases?.recovered)}  total={convertnumber(countryInfo?.cases?.total)}/>
       
        
    
        <InfoBox onClick={e=>setCases('deaths')}  title="Deaths 🦴"  cases={convertnumber(countryInfo?.deaths?.new)}  total={convertnumber(countryInfo?.deaths?.total)} /> 
       
      </div>
      <hr/>
      <h1 style={{color:'white'}}>World Wide 🌎 Cases</h1>
  <World  world={world} convertnumber={convertnumber}/>
  <br/>
  <hr/>
  



</div>
      
     
      <Map/>
      </div>
     
    
    
     

      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <br/>
          <hr/>
      {/*table*/}
      <Table table={table.response} convertnumber={convertnumber} />
      <br/><br/><br/><hr/>
      <br/><br/>

      <h3>World Wide 🌎 </h3>
      <LineGraph  />
      </CardContent>
      </Card>
      
    
  
    </div>
  );
}

export default App;
