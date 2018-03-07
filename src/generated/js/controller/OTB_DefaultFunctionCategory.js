// OTB_DefaultFunctionCategory Controllers
// 
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import * as Form from '../form/OTB_DefaultFunctionCategory';
import {OTB_DefaultFunctionCategory} from '../domain-entity/OTB_DefaultFunctionCategory';
var DomainAPI = require('../domain-entity/DomainAPI');

var CreateController = function(contextObject) {
    var form = new Form.Create(contextObject).open();
    $.when(form).done(function(formData) {
        if (formData) {
            switch(formData.action) {
                case 'save':
                    formData.values = formData.values || {};
                    if (contextObject['appFunctionCategory']) {
                        formData.values['appFunctionCategory'] = contextObject['appFunctionCategory'];
                    }
                    if (contextObject['appFunctionCategories']) {
                        formData.values['appFunctionCategories'] = contextObject['appFunctionCategories'];
                    }                    
DomainAPI.OTB_DefaultFunctionCategoryCreate(formData.values, contextObject.user);
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
                        DomainAPI.OTB_DefaultFunctionCategoryUpdate(loadedEntity, formData.values, user);
                        break;
                    case 'delete':
                        DomainAPI.OTB_DefaultFunctionCategoryDelete(loadedEntity, user);
                        break;
                }
            }
        });
    }
    var entity = contextObject.entity || contextObject;
    if (entity.loadStatus === 'proxy') {
        entity.loadInstance(OTB_DefaultFunctionCategory, entity.id, function(loadedEntity) {
            openUpdateForm(loadedEntity, contextObject.user);
        }, contextObject.user);
    } else {
        openUpdateForm(entity, contextObject.user);
    }
};
module.exports = {
    Create: CreateController,
    Update: UpdateController}

