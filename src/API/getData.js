import myFetch, { Resource_Url } from "./myFetch";

export const getToDoList = ()=>{    
    const url = Resource_Url;
    // const options = {
    //     method: "GET",
    //     headers:{ 'Content-Type' :'application/json'},
    // }
    return myFetch("GET", url);   
}

