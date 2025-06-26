import { Request, Response } from 'express';
import { meilisearch } from '../../../services/meilisearch.js';
import { Advocate } from '../../../domain/advocate.js';
import { Engagement } from '../../../domain/engagement.js';

const getAllPlatforms = async (): Promise<string[]> => {
  const { facetHits } = await meilisearch
    .index('advocates')
    .searchForFacetValues({
      facetName: 'advocacy_programs.tasks_completed.platform',
    });

  return facetHits.map((hit) => hit.value);
};

export const getEngagementPerPlatform = async (
  req: Request<{ platform?: string }>,
  res: Response,
) => {
  const platforms: string[] = [];
  if (req.params.platform) {
    platforms.push(req.params.platform);
  } else {
    const allPlatforms = await getAllPlatforms();
    platforms.push(...allPlatforms);
  }

  const map = new Map<string, Engagement>();
  for (const platform of platforms) {
    const { results } = await meilisearch
      .index('advocates')
      .getDocuments<Advocate>({
        fields: ['advocacy_programs'],
        filter: `advocacy_programs.tasks_completed.platform = ${platform}`,
      });

    const engagementForPlatform: Engagement = {
      likes: 0,
      comments: 0,
      shares: 0,
      reach: 0,
      totalSalesAttributed: 0,
    };

    results.forEach((result) => {
      result.advocacy_programs.forEach((advocacyProgram) => {
        advocacyProgram.tasks_completed.forEach((task) => {
          engagementForPlatform.likes += task.likes;
          engagementForPlatform.comments += task.comments;
          engagementForPlatform.shares += task.shares;
          engagementForPlatform.reach += task.reach;
        });
        engagementForPlatform.totalSalesAttributed +=
          advocacyProgram.total_sales_attributed;
      });
    });

    map.set(platform, engagementForPlatform);
  }

  if (req.params.platform) {
    res.json(map.get(req.params.platform));
  } else {
    res.json(Object.fromEntries(map.entries()));
  }
};
