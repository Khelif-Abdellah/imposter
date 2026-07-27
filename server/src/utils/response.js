/**
 * ----------------------------------------
 * API Response Helpers
 * ----------------------------------------
 */

function successResponse(
  res,
  data = null,
  message = "Request successful.",
  statusCode = 200
) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

//    * Send an error response. *
function errorResponse(
  res,
  message = "Something went wrong.",
  statusCode = 500,
  errors = null
) {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
}

export { successResponse, errorResponse };
