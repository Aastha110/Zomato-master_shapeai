//Libraries
import express from "express";
import passport from "passport";

//Database model
import { MenuModel } from "../../database/allModels";

const Router = express.Router();

/*
Route     /list
Des       get all Menu based on paticular restuarant
Params    id
Access    Public
Method    GET
*/
Router.get("/list/:_id", async (req, res) => {
    try {
        const { _id } = res.params;
        const menus = await MenuModel.findOne(_id);

        return res.json({ menus });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
Route     /image
Des       get all Menu images based on id
Params    _id
Access    Public
Method    GET
*/
Router.get("/image/:_id", async (req, res) => {
    try {
        const { _id } = res.params;
        const menus = await ImageModel.findOne(_id);

        return res.json({ menus });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;