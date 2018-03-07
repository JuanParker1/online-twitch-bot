// OTB_DefaultFunctionCategory Forms
// 
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import * as Attribute from '../../../js/3-domain/meta/Attribute';
import {Form} from '../../../js/1-presentation/services/meta/Form';
import * as FormField from '../../../js/1-presentation/services/meta/FormField';
var DomainAPI = require('../domain-entity/DomainAPI');
import {OTB_DefaultFunctionCategory} from '../domain-entity/OTB_DefaultFunctionCategory';

class CreateForm extends Form {
   constructor(){
       super();
       this.name = 'OTB_DefaultFunctionCategoryCreateForm';
       this.title = 'OTB_DefaultFunctionCategory toevoegen';
       this.fields = {
           name: new class extends FormField.Text { constructor(){ super(); this.sequence = ''; this.attribute = new OTB_DefaultFunctionCategory().attributes.name; this.width = '12'; this.offset = '0'; this.getFocus = false;} }()
       }
       delete this.buttons.remove;
   };
}

class UpdateForm extends Form {
   constructor(){
       super();
       this.name = 'OTB_DefaultFunctionCategoryUpdateForm';
       this.title = 'OTB_DefaultFunctionCategory wijzigen';
       this.fields = {
           name: new class extends FormField.Text { constructor(){ super(); this.sequence = ''; this.attribute = new OTB_DefaultFunctionCategory().attributes.name; this.width = '12'; this.offset = '0'; this.getFocus = false;} }()
       }
   };
}

class SelectForm extends Form {
   constructor(){
       super();
       this.name = 'OTB_DefaultFunctionCategorySelectForm';
       this.title = 'OTB_DefaultFunctionCategory selecteren';
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
