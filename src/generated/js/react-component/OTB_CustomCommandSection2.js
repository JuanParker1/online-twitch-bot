// OTB_CustomCommandSection2 React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';

class OTB_CustomCommandSection2 extends React.Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {
        user: null,
        userCommand: null,
        application: null
    };
    render() {
        var self = this;
        if (true) {
            return(
                <span className={"custom-command-section2 " + 'cell auto-size padding20 page-panel panel-' + self.props.userCommand.id} style={self.props.style || {}} >
                </span>
            );
        }
        else {
            return <span />;
        };
    };
    componentDidMount() {
        $('.custom-command-section').hide();

    };
};

export default OTB_CustomCommandSection2;