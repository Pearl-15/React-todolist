import myFetch from "./myFetch";

export const getToDoList = ()=>{    
    const url= 'http://localhost:3000/todoTable';
    return myFetch("GET",url);   
}

