import catchAsync from '../../utils/catchAsync';
import { CategoryServices } from './category.service';

const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.createCategoryIntoDB(req.body);

  return res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'Category created successfully',
    data: result,
  });
});

const getAllCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategoryFromDB();

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Categories retrieved successfully',
    data: result,
  });
});

export const CategoryControllers = {
  createCategory,
  getAllCategory,
};
