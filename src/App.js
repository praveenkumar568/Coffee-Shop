import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Home from './Components/Home'
import './App.css';
import savedList from './Components/SavedList';

function App() {
  return (
    <Router>
      <Route path='/' component={Home} exact/>
      <Route path='/savedItems' component={savedList}/>
    </Router>
  );
}

export default App;
