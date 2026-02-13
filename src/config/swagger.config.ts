import {INestApplication} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
        .setTitle('My Site API')
        .setDescription('My Site API Documentation')
        .setVersion('1.0')
        .addServer('http://localhost:3000', 'Local Development')
        // Add tags with descriptions here
        // The second argument is the description that appears under the tag name in Swagger UI
        // .addTag('Age Groups', 'Age Group Management endpoints')
        // .addTag('Languages', 'Language Management endpoints')
        // .addTag('App Version Management', 'Management of application versions (create, update, delete, and check available versions)')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document, {
        customSiteTitle: 'MySite API',
        customCss: '.swagger-ui .topbar { display: none }',
        swaggerOptions: {
            persistAuthorization: true,
            // docExpansion: 'none',
            filter: true,
            showRequestDuration: true,
        },
    });
}