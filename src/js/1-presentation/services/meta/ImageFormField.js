var React = require('react');
var _ = require('underscore');
var FormField = require('./FormField');
var ImageUpload = require('../../components/generic-components/ImageUpload');

module.exports = function(spec, my) {
    var that;
     
    my = my || {};
    spec = spec || {};
    
    that = FormField(_.extend({
        getFieldComponent: function() {
            return (
                <ImageUpload name={this.attribute.name} defaultValue={this.value} />
            );
        }
    }, spec));
    return that;
};
