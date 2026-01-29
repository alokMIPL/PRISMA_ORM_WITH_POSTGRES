import prisma from "../DB/db.config";

// get all posts
export const fetchPosts = async (req, res) => {
  const posts = await prisma.post.findMany({});
  return res.json({
    status: 200,
    data: posts,
    message: "Posts Data Fetched Successfully.",
  });
};

// create new post
export const createPost = async (req, res) => {
  const { user_id, title, description } = req.body;
  const newPost = await prisma.post.create({
    data: {
      user_id: Number(user_id),
      title,
      description,
    },
  });
  return res.json({
    status: 200,
    message: "Post Created Successfully",
    data: newPost,
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
