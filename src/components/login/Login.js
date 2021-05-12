import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import fireDatabase from "../../firebase";
import "./Login.scss"

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const history = useHistory();

    const updateValue = (event) => {const name = event.target.name;
        const value = (name === "checkbox")?event.target.checked: event.target.value;

        setData((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        fireDatabase.auth().signInWithEmailAndPassword(
            data.email,
            data.password
        ).then((res) => {
            console.log(res);
            history.push("/");
        }).catch(err => {
            alert(err.message);
            console.log(err);
        })
    }


    return (
        <>
            <div className="login_form_box">
                <div className="field_design">
                    <h3>Login using</h3>
                </div>
                <form className="input_box" onSubmit={onSubmit}>
                    <input type="text" className="input_field" placeHolder="Email" name="email" onChange={updateValue} required/>
                    <input type="password" className="input_field" placeHolder="Password" name="password" onChange={updateValue} required/>
                    <input type="checkbox" className="check_box" name="checkbox" onClick={updateValue}/><span>Remember me</span>
                    <button type="submit" className="submit_button">Log in</button>
                </form>
                <div className="below_button1">
                    <p className="col-95">Don't have an account?
                    <Link to="/register" className="another_comp">Register</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login;
