
var FElist = ["", "Angular.js","Ember.js", "React.js","Knockout.js","Aurelia.js","Vue.js","Polymer.js","WordPress","JQuery"]
var BElist = ["", "Node.js","SQL","MongoDB","C#"]
var FSlist = ["", "Ruby On Rails","MEAN","LAMP","Python"]

var UpdateSkillsREACT = React.createClass({
	getInitialState: function() {
		console.log(this.props)

		return {
			project: this.props.profile,

			skills: this.props.profile.skills||[],
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
		s[1] = e_.target.value;
		this.setState({skillsInput:skills})		
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
		this.setState({skills:skills})		
	},

	updateSkillsInput3: function(e_){			//projects/repos/work exp
		var skills = this.state.skills;
		this.setState({skills:skills})		
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
		var skill = this.state.skills;
		skill.push([e_.target.value,"","",""]);
		this.setState({skills:skill});
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

		for(var i =0; i<this.state.skills.length; i++){
			for(var y = 0;y<list.length;y++){
				var index = list[y].indexOf(this.state.skills[i][0]);
				if (index != -1){
					list[i].splice(index,1);
					break;
				}
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
				<div className = "nine columns">
  					<input onChange = {this.updateLastName} className = "u-full-width"  placeholder={this.state.lastname} id="last_name_input"/>
				</div>
				<div className = "three columns">
					Work <input type="radio" name = "work1" value={0} />
					Project <input type="radio"name = "work1"  value={1} />
				</div>
			</div>
				
			<textarea maxLength="250" onChange = {this.updateSkillsInput2} className = "u-full-width" placeholder="Describe your role and what you did (250 character limit)"></textarea>
      			
			<div className = "row">
				<div className = "nine columns">
  					<input onChange = {this.updateLastName} className = "u-full-width"  placeholder={this.state.lastname} id="last_name_input"/>
				</div>
				<div className = "three columns">
					Work <input type="radio" name = "work1" value={0} />
					Project <input type="radio"name = "work1"  value={1} />
				</div>
			</div>
			
			<textarea maxLength="250" onChange = {this.updateSkillsInput3} className = "u-full-width" placeholder="Describe your role and what you did (250 character limit)"></textarea>

		</div>
			)
	},


	render: function () {
		var x = this;
		return (
			<div>
				<div className = "container">
					<div id = "skillSelector">
					    <div className = "skillSelectorItem" onClick = {() => {this.updateSkillSelect(0)}}> Front-End </div>
					    <div className = "skillSelectorItem" onClick = {() =>{this.updateSkillSelect(1)}}> Back-End</div>
					    <div className = "skillSelectorItem" onClick = {() =>{this.updateSkillSelect(2)}}> Full-Stack </div>
					</div>

					{this.renderUpdatedLists()}	

					<h6>Knowledge Base: </h6>

					<div style = {{display:"inline-block",marginLeft:"10px"}}> University / Bootcamp <input type="checkbox" value={0} /> </div>
		    		<div style = {{display:"inline-block",marginLeft:"10px"}}> Self-Taught <input type="checkbox"  value={1} /></div>
					<textarea maxLength="250" onChange = {this.updateSkillsInput1} className = "u-full-width" placeholder="Describe/list the courses, books and tutorials you've used to learn this skill (250 character limit)"></textarea>
					

					<h6>Work/Project Experience: </h6>

					{this.renderWorkExperience()}				
				</div>
			</div>
		)
	}
});




