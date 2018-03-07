var React = require('react');

module.exports = React.createClass({
    getDefaultProps: function() {
        return { 
            title: '',
            text: '',
            icon: '',
            image: ''
        };
    }, 
    render: function() {
        var classString = "slide" + (this.props.active ? " active" : ""); 
        var captionClassString = "caption " + this.props.color;
        var iconClass = this.props.iconClass + ' icon'; 
        return (
            <div className={classString}> 
                { this.props.text ? <div className="text" dangerouslySetInnerHTML={{__html: this.props.text}}></div> : '' }  
                <div className={captionClassString}> 
                    <a className="link"> 
                        { this.props.icon ? <div className="title"> <i className={iconClass}></i></div> : '' }
                        { this.props.title ? <div className="caption-text twoline">{this.props.title}</div> : '' }
                        <i className="fa fa-chevron-left" onClick={this.props.onPrevious} style={{position: "absolute", left: "5px", top: "8px", zIndex: "1000", cursor: "pointer"}}></i>
                        <i className="fa fa-chevron-right" onClick={this.props.onNext} style={{position: "absolute", right: "5px", top: "8px", zIndex: "1000", cursor: "pointer"}}></i>
                    </a> 
                </div> 
                { this.props.image ? <img src={this.props.image} alt="" className="bgcover" style={{zIndex: "0"}} /> : '' }
            </div>
        );
    },
    componentDidMount: function() {
        var $slide = $(this.getDOMNode());
        var ratio = $('img', $slide).width() / $('img', $slide).height();

        if (($slide.width() / $slide.height()) < ratio) {
            $('img', $slide).removeClass('bgwidth').addClass('bgheight');
        }
        else {
            $('img', $slide).removeClass('bgheight').addClass('bgwidth');
        }

        var addClass = $slide.find('.slide img').last().attr('class');
        $('img', $slide).attr('class', ' ').addClass(addClass);
    }
});
