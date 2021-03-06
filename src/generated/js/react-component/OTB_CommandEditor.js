// OTB_CommandEditor React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';

class OTB_CommandEditor extends React.Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {
        command: null
    };
    render() {
        var self = this;
        return(
            <div>
                <br />
                <pre id={"editor-" + self.props.command.id} className="editor" style={{borderRadius: 0}}>{self.props.command.get('commandScript')}</pre>
            </div>
        );
    };
    shouldComponentUpdate() {
        return false;
    };
};

export default OTB_CommandEditor;
