import express from "express";
import {
    getAdmin, 
    createAdmin
} from "../controllers/AdminController.js";

const router = express.Router();

router.get('/admin', getAdmin);
router.post('/admin', createAdmin);

export default router;