import { Router } from "express";
import {
  addData,
  deleteData,
  getData,
  updateData,
} from "../controllers/userController";

const route = Router();

route.get("/", getData);
route.post("/create", addData);
route.delete("/:id", deleteData);
route.patch("/:id", updateData);

export default route;
