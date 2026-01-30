import prisma from "../DB/db.config.js";

// get all posts
export const fetchPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    // here we use nested relationship.

    // same as user controller post relation comment fetching
    // it give all comments related to that particular post
    // ****
    // include: {
    //   comment: true,
    // },

    // for only specific fields in comment field we do
    // here we fetch full user data
    // ****
    // include: {
    //   comment: {
    //     include: {
    //       user: true
    //     }
    //   }
    // },

    // for only specific fields in comment field we do
    // here we fetch user name data only
    // we use include for nesting or going deep-down to it.
    // ****
    include: {
      comment: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
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
