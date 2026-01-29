import prisma from "../DB/db.config.js";

// get all comments
export const fetchComments = async (req, res) => {
  const comments = await prisma.comment.findMany({});
  return res.json({
    status: 200,
    data: comments,
    message: "Comments Data Fetched Successfully.",
  });
};

// create new comment
export const createComment = async (req, res) => {
  const { user_id, post_id, title, comment } = req.body;
  const newComment = await prisma.comment.create({
    data: {
      user_id: Number(user_id),
      post_id: Number(post_id),
      title,
      comment: comment,
    },
  });
  return res.json({
    status: 200,
    message: "Comment Created Successfully",
    data: newComment,
  });
};

// get post by ID
export const showPost = async (req, res) => {
  const postId = req.params.id;
  const post = await prisma.post.findFirst({
    where: {
      id: Number(postId),
    },
  });
  return res.json({
    status: 200,
    data: post,
    message: "Post Data By ID Fetched Successfully.",
  });
};

// update post details
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, description } = req.body;

  await prisma.post.update({
    where: {
      id: Number(postId),
    },
    data: {
      title,
      description,
    },
  });
  return res.json({ status: 200, message: "Post updated successfully." });
};

// Delete post by ID
export const deletePost = async (req, res) => {
  const postId = req.params.id;
  await prisma.post.delete({
    where: {
      id: Number(postId),
    },
  });
  return res.json({ status: 200, message: "Post Deleted Successfully." });
};
