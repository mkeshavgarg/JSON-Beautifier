
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-75247077-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

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
			$('.textarea').animate({height: '19px'}, 1000);
			document.getElementsByClassName('result-json')[0].appendChild(document.createElement('pre')).innerHTML = json;
			$('.result-json, pre').animate({height: '281px'}, 1000);
		}
	}

jf.init();

})()
