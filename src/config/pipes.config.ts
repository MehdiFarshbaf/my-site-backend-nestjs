import {BadRequestException, INestApplication, ValidationPipe} from "@nestjs/common";
import {ValidationError} from "class-validator";

export const applyGlobalPipes = (app: INestApplication) => {
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },

            // این قسمت خطاها را به شکل دلخواه ما تبدیل می‌کند
            exceptionFactory: (validationErrors: ValidationError[]) => {
                const errors: Record<string, string[]> = {};

                validationErrors.forEach((err) => {
                    if (err.property && err.constraints) {
                        errors[err.property] = Object.values(err.constraints);
                    }
                });

                return new BadRequestException({
                    success: false,
                    message: 'داده‌های ارسالی معتبر نیستند',
                    errors,
                    data: null,
                });
            },
        }),
    );
};