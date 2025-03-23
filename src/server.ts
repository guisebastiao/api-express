import { App } from "@/app";
import { nodeEnv, serverPort } from "./config/env";

const app = new App();

const server = app.getServer();

server.listen(serverPort, () => {
  console.log(`> Server running on port ${serverPort}`);
  console.log(`> ${nodeEnv} environment`);
});
