import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true } // ✅ correct spelling (not "ture")
);

const Post = mongoose.model("Post", postSchema);
export default Post;
