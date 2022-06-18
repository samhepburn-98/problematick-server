import express from "express";
import cors from "cors";

import { router } from "./routes/router";
import { conn } from "./db/conn";
import { envPort } from "./config";

const app = express();

const port = envPort || 8080;

app.use(cors());
app.use(express.json());

app.use(router);

// get driver connection

app.listen(port, () => {
    // perform a database connection when server starts
    conn.connectToServer((err: any) => {
        if (err) console.error(err);
    });
    console.log(`Server is running on port: ${port}`);
});
