import { z } from 'zod';
import { router, publicProcedure } from '../core/trpc';
import { projects, codeSnippets } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';

export const projectsRouter = router({
  list: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.projects.findMany();
  }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const project = await ctx.db.query.projects.findFirst({
        where: eq(projects.slug, input.slug),
      });

      if (!project) {
        throw new Error('Project not found');
      }

      const snippets = await ctx.db.query.codeSnippets.findMany({
        where: eq(codeSnippets.projectId, project.id),
      });

      return { ...project, snippets };
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        slug: z.string(),
        description: z.string(),
        category: z.string(),
        emoji: z.string(),
        difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.insert(projects).values(input);
      return result;
    }),
});
