const getDataFromDB = async(url)=>{
    const options = {
        method:"GET",
        headers:{ 'Content-Type' :'application/json'},
    };

    try {
        let response = await fetch(url, options);

        console.log("Status code ", response.status)
        if (response.status >= 400) {
            throw new Error(`Something went wrong. Status Code: ${response.status}`);
        }
       
        let responseData = await response.json();
        return responseData;
      } catch (e) {
        console.log('API error: ', e.message);
        throw e;
      }
}

export const getToDoList = ()=>{
    
    const url= 'http://localhost:3000/todoTable';
    try{
        return getDataFromDB(url);
    }catch(e){
        throw e;
    }    
}

