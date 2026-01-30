import prisma from "../DB/db.config.js";

// get all comments
export const fetchComments = async (req, res) => {
  const comments = await prisma.comment.findMany({

    // here we use nested relationship.
    // same as user controller post relation comment fetching
    // this include user and post give all posts and user related to this particular comment
    // ****
    // include: {
    //   user: true,
    //   post: true,
    // },

    // or we can do that
    // this give data of comment and inside which post and inside which user but give only user details not post details
    // when we use select
    // ****
    // include: {
    //   post: {
    //     select: {
    //       user: true,
    //     }
    //   }
    // },

    // or we can do that
    // this give data of comment and inside which post and inside which user but it give user details and post details also.
    // when we use include
    // ****
    // include: {
    //   post: {
    //     include: {
    //       user: true,
    //     }
    //   }
    // },

    // or we can do that
    // this give data of comment and inside which post and inside which user but it give user details and post details also.
    // when we use include
    // ****
    include: {
      user: true,
      post: {
        include: {
          user: true,
        }
      }
    }



  });
  return res.json({
    status: 200,
    data: comments,
    message: "Comments Data Fetched Successfully.",
  });
};

// create new comment
export const createComment = async (req, res) => {
  const { user_id, post_id, comment } = req.body;

  // Increase the comment counter
  await prisma.post.update({
    where: { id: Number(post_id) },
    data: {
      comment_count: {
        increment: 1,
      },
    },
  });

  const newComment = await prisma.comment.create({
    data: {
      user_id: Number(user_id),
      post_id: Number(post_id),
      comment,
    },
  });
  return res.json({
    status: 200,
    message: "Comment Created Successfully",
    data: newComment,
  });
};

// get comment by ID
export const showComment = async (req, res) => {
  const commentId = req.params.id;
  const comment = await prisma.comment.findFirst({
    where: {
      id: Number(commentId),
    },
  });
  return res.json({
    status: 200,
    data: comment,
    message: "Comment Data By ID Fetched Successfully.",
  });
};

// update comment details
export const updateComment = async (req, res) => {
  const commentId = req.params.id;
  const { comment } = req.body;

  await prisma.comment.update({
    where: {
      id: Number(commentId),
    },
    data: {
      comment,
    },
  });
  return res.json({ status: 200, message: "Comment updated successfully." });
};

// Delete post by ID
export const deleteComment = async (req, res) => {
  const commentId = req.params.id;

  // Decrease the comment counter
  await prisma.post.update({
    where: { id: Number(post_id) },
    data: {
      comment_count: {
        decrement: 1,
      },
    },
  });
  await prisma.comment.delete({
    where: {
      id: Number(commentId),
    },
  });
  return res.json({ status: 200, message: "Comment Deleted Successfully." });
};
