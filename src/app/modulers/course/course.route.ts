import express from 'express';
import validationRequest from '../../middleware/validationRequest';
import { courseValidations } from './course.validation';
import { CourseControllers } from './course.controller';

const router = express.Router();

router.post(
  '/course',
  validationRequest(courseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get('/courses', CourseControllers.getAllCourse);

router.put(
  '/courses/:courseId',
  validationRequest(courseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.get(
  '/courses/:courseId/reviews',
  CourseControllers.getCourseWithReviews,
);

router.get('/course/best', CourseControllers.getTheBestCourse);

export const CourseRoute = router;
