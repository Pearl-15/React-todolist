import './App.css';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ManageNote from './components/ManageNote';

class App extends React.Component{


  render(){
    return (
      <div className="App">
        <Header />
        <ManageNote />
        <Footer />
      </div>
    );}
 }

export default App;
