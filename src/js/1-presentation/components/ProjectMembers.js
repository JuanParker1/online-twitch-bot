var React = require('react');
var Section = require('./metro-components/Section');
var ProjectMemberInsertTile = require('./ProjectMemberInsertTile'); 

module.exports = React.createClass({
    render: function() {
        var self = this
        return (
            <Section sectionClass="projectMembers" title={'Deelnemers'} > 
            </Section> 
        );
    } 
});