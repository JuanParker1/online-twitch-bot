var React = require('react');
var Slide = require('./Slide');

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            timeout: 5000
        };
    }, 
    onNext: function(e) {
        e.preventDefault();
        e.stopPropagation();
        var $tile = $(this.getDOMNode());
        $tile.tileshow({next: true});
    },
    onPrevious: function(e) {
        e.preventDefault();
        e.stopPropagation();
        var $tile = $(this.getDOMNode());
        $tile.tileshow({previous: true});
    },
    render: function() {
        var self = this;
        var classString = "tile imagetile tileshow w" + this.props.width + ' h' + this.props.height + ' ' + this.props.color;
        return (
            <div className={classString} data-timeout={this.props.timeout} >
                {this.props.slides.map(function(slide, index) {
                    return (<Slide key={index} title={slide.title} iconClass={slide.icon} text={slide.text} image={slide.image} color={self.props.color} active={slide.active} onPrevious={self.onPrevious} onNext={self.onNext} />);
                })}
            </div>
        );
    },
    componentDidMount: function() {
        var $tile = $(this.getDOMNode());
        $tile.tileshow({timeout: parseInt(this.props.timeout, 10)});
    }
});



$.fn.tileshow = function(options) {

    var settings = $.extend({
        speed: 1000,
        timeout: 3000,
        autoplay: true,
        pauseOnHover: true,
        mousewheel: false
    }, options);

    var $this = $(this);

    var $current, timer;

    var tiles = $('.slide', $this);

    var tileCount = tiles.length - 1;

        $.timer = function(func, time, autostart) {
            this.set = function(func, time, autostart) {
                this.init = true;
                if (typeof func == 'object') {
                    var paramList = ['autostart', 'time'];
                    for (var arg in paramList) {
                        if (func[paramList[arg]] != undefined) {
                            eval(paramList[arg] + " = func[paramList[arg]]");
                        }
                    }
                    ;
                    func = func.action;
                }
                if (typeof func == 'function') {
                    this.action = func;
                }
                if (!isNaN(time)) {
                    this.intervalTime = time;
                }
                if (autostart && !this.isActive) {
                    this.isActive = true;
                    this.setTimer();
                }
                return this;
            };
            this.play = function(reset) {
                if (!this.isActive) {
                    if (reset) {
                        this.setTimer();
                    } else {
                        this.setTimer(this.remaining);
                    }
                    this.isActive = true;
                }
                return this;
            };
            this.pause = function() {
                if (this.isActive) {
                    this.isActive = false;
                    this.remaining -= new Date() - this.last;
                    this.clearTimer();
                }
                return this;
            };
            this.stop = function() {
                this.isActive = false;
                this.remaining = this.intervalTime;
                this.clearTimer();
                return this;
            };
            this.toggle = function(reset) {
                if (this.isActive) {
                    this.pause();
                } else if (reset) {
                    this.play(true);
                } else {
                    this.play();
                }
                return this;
            };
            this.reset = function() {
                this.isActive = false;
                this.play(true);
                return this;
            };
            this.clearTimer = function() {
                window.clearTimeout(this.timeoutObject);
            };
            this.setTimer = function(time) {
                var timer = this;
                if (typeof this.action != 'function') {
                    return;
                }
                if (isNaN(time)) {
                    time = this.intervalTime;
                }
                this.remaining = time;
                this.last = new Date();
                this.clearTimer();
                this.timeoutObject = window.setTimeout(function() {
                    timer.go();
                }, time);
            };
            this.go = function() {
                if (this.isActive) {
                    this.action();
                    this.setTimer();
                }
            };

            if (this.init) {
                return new $.timer(func, time, autostart);
            } else {
                this.set(func, time, autostart);
                return this;
            }
        };

    function tile(index, speed) {
        var current = $current,
            s = speed || settings.speed;

        tiles.eq(current).removeClass('active').fadeOut(s);
        tiles.eq(index).addClass('active').fadeIn(s);

        $current = index;

        count = 0;
    }
    function next(speed) {
        if ($current < tileCount) {
            tile($current + 1, speed);
        } else {
            tile(0, speed);
        }
    }
    function previous(speed) {
        if ($current > 0) {
            tile($current - 1, speed);
        } else {
            tile(tileCount, speed);
        }
    }

    if (options.next) {
        $current = $('.active', $this).index();
        next(1);
        return;
    }
    if (options.previous) {
        $current = $('.active', $this).index();
        previous(1);
        return;
    }

    tiles.fadeOut(0);

    var first = $('.active', $this).index();

    if (first != undefined)
        tile(first);
    else
        tile(0);

    if (settings.autoplay == true) {
        var count = 0;
        timer = $.timer(function() {
            count++;
            if (count >= settings.timeout / 100) {
                next();
            }
        }, 100, true);

        if (settings.pauseOnHover == true) {
            $this.hover(function() {
                timer.pause();
            }, function() {
                timer.play();
            });
        }

    }

    if (options.next) {
        next();
        return;
    }
    if (options.previous) {
        previous();
        return;
    }

    // $this.bind('mousewheel', function(event, delta) {
    //     if (delta < 0) {
    //         if ($current < tileCount) {
    //             tile($current + 1);
    //         } else
    //             tile(0);
    //     }
    //     if (delta > 0){
    //         if($current > 0){
    //             tile($current - 1);
    //         }else
    //             tile(tileCount);
    //     }

    // });

    // $this.bind('click', function(e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     timer.pause();
    //     next();
    // });
    // $this.bind('dblclick', function(e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     timer.pause();
    //     previous();
    // });





};
