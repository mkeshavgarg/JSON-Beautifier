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

			document.querySelector('.message-box .close').addEventListener('click', function() {
				self.closeMessageBox();
			})

			document.querySelector('textarea').addEventListener('click', function() {
				self.editJson();
			})

			document.querySelector('.header img').addEventListener('click', function() {
				var $this = $(this);
				if ($this.hasClass('expand')){
					$this.removeClass('expand');
					$('body').removeClass('expand');
					this.src = 'max.png'
				} else{
					$this.addClass('expand');
					$('body').addClass('expand');
					this.src = 'min.png'
				}
			})

			// Read it using the storage API
		    // chrome.storage.sync.get('jsondata', function(items) {
		    //   //message('Settings retrieved', items);
		    //   document.getElementsByTagName('pre')[0].innerHTML = items;
		    // });
		    document.querySelector('.textarea').innerHTML = (localStorage.length && localStorage['jsondata']) || '';
			
		},
		getJson: function() {
			json = document.getElementsByClassName('textarea')[0].value;
			return json;
		},
		stringToJson: function(jsonString) {
			var json;
			try {
					//var jsonString = jsonString.replace(/([\w]+)(\s*:[^\/])/g, "\"$1\"$2");
					var jsonString = jsonString.replace(/'/g, "\"");
					json = JSON.parse(jsonString);
					localStorage['jsondata'] = jsonString;
					document.querySelector('.textarea').innerHTML = localStorage.length && localStorage['jsondata'];
					
					// chrome.extension.sendMessage(oobj, function(response) {
		   //              if(response.success) console.log("Saved successfully");
		   //              else console.log("There was an error while saving")
		   //          });
		   // chrome.storage.sync.get(['jsondata'], function(items) {
				 //      //message('Settings retrieved', items);
				 //      console.log('------' + str(items))
				 //    });
				 //    chrome.storage.sync.set({"jsondata" : json}, function() {
				 //      console.log('Settings saved');
				 //    });
				 //    chrome.storage.sync.get(['jsondata'], function(items) {
				 //      //message('Settings retrieved', items);
				 //      document.getElementsByTagName('pre')[0].innerHTML = items;
				 //    });



				    
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
                    $('.result-json').animate({height: '100%'}, 1000);
            } else {
                document.getElementsByTagName('pre')[0].innerHTML = json;
            }
            document.getElementsByClassName('edit')[0].disabled = false;
		},
		editJson: function() {
			$('.result-json').animate({height: 0}, 1000, function() {
				$(this).find('pre').remove();
			});
			$('.message-box').css({'opacity': 0});
			$('.textarea').attr({readOnly: false}).animate({height: '300px'}, 1000, function() {
				document.getElementsByClassName('edit')[0].disabled = true;
			});

		},
		printError: function() {
			$('.textarea').attr({readOnly: true});		
			$('.message-box').css({'opacity': 1});
		},
		closeMessageBox: function() {
			$('.textarea').attr({readOnly: false});
			$('.message-box').css({'opacity': 0});	
		}
	}

jf.init();

})()
