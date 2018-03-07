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
            if (this.isInput) {
                return (
                    <Input type="textarea" label={this.attribute.label} name={this.attribute.name} defaultValue={this.value} autofocus={this.getFocus} placeholder={this.attribute.help} />
                );
            } else {
                return (
                    <div className="form-group">
                        <label className="control-label" style={{width: '100%'}}>{this.attribute.label}</label>
                        <div style={{width: '100%'}}>{this.value}</div>
                    </div>
                );
            }
        }
    }, spec));
    return that;
};