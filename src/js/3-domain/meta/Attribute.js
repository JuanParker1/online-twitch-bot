import * as _ from 'lodash';
var helpers = require('../../../../server/helpers');
var FirebaseManager = require('../../4-infrastructure/databaseManagers/FirebaseManager');
import * as FormField from '../../1-presentation/services/meta/FormField';

class Attribute {
    constructor(){
        this._name = '';
        this.label = '';
        this.chartParameters = {};
        this.description = '';
        this.defaultValue = '';
        this.mandatory = false;
        this.visibility = 'protected';
        this.isGroupInput = false;
        this.value = '';
        this.persistentValue = '';
        this.help = '';
        this.defaultFieldType = null;
        this.options = {};
    };
    get name(){
        return this._name;
    }
    set name(value){
        this._name = value.toCamel();
    }
    hasChanged() {
        return (this.value !== this.persistentValue);
    };
    set(value, user, setPersistent) {
        this.value = value;
        if (setPersistent) {
            this.persistentValue = this.value;
        }
    };
    static hasUserInput() {
        return false;
    };
    get(user) {
        if (this.value === false) {
            return this.value;
        } else {
            return this.value || (this.defaultValue ? this.defaultValue : '');
        }
    };
    reset() {
        this.value = '';
    };
    resetPersistentValue() {
        this.persistentValue = '';
    };
}

class TextAttribute extends Attribute {
    constructor(){
        super();
        this.defaultFieldType = FormField.Text;
    };
}

class DateTimeAttribute extends Attribute {
    constructor() {
        super();
        this.defaultFieldType = FormField.Text;
    };
}

class LongTextAttribute extends Attribute {
    constructor(){
        super();
        this.defaultFieldType = FormField.LongText;
    };
}

class ScriptAttribute extends Attribute {
    constructor(){
        super();
        this.defaultFieldType = FormField.AceEditor;
        this.mode = [];
    };
}

class HtmlAttribute extends Attribute {
    constructor(){
        super();
        this.defaultFieldType = FormField.Editor;
    };
}

class EmailAttribute extends Attribute {
    constructor(){
        super();
        this.defaultFieldType = FormField.Email;
    };
}

class ImageAttribute extends Attribute {
    constructor(){
        super();
        this.defaultFieldType = FormField.Image;
    };
}

class SelectionAttribute extends Attribute {
    constructor(){
        super();
        this.defaultFieldType = FormField.Select;
        this.options = [];
    };
}

class ArrayAttribute extends SelectionAttribute {
    constructor(){
        super();
        this.defaultFieldType = FormField.MultipleSelect;
        this.value = [];
        this.persistentValue = [];

    };
    hasChanged() {
        if (!this.persistentValue && !this.value) {
            return false;
        }
        if (!this.persistentValue && this.value) {
            return true;
        }
        if (this.persistentValue && !this.value) {
            return true;
        }
        if (this.persistentValue.length !== this.value.length) {
            return false;
        }
        _.each(this.persistentValue, function(valueItem, index) {
            if (this.persistentValue[index] !== this.value[index]) {
                return false;
            }
        });
        return true;
    };
    resetPersistentValue() {
        this.persistentValue = [];
    };
}

class BooleanObjectAttribute extends Attribute {
    constructor(){
        super();
        this.defaultFieldType = FormField.CheckList;
        this.value = {};
        this.persistentValue = {};
    };
    hasChanged() {
        var self = this;
        if (!self.persistentValue && !self.value) {
            return false;
        }
        if (!self.persistentValue && self.value) {
            return true;
        }
        if (self.persistentValue && !self.value) {
            return true;
        }
        if (_.keys(self.persistentValue).length !== _.keys(self.value).length) {
            return true;
        }
        if (_.find(_.keys(self.value), function(key) {return _.keys(self.persistentValue).indexOf(key) === -1; })) {
            return true;
        }
        if (_.find(_.keys(self.persistentValue), function(key) {return _.keys(self.value).indexOf(key) === -1; })) {
            return true;
        }
        _.each(_.keys(self.value), function(key) {
            if (self.value[key] !== self.persistentValue[key]) {
                return true;
            }
        });
        return false;
    };
    resetPersistentValue() {
        this.persistentValue = {};
    };
}

