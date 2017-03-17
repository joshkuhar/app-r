var React = require('react');
var store = require('../store');
var connect = require('react-redux').connect;
var router = require('react-router');
var hashHistory = router.hashHistory;
var Link = router.Link;
var Button = require('./button');
var actions = require('../actions/index');
var Categories = require('../actions/categories');
var ReactDOM = require('react-dom');


var SearchContainer = React.createClass({
	componentDidMount: function() {
		if (this.props.chose) {
			this.props.dispatch(actions.resetAll());
		}
	},
	handleSearchChange: function(event) {
		this.props.dispatch(actions.changeSearch(event.target.value));
	},
	onClick: function(event) {
		event.preventDefault();
		this.props.dispatch(actions.saveLocation(this.props.searchText));
		hashHistory.push('/locations/play');
	},
	// onSubmit: function(event) {
	// 	event.preventDefault();
	// 	this.props.dispatch(actions.saveLocation(this.props.searchText));
	// 	hashHistory.push('/locations/play');
	// },
	render: function() {
		return (
			<div className="search-container">
				<div className="short-instructions">Enter an area you want to search, such as Philadelphia, and then click "Search". </div>
				  <form className="search-box" id="search-form">
					<input type="text" placeholder="Search Near" value={this.props.searchText} onChange={this.handleSearchChange} />
	           	 	<button type="submit" form="search-form" className="search-locations" onClick={this.onClick}>
	                	Search
	            	</button>
	              </form>
			</div>
		)
	}
});

var mapStateToProps = function(state, props) {
    return {
		searchText: state.searchText,
		chose: state.chose
    };
};

var Container = connect(mapStateToProps)(SearchContainer);

module.exports = Container;
