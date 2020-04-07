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
            axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/75094?apikey=${apiKey}`)
          .then(res => {
            const results = res.data;
            //  console.log(results)
              let items=[];
              let arrayList = results.DailyForecasts;
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
      //   console.log(this.props)
         //   console.log("this.props.Day",this.props.Day)
      //   console.log("temp",temp)
          const date = new Date(this.props.Date);
          const day = date.getDay();
          console.log("Day of week is",day)
         return(
           <React.Fragment>
             <h3>Date:{DaysOfweek[day]}</h3>
             {
               Object.keys(this.props.Day).map((item,index)=>{return (
                    <DayIcons key={index} value={item} data={this.props.Day[item]}/>
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
        // console.log("inside DayIcons item")
        // console.log("this.props.data",this.props.data)
        // console.log("this.props.value",this.props.value)
          if( this.props.value==='Icon' ||this.props.value==='IconPhrase'){
            return(
              <React.Fragment>
                <h3>Day {this.props.value}:{this.props.data} </h3>
    
               </React.Fragment>
            )
           }
           else{
            return(
              <React.Fragment>    
               </React.Fragment>
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
          axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/75094?apikey=${apiKey}`)
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
         
          let headline = this.state.onedayData["Headline"];
          const date = new Date(headline.EffectiveDate);
          const day = date.getDay();
          
          let forecasts = this.state.onedayData["DailyForecasts"];

              return(
                <div className='body'>
                  <div className='headline'>
                      <h3>Date: {DaysOfweek[day] }</h3>
                      <h4>{headline.Text}</h4><br></br>
                      <h4>{headline.Category}</h4><br></br>

                  </div>
                  <div className='details'>
                      <h3>Detailed Report: </h3>
                      <React.Fragment>
                      {
                        Object.keys(forecasts).map((item,index)=>{return (
                        <FullDayDetail key={index} value={item} data={forecasts[item]}/>
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
         console.log("this.FullDayDetail.key",this.props.data)
         console.log("this.FullDayDetail.value",this.props.value)

        return(
          <React.Fragment>
             {
               Object.keys(this.props.data.Day).map((item,index)=>{return (
                    <DayIcons key={index} value={item} data={this.props.data.Day[item]}/>
               )}) 
             
             }
            <h4>
              
            </h4> 
            </React.Fragment>
        )
     }
    
    }      