// OTB_UserCommand Controllers
// 
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import * as Form from '../form/OTB_UserCommand';
import {OTB_UserCommand} from '../domain-entity/OTB_UserCommand';
var DomainAPI = require('../domain-entity/DomainAPI');

var CreateController = function(contextObject) {
    var form = new Form.Create(contextObject).open();
    $.when(form).done(function(formData) {
        if (formData) {
            switch(formData.action) {
                case 'save':
                    formData.values = formData.values || {};
                    if (contextObject['userCategoryCommands']) {
                        formData.values['userCategoryCommands'] = contextObject['userCategoryCommands'];
                    }
                    if (contextObject['commandVariables']) {
                        formData.values['commandVariables'] = contextObject['commandVariables'];
                    }
                    if (contextObject['commandParameters']) {
                        formData.values['commandParameters'] = contextObject['commandParameters'];
                    }
                    if (contextObject['commandFunctions']) {
                        formData.values['commandFunctions'] = contextObject['commandFunctions'];
                    }
                    if (contextObject['pluginCommands']) {
                        formData.values['pluginCommands'] = contextObject['pluginCommands'];
                    }                    
DomainAPI.OTB_UserCommandCreate(formData.values, contextObject.user);
                    break;
            }
        }
    });
};
var UpdateController = function(contextObject) {
    function openUpdateForm(loadedEntity, user) {
        var form = new Form.Update(contextObject).open(loadedEntity.getValues());
        $.when(form).done(function(formData) {
            if (formData) {
                switch(formData.action) {
                    case 'save':
                        loadedEntity.setValues(formData.values);
                        DomainAPI.OTB_UserCommandUpdate(loadedEntity, formData.values, user);
                        break;
                    case 'delete':
                        DomainAPI.OTB_UserCommandDelete(loadedEntity, user);
                        break;
                }
            }
        });
    }
    var entity = contextObject.entity || contextObject;
    if (entity.loadStatus === 'proxy') {
        entity.loadInstance(OTB_UserCommand, entity.id, function(loadedEntity) {
            openUpdateForm(loadedEntity, contextObject.user);
        }, contextObject.user);
    } else {
        openUpdateForm(entity, contextObject.user);
    }
};
module.exports = {
    Create: CreateController,
    Update: UpdateController}

