import { useState } from "react";
import {Cookies} from "react-cookie";
import fireDatabase from "../../firebase";
import {Verify} from "../../utils/jwt"

const Home = (props) => {

    const cookies = new Cookies();
    const token = cookies.get("Token");

    const data = Verify(token);

    const id = data.id;

    const [name, setName] = useState("")

    const look = async () => {
        const collection = fireDatabase.firestore().collection("users");
        const doc = await collection.doc(id).get();

        setName(doc.data().name)
    }

    look()

    return (
        <>
            <h1>Welcome {name}</h1>
        </>
    )
}

export default Home;