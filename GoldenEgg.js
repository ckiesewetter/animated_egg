var GoldenEggModal = require('components/goldenegg/GoldenEggModal');


require('goldenegg/golden_egg.scss');

var GoldenEgg = React.createClass({
	getInitialState: function(){
		return {
			mainEggVisible: true
		}
	},
	onClick: function(e) {
		e.preventDefault();
		this.refs.modal.show();
		Mycroft.newEvent({ category: "GoldenEgg", action: "open-egg" });
	},
	hideEgg: function() {
		this.setState({ mainEggVisible: false })
	},

	render() {
		if (this.state.mainEggVisible) {
			var eggImage= (
				<a href="#">
					<img src={ require('goldenegg/egg-0.png')} className="goldenEggOutofModal" onClick={ this.onClick } />
				</a>
			)
		}

		return(

            <div className="eggs">
				{ eggImage }
				<GoldenEggModal ref="modal" onComplete={ this.hideEgg }/>
			</div>

		)
 	}
})


module.exports = GoldenEgg;
