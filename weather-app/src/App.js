import React,{Component} from 'react';
import './App.css';
import Footer from './components/footer.js'
import Weather from './components/weather.js'
import Header from './components/header.js'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      value:'Plano',
      style:{
              'textDecoration':'none',
              backgroundColor:'gold',
              color:'#005689',
              border:'2px solid #005689',
              'fontFamily':'Jacques Francois',
              'fontSize': '30px'
      }
    }

  }
    render() {
      return (
        <div className="App">
          <Header style={this.state.style}/>
          <div className='body'> 
              <Weather  style={this.state.style}/>

          </div>
          <Footer  style={this.state.style} />
        </div>
      )
  }
}
export default App;