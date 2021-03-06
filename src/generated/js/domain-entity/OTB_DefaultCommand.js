// OTB_DefaultCommand Entity
// 
// Generated by IC STRATEGY on Wed Mar 07 01:06:20 CET 2018

//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import * as Attribute from '../../../js/3-domain/meta/Attribute';
import { Association } from '../../../js/3-domain/meta/Association';
import * as _ from 'lodash';
import { OTB_Command } from './OTB_Command';

class OTB_DefaultCommand extends OTB_Command {
    constructor() {
        super();
        this.type = 'OTB_DefaultCommand';
        this.controller = require('../controller/OTB_DefaultCommand');
        this.isPersistent = true;
        this.hasUrl = false;
        this.attributes = _.extend(this.attributes, {

        });
        this.associations = _.extend(this.associations, {
            appCommandCategory: new class extends Association {
                constructor(){
                    super();
                    this.name = 'AppCategoryCommands';
                    this.thisName = 'appCommandCategory';
                    this.thisIsComposite = false;
                    this.thisCardinality = 'multiple';
                    this.thisIsMandatory = false;
                    this.thisIsNavigable = true;
                    this.thatName = 'appCategoryCommands';
                    this.thisEntity = require('./OTB_DefaultCommand');
                    this.thatEntity = require('./OTB_DefaultCommandCategory');
                    this.thatIsComposite = true;
                    this.thatCardinality = 'single';
                    this.thatIsMandatory = true;
                    this.thatIsNavigable = true;
                }
            }(),
            defaultCommandUsage: new class extends Association {
                constructor(){
                    super();
                    this.name = 'DefaultCommands';
                    this.thisName = 'defaultCommandUsage';
                    this.thisIsComposite = false;
                    this.thisCardinality = 'multiple';
                    this.thisIsMandatory = false;
                    this.thisIsNavigable = true;
                    this.thatName = 'activeDefaultCommands';
                    this.thisEntity = require('./OTB_DefaultCommand');
                    this.thatEntity = require('./OTB_User');
                    this.thatIsComposite = false;
                    this.thatCardinality = 'multiple';
                    this.thatIsMandatory = false;
                    this.thatIsNavigable = false;
                }
            }()
        });
    };
};

export { OTB_DefaultCommand };
