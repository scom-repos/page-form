import { Styles } from "@ijstech/components";
import { ISettings, TextTransform } from "./interface";

const Theme = Styles.Theme.ThemeVars;

export const getFormStyle = (tag: ISettings) => {
  const {
    label,
    input
  } = tag;

  return Styles.style({
    $nest: {
      'i-label': {
        fontSize: label?.font?.size || Theme.typography.fontSize,
        color: label?.font?.color || Theme.colors.primary.main,
        textTransform: (label?.font?.transform || 'none') as TextTransform,
        display: label?.visible === false ? 'none' : 'block',
        fontWeight: label?.font?.bold ? 700 : (label?.font?.weight || '400')
      },
      'i-input': {
        borderRadius: input?.border?.radius,
        borderWidth: input?.border?.width,
        borderStyle: input?.border?.style,
        borderColor: input?.border?.color
      },
      'i-input > input': {
        fontSize: input?.font?.size || Theme.typography.fontSize,
        height: `${input?.height || 42}px`,
        textTransform: (input?.font?.transform || 'none') as TextTransform,
        borderRadius: 'inherit',
        padding: input?.padding || '0.5rem 1rem',
        fontStyle: input?.font?.style || 'inherit'
      },
      'i-input > textarea': {
        fontSize: input?.font?.size || Theme.typography.fontSize,
        textTransform: (input?.font?.transform || 'none') as TextTransform,
        borderRadius: 'inherit',
        padding: input?.padding || '0.5rem 1rem',
        fontStyle: input?.font?.style || 'inherit'
      },
      ".i-checkbox_label": {
        fontSize: input?.font?.size || Theme.typography.fontSize,
        fontStyle: input?.font?.style || 'inherit',
        color: input?.font?.color || Theme.input.fontColor,
        textTransform: "capitalize"
      },
      "> i-hstack": {
        padding: '0 !important'
      }
    }
  });
}