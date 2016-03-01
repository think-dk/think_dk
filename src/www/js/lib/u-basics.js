// ANIMATION METHODS

// Animation first step (fade in)
// executed on relevant node
u._stepA1 = function() {
//	u.bug("stepA1:" + u.text(this));

	// split words into spans
	this.innerHTML = '<span class="word">'+this.innerHTML.split(" ").join('</span>&nbsp;<span class="word">')+'</span>'; 
	this.word_spans = u.qsa("span.word", this);
	var i, span;

	// split each word into letter spans
	for(i = 0; span = this.word_spans[i]; i++) {
		span.innerHTML = "<span>"+span.innerHTML.split("").join("</span><span>")+"</span>"; 
	}

	// get each letter
	this.spans = u.qsa("span:not(.word)", this);
	if(this.spans) {
		var i, span;
		// set initial state for each span
		for(i = 0; span = this.spans[i]; i++) {
			span.innerHTML = span.innerHTML.replace(/ /, "&nbsp;");
			u.ass(span, {
				"transformOrigin": "0 100% 0",
				"transform":"translate(0, 40px)",
				"opacity":0
			});
		}

		// show outer content node
		u.ass(this, {
			"opacity":1
		});

		// play span animation (fade in)
		for(i = 0; span = this.spans[i]; i++) {
			u.a.transition(span, "all 0.2s ease-in-out "+(15*u.random(0, 15))+"ms");
			u.ass(span, {
				"transform":"translate(0, 0)",
				"opacity":1
			});
		}

	}

}

// Animation second step (fade out)
// executed on relevant node
u._stepA2 = function() {
//	u.bug("stepA2:" + u.text(this));

	if(this.spans) {
		var i, span;
		// play span animation (fade out)
		for(i = 0; span = this.spans[i]; i++) {
			u.a.transition(span, "all 0.2s ease-in-out "+(15*u.random(0, 15))+"ms");
			u.ass(span, {
				"transform":"translate(0, -40px)",
				"opacity":0
			});
		}
	}

}

