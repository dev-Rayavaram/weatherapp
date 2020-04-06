import React,{Component} from 'react';
import {Route,Switch,Link,BrowserRouter as Router} from 'react-router-dom'
import axios from 'axios';


export default class Weather extends Component
    {
      constructor(props){
        super(props);
        this.state={
          value:'Plano',
          style:{
                  'textDecoration':'none',
                  backgroundColor:'#005689',
                  color:'white',
                  border:'2px solid white',
                  'fontFamily':'Jacques Francois',
                  'fontSize': '30px'
          }
        }
 
      }
      onMouseClick=(place)=>{

       }
 // let apiKey=process.env.REACT_APP_API_KEY
  //api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=0f13e039816ac1a8397eb8b68851cb9d
  // axios.get(`api.openweathermap.org/data/2.5/weather?APPID=${apiKey}`)
  //https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={YOUR API KEY}
  componentDidMount() {
   
     let apiKey=process.env.REACT_APP_API_KEY
      axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/locationKey?apikey=${apiKey}`)
     .then(res => {
       const results = res.data.response.results;
        console.log(results)
     })
     .catch(error => {
       console.log('there is an eror', error)
     })
 
   }
 
      render(){
        return (
 
          <Router>  
          <div className='left'>
            <nav>
                <ul>
                  <li>
                  <Link to="/day"  style={this.state.style} onClick={()=>this.onMouseClick('News')} >5 day forecast</Link>
                </li>
                <li>
                  <Link to="/"  style={this.state.style} onClick={()=>this.onMouseClick('Opinion')}>Hourly forecast</Link>
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
         render(){
          return(
            <div className='body'>
              <span> Inside five days</span>
        
            </div>

          );
        }
 }

          class OneDay extends Component {
            render(){
              return(
                <div className='body'>
                <span> Inside oneday</span>

                </div>

              );
            

            }
     }
         