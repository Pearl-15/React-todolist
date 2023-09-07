import React from 'react';

class Footer extends React.Component{

    render(){
        const currentYear = new Date().getFullYear();
        return(
            <footer>
                <p>Copyright &copy; {currentYear}</p>
            </footer>
        )
       
    }
}

export default Footer;