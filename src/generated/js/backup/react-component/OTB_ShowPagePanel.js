// OTB_ShowPagePanel React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import React from 'react';
import * as _ from 'lodash';
var DomainAPI = require('../domain-entity/DomainAPI');

class OTB_ShowPagePanel extends React.Component {
   constructor(props) {
       super(props);
   };
   static defaultProps = {
           name: '',
           panelId: ''
   };
   render() {
       var self = this;
return(
    <a href="#" onClick={self.onClick}>{self.props.name}</a>
);
   };
   onClick = (e) => {
       var self = this;
var parent = $(e.target).parent();
$('.page-panel').hide();
if(!$(e.target).parent().hasClass("active"))
    $('.panel-' + self.props.panelId).show();
var editor;
if($('#editor-' + self.props.panelId).length){
    editor = ace.edit("editor-" + self.props.panelId);
    editor.setTheme("ace/theme/cobalt");
    editor.getSession().setMode("ace/mode/javascript");
}
$('.side-panel-toggle').each(function(){
    var $this = $(this);
    if(!$this.is(parent))
        $this.removeClass("active");
});
$(e.target).parent().toggleClass("active");

   };
   componentDidMount() {
   };
   componentWillUnmount() {
   };
}

export default OTB_ShowPagePanel;
