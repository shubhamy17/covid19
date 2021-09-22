import React ,{useState,useEffect}from 'react';
import './App.css';
import axios from 'axios';
import {MenuItem,FormControl,Select,Card,CardContent}from "@material-ui/core";
import InfoBox from './Component/InfoBox';
import World from './Component/World';
import LineGraph from './Component/LineGraph';
import numeral from "numeral";
import {sortData} from "./utils";
import ListData from './Component/ListData';

function App() {
  const [countries,setCountries]=useState([]);
  const [country,setCountry]=useState("WorldWide");
  const[countryInfo,setcountryInfo]=useState({});
  const[cases,setCases]=useState("cases");
  const [table,setTable]=useState([]);
  const [tablecase,setTableCases]=useState([]);
  const [world,setWorld]=useState(null);
  const [countriesData, setCountriesData] = useState([]);

  
  const   headers={
      'x-rapidapi-host': 'covid-193.p.rapidapi.com',
      'x-rapidapi-key': 'efbe52b8c8msh9d23e0bfc5a84dep191bc1jsn0e5905dfcf31'
      }

      /*countery api */
  useEffect(() => {
    var axios = require("axios").default;

    var options = {
      method: 'GET',
      url: 'https://covid-193.p.rapidapi.com/countries',
      headers
    };
    
    axios.request(options).then(function (response) {
        setCountries(response.data.response);
    }).catch(function (error) {
      console.error(error);
    });
    },[setCountries]);
  
    // statistics country wise data
    useEffect(()=>{
      var axios = require("axios").default;

      var options = {
      method: 'GET',
      url: 'https://covid-193.p.rapidapi.com/statistics',
        headers
        
    };  

      // Add all data and create world wide cases
      axios.request(options).then(function (response) {
	      const mapped = response?.data?.response?.map(x => ({
        active: x.cases.active,
        new:x.cases.new,
        recovered:x.cases.recovered,
        total:x.cases.total,
        deaths_new: x.deaths.new,
        deaths_total:x.deaths.total,
      }))
    
      const getNum = x => isNaN(parseInt(x)) ? 0 : parseInt(x)
      // console.log(mapped)
      const all = mapped.reduce((a, b) => {
        return {
        active: a.active + b.active,
        new: getNum(a.new) + getNum(b.new),
        recovered:a.recovered+b.recovered,
        total:a.total+b.total,
        deaths_new: getNum(a.deaths_new) + getNum(b.deaths_new),
        deaths_total:a.deaths_total+b.deaths_total,
        } 
      }, {
        active: 0,
        new:0,
        recovered:0,
        total:0,
        deaths_new: 0,
        deaths_total:0,
      })
      // console.log(all);
      setWorld(all);
      setTable(response.data);
     
      }).catch(function (error) {
	    console.error(error);
      });
      

    },[])

    useEffect(() => {
      const getAllCountries = async () => {
          const countriesList = await fetch(
              "https://covid-193.p.rapidapi.com/statistics",
              {
                  method: "GET",
                  headers
              }
          )
              .then((response) => {
                  return response.json();
              })
              .then((data) => data.response)
              .catch((err) => {
                  console.log("error oh no error");
                  console.error(err);
              });

          const sortedCountriesData = sortData(countriesList);
          setCountriesData(sortedCountriesData);
        
      };
      getAllCountries();
  },[]);


    // Function change data country wise seleted
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
                       <img src={require('./assets/img/covidlogo.png').default} /> <h1>COVID-19 TRACKER </h1>
                    </div> 
      
                    <span  span className="selectcss"> 
                    <FormControl className="app_dropdown">
                      <Select variant="outlined" onChange={onCountryChange} value={country}>
                          <MenuItem value={country} >Select Country </MenuItem>
                             {countries.map(key=><MenuItem value={key}>{key}</MenuItem>)}
                      </Select>
                    </FormControl>
                    </span>
                 </div>

        <div>

          <div className="app_stats">
              <InfoBox   title="Coronavirus 🦠 cases ⬆️ " cases={convertnumber(countryInfo?.cases?.new)}  total={convertnumber(countryInfo?.cases?.active)} />
              <InfoBox   className="infobox__cases--green"  title="Recovered 💪🏻" cases={convertnumber(countryInfo?.cases?.recovered)}  total={convertnumber(countryInfo?.cases?.total)}/>
               <InfoBox title="Deaths 💀"  cases={convertnumber(countryInfo?.deaths?.new)}  total={convertnumber(countryInfo?.deaths?.total)} /> 
           </div>
             <hr/>
             <h2 style={{color:'white'}}>World Wide 🌎 Cases</h2>
              <World  world={world} convertnumber={convertnumber}/>
              <br/>
              <hr/>
            </div>
            <br/>
            <h3>Country Wise Data</h3>
            <br/>
            <div className="tableHead">

                <ListData countriesData={countriesData} convertnumber={convertnumber}  setCountriesData={setCountriesData} sortData={sortData}/>
               
                
            </div>
            <br/><hr/>
               <br/><br/>
     
            <h3>World Wide 🌎 </h3>
        <LineGraph  />
        </div>
      <Card className="app_right">
      </Card>
     
    </div>
  );
}

export default App;
