import { IDataSchema, IUISchema, IBorder, IFont, ISpace } from "@ijstech/components";

export interface IConfig {
  title?: string;
  dataSchema: IDataSchema;
  uiSchema?: IUISchema;
  recaptchaKey?: string;
}

interface IStyles {
  font?: IFont;
  border?: IBorder;
  width?: string|number;
  height?: string|number;
  padding?: string;
  background?: {color?: string};
  visible?: boolean;
}

export interface ISettings {
  light?: IColors;
  dark?: IColors;
  border?: IBorder;
  direction?: 'vertical'|'horizontal';
  maxWidth?: string|number;
  margin?: ISpace;
  padding?: ISpace;
  title?: IStyles;
  input?: IStyles;
  label?: IStyles;
  button?: IStyles;
}

export type TextTransform = 'capitalize'|'uppercase'|'lowercase'|'unset'|'inherit'|'initial'|'none';

export interface IColors {
}