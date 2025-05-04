import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google Profile:", profile);

        // Check if user already exists in database
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // Create new user without password
          user = new User({
            googleId: profile.id,
            username: profile.displayName || profile.emails[0].value, // Use name or email
            email: profile.emails[0].value,
            password: "", // No password required for Google users
          });

          await user.save();
        }

        return done(null, user);
      } catch (error) {
        console.error("Error in Google OAuth:", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
