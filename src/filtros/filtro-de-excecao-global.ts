import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { RegraNegocioException } from './RegraNegocioException';
import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseBody {
  @ApiProperty()
  message?: string | object;
  @ApiProperty()
  timestamp?: string;
  @ApiProperty()
  path?: string;
}

@Catch()
export class FiltroDeExcecaoGlobal implements ExceptionFilter {
  constructor(private adapterHost: HttpAdapterHost) {}

  catch(excecao: unknown, host: ArgumentsHost) {
    console.log(excecao);

    const { httpAdapter } = this.adapterHost;

    const contexto = host.switchToHttp();
    const resposta = contexto.getResponse();
    const requisicao = contexto.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let body: ErrorResponseBody = {
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(requisicao),
    };

    if (excecao instanceof RegraNegocioException) {
      const regraNegocio = excecao as RegraNegocioException;

      status = regraNegocio.httpStatus || HttpStatus.INTERNAL_SERVER_ERROR;
      body = {
        message: regraNegocio.message,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(requisicao),
      };
    }

    if (excecao instanceof HttpException) {
      status = excecao.getStatus();
      body = {
        message: excecao.getResponse(),
      };
    }

    httpAdapter.reply(resposta, body, status);
  }
}
