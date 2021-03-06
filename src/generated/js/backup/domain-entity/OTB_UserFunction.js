// OTB_UserFunction Entity
// 
// Generated by IC STRATEGY on Mon Nov 27 13:58:09 CET 2017

//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import * as Attribute from '../../../js/3-domain/meta/Attribute';
import {Association} from '../../../js/3-domain/meta/Association';
import {OTB_Function} from './OTB_Function';
import * as _ from 'lodash';

export class OTB_UserFunction extends OTB_Function {
   constructor() {
       super();
       this.type = 'OTB_UserFunction';
       this.controller = require('../controller/OTB_UserFunction');
       this.isPersistent = true;
       this.hasUrl = false;
       this.attributes = _.extend(this.attributes, {

       });
       this.associations = _.extend(this.associations, {
           userFunctionCategory: new class extends Association {
               constructor(){
                   super();
                   this.name = 'UserCategoryFunctions';
                   this.thisName = 'userFunctionCategory';
                   this.thisIsComposite = false;
                   this.thisCardinality = 'multiple';
                   this.thisIsMandatory = false;
                   this.thisIsNavigable = true;
                   this.thatName = 'userCategoryFunctions';
                   this.thisEntity = require('./OTB_UserFunction');
                   this.thatEntity = require('./OTB_UserFunctionCategory');
                   this.thatIsComposite = true;
                   this.thatCardinality = 'single';
                   this.thatIsMandatory = true;
                   this.thatIsNavigable = true;
               }
           }()
       });
       this.parentClass = require('./OTB_Function');
   };

};
