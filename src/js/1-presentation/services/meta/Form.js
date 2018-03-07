// Form

import * as _ from 'lodash';
var FormActions = require('../actions/FormActions');
var FormButton = require('./FormButton');

export class Form {
    constructor(){
        this.name = '';
        this.title = '';
        this.instruction = '';
        this.width = '70%';
        this.height = '70%';
        this.help = '';
        this.fields = {};
        this.defer = null;
        this.buttons = null;
        if (!this.buttons) {
            this.buttons = {
                cancel: FormButton({ name: 'cancel', label: 'Terug', layoutClass:'', onClick: this.onCancel}),
                remove: FormButton({ name: 'remove', label: 'Verwijderen', layoutClass:'danger', onClick: this.onDelete}),
                ok: FormButton({ name: 'ok', label: 'Akkoord', layoutClass:'primary', onClick: this.onOk}),
            };
        }
    };
    setValues(valuesObject) {
        var self = this;
        _.each(_.keys(valuesObject), function(fieldName) {
            if (self.fields[fieldName]) {
                self.fields[fieldName].set(valuesObject[fieldName]);
            }
        });
    }
    setValue(fieldName, value) {
        var self = this;
        self.fields[fieldName].set(value);
    }
    getValues() {
        var self = this;
        var valuesObject = {};
        _.each(_.keys(self.fields), function(fieldKey) {
            var field = self.fields[fieldKey];
            if (field.isInput) {
                valuesObject[fieldKey] = field.get(self);
            }
        });
        return valuesObject;
    }
    getValue(fieldName) {
        var self = this;
        return this.field[fieldName].get(self);
    }
    open = (formData, user) => {
        this.defer = $.Deferred();
        if (formData) {
            this.setValues(formData, user);
        }
        FormActions.openForm(this);
        return this.defer.promise();
    }
    close() {
        this.onCancel();
    }
    onOk = () => {
        this.defer.resolve({ action: 'save', values: this.getValues() });
        FormActions.closeForm();
    };
    onDelete = () => {
        if (confirm('Verwijderen akkoord')) {
            this.defer.resolve({ action: 'delete' });
            FormActions.closeForm();
        }
    };
    onCancel = () => {
        this.defer.resolve({ action: 'close' });
        FormActions.closeForm();
    };
}