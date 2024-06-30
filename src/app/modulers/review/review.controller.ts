import catchAsync from '../../utils/catchAsync';
import { ReviewServices } from './review.service';

const createReview = catchAsync(async (req, res) => {
  const result = await ReviewServices.createReviewIntoDB(req.body);

  return res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'Review created successfully',
    data: result,
  });
});

export const ReviewControllers = {
  createReview,
};
