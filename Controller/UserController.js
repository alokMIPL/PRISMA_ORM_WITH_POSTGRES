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
    select: {
      id: true,
      name: true,
      email: true,
      _count: {
        select: {
          post: true,
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
