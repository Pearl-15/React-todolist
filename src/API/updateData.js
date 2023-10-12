const updateDataToDB = async(url, data)=>{
    const options = {
        method:"PATCH",
        headers:{ 'Content-Type' :'application/json'},
        body:JSON.stringify(data),
    };

    try {
        let response = await fetch(url, options);

        console.log("Status code ", response.status)
        if (response.status >= 400) {
            throw new Error(`${response.status}`);
        }
       
        let responseData = await response.json();
        return responseData;
      } catch (e) {
        console.log(e.message);
        throw e;
      }
}

export const updateToDoItem = (id, todoItem)=>{
    // id=100;
    const url = `http://localhost:3000/todoTable/${id}`;
    try{
        return updateDataToDB(url, todoItem);
    }catch(e){
        throw e;
    }
    
}