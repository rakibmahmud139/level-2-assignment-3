import { Schema, model } from 'mongoose';
import { TReview } from './review.interface';

const ReviewSchema = new Schema<TReview>({
  courseId: Schema.Types.ObjectId,
  rating: {
    type: Number,
    required: [true, 'rating is required'],
  },
  review: {
    type: String,
    required: [true, 'review is required'],
  },
});

export const Review = model<TReview>('Review', ReviewSchema);
