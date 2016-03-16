
(function(){

	var jf = {
		init: function() {
			var self = this;
			document.getElementsByClassName('validate')[0].addEventListener('click', function() {
				json = self.getJson();
				var message = self.validate(json);
				document.getElementsByClassName('message')[0].innerHTML = message;
			})

			document.getElementsByClassName('format')[0].addEventListener('click', function() {
				json = self.getJson();
				self.jsonWithNoColors(json);
			})

			 document.getElementsByClassName('format-with-color')[0].addEventListener('click', function() {
				json = self.getJson();
				self.jsonWithColors(json);
			})
		},
		getJson: function() {
			json = document.getElementsByClassName('textarea')[0].value;
			return json;
		},
		validate: function(jsonString) {
			var message;
			try {
					var jsonString = jsonString.replace((/([\w]+)(:)/g), "\"$1\"$2");
					var jsonString = jsonString.replace((/'/g), "\"");
					var json = JSON.parse(jsonString);

					message = 'JSON is valid';
				}
			catch(error) {
				 message = 'JSON is not valid';
			}
			finally {
				return message;
			}
		},
		jsonWithNoColors: function(self, json) {
			self.printJson(json);
		},
		jsonWithColors: function (self, json) {
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
		printJson: function (inp) {
			document.getElementsByClassName('message')[0].appendChild(document.createElement('pre')).innerHTML = inp;
		}
	}

jf.init();

})()
