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
              let items=[];
              let arrayList = results.DailyForecasts;
              for(let i=0; i<arrayList.length;i++){
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
            // console.log("five days data" ,this.state.fiveDayData)
            // return this.state.fiveDayData.map(item => {
            //   return (
            //    <div className='body'>
            //      <h3>{item.Date}</h3>
            //    </div>
            //   );
            // });
            return this.state.fiveDayData.map((item) => {
              return (
                <div className='body'>
                  {item.Date}
                 
                </div>
              )
            })
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
            onedayData:[],
            detailObject:[],
            date:'',
            temperatureMin: '',
            temperatureMax: '',
            dayPrecpType:'',
            nightPrecepType:''
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
          let dailyForecasts = this.state.onedayData["DailyForecasts"];
          const setDetail = (dailyForecasts) => {
            let localArr=[];
            console.log("localArr",localArr);
            localArr.push({
            date: dailyForecasts[0].Date,
            temperatureMin: dailyForecasts[0].Temperature.Minimum,
            temperatureMax: dailyForecasts[0].Temperature.Maximum,

            dayPrecpType: dailyForecasts[0].Day.PrecipitationType,
            nightPrecepType: dailyForecasts[0].Night.PrecipitationType
          });
          this.setState({detailObject:localArr})        
          } 
          setDetail(dailyForecasts);

          console.log("detailObject",this.state.detailObject)
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
              return(
                <div className='body'>
                  <div className='headline'>
                      <h3>RIGHT NOW: </h3>
                      <h4>{headline.Text}</h4><br></br>
                      <h4>{headline.Category}</h4><br></br>

                  </div>
                  <div className='details'>
                      <h3>Detailed Report: </h3>
                         <p>{JSON.stringify(this.state.onedayData["DailyForecasts"][0])}</p>                     
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
         