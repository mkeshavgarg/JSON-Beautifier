
(function(){

	var jf = {
		init: function() {
			var self = this;

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
					var jsonString = jsonString.replace((/([\w]+)(:)/g), "\"$1\"$2");
					var jsonString = jsonString.replace((/'/g), "\"");
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
			alert('hi thereee');
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
			alert('hi there');
			
			self.printJson(json);
		},
		printJson: function (inp) {
			$('.textarea').animate({height: '19px'}, 1000);
			document.getElementsByClassName('result-json')[0].appendChild(document.createElement('pre')).innerHTML = inp;
			$('.result-json, pre').animate({height: '270px'}, 1000);
		}
	}

jf.init();

})()
