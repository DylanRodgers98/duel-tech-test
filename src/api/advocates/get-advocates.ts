import { Request, Response } from "express";
import { meilisearch } from "../../services/meilisearch.js";

export const getAdvocates = async (req: Request, res: Response) => {
  const query = req.query.search ? String(req.query.search) : undefined;

  const advocates = await meilisearch.index("advocates").search(query, {
    facets: ["advocacy_programs.tasks_completed.platform"],
    sort: ["joined_at:asc"],
  });

  res.json(advocates);
};
