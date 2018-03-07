// FormField

import * as _ from 'lodash';
import React from 'react';

class FormField {
    constructor(){
        this.sequence = 0;
        this.type = 'FormField';
        this.attribute = null;
        this.value = '';
        this.width = 12;
        this.offset = 0;
        this.newLine = false;
        this.getFocus = false;
        this.isInput = true;
    };
    set(value) {
        this.value = value;
    };
    get(form) {
        return $('.modalForm.' + form.name + ' [name="' + this.attribute.name + '"]').val();
    };
}

class TextFormField extends FormField {
    constructor(){
        super();
        this.type = "Text";
    };
}

class CheckBoxFormField extends FormField {
    constructor(){
        super();
        this.type = "CheckBox";
    };
    get(form) {
        var value = $('.modalForm.' + form.name + ' [name="' + this.attribute.name + '"]').is(':checked');
        return value;
    };
}

class CheckListFormField extends FormField {
    constructor(){
        super();
        this.type = "CheckList";
    };
    get(form) {
        // TODO Juiste waarde uitlezen
        var value = $('.modalForm.' + form.name + ' [name="' + this.attribute.name + '"]').is(':checked');
        return value;
    };
}

class LongTextFormField extends FormField {
    constructor(){
        super();
        this.type = "LongText";
    };
}

class EditorFormField extends FormField {
    constructor(){
        super();
        this.type = "Editor";
    };
}

class AceEditorFormField extends FormField {
    constructor(){
        super();
        this.type = "AceEditor";
    };
    get(form){
        var id = this.attribute.name;
        var editor = ace.edit(id);
        return editor.getValue();
    };
}

class NumberFormField extends FormField {
    constructor(){
        super();
        this.type = "Number";
    };
}

class TreeViewFormField extends FormField {
    constructor(){
        super();
        this.type = "TreeView";
    };
    get(form){
        var valArr = [];
        var value = $('.modalForm.' + form.name + ' .treeview[data-name="' + this.attribute.name + '"]');
        $.each(value.find('.bottom-checkbox'), function(){
            var $this = $(this);
            var checkbox = $this.siblings('.checkbox').find('input[type="checkbox"]');
            if(checkbox.is(':checked'))
                valArr.push(checkbox.attr('name'));
        });
        return valArr;
    };
};

class EmailFormField extends FormField {
    constructor(){
        super();
        this.type = "Email";
    };
}

class ImageFormField extends FormField {
    constructor(){
        super();
        this.type = "Image";
    };
}

class SelectFormField extends FormField {
    constructor(){
        super();
        this.type = "Select";
    };
}

class SelectAssociationFormField extends FormField {
    constructor(){
        super();
        this.type = "SelectAssociation";
    };
    get(form) {
        var value = $('.modalForm.' + form.name + ' [name="' + this.attribute.name + '"]').val();
        var options = that.options || that.attribute.options;
        return _.find(options, function(option) { return option.id === value; });
    };
    set(association) {
        this.value = association.value.id;
    };
}

class MultipleSelectFormField extends FormField {
    constructor(){
        super();
        this.type = "MultipleSelect";
    };
}

class MultipleSelectAssociationFormField extends FormField {
    constructor(){
        super();
        this.type = "MultipleSelectAssociation";
    };
    set(association) {
        this.value = _.pluck(association.value, 'id');
    };
    get(form) {
        var values = $('.modalForm.' + form.name + ' [name="' + this.attribute.name + '"]').val();
        var options = that.options || that.attribute.options;
        return _.filter(options, function(option) { return values.indexOf(option.id) > -1; });
    };
}

class TokenFieldFormField extends FormField {
    constructor(){
        super();
        this.type = "TokenField";
    };
}

class GroupInputRangeFormField extends FormField {
    constructor(){
        super();
        this.type = "GroupInputRange";
        this.step = 1;
        this.largeStep = 10;
    };
    set(value) {
        this.value = value;
    };
    get(form) {
        return {
            userInput: {
                value: $('.modalForm.' + form.name + ' [name="' + this.attribute.name + '"]').val() || '',
                comment: $('.modalForm.' + form.name + ' [name="' + this.attribute.name + '-comment"]').val() || ''
            }
        };
    };
}

export {
    TextFormField as Text,
    LongTextFormField as LongText,
    EditorFormField as Editor,
    CheckBoxFormField as CheckBox,
    CheckListFormField as CheckList,
    NumberFormField as Number,
    EmailFormField as Email,
    ImageFormField as Image,
    SelectFormField as Select,
    MultipleSelectFormField as MultipleSelect,
    SelectAssociationFormField as SelectAssociation,
    MultipleSelectAssociationFormField as MultipleSelectAssociation,
    TokenFieldFormField as TokenField,
    GroupInputRangeFormField as GroupInputRange,
    AceEditorFormField as AceEditor,
    TreeViewFormField as TreeView
}


