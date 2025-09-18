import { flattenArray } from '../arrayHelpers/arrayHelpers';

export const encodeParams = (params: { [key: string]: unknown }) => {
  let paramString = '';

  Object.entries(params).forEach(param => {
    const [key, value] = param;

    if (typeof value === 'object' || (Array.isArray(value) && typeof value[0] === 'object')) {
      paramString += `${key}=${encodeURIComponent(JSON.stringify(value))}`;

      return;
    }
    paramString += `${key}=${value}&`;
  });

  // This encodeString function will be encoded again, so have to remove the "values" part of the string. Not the cleanest but works for now
  const paramStringWithoutValuesKey = paramString.replace('values=', '');

  return paramStringWithoutValuesKey;
};

export const generateFormData = (params: { [key: string]: unknown | [] }) => {
  const urlencoded = new FormData();

  for (const key in params) {
    const value = params[key];

    if (value === undefined) {
      // This function silently fails if there is an undefined value
      // We need this throw to alert us of this problem
      throw new Error(`${key} is undefined value in your params`);
    }
    if (value === typeof Array || value === typeof Object) {
      urlencoded.append(key.toString(), JSON.stringify(params[key]));
    } else {
      urlencoded.append(key.toString(), (params[key] as any).toString());
    }
  }

  return urlencoded;
};

export const generateBodyParams = (params: any) => {
  const urlencoded = new URLSearchParams();

  for (const key in params) {
    const value = params[key];

    if (value === undefined) {
      // This function silently fails if there is an undefined value
      // We need this throw to alert us of this problem
      throw new Error(`${key} is undefined value in your params`);
    }
    if (value === typeof Array || value === typeof Object) {
      urlencoded.append(key.toString(), JSON.stringify(params[key]));
    } else {
      urlencoded.append(key.toString(), params[key].toString());
    }
  }

  return urlencoded;
};

/** In React Native UrlSearchParams will not work. We use FormData instead */
export const generateFormDataBodyParams = (params: any) => {
  const formData = new FormData();

  for (const key in params) {
    const value = params[key];

    if (value === undefined) {
      // This function silently fails if there is an undefined value
      // We need this throw to alert us of this problem
      throw new Error(`${key} is undefined value in your params`);
    }
    if (value === typeof Array || value === typeof Object) {
      formData.append(key.toString(), JSON.stringify(params[key]));
    } else {
      formData.append(key.toString(), params[key].toString());
    }
  }

  return formData;
};

export const generateURLParams = (params: any) => {
  const searchParams = new URLSearchParams({ ...params });

  return searchParams.toString();
};

export const generateParamsString = (params: any) => {
  const searchParams = new URLSearchParams({ ...params });

  return searchParams.toString();
};

export function flattenApiPages(data: any, key: string) {
  if (!data || !data.pages) {
    return [];
  }

  const mappedData = data.pages.map((page: any) => page.DATA[key]);
  const flattenedData = flattenArray(mappedData);

  return flattenedData;
}
