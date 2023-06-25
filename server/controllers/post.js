import express from "express";
import mongoose from "mongoose";

import PostMessage from "../models/postMessage.js";

const router = express.Router();

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);
    res.status(200).json({
      product: post,
    });
  } catch (error) {
    res.send(404).json({
      message: `there is not any post with ${id}`,
    });
  }
};

export const createPost = async (req, res) => {
  const { title, message, selectedFile, creator, tags } = req.body;

  try {
    const newPostMessage = await PostMessage.create({
      title,
      message,
      selectedFile,
      creator,
      tags,
    });
    console.log(newPostMessage);
    res.status(200).json({ newPostMessage });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, selectedFile, creator, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({
      message: `${id} e sahip bir kullanıcı yok`,
    });
  }
  const updatePost = {
    createPost,
    title,
    message,
    tags,
    creator,
    selectedFile,
    _id: id,
  };
  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(id, updatePost, {
      new: true,
    });
    res.status(200).json({
      updatedPost,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({
      message: "aradıgınız kişi kayıtlarda yok",
    });
  }
  const post = await PostMessage.findById(id);
  const updatedPost = await PostMessage.findByIdAndUpdate(id, {
    likeCount: post.likeCount + 1,
  });
  res.status(200).json({
    updatedPost,
  });
};
