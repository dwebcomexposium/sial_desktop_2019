/**!
 Add Calendar

 Make date of event clickeable for pop a menu for choose where to add the event in a calendar

 @contributors: Guillaume Focheux (Alsacréations), Rodolphe Rimele (Alsacréations)
 @date-created: 2015-04-09
 @last-update: 2015-09-11
 */

;
(function ($) {
	;
	(function (exports) {
		var MS_IN_MINUTES = 60 * 1000;

		var formatTime = function (date) {
			return date.toISOString().replace(/-|:|\.\d+/g, '');
		};

		var calculateEndTime = function (event) {
			return event.end ?
				formatTime(event.end) :
				formatTime(new Date(event.start.getTime() + (event.duration * MS_IN_MINUTES)));
		};

		var calendarGenerators = {
			google: function (event) {
				var startTime = formatTime(event.start);
				var endTime = calculateEndTime(event);

				var href = encodeURI([
					'https://www.google.com/calendar/render',
					'?action=TEMPLATE',
					'&text=' + (event.title || ''),
					'&dates=' + (startTime || ''),
					'/' + (endTime || ''),
					'&details=' + (event.description || ''),
					'&location=' + (event.address || ''),
					'&sprop=&sprop=name:'
				].join(''));
				return '<a class="icon-google" target="_blank" href="' +
					href + '">Google Calendar</a>';
			},
			yahoo: function (event) {
				var eventDuration = event.end ?
					((event.end.getTime() - event.start.getTime()) / MS_IN_MINUTES) :
					event.duration;

				// Yahoo dates are crazy, we need to convert the duration from minutes to hh:mm
				var yahooHourDuration = eventDuration < 600 ?
					'0' + Math.floor((eventDuration / 60)) :
					Math.floor((eventDuration / 60)) + '';

				var yahooMinuteDuration = eventDuration % 60 < 10 ?
					'0' + eventDuration % 60 :
					eventDuration % 60 + '';

				var yahooEventDuration = yahooHourDuration + yahooMinuteDuration;

				// Remove timezone from event time
				var st = formatTime(new Date(event.start - (event.start.getTimezoneOffset() *
					MS_IN_MINUTES))) || '';

				var href = encodeURI([
					'http://calendar.yahoo.com/?v=60&view=d&type=20',
					'&title=' + (event.title || ''),
					'&st=' + st,
					'&dur=' + (yahooEventDuration || ''),
					'&desc=' + (event.description || ''),
					'&in_loc=' + (event.address || '')
				].join(''));

				return '<a class="icon-yahoo" target="_blank" href="' +
					href + '">Yahoo! Calendar</a>';
			},
			ics: function (event, eClass, calendarName) {
				var startTime = formatTime(event.start);
				var endTime = calculateEndTime(event);

				var href = encodeURI(
					'data:text/calendar;charset=utf8,' + [
						'BEGIN:VCALENDAR',
						'VERSION:2.0',
						'BEGIN:VEVENT',
						'URL:' + document.URL,
						'DTSTART:' + (startTime || ''),
						'DTEND:' + (endTime || ''),
						'SUMMARY:' + (event.title || ''),
						'DESCRIPTION:' + (event.description || ''),
						'LOCATION:' + (event.address || ''),
						'END:VEVENT',
						'END:VCALENDAR'].join('\n'));

				return '<a class="' + eClass + '" target="_blank" href="' +
					href + '">' + calendarName + ' Calendar</a>';
			},
			ical: function (event) {
				return this.ics(event, 'icon-ical', 'iCal');
			},
			outlook: function (event) {
				return this.ics(event, 'icon-outlook', 'Outlook');
			}
		};

		var generateCalendars = function (event) {
			return {
				google: calendarGenerators.google(event),
				yahoo: calendarGenerators.yahoo(event),
				ical: calendarGenerators.ical(event),
				outlook: calendarGenerators.outlook(event)
			};
		};


		// Make sure we have the necessary event data, such as start time and event duration
		var validParams = function (params) {
			return params.data !== undefined && params.data.start !== undefined &&
				(params.data.end !== undefined || params.data.duration !== undefined);
		};

		var generateMarkup = function (calendars, clazz, calendarId) {
			var resultHTML = document.createElement('div');

			res = '<label for="checkbox-for-' +
				calendarId + '" class="ac-switcher-label visually-hidden"></label>';
			res += '<input name="ac-switcher" class="ac-switcher" id="checkbox-for-' + calendarId + '" type="checkbox"><ul class="ac-list">';

			Object.keys(calendars).forEach(function (services) {
				res += '<li class="ac-item">' + calendars[services] + '</li>';
			});
			res += '</ul>';
			resultHTML.innerHTML = res;
			resultHTML.className = 'ac-add-to-calendar';
			if (clazz !== undefined) {
				resultHTML.className += (' ' + clazz);
			}

			resultHTML.id = calendarId;
			return resultHTML;
		};

		var getClass = function (params) {
			if (params.options && params.options.class) {
				return params.options.class;
			}
		};

		var getOrGenerateCalendarId = function (params) {
			return params.options && params.options.id ?
				params.options.id :
				Math.floor(Math.random() * 1000000); // Generate a 6-digit random ID
		};

		exports.createCalendar = function (params) {
			if (!validParams(params)) {
				console.log('Event details missing.');
				return;
			}

			return generateMarkup(generateCalendars(params.data),
				getClass(params),
				getOrGenerateCalendarId(params));
		};
	})(this);

	// get Zone addcalendar
	var $addCal = $('.js-add-to-calendar'),
		$the_event = $('[itemtype="http://schema.org/Event"]'),
		$remoteTrigger = $('.ac-js-switcher-remote');
		// get event information
		$startDate = $('meta[itemprop="startDate"]', $the_event).attr('content'),
		$endDate = $('meta[itemprop="endDate"]', $the_event).attr('content'),
		eventAddress = $('[itemprop="addressLocality"]').html() + ' ' + $('.sb-place-spot').html() + ' ' + $('.sb-place-country').html();

	// generate HTML for calendar
	if($the_event.length>0 && $startDate && $endDate) {
		var myCalendar = createCalendar({
			data: {
				title: $('[itemprop="name"]', $the_event).attr('content'), // Event title
				start: new Date($startDate), // Event start date
				duration: 0, // Event duration (IN MINUTES)
				end: new Date($endDate), // You can also choose to set an end time.
				// If an end time is set, this will take precedence over duration
				address: eventAddress
			}
		});

		// add HTML and events to page
		$addCal.append(myCalendar);
		$remoteTrigger.on('click', function (e) {
			$addCal.find('.ac-switcher-label').trigger('click');
			e.stopPropagation();
		});
		$('body').off('click.acswitcher').on('click.acswitcher', function() {
		  $('.ac-switcher').prop('checked',false);
		});
	}

})(jQuery);
