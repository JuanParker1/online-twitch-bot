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
                <Input type="text" className="tokenfield" label={this.attribute.label} name={this.attribute.name} defaultValue={this.value} autofocus={this.getFocus} placeholder={this.attribute.help} />
            );
        },
        componentDidMount: function(component) {
            var self = this;
            var $component = $(component.getDOMNode());
            $component.find('.tokenfield').tokenfield({
                delimiter: [',', ' ', ';']
            });
            $component.find('.tokenfield').on('tokenfield:createtoken', function (e) {
                var data = e.attrs.value.split('|');
                e.attrs.value = data[1] || data[0];
                e.attrs.label = data[1] ? data[0] + ' (' + data[1] + ')' : data[0];
                // validate token, otherwise return false
                if (self.validate) {
                    return self.validate(e.attrs.value);
                } else {
                    return true;
                }
            });
        }
    }, spec));
    return that;
}; 