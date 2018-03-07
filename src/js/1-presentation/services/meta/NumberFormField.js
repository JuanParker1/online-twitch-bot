var React = require('react');
var _ = require('underscore');
var FormField = require('./FormField');
var Input = require('react-bootstrap').Input;

module.exports = function(spec, my) {
    var that;
     
    my = my || {};
    spec = spec || {};
    
    that = FormField(_.extend({
        getFieldComponent: function() {
            return (
                <Input type="number" label={this.attribute.label} name={this.attribute.name} defaultValue={this.value} autofocus={this.getFocus} placeholder={this.attribute.help} />
            );
        }
    }, spec));
    return that;
};