import { Request, Response } from 'express';
import { meilisearch } from '../../services/meilisearch.js';
import { Advocate } from '../../domain/advocate.js';
import { z } from 'zod/v4';

const querySchema = z.object({
  query: z.string(),
  sort: z.string().optional(),
});

export const searchAdvocates = async (req: Request, res: Response) => {
  const { query, sort } = querySchema.parse(req.query);

  const advocates = await meilisearch
    .index('advocates')
    .search<Advocate>(query, {
      facets: ['advocacy_programs.tasks_completed.platform'],
      sort: sort ? [sort] : undefined,
    });

  res.json(advocates);
};
