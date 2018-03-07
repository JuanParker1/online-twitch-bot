var React = require('react');
var Firebase = require('firebase');
var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;
var Input = require('react-bootstrap').Input;
var DomainAPI = require('../../3-domain/DomainAPI');

var fbBase = 'https://ics-r.firebaseio.com/';
var fb = new Firebase(fbBase); 

module.exports = React.createClass({

  getInitialState: function() {
    return { showModal: false };
  },

  close: function() {
    this.setState({ showModal: false });
  },
  
  ok: function() {
    var self = this;
    var email = $('.signOnForm .email').val();    
    var password = $('.signOnForm .password').val();
    var displayName = $('.signOnForm .displayName').val();
    DomainAPI.signOn({email: email, password: password, displayName: displayName});
  },

  open: function() {
    this.setState({ showModal: true });
    setTimeout(function() {$('.signOnForm .email').focus(); }, 100);
  },

  render: function() {
    return (
      <div className="signOnButton" >
        <Button bsStyle="default" onClick={this.open} >Inschrijven</Button>

        <Modal className="signOnForm" show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Schrijf je in</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input type="text" label="Email" className="email" autofocus="autofocus" placeholder="Vul hier je email adres in" />
            <Input type="text" label="Naam" className="displayName" placeholder="Vul hier je naam in" />
            <Input type="password" label="Wachtwoord" className="password" placeholder="Vul hier je wachtwoord in" /> 
            <Input type="password" label="Wachtwoord controle" className="password-verification" placeholder="Vul hier voor de zekerheid nog een keer je wachtwoord in" /> 
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Terug</Button>
            <Button bsStyle="primary" onClick={this.ok}>Akkoord</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}); 
