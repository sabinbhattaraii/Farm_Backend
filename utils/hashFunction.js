import bcrypt from "bcrypt"

// 1st hash the password;
export let hashPassword = async (password = "", salt = 10) => {
    try {
        let innerHashPassword = await bcrypt.hash(password, salt);
        return innerHashPassword
    } catch (error) {
        let err = new Error(error.message);
        err.statusCode = 400;
        throw err;
    }
}

//2nd compare the password
export let comparePassword = async (password = "", hashPassword = "") => {
    try {
        let isValidPassword = await bcrypt.compare(password, hashPassword)
        //compare check whether a hashpassword is made from password
        return isValidPassword
    } catch (error) {
        let err = new Error("Please Enter Valid Email or Password")
        err.statusCode = 401;
        throw err;
    }
}