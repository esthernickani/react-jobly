import { React, useContext, useState } from "react";
import UserContext from "./UserContext";


const Profile = ({ updateUser, errorUpdate }) => {
    const { currentUser, logoutUser } = useContext(UserContext)

    const INITIAL_STATE = {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email
    }

    const [formData, setFormData] = useState(INITIAL_STATE)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateUser(formData)
        setFormData(INITIAL_STATE)
    }

    return (
        <>
            <h2>Profile</h2>

            <form className="Profile" onSubmit={handleSubmit}>
                <label htmlFor="username" >Username</label>
                <input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="username"
                    value={currentUser.username}
                    disabled
                />

                <label htmlFor="firstName" >First Name</label>
                <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    placeholder="firstname"
                    value={formData.firstName}
                    onChange={handleChange}
                />

                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder="lastname"
                    value={formData.lastName}
                    onChange={handleChange}
                />

                <label htmlFor="email" >Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                {errorUpdate.length && errorUpdate.map(
                                            error => <p>{error}</p>
                                        )}


                <button type="submit">Submit</button>
            </form>
        </>

    )


}

export default Profile;