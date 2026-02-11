import {INestApplication} from '@nestjs/common';

export function applyGlobalPrefix(app: INestApplication): void {
    app.setGlobalPrefix('api', {
        // If you want to exclude certain paths from the global prefix later
        // (e.g., health endpoint, docs, etc.)
        // exclude: ['health', 'docs'],
    });
}