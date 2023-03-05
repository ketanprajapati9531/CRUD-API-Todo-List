const User = require("../models/userModel");
const bcrypt = require('bcrypt');

const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    } catch {
        console.log(error.message)
    }

}
const loadRegister = async (req, res) => {
    try {

        res.render('registration');

    } catch (error) {
        console.log(error.message);
    }
}

const insertUser = async (req, res) => {

    try {
        const spassword = await securePassword(req.body.password);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mno,
            image: req.file.filename,
            password: spassword,
            is_admin: 0
        });
        const userData = await user.save();

        if (userData) {
            res.render('registration', { message: "Your registration has been successfully done,please verify your mail" });
        }
        else {
            res.render('registration', { message: "Your registration has been fail" });
        }

    } catch (error) {
        console.log(error.message);
    }
}

// login user methods started
const loginLoad = async (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        console.log(error.message);
    }
}

const verifyLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({ email: email });

        if (userData) {
            const passwordMatch = await bcrypt.compare(password, userData.password)
            if (passwordMatch) {

                if (userData.is_varified === 0) {
                    res.render('login', { message: "please verify your mail." });

                } else {
                    req.session.user_id = userData._id;
                    res.redirect("/todo");
                }


            } else {
                res.render('login', { message: "username and password incorrect!" });
            }

        } else {
            res.render('login', { message: "username and password incorrect!" });
        }


    } catch (error) {
        console.log(error.message);
    }
}

//loadHome aa load thse
const loadHome = async(req,res) =>{
    try{
        res.render("home");

    }catch(error){
        console.log(error.message);
    }
}
module.exports = {
    loadRegister,
    insertUser,
    loginLoad,
    verifyLogin,
    loadHome
}