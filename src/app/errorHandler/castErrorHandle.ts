import mongoose from 'mongoose';

const castErrorHandle = (err: mongoose.Error.CastError) => {
  const statusCode = 400;
  const message = 'Invalid ID';

  const errorMessage = `${err.value} is not a valid ID!`;

  const errorDetails = err;

  return {
    statusCode,
    message,
    errorMessage,
    errorDetails,
  };
};

export default castErrorHandle;
