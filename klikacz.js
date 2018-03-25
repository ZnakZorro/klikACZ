
"use strict";
const $=(y)=>document.querySelector(y);
const $$=(y)=>document.querySelectorAll(y);
	
	function ajxPOST(url,key,val,callback){
		let opt = {
			headers: {
				"Accept": "text/plain",
				"Content-Type": "application/x-www-form-urlencoded"
			},
			method: "POST",
			body : key+"/"+val		
		};	
		let u = url+'/'+key+'/'+val; 
		fetch(u,opt)
		.then(function(e){return e.json()})
		.then(function(json){
			if(json){
			callback(json[0]);
		}
		}).catch(function(err) {
			console.log(err.toString());
		});
	}
	
	
	// arrow functions
	class Klikacz {
		
		constructor(url,selector) {
			$$(selector+' button').forEach(el => {
				el.addEventListener("click", (e) => { this.onClick(e); });
			});
			this.radioUrl = url;
			this.getInfo();
			let that = this;
			setInterval(function(){that.getInfo()},30000);
		}
		
		onClick(evt) {
			this.graj(evt.target);
		}		

		getInfo(){ajxPOST(this.radioUrl,'radio','info',this.opiszRadio);}
		
		graj(to){
			let info = to.dataset.info;
			let radio = to.dataset.val;
			//console.log(info,radio);
			ajxPOST(this.radioUrl,info,radio,this.opiszRadio);
			this.opisz(to);
		}
		
		opiszRadio(obj){
			console.log(obj);
			console.log(obj.active,obj.vol,obj.title);
			if (obj.type==='playlist'){
				$('#info').innerHTML = obj.type+', #'+obj.actualPlaylist+'%';
				console.log(obj.playlist);
			}
			else {
				$('#info').innerHTML = obj.type+', #'+obj.active+', = '+obj.title+', '+obj.vol+'%\n';
			}
		}
		
		opisz(to){
			$('#info').innerHTML += to.textContent+' = '+to.dataset.info+'<br />\n';
		}
	 
		installRadioButtons(selector,from,to,jump=1,info='radio',title='Radio'){
			console.log(selector,from,to);
			let sel = $(selector);
			let html = '\n<div class="div-'+info+'">\n<h3>'+title+'</h3>\n';
			for (let b=from; b<=to; b+=jump){
				let c=b%19;
				html += '\t<button class="btn-'+info+'-'+b+' c'+c+'" data-info="'+info+'" data-val="'+b+'">'+title+' '+b+'</button>\n';
			}
			html +='</div>\n';
			
			sel.innerHTML += html;
			$$(selector+' button').forEach(el => {
				el.addEventListener("click", (e) => { this.onClick(e); });
			});
			
			
		}
	}
