// OTB_EditCommandScript React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';

class OTB_EditCommandScript extends React.Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {
        command: null
    };
    render() {
        var self = this;
        return(
            <a className="button" onClick={self.updateScript}>Update Script</a>
        );
    };
    componentDidMount() {
        var self = this;
        var editor = ace.edit('editor-' + self.props.command.id);
        editor.commands.addCommand({
            name: 'save',
            bindKey: {win: "Ctrl-S", "mac": "Cmd-S"},
            exec: function(editor) {
                self.updateScript();
            }
        })
    };
    updateScript = (e) => {
        var self = this;
        var CommandEntity = self.props.command;
        var editor = ace.edit("editor-" + self.props.command.id);
        var values = {'commandScript' : editor.getValue()};
        CommandEntity.setValues(values);
        DomainAPI.OTB_CommandUpdate(CommandEntity, values, null, function(){
            $.Notify({
                caption: 'Success',
                content: 'Updated Script',
                type: 'success'
            });
        });
    };
};

export default OTB_EditCommandScript;
