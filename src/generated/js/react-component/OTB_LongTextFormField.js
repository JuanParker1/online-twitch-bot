// OTB_LongTextFormField React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';

class OTB_LongTextFormField extends React.Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {
        field: null
    };
    render() {
        var self = this;
                if (self.props.field.isInput) {
                    return (
                        <div className="cell">
                            <label>{self.props.field.attribute.label}</label>
                            <br/>
                            <div className="input-control textarea" data-role="input" data-text-auto-resize="true">
                                <textarea name={self.props.field.attribute.name} defaultValue={self.props.field.value}
                                          autoFocus={self.props.field.getFocus}
                                          placeholder={self.props.field.attribute.help}></textarea>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div className="form-group">
                            <label className="control-label" style={{width: '100%'}}>{self.props.field.attribute.label}</label>
                            <div style={{width: '100%'}}>{self.props.field.value}</div>
                        </div>
                    );
                }
    };
};

export default OTB_LongTextFormField;
