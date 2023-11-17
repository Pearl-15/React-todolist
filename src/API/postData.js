import myFetch, { Resource_Url } from "./myFetch";

export const addToDoItem = (newToDo)=>{
    const url= Resource_Url;    
    return myFetch("POST",url,newToDo);
 
}

