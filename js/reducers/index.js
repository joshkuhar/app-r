var actions = require('../actions/index');
var Data = require('../data');

var initialState = {
	restaurant: Data.locations.pizza,
	categories: "",
	data: Data,
	searchText: "",
    address: "",
    name: "",
    rating: "",
    phone: "",
    variety: ""

};

var locationReducer = function(state, action) {
	state = state || initialState;
	if (action.type === actions.SAVE_LOCATION) {
		return Object.assign({}, state, {
			searchText: action.searchText
		})
	}
	else if (action.type === actions.CHANGE_SEARCH) {
		return Object.assign({}, state, {
			searchText: action.text
		})
	}
	else if (action.type === actions.GET_CATEGORIES) {
		return {
			categories: action.categories,
			searchText: state.searchText
		}
	} 
	else if (action.type === actions.FETCH_SINGLE_LOCATION_SUCCESS) {
		return Object.assign({}, state, {
            address: action.address,
		    name: action.name,
		    rating: action.rating,
		    phone: action.phone,
		    variety: action.variety,
		    lat: action.lat,
		    lng: action.lng
		})
	}
	else if (action.type === actions.FETCH_SUCCESS) {
		if(!state.cachedLocation) {
			return {
				name: action.data.name,
				address: action.data.location.address,
				locationId: action.data.id,
				verified: action.data.verified,
				categories: state.categories,
				searchText: state.searchText,
				lat: action.data.location.lat,
				lng: action.data.location.lng,
				cachedLocation: action.id,
				secondOfferId: action.secondOfferId,
				data: action.data
			}
		}  else {
			return {
				firstLocation: state,
				name: action.data.name,
				address: action.data.location.address,
				locationId: action.data.id,
				verified: action.data.verified,
				categories: state.categories,
				searchText: state.searchText,
				lat: action.data.location.lat,
				lng: action.data.location.lng,
				cachedLocation: action.id,
				data: action.data
			}
		}
	}
	else if (action.type === actions.FETCH_CACHED_LOCATIONS) {
		return state.firstLocation
	}
	else if (action.type === actions.FETCH_LOCATION_SUCCESS) {
		return {
			name: action.name,
			address: action.address,
			rating: action.rating,
			categories: state.categories,
			searchText: state.searchText
		}
	}
	return state;
};

exports.locationReducer = locationReducer;


