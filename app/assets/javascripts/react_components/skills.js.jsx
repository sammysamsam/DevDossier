
var SkillsREACT = React.createClass({

	getInitialState: function() {
		var skills = {skillsinfo: [] };
		if(this.props.profile.skills != null && this.props.profile.skills != "")
			skills = JSON.parse(this.props.profile.skills);

		return {
			editingSTATE: false,
			skills: skills,
		}
	},

//
	toggleEditState: function(){
		this.setState({editingSTATE:!this.state.editingSTATE})
	},

//

	renderEditable: function(){
		if(this.state.editingSTATE == true && this.props.editable == true)
			return(
				<div>
					<NewSkillsREACT profile = {this.props.profile} toggle = {this.toggleEditState.bind(this)}/>
				</div>
			)
		else
			return(<div></div>)
	},

	renderEditButton: function(){
		if(this.state.editingSTATE == true || this.props.editable == false)
			return(<div></div>)
		else return(
			<button onClick = {this.toggleEditState}>edit</button>
		)
	},


///


	render: function () {
		console.log(this.state.skills)
		return (
			<div>
				{this.renderEditButton()}
				{this.renderEditable()}
			</div>
		)
	}
});




