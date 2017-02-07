
var SkillsREACT = React.createClass({
	getInitialState: function() {
		console.log(this.props)
		return {
			editingSTATE: false,

			project: this.props.profile,
			
			skills:this.props.profile.skills||"",

		}
	},

//
	toggleEditState: function(){
		this.setState({editingSTATE:!this.state.editingSTATE})
	},

//

	getEducation: function(){
		return this.state.education.split("||");
	},

	renderEducationCourses: function(){
		var education = this.getEducation();
		var courses = this.state.courses;

		var style1 = {};
		var style2 = {};

		if(education.length == 0)
			style1 = {display:"none"}
		if(courses == "")
			style2 = {display:"none"}

		return (
			<div>
				<div className = "educationSection" style = {style1}>
					<i className="fa fa-university"></i> &nbsp;
						{education.map(function(listValue,index){
							var info = listValue.split("--");
							return(
							<span  key = {index} className = "educationItem">
								{info[0]} <span className = "educationCaption">{info[1]}</span>
							</span>
							)
						})}	
				</div>

				<div className = "courseSection" style = {style2}>
					<i className="fa fa-book"></i> &nbsp;
					<span className = "coursesItem">
						{courses}
					</span>	
				</div>	
			</div>
		)
	},

//
	renderEditable: function(){
		if(this.state.editingSTATE == true && this.props.editable == true)
			return(
					<div>
						<UpdateProfileREACT profile = {this.props.profile} stage = "edit"/>
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
					<div className = "row generalInfoSection" >
						<div className = "two columns">&nbsp; </div>
						<div className = "nine columns">

							<h4 style = {{display:"inline"}}> {this.state.firstname + " " + this.state.lastname} </h4>  
							<p style = {{display:"inline"}}> <i className="fa fa-street-view"></i> {this.state.location}</p>   	
							
							<div className = "aboutMeSection">
								{this.state.aboutme}
							</div>	

							{this.renderEducationCourses()}
						</div>
						<div className = "one column"> {this.renderEditButton()} </div>		
					</div>

				</div>

				{this.renderEditable()}
			</div>
		)
	}
});




