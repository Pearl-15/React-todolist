
export const fetchAPIToAdd = async (object) => {

    try {
        const response = await fetch(`http://localhost:3000/todoTable`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object),
        });
    
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    
        const responseData = await response.json();    
        
        return responseData
        
    } catch (error) {
        console.error("Something went wrong , Error: " ,error.message);
    }
   

}

export const fetchAPIToDelete = async (id) => {

    try {
        const response = await fetch(`http://localhost:3000/todoTable/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    
        const responseData = await response.json();    
        
        return responseData
        
    } catch (error) {
        console.error("Something went wrong , Error: " ,error.message);
        
    }

}

export const  fetchAPIToEdit = async(id, object) => {
    try {
        const response = await fetch(`http://localhost:3000/todoTable/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(object),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const responseData = await response.json();    
    
    return responseData
        
    } catch (error) {
        console.error("Something went wrong , Error: " ,error.message);
    }

    

}

export const fetchAPIToLoad = async() => {

    try{

        const response = await fetch(`http://localhost:3000/todoTable`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();    
        
        return responseData

    }catch(error){
        console.error("Something went wrong , Error: " ,error.message);
    }

}