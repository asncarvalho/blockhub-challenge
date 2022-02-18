import * as dotenv from 'dotenv';

dotenv.config();

export const jwtSecret = {
  secret: process.env.APP_SECRET,
};
