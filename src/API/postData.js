const postDataToDB = async(url, data)=>{
    const options = {
        method:"POST",
        headers:{ 'Content-Type' :'application/json'},
        body:JSON.stringify(data),
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

export const addToDoItem = (newToDo)=>{

    const url= 'http://localhost:3000/todoTable';    
    try{
        return postDataToDB(url,newToDo);
    }catch(e){
        throw e;
    }
}

