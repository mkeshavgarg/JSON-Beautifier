(function(){

	var jf = {
		init: function() {
			var self = this;

			document.getElementsByClassName('edit')[0].addEventListener('click', function() {
				self.editJson();
			})

			document.getElementsByClassName('beautify')[0].addEventListener('click', function() {
				json = self.getJson();
				self.beautify(json);
			})

			document.getElementsByClassName('beautify-with-color')[0].addEventListener('click', function() {
				json = self.getJson();
				self.beautifyWithColors(json);
			})
			document.querySelector('textarea').addEventListener('click', function() {
				self.editJson();
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
		beautify: function(json) {
			var self = this;
			var json = self.stringToJson(json);
			if(!json) {
				self.printError();
				return;
			}
			json = JSON.stringify(json, null, 4);
			self.printJson(json);
		},
		beautifyWithColors: function (json) {
			var self = this;
			var json = self.stringToJson(json);
			if(!json) {
				self.printError();
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
			$('.textarea').attr({readOnly: true}).animate({height: '50px'}, 1000);
			if (!document.getElementsByTagName('pre').length) {
                    document.getElementsByClassName('result-json')[0].appendChild(document.createElement('pre')).innerHTML = json;
                    $('.result-json').animate({height: '238px'}, 1000);
            } else {
                document.getElementsByTagName('pre')[0].innerHTML = json;
            }
            document.getElementsByClassName('edit')[0].disabled = false;
		},
		editJson: function() {
			$('.result-json').animate({height: 0}, 1000, function() {
				$(this).find('pre').remove();
			});

			$('.textarea').attr({readOnly: false}).animate({height: '300px'}, 1000, function() {
				document.getElementsByClassName('edit')[0].disabled = true;
			});

		},
		printError: function() {
			var messageDiv = document.getElementsByClassName('message')[0];

			messageDiv.innerHTML = 'JSON is not valid';

			$('.message').animate({'marginLeft': '0'}, 500, function() {
				setTimeout(function() {
					$('.message').animate({'marginLeft': '600px'}, 500, function(){$('.message').css({'marginLeft': '-250px'});});
				}, 500)
				
			});
		}
	}

jf.init();

})()
