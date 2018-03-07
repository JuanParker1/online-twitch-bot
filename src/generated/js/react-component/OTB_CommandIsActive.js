// OTB_CommandIsActive React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';

class OTB_CommandIsActive extends React.Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {
        command: null,
        user: null
    };
    render() {
        var self = this;
        return(
            <label className="input-control checkbox ">
                {function(){
                    if(self.props.command.get('enabled') != null){
                        if(self.props.command.get('enabled'))
                            return(<input type="checkbox" id={"active-" + self.props.command.id} defaultChecked />);
                        else
                            return(<input type="checkbox" id={"active-" + self.props.command.id} />);
                    }
                    else{
                        var defaultCommands = [];
                        _.each(self.props.user.get('activeDefaultCommands'), function(defaultCommand){
                            defaultCommands.push(defaultCommand.id);
                        })
                        if(defaultCommands.indexOf(self.props.command.id) > -1)
                            return(<input type="checkbox" id={"active-" + self.props.command.id} defaultChecked />);
                        else
                            return(<input type="checkbox" id={"active-" + self.props.command.id} />);
                    }
                }()}
                <span className="check"></span>
                <span className="caption">Activate Command</span>
            </label>
        );
    };
};

export default OTB_CommandIsActive;
