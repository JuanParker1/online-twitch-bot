// OTB_ReactDefaultFunction React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';
import OTB_ShowPagePanel from './OTB_ShowPagePanel';

class OTB_ReactDefaultFunction extends React.Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {
        defaultFunction: null,
        application: null
    };
    render() {
        var self = this;
        if (true) {
            return(
                <li className={"react-default-function " + 'side-panel-toggle'} style={self.props.style || {}} >
                    <OTB_ShowPagePanel panelId={self.props.defaultFunction.get('id')} name={self.props.defaultFunction.get('name')} />
                </li>
            );
        }
        else {
            return <span />;
        };
    };
};

export default OTB_ReactDefaultFunction;
