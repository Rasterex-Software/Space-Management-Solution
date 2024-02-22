declare var RxCore: any;

import { css, html, LitElement, property, query, queryAll } from 'lit-element';
import { RasterexSpacerModal } from './base-components/rx-spacer-modal';
import store, { RootState } from './store';
import { AreaAttribute, visibleFieldsSelector } from './store/reducers';
import { connect } from './utils/connect-mixin';
import { getAttribute } from './utils/rxcore';

import RxEvents from 'rx-events';
import './base-components/rx-spacer-modal.js';
import { deleteIcon } from './icons';

class RasterexSpacerAreaEdit extends connect(store)(LitElement) {

    private newProperties: Array<{name: string, value: string}> = [];
    private checkedLabel: Array<{[areaId: number]: string}> = [];

    @queryAll('.radio')
    private checkboxArray: NodeListOf<HTMLInputElement>;

    @queryAll('.form-control')
    private inputArray: NodeListOf<HTMLInputElement>;

    @query('#new-field-modal')
    private newFieldModal: RasterexSpacerModal;

    @property({
        type: Array,
        reflect: false,
        hasChanged(newVal, oldVal) {
            if (newVal !== oldVal) {
                return true;
            } else {
                return false;
            }
        },
    })
    private predefinedVisibleFields: AreaAttribute[] = [];

    @property({ type: Boolean})
    public hidden = false;

    /**
     * Exclude markup custom attributes
     * Default excluded fields: `id, SpaceId, Area`
     */
    @property({type: Array, reflect: true})
    public excludeFields: string[] = ['id', 'SpaceID', 'Rx_Area'];

    @property({ type: String, reflect: false })
    public area: any = null;

    public static get styles() {
        return [
            css`
            label {
                display:block
            }
            input[type=text], select {
                border: none;
                background: rgba(0, 0, 0, 0.003);
                position: relative;
                margin: 0 0 5px 0px;
                min-width: 200px;
                font-family: inherit;
                font-weight: inherit;
                line-height: 1.4em;
                border: 0;
                outline: none;
                color: inherit;
                padding: 6px;
                border: 1px solid #CCC;
                box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
                box-sizing: border-box;
            }

            input[type=checkbox] {
                margin-left: 0;
            }

            button {
                border: none;
                color: white;
                padding: 6px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-family: inherit;
                font-weight: inherit;
                margin: 10px 0px;
                cursor: pointer;
                width: 100%;
            }

            label {
                text-transform: capitalize;
            }

            button.btn-primary {
                background-color: #4CAF50;
            }

            button.btn-secondary {
                margin-bottom: 0;
                background-color: #007bff;
            }
            button.btn-danger {
                background-color: #dc3545;
            }

            .required {
                color: #dc3545;
            }

            #new-field-modal button {
                width: auto;
                padding: 10px;
            }

            #new-field-modal input {
                display: block;
                width: 100%;
            }
            .icon  {
                vertical-align: middle;
                cursor: pointer;
                float: right;
            }
            .info {
                font-size: 14px;
            }
            `,
        ];
    }

    public shouldUpdate() {
        return this.area !== undefined && this.area !== null && this.area !== '';
    }

