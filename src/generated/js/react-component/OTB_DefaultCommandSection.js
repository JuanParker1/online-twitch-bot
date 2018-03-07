// OTB_DefaultCommandSection React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';
import OTB_GeneralH1 from './OTB_GeneralH1';
import OTB_CommandActions from './OTB_CommandActions';
import OTB_CommandVariables from './OTB_CommandVariables';
import OTB_CommandDescription from './OTB_CommandDescription';
import OTB_CommandParameters from './OTB_CommandParameters';
import OTB_CommandScript from './OTB_CommandScript';
import OTB_ThinHR from './OTB_ThinHR';
import OTB_CommandFunctions from './OTB_CommandFunctions';

class OTB_DefaultCommandSection extends React.Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {
        user: null,
        defaultCommand: null,
        application: null
    };
    render() {
        var self = this;
        if (true) {
            return(
                <span className={"default-command-section " + 'cell auto-size padding20 page-panel panel-' + self.props.defaultCommand.id} style={self.props.style || {}} >
                    <OTB_GeneralH1 title={self.props.defaultCommand.get('name') + " (" + self.props.defaultCommand.get('handler') + ")"} />
                    <OTB_ThinHR />
                    <OTB_CommandActions user={self.props.user} command={self.props.defaultCommand} />
                    <OTB_ThinHR />
                    { (self.props.user && self.props.user.hasRole('administrator')) ? <OTB_CommandDescription command={self.props.defaultCommand} /> : <span /> }
                    <OTB_CommandVariables application={self.props.application} user={self.props.user} command={self.props.defaultCommand} />
                    <OTB_ThinHR />
                    <OTB_CommandParameters user={self.props.user} command={self.props.defaultCommand} />
                    <OTB_ThinHR />
                    <OTB_CommandFunctions application={self.props.application} user={self.props.user} command={self.props.defaultCommand} />
                    <OTB_CommandScript user={self.props.user} command={self.props.defaultCommand} />
                </span>
            );
        }
        else {
            return <span />;
        };
    };
    componentDidMount() {
        $('.default-command-section').hide();

    };
};

export default OTB_DefaultCommandSection;
