const myFetch = async(method, url, data=null)=>{
    const options = {
        method: method,
        headers:{ 'Content-Type' :'application/json'},
    };
    if(data){
        options.body = JSON.stringify(data)
    }
    let response = await fetch(url, options);
    console.log("Status code ", response.status)
    if (response.status >= 400) {
        throw new Error(`Something went wrong. Status Code: ${response.status}`);
    }    
    let responseData = await response.json();
    return responseData;    
}

export default myFetch;