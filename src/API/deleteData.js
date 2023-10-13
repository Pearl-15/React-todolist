import myFetch from "./myFetch";
export const deleteToDoItem = (id)=>{
    // id=100;
    const url = `http://localhost:3000/todoTable/${id}`    
    return myFetch("DELETE",url);
}