var TextField = React.createClass({
    render: function() { 
        return (
            <div className={this.props.className} style={this.props.style}><Input type="text" label={this.props.formField.field.label} name={this.props.formField.field.name} defaultValue={this.props.formField.field.value} autofocus={this.props.formField.getFocus} placeholder={this.props.formField.field.help} /></div>
        );
    }
});
var TextareaField = React.createClass({
    render: function() {
        return (
            <div className={this.props.className} style={this.props.style}><Input type="textarea" label={this.props.formField.field.label} name={this.props.formField.field.name} defaultValue={this.props.formField.field.value} autofocus={this.props.formField.getFocus} placeholder={this.props.formField.field.help} /></div>
        );
    }
});
var ImageField = React.createClass({
    render: function() {
        return (
            <div className={this.props.className} style={this.props.style}><ImageUpload name={this.props.formField.field.name} defaultValue={this.props.formField.field.value} /></div>
        );
    }
});
var ObjectFormField = React.createClass({
    mixins: [ReactFireMixin],
    getInitialState: function() {
        if (this.props.formField.field.groupInput) {
            return { valueObject: { value: '', comment: ''} };
        } else {
            return { valueObject: { value: this.props.formField.field.value, comment: ''} };
        }
        if (_.keys(this.props.formField.relation).length > 0) {
            return ({ options: [] });
        }
    },
    render: function() {
        var fieldClassName = 'col-md-' + this.props.formField.columns + ' col-md-offset-' + this.props.formField.offset;
        var style={};
        if (this.props.formField.newRow) {
            style={ clear: 'left' };
        }
        if (_.keys(this.props.formField.field).length) {
            switch( this.props.formField.field.type) {
                case 'text':
                    return (<div className={fieldClassName} style={style}><Input type="text" label={this.props.formField.field.label} name={this.props.formField.field.name} defaultValue={this.state.valueObject.value} autofocus={this.props.formField.getFocus} placeholder={this.props.formField.field.help} /></div>);
                case 'longtext':                
                    return (<div className={fieldClassName} style={style}><Input type="textarea" label={this.props.formField.field.label} name={this.props.formField.field.name} defaultValue={this.state.valueObject.value} autofocus={this.props.formField.getFocus} placeholder={this.props.formField.field.help} /></div>);
                case 'image':
                    return (<div className={fieldClassName} style={style}><ImageUpload name={this.props.formField.field.name} defaultValue={this.state.valueObject.value} /></div>);
                case 'number':
                    return (<div className={fieldClassName} style={style}><Input type="number" label={this.props.formField.field.label} name={this.props.formField.field.name} defaultValue={this.state.valueObject.value} autofocus={this.props.formField.getFocus} placeholder={this.props.formField.field.help} /></div>);
                case 'range':
                    if (this.props.formField.field.groupInput) {
                        var commentFieldName = this.props.formField.field.name + 'Comment';
                        return (
                            <span>
                                <div className={fieldClassName} style={style}>
                                    <Slider label={this.props.formField.field.label} name={this.props.formField.field.name} min={this.props.formField.min} max={this.props.formField.max} value={this.state.valueObject.value} />
                                    <Input type="textarea" label={"Toelichting"} name={commentFieldName} defaultValue={this.state.valueObject.comment} placeholder={"Geef hier een toelichting"} />
                                </div>
                            </span>
                        );
                    } else {
                        return (<div className={fieldClassName} style={style}><Slider label={this.props.formField.field.label} name={this.props.formField.field.name} min={this.props.formField.min} max={this.props.formField.max} value={this.state.valueObject.value}  /></div>);
                    }
                case 'dropdown': case 'select':
                    var leegTekst = "Selecteer een " + this.props.formField.field.label.toLowerCase();
                    return (
                        <div className={fieldClassName} style={style}>
                            <Input type="select" label={this.props.formField.field.label} name={this.props.formField.field.name} defaultValue={this.state.valueObject.value} autofocus={this.props.formField.getFocus} placeholder={this.props.formField.field.help} >
                                <option value="">{leegTekst}</option>
                                { this.props.formField.field.options.map(function(o) {
                                    return <option value={o.id}>{o.label}</option>;
                                })};
                            </Input>
                        </div>
                    );
                case 'multipleSelect':
                    var leegTekst = "Selecteer " + this.props.formField.field.label.toLowerCase();
                    return (
                        <div className={fieldClassName} style={style}>
                            <Input type="select" multiple label={this.props.formField.field.label} name={this.props.formField.field.name} defaultValue={this.state.valueObject.value} autofocus={this.props.formField.getFocus} placeholder={this.props.formField.field.help} >
                                { this.props.formField.field.options.map(function(o) {
                                    return <option value={o.id}>{o.label}</option>;
                                })};
                            </Input>
                        </div>
                    );
            }
        }
        if (_.keys(this.props.formField.relation).length > 0) {
            var leegTekst = "Selecteer een " + this.props.formField.relation.label.toLowerCase();
            if (this.props.formField.relation.cardinality === 'single') {
                return (
                    <div className={fieldClassName} style={style}>
                        <Input type="select" label={this.props.formField.relation.label} name={this.props.formField.relation.name} defaultValue={this.props.formField.relation.value} placeholder={this.props.formField.relation.help} >
                            <option value="">{leegTekst}</option>
                            { this.state.options.map(function(o) {
                                return <option value={o.id}>{o.get('name')}</option>;
                            })};
                        </Input>
                    </div>
                );
            }
            if (this.props.formField.relation.cardinality === 'multiple') {
                return (
                    <div className={fieldClassName} style={style}>
                        <Input type="select" label={this.props.formField.relation.label} name={this.props.formField.relation.name} defaultValue={this.props.formField.relation.value} placeholder={this.props.formField.relation.help} multiple>
                            <option value="">{leegTekst}</option>
                            { this.state.options.map(function(o) {
                                return <option value={o.id}>{o.get('name')}</option>;
                            })};
                        </Input>
                    </div>
                );
            }
        }
        return (<span />);
    },
    componentWillMount: function() {
        if (this.props.formField.field.groupInput) {
            this.bindAsObject(new Firebase(fbBase + 'groupInputs/' + this.props.object.id + '/' + this.props.formField.field.name + '/' + this.props.user.id), 'valueObject');
        }
        if (_.keys(this.props.formField.relation).length > 0) {
            this.bindAsArray(new Firebase(fbBase + 'details/' + this.props.project.id + '/' + this.props.formField.relation.entityType + '/'), 'options');
        }
    },
    componentDidUpdate: function() {
        if (this.props.formField.field.groupInput) {
            var commentFieldName = this.props.formField.field.name + 'Comment';
            $('[name="' + commentFieldName + '"').val(this.state.valueObject.comment);
        }
    }
});

