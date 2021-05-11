import { Link } from "react-router-dom";
import "./Register.scss"

const Register = () => {
    const updateValue = () => {}

    const onSubmit = () => {}

    
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
