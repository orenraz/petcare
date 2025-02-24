import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

// TODO: checek why this code doesn't work, throw a server error to test
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly configService: ConfigService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const isProduction = this.configService.get<string>('nodeEnv') === 'production';
    const port = this.configService.get<number>('port', 3000); // Default to 3000 if not set

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'An unexpected error occurred. Please try again later.';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();

      if (!isProduction) {
        // Show detailed error in non-production environments
        message = typeof errorResponse === 'string' ? errorResponse : JSON.stringify(errorResponse);
      }
    }

    response.status(status).json({
      statusCode: status,
      message,
      ...(isProduction ? {} : { error: exception instanceof Error ? exception.stack : null }),
      port, // Include port for debugging purposes
    });
  }
}
