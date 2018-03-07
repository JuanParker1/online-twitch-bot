var _ = require('underscore');
var helpers = require('../../../../server/helpers');
var FirebaseManager = require('../../4-infrastructure/databaseManagers/FirebaseManager');
var FormField = require('../../1-presentation/services/meta/FormField');

var Attribute = function(spec, my) {
    var that, my;
    spec = spec || {};
    my = my || {};
    
    that = _.extend({
        name: spec.name ? spec.name.toCamel() : '',
        label: spec.label || '',
        chartParameters: {},
        description: spec.description || '',
        defaultValue: spec.defaultValue || '',
        mandatory: spec.mandatory || false,
        visibility: spec.visibility || 'protected',
        isGroupInput: spec.isGroupInput || false,
        value: spec.value || '',
        persistentValue: '',
        hasChanged: function() {
            return (that.value !== that.persistentValue);
        },
        help: spec.help || '',
        defaultFieldType: null,
        set: function(value, user, setPersistent) {
            that.value = value;
            if (setPersistent) {
                that.persistentValue = that.value;
            }
        },
        hasUserInput: function() {
            return false;
        },
        get: function(user) {
            if (that.value === false) {
                return that.value;
            } else {
                return that.value || (that.defaultValue ? that.defaultValue : '');
            }
        },
        reset: function() {
            that.value = spec.value || '';
        },
        resetPersistentValue: function() {
            that.persistentValue = '';
        }
    }, spec); 
    
    return that;
};

var TextAttribute = function(spec, my) {
    var that;
    spec = spec || {};
    my = my || {};

    that = Attribute(_.extend({
        defaultFieldType: FormField.Text
    }, spec));

    return that;
};

var DateTimeAttribute = function(spec, my) {
    var that;
    spec = spec || {};
    my = my || {};

    that = Attribute(_.extend({
        defaultFieldType: FormField.Text
    }, spec));

    return that;
};

var LongTextAttribute = function(spec, my) {
    var that;
    spec = spec || {};
    my = my || {};

    that = Attribute(_.extend({
        defaultFieldType: FormField.LongText
    }, spec));

    return that;
};

var ScriptAttribute = function(spec, my) {
    var that;
    spec = spec || {};
    my = my || {};

    that = Attribute(_.extend({
        defaultFieldType: FormField.AceEditor,
        mode: spec.mode || []
    }, spec));

    return that;
};

var HtmlAttribute = function(spec, my) {
    var that;
    spec = spec || {};
    my = my || {};

    that = Attribute(_.extend({
        defaultFieldType: FormField.Editor
    }, spec));

    return that;
};

var EmailAttribute = function(spec, my) {
    var that;
    spec = spec || {};
    my = my || {};

    that = Attribute(_.extend({
        defaultFieldType: FormField.Email
    }, spec));
    
    return that;
};

var ImageAttribute = function(spec, my) {
    var that;
    spec = spec || {};
    my = my || {};

    that = Attribute(_.extend({
        defaultFieldType: FormField.Image
    }, spec));
    
    return that;
};

var SelectionAttribute = function(spec, my) {
    var that;
    spec = spec || {};
    my = my || {};
    
    that = Attribute(_.extend({
        defaultFieldType: FormField.Select,
        options: spec.options || []
    }, spec));
    
    return that;
};

var ArrayAttribute = function(spec, my) {
    var that;
    spec = spec || {};
    my = my || {};

    that = SelectionAttribute(_.extend({
        defaultFieldType: FormField.MultipleSelect,
        value: spec.value || [],
        persistentValue: [],
        hasChanged: function() {
            if (!that.persistentValue && !that.value) {
                return false;
            }
            if (!that.persistentValue && that.value) {
                return true;
            }
            if (that.persistentValue && !that.value) {
                return true;
            }
            if (that.persistentValue.length !== that.value.length) {
                return false;
            }
            _.each(that.persistentValue, function(valueItem, index) {
                if (that.persistentValue[index] !== that.value[index]) {
                    return false;
                }
            });
            return true;
        },
        resetPersistentValue: function() {
            that.persistentValue = [];
        }
    }, spec));

    return that;
};

var BooleanObjectAttribute = function(spec, my) {
    var that;
    spec = spec || {};
    my = my || {};

    that = Attribute(_.extend({
        defaultFieldType: FormField.CheckList,
        value: spec.value || {},
        persistentValue: {},
        hasChanged: function() {
            if (!that.persistentValue && !that.value) {
                return false;
            }
            if (!that.persistentValue && that.value) {
                return true;
            }
            if (that.persistentValue && !that.value) {
                return true;
            }
            if (_.keys(that.persistentValue).length !== _.keys(that.value).length) {
                return true;
            }
            if (_.find(_.keys(that.value), function(key) {return _.keys(that.persistentValue).indexOf(key) === -1; })) {
                return true;
            }
            if (_.find(_.keys(that.persistentValue), function(key) {return _.keys(that.value).indexOf(key) === -1; })) {
                return true;
            }
            _.each(_.keys(that.value), function(key) {
                if (that.value[key] !== that.persistentValue[key]) {
                    return true;
                }
            });
            return false;
        },
        resetPersistentValue: function() {
            that.persistentValue = {};
        }
    }, spec));

    return that;
};

var MultipleSelectionAttribute = function(spec, my) {
    var that;
    spec = spec || {};
    my = my || {};

    that = SelectionAttribute(_.extend({
        defaultFieldType: FormField.MultipleSelect,
        value: spec.value || [],
        persistentValue: [],
        hasChanged: function() {
            if (!that.persistentValue && !that.value) {
                return false;
            }
            if (!that.persistentValue && that.value) {
                return true;
            }
            if (that.persistentValue && !that.value) {
                return true;
            }
            if (that.persistentValue.length !== that.value.length) {
                return true;
            }
            if (that.persistentValue.length !== that.value.length) {
                return true;
            }
            _.each(that.persistentValue, function(valueItem, index) {
                if (that.persistentValue[index] !== that.value[index]) {
                    return true;
                }
            });
            return false;
        },
        resetPersistentValue: function() {
            that.persistentValue = [];
        }
    }, spec));

    return that;
};

