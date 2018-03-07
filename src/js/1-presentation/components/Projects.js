var React = require('react');
var _ = require('underscore');
var Section = require('./metro-components/Section');
var ProjectTile = require('./ProjectTile');


module.exports = React.createClass({
    render: function() {
        var self = this;
        var href = '';
        if (this.props.isLink) { href="projects" }
        return ( 
            <Section sectionClass="projects" title="Mijn projecten" href={href} > 
                {this.props.projects.map(function(item, index) {
                    return (<ProjectTile key={item.id} index={index} project={item} user={self.props.user} />);
                })}; 
            </Section> 
        ); 
    }
});

