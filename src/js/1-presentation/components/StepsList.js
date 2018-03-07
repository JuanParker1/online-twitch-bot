var React = require('react');
var _ = require('underscore');
var TileHtml = require('./metro-components/TileHtml');
var TreeView = require('./kendo-components/TreeView');
var Section = require('./metro-components/Section');
var StepInsertTile = require('./StepInsertTile');

module.exports = React.createClass({
    onItemClick: function(href) {
        if ($(href).length > 0) {
            var marginLeft = parseInt($('.section').first().css('margin-left').replace('px',''), 10); 
            var scrollPosition = $(href).offset().left - marginLeft;
            $('body').animate({scrollLeft: Math.max(0, scrollPosition)}, 500, 'swing');
        } 
    },
    render: function() {
        var self = this;
        var toolsTree = this.props.project.getToolsTree();
        return ( 
            <Section sectionClass="tools" title="Stappen">
                <TileHtml width="3" height="3" color="yellow">
                    <TreeView items={toolsTree} onItemClick={this.onItemClick} />
                </TileHtml>
                { (self.props.user && this.props.user.id === self.props.project.get('owner').id ) ? <StepInsertTile project={self.props.project} user={self.props.user} /> : ''}
            </Section>
        );
    }
});