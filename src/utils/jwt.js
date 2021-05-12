import jwt from "jsonwebtoken"

const SECRET = "this_is_the_most_secret_code";

const Sign = (data, id) => {
    return jwt.sign({data, id}, SECRET);
}

const Verify = (token) => {
    return jwt.verify(token, SECRET)
}

export {Sign, Verify};
