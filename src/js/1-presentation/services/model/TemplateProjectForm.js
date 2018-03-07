var _ = require('underscore'); 
var Form = require('../meta/Form');
var TextFormField = require('../meta/TextFormField');
var LongTextFormField = require('../meta/LongTextFormField');
var ImageFormField = require('../meta/ImageFormField');
var TemplateProjectEntity = require('../../../3-domain/model/TemplateProjectEntity');

module.exports = function(spec, my) {
    var that;
    
    my = my || {};
    spec = spec || {};
    
    that = Form(_.extend({
        name: 'templateForm',
        title: 'Template wijzigen',
        fields: {
            name: TextFormField({ sequence: 1, attribute: TemplateProjectEntity().attributes.name, getFocus: true }),
            description: LongTextFormField({ sequence: 2, attribute: TemplateProjectEntity().attributes.description }),
            imageUrl: ImageFormField({ sequence: 3, attribute: TemplateProjectEntity().attributes.imageUrl })
        }
    }, spec));
    return that;
};