import { Router, Request, Response } from "express";

import { User, ResponseType, SuccessResponse, ErrorResponse } from "../types";
import { geChatData } from "../utils/functions";

const router = Router();

router.get(
  "/users",
  async (req: Request, res: Response<ResponseType<User[]>>): Promise<any> => {
    try {
      const data = await geChatData();
      return res.json({
        status: "success",
        data: data.users, // Return the list of users
      } as SuccessResponse<User[]>);
    } catch (error) {
      return res.status(500).json({
        status: "error",
        error: "Could not retrieve users",
      } as ErrorResponse);
    }
  }
);

export default router;
