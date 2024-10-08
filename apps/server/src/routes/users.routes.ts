import { Router, Request, Response } from "express";
import { User, ResponseType, SuccessResponse, ErrorResponse } from "../types";
import { UserModel } from "../models/user.model";

const router = Router();

router.get(
  "/users",
  async (req: Request, res: Response<ResponseType<User[]>>): Promise<void> => {
    try {
      // Fetch all users from the database
      const users = await UserModel.find({});
      res.json({
        status: "success",
        data: users,
      } as SuccessResponse<User[]>);
      return;
    } catch (error) {
      res.status(500).json({
        status: "error",
        error: "Could not retrieve users",
      } as ErrorResponse);
      return;
    }
  }
);

export default router;
