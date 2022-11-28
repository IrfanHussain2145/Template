import express from "express";

import {BlogModel} from "../schema/blog.js";

const router = express.Router();


/* GET users listing. */
router.get("/", async (req, res, next) => {
  console.log("get req hit ")
  // find blogs based on no condition==> get all blogs
  const blogs = await BlogModel.find({});
  // convert each blog to an object and send an array to client
  return res.send(blogs.map((blog) => blog.toObject()));
});

router.post("/create-post", async (req, res) => {
  // body should be JSON
  console.log("EXPRESS WAS HIT");
  const body = req.body;
  if (body.password !== 'checker') { 
    return res.sendStatus(1000);
  }

  // create blog model with the request body
  const blog = new BlogModel({content: body.content, title: body.title});
  // remember to await .save();
  // save to mongodb
  await blog.save();
  // get an object representation and send it back to the client
  return res.send(blog.toObject());
});

router.delete("/", async (req, res, next) => {
  const {title }= req.body;
  BlogModel.deleteOne({title});
  return res.sendStatus(204);
});

export default router;