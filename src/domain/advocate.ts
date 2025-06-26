export interface Advocate {
  user_id: string;
  name: string;
  email: string;
  instagram_handle: string;
  tiktok_handle: string;
  joined_at: Date;
  advocacy_programs: {
    total_sales_attributed: number;
    tasks_completed: CompletedTask[];
  }[];
}

interface CompletedTask {
  task_id: string;
  platform: string;
  post_url: string;
  likes: number;
  comments: number;
  shares: number;
  reach: number;
}
