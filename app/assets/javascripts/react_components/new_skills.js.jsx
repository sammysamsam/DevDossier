
var FElist = ["", "Angular.js","Ember.js", "React.js","Knockout.js","Aurelia.js","Vue.js","Polymer.js","WordPress","JQuery"]
var BElist = ["", "Node.js","SQL","MongoDB","C#"]
var FSlist = ["", "Ruby On Rails","MEAN","LAMP","Python"]

var NewSkillsREACT = React.createClass({
	getInitialState: function() {
		var skills = {skillsinfo: [] };
		if(this.props.profile.skills != null && this.props.profile.skills != "")
			skills = JSON.parse(this.props.profile.skills);

		return {
			skills: skills,
			skillsInput:["",{school:false,self:false,educationinfo:""},

							// exptype: false = project true = work
							
							{exptype:false,link:"",experienceinfo:""},
							{exptype:false,link:"",experienceinfo:""}],
			skillsSelect:0,
		}
	},

//
	updateSkillSelect: function(e_){
		this.setState({skillsSelect:e_})		
	},

	updateSkillsInput0: function(e_){			//type (frontend, backend, fullstack)
		var s = this.state.skillsInput;
		s[0] = e_.target.value;
		this.setState({skillsInput:s})		
	},	
	updateSkillsInput1: function(e_){			//education
		var s = this.state.skillsInput;
		s[1].educationinfo = e_.target.value;
		this.setState({skillsInput:s})		
	},
	toggleEducation: function(number){			//checkbox education
		var s = this.state.skillsInput;
		if(number == 0)
			s[1].school = !s[1].school;
		if(number == 1)
			s[1].school = !s[1].self;	

		this.setState({skillsInput:s})	
	},

	updateSkillsInput2: function(e_){			//projects/repos/work exp
		var skills = this.state.skills;
		this.setState({skillsInput:skills})		
	},

	updateSkillsInput3: function(e_){			//projects/repos/work exp
		var skills = this.state.skills;
		this.setState({skillsInput:skills})		
	},


	toggleWorkExperience: function(number){			//radio experience
		var s = this.state.skillsInput;
		if(number == 0)
			s[2].proj = !s[2].exptype;
		if(number == 1)
			s[3].school = !s[3].exptype;	

		this.setState({skillsInput:s})	
	},


//
	selectSkill: function(e_){
		var skillsInput = this.state.skillsInput;
		skillsInput[0] = e_.target.value;
		this.setState({skillsInput:skillsInput});
	},

	deleteSkill: function(nothing,index){

	},
//


	renderUpdatedLists: function(){

		var list=FElist;
		if(this.state.skillsSelect == 1)
			list=BElist;
		if(this.state.skillsSelect == 2)
			list=FSlist;
		x = this;

		for(var i =0; i<this.state.skills.skillsinfo.length; i++){
				var index = list.indexOf(this.state.skills.skillsinfo[i][0]);
				if (index != -1){
					list.splice(index,1);
					break;
				}
		}
		return (
			<select onChange = {x.updateSkillsInput0} className = "u-full-width">
					{list.sort().map(function(listValue,index){
						if(index != 0)
							return(<option key = {index} value={listValue}> {listValue} </option>)
						else
							return (<option selected key = {index} value={listValue}> {listValue} </option>)
					})}	
     		</select>
			)
	},

	renderWorkExperience: function(){
		return (
		<div>		
			<div className = "row">
				<div className = "three columns">
					<div style = {{display:"inline",marginLeft:"12px"}}> Work <input type="radio" name = "work1" value={0} /> </div>
					<div style = {{display:"inline",marginLeft:"12px"}}> Project <input type="radio"name = "work1"  value={1} /> </div>
				</div>
				<div className = "nine columns">
  					<input onChange = {this.updateLastName} className = "u-full-width"  placeholder={this.state.lastname} id="last_name_input"/>
				</div>

			</div>
			
			<textarea maxLength="250" onChange = {this.updateSkillsInput2} className = "u-full-width skillsTextBox" placeholder="Describe your role and what you did (250 character limit)"></textarea>
      			
			<div className = "row">
				<div className = "three columns">
					<div style = {{display:"inline",marginLeft:"12px"}}>Work <input type="radio" name = "work1" value={0} /></div>
					<div style = {{display:"inline",marginLeft:"12px"}}>Project <input type="radio"name = "work1"  value={1} /></div>
				</div>
				<div className = "nine columns">
  					<input onChange = {this.updateLastName} className = "u-full-width"  placeholder={this.state.lastname} id="last_name_input"/>
				</div>

			</div>
			
			<textarea maxLength="250" onChange = {this.updateSkillsInput3} className = "u-full-width skillsTextBox" placeholder="Describe your role and what you did (250 character limit)"></textarea>

		</div>
			)
	},

	submitSkills(){
		
		var skills = this.state.skills;	
		skills.skillsinfo.push(this.state.skillsInput);
		var result = JSON.stringify(skills);

		var link = Routes.edit_profile_path(this.props.profile.id,
			{profile: 
				{ first_name: this.props.profile.first_name, 
				last_name: this.props.profile.last_name,
				courses:this.props.profile.courses, 
				location:this.props.profile.location,
				education:this.props.profile.education,
				skills:result, 
				aboutme:this.props.profile.aboutme}
			}
		)
		window.location = link;
	},


//


	toggle()
	{
		this.props.toggle();
	},

//


	render: function () {
		var x = this;
		return (
			<div>
				<div className = "container newSkillsContainer">
					<div id = "skillSelector">
					    <div className = "skillsSelectorItem" onClick = {() => {this.updateSkillSelect(0)}}> Front-End </div>
					    <div className = "skillsSelectorItem" onClick = {() =>{this.updateSkillSelect(1)}}> Back-End</div>
					    <div className = "skillsSelectorItem" onClick = {() =>{this.updateSkillSelect(2)}}> Full-Stack </div>
					</div>

					{this.renderUpdatedLists()}	

					<h6>Knowledge Base: </h6>

					<div style = {{display:"inline-block",marginLeft:"10px"}}> University / Bootcamp <input type="checkbox" value={0} /> </div>
		    		<div style = {{display:"inline-block",marginLeft:"10px"}}> Self-Taught <input type="checkbox"  value={1} /></div>
					<textarea maxLength="250" onChange = {this.updateSkillsInput1} className = "u-full-width skillsTextBox" placeholder="Describe/list the courses, books and tutorials you've used to learn this skill (250 character limit)"></textarea>
					

					<h6>Work/Project Experience: </h6>

					{this.renderWorkExperience()}	

					<button className="button-primary" onClick = {() => {this.submitSkills()}}> submit </button>	

					<button onClick = {() => {this.toggle()}}> close</button>			
				</div>
			</div>
		)
	}
});




