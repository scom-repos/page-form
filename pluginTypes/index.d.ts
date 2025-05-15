/// <amd-module name="@scom/page-form/interface.ts" />
declare module "@scom/page-form/interface.ts" {
    import { IDataSchema, IUISchema, IBorder, IFont, ISpace } from "@ijstech/components";
    export interface IConfig {
        title?: string;
        dataSchema: IDataSchema;
        uiSchema?: IUISchema;
        recaptchaKey?: string;
        buttonCaption?: string;
    }
    interface IStyles {
        font?: IFont;
        border?: IBorder;
        width?: string | number;
        height?: string | number;
        padding?: string;
        background?: {
            color?: string;
        };
        visible?: boolean;
    }
    export interface ISettings {
        light?: IColors;
        dark?: IColors;
        border?: IBorder;
        direction?: 'vertical' | 'horizontal';
        maxWidth?: string | number;
        margin?: ISpace;
        padding?: ISpace;
        title?: IStyles;
        input?: IStyles;
        label?: IStyles;
        button?: IStyles;
    }
    export type TextTransform = 'capitalize' | 'uppercase' | 'lowercase' | 'unset' | 'inherit' | 'initial' | 'none';
    export interface IColors {
    }
}
/// <amd-module name="@scom/page-form/model/index.ts" />
declare module "@scom/page-form/model/index.ts" {
    import { IDataSchema, IUISchema } from '@ijstech/components';
    import { IConfig, ISettings } from "@scom/page-form/interface.ts";
    interface IOptions {
        onUpdateBlock: () => void;
        onUpdateTheme: () => void;
    }
    export class Model {
        private _data;
        private _tag;
        private _options;
        constructor(options: IOptions);
        get title(): string;
        set title(value: string);
        get dataSchema(): IDataSchema;
        set dataSchema(value: IDataSchema);
        get uiSchema(): IUISchema;
        set uiSchema(value: IUISchema);
        get recaptchaKey(): string;
        set recaptchaKey(value: string);
        get buttonCaption(): string;
        set buttonCaption(value: string);
        get data(): IConfig;
        set data(value: IConfig);
        get tag(): ISettings;
        set tag(value: ISettings);
        private getData;
        setData(data: IConfig): Promise<void>;
        private getTag;
        setTag(value: ISettings): void;
        private updateTag;
        getConfigurators(): ({
            name: string;
            target: string;
            getActions: () => any[];
            getData: any;
            setData: (data: IConfig) => Promise<void>;
            getTag: any;
            setTag: any;
            getLinkParams?: undefined;
            setLinkParams?: undefined;
        } | {
            name: string;
            target: string;
            getActions: () => any[];
            getLinkParams: () => {
                data: string;
            };
            setLinkParams: (params: any) => Promise<void>;
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        })[];
    }
}
/// <amd-module name="@scom/page-form/index.css.ts" />
declare module "@scom/page-form/index.css.ts" {
    import { ISettings } from "@scom/page-form/interface.ts";
    export const getFormStyle: (tag: ISettings) => string;
}
/// <amd-module name="@scom/page-form" />
declare module "@scom/page-form" {
    import { Module, ControlElement, Container, IDataSchema, IUISchema } from '@ijstech/components';
    import { IConfig, ISettings } from "@scom/page-form/interface.ts";
    global {
        interface Window {
            grecaptcha: any;
        }
    }
    interface ScomPageFormElement extends ControlElement {
        lazyLoad?: boolean;
        data?: IConfig;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ["i-page-form"]: ScomPageFormElement;
            }
        }
    }
    export default class ScomPageForm extends Module {
        private form;
        private lblTitle;
        private pnlRecaptcha;
        private btnSubmit;
        private pnlWrapper;
        private pnlForm;
        private model;
        private formStyle;
        static create(options?: ScomPageFormElement, parent?: Container): Promise<ScomPageForm>;
        constructor(parent?: Container, options?: ScomPageFormElement);
        get dataSchema(): IDataSchema;
        set dataSchema(value: IDataSchema);
        get uiSchema(): IUISchema;
        set uiSchema(value: IUISchema);
        get recaptchaKey(): string;
        set recaptchaKey(value: string);
        get title(): string;
        set title(value: string);
        get buttonCaption(): string;
        set buttonCaption(value: string);
        get data(): IConfig;
        set data(value: IConfig);
        setData(data: IConfig): Promise<void>;
        setTag(data: ISettings): void;
        getConfigurators(): ({
            name: string;
            target: string;
            getActions: () => any[];
            getData: any;
            setData: (data: IConfig) => Promise<void>;
            getTag: any;
            setTag: any;
            getLinkParams?: undefined;
            setLinkParams?: undefined;
        } | {
            name: string;
            target: string;
            getActions: () => any[];
            getLinkParams: () => {
                data: string;
            };
            setLinkParams: (params: any) => Promise<void>;
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        })[];
        private onUpdateBlock;
        private updateStyle;
        private onUpdateTheme;
        private addLib;
        init(): Promise<void>;
        render(): any;
    }
}
