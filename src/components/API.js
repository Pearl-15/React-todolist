// export async function fetchAPI(id, object){

//     const response = await fetch(`http://localhost:3000/todoTable/${id}`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(object),
//     });

//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }

//     const responseData = await response.json();    
    
//     return responseData

// }

export async function fetchAPIToAdd(object){

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

}

export async function fetchAPIToDelete(id){

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

}

export async function fetchAPIToEdit(id, object){

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

export async function fetchAPIToLoad(){

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

}