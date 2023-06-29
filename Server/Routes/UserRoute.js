import express from "express";
import { UnfollowUser, deleteUser, followUser, getAllUsers, getUser, updateUser } from "../Controllers/UserControllers.js";
import authMiddleware from "../Middleware/authMiddleware.js";
const router = express.Router();

router.get('/', getAllUsers)
router.get('/:id', getUser)
router.put('/:id', authMiddleware, updateUser)
router.delete("/:id", authMiddleware, deleteUser);
router.put('/:id/follow', authMiddleware, followUser)
router.put('/:id/unfollow', authMiddleware, UnfollowUser)

export default router;