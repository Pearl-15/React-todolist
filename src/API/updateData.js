import myFetch from "./myFetch";

export const updateToDoItem = (id, todoItem)=>{
    // id=100;
    const url = `http://localhost:3000/todoTable/${id}`;
    return myFetch("PATCH",url, todoItem);    
}