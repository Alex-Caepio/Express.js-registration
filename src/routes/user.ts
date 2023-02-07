import { Request, Response, NextFunction, Router } from "express";
import { signUpUser } from "../controllers/registrationController";
import { index } from "../controllers/indexController";
import { checkAdminApiKey } from "../middleware/reqAdminApiKey";
import { checkAuthUser } from "../middleware/authUser";
import { postUser } from "../controllers/createController";
import { deleteUserById } from "../controllers/deleteController";
import { updateUser } from "../controllers/updateController";
import { checkSecretApiKey } from "../middleware/secretKey";
import { getUserById } from "../controllers/getByIdController";

const router: Router = Router();

router.post("/signup", signUpUser);
router.get("/index", checkAuthUser, index);
router.post("/post", checkAdminApiKey, postUser);
router.post("/delete/:id", checkAdminApiKey, deleteUserById);
router.put("/update/:id", updateUser);
router.get("/get/:id", checkSecretApiKey, getUserById);

export default router;
