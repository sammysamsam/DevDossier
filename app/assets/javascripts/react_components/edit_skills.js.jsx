var EditSkills= React.createClass({
	getInitialState: function() {
		var skills = [];
		if(this.props.profile.skills != null && this.props.profile.skills != "")
			skills = JSON.parse(this.props.profile.skills);

		return {
			skills: skills,
			selected_Skill_Index:-1,
		}
	},

//
	updateSkillSelect: function(e_) {
		this.setState({selected_Skill_Index:e_})		
	},

//	

	updateEducation: function(e_) {			//education
		var index = this.state.selected_Skill_Index;
		var s = this.state.skills;
		s[index][1].educationinfo = e_.target.value;
		this.setState({skills:s})		
	},

	updateEducationType: function(number) {			//checkbox education
		var index = this.state.selected_Skill_Index;
		var s = this.state.skills;

		if(number == 0)
		{
			s[index][1].school = !s[index][1].school;
		}
		if(number == 1)
		{
			s[index][1].self = !s[index][1].self;
		}

		this.setState({skills:s})	
	},

//


	updateWorkExpInfo1: function(e_) {			//projects/repos/work exp 1
		var index = this.state.selected_Skill_Index;
		var s = this.state.skills;
		s[index][2].experienceinfo = e_.target.value;

		this.setState({skills:s})		
	},
	updateWorkExpHeader1: function(e_) {			//projects/repos/work exp header
		var index = this.state.selected_Skill_Index;
		var s = this.state.skills;
		
		s[index][2].header = e_.target.value;
		this.setState({skills:s})		
	},
	toggleWorkExpType1: function(e_) {			//radio experience
		var index = this.state.selected_Skill_Index;
		var s = this.state.skills;
		
		s[index][2].exptype = e_
		this.setState({skillsInput:s})	
	},

//


	updateWorkExpInfo2: function(e_) {			//projects/repos/work exp 2
		var index = this.state.selected_Skill_Index;
		var s = this.state.skills;

		s[index][3].experienceinfo = e_.target.value;
		this.setState({skills:s})		
	},
	updateWorkExpHeader2: function(e_) {			//projects/repos/work exp header
		var index = this.state.selected_Skill_Index;
		var s = this.state.skills;

		s[index][3].header = e_.target.value;
		this.setState({skills:s})			
	},
	toggleWorkExpType2: function(e_) {			//radio experience
		var index = this.state.selected_Skill_Index;
		var s = this.state.skills;
		s[index][3].exptype = e_
		this.setState({skillsInput:s})	
	},


//


	deleteSkill: function() {
		skills = this.state.skills;
		skills.splice(this.state.selected_Skill_Index,1);
		this.setState({skills:skills, selected_Skill_Index:this.state.selected_Skill_Index-1})				
	},

	submit: function () {
		var result = JSON.stringify(this.state.skills);

		var link = Routes.edit_skill_profile_path(this.props.profile.id,
			{profile: 
				{ 
				public_name: this.props.profile.public_name,
				skills:result, 
				}
			}
		)
		window.location = link
	},

//

	renderSkillsList: function() {
			var list = [];
			var tis = this;
			for(var i =0;i<this.state.skills.length;i++) {
				list.push( this.state.skills[i][0])
			}
			return(
			<div className = "skillsListStyle">
				{list.map(function(listValue,index) {
		   		if(tis.state.selected_Skill_Index == index)
		   			return(							
			   			<div key = {index} className = "skillsList_item_selected_Style">
							{listValue}
						</div>)
						else
			   		return(
						<div key = {index} className = "skillsList_itemStyle" onClick = {() => {tis.updateSkillSelect(index)}}>
							{listValue}
						</div>
					)
		    	})}
			</div>
			)
	},

	renderEditWorkExperience: function() {
		var info = this.state.skills[this.state.selected_Skill_Index];
		return (
		<div>		

			<h6>Knowledge Base: </h6>

			<div style = {{display:"inline-block",marginLeft:"10px"}}> 

					University / Bootcamp 
					&nbsp; 
					<input type="checkbox" onChange = {this.updateEducationType.bind(null,0)} checked = {info[1].school}/> 

			</div>
	    	<div style = {{display:"inline-block",marginLeft:"10px"}}> 

		    		Self-Taught  &nbsp;

		    		<input type="checkbox"  onChange = {this.updateEducationType.bind(null,1)} checked = {info[1].self}/>

	    	</div>
			
			<textarea maxLength="250" onChange = {this.updateEducation} className = "u-full-width" value={info[1].educationinfo}></textarea>

			<h6>Work/Project Experience: </h6>

			<div className = "row">
				
				<div className = "eight columns">
	  				<input maxLength = "50"  onChange = {this.updateWorkExpHeader1} className = "u-full-width"  value={info[2].header}/>
	  			</div>
					
				<div className = "four columns">

					<div style = {{display:"inline",marginLeft:"7px"}}> 
					
						Work  &nbsp;
						<input type="radio" name = "work1" onChange = {this.toggleWorkExpType1.bind(null,"work")} checked = {info[2].exptype =="work"} /> 
						
					</div>

					<div style = {{display:"inline",marginLeft:"7px"}}> 

						Project  &nbsp;
						<input type="radio" name = "work1" onChange = {this.toggleWorkExpType1.bind(null,"project")} checked = {info[2].exptype =="project"} /> 

					</div>

				</div>
			</div>
					
			<textarea maxLength="200" onChange = {this.updateWorkExpInfo1} className = "u-full-width" value={info[2].experienceinfo}></textarea>
	      			
			<div className = "row">

				<div className = "eight columns">
  					<input maxLength = "50"  onChange = {this.updateWorkExpHeader2} className = "u-full-width"  value={info[3].header}/>	
  				</div>

				<div className = "four columns">
					<div style = {{display:"inline",marginLeft:"7px"}}> 
					
						Work  &nbsp;
						<input type="radio" name = "work2" onChange = {this.toggleWorkExpType2.bind(null,"work")} checked = {info[3].exptype == "work"} /> 

					</div>

					<div style = {{display:"inline",marginLeft:"7px"}}> 

						Project  &nbsp;
						<input type="radio" name = "work2" onChange = {this.toggleWorkExpType2.bind(null,"project")} checked = {info[3].exptype== "project"} /> 

					</div>	
				</div>
			</div>
			
			<textarea maxLength="200" onChange = {this.updateWorkExpInfo2} className = "u-full-width" value ={info[3].experienceinfo}></textarea>
		</div>
			)
	},


	render: function () {
		var x = this;
		if(this.state.selected_Skill_Index == -1)
			return(
			<div className = "editSkillsContainer">
				<div className  = "row" >			
					{this.renderSkillsList()}
				</div>

				<button className = "btn-primary"  onClick = {this.props.toggle} > 
					close ( lose unsaved data ) 
				</button>
				&nbsp;
				<button className = "button-primary"  onClick = {this.submit}> 
					save
				</button>
			</div>) 
		else
			return (
				<div className = "editSkillsContainer">	
					{this.renderSkillsList()}	
					{this.renderEditWorkExperience()}		
					
					<button onClick = {() => {this.deleteSkill()}}> delete </button>
						&nbsp;						
					<button className = "btn-primary" onClick = {this.submit}> save </button>
						&nbsp;			
					<button className = "btn-primary" onClick = {this.props.toggle} > close ( lose unsaved data ) </button>
				</div>
			)
	}
});




