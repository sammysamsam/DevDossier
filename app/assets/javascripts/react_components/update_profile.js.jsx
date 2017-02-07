var UpdateProfileREACT = React.createClass({
	getInitialState: function() {
	console.log(this.props)
		return {
			firstname:this.props.profile.first_name||"",
			lastname:this.props.profile.last_name||"",
			education:this.props.profile.education||"",

			educationInput:["","",""],

			courses:this.props.profile.courses||"",
			location:this.props.profile.location||"",
			skills:this.props.profile.skills||"",

			aboutme:this.props.profile.aboutme||""
		}
	},

	updateFirstName: function(e_){
		this.setState({firstname:e_.target.value})
	},
	updateLastName: function(e_){
		this.setState({lastname:e_.target.value})
	},
	updateLocation: function(e_){
		this.setState({location:e_.target.value})
	},
	updateEducation: function(){
		var result = this.state.education;
		if(result == "")
			result = this.state.educationInput[0]+"--"+ this.state.educationInput[1]+" "+this.state.educationInput[2]
		else
			result = result + "||"+this.state.educationInput[0]+"--"+ this.state.educationInput[1]+" "+this.state.educationInput[2]

		this.setState({education:result})
	},
	updateSkills: function(e_){
		this.setState({skills:e_.target.value})
	},
	updateCourses: function(e_){
		this.setState({courses:e_.target.value})
	},
	updateAboutMe: function(e_){
		this.setState({aboutme:e_.target.value})
	},

//

	updateEducationInput1: function(e_){
		var input = this.state.educationInput
		input[0] = e_.target.value;
		this.setState({educationInput:input})
	},

	updateEducationInput2: function(e_){
		var input = this.state.educationInput
		input[1] = e_.target.value
		this.setState({educationInput:input})
	},

	updateEducationInput3: function(e_){
		var input = this.state.educationInput
		input[2] = e_.target.value
		this.setState({educationInput:input})
	},

	getEducation: function(){
			return this.state.education.split("||");
	},

	deleteEducation: function(index){
		var list = this.getEducation();
		list.splice(index,1);
		var result = list.toString()
		result = result.replace(/,/g , "");
		this.setState({education:result});
	},

//


	submitButtons: function(){
		ref = this.state

		var link = Routes.create_profile_path(
			{profile: 
				{first_name:ref.firstname, 
				last_name:ref.lastname,
				courses:ref.courses, 
				location:ref.location,
				education:ref.education,
				skills:ref.skills, 
				aboutme:ref.aboutme}
			}
		)

		if (this.props.stage == "edit")
		{
			link = Routes.edit_profile_path(this.props.profile.id,
				{profile: 
					{first_name:ref.firstname, 
					last_name:ref.lastname,
					courses:ref.courses, 
					location:ref.location,
					education:ref.education,
					skills:ref.skills, 
					aboutme:ref.aboutme}
				}
			)
			return(	
			<div>
				<button className="button" onClick = {this.props.toggle}> nevermind </button>&nbsp;
				<a className="button button-primary" href = {link}> submit </a>
			</div>
		)
		}

		return(	
			<div>
				<a className="button button-primary" href = {link}> Submit </a>
			</div>
		)
	},


//

	renderEducation: function(){
		var education = this.getEducation();
		if (education.length == 1 && education[0] == "" )
			return (<div></div>)
		var x = this;
		return(
				<table className="u-full-width">
				  <thead>
				    <tr>
				      <th>School + Year</th>
				      <th>Degree </th>
				      <th></th>
				    </tr>
				  </thead>
				  <tbody>

					{education.map(function(listValue,index){
						var info = listValue.split("--");
						return(
							    <tr key = {index}>
							      <td>{info[0]}</td>
							      <td>{info[1]}</td>
							      <td>	<p onClick = {() => x.deleteEducation(index)}>delete</p>	</td>
							    </tr>
						)
					})}	

				  </tbody>
				</table>
		)
	},

	render: function () {
		return (
			<div>
				<div className = "container ">

					<div className = "row" >
						<div className = "five columns">
      						<label for="first_name_input">First Name</label>
      						<input onChange = {this.updateFirstName} className = "u-full-width" placeholder={this.state.firstname} id="first_name_input"/>
      					</div>

						<div className = "five columns">
      						<label for="last_name_input">First Name</label>
      						<input onChange = {this.updateLastName} className = "u-full-width"  placeholder={this.state.lastname} id="last_name_input"/>
      					</div>

      					<div className = "two columns">
      						<label for="city_input">City</label>
      						<input onChange = {this.updateLocation} className = "u-full-width" placeholder={this.state.location} id="city_input"/>
      					</div>
					</div>

					<div className = "row">
					    <label for="about_me">About Me</label>
					    <textarea onChange = {this.updateAboutMe}  className = "u-full-width" placeholder={this.state.aboutme} id="about_me"></textarea>
				    </div>

				    <hr/>

					<div className = "row" >
				    	{this.renderEducation()}
				    </div>

					<div className = "row" >

						<div className = "six columns">				  
					  		<label for="education">Education (+ Year)</label>
					  		<input onChange = {this.updateEducationInput1}  className = "u-full-width" placeholder="Blue Mountain State '17 " id="education"/>
					  	</div>
						<div className = "three columns">				  
					  		<label for="education_major">Major </label>
					  		<input onChange = {this.updateEducationInput3}  className = "u-full-width" placeholder="..." id="education_major"/>
					  	</div>

					  	<div className = "three columns">
					  		<label for="education_degree">Degree</label>
						   <select onChange = {this.updateEducationInput2} className = "u-full-width" id = "education_degree">
	        					<option value=" "> "n/a" </option>
	        					<option value="BA">Bachelor of Arts</option>
	        					<option value="BS">Bachelor of Science</option>
	        					<option value="Master">Masters</option>
	        					<option value="PHD">PHD</option>
	      					</select>
      					</div>

      				</div>
      					<div onClick = {this.updateEducation}>Add</div>

					<div>
				    	<label for="courses_showcase">Courses Showcase </label>
				   		<textarea onChange = {this.updateCourses} className = "u-full-width" placeholder={this.state.courses} id="courses_showcase"></textarea>
				    </div>
				    {this.submitButtons()}
				</div>	
			</div>
		)
	}
});




