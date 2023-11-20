
const myFetch = async(method, url, data=null)=>{

    const options = {
        method: method,
        headers:{ 
            'Content-Type' :'application/json',
            'x-api-key': API_KEY
    },
    };
    if(data){
        options.body = JSON.stringify(data);
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

export const Resource_Url = "https://1khi961aq3.execute-api.us-east-1.amazonaws.com/dev/todoTable";
