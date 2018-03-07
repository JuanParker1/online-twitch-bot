// Association

import * as _ from 'lodash';
    
export class Association {
    constructor(){
        this.name = '';
        this.thisName = '';
        this.thisIsComposite = false;
        this.thisCardinality = 'single';
        this.thisIsMandatory = false;
        this.thisIsNavigable = true;
        this.thatName = '';
        this.thisEntity = null;
        this.thatEntity = null;
        this.thatIsComposite = false;
        this.thatCardinality = 'multiple';
        this.thatIsMandatory = false;
        this.thatIsNavigable = true;
        this.persistentValue = null;
        this.value = null;
        if (!this.value) {
            if (this.thatCardinality === 'single') {
                this.value = {};
            } else {
                this.value = [];
            }
        }
        if (!this.persistentValue) {
            if (this.thatCardinality === 'single') {
                this.persistentValue = {};
            } else {
                this.persistentValue = [];
            }
        }
    };
    resetPersistentValue() {
        if (this.thatCardinality === 'single') {
            this.persistentValue = {};
        } else {
            this.persistentValue = [];
        }
    };
    removedValues() {
        var self = this;
        var removed = [];
        if (this.thatCardinality === 'single') {
            if ((this.persistentValue && this.persistentValue.id) && (!this.value || !this.value.id || this.value.id !== this.persistentValue.id)) {
                removed = [this.persistentValue];
            } else {
                removed = [];
            }
        } else {
            if (this.persistentValue && this.persistentValue.length > 0) {
                removed = _.filter(this.persistentValue, function(persistentValueItem) { return !_.find(self.value, function(valueItem) { return valueItem.id === persistentValueItem.id; })});
            } else {
                removed = [];
            }
        }
        return removed;
    };
    changedValues() {
        var changed = [];
        if (this.thisIsComposite) {
            if (this.thatCardinality === 'single') {
                if (_.keys(this.value).length > 0) {
                    if (this.value.hasChanged()) {
                        changed = [this.value];
                    }
                }
            } else {
                changed = _.filter(this.value, function(item) {
                    return item.hasChanged();
                });
            }
        }
        return changed;
    };
    newValues() {
        var self = this;
        var added = [];
        if (this.thatCardinality === 'single') {
            if ((this.value && this.value.id) && (!this.persistentValue || !this.persistentValue.id || this.persistentValue.id !== this.value.id)) {
                added = [this.value];
            } else {
                added = [];
            }
        } else {
            if (this.value && this.value.length > 0) {
                added = _.filter(this.value, function(valueItem) { return !_.find(self.persistentValue, function(persistentValueItem) { return valueItem.id === persistentValueItem.id; })});
            } else {
                added = [];
            }
        }
        return added;
    };
    hasChanged() {
        return this.removedValues().length > 0 || this.changedValues().length > 0 || this.newValues().length > 0;
    };
    getDuplicate() {
        if (this.thatCardinality === 'single') {
            return this.value.id ? this.value.getDuplicate() : this.value;
        } else {
            return _.map(this.value, function(value) { return value.id ? value.getDuplicate() : value; });
        }
    };
}