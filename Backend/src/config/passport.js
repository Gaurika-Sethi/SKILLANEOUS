import "./env.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js";

const normalizeUsername = (name) => {
  if (!name) return "user";
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 24) || "user";
};

const generateUniqueUsername = async (base) => {
  const normalized = normalizeUsername(base);
  let username = normalized;
  let counter = 1;

  while (await User.exists({ username })) {
    username = `${normalized}-${counter}`;
    counter += 1;
  }

  return username;
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value?.toLowerCase();
        const googleId = profile.id;
        const avatarUrl = profile.photos?.[0]?.value;

        let user = await User.findOne({
          $or: [{ googleId }, { email }],
        });

        if (user) {
          user.googleId = user.googleId || googleId;
          user.authProvider = "google";
          user.avatarUrl = user.avatarUrl || avatarUrl;
          if (!user.username) {
            user.username = await generateUniqueUsername(profile.displayName || email);
          }
          if (!user.email && email) {
            user.email = email;
          }
          await user.save({ validateBeforeSave: false });
          return done(null, user);
        }

        const username = await generateUniqueUsername(profile.displayName || email);

        user = await User.create({
          username,
          email,
          googleId,
          authProvider: "google",
          avatarUrl,
        });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
