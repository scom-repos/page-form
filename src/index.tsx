import {
  Module,
  customModule,
  ControlElement,
  customElements,
  Container,
  Form,
  IDataSchema,
  IUISchema,
  Styles,
  Label,
  Button,
  Panel
} from '@ijstech/components';
import { IConfig } from './interface';
import { Model } from './model/index';
import { getFormStyle} from './index.css';

const Theme = Styles.Theme.ThemeVars;

declare global {
  interface Window {
    grecaptcha: any;
  }
}

interface ScomPageFormElement extends ControlElement {
  lazyLoad?: boolean;
  title?: string;
  dataSchema?: IDataSchema;
  uiSchema?: IUISchema;
  recaptchaKey?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["i-page-form"]: ScomPageFormElement;
    }
  }
}

@customModule
@customElements('i-page-form', {
  icon: 'stop',
  props: {
    title: {
      type: 'string'
    },
    dataSchema: {
      type: 'object'
    },
    uiSchema: {
      type: 'object'
    },
    recaptchaKey: {
      type: 'string'
    }
  },
  className: 'ScomPageForm',
  events: {},
  dataSchema: {
    type: 'object',
    properties: {
      title: {
        type: 'string'
      },
      recaptchaKey: {
        type: 'string'
      }
    }
  }
})
export default class ScomPageForm extends Module {
  private form: Form;
  private lblTitle: Label;
  private pnlRecaptcha: Panel;
  private btnSubmit: Button;

  private model: Model;
  private formStyle: string;

  static async create(options?: ScomPageFormElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: ScomPageFormElement) {
    super(parent, options);
  }

  private async setData(data: IConfig) {
    this.model.setData(data);
  }

  getConfigurators() {
    return this.model.getConfigurators();
  }

  private onUpdateBlock() {
    const {
      titleFontSize = Theme.typography.fontSize
    } = this.model.tag;

    this.lblTitle.caption = this.model.title;
    this.lblTitle.font = {weight: 600, size: titleFontSize};

    this.form.clearFormData();
    if (this.model.uiSchema)
      this.form.uiSchema = this.model.uiSchema;
    if (this.model.dataSchema)
      this.form.jsonSchema = this.model.dataSchema;
    this.form.formOptions = {
        columnWidth: '100%',
        columnsPerRow: 1,
        confirmButtonOptions: {
          caption: '$confirm',
          backgroundColor: Theme.colors.primary.main,
          fontColor: Theme.colors.primary.contrastText,
          hide: true
        },
        dateTimeFormat: {
          date: 'YYYY-MM-DD',
          time: 'HH:mm:ss',
          dateTime: 'MM/DD/YYYY HH:mm'
        }
    };
    this.form.renderForm();
    this.form.setFormData({});

    if (this.model.recaptchaKey) {
      this.addLib();
    }
  }

  private updateStyle(name: string, value: any) {
    value ? this.style.setProperty(name, value) : this.style.removeProperty(name);
  }

  private onUpdateTheme() {
    const themeVar = document.body.style.getPropertyValue('--theme') || 'dark';
    this.updateStyle('--text-primary', this.model.tag[themeVar]?.titleColor);
    this.updateStyle('--colors-primary-main', this.model.tag[themeVar]?.buttonBackgroundColor);
    this.updateStyle('--colors-primary-contrast_text', this.model.tag[themeVar]?.buttonColor);
    this.updateStyle('--input-background', this.model.tag[themeVar]?.inputBackgroundColor);
    this.updateStyle('--input-font_color', this.model.tag[themeVar]?.inputColor);

    if (this.formStyle) this.form.classList.remove(this.formStyle);
    this.formStyle = getFormStyle(this.model.tag);
    this.form.classList.add(this.formStyle);
  }

  private addLib() {
    let script: any = document.getElementById('recaptcha');
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.id = 'recaptcha';
      document.head.appendChild(script);
    }

    const callback = (data: any) => {
      console.log(data);
    }

    const key = this.model.recaptchaKey;
    script.onload = () => {
      window.grecaptcha.ready(function(){
        window.grecaptcha.render("pnlRecaptcha", {
          sitekey: key,
          callback: callback
        });
      });
    }
  }

  init() {
    super.init();
    this.model = new Model({
      onUpdateBlock: this.onUpdateBlock.bind(this),
      onUpdateTheme: this.onUpdateTheme.bind(this)
    });
    const lazyLoad = this.getAttribute('lazyLoad', true, false);
    if (!lazyLoad) {
      const title = this.getAttribute('title', true);
      const dataSchema = this.getAttribute('dataSchema', true);
      const uiSchema = this.getAttribute('uiSchema', true);
      const recaptchaKey = this.getAttribute('recaptchaKey', true);
      if (dataSchema) this.setData({ title, dataSchema, uiSchema, recaptchaKey });
    }

    const tag = this.getAttribute('tag', true);
    if (tag) this.model.setTag(tag);
  }

  render() {
    return (
      <i-vstack
        width="100%"
        gap={'1.5rem'}
        border={{width: '1px', style: 'solid', color: Theme.divider}}
        padding={{top: '1.25rem', left: '1.25rem', right: '1.25rem', bottom: '1.25rem'}}
      >
        <i-label id="lblTitle" font={{weight: 600}} />
        <i-form id="form" width="100%" />
        <i-hstack verticalAlignment='center' gap={'1rem'} horizontalAlignment='space-between'>
          <i-panel id="pnlRecaptcha" />
          <i-button
            id="btnSubmit"
            font={{weight: 600, color: Theme.colors.primary.contrastText}}
            background={{color: Theme.colors.primary.main}}
            padding={{top: '0.75rem', bottom: '0.75rem', left: '1.5rem', right: '1.5rem'}}
            caption="Submit"
          />
        </i-hstack>
      </i-vstack>
    )
  }
}