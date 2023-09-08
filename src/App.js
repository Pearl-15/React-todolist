import './App.css';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Note from './components/Note';
import CreateNote from './components/CreateNote';
import ManageNote from './components/ManageNote';

class App extends React.Component{


  render(){
    return (
      <div className="App">
        <h1>This is working</h1>
        <Header />
        <CreateNote />
        <ManageNote />
        <Note />
        <Footer />
      </div>
    );}
 }

export default App;
