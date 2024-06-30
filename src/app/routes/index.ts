import { Router } from 'express';
import { CourseRoute } from '../modulers/course/course.route';
import { CategoryRoute } from '../modulers/category/category.route';
import { ReviewRoute } from '../modulers/review/review.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/',
    route: CourseRoute,
  },
  {
    path: '/categories',
    route: CategoryRoute,
  },
  {
    path: '/reviews',
    route: ReviewRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
