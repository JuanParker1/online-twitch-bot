// FormField

var _ = require('underscore');
var React = require('react');

var FormField = function(spec, my) {
    var that;
    
    my = my || {};
    spec = spec || {};
    
    that = _.extend({
        sequence: 0,
        type: 'FormField',
        attribute: null, 
        value: '',
        width: 12,
        offset: 0,
        newLine: false,
        getFocus: false,
        isInput: true,
        set: function(value) {
            this.value = value;   
        },
        get: function(form) {
            var value = $('.modalForm.' + form.name + ' [name="' + this.attribute.name + '"]').val();
            return value;
        }
    }, spec);
    return that;
};

var TextFormField = function(spec, my) {
    var that;

    my = my || {};
    spec = spec || {};

    that = FormField(_.extend({
        type: 'Text'
    }, spec));
    return that;
};

var CheckBoxFormField = function(spec, my) {
    var that;

    my = my || {};
    spec = spec || {};

    that = FormField(_.extend({
        type: 'CheckBox',
        get: function(form) {
            var value = $('.modalForm.' + form.name + ' [name="' + this.attribute.name + '"]').is(':checked');
            return value;
        }
    }, spec));
    return that;
};

var CheckListFormField = function(spec, my) {
    var that;

    my = my || {};
    spec = spec || {};

    that = FormField(_.extend({
        type: 'CheckList',
        get: function(form) {
            // TODO Juiste waarde uitlezen
            var value = $('.modalForm.' + form.name + ' [name="' + this.attribute.name + '"]').is(':checked');
            return value;
        }
    }, spec));
    return that;
};

var LongTextFormField = function(spec, my) {
    var that;

    my = my || {};
    spec = spec || {};

    that = FormField(_.extend({
        type: 'LongText'
    }, spec));
    return that;
};

var EditorFormField = function(spec, my) {
    var that;

    my = my || {};
    spec = spec || {};

    that = FormField(_.extend({
        type: 'Editor'
    }, spec));
    return that;
};

var AceEditorFormField = function(spec, my) {
    var that;

    my = my || {};
    spec = spec || {};

    that = FormField(_.extend({
        type: 'AceEditor',
        get: function(form){
            var id = this.attribute.name;
            var editor = ace.edit(id);
            return editor.getValue();
        }
    }, spec));
    return that;
};

var NumberFormField = function(spec, my) {
    var that;

    my = my || {};
    spec = spec || {};

    that = FormField(_.extend({
        type: 'Number'
    }, spec));
    return that;
};

var TreeViewFormField = function(spec, my) {
    var that;

    my = my || {};
    spec = spec || {};

    that = FormField(_.extend({
        type: 'TreeView',
        get: function(form){
            var valArr = [];
            var value = $('.modalForm.' + form.name + ' .treeview[data-name="' + this.attribute.name + '"]');
            $.each(value.find('.bottom-checkbox'), function(){
                $this = $(this);
                var checkbox = $this.siblings('.checkbox').find('input[type="checkbox"]');
                if(checkbox.is(':checked'))
                    valArr.push(checkbox.attr('name'));
            })
            return valArr;
        }
    }, spec));
    return that;
};

var EmailFormField = function(spec, my) {
    var that;

    my = my || {};
    spec = spec || {};

    that = FormField(_.extend({
        type: 'Email'
    }, spec));
    return that;
};

var ImageFormField = function(spec, my) {
    var that;

    my = my || {};
    spec = spec || {};

    that = FormField(_.extend({
        type: 'Image'
    }, spec));
    return that;
};

var SelectFormField = function(spec, my) {
    var that;

    my = my || {};
    spec = spec || {};

    that = FormField(_.extend({
        type: 'Select'
    }, spec));
    return that;
};

var SelectAssociationFormField = function(spec, my) {
    var that;

    my = my || {};
    spec = spec || {};

    that = FormField(_.extend({
        type: 'SelectAssociation',
        set: function(association) {
            this.value = association.value.id;
        },
        get: function(form) {
            var value = $('.modalForm.' + form.name + ' [name="' + this.attribute.name + '"]').val();
            var options = that.options || that.attribute.options;
            return _.find(options, function(option) { return option.id === value; });
        }
    }, spec));
    return that;
};

var MultipleSelectFormField = function(spec, my) {
    var that;

    my = my || {};
    spec = spec || {};

    that = FormField(_.extend({
        type: 'MultipleSelect'
    }, spec));
    return that;
};

var MultipleSelectAssociationFormField = function(spec, my) {
    var that;

    my = my || {};
    spec = spec || {};

    that = FormField(_.extend({
        type: 'MultipleSelectAssociation',
        set: function(association) {
            this.value = _.pluck(association.value, 'id');
        },
        get: function(form) {
            var values = $('.modalForm.' + form.name + ' [name="' + this.attribute.name + '"]').val();
            var options = that.options || that.attribute.options;
            return _.filter(options, function(option) { return values.indexOf(option.id) > -1; });
        }
    }, spec));
    return that;
};

var TokenFieldFormField = function(spec, my) {
    var that;

    my = my || {};
    spec = spec || {};

    that = FormField(_.extend({
        type: 'TokenField'
    }, spec));
    return that;
};

var GroupInputRangeFormField = function(spec, my) {
    var that;

    my = my || {};
    spec = spec || {};

    that = FormField(_.extend({
        type: 'GroupInputRange',
        step: 1,
        largeStep: 10,
        set: function(value) {
            this.value = value;
        },
        get: function(form) {
            var value = {
                userInput: {
                    value: $('.modalForm.' + form.name + ' [name="' + this.attribute.name + '"]').val() || '',
                    comment: $('.modalForm.' + form.name + ' [name="' + this.attribute.name + '-comment"]').val() || ''
                }
            };
            return value;
        }
    }, spec));
    return that;
};

module.exports = {
    Text: TextFormField,
    LongText: LongTextFormField,
    Editor: EditorFormField,
    CheckBox: CheckBoxFormField,
    CheckList: CheckListFormField,
    Number: NumberFormField,
    Email: EmailFormField,
    Image: ImageFormField,
    Select: SelectFormField,
    MultipleSelect: MultipleSelectFormField,
    SelectAssociation: SelectAssociationFormField,
    MultipleSelectAssociation: MultipleSelectAssociationFormField,
    TokenField: TokenFieldFormField,
    GroupInputRange: GroupInputRangeFormField,
    AceEditor: AceEditorFormField,
    TreeView: TreeViewFormField
}