    protected render() {
        const extraFields = this.getExtraFields();
        let fields = this.predefinedVisibleFields;

        // check first if there are fields to hide
        if (this.excludeFields) {
            fields = fields.filter((field) => !this.excludeFields.includes(field.name));
        }

        return html`
        <p class="info">Checked item is used as label</p>

        <form @submit=${this.onSubmit} id="edit-form">
            ${fields.map((field: AreaAttribute) => html`
                <div class="form-group">

                    <label for="${field.name}">
                        <input type="checkbox"
                            .checked=${this.checkedLabel[this.area] === field.name}
                            class="radio"
                            title="Set as label"
                            @click=${this.singleCheckboxValidation}
                        >
                        ${field.label}
                    </label>

                    ${field.type === 'select'
                        ? html`
                        <select
                            class="form-control"
                            name="${field.name}"
                            id="${field.name}">
                            <option>Choose option...</option>
                            ${field.options!.map((option: any) => html`
                            <option .selected=${getAttribute(field.name, this.area).value === option}
                                .value="${option}">
                                ${option}
                            </option>`,
                        )}
                        </select>`
                        : html`
                        <input type="text"
                            class="form-control"
                            id="${field.name}"
                            name="${field.name}"
                            .value="${getAttribute(field.name, this.area).value}"
                            placeholder="${field.placeholder}"
                        >`
                        }
                </div>
            `)}

            <div id="extra-fields-container">
                ${extraFields.map((field) => html`
                        <div class="form-group">
                            <label for="${field.name}" id="edit-label-${field.name}">
                                <input type="checkbox"
                                    class="radio"
                                    title="Set as label"
                                    .checked=${this.checkedLabel[this.area] === field.name}
                                    @click=${this.singleCheckboxValidation}
                                >
                                <span>${field.name}</span>
                                <span class="icon"
                                    @click="${() => this.deleteAttribute(field.name)}">${deleteIcon}
                                </span>
                            </label>

                            <input type="text"
                                id="${field.name}"
                                class="form-control"
                                name="${field.name}"
                                value="${field.value}"
                                placeholder="Enter ${field.name}"
                            >
                        </div>`,
                    )
                }
            </div>

            <button class="btn btn-secondary" @click=${this.showCreateModal}>Add New Property</button>
            <hr>
            <button type="submit" class="btn btn-primary">Save</button>
        </form>

        <rx-spacer-modal id="new-field-modal" title="New Area Property" noExit>
            <div slot="content">
                <form @submit=${this.addNewField} id="new-field-form">
                    <label>Name <span class="required">*<span></label>
                    <input type="text" name="name" required class="form-control">
                    <label>Value</label>
                    <input type="text" name="value" required class="form-control">
                    <button type="submit" class="btn-primary">Submit</button>
                    <button class="btn-danger" @click="${this.cancelNewField}">Cancel</button>
                </form>
            </div>
        </rx-spacer-modal>
        `;
    }

    public stateChanged(state: RootState) {
        this.predefinedVisibleFields = visibleFieldsSelector(state);

        const area = state.rxspacer.selectedAreaId;
        if (area && area !== '') {
            this.area = area;
        }
    }

    private getExtraFields(): Array<{name: string, value: string}> {
        let allCustomProperties = RxCore.getmarkupobjByGUID(this.area).GetAttributes() || [];

        // check first if there are fields to hide
        if (this.excludeFields) {
            allCustomProperties = allCustomProperties.filter(
                (field: any) => !this.excludeFields.includes(field.name),
            );
        }
        const extraProperties: Array<{name: string, value: string}> = [];

        allCustomProperties.map((prop: {name: string, value: string}) => {
            // only get properties that are not in predefined fields
            if (!this.predefinedVisibleFields.find((x) => x.name === prop.name)) {
                extraProperties.push({
                    name: prop.name,
                    value: prop.value,
                });
            }
        });

        return extraProperties;
    }

    /**
     * Form submit handler, add or update custom attributes on area/markup object
     *
     * @param e
     * @fires 'edit-area` event
     */
    private onSubmit(e: Event) {
        e.preventDefault();

        const elements = Array.from(this.inputArray);
        const oldValues = JSON.parse(JSON.stringify(RxCore.getmarkupobjByGUID(this.area).GetAttributes()));

        elements.map((element: HTMLInputElement) => {
            if (element.value !== '' && element.value !== 'Choose option...') {
                this.updateCustomAttribute(element.name, element.value);
            }
        });

        const newValues = RxCore.getmarkupobjByGUID(this.area).GetAttributes();
        let updates: any[] = [];

        newValues.map((newValue: any) => {
            const oldValue = oldValues.find((old: any) => old.name === newValue.name);

            // new/create
            if (oldValue === undefined) {
                updates.push(newValue);
            }

            // update
            if (oldValue && oldValue.value !== newValue.value) {
                updates.push(newValue);
            }
        });

        if (this.newProperties.length > 0) {
            updates = updates.concat(this.newProperties);
            this.newProperties = [];
        }

        // set label
        this.setAreaLabel();

        this.requestUpdate();
        RxEvents.dispatchEvent('rx-spacer-edit-area', {areaId: this.area, fields: updates });
    }

