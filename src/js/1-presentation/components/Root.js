var React = require('react');
var _ = require('underscore');
require('jquery-mousewheel')($);
var Background = require('./Background');
var Header = require('./Header');
var Content = require('./Content');
var DomainAPI = require('../../3-domain/DomainAPI');
var ModalForm = require('./ModalForm');

module.exports = React.createClass({ 
    getInitialState: function() {
        return { user: null };
    },
    render: function() {
        return (
            <span className='root'>
                <Background />
                <Header user={this.state.user} location={this.props.location} /> 
                <div className="content">
                    { this.props.children && this.props.children.content ? React.cloneElement(this.props.children.content, {user: this.state.user }) : <span />}
                </div>
                <div className="footer">
                    { this.props.children && this.props.children.footer ? React.cloneElement(this.props.children.footer, {user: this.state.user }) : <span />}
                </div>
                <ModalForm />
            </span>
        );  
    },
    componentDidMount: function() {
        DomainAPI.connectUser(this, 'user');
        if (!$('body').hasClass('vertical')) {
            $('body, html')
                .bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(event, delta, deltaX, deltaY) {
                    event.preventDefault();
                    $(this).scrollLeft($(this).scrollLeft() - deltaY); 
                }); 
    
        }
    },
    componentWillUnmount: function() { 
        DomainAPI.disconnectUser();
    }
});
