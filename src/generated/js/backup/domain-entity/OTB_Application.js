// OTB_Application Entity
// 
// Generated by IC STRATEGY on Mon Nov 27 13:58:06 CET 2017

//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import * as Attribute from '../../../js/3-domain/meta/Attribute';
import {Association} from '../../../js/3-domain/meta/Association';
import {Entity} from '../../../js/3-domain/meta/Entity';
import * as _ from 'lodash';

export class OTB_Application extends Entity {
   constructor() {
       super();
       this.type = 'OTB_Application';
       this.controller = require('../controller/OTB_Application');
       this.isPersistent = true;
       this.hasUrl = false;
       this.attributes = _.extend(this.attributes, {
           name: new class extends Attribute.TextAttribute {
               constructor(){
                   super();
                   this.name = 'name';
                   this.label = 'name';
                   this.description = '';
                   this.defaultValue = 'testproject';
                   this.chartParameters = {

                   };
                   this.visibility = 'Public';
               }
           }(),
           label: new class extends Attribute.TextAttribute {
               constructor(){
                   super();
                   this.name = 'label';
                   this.label = 'label';
                   this.description = '';
                   this.defaultValue = 'TEST PROJECT';
                   this.chartParameters = {

                   };
                   this.visibility = 'Public';
               }
           }()
       });
       this.associations = _.extend(this.associations, {
           appVariableCategories: new class extends Association {
               constructor(){
                   super();
                   this.name = 'AppVariableCategories';
                   this.thisName = 'appVariableCategories';
                   this.thisIsComposite = true;
                   this.thisCardinality = 'single';
                   this.thisIsMandatory = true;
                   this.thisIsNavigable = true;
                   this.thatName = 'variableCategoryApp';
                   this.thisEntity = require('./OTB_Application');
                   this.thatEntity = require('./OTB_DefaultVariableCategory');
                   this.thatIsComposite = false;
                   this.thatCardinality = 'multiple';
                   this.thatIsMandatory = false;
                   this.thatIsNavigable = true;
               }
           }(),
           appFunctionCategories: new class extends Association {
               constructor(){
                   super();
                   this.name = 'AppFunctionCategories';
                   this.thisName = 'appFunctionCategories';
                   this.thisIsComposite = true;
                   this.thisCardinality = 'single';
                   this.thisIsMandatory = true;
                   this.thisIsNavigable = true;
                   this.thatName = 'functionCategoryApp';
                   this.thisEntity = require('./OTB_Application');
                   this.thatEntity = require('./OTB_DefaultFunctionCategory');
                   this.thatIsComposite = false;
                   this.thatCardinality = 'multiple';
                   this.thatIsMandatory = false;
                   this.thatIsNavigable = true;
               }
           }(),
           appRepository: new class extends Association {
               constructor(){
                   super();
                   this.name = 'AppRepository';
                   this.thisName = 'appRepository';
                   this.thisIsComposite = true;
                   this.thisCardinality = 'single';
                   this.thisIsMandatory = true;
                   this.thisIsNavigable = true;
                   this.thatName = 'repositoryApp';
                   this.thisEntity = require('./OTB_Application');
                   this.thatEntity = require('./OTB_Repository');
                   this.thatIsComposite = false;
                   this.thatCardinality = 'single';
                   this.thatIsMandatory = true;
                   this.thatIsNavigable = true;
               }
           }(),
           appCommandCategories: new class extends Association {
               constructor(){
                   super();
                   this.name = 'AppCommandCategories';
                   this.thisName = 'appCommandCategories';
                   this.thisIsComposite = true;
                   this.thisCardinality = 'single';
                   this.thisIsMandatory = true;
                   this.thisIsNavigable = true;
                   this.thatName = 'commandCategoryApp';
                   this.thisEntity = require('./OTB_Application');
                   this.thatEntity = require('./OTB_DefaultCommandCategory');
                   this.thatIsComposite = false;
                   this.thatCardinality = 'multiple';
                   this.thatIsMandatory = false;
                   this.thatIsNavigable = true;
               }
           }()
       });
   };

};