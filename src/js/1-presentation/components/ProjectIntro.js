var React = require('react');
var Section = require('./metro-components/Section');
var TileShow = require('./metro-components/TileShow'); 
var ProjectEditTile = require('./ProjectEditTile'); 

module.exports = React.createClass({
    render: function() {
        var color = 'blue';
        switch(this.props.project.type) {
            case 'Project': color = 'blue'; break;
            case 'TemplateProject': color = 'red';break;
            case 'ExampleProject': color = 'orange';break;
        } 
        return (
            <Section sectionClass="projectIntro" title={this.props.project.get('name')} > 
                <TileShow 
                    color={color}
                    width = "4"
                    height = "3"
                    timeout = "7000"
                    slides = {
                        [{
                            title: "IC STRATEGY maakt strategie zichtbaar!",
                            icon: "fa fa-eye fa-2x",
                            image: "/img/slideshow/business-strategy-achtergrond.jpg",
                            active: true
                        }, { 
                            title: "Een grote en groeiende verzameling management tools",
                            icon: "fa fa-wrench fa-2x",
                            image: "/img/slideshow/business-strategy-2.jpg"
                        }, {
                            title: "Complexe tools en theorieën eenvoudig toepasbaar gemaakt",
                            icon: "fa fa-lightbulb-o fa-2x",
                            image: "/img/slideshow/complexe-machine.jpg"
                        }, {
                            title: "De beste ideeën ontwikkelen",
                            icon: "fa fa-graduation-cap fa-2x",
                            image: "/img/slideshow/best-idea.jpg"
                        }, {
                            title: "Slimme tactieken bedenken",
                            icon: "fa fa-code-fork fa-2x",
                            image: "/img/slideshow/voetbal-tactiek-1.jpg"
                        }, {
                            title: "Samen met je teamleden, collega\s en business partners, waar ook ter wereld",
                            logo: "fa fa-users fa-2x",
                            image: "/img/slideshow/netwerk-samenwerking.jpg"
                        }]
                    }
                /> 
                { this.props.user && this.props.project.get('owner').id === this.props.user.id ? <ProjectEditTile project={this.props.project} /> : <span /> }
            </Section> 
        );
    } 
});