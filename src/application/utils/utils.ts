import { RegraNegocioException } from 'src/filtros/RegraNegocioException';

export const fieldIsValid = (field: any, message: string) => {
  if (field === undefined) {
    throw new RegraNegocioException(message);
  }

  if (typeof field === 'number' && field < 0) {
    throw new RegraNegocioException(message);
  }

  if (typeof field === 'string' && field === '') {
    throw new RegraNegocioException(message);
  }

  if (Array.isArray(field) && field.length < 1) {
    throw new RegraNegocioException(message);
  }
};
