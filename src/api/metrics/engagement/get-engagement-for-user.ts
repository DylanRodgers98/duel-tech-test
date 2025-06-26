import { Request, Response } from "express";
import { meilisearch } from "../../../services/meilisearch.js";
import { Advocate } from "../../../domain/advocate.js";
import { Engagement } from "../../../domain/engagement.js";

export const getEngagementForUser = async (
  req: Request<{ userId: string }>,
  res: Response
) => {
  const result = await meilisearch
    .index("advocates")
    .getDocument<Advocate>(req.params.userId, {
      fields: ["advocacy_programs"],
    });

  const engagement: Engagement = {
    likes: 0,
    comments: 0,
    shares: 0,
    reach: 0,
    totalSalesAttributed: 0,
  };

  const normalizeNumber = (num: number | string | null): number => {
    if (num === null) {
      return 0;
    }
    const normalized = Number(num);
    if (Number.isNaN(normalized)) {
      return 0;
    }
    return normalized;
  };

  result.advocacy_programs.forEach((advocacyProgram) => {
    advocacyProgram.tasks_completed.forEach((task) => {
      engagement.likes += normalizeNumber(task.likes);
      engagement.comments += normalizeNumber(task.comments);
      engagement.shares += normalizeNumber(task.shares);
      engagement.reach += normalizeNumber(task.reach);
    });
    engagement.totalSalesAttributed += normalizeNumber(
      advocacyProgram.total_sales_attributed
    );
  });

  res.json(engagement);
};
