var React = require('react');
var _ = require('underscore');
var HomeIntro = require('./HomeIntro');
var Projects = require('./Projects');
var Templates = require('./Templates');

module.exports = React.createClass({
    render: function() {
        var userProjects = [];
        if (this.props.user) {
            userProjects = _.filter(this.props.user.get('projects'), function(project) { return project.type === 'UserProject'; });
        }
        return ( 
            <span className="home">
                <HomeIntro />
                { (userProjects.length > 0) ? <Projects user={this.props.user} projects={userProjects} isLink={true} /> : <span /> }
                <Templates user={this.props.user}  isLink={true} /> 
            </span> 
        );
    }
});
