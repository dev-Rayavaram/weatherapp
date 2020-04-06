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
      //api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=0f13e039816ac1a8397eb8b68851cb9d
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
              fiveDayData:[]
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

          })
          .catch(error => {
            console.log('there is an eror', error)
          })
      
        }       
         render(){
          return(
            <div className='body'>
              <span> Inside five days</span>
        
            </div>

          );
        }
    }

    class OneDay extends Component {
      constructor(props){
        super(props);
        this.state={
            onedayData:[]
        }
      }
      componentDidMount() {
      
        let apiKey=process.env.REACT_APP_API_KEY
          axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/75094?apikey=${apiKey}`)
        .then(res => {
          const results = res.data;
          console.log(results)
          this.setState({onedayData:results});
        })
        .catch(error => {
          console.log('there is an eror', error)
        })
    
      }       
      render(){
            return(
              <div className='body'>
              <span> Inside oneday</span>

              </div>

            );
            

            }
     }
         