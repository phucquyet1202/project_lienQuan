import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cookieParser());
  app.use(
    compression({
      level: 6,
      threshold: 2048,
      filter: (req, res) => {
        return req.headers['x-no-compression']
          ? false
          : compression.filter(req, res);
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
