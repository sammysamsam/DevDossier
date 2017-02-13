
var FElist = ["", "Angular.js","React.js","Ember.js", "Knockout.js","Aurelia.js","Vue.js","Polymer.js","WordPress","JQuery"]
var BElist = ["", "Node.js","SQL","MongoDB","C#","PHP","Ruby","Scala","Clojure"]
var FSlist = ["", "Ruby On Rails","MEAN","LAMP","Python"]

var NewSkills = React.createClass({

	getInitialState: function() {
		var skills = [];
		if(this.props.profile.skills != null && this.props.profile.skills != "")
			skills = JSON.parse(this.props.profile.skills);

		return {
			skills: skills,
			skillsInput:["",{school:false,self:false,educationinfo:""},

							// exptype: false = project true = work
							
							{exptype:"",header:"",experienceinfo:""},
							{exptype:"",header:"",experienceinfo:""}],
			selectedSkillIndex:0,
		}
	},

//
	updateSelectedSkillIndex: function(e_) {
		this.setState({selectedSkillIndex:e_})		
	},


	updateType: function(e_) {			//type (frontend, backend, fullstack)
		var s = this.state.skillsInput;
		s[0] = e_.target.value;
		this.setState({skillsInput:s})		
	},	


	updateEducationInfo: function(e_) {			//education
		var s = this.state.skillsInput;
		s[1].educationinfo = e_.target.value;
		this.setState({skillsInput:s})		
	},

	toggleEducationType: function(number) {			//checkbox education
		var s = this.state.skillsInput;
		if(number == 0)
		{
			s[1].school = !s[1].school ;		
		}
		if(number == 1)
		{
			s[1].self = !s[1].self ;		
		}

		this.setState({skillsInput:s})	
	},

//


	updateWorkExpInfo1: function(e_) {			//projects/repos/work exp 1
		var s = this.state.skillsInput;
		s[2].experienceinfo = e_.target.value;
		this.setState({skillsInput:s})		
	},
	updateWorkExpHeader1: function(e_) {			//projects/repos/work exp header
		var s = this.state.skillsInput;
		s[2].header = e_.target.value;
		this.setState({skillsInput:s})		
	},
	toggledWorkExpType1: function(e_) {			//radio experience
		var s = this.state.skillsInput;
		s[2].exptype = e_
		this.setState({skillsInput:s})	
	},

//


	updateWorkExpInfo2: function(e_) {			//projects/repos/work exp 2
		var s = this.state.skillsInput;
		s[3].experienceinfo = e_.target.value;
		this.setState({skillsInput:s})		
	},
	updateWorkExpHeader2: function(e_) {			//projects/repos/work exp header
		var s = this.state.skillsInput;
		s[3].header = e_.target.value;
		this.setState({skillsInput:s})			
	},
	toggledWorkExpType2: function(e_) {			//radio experience
		var s = this.state.skillsInput;
		s[3].exptype = e_
		this.setState({skillsInput:s})	
	},

//
	selectSkill: function(e_) {
		var skillsInput = this.state.skillsInput;
		skillsInput[0] = e_.target.value;
		this.setState({skillsInput:skillsInput});
	},
//


	renderUpdatedLists: function() {

		var list=FElist;
		if(this.state.selectedSkillIndex == 1)
			list=BElist;
		if(this.state.selectedSkillIndex == 2)
			list=FSlist;
		x = this;

		for(var i =0; i<this.state.skills.length; i++) {
				var index = list.indexOf(this.state.skills[i][0]);
				if (index != -1) {
					list.splice(index,1);
				}
		}

		return (
			<select onChange = {x.updateType} className = "u-full-width">
					{list.sort().map(function(listValue,index) {
						if(index != 0)
							return(<option key = {index} value={listValue}> {listValue} </option>)
						else
							return (<option selected key = {index} value={listValue}> {listValue} </option>)
					})}	
     		</select>
			)
	},

	submitSkills() {
		if(this.state.skillsInput[0] != "" && (this.state.skillsInput[1].school || this.state.skillsInput[1].self))
		{
			var skills = this.state.skills;	
			skills.push(this.state.skillsInput);
			var result = JSON.stringify(skills);
			var link = Routes.edit_skill_profile_path(this.props.profile.id,
				{profile: 
					{ 
					public_name: this.props.profile.public_name,
					skills:result, 
					}
				}
			)
			window.location = link;
		}
	},

//


	render: function () {
		var x = this;
		return (
			<div className = "newSkillsContainer">
				<div className = "container">


					<div id = "skillSelector">
					    <div className = "selectedSkillIndexorItem" onClick = {() => {this.updateSelectedSkillIndex(0)}}> Front-End </div>
					    <div className = "selectedSkillIndexorItem" onClick = {() =>{this.updateSelectedSkillIndex(1)}}> Back-End</div>
					    <div className = "selectedSkillIndexorItem" onClick = {() =>{this.updateSelectedSkillIndex(2)}}> Full-Stack </div>
					</div>


					<div className = "row">
						<div className = "four columns">

							{this.renderUpdatedLists()}	
			


							<h6>Knowledge Base: </h6>

							<div style = {{display:"inline-block",marginLeft:"10px"}}> 
								University / Bootcamp 
		    					<input type="checkbox"  onChange = {this.toggleEducationType.bind(null,0)} checked = {this.state.skillsInput[1].school}/>
							</div>

				    		<div style = {{display:"inline-block",marginLeft:"10px"}}> 
					    		Self-Taught 
		    					<input type="checkbox"  onChange = {this.toggleEducationType.bind(null,1)} checked = {this.state.skillsInput[1].self}/>
				    		</div>
							
							<textarea style = {{minHeight:"155px"}} maxLength="250" onChange = {this.updateEducationInfo} className = "u-full-width skillsTextBox" placeholder="Describe/list the courses, books and tutorials you've used to learn this skill (250 character limit)"></textarea>
						</div>



						<div className = "eight columns">

							<h6>Work/Project Experience: </h6>

							<div>		
								<div className = "row">

									<div className = "four columns">
										<div style = {{display:"inline-block",marginLeft:"5px",width:"70px"}}> 
											
											Work 
											<input type="radio" name = "work1" onClick = {this.toggledWorkExpType1.bind(null,"work")}/> 
										</div>
										<div style = {{display:"inline-block",marginLeft:"5px",width:"70px"}}> 
											
											Project 
											<input type="radio" name = "work1" onClick = {this.toggledWorkExpType1.bind(null,"project")}/> 
										</div>
									</div>

									<div className = "eight columns">
					  					<input maxLength = "50" onChange = {this.updateWorkExpHeader1} className = "u-full-width"  placeholder="Project Name or Company Name (optional: url to company page or repo)"/>
									</div>

								</div>
							
								<textarea maxLength="200" onChange = {this.updateWorkExpInfo1} className = "u-full-width skillsTextBox" placeholder="Describe your role and what you did (200 character limit)"></textarea>
					      			
								<div className = "row">

									<div className = "four columns">
										<div style = {{display:"inline-block",marginLeft:"5px",width:"70px"}}>

											Work 
											<input type="radio" name = "work2" onClick = {this.toggledWorkExpType2.bind(null,"work")}/> 
										</div>
										<div style = {{display:"inline-block",marginLeft:"5px",width:"70px"}}>
											
											Project 
											<input type="radio" name = "work2" onClick = {this.toggledWorkExpType2.bind(null,"project")}/> 
										</div>
									</div>

									<div className = "eight columns">
					  					<input maxLength = "50"  onChange = {this.updateWorkExpHeader2} className = "u-full-width"  placeholder="Project Name or Company Name (optional: url to company page or repo)" />
									</div>

								</div>
								
								<textarea maxLength="200" onChange = {this.updateWorkExpInfo2} className = "u-full-width skillsTextBox" placeholder="Describe your role and what you did (200 character limit)"></textarea>
							</div>
						</div>
					</div>


					<button onClick = {this.props.toggle}> close</button><div></div>

					<button className="button-primary" onClick = {this.submitSkills}> submit </button>		
						
				</div>
			</div>
		)
	}
});




