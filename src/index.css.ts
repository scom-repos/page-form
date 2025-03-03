import { Styles } from "@ijstech/components";
import { ISettings } from "./interface";

const Theme = Styles.Theme.ThemeVars;

export const getFormStyle = (tag: ISettings) => {
  const {
    labelFontSize = Theme.typography.fontSize,
    inputFontSize = Theme.typography.fontSize,
    inputHeight = 42,
    inputTransform = 'none',
    titleTransform = 'none',
    inputBorderRadius = 0,
    inputPadding = '0.5rem 1rem'
  } = tag;

  return Styles.style({
    $nest: {
      'i-label': {
        fontSize: labelFontSize,
        textTransform: titleTransform
      },
      'i-input': {
        borderRadius: inputBorderRadius,
      },
      'i-input > input': {
        fontSize: inputFontSize,
        height: `${inputHeight} !important`,
        textTransform: inputTransform,
        borderRadius: 'inherit',
        padding: inputPadding
      },
      'i-input > textarea': {
        fontSize: inputFontSize,
        textTransform: inputTransform,
        borderRadius: 'inherit',
        padding: inputPadding
      }
    }
  });
}