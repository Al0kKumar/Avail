import type { Request, Response } from "express";
import { User } from "./user.model.js";
import { asyncHandler } from "../../common/asyncHandler.js";

export const getUserByPublicSlug = asyncHandler(
  async (req: Request, res: Response) => {
    const { slug } = req.params;

    const user = await User.findOne({ publicSlug: slug }).lean();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user._id,
      name: user.name,
      publicSlug: user.publicSlug,
      timezone: user.timezone,
    });
  }
);



export const getMe = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(req.user.userId).select(
      '_id name email publicSlug timezone'
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      publicSlug: user.publicSlug,
      timezone: user.timezone,
    });
  }
);
