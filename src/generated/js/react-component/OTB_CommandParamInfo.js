// OTB_CommandParamInfo React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';
import OTB_ButtonCommand from './OTB_ButtonCommand';

class OTB_CommandParamInfo extends React.Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {
        commandParameter: null
    };
    render() {
        var self = this;
        return(
            <tr>
                <td>{self.props.commandParameter.get('name')}</td>
                <td>{self.props.commandParameter.get('description')}</td>
                <td>{self.props.commandParameter.get('defaultValue')}</td>
                <td>{self.props.commandParameter.get('handler')} <OTB_ButtonCommand title={<span className="mif-pencil"></span>} onClick={self.CommandParameterUpdate} style={"button"} /></td>
            </tr>
        );
    };
    CommandParameterUpdate = () => {
        var Controller = require('../controller/OTB_CommandParameter');
        var self = this;
        Controller.Update({entity: self.props.commandParameter});
    };
};

export default OTB_CommandParamInfo;
