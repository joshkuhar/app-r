var React = require('react');
var store = require('../store');
var connect = require('react-redux').connect;
var actions = require('../actions/index');
var Button = require('./button');
var CategoryNames = require('./category-names-list');
var Categories = require('../actions/categories');

var CategoryList = React.createClass({
	onClick: function() {
		var randomCategories = Object.keys(Categories).map(function(category, index){
			return Categories[category][Math.floor((Math.random() * Categories[category].length-1) + 1)]
			});
		this.props.dispatch(actions.getCategories(randomCategories));
	},
	onDidSelect: function (){
		console.log("I'm one");
	},
	render: function() {

		return(
				<div className='category-list'>
					<div>
						<div className='shuffle-button'>
							<Button name="Shuffle" onClick={this.onClick} />
						</div>	
						<CategoryNames categoryList={this.props.categories} onClick={this.onDidSelect} />
					</div>
				</div>
			)
	}
});

var mapStateToProps = function(state, props) {
    return {

        categories: state.categories
    };
};

var Container = connect(mapStateToProps)(CategoryList);

module.exports = Container;
	