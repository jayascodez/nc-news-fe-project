import { useEffect, useState } from "react"
import { getUsers } from "../api"

export const Profile = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null) 

    useEffect(() => {
        getUsers()
            .then((response) => {
                setUsers(response.users)
                setLoading(false)
            })
            .catch((err) => {
                setError('Error finding user info')
                setLoading(false)  
            })
    }, [])

    if (loading) {<p>Loading...</p> }
    if (error) {<p>{error}</p>}

    if (users.length === 0 || !users[0]) {
        return <p>User data loading</p>}

    return (
        <>
            <div className="profile-card">
                <h2>Hi {users[0].name}</h2>
                <h3>Username: {users[0].username}</h3>
                <label>Your profile picture:
                    <img 
                        src={users[0].avatar_url} 
                        alt="Your profile picture"
                    />
                </label>
            </div>

            <h3>Connect with other users:</h3>
            <ul>
                {users.map((user)=> {
                    if(user.name !== users[0].name)
                    return <li key={user.username}>
                        <h4>{user.name} - {user.username}</h4>
                        <img className="user-profile-pic" src ={user.avatar_url} alt="${user.name}s profile picture"></img>
                        <button>conect</button>
                    </li>
                })}
            </ul>
        </>
    )
}