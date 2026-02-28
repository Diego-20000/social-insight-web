import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import type { Database } from './db';

export interface Context {
  db: Database;
  userId?: number;
}

export const createContext = async (
  opts: CreateExpressContextOptions,
  db: Database,
): Promise<Context> => {
  const token = opts.req.headers.authorization?.split(' ')[1];
  let userId: number | undefined;

  if (token) {
    try {
      // Aquí se validaría el JWT
      // const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      // userId = decoded.userId;
    } catch (error) {
      console.error('Token validation error:', error);
    }
  }

  return {
    db,
    userId,
  };
};
