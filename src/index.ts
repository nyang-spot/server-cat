import express from "express";
import cors from "cors";
import { CORS_CONFIG } from "./config";

const PORT = 3000;

export const main = async () => {
    const app = express();

    app.use(cors(CORS_CONFIG));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    return app;
};

(async () => {
    const app = await main();

    app.listen(PORT, () => {
        console.log("street-cat-fighter Server !!");
    });
})();
