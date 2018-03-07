var React = require('react');
var _ = require('underscore');
var FormField = require('./FormField');
var Input = require('react-bootstrap').Input;
var Slider = require('../../components/kendo-components/Slider'); 

module.exports = function(spec, my) {
    var that;
     
    my = my || {};
    spec = spec || {};
    
    that = FormField(_.extend({
        step: 1,
        largeStep: 10,
        getFieldComponent: function() {
            return (
                <span>
                    <Slider label={this.attribute.label} name={this.attribute.name} min={this.attribute.min} max={this.attribute.max} step={this.step} largeStep={this.largeStep} value={this.value ? this.value.value : this.attribute.value.value} />
                    <Input type="textarea" label={""} name={this.attribute.name + '-comment'} defaultValue={this.value ? this.value.comment : this.attribute.value.comment} placeholder={"Geef hier een toelichting"} />
                </span>
            );
        },
        set: function(value) {
            this.value = value;   
        },
        get: function(form) {
            var value = {
                value: $('.modalForm.' + form.name + ' [name="' + this.attribute.name + '"]').val(),
                comment: $('.modalForm.' + form.name + ' [name="' + this.attribute.name + '-comment"]').val()
            };
            return value;
        },
    }, spec));
    return that;
};