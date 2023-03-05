const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const loadLogin = async (req, res) => {
    try {
        res.render('login');
    }catch (error) {
        console.log(error.message);
    }
}
const verifyLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userData = await User.findOne({ email: email });

        if (userData) {
            const passwordMatch = await bcrypt.compare(password, userData.password);
            if (passwordMatch) {
                if (userData.is_admin === 0) {
                    res.render('login', { message: "Email and password is incorrect" });
                }
                else {
                    req.session.user_id = userData._id;
                    res.redirect("/admin/home");
                }
            }
            else {
                res.render('login', { message: "Email and password is incorrect" });
            }
        }
        else {
            res.render('login', { message: "Email and password is incorrect" });
        }
    } catch (error) {
        console.log(error.message);
    }
}

const loadDashboard = async (req, res) => {
    try {
        res.render('home');
    } catch (error) {
        console.log(error.message);
    }
}
const logout = async (req, res) => {
    try {
        req.session.destroy();
        res.redirect('/admin');
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    loadLogin,
    verifyLogin,
    loadDashboard,
    logout
}