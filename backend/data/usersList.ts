import bcrypt from "bcryptjs";

const usersList = [
  {
    name: "Admin User",
    email: "admin@email.com",
    password: bcrypt.hashSync("12345678", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@email.com",
    password: bcrypt.hashSync("12345678", 10),
    isAdmin: true,
  },
  {
    name: "Lorem Doe",
    email: "lorem@email.com",
    password: bcrypt.hashSync("12345678", 10),
    isAdmin: false,
  },
];

export default usersList;
