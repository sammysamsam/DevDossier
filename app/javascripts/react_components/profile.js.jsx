
var ProfileREACT = React.createClass({


	getInitialState: function() {
	console.log(this.props.profile.skills)
		let education = [];
		
		if(this.props.profile.education != null)
			education = JSON.parse(this.props.profile.education);

		return {
			editingSTATE: false,
			firstname:this.props.profile.first_name||"",
			lastname:this.props.profile.last_name||"",
			education:education,
			courses:this.props.profile.courses||"",
			location:this.props.profile.location||"",
			aboutme:this.props.profile.aboutme||""
		}
	},

//
	toggleEditState: function(){
		this.setState({editingSTATE:!this.state.editingSTATE})
	},

//

	renderEducationCourses: function(){
		var education = this.state.education
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
							var space = ""
							if(index > 0){
								space = " , "
							}
								return(
								<span  key = {index} className = "educationItem">
									{space+listValue[0]} <span className = "educationCaption">{listValue[1]+ " "+ listValue[2]}</span>
								</span>
								)

						})}	

				</div>

				<div className = "courseSection" style = {style2}>
					<i className="fa fa-book"></i> &nbsp;
					<span className = "courseItem">
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
						<UpdateProfileREACT profile = {this.props.profile} stage = "edit" toggle = {this.toggleEditState.bind(this)} />
					</div>
			)
		else
			return(<div></div>)
	},

	renderEditButton: function(){
		if(this.state.editingSTATE == true || this.props.editable == false)
			return(<div></div>)
		else return(
			<div onClick = {this.toggleEditState} id = "profileeditbutton">edit</div>
		)
	},


///


	render: function () {
		return (
			<div>
				<div className = "container">
					<div id = "generalInfoSection">
						<div className = "row">
							<div className = "two columns">&nbsp; </div>
							<div className = "eight columns">

								<h4 style = {{display:"inline"}}> 
									{this.state.firstname + " " + this.state.lastname} 
								</h4>  

								<p style = {{display:"inline",paddingLeft:"10px"}}> 
									<i className="fa fa-street-view"></i> {this.state.location}
								</p>  

								<h6 style = {{margin:"20spx 0px 5px 0px"}}>
									{this.state.aboutme}
								</h6>	

								{this.renderEducationCourses()}
								
							</div>
							<div style = {{float:"right"}}> 
								{this.renderEditButton()} 
							</div>		

						</div>
					</div>
				</div>
				{this.renderEditable()}
			</div>
		)
	}
});




