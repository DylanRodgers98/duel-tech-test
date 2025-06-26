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

  result.advocacy_programs.forEach((advocacyProgram) => {
    advocacyProgram.tasks_completed.forEach((task) => {
      engagement.likes += task.likes;
      engagement.comments += task.comments;
      engagement.shares += task.shares;
      engagement.reach += task.reach;
    });
    engagement.totalSalesAttributed += advocacyProgram.total_sales_attributed;
  });

  res.json(engagement);
};
