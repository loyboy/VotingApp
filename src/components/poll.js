import React from 'react';
import {pollActions} from './../actions/polls';
import {connect} from 'react-redux';

class Poll extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			options:[],
			id:"",
			name:""
		};
		this.submitVote = this.submitVote.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	componentDidMount() {
		 let id = this.props.match.params.id;
		 this.setState({
		 	id:id
		 });
		 this.props.dispatch(pollActions.getPollById(id));
	}
	componentDidUpdate(prevProps,prevState) {
		var self = this;
		if(prevProps.getPollById!=this.props.getPollById && this.props.getPollById["got_poll_id"]) {
			this.setState({
				options:self.props.getPollById.poll.values,
				name:self.props.getPollById.poll.name
			});
		}
		if(prevProps.vote!=this.props.vote && this.props.vote["voted"]) {
			this.setState({
				options:self.props.vote.poll.values,
			});
		}
	}
	drawPieChart() {
		var data = this.state.options
		var width = 650;          
		var height = 350;        
		var radius = 300/2;   
		var color =  d3.scaleOrdinal(d3.schemeCategory20);    
		var svg = d3.select('svg')        
			.append('svg').attr('width', width) 
			.attr('height', height).append('g')              
			.attr('transform', 'translate(' + (width / 2) +',' + (height / 2) + ')');
		
		var total=0;
		for(var a=0;a<data.length;a++) {
			total=total+parseInt(data[a].votes); 
		}
		var pie_data=[];
		for( var a=0;a<data.length;a++){ 
			pie_data[a]=(data[a].votes/total)*100;
		}
		var arc = d3.arc().outerRadius(radius).innerRadius(0);

		var pie = d3.pie()
			.value(function(d,i) { return pie_data[i]; })
			.sort(null);

		var path = svg.selectAll('path')
			.data(pie(data))
			.enter()
			.append('path')
			.attr('d', arc)
			.attr('fill', function(d, i) {
				return color(i)
			});
		
		var arcs = svg.selectAll("g.arc")
		    .data(pie(data))
		  .enter().append("svg:g")
		    .attr("class", "arc")
		    .attr("transform", function(d,i) {  
		    	return "translate(" + (radius+50) + "," + (i*15-radius) + ")"});
		
		arcs.append("svg:text") 
		       .attr("text-anchor", "middle") 
		       .attr("fill", function(d, i) { return color(i); })
		       .text(function(d, i) { 
		       	return d.data.name});

	}
	handleChange (e) {
		this.setState({
			value:e.target.value
		});
	}
	submitVote(e) {
		if(this.state.value) {
			this.props.dispatch(pollActions.vote(this.state.id,this.state.value));
		}
	}
	render() {
		var data = this.drawPieChart();
		var self = this;
		var vote = this.state.options.map(function(d,i){
			return <option key={i} value={d.name}>{d.name}</option>
		});
		return (
			<div className="panel-body"> 
				<div className="vote-options"> 
					<div className="form-group">
					  <p>{this.state.name}</p>	
					  <label htmlFor="sel1">Vote for :</label>
					  <select className="form-control" id="sel1" onChange={self.handleChange} >
					   <option value=""> Choose an option: </option>
					   {vote}
					  </select>
					  <button type="submit" onClick={this.submitVote} className="vote-btn btn btn-primary">Submit</button>
					</div>
				</div>
				<svg width="860" height="500"></svg>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const {getPollById,vote}   =  state;
	return {
		getPollById,vote
	}
}

Poll = connect(mapStateToProps)(Poll);
export default Poll;