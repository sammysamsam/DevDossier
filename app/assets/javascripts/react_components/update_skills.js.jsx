
var UpdateSkillsREACT = React.createClass({
	getInitialState: function() {
		console.log(this.props)
		return {
			editingSTATE: false,
			project: this.props.profile,
			skills:this.props.profile.skills||""
		}
	},

//
	toggleEditState: function(){
		this.setState({editingSTATE:!this.state.editingSTATE})
	},

//

//
	renderEditable: function(){
		if(this.state.editingSTATE == true && this.props.editable == true)
			return(
					<div>
						<UpdateSkillsREACT profile = {this.props.profile} stage = "edit"/>
					</div>
			)
		else
			return(<div></div>)
	},

	renderEditButton: function(){
		if(this.state.editingSTATE == true || this.props.editable == false)
			return(<div></div>)
		else return(
			<p onClick = {this.toggleEditState}>edit</p>
		)
	},


///


	render: function () {
		return (
			<div>
				<div className = "container">
					<div className = "row" >

				</div>

				{this.renderEditable()}
			</div>
		)
	}
});




