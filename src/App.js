import './App.css';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import NoteTable from './components/NoteTable';

class App extends React.Component{


  render(){
    return (
      <div className="App">
        <Header />
        <NoteTable />
        <Footer />
      </div>
    );}
 }

export default App;
