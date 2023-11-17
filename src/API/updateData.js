import myFetch, { Resource_Url } from "./myFetch";

export const updateToDoItem = (id, todoItem)=>{
    // id=100;
    const url = `${Resource_Url}/${id}`;
    return myFetch("PATCH",url, todoItem);    
}