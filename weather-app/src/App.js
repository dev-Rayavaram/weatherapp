import React,{Component} from 'react';
import './App.css';
import Footer from './components/footer.js'
import Weather from './components/weather.js'
import Header from './components/Header.js'

class App extends Component {
    render() {
      return (
        <div className="App">
          <Header/>
          <div className='body'> 
              <Weather/>

          </div>
          <Footer/>
        </div>
      )
  }
}
export default App;