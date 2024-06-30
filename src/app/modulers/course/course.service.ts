import queryBuilder from '../../builder/queryBuilder';
import { TCourse } from './course.interface';
import { Course } from './course.model';
import { Review } from '../review/review.model';
import mongoose from 'mongoose';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const result = await queryBuilder(Course.find(), query);
  return result;
};

const updateCourseFromDB = async (
  courseId: string,
  payload: Partial<TCourse>,
) => {
  const { tags, details, ...remainingData } = payload;

  if (payload?.durationInWeeks) {
    throw new Error('cannot update durationInWeeks');
  }

  const modifiedData: Record<string, unknown> = {
    ...remainingData,
  };

  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedData[`details.${key}`] = value;
    }
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updatedData = await Course.findByIdAndUpdate(courseId, modifiedData, {
      new: true,
      runValidators: true,
      session,
    });

    if (!updatedData) {
      throw new Error('Failed to update course');
    }

    if (tags && tags.length > 0) {
      const deletedTags = tags
        .filter((el) => el.name && el.isDeleted)
        .map((el) => el.name);

      const deletedTagsResult = await Course.findByIdAndUpdate(
        courseId,
        {
          $pull: {
            tags: { name: { $in: deletedTags } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletedTagsResult) {
        throw new Error('Failed to update course');
      }

      const newTags = tags.filter((el) => el.name && !el.isDeleted);

      const newTagsResult = await Course.findByIdAndUpdate(
        courseId,
        {
          $addToSet: { tags: { $each: newTags } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!newTagsResult) {
        throw new Error('Failed to update course');
      }
    }

    const result = await Course.findById(courseId);

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to update course');
  }
};

const getCourseWithReviewFromDB = async (courseId: string) => {
  const course = await Course.findById(courseId);
  const reviews = await Review.find({ courseId });

  return { course, reviews };
};

const getTheBestCourseFromDB = async () => {
  const review = await Review.aggregate([
    {
      $group: {
        _id: '$courseId',
        averageRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 },
      },
    },
    { $limit: 1 },
  ]);
  const { _id: courseId, averageRating, reviewCount } = review[0];

  const course = await Course.findById(courseId);

  return { course, averageRating, reviewCount };
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  updateCourseFromDB,
  getCourseWithReviewFromDB,
  getTheBestCourseFromDB,
};
