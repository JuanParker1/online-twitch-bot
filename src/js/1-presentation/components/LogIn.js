var React = require('react');
var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;
var Input = require('react-bootstrap').Input;
var DomainAPI = require('../../3-domain/DomainAPI');

module.exports = React.createClass({ 

  getInitialState: function() {
    return { showModal: false }; 
  },

  close: function() {
    this.setState({ showModal: false });
  },
  
  forgotten: function() {
      
  },
  ok: function() {
    var self = this;
    var email = $('.logInForm .email').val();    
    var password = $('.logInForm .password').val();
    DomainAPI.logIn({email: email, password: password});
  },

  open: function() {
    this.setState({ showModal: true });
    setTimeout(function() {$('.logInForm .email').focus(); }, 100);
  },

  render: function() {
    return (
      <div className="logInButton" >
        <Button bsStyle="primary" onClick={this.open} >Aanmelden</Button>

        <Modal className="logInForm" show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Meld je aan</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input type="text" label="Email" className="email" autofocus="autofocus" placeholder="Vul hier je email adres in" />
            <Input type="password" label="Wachtwoord" className="password" placeholder="Vul hier je wachtwoord in" />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.forgotten}>Wachtwoord vergeten</Button>
            <Button onClick={this.close}>Terug</Button>
            <Button bsStyle="primary" onClick={this.ok}>Akkoord</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});
