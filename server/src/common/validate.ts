import type { ZodTypeAny } from 'zod';
import type { Request, Response, NextFunction } from 'express';

export const validate =
  (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err.errors,
      });
    }
  };
