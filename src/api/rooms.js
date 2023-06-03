export const addRoom = async roomData => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(roomData),
    })

    const data = await response.json()
    return data;
}


// get all rooms 
export const getAllRooms = async () => {
const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms`)
const data = await response.json()
return data;
}


// get room
export const getRoom = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/room/${id}`)
    const data = await response.json()
    console.log(data)
    return data;
    }


    // get filtered rooms for host
    export const getRoomsHost = async (email) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/room/${email}`)
        const data = await response.json()
        return data;
    }

    export const deleteRoom = async (id) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/room/${id}`, {

            method: 'DELETE',
            'content-type': 'application/json',
        
        }
        )
        const result = await response.json()
        return result
    }