
import './App.css'
import React, {Component} from 'react'
import NavBar from './components/NavBar'
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";

export default class App extends Component{
  pageSize = 6;
  // apiKey = process.env.REACT_APP_NEWS_API
  apiKey = "3721098669714c2ea5d88a6eff1fd5cc"

  state = {
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress: progress})
  }
  
  render() {
    return (
      <div>
        <Router>
          <NavBar/>

          <LoadingBar
             color='#f11946'
             progress={this.state.progress}
             height={3}
          />

        <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="home" pageSize={this.pageSize} country="us" category="general"/>}></Route>          
          <Route exact path="business" element={<News setProgress={this.setProgress}  apiKey={this.apiKey} key="Business" pageSize={5} country="us" category="business"/>}></Route>
          <Route exact path="entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="entertainment" pageSize={this.pageSize} country="us" category="Entertainment"/>}></Route>
          <Route exact path="general" element={<News setProgress={this.setProgress}  apiKey={this.apiKey} key=" general" pageSize={this.pageSize} country="us" category="General"/>}></Route>
          <Route exact path="health" element={<News setProgress={this.setProgress}  apiKey={this.apiKey} key="health" pageSize={this.pageSize} country="us" category="Health"/>}></Route>
          <Route exact path="science" element={<News setProgress={this.setProgress}  apiKey={this.apiKey} key="science" pageSize={this.pageSize} country="us" category="Science"/>}></Route>
          <Route exact path="sports" element={<News setProgress={this.setProgress}  apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country="us" category="Sports"/>}></Route>
          <Route exact path="technology" element={<News setProgress={this.setProgress}  apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country="us" category="Technology"/>}></Route>
        </Routes>
        </Router>
      </div>
    )
  }
}

 
