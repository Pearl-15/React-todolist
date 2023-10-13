import myFetch from "./myFetch";

export const addToDoItem = (newToDo)=>{
    const url= 'http://localhost:3000/todoTable';    
    return myFetch("POST",url,newToDo);
 
}

