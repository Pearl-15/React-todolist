export async function fetchAPI(id, object){

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

}