import { Module, customModule, Container } from '@ijstech/components';
import ScomPageForm from '@scom/page-form';

@customModule
export default class Module1 extends Module {
    private el: ScomPageForm;

    constructor(parent?: Container, options?: any) {
        super(parent, options);
    }

    async init() {
        super.init();
        const config = this.el.getConfigurators()[0];
        if (config?.setTag) config.setTag({
            titleFontSize: '20px',
            labelFontSize: '16px',
            inputFontSize: '16px',
            inputHeight: '40px',
            titleTransform: 'uppercase',
            inputTransform: 'uppercase',
            inputPadding: '0.5rem',
            light: {
                inputColor: 'black',
                inputBackgroundColor: '#ccc',
            },
            dark: {
                inputColor: 'black',
                inputBackgroundColor: '#ccc',
            }
        })
    }

    render() {
        return <i-panel margin={{ left: '1rem', top: '1rem' }}>
            <i-scom-page-form
                id="el"
                title="CONTACT US"
                dataSchema={{
                    "type": "object",
                    "properties": {
                        "firstName": {
                            "type": "string",
                            "placeholder": "FIRST NAME"
                        },
                        "lastName": {
                            "type": "string",
                            "placeholder": "LAST NAME"
                        },
                        "email": {
                            "type": "string",
                            "placeholder": "EMAIL"
                        },
                        "subject": {
                            "type": "string",
                            "placeholder": "SUBJECT"
                        },
                        "description": {
                            "type": "string",
                            "placeholder": "DESCRIPTION"
                        }
                    }
                }}
                uiSchema={{
                    "type": "VerticalLayout",
                    "elements": [
                        {
                            "type": "HorizontalLayout",
                            "elements": [
                                {
                                    "type": "Control",
                                    "scope": "#/properties/firstName",
                                    "label": "First Name"
                                },
                                {
                                    "type": "Control",
                                    "scope": "#/properties/lastName",
                                    "label": "Last Name"
                                }
                            ]
                        },
                        {
                            "type": "HorizontalLayout",
                            "elements": [
                                {
                                    "type": "Control",
                                    "scope": "#/properties/email",
                                    "label": "Email"
                                },
                                {
                                    "type": "Control",
                                    "scope": "#/properties/subject",
                                    "label": "Subject"
                                }
                            ]
                        },
                        {
                            "type": "HorizontalLayout",
                            "elements": [
                                {
                                    "type": "Control",
                                    "scope": "#/properties/description",
                                    "label": "Description",
                                    "options": {
                                        "multi": true
                                    }
                                }
                            ]
                        }
                    ]
                }}
            />
        </i-panel>
    }
}