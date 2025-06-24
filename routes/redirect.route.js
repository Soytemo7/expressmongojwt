import {Router} from "express";
import { redirectLinkController } from "../controllers/redirect.controller.js";

const router = Router();

router.get("/:nanoLink",redirectLinkController);

export default router;