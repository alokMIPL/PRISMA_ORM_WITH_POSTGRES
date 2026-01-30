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
    orderBy: {
      // id: "desc"
      id: "asc",
    },
    // here we use filter the post by comment_count > -1 and post title started with "A"
    where: {
      comment_count: {
        gt: -1,
      },
      // we can use startsWith, endsWith or equal to filter.
      // ****
      // title:{
      //   startsWith: "A"
      // },
      // ****
      // description: {
      //   endsWith: "Vercel.",
      // },
      // ****
      // description: {
      //   equals: "Welcome to",
      // },
      // ****
      // as such title we can filter more data.
      // ****
      // in this post fetch we can also filter the data of comments
      // comment: {
      //   some: {
      //     comment: {
      //       startsWith: "Nice",
      //     },
      //   },
      // },

      // filter with OR, AND and NOT
      // here we use filter with OR
      // means if any conditions become true it return value.
      // So, here it return or gives post title starts with "Next" and also return the post descriptions ends with "vercel."
      // ****
      // OR: [
      //   {
      //     title: {
      //       startsWith: "Next",
      //     },
      //   },
      //   {
      //     description: {
      //       endsWith: "download it.",
      //     },
      //   },
      // ],

      // here we use filter with AND
      // means if any conditions become false it return empty[] array.
      // So, here it return or gives post title starts with "Find" and also return the post descriptions ends with "download it."
      // ****
      AND: [
        {
          title: {
            startsWith: "Find",
          },
        },
        {
          description: {
            endsWith: "download it.",
          },
        },
      ],

      
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
