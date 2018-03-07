// OTB_UserCommandVariable Forms
// 
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import * as Attribute from '../../../js/3-domain/meta/Attribute';
import {Form} from '../../../js/1-presentation/services/meta/Form';
import * as FormField from '../../../js/1-presentation/services/meta/FormField';
var DomainAPI = require('../domain-entity/DomainAPI');
import {OTB_UserCommandVariable} from '../domain-entity/OTB_UserCommandVariable';

class CreateForm extends Form {
   constructor(){
       super();
       this.name = 'OTB_UserCommandVariableCreateForm';
       this.title = 'OTB_UserCommandVariable toevoegen';
       this.fields = {
           name: new class extends FormField.Text { constructor(){ super(); this.sequence = ''; this.attribute = new OTB_UserCommandVariable().attributes.name; this.width = '12'; this.offset = '0'; this.getFocus = false;} }(),
           description: new class extends FormField.LongText { constructor(){ super(); this.sequence = ''; this.attribute = new OTB_UserCommandVariable().attributes.description; this.width = '12'; this.offset = '0'; this.getFocus = false;} }(),
           handler: new class extends FormField.Text { constructor(){ super(); this.sequence = ''; this.attribute = new OTB_UserCommandVariable().attributes.handler; this.width = '12'; this.offset = '0'; this.getFocus = false;} }(),
           value: new class extends FormField.AceEditor { constructor(){ super(); this.sequence = ''; this.attribute = new OTB_UserCommandVariable().attributes.value; this.width = '12'; this.offset = '0'; this.getFocus = false;} }(),
           type: new class extends FormField.Number { constructor(){ super(); this.sequence = ''; this.attribute = new OTB_UserCommandVariable().attributes.type; this.width = '12'; this.offset = '0'; this.getFocus = false;} }()
       }
       delete this.buttons.remove;
   };
}

class UpdateForm extends Form {
   constructor(){
       super();
       this.name = 'OTB_UserCommandVariableUpdateForm';
       this.title = 'OTB_UserCommandVariable wijzigen';
       this.fields = {
           name: new class extends FormField.Text { constructor(){ super(); this.sequence = ''; this.attribute = new OTB_UserCommandVariable().attributes.name; this.width = '12'; this.offset = '0'; this.getFocus = false;} }(),
           description: new class extends FormField.LongText { constructor(){ super(); this.sequence = ''; this.attribute = new OTB_UserCommandVariable().attributes.description; this.width = '12'; this.offset = '0'; this.getFocus = false;} }(),
           handler: new class extends FormField.Text { constructor(){ super(); this.sequence = ''; this.attribute = new OTB_UserCommandVariable().attributes.handler; this.width = '12'; this.offset = '0'; this.getFocus = false;} }(),
           value: new class extends FormField.AceEditor { constructor(){ super(); this.sequence = ''; this.attribute = new OTB_UserCommandVariable().attributes.value; this.width = '12'; this.offset = '0'; this.getFocus = false;} }(),
           type: new class extends FormField.Number { constructor(){ super(); this.sequence = ''; this.attribute = new OTB_UserCommandVariable().attributes.type; this.width = '12'; this.offset = '0'; this.getFocus = false;} }()
       }
   };
}

class SelectForm extends Form {
   constructor(){
       super();
       this.name = 'OTB_UserCommandVariableSelectForm';
       this.title = 'OTB_UserCommandVariable selecteren';
       this.fields = {
           id: new class extends FormField.Select { constructor(){ super(); this.name = 'id'; this.sequence = '01'; this.attribute = Attribute.SelectionAttribute({ name: 'id', options: spec.options || [], label: '', defaultFieldType: FormField.Select, help: 'Maak een selectie...' }); this.width = '12'; this.offset = '0'; this.getFocus = true;} }()
       }
       delete this.buttons.remove;
   };
}

export {
   CreateForm as Create,
   UpdateForm as Update,
   SelectForm as Select
}
