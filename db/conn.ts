import { AnyError, Db, MongoClient } from "mongodb";
import { uri } from "../config";

const client = new MongoClient(uri, {});

let _db: Db;

export const conn = {
    connectToServer: (callback: (arg0: AnyError | undefined) => void) => {
        client.connect((err, db) => {
            // Verify we got a good "db" object
            if (db) {
                _db = db.db("items");
                console.log("Successfully connected to MongoDB.");
            }
            return callback(err);
        });
    },

    getDb: () => {
        return _db;
    },
};
