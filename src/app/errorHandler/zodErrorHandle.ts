/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodError } from 'zod';

const zodErrorHandle = (err: ZodError) => {
  const statusCode = 400;
  const message = 'Validation error';

  const error = err.message;
  const errorStr = JSON.parse(error);
  const errorMs = errorStr
    .map(
      (er: { path: any[]; message: any }) => `${er.path[1]} is ${er.message}`,
    )
    .join('. ');
  const errorMessage = errorMs;

  const issues = err.issues;
  const errorDetails = { issues, name: err.name };

  return {
    statusCode,
    message,
    errorMessage,
    errorDetails,
  };
};

export default zodErrorHandle;
