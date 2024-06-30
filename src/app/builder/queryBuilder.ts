import { FilterQuery, Query } from 'mongoose';

const queryBuilder = async <T>(
  modelQuery: Query<T[], T>,
  query: Record<string, unknown>,
) => {
  const queryObj = { ...query };

  const excludeFields = ['page', 'limit', 'sortOrder', 'sortBy'];

  excludeFields.forEach((field) => delete queryObj[field]);

  modelQuery.find(queryObj as FilterQuery<T>);

  // Filtering by price range
  if (query.minPrice && query.maxPrice) {
    const minPrice = Number(query.minPrice);
    const maxPrice = Number(query.maxPrice);

    modelQuery.find({ price: { $gte: minPrice, $lte: maxPrice } });
  } else if (query.minPrice) {
    const minPrice = Number(query.minPrice);
    modelQuery.find({ price: { $gte: minPrice } });
  } else if (query.maxPrice) {
    const maxPrice = Number(query.maxPrice);
    modelQuery.find({ price: { $lte: maxPrice } });
  }

  // Filtering by tags
  if (query.tags) {
    const tags = query.tags as string;
    modelQuery.find({ tags: { $elemMatch: { name: tags } } });
  }

  // Filtering by date range
  if (query.startDate || query.endDate) {
    const startDate = query.startDate as string;
    const endDate = query.endDate as string;

    modelQuery.find({
      startDate: { $gte: startDate },
      endDate: { $lte: endDate },
    });
  }

  // Filtering by language
  if (query.language) {
    const language = query.language as string;
    modelQuery.find({ language });
  }

  // Filtering by provider
  if (query.provider) {
    const provider = query.provider as string;
    modelQuery.find({ provider });
  }

  // Filtering by duration in weeks
  if (query.durationInWeeks) {
    const durationInWeeks = Number(query.durationInWeeks);
    modelQuery.find({ durationInWeeks });
  }

  // Filtering by level
  if (query.level) {
    const level = query.level as string;
    modelQuery.find({ 'details.level': level });
  }

  if (query.page || query.limit) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    modelQuery.find().skip(skip).limit(limit);
  }

  if (query.sortBy && query.sortOrder) {
    const sortBy = query.sortBy;
    const sortOrder = query.sortOrder || 'asc';

    const sort = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;

    modelQuery.find().sort(sort);
  }

  return modelQuery;
};

export default queryBuilder;
