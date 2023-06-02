export const saveUser = (user)=>{
    const currentUser = {
        email: user.email
    }


    fetch(`http://localhost:5000/users/${user.email}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })

};

// save user hostname
export const becomeHost = (email)=>{
    const currentUser = {
        role: 'host'
    }


    return  fetch(`http://localhost:5000/users/${email}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    })
    .then(res => res.json())
   

};