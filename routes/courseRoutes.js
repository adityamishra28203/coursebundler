import express from "express";
import singleUpload from "../middlewares/multer.js";
import { addLecture, createCourse, deleteCourse, deleteLecture, getAllCourses, getCourseLectures} from "../controllers/courseController.js"
import { authorizeAdmin, isAuthenticated, authorizeSubscribers } from "../middlewares/auth.js";

const router = express.Router();

// Get All courses without lectures
router.route("/courses").get(getAllCourses);

//create new course only admin
router.route("/createcourse").post(isAuthenticated, authorizeAdmin, singleUpload, createCourse);

//add lecture, delete course, get course details
router
    .route("/course/:id")
    .get(isAuthenticated, authorizeSubscribers, getCourseLectures)
    .post(isAuthenticated, singleUpload, addLecture)
    .delete(isAuthenticated, authorizeAdmin, deleteCourse);

// delete lecture
router.route("/lecture").delete(isAuthenticated, authorizeAdmin, deleteLecture);


export default router;
