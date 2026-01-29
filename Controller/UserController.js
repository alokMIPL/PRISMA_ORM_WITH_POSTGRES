import prisma from "../DB/db.config.js";

// get all users
export const fetchUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  return res.json({ status: 200, data: users, message: "User Data Fetched Successfully." })
}

export const createUser = async(req, res) => {
  const { name, email, password } = req.body;

  const findUser = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  if(findUser){
    return res.json({ status: 400, message:"Email Already Taken. Please use another email." });
  }

  const newUser = await prisma.user.create({
    data: {
      name: name, 
      email: email,
      password: password
    }
  })

  return res.json({ status: 200, message: "User Created Successfully", data: newUser })

}

// update user details
export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;

  await prisma.user.update({
    where: {
      id:Number(userId)
    },
    data: {
      name,
      email,
      password
    }
  })
  return res.json({ status: 200, message: "User updated successfully." })

}