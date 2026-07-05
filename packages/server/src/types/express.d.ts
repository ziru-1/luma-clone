import type { JWTPayload } from 'jose';
import type { User } from '../generated/prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
      dbUser?: User;
    }
  }
}
