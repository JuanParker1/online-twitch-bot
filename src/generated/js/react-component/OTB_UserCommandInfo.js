// OTB_UserCommandInfo React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';
import OTB_GeneralH2 from './OTB_GeneralH2';
import OTB_GeneralP from './OTB_GeneralP';
import OTB_ThinHR from './OTB_ThinHR';
import OTB_CommandParameterAccordion from './OTB_CommandParameterAccordion';

class OTB_UserCommandInfo extends React.Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {
        command: null
    };
    render() {
        var self = this;
        if (true) {
            return(
                <span className={"user-command-info " + ""} style={self.props.style || {}} >
                    <OTB_GeneralH2 classes={'text-light'} title={self.props.command.get('name') + " (" + self.props.command.get('handler') + ")"} />
                    <OTB_GeneralP text={self.props.command.get('description')} />
                    { (self.props.command.get('commandParameters')[0]) ? <OTB_CommandParameterAccordion command={self.props.command} /> : <span /> }
                    <OTB_ThinHR />
                </span>
            );
        }
        else {
            return <span />;
        };
    };
};

export default OTB_UserCommandInfo;
