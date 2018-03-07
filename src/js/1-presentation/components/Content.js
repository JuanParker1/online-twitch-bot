var React = require('react'),
    Home = require('./Home');
    // ProjectPage = require('./ProjectPage'),
    // Projects = require('./Projects') ,
    // Templates = require('./Templates');
    
module.exports = React.createClass({
    render: function() {
        var Child;
        switch (this.props.route[0]) {
              case 'home':              Child = Home; break;
            //   case 'projects': 
            //   case 'my-projects':
            //   case 'mijn-projecten':
            //       if (this.props.route[1]) {
            //                             Child = ProjectPage; break; 
            //       } else {
            //                             Child = Projects; break; 
            //       }
            //   case 'templates':
            //       if (this.props.route[1]) {
            //                             Child = ProjectPage; break; 
            //       } else {
            //                             Child = Templates; break; 
            //       }
              default:                  Child = Home; break;
        }
        // var subRoute = this.props.route.slice(0);
        // subRoute.shift();
        return (
            <div className="content">
                <Child user={this.props.user} route={subRoute} />
            </div>
        );
    }
});

 