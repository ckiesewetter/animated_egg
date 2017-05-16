var Modal = require('components/utility/Modal');
var CurrentUser = require('services/CurrentUser');
var AvatarPatch = require('components/avatars/AvatarPatch')

require('goldenegg/golden_egg.scss');

var GoldenEggModal = React.createClass({
    getInitialState: function (){
        return {
            eggOpen: false,
            awardType: null,
            awardDetails: null,
        }
    },

    show: function() {
        this.refs.modal.show();
    },

    hide: function() {
        this.refs.modal.hide();
    },

    handleOpen: function() {
        var params = { award: { type: "golden_egg", student_id: CurrentUser.get().id } };
        CurrentUser.api().postAwards(params, $wr.apiHandler (function(response) {
            setTimeout(function(){
                var responseData = response["response"]["award"];
                this.setState({ eggOpen: true, awardType: responseData["type"], awardPatchDetails: responseData["details"]["patch"], awardCoinsDetails: responseData["details"]["amount"] });
                this.props.onComplete();
                CurrentUser.fetchCurrentUserData();
            }.bind(this), 750);
        }.bind(this)));
    },

    render() {
        if (this.state.eggOpen){
            var eggImage = <img src={ require("goldenegg/egg-open-0.png") } className="goldenEggInsideModal" />;
            if (this.state.awardType == "coins") {
                var awardImage = <img src={ require('official-icons/coin.png') } className="awardsCoin" />
                var coinAmount = this.state.awardCoinsDetails
                var awardName = <p className="coinAmount">You just got { coinAmount } coins!</p>
            }
            else {
                var coinImage = <img src={ require('official-icons/coin-s.png') } className="awardsCoin" />
                var awardImagePath = "patches/" + this.state.awardPatchDetails["origin_patch_type"]
                + "/" + this.state.awardPatchDetails["name"] + "-s.png";
                var awardImage = <img src= { dynamicRequire(awardImagePath) } className="awardsPatch"/>
                var patchName = this.state.awardPatchDetails["title"]
                var patchDescription = this.state.awardPatchDetails["description"]
                var awardName = <p className="patchName">You just got a new patch:<br></br> { patchName }!</p>
            }
        } else {
            var eggImage = (
                <img src={ require("goldenegg/egg-0.png") } className="goldenEggInsideModal closed" />
            );
        }
        return (
            <Modal className="eggModal" ref="modal" headerText="Golden Egg" onShow={this.handleOpen}>
                <div className="data">
                    { awardName }
                    <p className="patchDescription">{ patchDescription }</p>
                    <p className="awardImage">{ awardImage }</p>
                    <div className="eggContainer">
                        { eggImage }
                    </div>
                </div>
            </Modal>
            )
    }
})

module.exports = GoldenEggModal;
