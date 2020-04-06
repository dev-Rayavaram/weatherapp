import React,{Component} from 'react';
import './App.css';
import Footer from './components/footer.js'
import Header from './components/header.js'
import Main from './components/main.js'

class App extends Component {
    render() {
      return (
        <div className="App">
          <Header/>
          <Main/>
          <Footer/>
        </div>
      )
  }
}
export default App;