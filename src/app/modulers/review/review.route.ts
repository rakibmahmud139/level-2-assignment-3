import express from 'express';
import validationRequest from '../../middleware/validationRequest';
import { reviewValidations } from './review.validation';
import { ReviewControllers } from './review.controller';

const router = express.Router();

router.post(
  '/',
  validationRequest(reviewValidations.createReviewValidationSchema),
  ReviewControllers.createReview,
);

export const ReviewRoute = router;
