export type Review = {
  board_id: string;
  title: string;
  author: string;
  category: string;
  content: string;
  comments_count: number;
  bookmarks: number;
  image_url: string;
};

export type BestReviewCategory = 'all' | 'food' | 'car' | 'company' | 'cosmetic' | 'cafe' | 'devices1' | 'clothes';

export type BestReviewMapped = {
  [key in BestReviewCategory]: {
    count: number;
    reviews: Review[];
  };
};

export type SearchReviewWithQuery = {
  results: Review[];
  current_page: number;
  total_pages: number;
};
