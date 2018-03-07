var React = require('react');

module.exports = React.createClass({
    render: function() {
        var self = this;
        return (
            <ul className="kendo-treeview">
                { this.props.items.map(function(item) {
                    return (<TreeViewItem item={item} key={item.id} onItemClick={self.props.onItemClick} />);
                })} 
            </ul>
        ); 
    },
    componentDidMount: function() {
        $(this.getDOMNode()).kendoTreeView(this.props.items);
    },
    componentWillReceiveProps: function(nextProps) {
        $(this.getDOMNode()).kendoTreeView(this.props.items);
    }
});

var TreeViewItem = React.createClass({
    onClick: function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.onItemClick(this.props.item.href);
    },
    render: function() {
        var self = this;
        return (
            <li className="kendo-treeview-item" data-expanded={this.props.item.expanded}> 
                <span onClick={this.onClick}>{this.props.item.text}</span>
                { this.props.item.items.length > 0 ? <SubTreeView items={this.props.item.items} onItemClick={self.props.onItemClick} /> : '' }
            </li>
        );
    }
});

var SubTreeView = React.createClass({
    render: function() {
        var self = this;
        return (
            <ul>
                { this.props.items.map(function(item) {
                    return (<TreeViewItem item={item} key={item.id} onItemClick={self.props.onItemClick} />);
                })}
            </ul>
        );
    }
});
