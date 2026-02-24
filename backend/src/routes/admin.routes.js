

import express from "express"
import { getViolations } from "../services/adminService.js"
import {
    createRule, 
    deleteRule, 
    getRules, 
    updateRule 
} from "../controllers/admin.controller.js";

const router = express.Router()
router.post("/rules", createRule);
router.get("/rules", getRules);
router.put("/rules/:id", updateRule);
router.delete("/rules/:id", deleteRule);

router.get('/violations',getViolations)

export default router