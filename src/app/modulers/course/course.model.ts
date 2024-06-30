import { Schema, model } from 'mongoose';
import { TCourse, TDetails, TTags } from './course.interface';

const TagsSchema = new Schema<TTags>({
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const DetailsSchema = new Schema<TDetails>({
  level: {
    type: String,
    required: [true, 'level is required'],
  },
  description: {
    type: String,
    required: [true, 'description is required'],
  },
});

const CourseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: [true, 'title is required'],
    unique: true,
  },
  instructor: {
    type: String,
    required: [true, 'instructor is required'],
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'categoryId is required'],
  },
  price: {
    type: Number,
    required: [true, 'price is required'],
  },
  tags: {
    type: [TagsSchema],
    required: [true, 'tags is required'],
  },
  startDate: {
    type: String,
    required: [true, 'startDate is required'],
  },
  endDate: {
    type: String,
    required: [true, 'endDate is required'],
  },
  language: {
    type: String,
    required: [true, 'language is required'],
  },
  provider: {
    type: String,
    required: [true, 'provider is required'],
  },
  durationInWeeks: {
    type: Number,
  },
  details: {
    type: DetailsSchema,
    required: [true, 'details is required'],
  },
});

CourseSchema.pre('save', function (next) {
  const startDate = new Date(this.startDate);
  const endDate = new Date(this.endDate);

  const durationInWeeks = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7),
  );

  this.durationInWeeks = durationInWeeks;

  next();
});

CourseSchema.pre('findOneAndUpdate', async function () {
  const update = this.getUpdate() as { startDate?: string; endDate?: string };

  if (update.startDate && update.endDate) {
    const startDate = new Date(update.startDate);
    const endDate = new Date(update.endDate);

    const durationInWeeks = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7),
    );

    this.updateOne({}, { $set: { durationInWeeks } });
  }
});

export const Course = model<TCourse>('Course', CourseSchema);
