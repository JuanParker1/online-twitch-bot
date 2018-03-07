var _ = require('underscore'); 
var Form = require('../meta/Form');
var TextFormField = require('../meta/TextFormField');
var LongTextFormField = require('../meta/LongTextFormField');
var NumberFormField = require('../meta/NumberFormField');
var ImageFormField = require('../meta/ImageFormField');
var SelectFormField = require('../meta/SelectFormField');
var StepEntity = require('../../../3-domain/model/StepEntity');

module.exports = function(spec, my) { 
    var that;
    
    my = my || {};
    spec = spec || {};
    
    that = Form(_.extend({
        name: 'stepForm',
        title: 'Stap wijzigen',
        fields: {
            number: NumberFormField({ sequence: 1, attribute: StepEntity().attributes.sequence, getFocus: true, columns: 2 }),
            name: TextFormField({ sequence: 2, attribute: StepEntity().attributes.name, getFocus: true, columns: 10 }),
            description: LongTextFormField({ sequence: 3, attribute: StepEntity().attributes.description }),
            iconClass: TextFormField({ sequence: 4, attribute: StepEntity().attributes.iconClass }),
            toolId: SelectFormField({ sequence: 5, attribute: StepEntity().attributes.toolId }),
        }
    }, spec));
    return that;
};