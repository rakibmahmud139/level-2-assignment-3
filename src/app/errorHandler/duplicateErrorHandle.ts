/* eslint-disable @typescript-eslint/no-explicit-any */
const duplicateErrorHandle = (err: any) => {
  const statusCode = 400;
  const message = 'duplicate error';
  let errorMessage = '';
  const match = err.message.match(/"(.*?)"/);
  if (match) {
    errorMessage = match[1];
  }
  const errorDetails = err;

  return {
    statusCode,
    message,
    errorMessage,
    errorDetails,
  };
};

export default duplicateErrorHandle;
