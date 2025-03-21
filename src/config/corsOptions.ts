import { CorsOptions } from "cors";

const whitelist = ["http://localhost:5173"];

export const corsOptions: CorsOptions = {
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
