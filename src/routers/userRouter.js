import express from "express";

const handleEditUser = (req, res) => {
    return res.send("<h1>Edit User</h1>");
}

const handleDelete = (req, res) => {
    return res.send("<h1>Delete User</h1>");
};


// users
const userRouter = express.Router();
userRouter.get('/edit', handleEditUser);
userRouter.get("/delete", handleDelete);
export default userRouter;


