import express from 'express';
import validationRequest from '../../middleware/validationRequest';
import { categoryValidations } from './category.validation';
import { CategoryControllers } from './category.controller';

const router = express.Router();

router.post(
  '/',
  validationRequest(categoryValidations.createCategoryValidationSchema),
  CategoryControllers.createCategory,
);

router.get('/', CategoryControllers.getAllCategory);

export const CategoryRoute = router;
