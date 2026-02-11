import { INestApplication } from '@nestjs/common';

import { applyCors } from './cors.config';
import { setupSwagger } from './swagger.config';
import { applyGlobalPipes } from './pipes.config';
import { applyGlobalPrefix } from './prefix.config';

/**
 * Central place to configure the NestJS application.
 * All global middleware, pipes, prefixes, CORS, Swagger, etc.
 * should be applied here in a predictable order.
 *
 * @param app - The NestJS application instance
 */
export function configureApp(app: INestApplication): void {
    // 1. Apply global route prefix first
    // (so that other configurations like Swagger know the correct base path)
    applyGlobalPrefix(app);

    // 2. Enable Cross-Origin Resource Sharing (CORS)
    // Important for frontend applications running on different domains
    applyCors(app);

    // 3. Apply global validation and transformation pipes
    // This affects all incoming requests with DTO validation
    applyGlobalPipes(app);

    // 4. Setup Swagger / OpenAPI documentation
    // Should be configured after prefix (so /api/docs works correctly)
    setupSwagger(app);

    // Note: Order matters!
    // • Prefix → affects all routes
    // • CORS → should be early so OPTIONS requests are handled
    // • Pipes → should be before controllers are hit
    // • Swagger → should know about prefix and pipes
}