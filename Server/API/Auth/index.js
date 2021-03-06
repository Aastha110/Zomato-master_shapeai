import express from "express";
import passport from "passport";

//Models
import { UserModel } from "../../database/Users";

const Router = express.Router();

//validation
import { ValidateSignup, ValidateSignin } from "../../Validation/auth";

/*
Route     /signup
Des       Singup with email and password
Params    none
Access    Public
Method    POST
*/
Router.post("/signup", async (req, res) => {
    try {
        await ValidateSignup(req.body.credentials);
        await UserModel.findByEmailAndPhone(req.body.credentials);
        const newUser = await UserModel.create(req.body.credentials);

        //generate JWT auth token
        const token =  newUser.generateJwtToken();
        return res.status(200).json({ token, status: "success" });
       }
        catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
Route     /signin
Des       Singin with email and password
Params    none
Access    Public
Method    POST
*/
Router.post("/signin", async (req, res) => {
    try {
        await ValidateSignin(req.body.credentials);
        const user = await UserModel.findByEmailAndPassword(req.body.credentials);

        //generate JWT auth token
        const token =  user.generateJwtToken();
        
        return res.status(200).json({ token, status: "success" });
       }
        catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
Route     /google
Des        google Singin
Params    none
Access    Public
Method    POST
*/
Router.get("/google", passport.authenticate("google", { 
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ],
})
);

/*
Route     /google
Des        google Singin callback
Params    none
Access    Public
Method    POST
*/
Router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/"}),
    (req, res) => {
     return res.json({ token: req.session.passport.user.token });
 }
);

export default Router;