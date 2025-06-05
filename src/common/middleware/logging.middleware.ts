// src/common/middleware/logging.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const start = Date.now();

    console.log(`[LOG] ${method} ${originalUrl} - ${new Date().toISOString()}`);

    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`[LOG] Request to ${originalUrl} took ${duration}ms`);
    });

    next();
  }
}
