import mongoose from "mongoose";
import { UserModel } from "../models/user.model";

const removeDuplicateUsers = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/chat_db"
    );

    const duplicates = await UserModel.aggregate([
      {
        $group: {
          _id: "$username",
          count: { $sum: 1 },
          ids: { $push: "$_id" },
        },
      },
      {
        $match: {
          count: { $gt: 1 },
        },
      },
    ]);

    for (const group of duplicates) {
      const idsToDelete = group.ids.slice(1);
      await UserModel.deleteMany({ _id: { $in: idsToDelete } });
      console.log(
        `Removed ${idsToDelete.length} duplicates for username: ${group._id}`
      );
    }

    console.log("Duplicate users removed successfully!");
  } catch (error) {
    console.error("Error removing duplicate users:", error);
  } finally {
    mongoose.connection.close();
  }
};

removeDuplicateUsers();