var ObjectForm = React.createClass({
    onClose: function() {
        this.props.onClose();
    },
    onOk: function() {
        var self = this;
        var parentIdObject = {};
        if (self.props.object.details && !self.props.object.parentId && self.props.project) {
            parentIdObject = {parentId: self.props.project.id};
        }
        var object = _.extend(self.props.object, parentIdObject);
        var objectForm = object.forms[this.props.formKey];
        _.each(objectForm.formFields, function(formField) {
            if (_.keys(formField.field).length) {
                formField.field.value = $('.' + objectForm.name + ' [name="' + formField.field.name + '"]').val() || '';
                if (formField.field.groupInput) {
                    formField.field.comment = $('.' + objectForm.name + ' [name="' + formField.field.name + 'Comment"]').val() || '';
                }
            }
            if (_.keys(formField.relation).length) {
                formField.relation.value = $('.' + objectForm.name + ' [name="' + formField.field.name + '"]').val() || '';
            }
        });
        var errors = object.validate();
        if (!errors) {
            this.props.onClose();
            object.save(this.props.user);
        } else {
            
        }
    },
    onDelete: function() {
        var self = this;
        if (confirm(self.props.object.label + ' ' + self.props.object.fields.name.value + ' verwijderen akkoord?')) {  
            self.props.object.delete(this.props.user);
            self.props.onClose();
        }
    },
    render: function() {
        var self = this;
        if (self.props.object) {
            var objectForm = self.props.object.forms[self.props.formKey];
            var formFields = _.sortBy(objectForm.formFields, function(formField) { return formField.sequence; });
            var title = self.props.title || objectForm.label;
            return (
                <ModalForm show={self.props.show} showDeleteButton={objectForm.hasDeleteButton} title={title} onOk={self.onOk} onClose={self.onClose} onDelete={self.onDelete} >
                    <form className={objectForm.name}>
                        {formFields.map(function(formField) {
                            return (<ObjectFormField formField={formField} key={formField.field.name} project={self.props.project} user={self.props.user} object={self.props.object} />);
                        })}
                    </form>
                </ModalForm>
            );
        } else {
            return (
                <ModalForm show={self.props.show} >
                </ModalForm>
            );
        }
    }
});