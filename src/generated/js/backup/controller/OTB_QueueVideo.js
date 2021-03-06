// OTB_QueueVideo Controllers
// 
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import * as Form from '../form/OTB_QueueVideo';
import {OTB_QueueVideo} from '../domain-entity/OTB_QueueVideo';
var DomainAPI = require('../domain-entity/DomainAPI');

var CreateController = function(contextObject) {
   var form = new Form.Create(contextObject).open();
   $.when(form).done(function(formData) {
       if (formData) {
           switch(formData.action) {
               case 'save':
                   formData.values = formData.values || {};
                   if (contextObject['queueUser']) {
                       formData.values['queueUser'] = contextObject['queueUser'];
                   }
                   DomainAPI.OTB_QueueVideoCreate(formData.values, contextObject.user);
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
                       DomainAPI.OTB_QueueVideoUpdate(loadedEntity, formData.values, user);
                       break;
                   case 'delete':
                       DomainAPI.OTB_QueueVideoDelete(loadedEntity, user);
                       break;
               }
           }
       });
   }
   var entity = contextObject.entity || contextObject;
   if (entity.loadStatus === 'proxy') {
       entity.loadInstance(OTB_QueueVideo, entity.id, function(loadedEntity) {
           openUpdateForm(loadedEntity, contextObject.user);
       }, contextObject.user);
   } else {
       openUpdateForm(entity, contextObject.user);
   }
};
module.exports = {
   Create: CreateController,
   Update: UpdateController
};

