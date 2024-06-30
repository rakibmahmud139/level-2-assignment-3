import catchAsync from '../../utils/catchAsync';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  return res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'Course created successfully',
    data: result,
  });
});

const getAllCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCourseFromDB(req.query);

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Courses retrieved successfully',
    meta: {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
      total: result.length,
    },
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const courseId = req.params.courseId;
  const result = await CourseServices.updateCourseFromDB(courseId, req.body);
  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Course updated successfully',
    data: result,
  });
});

const getCourseWithReviews = catchAsync(async (req, res) => {
  const courseId = req.params.courseId;
  const result = await CourseServices.getCourseWithReviewFromDB(courseId);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Course and Reviews retrieved successfully',
    data: result,
  });
});

const getTheBestCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.getTheBestCourseFromDB();

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Best course retrieved successfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourse,
  updateCourse,
  getCourseWithReviews,
  getTheBestCourse,
};
