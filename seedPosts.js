import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "./models/post.js";

dotenv.config();

const posts = [
  { title: "Learning Node.js", content: "Node.js lets me run JS on the server!" },
  { title: "Understanding Express", content: "Express makes backend routes simple and clean." },
  { title: "MongoDB Love", content: "I can now store and query JSON-like data easily." },
  { title: "Mongoose Magic", content: "Mongoose helps me define schemas and models easily." },
  { title: "REST API Journey", content: "I'm building my own API from scratch!" },
  { title: "CRUD Practice", content: "Creating, Reading, Updating, and Deleting data." },
  { title: "Async Await", content: "I now understand how async functions handle promises." },
  { title: "Postman Testing", content: "Postman helps me send requests easily." },
  { title: "Error Handling", content: "Try-catch blocks make my backend stable." },
  { title: "Dotenv Power", content: "I can hide secrets like database URLs in .env files." },
  { title: "Docker Love", content: "Docker helps me run MongoDB easily without installation." },
  { title: "Frontend Dreams", content: "Soon I’ll connect this API to Next.js." },
  { title: "Authentication Goals", content: "Next step: secure routes with JWT." },
  { title: "Middleware Magic", content: "Middleware runs between request and response." },
  { title: "Status Codes", content: "Learning what 200, 201, 400, and 500 mean." },
  { title: "CORS Issues", content: "CORS lets browsers safely talk to different origins." },
  { title: "Project Portfolio", content: "This API will be in my portfolio." },
  { title: "Version Control", content: "Using Git helps me track changes." },
  { title: "Deployment Goals", content: "I’ll deploy this project on Render or Railway soon." },
  { title: "Learning Journey", content: "Step by step, I’m becoming a confident developer." }
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected. Inserting posts...");
    await Post.insertMany(posts);
    console.log("🎉 Successfully added 20 posts!");
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));
