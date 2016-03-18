(function(){

	var jf = {
		init: function() {
			var self = this;

			document.getElementsByClassName('edit')[0].addEventListener('click', function() {
				self.editJson();
			})

			document.getElementsByClassName('format')[0].addEventListener('click', function() {
				json = self.getJson();
				self.jsonWithNoColors(self, json);
			})

			 document.getElementsByClassName('format-with-color')[0].addEventListener('click', function() {
				json = self.getJson();
				self.jsonWithColors(self, json);
			})
		},
		getJson: function() {
			json = document.getElementsByClassName('textarea')[0].value;
			return json;
		},
		stringToJson: function(jsonString) {
			var json;
			try {
					var jsonString = jsonString.replace(/([\w]+)(\s*:[^\/])/g, "\"$1\"$2");
					var jsonString = jsonString.replace(/'/g, "\"");
					json = JSON.parse(jsonString);
				}
			catch(error) {
				 json = null;
			}
			finally {
				return json;
			}
		},
		jsonWithNoColors: function(self, json) {
			var json = self.stringToJson(json);
			if(!json) {
				alert('JSON is not valid');
				return;
			}
			json = JSON.stringify(json, null, 4);
			self.printJson(json);
		},
		jsonWithColors: function (self, json) {
			var json = self.stringToJson(json);
			if(!json) {
				alert('JSON is not valid');
				return;
			}
			json = JSON.stringify(json, null, 4);
			json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
			json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
				function (match) {
					
					var cls = 'number';
					if (/^"/.test(match)) {
						if (/:$/.test(match)) {
							cls = 'key';
						} else {
							cls = 'string';
						}
					} else if (/true|false/.test(match)) {
						cls = 'boolean';
					} else if (/null/.test(match)) {
						cls = 'null';
					}
					return '<span class="' + cls + '">' + match + '</span>';
				});
			
			self.printJson(json);
		},
		printJson: function (json) {
			$('.textarea').attr({disabled: true}).animate({fontSize: '10px', height: '20px'}, 1000);
			if (!document.getElementsByTagName('pre').length) {
                    document.getElementsByClassName('result-json')[0].appendChild(document.createElement('pre')).innerHTML = json;
                    $('pre').animate({height: '258px'}, 1000);
            } else {
                document.getElementsByTagName('pre')[0].innerHTML = json;
            }
            document.getElementsByClassName('edit')[0].disabled = false;
		},
		editJson: function() {
			
			$('pre').animate({height: 0}, 1000, function() {
				$(this).remove();
			});

			$('.textarea').attr({disabled: false}).css( "fontSize", "14px" ).animate({height: '300px'}, 1000, function() {
				document.getElementsByClassName('edit')[0].disabled = true;
			});

		}
	}

jf.init();

})()
