import { Request, Response } from 'express';
import { meilisearch } from '../../services/meilisearch.js';
import { Advocate } from '../../domain/advocate.js';
import { z } from 'zod/v4';

const querySchema = z.object({
  filter: z.string().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});

export const getAdvocates = async (req: Request, res: Response) => {
  const query = querySchema.parse(req.query);
  const advocates = await meilisearch
    .index('advocates')
    .getDocuments<Advocate>(query);

  res.json(advocates);
};
