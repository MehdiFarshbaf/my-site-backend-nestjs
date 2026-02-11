// http-exception.filter.ts
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let body: any = {
            success: false,
            message: 'خطای داخلی سرور',
            data: null,
        };

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse();

            // اگر پاسخ خود BadRequestException ما باشد → مستقیم استفاده کن
            if (typeof res === 'object' && 'success' in res && 'errors' in res) {
                body = res;
            } else {
                // سایر HttpExceptionها
                body = {
                    success: false,
                    message: typeof res === 'string' ? res : (res as any)?.message || 'خطا',
                    data: null,
                };
            }
        } else if (exception instanceof Error) {
            this.logger.error(`${request.method} ${request.url}`, exception.stack);
            body.message = process.env.NODE_ENV === 'production'
                ? 'خطای داخلی سرور'
                : exception.message;
        }

        response.status(status).json(body);
    }
}

// import {
//     ExceptionFilter,
//     Catch,
//     ArgumentsHost,
//     HttpException,
//     HttpStatus,
//     Logger,
// } from '@nestjs/common';
// import { Response } from 'express';
//
// @Catch()
// export class HttpExceptionFilter implements ExceptionFilter {
//     private readonly logger = new Logger(HttpExceptionFilter.name);
//
//     catch(exception: unknown, host: ArgumentsHost) {
//         const ctx = host.switchToHttp();
//         const response = ctx.getResponse<Response>();
//         const request = ctx.getRequest();
//
//         let status = HttpStatus.INTERNAL_SERVER_ERROR;
//         let message = 'Internal server error';
//
//         if (exception instanceof HttpException) {
//             status = exception.getStatus();
//             const exceptionResponse = exception.getResponse();
//
//             if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
//                 message = (exceptionResponse as any).message || message;
//
//                 if (Array.isArray(message)) {
//                     message = message.join(', ');
//                 }
//             } else {
//                 message = exceptionResponse as string;
//             }
//         } else if (exception instanceof Error) {
//             message = exception.message;
//         }
//
//         this.logger.error(
//             `${request.method} ${request.url}`,
//             exception instanceof Error ? exception.stack : exception,
//         );
//
//         response.status(status).json({
//             success: false,
//             message,
//             data: null,
//         });
//     }
// }