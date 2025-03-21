import { App } from "@/app";
import dotenv from "dotenv";

const app = new App();

dotenv.config();
const server = app.getServer();

server.listen(3333, () => console.log("Server Running"));
