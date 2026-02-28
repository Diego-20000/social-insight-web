import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../server/src/core/index';

export const trpc = createTRPCReact<AppRouter>();
