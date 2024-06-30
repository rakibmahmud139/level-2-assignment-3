import mongoose from 'mongoose';

const validationErrorHandle = (err: mongoose.Error.ValidationError) => {
  const statusCode = 400;
  const message = 'Validation error';

  const errorMessage = Object.values(err.errors)
    .map((issue) => issue.message)
    .join('. ');

  const issues = err.errors;

  const errorDetails = {
    issues,
    name: err.name,
  };

  return {
    statusCode,
    message,
    errorMessage,
    errorDetails,
  };
};

export default validationErrorHandle;
