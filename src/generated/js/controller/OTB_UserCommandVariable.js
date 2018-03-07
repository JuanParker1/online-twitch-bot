// OTB_UserCommandVariable Controllers
// 
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import * as Form from '../form/OTB_UserCommandVariable';
import {OTB_UserCommandVariable} from '../domain-entity/OTB_UserCommandVariable';
var DomainAPI = require('../domain-entity/DomainAPI');

var CreateController = function(contextObject) {
    var form = new Form.Create(contextObject).open();
    $.when(form).done(function(formData) {
        if (formData) {
            switch(formData.action) {
                case 'save':
                    formData.values = formData.values || {};
                    if (contextObject['userCategoryVariables']) {
                        formData.values['userCategoryVariables'] = contextObject['userCategoryVariables'];
                    }
                    if (contextObject['variableFunction']) {
                        formData.values['variableFunction'] = contextObject['variableFunction'];
                    }
                    if (contextObject['commandVariables']) {
                        formData.values['commandVariables'] = contextObject['commandVariables'];
                    }
                    if (contextObject['pluginVariables']) {
                        formData.values['pluginVariables'] = contextObject['pluginVariables'];
                    }                    
DomainAPI.OTB_UserCommandVariableCreate(formData.values, contextObject.user);
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
                        DomainAPI.OTB_UserCommandVariableUpdate(loadedEntity, formData.values, user);
                        break;
                    case 'delete':
                        DomainAPI.OTB_UserCommandVariableDelete(loadedEntity, user);
                        break;
                }
            }
        });
    }
    var entity = contextObject.entity || contextObject;
    if (entity.loadStatus === 'proxy') {
        entity.loadInstance(OTB_UserCommandVariable, entity.id, function(loadedEntity) {
            openUpdateForm(loadedEntity, contextObject.user);
        }, contextObject.user);
    } else {
        openUpdateForm(entity, contextObject.user);
    }
};
module.exports = {
    Create: CreateController,
    Update: UpdateController}

