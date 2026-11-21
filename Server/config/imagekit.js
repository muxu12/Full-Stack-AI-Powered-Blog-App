import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import ImageKit from "@imagekit/nodejs";

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export default imagekit;
