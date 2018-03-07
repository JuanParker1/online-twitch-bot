var _ = require('underscore'); 
var Form = require('../meta/Form');
var TextFormField = require('../meta/TextFormField');
var LongTextFormField = require('../meta/LongTextFormField');
var ImageFormField = require('../meta/ImageFormField');
var TokenFieldFormField = require('../meta/TokenFieldFormField');
var UserProjectEntity = require('../../../3-domain/model/UserProjectEntity');

module.exports = function(spec, my) {
    var that;
    
    my = my || {};
    spec = spec || {};
    
    that = Form(_.extend({
        name: 'templateForm',
        title: 'Template wijzigen',
        fields: {
            name: TextFormField({ sequence: 1, attribute: UserProjectEntity().attributes.name, getFocus: true }),
            description: LongTextFormField({ sequence: 2, attribute: UserProjectEntity().attributes.description }),
            memberEmailList: TokenFieldFormField({ sequence: 3, attribute: UserProjectEntity().attributes.memberEmailList }),
            facilitatorEmailList: TokenFieldFormField({ sequence: 4, attribute: UserProjectEntity().attributes.facilitatorEmailList }),
            imageUrl: ImageFormField({ sequence: 5, attribute: UserProjectEntity().attributes.imageUrl }),
        }
    }, spec));
    return that;
};