// OTB_CustomCommand React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';
import OTB_ShowPagePanel from './OTB_ShowPagePanel';

class OTB_CustomCommand extends React.Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {
        userCommand: null,
        user: null
    };
    render() {
        var self = this;
        if (true) {
            return(
                <li className={"custom-command " + 'side-panel-toggle'} style={self.props.style || {}} >
                    <OTB_ShowPagePanel panelId={self.props.userCommand.get('id')} name={self.props.userCommand.get('name')} />
                </li>
            );
        }
        else {
            return <span />;
        };
    };
};

export default OTB_CustomCommand;
