import './App.css';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Note from './components/Note';
import AddNote from './components/AddNote';

class App extends React.Component{
  render(){
    return (
      <div className="App">
        <h1>This is working</h1>
        <Header />
        <AddNote />
        <Note />
        <Footer />
      </div>
    );}
 }

export default App;
