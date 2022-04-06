import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import { throwError } from 'rxjs';

@Catch()
export class AllExceptionsFilter extends BaseRpcExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const formatedException =
      exception instanceof BadRequestException
        ? this.badRequestFormatException(exception)
        : this.customException(exception);

    return throwError(() => formatedException);
  }

  private badRequestFormatException(exception: any) {
    return {
      code: HttpStatus.BAD_REQUEST,
      path: null,
      timestamp: new Date().toISOString(),
      error: exception?.response?.error,
      message: exception?.response?.error,
      data: exception?.response?.message,
    };
  }

  private customException(exception: any) {
    // badRequestFormatException: captura excepciones de la validación de los DTO´s como mensajes
    // TODO (dependiendo de la lógica de negocio del adaptador)
  }
}
