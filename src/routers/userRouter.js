import express from "express";

const handleEditUser = (req, res) => {
    return res.send("<h1>Edit User</h1>");
}

// users
const userRouter = express.Router();
userRouter.get('/edit', handleEditUser);
export default userRouter;


