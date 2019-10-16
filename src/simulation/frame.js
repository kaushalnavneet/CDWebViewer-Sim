'use strict';

import Array from '../utils/array.js';
import Transition from './transition.js';

export default class Frame { 

	constructor(time) {
		this.time = time;
		this.transitions = [];
		this.index = {};
	}
	
	get Length() {
		return this.transitions.length;
	}
	
	AddTransition(id, value, diff) {
		var t = new Transition(id, value, diff);
		
		this.index[t.id] = t;
		
		this.transitions.push(t);
	}
	
	TransitionById(time) {
		return this.index[time] || null;
	}
	
	Transition(i) {
		return this.transitions[i];
	}
	
	First() {
		return this.transitions[0];
	}
	
	Last()  {
		return this.transitions[this.transitions.length - 1];
	}
	
	Reverse () {
		var reverse = new Frame(this.time)
		
		Array.ForEach(this.transitions, function(t) {
			reverse.AddTransition(t.Coord, t.Value - t.Diff, t.Diff);
		})
		
		return reverse;
	}
	
	Difference(state) {
		for (var i = 0; i < this.Length; i++) {
			var t = this.Transition(i);
			 
			t.Diff = t.Value - state.GetValue(t.X, t.Y, t.Z);
			
			state.SetValue(t.X, t.Y, t.Z, t.Value);
		}
	}
}