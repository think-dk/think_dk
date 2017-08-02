Util.Objects["events"] = new function() {
	this.init = function(scene) {
		u.bug("scene init:" + u.nodeId(scene))
		

		scene.resized = function() {
			u.bug("scene.resized:" + u.nodeId(this));

			// refresh dom
			this.offsetHeight;
		}

		scene.scrolled = function() {
//			u.bug("scrolled:" + u.nodeId(this))
		}

		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));


			page.cN.scene = this;


			u.showScene(this);


			// accept cookies?
			page.acceptCookies();


			// get event list
//			this.div_calendar = u.ae(this, "div", {"class":"calendar"});

			// Object for storing all event data
			this.events = {};
			var events = u.qsa("li.event", this);
			// console.log("this.li_events.length:" + events.length);
			// console.log(events);

//			var all_events = u.qs("div.all_events", this);



			if(events.length) {

				var event, i;
				for(i = 0; event = events[i]; i++) {
					this.indexEvent(event);
				}

			}

			console.log(this.events);

			this.createCalendar();

			page.resized();
		}


		scene.indexEvent = function(event) {

			var event_date, timestamp_fragments, dd_starting_at, starting_at;

			dd_starting_at = u.qs("dd.starting_at", event);
			if(dd_starting_at) {

				// readsafe datetime stored in content attribute
				starting_at = dd_starting_at.getAttribute("content");
				event.date = new Date(starting_at);
				event.item_id = u.cv(event, "item_id");

				// console.log(starting_at);
				//
				// timestamp_fragments = starting_at.match(/(\d\d\d\d)\-(\d\d)\-(\d\d)/);
				// timestamp_fragments = starting_at.match(/(\d\d\d\d)-(\d\d)-(\d\d) (\d\d):(\d\d)/);
				// if(timestamp_fragments) {
				// 	year = timestamp_fragments[1];
				// 	month = timestamp_fragments[2];
				// 	date = timestamp_fragments[3];
				//
				// 	hour = timestamp_fragments[4];
				// 	minute = timestamp_fragments[5];
				// 	event.date = new Date(year, month, date, hour, minute);
				// 	console.log(event.date);
				// }

			}


			event_date = u.date("Y-m-d", event.date.getTime());
//			console.log(event_date);
//						event_time = event.getAttribute("data-time");


			// check if event date exists in event object
			if(!this.events[event_date]) {
				this.events[event_date] = []
			}
			// event date exists
			// check if event already exists on that day
			else {
				var i, e;
				for(i = 0; i < this.events[event_date].length; i++) {
					e = this.events[event_date][i];

					// if it exists remove it
					if(e.item_id == event.item_id) {
						this.events[event_date].splice(i, 1);
					}
				}
			}
			// if(!this.events[event_date][event_time]) {
			// 	this.events[event_date][event_time] = [];
			// }

			// Add current event to event list for that date
			this.events[event_date].push(event);
			
		}

		scene.nextMonth = function() {

			this.div_calendar.removeChild(this.current_month);
			this.current_month = u.ae(this.div_calendar, this.getMonth(this.current_month.year, this.current_month.month+1));

		}

		scene.prevMonth = function() {

			this.response = function(response) {
				var events = u.qsa("div.all_events li.event", response);
				console.log("events.length:" + events.length);
				// console.log(events);

	//			var all_events = u.qs("div.all_events", this);



				if(events.length) {

					var event, i;
					for(i = 0; event = events[i]; i++) {
						this.indexEvent(event);
					}

				}

				this.div_calendar.removeChild(this.current_month);
				this.current_month = u.ie(this.div_calendar, this.getMonth(this.current_month.year, this.current_month.month-1));
			}
			u.request(this, "/events/"+this.current_month.year+"/"+(this.current_month.month-1));


		}

		scene.createCalendar = function() {

			if(!this.div_calendar) {

				this.div_calendar = u.ae(this, "div", {"class":"calendar"});

				this.now = {
					"date":new Date().getDate(),
					"month":new Date().getMonth()+1,
					"year":new Date().getFullYear()
				}

	//			u.bug(this.now.date + ", " + this.now.month + ", " + this.now.year);


				var bn_next_month = u.ae(this.div_calendar, "span", {"class":"next"});
				bn_next_month.scene = this;
				u.addNextArrow(bn_next_month);

				var bn_prev_month = u.ae(this.div_calendar, "span", {"class":"prev"});
				u.addPreviousArrow(bn_prev_month);
				bn_prev_month.scene = this;

				u.ce(bn_next_month);
				bn_next_month.clicked = function() {
					this.scene.nextMonth();
				}

				u.ce(bn_prev_month);
				bn_prev_month.clicked = function() {
					this.scene.prevMonth();
				}

				// test values
				// var month = 2;
				// var year = 2016;


				this.current_month = this.getMonth(this.now.year, this.now.month);
				u.ae(this.div_calendar, this.current_month);
			}
		}


		scene.getMonth = function(year, month) {

			var test_date = new Date(year, month-1);
			if(test_date) {
				year = test_date.getFullYear();
				month = test_date.getMonth()+1;
			}
		

			var month_object = [];
			var first_weekday = this.getFirstWeekdayOfMonth(year, month);
			var last_day = this.getLastDayOfMonth(year, month);
			var i, day, date;

			if(first_weekday > 1) {
				last_day_last_month = this.getLastDayOfMonth(year, month-1);
			}


	//		u.bug("range:" + (first_weekday) + " - " + (last_day));
			var new_month = document.createElement("div");
			new_month.month = month;
			new_month.year = year;
			new_month.scene = this;

			u.ac(new_month, "month")
			var h3 = u.ae(new_month, "h3");

			var h3_month = u.ae(h3, "span", {"class":"month", "html":u.txt["month-"+month]});
			var h3_year = u.ae(h3, "span", {"class":"year", "html":year});

			// create weekdays header
			var ul = u.ae(new_month, "ul", {"class":"weekdays"});
			for(i = 1; i <= 7; i++) {
				day = u.ae(ul, "li", {"class":"weekday", "html":u.txt["weekday-"+i+"-abbr"]});
			}

			var ul = u.ae(new_month, "ul", {"class":"month"});

			var date_in_prev_month, date;
			var weekday_counter = 1;
			for(i = 1; i < first_weekday; i++) {
				date_in_prev_month = last_day_last_month + 1 + (i - first_weekday);
				day = u.ae(ul, "li", {"class":"empty"});
				u.ae(day, "span", {"html":date_in_prev_month});

				if(weekday_counter%7 == 0 || weekday_counter%7 == 6) {
					u.ac(day, "weekend");
				}

				weekday_counter++;
//				console.log(this.events);
//				console.log(new Date(year, month-2, date_in_prev_month).getTime())

				date = u.date("Y-m-d", new Date(year, month-2, date_in_prev_month).getTime());
//				u.bug("date:" + date)

				if(this.events[date]) {
					for(j = 0; event = this.events[date][j]; j++) {
						this.insertEvent(day, event);
					}
				}
			}

			for(i = 1; i <= last_day; i++) {
				day = u.ae(ul, "li", {"class":"day"});
				u.ae(day, "span", {"html":i});


				day.date = i < 10 ? "0"+i : i;
				day.month = new_month;


				date = u.date("Y-m-d", new Date(year, month-1, i).getTime());
//				u.bug("date:" + date)
				if(this.events[date]) {

					for(j = 0; event = this.events[date][j]; j++) {
						this.insertEvent(day, event, year, month);
					}

				}

	// 			u.ce(day);
	// 			day.clicked = function() {
	// 				u.bug("day clicked")
	// 			}

				if(this.now.year == year && this.now.month == month && this.now.date == i) {
					u.ac(day, "today");
				}


				if(weekday_counter%7 == 0 || weekday_counter%7 == 6) {
					u.ac(day, "weekend");
				}
				weekday_counter++;
			}
			// fill up with next month
			if((weekday_counter-1)%7) {
				i = 1;
				while((weekday_counter-1)%7) {
					day = u.ae(ul, "li", {"class":"empty"});
					u.ae(day, "span", {"html":i++});

					if(weekday_counter%7 == 0 || weekday_counter%7 == 6) {
						u.ac(day, "weekend");
					}
					weekday_counter++;
				}

			}

			return new_month;
		}

		scene.insertEvent = function(day, event, year, month) {

			var h3 = u.ae(day, u.qs("h3", event).cloneNode(true));
			u.ie(h3, "a", {"html":u.date("H:i", event.date.getTime())});

		}

		// get first day of month as 1-7 (mon-sun)
		scene.getFirstWeekdayOfMonth = function(year, month) {

	//		u.bug("getFirstDayOfMonth:" + year + ", " + month)
			var first_day = new Date(year, month-1).getDay();
	//		u.bug("first_day:" + first_day);
			if(first_day == 0) {
				return 7;
			}
			else {
				return first_day;
			}
			// dateObj = new Date(year, month, date[, hours[, minutes[, seconds[,ms]]]]) 
		}

		scene.getLastDayOfMonth = function(year, month) {

			var date = 28;
			var test_date = new Date(year, month-1, date);
			while(month == test_date.getMonth()+1) {
				date++;
				test_date.setDate(date);
			}
			return date-1;
		}


		// scene is ready
		scene.ready();
	}
}