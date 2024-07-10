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

export const emailIsValid = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const copyFields = (origin, target) => {
  Object.keys(target).forEach((chave) => {
    if (origin.hasOwnProperty(chave)) {
      target[chave] = origin[chave];
    }
  });
};

export const timeInMinutes = (begin, end) => {
  const diferencaEmMilissegundos = Math.abs(end - begin);

  const minutos = Math.floor(diferencaEmMilissegundos / (1000 * 60));

  const horas = Math.floor(minutos / 60);
  const minutosRestantes = minutos % 60;

  let resultado = '';
  if (horas > 0) {
    resultado += `${horas} hora(s) `;
  }
  resultado += `${minutosRestantes} minuto(s)`;

  return resultado;
};
