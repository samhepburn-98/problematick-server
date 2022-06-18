import express, { Request, Response } from "express";

// This helps convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

import { conn } from "../db/conn";
import { Item } from "../@types/item";

export const router = express.Router();

// Get all items
router.route("/item").get((req: Request, res: Response) => {
    let db_connect = conn.getDb();
    db_connect
        .collection("items")
        .find({})
        .toArray((err: any, result: any) => {
            if (err) throw err;
            res.json(result);
        });
});

// Get a single item by id
router.route("/item/:id").get((req, res) => {
    let db_connect = conn.getDb();
    let query = { _id: new ObjectId(req.params.id) };
    db_connect
        .collection("items")
        .findOne(query, (err: any, result: any) => {
            if (err) throw err;
            res.json(result);
        });
});

// Get a random item
router.route("/rand").get(async (req, res) => {
    let db_connect = conn.getDb();
    const result = await db_connect
        .collection("items")
        .aggregate([{ $sample: { size: 1 } }])
        .next();
    res.json(result);
});

// Create a new item
router.route("/item/add").post((req, response) => {
    let db_connect = conn.getDb();
    let item: Item = {
        text: req.body.text,
    };
    db_connect.collection("items").insertOne(item, (err: any, res: any) => {
        if (err) throw err;
        response.json(res);
    });
});

// Update an item by id.
router.route("/item/update/:id").post((req, response) => {
    let db_connect = conn.getDb();
    let query = { _id: new ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            text: req.body.text,
        },
    };
});

// Delete an item
router.route("/item/delete/:id").delete((req, response) => {
    let db_connect = conn.getDb();
    let query = { _id: new ObjectId(req.params.id) };
    db_connect.collection("items").deleteOne(query, (err: any, obj: any) => {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});
