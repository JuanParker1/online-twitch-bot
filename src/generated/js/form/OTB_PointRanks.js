// OTB_PointRanks Forms
// 
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import * as Attribute from '../../../js/3-domain/meta/Attribute';
import { Form } from '../../../js/1-presentation/services/meta/Form';
import * as FormField from '../../../js/1-presentation/services/meta/FormField';
import { OTB_PointRanks } from '../domain-entity/OTB_PointRanks';

class CreateForm extends Form {
    constructor(){
        super();
        this.name = 'OTB_PointRanksCreateForm';
        this.title = 'OTB_PointRanks toevoegen';
        this.fields = {

        };
        delete this.buttons.remove;
    }
}

class UpdateForm extends Form {
    constructor(){
        super();
        this.name = 'OTB_PointRanksCreateForm';
        this.title = 'OTB_PointRanks wijzigen';
        this.fields = {

        };
    }
}

class SelectForm extends Form {
    constructor(){
        super();
        this.name = 'OTB_PointRanksSelectForm';
        this.title = 'OTB_PointRanks selecteren';
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

