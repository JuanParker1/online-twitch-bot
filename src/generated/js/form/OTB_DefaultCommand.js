// OTB_DefaultCommand Forms
// 
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import * as Attribute from '../../../js/3-domain/meta/Attribute';
import { Form } from '../../../js/1-presentation/services/meta/Form';
import * as FormField from '../../../js/1-presentation/services/meta/FormField';
import { OTB_DefaultCommand } from '../domain-entity/OTB_DefaultCommand';

class CreateForm extends Form {
    constructor(){
        super();
        this.name = 'OTB_DefaultCommandCreateForm';
        this.title = 'OTB_DefaultCommand toevoegen';
        this.fields = {
            name: new class extends FormField.TextAttribute { constructor(){ super(); this.sequence = ''; this.attribute = new OTB_DefaultCommand().attributes.name; this.width = '12'; this.offset = '0'; this.getFocus = false;} }(),
            description: new class extends FormField.LongTextAttribute { constructor(){ super(); this.sequence = ''; this.attribute = new OTB_DefaultCommand().attributes.description; this.width = '12'; this.offset = '0'; this.getFocus = false;} }(),
            handler: new class extends FormField.TextAttribute { constructor(){ super(); this.sequence = ''; this.attribute = new OTB_DefaultCommand().attributes.handler; this.width = '12'; this.offset = '0'; this.getFocus = false;} }()
        };
        delete this.buttons.remove;
    }
}

class UpdateForm extends Form {
    constructor(){
        super();
        this.name = 'OTB_DefaultCommandCreateForm';
        this.title = 'OTB_DefaultCommand wijzigen';
        this.fields = {
            name: new class extends FormField.TextAttribute { constructor(){ super(); this.sequence = ''; this.attribute = new OTB_DefaultCommand().attributes.name; this.width = '12'; this.offset = '0'; this.getFocus = false;} }(),
            description: new class extends FormField.LongTextAttribute { constructor(){ super(); this.sequence = ''; this.attribute = new OTB_DefaultCommand().attributes.description; this.width = '12'; this.offset = '0'; this.getFocus = false;} }(),
            handler: new class extends FormField.TextAttribute { constructor(){ super(); this.sequence = ''; this.attribute = new OTB_DefaultCommand().attributes.handler; this.width = '12'; this.offset = '0'; this.getFocus = false;} }()
        };
    }
}

class SelectForm extends Form {
    constructor(){
        super();
        this.name = 'OTB_DefaultCommandSelectForm';
        this.title = 'OTB_DefaultCommand selecteren';
        this.fields = {
            id: new class extends FormField.Select { constructor(){ super(); this.name = 'id'; this.sequence = '01'; this.attribute = Attribute.SelectionAttribute({ name: 'id', options: spec.options || [], label: '', defaultFieldType: FormField.Select, help: 'Maak een selectie...' }); this.width = '12'; this.offset = '0'; this.getFocus = true;} }()
        };
        delete this.buttons.remove;
    }
}

export {
    CreateForm as Create,
    UpdateForm as Update,
    SelectForm as Select
}

