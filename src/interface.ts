import { IDataSchema, IUISchema } from "@ijstech/components";

export interface IConfig {
  title?: string;
  dataSchema: IDataSchema;
  uiSchema?: IUISchema;
  recaptchaKey?: string;
}

export interface ISettings {
  light?: IColors;
  dark?: IColors;
  titleFontSize?: string;
  inputFontSize?: string;
  labelFontSize?: string;
  inputHeight?: string;
  inputTransform?: TextTransform;
  inputBorderRadius?: string | number;
  inputPadding?: string;
  titleTransform?: TextTransform;
}

export type TextTransform = 'capitalize'|'uppercase'|'lowercase'|'unset'|'inherit'|'initial'|'none';

export interface IColors {
  titleColor?: string;
  inputColor?: string;
  inputBackgroundColor?: string;
  buttonBackgroundColor?: string;
  buttonColor?: string;
}