var NumberAttribute = function(spec, my) {
    var that;
    spec = spec || {};
    my = my || {};

    that = Attribute(_.extend({
        defaultFieldType: FormField.Number,
        min: spec.min || 0,
        max: spec.max || 10,
        step: spec.step || 1
    }, spec));

    return that;
};

var PercentageAttribute = function(spec, my) {
    var that;
    spec = spec || {};
    my = my || {};

    that = Attribute(_.extend({
        defaultFieldType: FormField.Number,
        min: spec.min || 0,
        max: spec.max || 100,
        step: spec.step || 1
    }, spec));

    return that;
};

var GroupInputNumberAttribute = function(spec, my) {
    var that;
    spec = spec || {};
    my = my || {};
    
    that = Attribute(_.extend({
        defaultFieldType: FormField.GroupInputRange,
        DatabaseManager: FirebaseManager(),
        min: spec.min || 0,
        max: spec.max || 10,
        isGroupInput: true,
        persistentValue: { count: 0, sum:0, squareSum: 0, userInput: {}},
        value: { count: 0, sum:0, squareSum: 0, userInput: {}},
        groupInputs: [],
        hasChanged: function() {
            return _.keys(that.persistentValue.userInput).length === 0 && _.keys(that.persistentValue.userInput).length > 0 ||
                that.persistentValue.userInput.value !== that.value.userInput.value ||
                that.persistentValue.userInput.comment !== that.value.userInput.comment;
        },
        hasUserInput: function() {
            return _.keys(that.value.userInput).length > 0;
        },
        get: function(user) {
            if (user) {
                return _.keys(that.value.userInput).length > 0 ? that.value.userInput : {userId: user.id, value: that.defaultValue || 0, comment: '' };
            } else {
                if (that.value.count > 0) {
                    return that.value.sum / that.value.count;
                } else {
                    return 0;
                }
            }
        },
        getVariance: function() {
            if (that.value.count > 1) {
                return (that.value.squareSum - (that.value.sum * that.value.sum) / that.value.count) / (that.value.count - 1);
            } else {
                return 0;
            }
        },
        getStandardDeviation: function() {
            if (that.value.count > 1) {
                return Math.sqrt(that.getVariance());
            } else {
                return 0;
            }
        },
        set: function(value, user, setPersistent) {
            var userId = user ? user.id || user : null;
            if (userId) { // value = {value: .., comment: ..}
                if (_.keys(value).length > 0) {
                    that.value =  _.extend({}, value);
                    if (setPersistent) {
                        that.persistentValue = _.extend({}, value);
                    }
                } else {
                    that.value.userInput = { userId: userId, value: value, comment: ''};
                    if (setPersistent) {
                        that.persistentValue.userInput = { userId: userId, value: value, comment: ''};
                    }
                }
            } else { // value = { n: .., s: .., qs: .., userInput: ..}
                that.value = _.extend({}, value);
                if (setPersistent) {
                    that.persistentValue = _.extend({}, value);
                }
            }
        },
        //getUserInput: function(user) {
        //    var self = this;
        //    var defer = $.Deferred();
        //    var userInput = that.DatabaseManager.getUserInput(that.value.groupInputId, user.id);
        //    $.when(userInput).done(function(item) {
        //        self.userInput = item;
        //        defer.resolve(self.userInput);
        //    });
        //    return defer.promise();
        //},
        getGroupInputs: function() {
            var self = this;
            var defer = $.Deferred();
            var groupInputs = that.DatabaseManager.getGroupInputs(that.value.groupInputId);
            $.when(groupInputs).done(function(items) {
                self.groupInputs = items;
                defer.resolve(self.groupInputs);
            });
            return defer.promise();
        },
        resetPersistentValue: function() {
            that.persistentValue = { count: 0, sum:0, squareSum: 0, userInput: { userId: '', value: 0, comment: '' }};
        }
    }, spec));
    
    return that;
};

var GroupInputPercentageAttribute = function(spec, my) {
    var that;
    spec = spec || {};
    my = my || {};

    that = GroupInputNumberAttribute(_.extend({
        min: spec.min || 0,
        max: spec.max || 100
    }, spec));

    return that;
}

var BooleanAttribute = function(spec, my) {
    var that;
    spec = spec || {};
    my = my || {};
    
    that = Attribute(_.extend({
        defaultFieldType: FormField.CheckBox
    }, spec));
    
    return that;
};

module.exports = {
    TextAttribute: TextAttribute,
    LongTextAttribute: LongTextAttribute,
    HtmlAttribute: HtmlAttribute,
    DateTimeAttribute: DateTimeAttribute,
    EmailAttribute: EmailAttribute,
    NumberAttribute: NumberAttribute,
    GroupInputNumberAttribute: GroupInputNumberAttribute,
    PercentageAttribute: PercentageAttribute,
    GroupInputPercentageAttribute: GroupInputPercentageAttribute,
    SelectionAttribute: SelectionAttribute,
    MultipleSelectionAttribute: MultipleSelectionAttribute,
    ArrayAttribute: ArrayAttribute,
    BooleanObjectAttribute: BooleanObjectAttribute,
    BooleanAttribute: BooleanAttribute,
    ImageAttribute: ImageAttribute,
    ScriptAttribute: ScriptAttribute
};