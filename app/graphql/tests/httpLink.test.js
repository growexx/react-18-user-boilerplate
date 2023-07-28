import { extractMessage } from '../httpLink';

describe('extractMessage', () => {
  it('should return default error', () => {
    const errorExtension = {
      exception: {
        statusCode: 400,
        message: 'Bad Request',
      },
    };
    const result = extractMessage(errorExtension);
    expect(result).toEqual({
      statusCode: 500,
      message: 'Something went wrong!',
    });
  });

  it('should handle HTTP exception when response is a string', () => {
    const errorExtension = {
      exception: {
        status: 404,
        response: 'Not Found',
      },
    };
    const result = extractMessage(errorExtension);
    expect(result).toEqual({
      statusCode: 404,
      message: 'Not Found',
    });
  });

  it('should handle error with no response', () => {
    const errorExtension = {
      exception: {
        message: 'Bad Request',
        response: {
          statusCode: 400,
          message: ['Bad Request'],
        },
      },
    };
    const result = extractMessage(errorExtension);
    expect(result).toEqual({
      statusCode: 400,
      message: 'Bad Request',
    });
  });

  it('should handle actual error with response', () => {
    const errorExtension = {
      exception: {
        response: {
          status: 403,
          message: 'Forbidden',
          response: 'Error',
        },
      },
    };
    const result = extractMessage(errorExtension);
    expect(result).toEqual({
      statusCode: 403,
      message: 'Error',
    });
  });

  it('should handle error for errorResponse response object', () => {
    const errorExtension = {
      exception: {
        response: {
          status: 403,
          message: 'Forbidden',
          response: {
            statusCode: 401,
            message: 'Error',
          },
        },
      },
    };
    const result = extractMessage(errorExtension);
    expect(result).toEqual({
      statusCode: 401,
      message: 'Error',
    });
  });

  it('should handle actual error with response as string', () => {
    const errorExtension = {
      exception: {
        status: 500,
        response: 'Internal Server Error',
      },
    };
    const result = extractMessage(errorExtension);
    expect(result).toEqual({
      statusCode: 500,
      message: 'Internal Server Error',
    });
  });

  it('should handle error with response and array message', () => {
    const errorExtension = {
      exception: {
        response: {
          statusCode: 422,
          message: ['Validation Error 1', 'Validation Error 2'],
        },
      },
    };
    const result = extractMessage(errorExtension);
    expect(result).toEqual({
      statusCode: 422,
      message: 'Validation Error 1',
    });
  });
});
