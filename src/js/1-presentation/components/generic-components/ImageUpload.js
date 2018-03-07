var React = require('react');
var _ = require('underscore');
var Input = require('react-bootstrap').Input;

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            defaultValue: '', 
            transformation: ''
        };
    },
    getInitialState: function() {
        $.cloudinary.config({ cloud_name: 'icstrategy', api_key: '411686915589974'});
        var timestamp = new Date().getTime();
        var publicId = this.props.name + '_' + timestamp;
        return {
            timestamp: timestamp,
            publicId: publicId,
            signature: Sha1.hash('callback=http://www.icstrategy.nl/cloudinary_cors.html&public_id=' + publicId + '&timestamp=' + timestamp + '&transformation=c_limit,f_png,h_1000,w_1000Fj-9TuU4bJVZME33xKCoUJJ8WsI')
        }; 
    },
    onImageNotFound: function(e) {
        $(e.currentTarget).hide();
    },
    render: function() {
        var src = 'https://res.cloudinary.com/icstrategy/image/upload/w_300,h_150,c_limit/' + this.props.defaultValue + '.png';
        return (
            <div className="imageUpload" >
                <Input type="hidden" name={this.props.name} defaultValue={this.props.defaultValue} /><br />
                <img imageId={this.state.publicId} src={src} onError={this.onImageNotFound} /><br />
                <Input name="file" type="file" className="cloudinary-fileupload btn btn-default" data-cloudinary-field="image_id" public-id={this.state.publicId} timestamp={this.state.timestamp} signature={this.state.signature} />
                <div className="progress" style={{height: '15px'}}>
                    <div className="progressBar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{width: '0%', height: '100%', display:'none' }} />
                </div>
            </div>
        );
    },
    componentDidMount: function() {
        var self = this;
        var $self = $(this.getDOMNode());
        var $fileUpload =  $self.find('.cloudinary-fileupload');
        var formData = {
            'public_id': this.state.publicId,
            'timestamp': this.state.timestamp,
            'callback': 'http://www.icstrategy.nl/cloudinary_cors.html',
            'signature': this.state.signature,
            'api_key': '411686915589974',
            'transformation': 'c_limit,f_png,h_1000,w_1000'
        };
      $fileUpload
        .cloudinary_fileupload({
            formData: formData,
            url: 'https://api.cloudinary.com/v1_1/icstrategy/image/upload' 
        })
        .bind('cloudinarydone', function(e, data) {
            $self.find('[name="' + self.props.name + '"]').val(self.state.publicId);
            $self.find('img')
                .css({'display': 'block'})
                .attr('src', 'https://res.cloudinary.com/icstrategy/image/upload/w_300,h_150,c_limit/' + self.state.publicId + '.png');
            $self.find('.progressBar').hide().css('width', '0%');
            return true;
        })
        .bind('fileuploadprogress', function(e, data) {
            $self.find('.progressBar').show().css('width', Math.round((data.loaded * 100.0) / data.total) + '%');
        });
    }
    
});