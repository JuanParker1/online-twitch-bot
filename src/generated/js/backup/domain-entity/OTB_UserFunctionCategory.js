// OTB_UserFunctionCategory Entity
// 
// Generated by IC STRATEGY on Mon Nov 27 13:58:09 CET 2017

//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import * as Attribute from '../../../js/3-domain/meta/Attribute';
import {Association} from '../../../js/3-domain/meta/Association';
import {Entity} from '../../../js/3-domain/meta/Entity';
import * as _ from 'lodash';

export class OTB_UserFunctionCategory extends Entity {
   constructor() {
       super();
       this.type = 'OTB_UserFunctionCategory';
       this.controller = require('../controller/OTB_UserFunctionCategory');
       this.isPersistent = true;
       this.hasUrl = false;
       this.attributes = _.extend(this.attributes, {
           name: new class extends Attribute.TextAttribute {
               constructor(){
                   super();
                   this.name = 'name';
                   this.label = 'Category Name';
                   this.description = '';
                   this.defaultValue = '';
                   this.chartParameters = {

                   };
                   this.visibility = 'Public';
               }
           }()
       });
       this.associations = _.extend(this.associations, {
           userCategoryFunctions: new class extends Association {
               constructor(){
                   super();
                   this.name = 'UserCategoryFunctions';
                   this.thisName = 'userCategoryFunctions';
                   this.thisIsComposite = true;
                   this.thisCardinality = 'single';
                   this.thisIsMandatory = true;
                   this.thisIsNavigable = true;
                   this.thatName = 'userFunctionCategory';
                   this.thisEntity = require('./OTB_UserFunctionCategory');
                   this.thatEntity = require('./OTB_UserFunction');
                   this.thatIsComposite = false;
                   this.thatCardinality = 'multiple';
                   this.thatIsMandatory = false;
                   this.thatIsNavigable = true;
               }
           }(),
           functionCategoryCreator: new class extends Association {
               constructor(){
                   super();
                   this.name = 'FunctionCategoryCreator';
                   this.thisName = 'functionCategoryCreator';
                   this.thisIsComposite = false;
                   this.thisCardinality = 'multiple';
                   this.thisIsMandatory = false;
                   this.thisIsNavigable = true;
                   this.thatName = 'ownFunctionCategories';
                   this.thisEntity = require('./OTB_UserFunctionCategory');
                   this.thatEntity = require('./OTB_User');
                   this.thatIsComposite = true;
                   this.thatCardinality = 'single';
                   this.thatIsMandatory = true;
                   this.thatIsNavigable = true;
               }
           }()
       });
   };

};