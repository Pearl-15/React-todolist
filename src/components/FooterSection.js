import React from 'react';
import { Layout,Typography } from "antd";
import styled from 'styled-components';
const { Footer } = Layout;
const { Text } = Typography;

const StyledFooter = styled.footer`
  background-color: grey;
  color: white;
  text-align: center;
  padding: 10px;
  margin-top: 20px;

  .ant-typography {
    color: white; 
  }
`;

class FooterSection extends React.Component{

    render(){
        const currentYear = new Date().getFullYear();
        return(
            <StyledFooter className='footerSection'>
                <Text>Copyright &copy; {currentYear}</Text>
            </StyledFooter>
        )
       
    }
}

export default FooterSection;