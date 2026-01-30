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

      // =====================================
      // Filter with OR (Logical OR Operator)
      // =====================================
      // Purpose: Returns records that satisfy AT LEAST ONE of the specified conditions
      // Behavior: Acts as an inclusive filter - ANY condition being TRUE is sufficient

      // Real-world analogy:
      // "Find customers who are either VIP members OR have made 10+ purchases"
      // Customers satisfying EITHER criteria will be returned

      // Key Characteristics:
      // 1. Records matching ANY condition in the OR array are included
      // 2. A record can match one, some, or all conditions
      // 3. Only fails if NONE of the conditions match
      // 4. Use array format for multiple conditions

      // Example Logic for this query:
      // Title starts with "Next" → If TRUE → Record Included
      // OR
      // Description ends with "download it." → If TRUE → Record Included
      // = Record included if EITHER condition is true
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

      // Filter with AND (Logical AND Operator)
      // AND operator requires ALL conditions to be TRUE simultaneously
      // Returns records only when EVERY specified condition matches
      // If ANY condition is false, the record is excluded

      // Example: Returns posts where:
      // 1. Title starts with "Find" AND
      // 2. Description ends with "download it."
      // BOTH conditions must be satisfied

      // Structure: Use array [] for multiple AND conditions
      // Each condition in the array must evaluate to true
      // ****
      // AND: [
      //   {
      //     title: {
      //       startsWith: "Find",
      //     },
      //   },
      //   {
      //     description: {
      //       endsWith: "download it.",
      //     },
      //   },
      // ],

      // Filter with NOT (Logical NOT Operator)
      // =======================================
      // Purpose: Excludes records that match the specified condition
      // Behavior: Acts as an exclusion filter - returns all records EXCEPT those matching the condition

      // Real-world analogy:
      // "Show all products EXCEPT those that are out of stock"
      // "List all employees EXCEPT those in the HR department"

      // Key Characteristics:
      // 1. Returns ALL records that DO NOT satisfy the given condition
      // 2. The condition inside NOT defines what to EXCLUDE
      // 3. Use object {} format (single condition) or combine with other operators
      // 4. Can be nested with OR/AND for complex exclusions

      // Example Logic:
      // NOT { title: { contains: "Restricted" } }
      // = Include all records WHERE title does NOT contain "Restricted"

      // Common Use Cases:
      // - Excluding sensitive/archived content
      // - Filtering out test/dummy data
      // - Removing items with specific status
      // ****
      // NOT: {
      //   title:{
      //     startsWith: "Find"
      //   }
      // },
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

// To search the post
export const searchPost = async (req, res) => {
  const query = req.query.q;
  const posts = await prisma.post.findMany({
    where: {
      description: {
        search: query,
      },
    },
  });
  return res.json({ status: 200, data: posts, message: "Search succesful." });
};
