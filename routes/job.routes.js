import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { getAdminJobs, getAllJobs, getJobById, postJob, deleteJob } from '../controllers/job.controller.js';
const router = express.Router();
router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/getAdminjobs").get(isAuthenticated, getAdminJobs);
// New route for deleting a job
router.route("/delete/:id").delete(isAuthenticated, deleteJob);
export default router;

