import { Sleep } from "../models/sleep.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Creating a new user
export const createUser = asyncHandler(async (req, res) => {
  try {
    //getting username from the request
    const { username } = req.body;
    console.log("username: ", username);

    // checking if username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      throw new ApiError(409, "User with this username already exists");
    }

    // creating user with the particular username
    const user = await User.create({
      username: username.toLowerCase(),
      sleepRecord: [],
    });

    res
      .status(201)
      .json(new ApiResponse(201, user, "User created successfully"));
  } catch (error) {
    console.error("Error creating user:", error);
    throw new ApiError(400, "Error creating user: " + error.message);
  }
});

// Adding a sleep record for a user
export const addSleepRecord = asyncHandler(async (req, res) => {
  try {
    const { userId, duration, timestamp } = req.body;

    // Checking if the user exists
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(409, "User not found");
    }

    // Creating a new sleep record
    const sleepRecord = await Sleep.create({
      user: user._id,
      duration,
      timestamp,
    });

    // Updating the user's sleepRecord array
    user.sleepRecord.push(sleepRecord._id);
    await user.save();

    res
      .status(201)
      .json(
        new ApiResponse(200, sleepRecord, "Sleep record created Successfully")
      );
  } catch (error) {
    throw new ApiError(400, "Error is creating sleep record: ", error.message);
  }
});

// Get all sleep records for a user
export const getSleepRecordsByUserId = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;

    // Checking if the user exists
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Using aggregation pipeline to fetch sleep records for the user
    const sleepRecords = await Sleep.aggregate([
      {
        $match: {
          user: user._id,
        },
      },
      {
        $sort: {
          timestamp: 1,
        },
      },
    ]);

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          sleepRecords,
          "Sleep records for user fetched successfully"
        )
      );
  } catch (error) {
    throw new ApiError(400, "Error fetching sleep records for user");
  }
});

// Delete a sleep record by its ID
export const deleteSleepRecordById = asyncHandler(async (req, res) => {
  try {
    const recordId = req.params.recordId;
    // matching with record id and deleting
    const deletionResult = await Sleep.deleteOne({ _id: recordId });

    if (deletionResult.deletedCount === 0) {
      throw new ApiError(404, "Sleep record not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Sleep record deleted successfully"));
  } catch (error) {
    throw new ApiError(400, "Error deleting sleep record");
  }
});
