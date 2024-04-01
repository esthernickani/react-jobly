import { React, useState } from "react";

const SignupForm = ({ signupUser, errorSignup }) => {
    const INITIAL_STATE = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
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
        signupUser(formData)
        console.log(formData)
        setFormData(INITIAL_STATE)
    }

    return (
        <form className="SignupForm" onSubmit={handleSubmit}>
            <label htmlFor="username" >Username</label>
            <input
                id="username"
                type="text"
                name="username"
                placeholder="username"
                value={formData.username}
                onChange={handleChange}
            />

            <label htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                name="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
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

            {errorSignup.length && errorSignup.map(
                                            error => <p>{error}</p>
                                        )}

            <button type="submit">Submit</button>
        </form>
    )
}

export default SignupForm;