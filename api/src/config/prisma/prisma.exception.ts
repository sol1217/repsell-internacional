import { Prisma } from '@prisma/client';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class PrismaException extends HttpException {
  private readonly logger = new Logger(PrismaException.name);
  constructor(error: any) {
    const { message, status } = PrismaException.mapPrismaError(error);
    super('', status);
    this.logger.error(message);
  }

  private static mapPrismaError(error: any): {
    message: string;
    status: HttpStatus;
  } {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002': // Unique constraint violation
          return {
            message: 'Duplicate value found for unique field',
            status: HttpStatus.CONFLICT,
          };
        case 'P2003': // Foreign key constraint violation
          return {
            message: 'Foreign key constraint failed on field',
            status: HttpStatus.BAD_REQUEST,
          };
        case 'P2025': // Record not found
          return {
            message: `Record not found: ${error.meta?.cause || 'No additional details available.'}`,
            status: HttpStatus.BAD_REQUEST,
          };
        case 'P2011': // Null constraint violation
          return {
            message: `Null constraint violation on the field: ${error.meta?.constraint || 'unknown'}`,
            status: HttpStatus.BAD_REQUEST,
          };
        default:
          return {
            message: `Database error: ${error.message}`,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
          };
      }
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
      return {
        message: `Validation error: ${error.message}`,
        status: HttpStatus.BAD_REQUEST,
      };
    }

    if (error instanceof Prisma.PrismaClientInitializationError) {
      return {
        message: `Database initialization error: ${error.message}`,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }

    if (error instanceof Prisma.PrismaClientRustPanicError) {
      return {
        message: `A critical database error occurred: ${error.message}`,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }

    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      return {
        message: `An unknown database error occurred: ${error.message}`,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }

    return {
      message: 'An unexpected error occurred',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    };
  }
}
