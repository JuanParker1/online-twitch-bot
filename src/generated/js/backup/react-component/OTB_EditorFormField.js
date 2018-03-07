// OTB_EditorFormField React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import React from 'react';
import * as _ from 'lodash';
var DomainAPI = require('../domain-entity/DomainAPI');

class OTB_EditorFormField extends React.Component {
   constructor(props) {
       super(props);
   };
   static defaultProps = {

   };
   render() {
       var self = this;
if (self.props.field.isInput) {
    return (
        <ReactBootstrap.Input type="textarea" label={self.props.field.attribute.label} name={self.props.field.attribute.name} defaultValue={self.props.field.value} autofocus={self.props.field.getFocus} placeholder={self.props.field.attribute.help} />
    );
} else {
    return (
        <div className="form-group">
            <label className="control-label" style={{width: '100%'}}>{self.props.field.attribute.label}</label>
            <div style={{width: '100%'}} dangerouslySetInnerHTML={{__html: self.props.field.value }} ></div>
        </div>
    );
}

   };
   componentDidMount() {
       var self = this;
var $component = $(ReactDOM.findDOMNode(self));
var $textarea = $component.find('textarea');
$textarea.redactor({
});
   };
   componentWillUnmount() {
   };
}

export default OTB_EditorFormField;