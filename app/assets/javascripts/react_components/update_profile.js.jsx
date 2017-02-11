var UpdateProfileREACT = React.createClass({
	getInitialState: function() {

		//parse education

		console.log(this.props);
		let education = [];
		if(this.props.profile.education != null)
			education = JSON.parse(this.props.profile.education);
		return {
			publicname:this.props.profile.public_name||"",
			firstname:this.props.profile.first_name||"",
			lastname:this.props.profile.last_name||"",
			education:education,
			courses:this.props.profile.courses||"",
			location:this.props.profile.location||"",
			skills:this.props.profile.skills,
			aboutme:this.props.profile.aboutme||""
		}
	},
	updatePublicName: function(e_){
		this.setState({publicname:e_.target.value})
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
		var ed = this.state.education;
		ed[index][0] = e_.target.value;
		this.setState({education:ed})		
	},
	updateEducationInput2: function(index,e_){
		var ed = this.state.education;
		ed[index][1] = e_.target.value;
		this.setState({education:ed})	
	},
	updateEducationInput3: function(index,e_){
		var ed = this.state.education;
		ed[index][2] = e_.target.value;
		this.setState({education:ed})	
	},
//

	addEducation: function(){
		var ed = this.state.education
		ed.push(["","",""]);
		this.setState({education:ed});
	},

	deleteEducation: function(index,nothing){
		var list = this.state.education;
		list.splice(index,1);
		this.setState({education:list});
	},


//

	sendInformation: function(){
		ref = this.state
		var ed = this.state.education;
		var result = [];
		for(var i = 0; i < ed.length; i++)
		{
			var test = ed[i][0];
			if(test.replace(/\W/g, '') == "")
				continue;
			result.push(ed[i]);
		}

		var education = JSON.stringify(result)

		var link = Routes.create_profile_path(
			{profile: 
				{
				public_name:ref.publicname,
				first_name:ref.firstname, 
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
					{
					public_name:ref.publicname,
					first_name:ref.firstname, 
					last_name:ref.lastname,
					courses:ref.courses, 
					location:ref.location,

					education:education,

					skills:ref.skills, 
					aboutme:ref.aboutme}
				}
			)
		}

		window.location = link;
	},


	submitButtons: function(){

		var education = JSON.stringify(this.state.education);
		if (this.props.stage == "edit")
		{
			return(	
				<div>
					<button className="button" onClick = {this.props.toggle}> nevermind </button>&nbsp;
					<button className="button-primary" onClick = {this.sendInformation}> submit </button>
				</div>
			)
		}

		return(	
			<div>
				<button className="button-primary" onClick = {this.sendInformation}> Submit </button>
			</div>
		)
	},


//

	renderEducation: function(){
		var education = this.state.education;
		if (education.length == 0)
			return (<div></div>)

		var x = this;
		return(
				<div>
					{education.map(function(listValue,index){
						var ind = index
						return(
						<div key = {index} >
							<div className = "row" >

								<div className = "six columns">				  
							  		<label >Education (+ Year)</label>
							  		<input onChange = {x.updateEducationInput1.bind(x,index)}  className = "u-full-width" value={listValue[0]} id="education"/>
							  	</div>

								<div className = "three columns">				  
							  		<label htmlFor="education_major">Major </label>
							  		<input onChange = {x.updateEducationInput3.bind(x,index)}  className = "u-full-width" value={listValue[2]} id="education_major"/>
							  	</div>

							  	<div className = "three columns">
							  		<label htmlFor="education_degree">Degree</label>
								   <select defaultValue = {listValue[1]} onChange = {x.updateEducationInput2.bind(x,index)} className = "u-full-width" id = "education_degree">
			        					<option  value=" "> n/a </option>
			        					<option  value="BA">Bachelor of Arts</option>
			        					<option value="BS">Bachelor of Science</option>
			        					<option  value="Master">Masters</option>
			        					<option value="PHD">PHD</option>
			      					</select>
		      					</div>

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
					<div className = "six columns">
  						<label htmlFor="pub_name_input">Public Username</label>
  						<input onChange = {this.updatePublicName} className = "u-full-width" value={this.state.publicname} id="pub_name_input"/>
  					</div>
  					</div>
					<div className = "row" >
						<div className = "five columns">
      						<label htmlFor="first_name_input">First Name</label>
      						<input onChange = {this.updateFirstName} className = "u-full-width" value={this.state.firstname} id="first_name_input"/>
      					</div>

						<div className = "five columns">
      						<label htmlFor="last_name_input">First Name</label>
      						<input onChange = {this.updateLastName} className = "u-full-width"  value={this.state.lastname} id="last_name_input"/>
      					</div>

      					<div className = "two columns">
      						<label htmlFor="city_input">City</label>
      						<input onChange = {this.updateLocation} className = "u-full-width" value={this.state.location} id="city_input"/>
      					</div>
					</div>

					<div className = "row">
					    <label htmlFor="about_me">About Me</label>
					    <textarea onChange = {this.updateAboutMe}  className = "u-full-width" value={this.state.aboutme} id="about_me"></textarea>
				    </div>

				    <hr/>

					<div className = "row" >
				    	{this.renderEducation()}
				    </div>
					  <button className="button-primary" onClick = {this.addEducation}>Add</button>
					<div>
				    	<label htmlFor="courses_showcase">Courses Showcase </label>
				   		<textarea onChange = {this.updateCourses} className = "u-full-width" value={this.state.courses} id="courses_showcase"></textarea>
				    </div>
				    {this.submitButtons()}
				</div>	
			</div>
		)
	}
});
