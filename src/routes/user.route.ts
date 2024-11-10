import express from "express";
import {
  deleteUser,
  getByAccountNumber,
  getByIdentityNumber,
  getUsers,
  patchUser,
  postUser,
} from "../controllers/user.controller";

const router = express.Router();

router.get("/", getUsers);
router.get("/account-number/:acc_number", getByAccountNumber);
router.get("/identity-number/:iden_number", getByIdentityNumber);
router.post("/", postUser);
router.patch("/:iden_number", patchUser);
router.delete("/:iden_number", deleteUser);

export default router;
