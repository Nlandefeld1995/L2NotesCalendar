var alertsData = [];
var carduiData = [];
var connectorData = [];
var dataflowData = [];
var dataqueryData = [];
var workbenchData = [];
var otherData = [];

var calendar = {
	events: {
		alerts: {
			events: [],
			className: ['event', 'alerts'],
			allDayDefault: true
		},
		connector: {
			events: [],
			className: ['event', 'connector'],
			allDayDefault: true
		},
		cardui: {
			events: [],
			className: ['event','cardui'],
			allDayDefault: true
		},
		dataflow: {
			events: [],
			className: ['event', 'dataflow'],
			allDayDefault: true
			// rendering: 'background'
		},
		dataquery: {
			events: [],
			className: ['event','dataquery'],
			allDayDefault: true
		},
		workbench: {
			events: [],
			className: ['event','workbench'],
			allDayDefault: true
		},
		other: {
			events: [],
			className: ['event','other'],
			allDayDefault: true
		},
		bla: {
			events: [],
			className: ['event','bla'],
			allDayDefault: true
		}

	},
	eventsOnView : [],
	fetching: false,
	getalertsEvents: function() {	
		calendar.events.alerts.events = alertsData;
	},
	getdataflowEvents: function() {
		calendar.events.dataflow.events = dataflowData;
	},
	getconnectorEvents: function() {
		calendar.events.connector.events = connectorData;
	},
	getcarduiEvents: function() {
		calendar.events.cardui.events = carduiData;
	},
	getdataqueryEvents: function() {
		calendar.events.dataquery.events = dataqueryData;
	},
	getworkbenchEvents: function() {
		calendar.events.workbench.events = workbenchData;
	},
	getotherEvents: function() {
		calendar.events.other.events = otherData;
	},
	closeCard: function(){
		$('.card').css({'opacity': 0, 'transform': 'scale(0.8) rotateY(0deg)'});
		setTimeout(function(){
			$('.card-wrapper').css({'display': 'none'});
			$('.back-panel .event-loader').show();
			$('.back-panel .event-detail').hide();
		}, 300);
	},
	fetchEvents: function(){
		calendar.eventsOnView = [];
		// CHECK FILTERS
		var includealerts = $('#filter-alerts').prop('checked'),
			includecardui = $('#filter-cardui').prop('checked'),
			includeconnector = $('#filter-connector').prop('checked'),
			includedataflow = $('#filter-dataflow').prop('checked'),
			includedataquery = $('#filter-dataquery').prop('checked'),
			includeworkbench = $('#filter-workbench').prop('checked'),
			includeother = $('#filter-other').prop('checked');

		// [[TODO]] ADD QUERY FOR EMPLOYEE/DEPARTMENT SEARCH

		if (includealerts) {
			calendar.getalertsEvents();
			calendar.eventsOnView.push(calendar.events.alerts);
		};

		if (includecardui) {
			calendar.getcarduiEvents();
			calendar.eventsOnView.push(calendar.events.cardui);
		};

		if (includeconnector) {
			calendar.getconnectorEvents();
			calendar.eventsOnView.push(calendar.events.connector);
		};

		if (includedataflow) {
			calendar.getdataflowEvents();
			calendar.eventsOnView.push(calendar.events.dataflow);
		};
		if (includedataquery) {
			calendar.getdataqueryEvents();
			calendar.eventsOnView.push(calendar.events.dataquery);
		};
		if (includeworkbench) {
			calendar.getworkbenchEvents();
			calendar.eventsOnView.push(calendar.events.workbench);
		};
		if (includeother) {
			calendar.getotherEvents();
			calendar.eventsOnView.push(calendar.events.other);
		};
		calendar.render();
	},
	listEvents: function(type, entries, date) {
		if (!calendar.fetching) {		
			calendar.fetching = true;

			$('.front-panel .event-loader').show();
			$('.front-panel .entries').html('');
			// 	FOR NOW PLACED INSIDE setTimeout to simulate ajax fetching. SHOULD be replaced by actual fetching of data.
			setTimeout(function(){
				for (var i = 0; i < entries.length; i++) {
					var avatar = entries[i].avatar || 'https://app-a.salarium.com/assets/img/placeholder.png';
					var entryTemplate = 
					'<div class="entry" data-type="'+ type +'" data-id="'+ entries[i].id +'" data-date="'+ date +'">' +
						'<img src="' + avatar + '" class="entry-image img-circle" />' +
						'<div class="entry-details">' +
							'<p class="entry-name">' + entries[i].name + '</p>' +
							'<p class="entry-status">' + entries[i].status + '</p>' +
						'</div>' +
					'</div>';

					$('.front-panel .entries').append(entryTemplate);
				};
				$('.front-panel .event-loader').hide();
				calendar.fetching = false;
			}, 1200);
		};
	},
	showDetail: function(type, date, id, title, comment) {
		$('.back-panel .event-detail').hide();
		$('.back-panel .event-loader').show();

		$('.event-detail').attr('data-type', type);
		
		$('.back-panel .emp-name').html(title);
		$('.back-panel .text-box1').html(comment);
		$('.back-panel .event-date').html(date);

		setTimeout(function(){
			$('.back-panel .event-loader').hide();
			$('.back-panel .event-detail').show();
		}, 1200);
	},
	render: function() {
		$('#calendar').fullCalendar( 'destroy' );
		$('#calendar').fullCalendar({
			eventClick: function(calEvent, jsEvent, view) {
				var target = $(jsEvent.currentTarget);
				var parent = $(jsEvent.currentTarget).parent();
				$('.card-wrapper').css({
					top: parent.offset().top + 2,
					left: target.offset().left + parent.width() + 4,
					display: 'block'
				});
				// IF MULTIPLE ENTRIES
				if (calEvent.entries.length > 1) {
					// GENERATE CARD TITLE
					var eventTitle = '';
					switch (calEvent.eventType) {
						case 'alerts':
							eventTitle = '<span class="alerts">alerts</span>';
							break;
						case 'cardui':
							eventTitle = '<span class="cardui">cardui</span>';
							break;
						case 'connector':
							eventTitle = '<span class="connector">connector</span>';
							break;
						case 'dataflow':
							eventTitle = '<span class="dataflow">dataflow</span>';
							break;
						case 'dataquery':
							eventTitle = '<span class="dataquery">dataquery</span>';
							break;
						case 'workbench':
							eventTitle = '<span class="workbench">workbench</span>';
							break;
						case 'other':
							eventTitle = '<span class="other">other</span>';
							break;
					}
					// Update Card Titles
					var eventDate = calEvent.start._i;
					$('.front-panel .event-title').html(eventTitle);
					$('.front-panel .event-date').html(moment(eventDate).format("dddd, MMMM Do YYYY"));
					// Generate Event List
					calendar.listEvents(calEvent.eventType, calEvent.entries, eventDate);
					$('.card').css({'opacity': 1, 'transform': 'scale(1) rotateY(0deg)'});
				} else {
					// IF SINGLE ENTRY
					calendar.showDetail(calEvent.eventType, moment(calEvent.start._i).format("dddd, MMMM Do YYYY"), calEvent.entries[0].id, calEvent.entries[0].name,calEvent.entries[0].comment);
					$('.card').css({'opacity': 1, 'transform': 'scale(1) rotateY(180deg)'});
					// $('.card').css({'transform': ''});
				};
			},
			eventLimit: 5,
			header: {
				left: 'title',
				center: '',
				right: 'prev, today, next'
			},
			eventSources: calendar.eventsOnView
		});
	}
}

$(document).ready(function() {
	// INITIALIZE SIDEBAR FILTER FOR CALENDAR
	$(".sidebar.left").sidebar();
	get_data();
	// GENERATE CALENDAR EVENTS
	calendar.fetchEvents();

	// BIND EVENTS
	$('#sidebar-toggle').on('click', function(){
		$(".sidebar.left").trigger("sidebar:toggle").toggleClass('filter-shadow');
	});

	$('.sidebar label > input').on('change', function(){
		calendar.closeCard();
		calendar.fetchEvents();
	});

	$('#calendar').on('click', function(event) {
		if (!$(event.target).closest(".event").length) {
			calendar.closeCard();
		}
	});

	$('.entries').on('click', '.entry', function(){
		$('.card').css({'transform': 'rotateY(180deg)'});
		var date = $(this).attr('data-date'),
			id = $(this).attr('data-id'),
			comment = $(this).attr('comment'),
			title =$(this).attr('name');
		calendar.showDetail(type, moment(date).format("dddd, MMMM Do YYYY"), id, title, comment);
	});
});

(function () {
    var burger1;
    burger1 = document.querySelector('.burger1');
    burger1.addEventListener('click', function () {
        return burger1.classList.toggle('on');
    });
}.call(this));

