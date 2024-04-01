import { React, useState } from "react";

const LoginForm = ({ loginUser, errorLogin }) => {
    const INITIAL_STATE = {
        username: '',
        password: ''
    }

    const [formData, setFormData] = useState(INITIAL_STATE)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    //login user on form submit and clear form
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            loginUser(formData)
        } catch (error) {
            console.log(error)
        }
        setFormData(INITIAL_STATE);
    }

    return (
        <form className="LoginForm" onSubmit={handleSubmit}>
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

            {errorLogin && errorLogin.map(
                                error => <p>{error}</p>
                            )}

            <button type="submit">Submit</button>
        </form>
    )
}

export default LoginForm;