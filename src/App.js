import './App.css';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

class App extends React.Component
 {
  render(){
    return (
      <div className="App">
        <h1>This is working</h1>
        <Header />
        <Footer />
      </div>
    );}
 }

export default App;
