var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/page-form/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/page-form/model/index.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Model = void 0;
    class Model {
        constructor(options) {
            this._data = {
                dataSchema: {},
                uiSchema: null,
                title: ''
            };
            this._tag = {
                light: {},
                dark: {}
            };
            this._options = options;
        }
        get title() {
            return this._data.title || '';
        }
        set title(value) {
            this._data.title = value || '';
        }
        get dataSchema() {
            return this._data.dataSchema;
        }
        set dataSchema(value) {
            this._data.dataSchema = value;
        }
        get uiSchema() {
            return this._data.uiSchema;
        }
        set uiSchema(value) {
            this._data.uiSchema = value;
        }
        get recaptchaKey() {
            return this._data.recaptchaKey;
        }
        set recaptchaKey(value) {
            this._data.recaptchaKey = value;
        }
        get buttonCaption() {
            return this._data.buttonCaption;
        }
        set buttonCaption(value) {
            this._data.buttonCaption = value;
        }
        get tag() {
            return this._tag;
        }
        set tag(value) {
            this._tag = value;
        }
        getData() {
            return this._data;
        }
        async setData(data) {
            this._data = data;
            this._options?.onUpdateBlock();
        }
        getTag() {
            return this._tag;
        }
        setTag(value) {
            const newValue = value || {};
            for (let prop in newValue) {
                if (newValue.hasOwnProperty(prop)) {
                    if (prop === 'light' || prop === 'dark')
                        this.updateTag(prop, newValue[prop]);
                    else
                        this._tag[prop] = newValue[prop];
                }
            }
            this._options?.onUpdateTheme();
            this._options?.onUpdateBlock();
        }
        updateTag(type, value) {
            this._tag[type] = this._tag[type] || {};
            for (let prop in value) {
                if (value.hasOwnProperty(prop))
                    this._tag[type][prop] = value[prop];
            }
        }
        getConfigurators() {
            const self = this;
            return [
                {
                    name: 'Builder Configurator',
                    target: 'Builders',
                    getActions: () => [],
                    getData: this.getData.bind(this),
                    setData: async (data) => {
                        await this.setData({ ...data });
                    },
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                },
                {
                    name: 'Emdedder Configurator',
                    target: 'Embedders',
                    getActions: () => [],
                    getLinkParams: () => {
                        const data = this._data || {};
                        return {
                            data: window.btoa(JSON.stringify(data))
                        };
                    },
                    setLinkParams: async (params) => {
                        if (params.data) {
                            const utf8String = decodeURIComponent(params.data);
                            const decodedString = window.atob(utf8String);
                            const newData = JSON.parse(decodedString);
                            let resultingData = {
                                ...self._data,
                                ...newData
                            };
                            await this.setData(resultingData);
                        }
                    },
                    getData: this.getData.bind(this),
                    setData: this.setData.bind(this),
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                }
            ];
        }
    }
    exports.Model = Model;
});
define("@scom/page-form/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getFormStyle = void 0;
    const Theme = components_1.Styles.Theme.ThemeVars;
    const getFormStyle = (tag) => {
        const { label, input } = tag;
        return components_1.Styles.style({
            $nest: {
                'i-label': {
                    fontSize: label?.font?.size || Theme.typography.fontSize,
                    color: label?.font?.color || Theme.colors.primary.main,
                    textTransform: (label?.font?.transform || 'none'),
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
                    textTransform: (input?.font?.transform || 'none'),
                    borderRadius: 'inherit',
                    padding: input?.padding || '0.5rem 1rem',
                    fontStyle: input?.font?.style || 'inherit'
                },
                'i-input > textarea': {
                    fontSize: input?.font?.size || Theme.typography.fontSize,
                    textTransform: (input?.font?.transform || 'none'),
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
    };
    exports.getFormStyle = getFormStyle;
});
define("@scom/page-form", ["require", "exports", "@ijstech/components", "@scom/page-form/model/index.ts", "@scom/page-form/index.css.ts"], function (require, exports, components_2, index_1, index_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_2.Styles.Theme.ThemeVars;
    let ScomPageForm = class ScomPageForm extends components_2.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
        }
        get dataSchema() {
            return this.model.dataSchema;
        }
        set dataSchema(value) {
            this.model.dataSchema = value;
        }
        get uiSchema() {
            return this.model.uiSchema;
        }
        set uiSchema(value) {
            this.model.uiSchema = value;
        }
        get recaptchaKey() {
            return this.model.recaptchaKey;
        }
        set recaptchaKey(value) {
            this.model.recaptchaKey = value;
        }
        get title() {
            return this.model.title;
        }
        set title(value) {
            this.model.title = value;
        }
        get buttonCaption() {
            return this.model.buttonCaption;
        }
        set buttonCaption(value) {
            this.model.buttonCaption = value;
        }
        async setData(data) {
            await this.model.setData(data);
        }
        setTag(data) {
            this.model.setTag(data);
        }
        getConfigurators() {
            return this.model.getConfigurators();
        }
        onUpdateBlock() {
            const { title: titleStyle, border, direction = 'vertical', maxWidth, margin, padding, button: buttonStyle } = this.model.tag;
            this.lblTitle.caption = this.model.title;
            this.lblTitle.font = titleStyle?.font || { weight: 600, size: Theme.typography.fontSize };
            if (border)
                this.pnlWrapper.border = border;
            else
                this.pnlWrapper.border = { width: '0px' };
            this.pnlWrapper.padding = padding || { top: '1.25rem', left: '1.25rem', right: '1.25rem', bottom: '1.25rem' };
            if (margin)
                this.pnlWrapper.margin = margin;
            this.maxWidth = maxWidth || '100%';
            this.pnlForm.direction = direction;
            this.btnSubmit.margin = direction === 'vertical' ? { top: '20px' } : { top: '0px' };
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
        updateStyle(name, value) {
            value ? this.style.setProperty(name, value) : this.style.removeProperty(name);
        }
        onUpdateTheme() {
            this.updateStyle('--input-background', this.model.tag?.input?.background?.color);
            this.updateStyle('--input-font_color', this.model.tag?.input?.font?.color);
            if (this.formStyle)
                this.form.classList.remove(this.formStyle);
            this.formStyle = (0, index_css_1.getFormStyle)(this.model.tag);
            this.form.classList.add(this.formStyle);
        }
        addLib() {
            let script = document.getElementById('recaptcha');
            if (!script) {
                script = document.createElement('script');
                script.src = 'https://www.google.com/recaptcha/api.js';
                script.id = 'recaptcha';
                document.head.appendChild(script);
            }
            const callback = (data) => {
                console.log(data);
            };
            const key = this.model.recaptchaKey;
            script.onload = () => {
                window.grecaptcha.ready(function () {
                    window.grecaptcha.render("pnlRecaptcha", {
                        sitekey: key,
                        callback: callback
                    });
                });
            };
        }
        async init() {
            super.init();
            this.model = new index_1.Model({
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
            if (tag)
                this.model.setTag(tag);
        }
        render() {
            return (this.$render("i-vstack", { id: "pnlWrapper", width: "100%", gap: '1.5rem' },
                this.$render("i-label", { id: "lblTitle", font: { weight: 600 } }),
                this.$render("i-stack", { id: "pnlForm", width: "100%" },
                    this.$render("i-form", { id: "form", width: "100%" }),
                    this.$render("i-hstack", { verticalAlignment: 'end', gap: '1rem', horizontalAlignment: 'space-between', margin: { top: '1rem' } },
                        this.$render("i-panel", { id: "pnlRecaptcha" }),
                        this.$render("i-button", { id: "btnSubmit", font: { weight: 600, color: Theme.colors.primary.contrastText }, background: { color: Theme.colors.primary.main }, padding: { top: '0.75rem', bottom: '0.75rem', left: '1.5rem', right: '1.5rem' }, boxShadow: 'none', caption: "Submit" })))));
        }
    };
    ScomPageForm = __decorate([
        components_2.customModule,
        (0, components_2.customElements)('i-page-form', {
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
    ], ScomPageForm);
    exports.default = ScomPageForm;
});
