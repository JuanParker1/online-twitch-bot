// OTB_EditFunctionScript React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import React from 'react';
import * as _ from 'lodash';
var DomainAPI = require('../domain-entity/DomainAPI');

class OTB_EditFunctionScript extends React.Component {
   constructor(props) {
       super(props);
   };
   static defaultProps = {
           function: null
   };
   render() {
       var self = this;
return(
    <a className="button" onClick={self.updateScript}>Update Script</a>
);
   };
   updateScript = (e) => {
       var self = this;
var FunctionEntity = self.props.function;
var editor = ace.edit("editor-" + self.props.function.id);
var values = {'functionScript' : editor.getValue()};
FunctionEntity.setValues(values);
DomainAPI.OTB_FunctionUpdate(FunctionEntity, values, null, function(){
    console.log("editor-" + self.props.function.id);
    $.Notify({
        caption: 'Success',
        content: 'Updated Script',
        type: 'success'
    });
});
   };
   componentDidMount() {
       var self = this;
var editor = ace.edit('editor-' + self.props.function.id);
editor.commands.addCommand({
    name: 'save',
    bindKey: {win: "Ctrl-S", "mac": "Cmd-S"},
    exec: function(editor) {
        self.updateScript();
    }
})
   };
   componentWillUnmount() {
   };
}

export default OTB_EditFunctionScript;
