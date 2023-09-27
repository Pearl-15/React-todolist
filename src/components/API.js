export const fetchAPI = async(method, url , data=null)=>{

    const headers = {
        'Content-Type': 'application/json',
    };

    const options = {
        method,
        headers,
    };

    if(data){
        options.body = JSON.stringify(data);
    }

    try{
        const response = await fetch(url,options);
        if(!response.ok){
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        return responseData
    }catch(error){
        console.error("Something went wrong, Error: ", error.message);
    }
}