class MultipleSelectionAttribute extends SelectionAttribute {
    constructor(){
        super();
        this.defaultFieldType = FormField.MultipleSelect;
        this.value = [];
        this.persistentValue = [];
    };
    hasChanged() {
        if (!this.persistentValue && !this.value) {
            return false;
        }
        if (!this.persistentValue && this.value) {
            return true;
        }
        if (this.persistentValue && !this.value) {
            return true;
        }
        if (this.persistentValue.length !== this.value.length) {
            return true;
        }
        if (this.persistentValue.length !== this.value.length) {
            return true;
        }
        _.each(this.persistentValue, function(valueItem, index) {
            if (this.persistentValue[index] !== this.value[index]) {
                return true;
            }
        });
        return false;
    };
    resetPersistentValue() {
        this.persistentValue = [];
    };
}

class NumberAttribute extends Attribute {
    constructor(){
        super();
        this.defaultFieldType = FormField.Number;
        this.min = 0;
        this.max = 10;
        this.step = 1;
    };
}

class PercentageAttribute extends Attribute {
    constructor(){
        super();
        this.defaultFieldType = FormField.Number;
        this.min = 0;
        this.max = 100;
        this.step = 1;
    };
}

class GroupInputNumberAttribute extends Attribute {
    constructor(){
        super();
        this.defaultFieldType = FormField.GroupInputRange;
        this.DatabaseManager = FirebaseManager();
        this.min = 0;
        this.max = 10;
        this.isGroupInput = true;
        this.persistentValue = { count: 0, sum: 0, squareSum: 0, userInput: {}};
        this.value = { count: 0, sum: 0, squareSum: 0, userInput: {}};
        this.groupInputs = [];
    };
    hasChanged() {
        return _.keys(this.persistentValue.userInput).length === 0 && _.keys(this.persistentValue.userInput).length > 0 ||
            this.persistentValue.userInput.value !== this.value.userInput.value ||
            this.persistentValue.userInput.comment !== this.value.userInput.comment;
    };
    hasUserInput() {
        return _.keys(this.value.userInput).length > 0;
    };
    get(user) {
        if (user) {
            return _.keys(this.value.userInput).length > 0 ? this.value.userInput : {userId: user.id, value: this.defaultValue || 0, comment: '' };
        } else {
            if (this.value.count > 0) {
                return this.value.sum / this.value.count;
            } else {
                return 0;
            }
        }
    };
    getVariance() {
        if (this.value.count > 1) {
            return (this.value.squareSum - (this.value.sum * this.value.sum) / this.value.count) / (this.value.count - 1);
        } else {
            return 0;
        }
    };
    getStandardDeviation() {
        if (this.value.count > 1) {
            return Math.sqrt(this.getVariance());
        } else {
            return 0;
        }
    };
    set(value, user, setPersistent) {
        var userId = user ? user.id || user : null;
        if (userId) { // value = {value: .., comment: ..}
            if (_.keys(value).length > 0) {
                this.value =  _.extend({}, value);
                if (setPersistent) {
                    this.persistentValue = _.extend({}, value);
                }
            } else {
                this.value.userInput = { userId: userId, value: value, comment: ''};
                if (setPersistent) {
                    this.persistentValue.userInput = { userId: userId, value: value, comment: ''};
                }
            }
        } else { // value = { n: .., s: .., qs: .., userInput: ..}
            this.value = _.extend({}, value);
            if (setPersistent) {
                this.persistentValue = _.extend({}, value);
            }
        }
    };
    getGroupInputs() {
        var self = this;
        var defer = $.Deferred();
        var groupInputs = this.DatabaseManager.getGroupInputs(this.value.groupInputId);
        $.when(groupInputs).done(function(items) {
            self.groupInputs = items;
            defer.resolve(self.groupInputs);
        });
        return defer.promise();
    };
    resetPersistentValue() {
        this.persistentValue = { count: 0, sum:0, squareSum: 0, userInput: { userId: '', value: 0, comment: '' }};
    };
}

class GroupInputPercentageAttribute extends GroupInputNumberAttribute {
    constructor(){
        super();
        this.min = 0;
        this.max = 100;
    };
}

class BooleanAttribute extends Attribute {
    constructor(){
        super();
        this.defaultFieldType = FormField.CheckBox;
    };
}

export {
    TextAttribute,
    LongTextAttribute,
    HtmlAttribute,
    DateTimeAttribute,
    EmailAttribute,
    NumberAttribute,
    GroupInputNumberAttribute,
    PercentageAttribute,
    GroupInputPercentageAttribute,
    SelectionAttribute,
    MultipleSelectionAttribute,
    ArrayAttribute,
    BooleanObjectAttribute,
    BooleanAttribute,
    ImageAttribute,
    ScriptAttribute
};