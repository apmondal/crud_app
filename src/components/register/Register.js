import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useHistory } from "react-router-dom";
import fireDatabase from "../../firebase";
import { Sign } from "../../utils/jwt";
import "./Register.scss"


const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        cnfpassword: "",
        checkbox: false
    })
    const history = useHistory();
    const [cookies, setCookies] = useCookies();

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
        if(data.password !== data.cnfpassword) alert("Confirm password doesn't match with password");

        else {
            fireDatabase.auth().createUserWithEmailAndPassword(
                data.email,
                data.password
            ).then((res) => {
                const token = Sign(data.email, res.user.uid);

                if(data.checkbox) {
                    setCookies("Token", token, {
                        expires: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)),
                        path: "/",
                        httpOnly: false,
                        secure: true
                    });
                }
                else {
                    setCookies("Token", token, {
                        expires: new Date(Date.now() + (24 * 60 * 60 * 1000)),
                        path: "/",
                        httpOnly: false,
                        secure: true
                    });
                }
                history.push("/");

                return fireDatabase.firestore().collection("users").doc(res.user.uid).set({
                    name: data.name
                })
            }).catch(err => {
                alert(err.message);
                console.log(err);
            })
        }
    }

    
    return (
        <>
            <div className="reg_form_box">
                <div className="field_design">
                    <h3>Create account</h3>
                </div>
                <form className="input_box" onSubmit={onSubmit}>
                    <input type="text" className="input_field" placeHolder="Name" name="name" onChange={updateValue} required/>
                    <input type="email" className="input_field" placeHolder="Email id" name="email" onChange={updateValue} required/>
                    <input type="password" className="input_field" placeHolder="Password" name="password" onChange={updateValue} required/>
                    <input type="password" className="input_field" placeHolder="Confirm password" name="cnfpassword" onChange={updateValue} required/>
                    <input type="checkbox" className="check_box" name="checkbox" onChange={updateValue}/><span>Remember me</span>
                    <button type="submit" className="submit_button">Register</button>
                </form>
                <div className="below_button">
                    <p className="col-95">Already have an account?
                    <Link to="/login" className="another_comp">Log in</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Register;
