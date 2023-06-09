import express from "express";
import {
  register,
  getMyProfile,
  changePassword,
  login,
  logout,
  updateProfile,
  updateProfilePicture,
  forgetPassword,
  resetPassword,
  addToPlaylist,
  removeFromPlaylist,
  getAllUsers,
  updateUserRole,
  deleteUser,
  deleteMyProfile
} from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

//to register a new user
router.route("/register").post(singleUpload, register);

//login
router.route("/login").post(login);

//logout
router.route("/logout").get(logout);

//get my profile
router.route("/me").get(isAuthenticated, getMyProfile);

//delete my profile
router.route("/me").delete(isAuthenticated, deleteMyProfile);

//change password
router.route("/changepassword").put(isAuthenticated, changePassword);

//Update profile
router.route("/updateprofile").put(isAuthenticated, updateProfile);

//update profile picture
router
  .route("/updateprofilepicture")
  .put(singleUpload, isAuthenticated, updateProfilePicture);

//forget password
router.route("/forgetpassword").post(forgetPassword);

//reset password
router.route("/resetpassword/:token").put(resetPassword);

//AddtoPlayList
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);

//RemovefromPlaylist
router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);

//Admin Routes
router.route("/admin/users").get(isAuthenticated, authorizeAdmin, getAllUsers);

router
  .route("/admin/users/:id")
  .put(isAuthenticated, authorizeAdmin, updateUserRole)
  .delete(isAuthenticated, authorizeAdmin, deleteUser);

export default router;
