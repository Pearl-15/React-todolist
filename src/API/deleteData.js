import myFetch, { Resource_Url } from "./myFetch";
export const deleteToDoItem = (id)=>{
    // id=100;
    const url = `${Resource_Url}/${id}`    
    return myFetch("DELETE",url);
}