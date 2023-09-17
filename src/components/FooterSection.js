import React from 'react';
import { Layout,Typography } from "antd";
const { Footer } = Layout;
const { Text } = Typography;

class FooterSection extends React.Component{

    render(){
        const currentYear = new Date().getFullYear();
        return(
            <Footer className='footerSection'>
                <Text>Copyright &copy; {currentYear}</Text>
            </Footer>
        )
       
    }
}

export default FooterSection;