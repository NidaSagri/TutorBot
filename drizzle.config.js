import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" }); 


export default defineConfig({
  schema: "./configs/schema.jsx",
  dialect: "postgresql",

  dbCredentials: {
    url: process.env.DB_CONNECTION_STRING,
  },
});
