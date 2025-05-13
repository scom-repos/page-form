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
  Panel,
  StackLayout
} from '@ijstech/components';
import { IConfig, ISettings } from './interface';
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
  private pnlWrapper: Panel;
  private pnlForm: StackLayout;

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

  get dataSchema() {
    return this.model.dataSchema;
  }
  set dataSchema(value: IDataSchema) {
    this.model.dataSchema = value;
  }

  get uiSchema() {
    return this.model.uiSchema;
  }
  set uiSchema(value: IUISchema) {
    this.model.uiSchema = value;
  }

  get recaptchaKey() {
    return this.model.recaptchaKey;
  }
  set recaptchaKey(value: string) {
    this.model.recaptchaKey = value;
  }

  get title() {
    return this.model.title;
  }
  set title(value: string) {
    this.model.title = value;
  }

  get buttonCaption() {
    return this.model.buttonCaption;
  }
  set buttonCaption(value: string) {
    this.model.buttonCaption = value;
  }

  async setData(data: IConfig) {
    await this.model.setData(data);
  }

  setTag(data: ISettings) {
    this.model.setTag(data);
  }

  getConfigurators() {
    return this.model.getConfigurators();
  }

  private onUpdateBlock() {
    const {
      title: titleStyle,
      border,
      direction = 'vertical',
      maxWidth,
      margin,
      padding,
      button: buttonStyle
    } = this.model.tag;

    this.lblTitle.caption = this.model.title;
    this.lblTitle.font = titleStyle?.font || {weight: 600, size: Theme.typography.fontSize};
  
    if (border) this.pnlWrapper.border = border;
    else this.pnlWrapper.border = {width: '0px'};
    this.pnlWrapper.padding = padding || {top: '1.25rem', left: '1.25rem', right: '1.25rem', bottom: '1.25rem'};
    if (margin) this.pnlWrapper.margin = margin;
    this.maxWidth = maxWidth || '100%';
    this.pnlForm.direction = direction;
    this.btnSubmit.margin = direction === 'vertical' ? {top: '20px'} : {top: '0px'};
    this.btnSubmit.caption = this.model.buttonCaption || 'Submit';

    if (buttonStyle) {
      for (let prop in buttonStyle) {
        if (buttonStyle.hasOwnProperty(prop)) {
          this.btnSubmit[prop] = buttonStyle[prop];
        }
      }
    }

    this.form.clearFormData();
    if (this.model.uiSchema)
      this.form.uiSchema = this.model.uiSchema;
    if (this.model.dataSchema)
      this.form.jsonSchema = this.model.dataSchema;
    this.form.formOptions = {
        columnWidth: '100%',
        columnsPerRow: 1,
        confirmButtonOptions: {
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
    this.updateStyle('--input-background', this.model.tag?.input?.background?.color);
    this.updateStyle('--input-font_color', this.model.tag?.input?.font?.color);

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

  async init() {
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
      const buttonCaption = this.getAttribute('buttonCaption', true);
      await this.setData({ title, dataSchema, uiSchema, recaptchaKey, buttonCaption });
    }

    const tag = this.getAttribute('tag', true);
    if (tag) this.model.setTag(tag);
  }

  render() {
    return (
      <i-vstack
        id="pnlWrapper"
        width="100%"
        gap={'1.5rem'}
      >
        <i-label id="lblTitle" font={{weight: 600}} />
        <i-stack id="pnlForm" width="100%">
          <i-form id="form" width="100%" />
          <i-hstack verticalAlignment='end' gap={'1rem'} horizontalAlignment='space-between' margin={{top: '1rem'}}>
            <i-panel id="pnlRecaptcha" />
            <i-button
              id="btnSubmit"
              font={{weight: 600, color: Theme.colors.primary.contrastText}}
              background={{color: Theme.colors.primary.main}}
              padding={{top: '0.75rem', bottom: '0.75rem', left: '1.5rem', right: '1.5rem'}}
              boxShadow='none'
              caption="Submit"
            />
          </i-hstack>
        </i-stack>
      </i-vstack>
    )
  }
}