    /**
     * Add or update custom attribute on area/markup object
     *
     * @param {string} name
     * @param {string} value
     */
    private updateCustomAttribute(name: string, value: string) {
        if (this.area === null) {
            return;
        }

        const markup = RxCore.getmarkupobjByGUID(this.area);
        if (markup !== -1) {
            const attribute = markup.GetAttributes().find((element: any) => element.name === name);

            // update operation
            if (attribute) {
                attribute.value = value;
                return;
            }

            // add operation
            markup.AddAttribute(name, value);
        }

    }

    private showCreateModal(e: MouseEvent) {
        e.preventDefault();
        this.newFieldModal.active = true;
    }

    private addNewField(e: Event) {
        e.preventDefault();

        const elements = Array.from((e.target as HTMLFormElement).elements)
            .filter((elem) => elem.tagName === 'INPUT') as HTMLInputElement[];
        let name = elements[0].value;
        const value = elements[1].value;

        if (name === '') {
            alert('Name field is required');
            return;
        }

        // remove spaces from name fields
        name = name.replace(/\s+/g, '');

        const exitingPredefinedField = this.predefinedVisibleFields.find(
            (field) => name.toLowerCase() === field.name.toLowerCase(),
        );
        if (exitingPredefinedField) {
            alert('A field with the same name already exist!');
            return;
        }

        this.updateCustomAttribute(name, value);
        // added in order to detect updates when submitting edit form
        this.newProperties.push({
            name,
            value,
        });

        this.requestUpdate();
        this.newFieldModal.active = false;
        elements.map((element) => {
            element.value = '';
        });
    }

    private cancelNewField(e: MouseEvent) {
        e.preventDefault();
        this.newFieldModal.active = false;
        const elements = Array.from(((e.target as HTMLElement).parentElement as HTMLFormElement).elements)
        .filter((elem) => elem.tagName === 'INPUT') as HTMLInputElement[];

        elements.map((element) => {
            element.value = '';
        });
    }

    private deleteAttribute(name: string) {
        const confirmation = confirm('Are you sure you want to delete the "' + name + '" property?');

        if (confirmation) {
            const markup = RxCore.getmarkupobjByGUID(this.area);
            if (markup && name !== '') {
               markup.deleteAttribute(name);
               this.requestUpdate();
            }
        }
    }

    private singleCheckboxValidation(e: any) {
        this.checkboxArray.forEach((checkbox) => {
            if (checkbox !== e.target) {
                checkbox.checked = false;
            }
        });
    }

    private setAreaLabel() {
        // save label
        const checkedLabelElem = Array.from(this.checkboxArray).find((checkbox) => checkbox.checked === true);

        RxCore.selectMarkupbyGUID(this.area);
        if (checkedLabelElem) {
            const label = (checkedLabelElem.parentElement as any).control.value;
            const propertyName = (checkedLabelElem.parentElement as any).control.name;

            this.checkedLabel[this.area] = propertyName;
            RxCore.setCustomLabelText(label, true);

            // dispatch custom rx event
            RxEvents.dispatchEvent('rx-spacer-label-set', {areaId: this.area, label});
        } else {
            RxCore.setCustomLabelText('', false);
            this.checkedLabel[this.area] = '';

            // dispatch custom rx event
            RxEvents.dispatchEvent('rx-spacer-label-unset', {areaId: this.area});
        }
        RxCore.unSelectMarkupbyGUID(this.area);
    }
}

// Register the element with the browser
customElements.define('rx-spacer-area-edit', RasterexSpacerAreaEdit);
