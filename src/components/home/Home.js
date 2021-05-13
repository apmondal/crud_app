import "./Home.scss"
import { useState } from "react";
import {Cookies, useCookies} from "react-cookie";
import fireDatabase from "../../firebase";
import {Verify} from "../../utils/jwt"
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const Home = (props) => {

    const cookies = new Cookies();
    const token = cookies.get("Token");

    const history = useHistory();

    const [name, setName] = useState("")

    const [oldCookies, setCookies, removeCookies] = useCookies();

    const [email, setEmail] = useState("");

    useEffect(() => {
        if(token) {
            const data = Verify(token);
    
            const id = data.id;
    
            const look = async () => {
                const collection = fireDatabase.firestore().collection("users");
                const doc = await collection.doc(id).get();
    
                setName(doc.data().name)
                setEmail(data.data);
            }
    
            look()
        }

    }, [])

    

    const logout = () => {
        fireDatabase.auth().signOut();
        removeCookies("Token")
    }

    const [editNameFlag, setEditNameFlag] = useState(false);
    const [nameFlag, setnameFlag] = useState(1);

    const showNameInput = () => {
        if(nameFlag === 1) {
            setEditNameFlag(true);
            setnameFlag(2);
        }
        else {
            setEditNameFlag(false);
            setnameFlag(1);
        }
    }

    const [editEmailFlag, setEditEmailFlag] = useState(false);
    const [emailFlag, setEmailFlag] = useState(1);

    const showEmailInput = () => {
        if(emailFlag === 1) {
            setEditEmailFlag(true);
            setEmailFlag(2);
        }
        else {
            setEditEmailFlag(false);
            setEmailFlag(1);
        }
    }

    const [nameData, setNameData] = useState("");

    const changeName = (event) => {
        setNameData(event.target.value)
    }

    const [emailData, setEmailData] = useState("");

    const changeEmail = (event) => {
        setEmailData(event.target.value)
    }

    const onSubmitName = (event) => {
        event.preventDefault();
        if(nameData.trim().length > 0) {
            if(token) {
                const data = Verify(token);
        
                const id = data.id;
                const collection = fireDatabase.firestore().collection("users");
                collection.doc(id).set({
                    name: nameData
                }).then(() => {}).catch(err => {
                    alert(err.message)
                });
    
                setName(nameData)
                setEmail(data.data);
                setnameFlag(1);
            }
            setEditNameFlag(false);
        }
        else {
            alert("You can't left the field empty.");
        }
        
    }

    const onSubmitEmail = (event) => {
        event.preventDefault();
        const look = async () => {
            try {
                const password = window.prompt("Write your password for authentication: ");

                await fireDatabase.auth().signInWithEmailAndPassword(
                    email,
                    password
                )

                if(token) {
                    const user = fireDatabase.auth().currentUser;

                    await user.updateEmail(emailData);

                    removeCookies("Token");

                    history.push("/login")
                }
                else if(!token) {
                    history.push("/login");
                }

            } catch (err) {
                alert(err)
            }
        }
        
        look()
    }

    const deleteAccount = (event) => {
        event.preventDefault();
        const confirm = window.confirm("Are you sure to delete your account?");

        if(confirm) {
            const password = window.prompt("Write your password for authentication: ");

            const look = async () => {
                try {
                    await fireDatabase.auth().signInWithEmailAndPassword(
                        email,
                        password
                    )

                    if(token) {
                        const data = Verify(token);
                        const id = data.id;

                        const collection = fireDatabase.firestore().collection("users");
                        await collection.doc(id).delete()
                        
                        await fireDatabase.auth().currentUser.delete();

                        removeCookies("Token");
                    }

                } catch (err) {
                    alert(err)
                }
            }
            

            look()
        }
    }

    const changePassword = (event) => {
        event.preventDefault();
        const confirm = window.confirm("Are you sure to change your password?");

        if(confirm) {
            const password = window.prompt("Write old password for authentication: ");

            const look = async () => {
                try {
                    await fireDatabase.auth().signInWithEmailAndPassword(
                        email,
                        password
                    )

                    if(token) {
                        const newPassword = window.prompt("Write your new password: ");

                        const user = fireDatabase.auth().currentUser;

                        await user.updatePassword(newPassword);

                        removeCookies("Token");

                        history.push("/login")
                    }
                    else if(!token) {
                        history.push("/login");
                    }

                } catch (err) {
                    alert(err)
                }
            }
            

            look()
        }
    }

    return (
        <>
            <div className="home_box">
                {token? 
                (name?
                <>
                    <button className="logout" onClick={logout}>Logout</button><br /><br /><br />
                    <div className="welcome">Welcome Home {name}</div>
                    <div className="your_data">Your data</div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                            <tr>
                                <td>{name}</td>
                                <td>{email}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="edit_name" onClick={showNameInput}>Edit name</button><br /><br /><br />
                    {editNameFlag? 
                    <form onSubmit={onSubmitName}>
                        <input type="text" placeholder="Name" className="name_input" onChange={changeName} required />
                        <button type="submit">Submit</button>
                    </form>: null }
                    <button className="edit_name" onClick={showEmailInput}>Edit email</button><br /><br /><br />
                    {editEmailFlag? 
                    <form onSubmit={onSubmitEmail}>
                        <input type="email" placeholder="Email" className="name_input" onChange={changeEmail} />
                        <button type="submit">Submit</button>
                    </form>: null }
                    <button className="edit_name" onClick={deleteAccount}> Delete Account</button><br /><br /><br />
                    <button className="edit_name" onClick={changePassword}> Change Password</button>
                </> : <h1 className="loading">Loading<h1>.</h1></h1>)
                : <div className="button">
                    <button className="login" onClick={() => {history.push("/login")}}>Login</button>
                    <button className="signup" onClick={() => {history.push("/register")}}>Signup</button>
                </div>
                }
            </div>
        </>
    )
}

export default Home;