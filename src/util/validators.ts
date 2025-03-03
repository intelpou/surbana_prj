import { HttpException, Logger, NotFoundException } from "@nestjs/common";

const logger = new Logger('validator');

export const MyValidationPipe = (targetObject: any): boolean => {
  if (!targetObject) {
    let msg = 'Invalidation!';
    logger.error(msg);
    throw new HttpException(
      msg,
      404,
    );
  } else return true;
}

export const NotFound = (targetObject: any, paramName?: string): boolean => {
  if (!targetObject) {
    let msg = 'Resource not found.';
    if (paramName) msg = `${paramName} not nound.`;
    logger.error(msg);
    throw new NotFoundException(msg);
  } else return true;
}
