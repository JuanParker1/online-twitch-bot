var React = require('react');
var History = require('react-router').History;

module.exports = React.createClass({
    mixins: [ History ],
    onTitleClick: function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.props.href) {
            this.history.pushState(null, '/' + this.props.href);
            try {
                this.history.pushState(null, '/' + this.props.href);
            }
            catch (error) {
                window.location.href = '/' + this.props.href;
            }
        }
    },
    recalcWidth: function() {
        function minTop($section) {
            var $tiles = $section.find('.tile');
            if ($tiles.length > 0) {
                return $tiles.first().position().top;
            } else {
                return 0;
            }
        }
        function maxBottom($section) {
            var maxBottom = 0;
            $section.find('.tile').each(function() {
                var $tile = $(this);
                var bottom = $tile.position().top + $tile.outerHeight(true); 
                maxBottom = Math.max(maxBottom, bottom);
            });
            return maxBottom;
        }
        if (this.isMounted()) {
            var maxSectionHeight = $(window).height() - 125 - 125;
            var $section = $(this.getDOMNode());
            if ($section.is(':visible')) {
                $section.width(136);  
                var maxChildHeight = 0;
                var maxChildWidth = 0;
                $section.find('.tile').each(function() {
                    if ($(this).height() > maxChildHeight) { maxChildHeight = $(this).height(); }
                    if ($(this).width() > maxChildWidth) { maxChildWidth = $(this).width(); }
                });
                $section.width(Math.max(maxChildWidth + 20, $section.width()));
                var top = minTop($section);
                var hoogte = maxBottom($section) - top;
                while (maxChildHeight < hoogte && hoogte > maxSectionHeight) {
                    $section.width($section.width() + 136);
                    hoogte = maxBottom($section) - top;
                }
                var finalWidth = 0; 
                $('.section').each(function() {
                    finalWidth += $(this).outerWidth(true);
                });
                $('.content').width(finalWidth);
                var $viewport = $('meta[name=viewport]');
                $viewport.attr('content', 'width=' + finalWidth + ', height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'); 
            }
        }
    },
    render: function() {
        var classString = "section " + this.props.sectionClass;
        var name = this.props.name || '';
        var style = { width: 'auto', marginTop: '125px' };
        var headerStyle= this.props.href ? { cursor: 'pointer' } : {};
        return (
            <section className={classString} name={name} style={style} >
                <a name={name} /> 
                <h3 className="block-title" style={headerStyle} onClick={this.onTitleClick}>{this.props.title}</h3>
                {this.props.children}
            </section> 
        );
    },
    componentDidUpdate: function() {
        var self = this;
        var $section = $(this.getDOMNode());
        $section.css({'width': '0'});
        this.recalcWidth();
    },
    componentDidMount: function() {
        var self = this;
        var $section = $(this.getDOMNode());
        $section.css({'width': '0'});
        this.recalcWidth();

        var rtime = new Date(1, 1, 2000, 12, 0, 0);
        var timeout = false;
        var delta = 200;
        function resizeend() {
            'use strict'; 
            if (new Date() - rtime < delta) {
                setTimeout(resizeend, delta);
            } else {
                timeout = false;
                self.recalcWidth();
            }
        }
        
        $(window).resize(function() {
            'use strict';
            rtime = new Date();
            if (timeout === false) {
                timeout = true;
                setTimeout(resizeend, delta);
            }
        });
    }
}); 
 