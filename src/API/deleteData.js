const deleteDataInDB = async(url, data)=>{
    const options = {
        method:"DELETE",
        headers:{ 'Content-Type' :'application/json'}
    };

    try {
        let response = await fetch(url, options);

        console.log("Status code ", response.status)
        if (response.status >= 400) {
            throw new Error(`Something went wrong. Status Code: ${response.status}`);
        }
       
        let responseData = await response.json();
        return responseData;
      } catch (e) {
        console.log(e.message);
        throw e
      }
}

export const deleteToDoItem = (id)=>{
    // id=100;
    const url = `http://localhost:3000/todoTable/${id}`    
    try{
        return deleteDataInDB(url);
    }catch(e){
        throw e;
    }
}