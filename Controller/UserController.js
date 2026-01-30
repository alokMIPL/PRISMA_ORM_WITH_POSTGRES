import prisma from "../DB/db.config.js";

// get all users
export const fetchUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    // we add this later after post model creation
    // this include post: true give all posts related to user
    // ****
    // include: {
    // post: true
    // },

    // for only specific fields in post field we do
    // ****
    // include: {
    //   post: {
    //     select: {
    //       title: true,
    //       comment_count: true,
    //     },
    //   },
    // },

    // suppose user have post, comment and other models relation
    // and we want only post and comment relation data count
    // means how much post and comment user have
    // then we do as below
    // ****
    // select: {
    //   id: true,
    //   name: true,
    //   email: true,
    //   _count: {
    //     select: {
    //       post: true,
    //       comment: true,
    //     },
    //   },
    // },

    // suppose user have user post, comment and other models relation
    // and we want all post and comment associated with that post and with that user then this relation comes in role.
    // means how much post and comment user have with nested form
    // means it show user1 have 2 posts and inside these two post it also show the comments details.
    // then we do as below
    // ****
    // select: {
    //   id: true,
    //   name: true,
    //   email: true,
    //   _count: {
    //     select: {
    //       post: true,
    //       comment: true,
    //     },
    //   },
    //   // here we select post and inside post it include comment so, it shows in nested form.
    //   post: {
    //     include: {
    //       comment: true
    //     }
    //   }
    // },

    // here we use filter to sort data according to created_at post title post comment_count etc.
    select: {
      id: true,
      name: true,
      email: true,
      post: {
        where: {},
        orderBy: [
          // {
          //   created_at: "asc",
          // },
          // {
          //   title: "asc",
          // },
          {
            comment_count: "desc",
          },
        ],
        select: {
          id: true,
          title: true,
          description: true,
          comment_count: true,
          created_at: true,
          comment: true,
        },
      },
    },
  });
  return res.json({
    status: 200,
    data: users,
    message: "User Data Fetched Successfully.",
  });
};

// create new user
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const findUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (findUser) {
    return res.json({
      status: 400,
      message: "Email Already Taken. Please use another email.",
    });
  }

  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });

  return res.json({
    status: 200,
    message: "User Created Successfully",
    data: newUser,
  });
};

// update user details
export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;

  await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      name,
      email,
      password,
    },
  });
  return res.json({ status: 200, message: "User updated successfully." });
};

// get user by ID
export const showUser = async (req, res) => {
  const userId = req.params.id;
  const user = await prisma.user.findFirst({
    where: {
      id: Number(userId),
    },
  });
  return res.json({
    status: 200,
    data: user,
    message: "User Data By ID Fetched Successfully.",
  });
};

// Delete user by ID
export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  await prisma.user.delete({
    where: {
      id: Number(userId),
    },
  });
  return res.json({ status: 200, message: "User Deleted Successfully." });
};
