// OTB_CommandVariable Entity
// 
// Generated by IC STRATEGY on Mon Nov 27 13:58:08 CET 2017

//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import * as Attribute from '../../../js/3-domain/meta/Attribute';
import {Association} from '../../../js/3-domain/meta/Association';
import {Entity} from '../../../js/3-domain/meta/Entity';
import * as _ from 'lodash';

export class OTB_CommandVariable extends Entity {
   constructor() {
       super();
       this.type = 'OTB_CommandVariable';
       this.controller = require('../controller/OTB_CommandVariable');
       this.isPersistent = false;
       this.hasUrl = false;
       this.attributes = _.extend(this.attributes, {
           name: new class extends Attribute.TextAttribute {
               constructor(){
                   super();
                   this.name = 'name';
                   this.label = 'Variable Name';
                   this.description = '';
                   this.defaultValue = '';
                   this.chartParameters = {

                   };
                   this.visibility = 'Public';
               }
           }(),
           description: new class extends Attribute.LongTextAttribute {
               constructor(){
                   super();
                   this.name = 'description';
                   this.label = 'Variable Description';
                   this.description = '';
                   this.defaultValue = '';
                   this.chartParameters = {

                   };
                   this.visibility = 'Public';
               }
           }(),
           handler: new class extends Attribute.TextAttribute {
               constructor(){
                   super();
                   this.name = 'handler';
                   this.label = 'Variable Handler';
                   this.description = '';
                   this.defaultValue = '';
                   this.chartParameters = {

                   };
                   this.visibility = 'Public';
               }
           }(),
           value: new class extends Attribute.ScriptAttribute {
               constructor(){
                   super();
                   this.name = 'value';
                   this.label = 'value';
                   this.description = '';
                   this.defaultValue = '';
                   this.options = {'mode': this.get('type')};
                   this.chartParameters = {

                   };
                   this.visibility = 'Public';
               }
           }(),
           type: new class extends Attribute.NumberAttribute {
               constructor(){
                   super();
                   this.name = 'type';
                   this.label = 'Value Type (0=String, 1=httpRequest, 2=httpsRequest)';
                   this.description = '';
                   this.defaultValue = 0;
                   this.chartParameters = {

                   };
                   this.visibility = 'Public';
               }
           }()
       });
       this.associations = _.extend(this.associations, {
           variableFunction: new class extends Association {
               constructor(){
                   super();
                   this.name = 'FunctionVariables';
                   this.thisName = 'variableFunction';
                   this.thisIsComposite = false;
                   this.thisCardinality = 'multiple';
                   this.thisIsMandatory = false;
                   this.thisIsNavigable = true;
                   this.thatName = 'functionVariables';
                   this.thisEntity = require('./OTB_CommandVariable');
                   this.thatEntity = require('./OTB_Function');
                   this.thatIsComposite = false;
                   this.thatCardinality = 'multiple';
                   this.thatIsMandatory = false;
                   this.thatIsNavigable = false;
               }
           }(),
           variableCommand: new class extends Association {
               constructor(){
                   super();
                   this.name = 'CommandVariables';
                   this.thisName = 'variableCommand';
                   this.thisIsComposite = false;
                   this.thisCardinality = 'multiple';
                   this.thisIsMandatory = false;
                   this.thisIsNavigable = true;
                   this.thatName = 'commandVariables';
                   this.thisEntity = require('./OTB_CommandVariable');
                   this.thatEntity = require('./OTB_Command');
                   this.thatIsComposite = false;
                   this.thatCardinality = 'multiple';
                   this.thatIsMandatory = false;
                   this.thatIsNavigable = false;
               }
           }(),
           variablePlugins: new class extends Association {
               constructor(){
                   super();
                   this.name = 'PluginVariables';
                   this.thisName = 'variablePlugins';
                   this.thisIsComposite = false;
                   this.thisCardinality = 'multiple';
                   this.thisIsMandatory = false;
                   this.thisIsNavigable = false;
                   this.thatName = 'pluginVariables';
                   this.thisEntity = require('./OTB_CommandVariable');
                   this.thatEntity = require('./OTB_Plugin');
                   this.thatIsComposite = false;
                   this.thatCardinality = 'multiple';
                   this.thatIsMandatory = false;
                   this.thatIsNavigable = true;
               }
           }()
       });
   };

};
