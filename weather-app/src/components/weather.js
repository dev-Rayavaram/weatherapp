import React,{Component} from 'react';
import {Route,Switch,Link,BrowserRouter as Router} from 'react-router-dom'
import axios from 'axios';

let DaysOfweek=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
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
                  <Link to="/"  style={this.props.style} onClick={()=>this.onMouseClick('oneday')}>Today's Forecast</Link>
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
            console.log("inside openweather map --------------------------------------")
             console.log(results)
              let items=[];
              let arrayList = results.daily;
              for(let i=0; i<arrayList.length;i++){
                //  console.log(items[i].sectionName)
                items.push(arrayList[i]);
                }
                this.setState({fiveDayData:items});
             //   console.log("fiveDayData",this.state.fiveDayData);
                this.setState({isloaded:true})

          })
          .catch(error => {
            console.log('there is an eror', error)
          })
      
        }       
         render(){
          if(this.state.isloaded){
            // console.log("five days data" ,this.state.fiveDayData)
            // return this.state.fiveDayData.map(item => {
            //   return (
            //    <div className='body'>
            //      <h3>{item.Date}</h3>
            //    </div>
            //   );
            // });
             return this.state.fiveDayData.map((item, index) => { return <SingleDay {... item}/> }) 


              }
              else{
                return(
                      <div className='details'> 

                      </div>
                )
              
              }
          }
    }
     class SingleDay extends Component{
       render(){
         console.log("inside SingleDay item")
        console.log(this.props)
      //   console.log("temp",temp)
          const date = new Date(this.props.dt);
          const day = date.getDay();
          const tempMin = this.props.temp["min"];
          const tempMax = this.props.temp["max"];
          const tempMinF = (((tempMin-273.15)*1.8)+32).toFixed(2)
          const tempMaxF = (((tempMax-273.15)*1.8)+32).toFixed(2)

          console.log("Day of week is",day)
         return(
           <React.Fragment>
             <h3>Date:{DaysOfweek[day]}</h3>
             <h3>Temperature Minimum: {tempMinF} F</h3>
             <h3>Temperature Maximum: { tempMaxF} F</h3>

             {
               Object.keys(this.props["weather"]).map((item,index)=>{return (
                    <DayIcons key={index} value={item} data={this.props["weather"][item]}/>
               )}) 
             
             }
            <h4>
              
            </h4> 
            </React.Fragment>
         )
      }
     
     }
     class TempObject extends Component{
      render(){
        // console.log("inside TempObject item")
        // console.log("this.props.key",this.props.data)
        // console.log("this.props.value",this.props.value)

        return(
          <React.Fragment>
            <h3>Temperature {this.props.value}: {this.props.data.Value} {this.props.data.Unit}</h3>

           </React.Fragment>
        )
     }
    
    }
    class DayIcons extends Component{
      render(){
        console.log("inside DayIcons item")
         console.log("this.props.data",this.props.data)
            let url = `http://openweathermap.org/img/wn/${this.props.data.icon}@2x.png`;
            
            console.log("url",url)
            return(
              <React.Fragment>
                <img src={url} alt='icon' width='100px' height='100px'/>
                <h3>Description:{this.props.data.description} </h3>
    
               </React.Fragment>
            )
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
          const date = new Date(headline.dt);
          const day = date.getDay();
          const tempC = headline.temp;

          const tempCF = (((tempC-273.15)*1.8)+32).toFixed(2);
          let forecasts = this.state.onedayData["current"]["weather"];

              return(
                <div className='body'>
                  <div className='headline'>
                      <h3>Date: {DaysOfweek[day] }  </h3>
                      <h4>Temperature : {tempCF} F</h4><br></br>

                  </div>
                  <div className='details'>
                      <React.Fragment>
                      {
                        Object.keys(forecasts).map((item,index)=>{return (
                        <DayIcons key={index} value={item} data={forecasts[item]}/>
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
     class FullDayDetail extends Component{
      render(){
         console.log("inside FullDayDetail item")
         console.log("this.FullDayDetail.data",this.props.data)
         console.log("this.FullDayDetail.value",this.props.value)

        return(
          <React.Fragment>
             {
               Object.keys(this.props.data.Day).map((item,index)=>{return (
                    <DayIcons key={index} value={item} data={this.props.data}/>
               )}) 
             
             }
            <h4>
              
            </h4> 
            </React.Fragment>
        )
     }
    
    }      