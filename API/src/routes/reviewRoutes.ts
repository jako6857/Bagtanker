import { Router } from "express";
import { reviewController } from "../controllers/reviewController.js";
import { authController } from "../controllers/authController.js";

const routes = Router();
routes.get("/", reviewController.getRecords);
routes.get("/byProductId/:id", reviewController.getRecordsByProductId);
routes.get("/byid/:reviewId", reviewController.getRecord);
routes.post("/", authController.authorize, reviewController.createRecord);
routes.put("/:id", authController.authorize, reviewController.updateRecord);
routes.delete("/:id", authController.authorize, reviewController.deleteRecord);

export const reviewRoutes = routes;
