import { HttpException, Logger } from "@nestjs/common";

const logger = new Logger('validator');

export const NotFound = (targetObject: any): boolean => {
  if (!targetObject) {
    const msg = 'Data Not Found';
    logger.error(msg);
    throw new HttpException(
      msg,
      404,
    );
  } else return true;
}
