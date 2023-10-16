import myFetch from "./myFetch";

export const getToDoList = ()=>{    
    const url= 'http://localhost:3000/todoTable';
    // const options = {
    //     method: "GET",
    //     headers:{ 'Content-Type' :'application/json'},
    // }
    return myFetch("GET", url);   
}

