import React,{Component} from 'react';
import {Route,Switch,Link,BrowserRouter as Router} from 'react-router-dom'
import axios from 'axios';
let daysOfWeek=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
export default class Weather extends Component{
    constructor(props){
      super(props);
      this.state={
          onedayData:[],
          fiveDayData:[],
      }
    }
     onMouseClick=(place)=>{

    }
    // let apiKey=process.env.REACT_APP_API_KEY
      //api.openweathermap.org/data/2.5/weather?q=London,uk&APPID={apikey}
      // axios.get(`api.openweathermap.org/data/2.5/weather?APPID=${apiKey}`)
      //https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={YOUR API KEY}
      render(){
        return (
 
          <Router>  
          <div className='left'>
            <nav>
                <ul>
                  <li>
                  <Link to="/day"  style={this.props.style} onClick={()=>this.onMouseClick('5day')} >5 day Forecast</Link>
                </li>
                <li>
                  <Link to="/"  style={this.props.style} onClick={()=>this.onMouseClick('oneday')}>Hourly Forecast</Link>
                </li>
                 </ul>
            </nav>
            <Switch>
                <Route exact path="/day" component={FiveDays}>          
                </Route>
                <Route exact path="/" component={OneDay}>          
                </Route>
              
            </Switch>
           </div>
         </Router>
            );
      }
        
    } 

      class FiveDays extends Component {
        constructor(props){
          super(props);
          this.state={
                isloaded:false,
                fiveDayData:[]
                
          }
        }
        componentDidMount() {
      
          let apiKey=process.env.REACT_APP_API_KEY
          axios.headers={
 
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
         }
         //https://dataservice.accuweather.com/forecasts/v1/daily/5day/75094?apikey=${apiKey}
         axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=51.5085&lon=-0.1257&appid=${apiKey}`)
          .then(res => {
            const results = res.data;
         //   console.log("inside openweather map --------------------------------------")
          //   console.log(results)
              let items=[];
              let arrayList = results.daily;
              for(let i=0; i<5;i++){
                //  console.log(items[i].sectionName)
                items.push(arrayList[i]);
                }
                this.setState({fiveDayData:items});
                console.log("fiveDayData",this.state.fiveDayData);
                this.setState({isloaded:true})

          })
          .catch(error => {
            console.log('there is an eror', error)
          })
      
        }       
         render(){
          if(this.state.isloaded){
            return(
                  <div className='body'>
                    <h2>Forecast for Next 5 Days:<br></br></h2>
                      <div className='body2'>
                          {this.state.fiveDayData.map((item, index) => { return(  
                              <div className='week'>
                                  <h3> {daysOfWeek[index]}</h3>
                                  <SingleEntry {... item}/>
                              </div>
                            ) })           
                          }
                        </div>
                  </div>

                )
             }
              else{
                return(
                      <div className='details'> 

                      </div>
                )
              
              }
          }
    }
    class OneDay extends Component {
      constructor(props){
        super(props);
        this.state={
            isloaded:false,
            onedayData:[]
        }
           
      }
      componentDidMount() {
      
        let apiKey=process.env.REACT_APP_API_KEY
        axios.headers={
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
       }
       //https://dataservice.accuweather.com/forecasts/v1/daily/5day/75094?apikey=${apiKey}
         axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=51.5085&lon=-0.1257&appid=${apiKey}`)
        .then(res => {
          const results = res.data;
      //    console.log(results);
          this.setState({onedayData:results});
          this.setState({isloaded:true})
          
        })
        .catch(error => {
          console.log('there is an eror', error)
        })
    
      }       
      render(){
        if(this.state.isloaded){
          console.log("one day data" ,this.state.onedayData)
         
          let headline = this.state.onedayData["current"];
       //   console.log("headline.dt: ",headline.dt)
          const tempC = headline.temp;

          const tempCF = (((tempC-273.15)*1.8)+32).toFixed(2);
          let forecasts = this.state.onedayData["current"]["weather"];

              return(
                <div className='body'>
                      <h2>Forecast for Next 48 Hours:<br></br></h2>

                  <div className='headline'>
                      <h4> Current temperature : {tempCF} F</h4><br></br>
                      <React.Fragment>
                      {
                        Object.keys(forecasts).map((item,index)=>{return (
                        <DayIcons key={index} value={item} data={forecasts[item]}/>
                        )}) 
             
                      }
                      <br></br>
                    </React.Fragment>    
                  </div>
                  <div className='hourly'>
                     <React.Fragment>
                      {
                        Object.keys( this.state.onedayData["hourly"]).map((item,index)=>{return (
                        <HourlyForecast key={index} value={item} data={ this.state.onedayData["hourly"][item]}/>
                        )}) 
             
                      }

                    </React.Fragment>                                            
                  </div>
                
                </div>  
              )
            }
            else{
              return(
                    <div className='body'>
                    </div>
              )
            
            }
        }
     }
     class HourlyForecast extends Component{
      render(){
        console.log("inside hourly forecast");
          const tempK = this.props.data.temp;
          const tempKtoF = (((tempK-273.15)*1.8)+32).toFixed(2)
         return(
           <div className='details'>
             <h3>Hour: {this.props.value}</h3>
             <h3>Temperature: {tempKtoF} F</h3>
              <DayIcons data={this.props.data["weather"][0]}/>
              </div>
        )
      }
     }
    
     class SingleEntry extends Component{
       render(){
         console.log("inside SingleEntry item")
      //    console.log("Day of week is",day)
         return(
           <div className='details' style={{'border':'none'}}>
           {
               Object.keys(this.props["weather"]).map((item,index)=>{return (
                    <DayIcons key={index} value={item} data={this.props["weather"][item]}/>
               )}) 
             
             }

            </div>
         )
      }
     
     }
  
    class DayIcons extends Component{
      render(){
        console.log("inside DayIcons item")
     //    console.log("this.props.data",this.props.data)
            let url = `http://openweathermap.org/img/wn/${this.props.data.icon}@2x.png`;
            
      //      console.log("url",url)
            return(
              <div className='headline2'>
                <img src={url} alt='icon' width='100px' height='100px'/>
                <h3>Description:{this.props.data.description} </h3>
    
               </div>
            )
       }
    
    }
  