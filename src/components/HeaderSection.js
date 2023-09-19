import React from 'react';
import styled from 'styled-components';
import { Layout } from "antd";
const { Header } = Layout;

// style using div
// const StyledHeader = styled.div`
// .ant-layout-header{
//     background-color: #f5ba13;
//     margin: auto -20px;
//     box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
//     color: #fff;
//     font-size: x-large;
//     font-weight: bold;
// }
// `


const StyledHeader = styled(Header)`
    background-color: #f5ba13;
    margin: auto -20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    color: #fff;
    font-size: x-large;
    font-weight: bold;
`
class HeaderSection extends React.Component{
    
    render(){    
        return(
        <StyledHeader>
                To Do List
        </StyledHeader>
        )
    }
}

export default HeaderSection;