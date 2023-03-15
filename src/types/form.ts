export type ErrorType = {
  [key: string]: string;
};

export type FormErrors = {
  type: string;
  statusCode: number;
  message: string;
};

export type ValidationArr = {
  <Array extends [any]>(...args: Array): boolean | ErrorType;
};
