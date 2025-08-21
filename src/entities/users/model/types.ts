import {SearchReviewCard} from '@/entities/review';

export type PostsByUserResult = {
  results: SearchReviewCard[];
  next_cursor: number | null;
  has_next: boolean;
  total_results: number;
};

export type ProfileImage = {
  profileImage: string;
};
