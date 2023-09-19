import React from 'react';
import { Layout,Typography } from "antd";
import styled from 'styled-components';
const { Footer } = Layout;
const { Text } = Typography;

const StyledFooter = styled.div`
.ant-layout-footer {
  background-color: grey;
  color: white;
  text-align: center;
  padding: 10px;
  margin-top: 20px;
}
  
  .ant-typography {
    color: white; 
  }
`;

class FooterSection extends React.Component{

    render(){
        const currentYear = new Date().getFullYear();
        return(
            <StyledFooter>
                <Footer>
                    <Text>Copyright &copy; {currentYear}</Text>
                </Footer>
            </StyledFooter>
        )
       
    }
}

export default FooterSection;