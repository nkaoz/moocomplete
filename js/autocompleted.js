var simpleAutocompled = new Class({
	Implements: [Options, Events],
	options: {
		maxLines:5,
		minValueLength:3,
		idContentList:'list-content',
		urlPath:"data.php",
		typeMethod: 'get',
		parameter:'search'
	},
	initialize: function(el, options) {
		this.setOptions(options);
		this.input = el;
		this.input.addEvent("keyup",this.show.bind(this));
	},
	show: function(e){
		this.contentAutoComplete = document.body.getElement('div#'+this.options.idContentList);
		
		console.log(this.contentAutoComplete);
		
		this.sVal = this.input.get('value').trim();
		if(e.key != "esc" && this.sVal.length >= this.options.minValueLength){
			var json = new Request.JSON({ 
				url: this.options.urlPath, 
				method: this.options.typeMethod, 
				data:{"search":this.sVal},
				onComplete:function(data){				
					if(data != undefined){
					 	this.size = this.input.getSize();
						this.position = this.input.getPosition();
						if(data.length < this.lines ) this.lines = data.length;
						if(this.contentAutoComplete == null){
							this.contentAutoComplete = new Element('div', {'id':this.options.idContentList,styles:{'width':this.size.x - 2,'height':this.size.y * this.lines,'top':this.position.y + this.size.y + 1,'left':this.position.x}});
						}else{
							this.contentAutoComplete.set("html","");
						}
						var ul = new Element('ul',{"id":"listAutoComplete"});	
						data.each(function(row){
							var shtml = row.titulo.replace(this.sVal,"<span>" + this.sVal + "</span>");
							var li = new Element('li',{'html':shtml});
							li.inject(ul);
							li.addEvent("click",function(el){
								var val = el.target.get('text');
								this.input.set("value",val);
								this.contentAutoComplete.destroy();
							}.bind(this));
						}.bind(this));
						ul.inject(this.contentAutoComplete);
						this.contentAutoComplete.inject(document.body); 			
					}else{
						if(this.contentAutoComplete != null) this.contentAutoComplete.destroy();
					}
				}.bind(this)}).send();
		}else{
			if(this.contentAutoComplete != null) this.contentAutoComplete.destroy();
		}
	}
})