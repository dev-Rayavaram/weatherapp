import React,{Component} from 'react';
import {Route,Switch,Link,BrowserRouter as Router} from 'react-router-dom'
import axios from 'axios';


export default class Weather extends Component{
    constructor(props){
      super(props);
      this.state={
          onedayData:[],
          fiveDayData:[]
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
                  <Link to="/day"  style={this.props.style} onClick={()=>this.onMouseClick('5day')} >5 day forecast</Link>
                </li>
                <li>
                  <Link to="/"  style={this.props.style} onClick={()=>this.onMouseClick('oneday')}>Hourly forecast</Link>
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
                fiveDayData:[],
                temperature: '',
                place: '',
                description: '',
                rain:'',
                icon:''
          }
        }
        componentDidMount() {
      
          let apiKey=process.env.REACT_APP_API_KEY
            axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/75094?apikey=${apiKey}`)
          .then(res => {
            const results = res.data;
              console.log(results)
              let items=[]
              for(let i=0; i<results.length;i++){
                //  console.log(items[i].sectionName)
                items.push(results[i]);
                }
                this.setState({fiveDayData:items});
                this.setState({isloaded:true})

          })
          .catch(error => {
            console.log('there is an eror', error)
          })
      
        }       
         render(){
          if(this.state.isloaded){
            console.log("five days data" ,this.state.fiveDayData)
               return(
                  <div className='body'>
                 <h3>RIGHT NOW: </h3>    
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

    class OneDay extends Component {
      constructor(props){
        super(props);
        this.state={
            isloaded:false,
            onedayData:[],
            fiveDayData:[],
            temperature: '',
            place: '',
            description: '',
            rain:'',
            icon:''
        }
      }
      componentDidMount() {
      
        let apiKey=process.env.REACT_APP_API_KEY
          axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/75094?apikey=${apiKey}`)
        .then(res => {
          const results = res.data;
          console.log(results);
          this.setState({onedayData:results});
          this.setState({isloaded:true})
          console.log(this.state.onedayData)
        })
        .catch(error => {
          console.log('there is an eror', error)
        })
    
      }       
      render(){
        if(this.state.isloaded){
          console.log("one day data" ,this.state.onedayData)
          let headline = this.state.onedayData["Headline"];
          let dailyForecasts = this.state.onedayData["DailyForecasts"];

              console.log("headline",headline);
              console.log("dailyForecasts",dailyForecasts);
              console.log("dailyForecasts at 0 index",dailyForecasts[0])

              return(
                <div className='body'>
                  <div className='headline'>
                      <h3>RIGHT NOW: </h3>
                      <h4>{headline.Text}</h4><br></br>
                      <h4>{headline.Category}</h4><br></br>

                  </div>
                  <div className='details'>
                      <h3>Detailed Report: </h3>
                      {JSON.stringify(dailyForecasts[0])}

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
         