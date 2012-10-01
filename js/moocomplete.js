var moocomplete = new Class({
	Implements: [Options, Events],
	options: {
		maxLines:5,
		minValueLength:3,
		idContentList:'list-content',
		urlPath:"data.php",
		typeMethod: 'get',
		parameter:'search',
		data:[{'id':1,'title':'peru'},{'id':2,'title':'Ecuador'},{'id':3,'title':'Colombia'},{'id':4,'title':'Brasil'}]
	},
	initialize: function(el, options) {
		this.setOptions(options);
		this.input = el;
		this.input.addEvent("keyup",this.show.bind(this));
	},
	show: function(e){
		this.contentAutoComplete = $(document.body).getElement('div#'+this.options.idContentList);	
		this.sVal = this.input.get('value').trim();
		if(e.key != "esc" && this.sVal.length >= this.options.minValueLength){
			this.send();
		}else{
			if(this.contentAutoComplete != null) this.contentAutoComplete.destroy();
		}
	},
	send:function(){
		var json = new Request.JSON({
						url: this.options.urlPath,
						method: this.options.typeMethod,
						data:{"search":this.sVal},
						onComplete:this.getData()
		}).send();
	},
	
	getData:function(data){	
		if(data == undefined) data = this.options.data;
		this.size = this.input.getSize();
		this.position = this.input.getPosition();
		if(data.length < this.lines ) this.lines = data.length;
		if(this.contentAutoComplete == null){
			this.contentAutoComplete = new Element('div', {'id':this.options.idContentList,styles:{'width':this.size.x - 2,'height':this.size.y * this.lines,'top':this.position.y + this.size.y + 1,'left':this.position.x}});
		}else{
			this.contentAutoComplete.empty();
		}
		var ul = new Element('ul',{"id":"listAutoComplete"});	
		data.each(function(row){
			var shtml = row.title.replace(this.sVal,"<span>" + this.sVal + "</span>");
			var li = new Element('li',{'html':shtml});
			//li.addEvent("click",item());
			li.inject(ul);
		});
		ul.inject(this.contentAutoComplete);
		this.contentAutoComplete.inject(document.body);
	},
	
	item:function(){
	
		console.log(this);
		/* var val = el.target.get('text');
		this.input.set("value",val);
		this.contentAutoComplete.destroy(); */
	
	}
	
	
	
})