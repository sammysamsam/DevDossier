var UpdateProfileREACT = React.createClass({
	getInitialState: function() {

		//parse education
		console.log(this.props);
		let education = {educationinfo:[]};
		if(this.props.profile.education != null)
			education = JSON.parse(this.props.profile.education);
		return {
			firstname:this.props.profile.first_name||"",
			lastname:this.props.profile.last_name||"",
			education:education,

			courses:this.props.profile.courses||"",
			location:this.props.profile.location||"",
			
			skills:this.props.profile.skills,
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
//	["NYU--BA--chemistry || NYU--BA--chemistry"]
//


	updateEducationInput1: function(index,e_){
		var ed = this.state.education.educationinfo;
		ed[index][0] = e_.target.value;
		this.setState({education:{educationinfo:ed}})		
	},
	updateEducationInput2: function(index,e_){
		var ed = this.state.education.educationinfo;
		ed[index][1] = e_.target.value;
		this.setState({education:{educationinfo:ed}})	
	},
	updateEducationInput3: function(index,e_){
		var ed = this.state.education.educationinfo;
		ed[index][2] = e_.target.value;
		this.setState({education:{educationinfo:ed}})	
	},
//

	addEducation: function(){
		var ed = this.state.education.educationinfo
		ed.push(["","",""]);
		this.setState({education:{educationinfo:ed}});
	},

	deleteEducation: function(nothing,index){
		var list = this.state.education.educationinfo;
		list.splice(index,1);
		this.setState({education:{educationinfo:list}});
	},

	processEducation: function(){
		var ed = this.state.education.educationinfo;
		var result = [];
		for(var i = 0; i < ed.length; i++)
		{
			var test = ed[i][0];
			if(test.replace(/\W/g, '') == "")
				continue;
			result.push(ed[i]);
		}

		return result;
	},
//


	submitButtons: function(){
		ref = this.state
		var education = JSON.stringify(this.state.education);
		var link = Routes.create_profile_path(
			{profile: 
				{first_name:ref.firstname, 
				last_name:ref.lastname,
				courses:ref.courses, 
				location:ref.location,
				education:education,
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
					education:education,
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
		var education = this.state.education.educationinfo;
		console.log(education);
		console.log(this.state.education)
		if (education.length == 0)
			return (<div></div>)

		var x = this;
		return(
				<div>
					{education.map(function(listValue,index){
						var ind = index
						return(
						<div key = {index} className = "row" >

							<div className = "six columns">				  
						  		<label >Education (+ Year)</label>
						  		<input onChange = {x.updateEducationInput1.bind(x,index)}  className = "u-full-width" placeholder={listValue[0]} id="education"/>
						  	</div>

							<div className = "three columns">				  
						  		<label htmlFor="education_major">Major </label>
						  		<input onChange = {x.updateEducationInput3.bind(x,index)}  className = "u-full-width" placeholder={listValue[1]} id="education_major"/>
						  	</div>

						  	<div className = "three columns">
						  		<label htmlFor="education_degree">Degree</label>
							   <select onChange = {x.updateEducationInput2.bind(x,index)} className = "u-full-width" id = "education_degree">
		        					<option value=" "> "n/a" </option>
		        					<option value="BA">Bachelor of Arts</option>
		        					<option value="BS">Bachelor of Science</option>
		        					<option value="Master">Masters</option>
		        					<option value="PHD">PHD</option>
		      					</select>
	      					</div>
	      					<p onClick = {x.deleteEducation.bind(x,index)}>delete</p>
	      				</div>
						)
					})}	

					</div>
		)
	},



	render: function () {
		return (
			<div>
				<div className = "container ">

					<div className = "row" >
						<div className = "five columns">
      						<label htmlFor="first_name_input">First Name</label>
      						<input onChange = {this.updateFirstName} className = "u-full-width" placeholder={this.state.firstname} id="first_name_input"/>
      					</div>

						<div className = "five columns">
      						<label htmlFor="last_name_input">First Name</label>
      						<input onChange = {this.updateLastName} className = "u-full-width"  placeholder={this.state.lastname} id="last_name_input"/>
      					</div>

      					<div className = "two columns">
      						<label htmlFor="city_input">City</label>
      						<input onChange = {this.updateLocation} className = "u-full-width" placeholder={this.state.location} id="city_input"/>
      					</div>
					</div>

					<div className = "row">
					    <label htmlFor="about_me">About Me</label>
					    <textarea onChange = {this.updateAboutMe}  className = "u-full-width" placeholder={this.state.aboutme} id="about_me"></textarea>
				    </div>

				    <hr/>

					<div className = "row" >
				    	{this.renderEducation()}
				    </div>
					  <button className="button-primary" onClick = {this.addEducation}>Add</button>
					<div>
				    	<label htmlFor="courses_showcase">Courses Showcase </label>
				   		<textarea onChange = {this.updateCourses} className = "u-full-width" placeholder={this.state.courses} id="courses_showcase"></textarea>
				    </div>
				    {this.submitButtons()}
				</div>	
			</div>
		)
	}
});
