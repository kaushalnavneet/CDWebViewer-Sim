'use strict';

import Array from '../utils/array.js';

export default class State { 

	constructor(i, model) {
		this.i = i;
		this.model = model;
	}
	
	Clone(){
		return new State(this.i, Array.Clone(this.model));
	}
	
	GetValue(Id) {
		return this.model[Id];
	}
	
	SetValue(Id, value) {
		this.model[Id] = value;
	}
	
	ApplyTransitions(frame) {
		Array.ForEach(frame.transitions, function(t) {
			this.SetValue(t.Id, t.Value);
		}.bind(this));
		
		this.i++;
	}
	
	RollbackTransitions(frame) {
		Array.ForEach(frame.transitions, function(t) {
			var value = this.GetValue(t.Id) - t.Diff;
			
			this.SetValue(t.Id, value);
		}.bind(this));
		
		this.i--;
	}
	
	static Zero(size) {
		var model = [];
		for (var i = 0; i < size; i++) {
			model.push([]);
		}
			
		return new State(-1, model);
	}
}