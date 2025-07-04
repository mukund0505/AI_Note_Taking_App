import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
  args: {
    email: v.string(),
    userName: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    // if user already exists
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    // if user does not exist, create a new user
    if (user?.length == 0) {
      await ctx.db.insert("users", {
        email: args.email,
        userName: args.userName,
        imageUrl: args.imageUrl,
        upgrade: false, // default value for upgrade
      });
      return "User created successfully";
    }
    // if user exists, return the user
    return "User already exists";
  },
});

export const userUpgradePlan = mutation({
  args: {
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    // find user by email
    const result = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.userEmail))
      .collect();

    if (result) {
      // update the user upgrade status
      await ctx.db.patch(result[0]._id, {
        upgrade: true,
      });
      return "User upgraded successfully";
    }
    return "User not found";
  },
});

export const GetUserInfo = query({
  args: {
    userEmail: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!args?.userEmail) {
      return null; // Return null if no email is provided
    }
    // find user by email
    const result = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args?.userEmail))
      .collect();

    return result[0] || null;
  },
});
