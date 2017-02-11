
var UpdateSkillsREACT = React.createClass({

	getInitialState: function() {
		console.log(this.props.profile)
			console.log(this.props.editable)
		var skills = {skillsinfo: [] };
		if(this.props.profile.skills != null && this.props.profile.skills != "")
			skills = JSON.parse(this.props.profile.skills);

		var currentState = "";

		if(this.props.currState != null && this.props.currState == "edit skill")
			currentState = "edit";
		return {
			component_opened: currentState,
			skills: skills,
		}
	},

//

	toggleCloseState: function(){
		this.setState({component_opened:""})
	},
	toggleEditState: function(){
		this.setState({component_opened:"edit"})
	},
	toggleAddState: function(){
		this.setState({component_opened:"add"})
	},
//

	renderEditable: function(){

		if(this.props.editable && this.state.component_opened == "add")
			return <NewSkillsREACT profile = {this.props.profile} toggle = {this.toggleCloseState}/> 
		if(this.props.editable && this.state.component_opened == "edit")
			return	<EditSkillsREACT profile = {this.props.profile} toggle = {this.toggleCloseState}/>
		else
			return(<div></div>)
	},

	renderEditButton: function(){
		if( this.props.editable && this.state.component_opened == 'add')
			return (
			<div className = "row edit_addSkillsButtonContainer ">
				<div className = "five columns"> &emsp;</div>

				<div className = "three columns">
					<button className = "edit_addSkillsButton " onClick = {this.toggleEditState}> TO GO EDIT SKILLS</button>
				</div>
			</div>
			)

		if( this.props.editable && this.state.component_opened == 'edit')
			return (
			<div className = "row edit_addSkillsButtonContainer ">
				<div className = "five columns"> &emsp;</div>

				<div className = "three columns">
					<button className = "edit_addSkillsButton " onClick = {this.toggleAddState}>GO TO ADD SKILLS</button>
				</div>

			</div>
				)

		if(this.state.component_opened == '' && this.props.editable )
			return (
			<div className = "row edit_addSkillsButtonContainer ">
				<div className = "three columns"> &emsp;</div>

				<div className = "three columns">
					<button className = "edit_addSkillsButton " onClick = {this.toggleEditState}>EDIT SKILLS</button>
				</div>
				<div className = "three columns">
					<button className = "edit_addSkillsButton " onClick = {this.toggleAddState}>ADD SKILLS</button>
				</div>

			</div>
			)
		else
			return(<div></div>)
	},


///



	render: function () {
		return (
			<div>
				<div className = "container">
					{this.renderEditButton()}
				</div>
				{this.renderEditable()}
			</div>
		)
	}
});




