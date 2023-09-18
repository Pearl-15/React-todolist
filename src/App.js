import './App.css';

import React from 'react';
import ToDoTable from './components/ToDoTable';
import HeaderSection from './components/HeaderSection';
import { Layout } from "antd";
import FooterSection from './components/FooterSection';
import './customize.scss'; // Adjust the path to match your SCSS file's location

const {Content} = Layout;



class App extends React.Component{


  render(){
    return (
          <Layout>
              <HeaderSection />
                <Content>
                  <ToDoTable />
                </Content>
                  <FooterSection />
          </Layout>
     
     
    );}
 }

export default App;
