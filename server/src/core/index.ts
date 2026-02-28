import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { router } from './trpc';
import { createContext, type Context } from './context';
import { initializeDatabase } from './db';
import { projectsRouter } from '../routes/projects';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const appRouter = router({
  projects: projectsRouter,
});

export type AppRouter = typeof appRouter;

async function startServer() {
  try {
    const db = await initializeDatabase();

    app.use(
      '/trpc',
      createExpressMiddleware({
        router: appRouter,
        createContext: async (opts) => createContext(opts, db),
      }),
    );

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
