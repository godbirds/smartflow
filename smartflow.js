var that = null;
function SmartFlow(docObj){
	that = this;
	this.obj = docObj;
	this.version="0.1.1";
	this.author="motry.net";
	this.license="www.motry.net";
	this.NodeArrays=new Array();
	this.RelationArray=new Array();
	/**
	 * 组件状态，可用节点中的属性status根据需求动态设置
	 */
	this.Status={
		active:"#1E90FF",
		default:"#E8E8E8",
		success:"#00CD66",
		warning:"#FFFF00",
		forbidden:"#B5B5B5",
		fail:"#FF6A6A",
		/**
		 * Status 传递键获取值
		 * @param {Object} t
		 */
		getValue:function(t){
			var value = this[t];
			if(value == null || value=='' || value=='undefined'){
				return this['default'];
			}
			return value;
		}
	};
	/**
	 * 默认配置
	 */
	this.DefaultConfig={
		width:150,//组件宽度，可随需求修改
		height:80,//组件高度，不建议修改
		space:50, //组件间隙，可随需求修改
		direction:'horizontal',//组件方向：水平-horizontal 垂直-vertical
		viewHeight:'900px',//组件视图高度
		viewWidth:'1200px',//组件视图宽度
		viewBackground:"#CFCFCF",//组件视图背景，可调用setViewBackground设置
		strokeColor:"#363636",   //组件线条颜色，可调用setViewBackground设置
		strokeWidth:"1",//组件线条宽度
		fontSize:'12px',//组件字体大小
		fontColor:"#363636",//组件字体颜色
		startX:50,//默认开始位置X，可调用setStart设置
		startY:20 //默认开始位置Y，可调用setStart设置
	};
	/**
	 * 设置开始位置
	 * @param {Object} y
	 * @param {Object} x
	 */
	this.setStart=function(x,y){
		this.DefaultConfig.startX = x;
		this.DefaultConfig.startY = y;
	}
	/**
	 * 设置方向：水平-horizontal 垂直-vertical
	 * @param {Object} direction
	 */
	this.setDirection=function(direction){
		this.DefaultConfig.direction = direction;
	}
	/**
	 * 设置视图背景颜色
	 * @param {Object} background
	 */
	this.setViewBackground=function(background){
		this.DefaultConfig.viewBackground=background;
	}
	/**
	 * 组件线条颜色
	 * @param {Object} color
	 */
	this.setStrokeColor=function(color){
		this.DefaultConfig.strokeColor=color;
	}
	this.callback = null;
	this.onClick=function(callback=function(status,svg,data){}){
		this.callback = callback;
	};
	/**
	 * 需要自定义组件可在此方法中添加
	 * @param {Object} rtype
	 * @param {Object} node
	 * @param {Object} anty
	 * @param {Object} antx
	 */
	this.getGraphical=function(node,antx,anty){
		var rtype = node.type;
		var rtv = "NOT SUPPORT "+rtype;
		var status = this.Status.getValue(node.theme);
		var txtStyle = "font-size:"+this.DefaultConfig.fontSize
			+";fill:"+this.DefaultConfig.fontColor
			+";size:"+this.DefaultConfig.fontSize;
		var style = this.getStyle(node);
		//react 图形
		if(rtype == 'react'){
			rtv = "";
			var txt1 = node.title,
			txt2=node.subtitle,
			txt3=node.text,
			txt4=node.describe,
			txt5=node.remark;
			var space_interval = 5;//文字行等分
			var bottom_height_sub = 20;//上下框的差值
			var theight = this.DefaultConfig.height/2;
			var ltxt1 = this.getPXLength(txt1).width;
			var ltxt2 = this.getPXLength(txt2).width;
			var ltxt3 = this.getPXLength(txt3).width;
			var ltxt4 = this.getPXLength(txt4).width;
			var ltxt5 = this.getPXLength(txt5).width;
			var maxwd = Math.max.call(null,ltxt1,ltxt2,ltxt3,ltxt4,ltxt5);
			var avgwd = Math.abs(this.DefaultConfig.width-(ltxt1+ltxt2+ltxt3+ltxt4+ltxt5)/space_interval);
			MAX_WIDTH = this.DefaultConfig.width;
			console.log("this.DefaultConfig.width"+this.DefaultConfig.width+",MAX_WIDTH="+MAX_WIDTH);
			var txt1x = antx+(MAX_WIDTH-avgwd)/bottom_height_sub;
			var txt2x = antx+(MAX_WIDTH-avgwd)/bottom_height_sub;
			var txt3x = antx+(MAX_WIDTH-avgwd)/bottom_height_sub;
			var txt4x = antx+(MAX_WIDTH-avgwd)/bottom_height_sub;
			var txt5x = antx+(MAX_WIDTH-avgwd)/bottom_height_sub;
			var dataset = encodeURIComponent(JSON.stringify(node));
			var vspace1 = this.DefaultConfig.height/space_interval;
			var vspace2 = (this.DefaultConfig.height/2+bottom_height_sub)/3.5;
			var mouse = "onclick=onClick('"+status+"',this,that) onmouseover=onMouseOver('"+status+"',this) onmouseout=onMouseOut('"+status+"',this)";
			rtv+="<svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='100%' id='"+node.id+"' "+mouse+" data-set="+dataset+">";
			rtv+="<rect x='"+antx+"' y= '"+anty+"' width='"+MAX_WIDTH+"' height='"+theight+"' style='"+style+"'/>";
			rtv+="<text x='"+txt1x+"' y='"+(anty+vspace1*1)+"' style='"+txtStyle+"'>"+txt1+"</text>";
			rtv+="<text x='"+txt2x+"' y='"+(anty+vspace1*2)+"' style='"+txtStyle+"'>"+txt2+"</text>";
			rtv+="<rect x='"+antx+"' y= '"+(anty+theight)+"' width='"+MAX_WIDTH+"' height='"+(theight+bottom_height_sub)+"' style='"+style+"'/>";
			rtv+="<text x='"+txt3x+"' y='"+(anty+theight+vspace2*1)+"' style='"+txtStyle+"'>"+txt3+"</text>";
			rtv+="<text x='"+txt4x+"' y='"+(anty+theight+vspace2*2)+"' style='"+txtStyle+"'>"+txt4+"</text>";
			rtv+="<text x='"+txt5x+"' y='"+(anty+theight+vspace2*3)+"' style='"+txtStyle+"'>"+txt5+"</text>";
			rtv+="</svg>";
			return rtv;
		}
	};
	this.getStyle=function(node){
		var style="stroke:"+this.DefaultConfig.strokeColor+";stroke-width:"+this.DefaultConfig.strokeWidth+";";
		var status = this.Status.getValue(node.theme);
		if(status){
			style+="fill:"+status;
		}else{
			style+="stroke:#E8E8E8";
		}
		return style;
	};
	this.getPXLength=function(html){
		let dom = document.createElement('div');
		dom.style.display = 'inline-block';
		dom.style.overflow= 'auto';
		dom.style.fontSize= 10;
		dom.textContent = html;
		document.body.appendChild(dom);
		let width = dom.clientWidth ;
		let height = dom.clientHeight ;
		document.body.removeChild(dom);
		dom = null;
		return {width:width,height:height};
	};
	/**
	 * 垂直构造节点
	 * @param {Object} node
	 * @param {Object} anty
	 * @param {Object} antx
	 */
	var INDEX_H = this.DefaultConfig.startX;
	var INDEX_V = this.DefaultConfig.startY;
	var ALL_SIZE= 0,MAX_WIDTH=this.DefaultConfig.width;
	this.convertV=function(node,antx,anty){
		var rtv="";
		if(node == null || node=='' || node=='undefined'){
			return "";
		}
		var theight = this.DefaultConfig.height/2;
		INDEX_V = anty+this.DefaultConfig.height+theight;
		rtv += this.getGraphical(node,antx,anty);
		if(node.children != null && node.children != 'undefined' && node.children.length > 0){
			var ly1 = anty+this.DefaultConfig.height+20;
			var lx1 = antx+this.DefaultConfig.width/2;
			var _antx = antx+this.DefaultConfig.width+this.DefaultConfig.space;
			for(var j=0; j < node.children.length;j++){
				var tnode = node.children[j];
				var ly2 = INDEX_V+this.DefaultConfig.space-10;
				var lx2 = _antx-7;
				var lzx = lx1;
				var lzy = ly2;
				var trtv = this.convertV(tnode,_antx,INDEX_V);
				if(j < node.children.length-1){
					INDEX_V = INDEX_V+theight+this.DefaultConfig.space;
				}
				if(trtv != ''){
					rtv += trtv;
					rtv +="<polyline points=\""+lx1+","+ly1+" "+lzx+","+lzy+" "+lx2+","+ly2+"\" style=\"fill:none;stroke:"+this.DefaultConfig.strokeColor+";stroke-width:"+this.DefaultConfig.strokeWidth+"\" marker-end='url(#markerArrow)'/>";
				}
			}
			
		}else{
			INDEX_V = anty+this.DefaultConfig.space;
		}
		return rtv;
	};
	/**
	 * 水平构造节点
	 * @param {Object} node
	 * @param {Object} anty
	 * @param {Object} antx
	 */
	this.convertH=function(node,antx,anty){
		var rtv="";
		if(node == null || node=='' || node=='undefined'){
			return "";
		}
		INDEX_H = antx;
		rtv += this.getGraphical(node,antx,anty);
		if(node.children != null && node.children != 'undefined' && node.children.length > 0){
			var ly1 = anty+this.DefaultConfig.height+20;
			var lx1 = antx+Math.max.call(null,MAX_WIDTH,this.DefaultConfig.width)/2;
			var _anty = anty+this.DefaultConfig.height+this.DefaultConfig.space;
			for(var j=0; j < node.children.length;j++){
				var tnode = node.children[j];
				var lx2 = INDEX_H+Math.max.call(null,MAX_WIDTH,this.DefaultConfig.width)/2;
				var ly2 = _anty-7;
				var lzx = ly1+(ly2-ly1)/2;
				var lzy = ly2-(ly2-ly1)/2;
				var trtv = this.convertH(tnode,INDEX_H,_anty);
				if(j < node.children.length-1){
					INDEX_H = INDEX_H+this.DefaultConfig.width+10;
				}
				if(trtv != ''){
					rtv += trtv;
					rtv +="<polyline points=\""+lx1+","+ly1+" "+lx1+","+lzx+" "+lx2+","+lzy+" "+lx2+","+ly2+"\" style=\"fill:none;stroke:"+this.DefaultConfig.strokeColor+";stroke-width:"+this.DefaultConfig.strokeWidth+"\" marker-end='url(#markerArrow)'/>";
				}
			}
			
		}else{
			INDEX_H = antx+this.DefaultConfig.space;
		}
		return rtv;
	};
	this.buildFlow=function(){
		var rtv="";
		var antx = this.DefaultConfig.startX;
		var anty = this.DefaultConfig.startY;
		var tnode = this.NodeArrays[0];
		if(this.DefaultConfig.direction == 'vertical'){
			rtv += this.convertV(tnode,antx,anty);
		}else if(this.DefaultConfig.direction == 'horizontal'){
			rtv += this.convertH(tnode,antx,anty);
		}else{
			rtv = "<div style='height:200px' align='center'><h3 style='color:red'>NOT SUPPORT DIRECTION:"+this.DefaultConfig.direction+"</h3></div>";
		}
		return rtv;
	};
	this.show=function(){
		var svghtml = this.buildFlow();
		var haw = this.getPXLength(svghtml);
		var height = haw.height+"px";//自动调整高度
		var width =  haw.width+"px"; //自动调整宽度
		//console.log("SmartFlow.show direction : "+this.DefaultConfig.direction);
		if(this.DefaultConfig.direction == 'horizontal'){
			width =  "2000%";
			height = this.DefaultConfig.viewHeight;
		}else if(this.DefaultConfig.direction == 'vertical'){
			width =  "100%";
		}else{
			obj.innerHTML= svghtml;
			return ;
		}
		var html = "";
		//console.log("html.div[width: "+width+";height: "+height+"]");
		html = "<div style='width: "+width+";height: "+height+";background: "+this.DefaultConfig.viewBackground+";overflow-x:auto;overflow-y:hidden'>";
		html += "<?xml version='1.0' standalone='no'?><svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' >";
		html += "<defs><marker id='markerArrow' markerWidth='13' markerHeight='13' refx='2' refy='6' orient='auto'><path d='M2,2 L2,11 L10,6 L2,2' style='fill:"+this.DefaultConfig.strokeColor+"' /></marker></defs>";
		html += svghtml+"</svg>";
		html += "</div>";
		//console.log(html);
		obj.innerHTML= html;
		html = null;
		svghtml = null;
	};
	this.setChildren=function(pNode,nodes){
		pNode.children=nodes;
	};
	this.getChildren=function(node){
		return node.children;
	}
	this.setNodes=function(nodes){
		this.NodeArrays = nodes;
	};
	this.getNodes=function(){
		return this.NodeArrays;
	};
};
SmartFlow.prototype.getDateTime=function() {
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	var currentTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
	return currentTime;
}

function onClick(status,svg,that){
	if(that.callback != null && (typeof that.callback == 'function')){
		var data = svg.getAttribute('data-set');
		if(data != null && data != 'undefined'){
			data = decodeURIComponent(data);
			var dataObj = (new Function("return " + data))();
			that.callback(status,svg,dataObj);
			dataObj = null;
			data = null;
		}
	}
}

function onMouseOver(status,node){
	node.style['stroke-width'] = 0;
	for(var i=0;i<node.childNodes.length;i++){
		var tnode = node.childNodes[i];
		if(tnode.nodeName=="rect"){
			tnode.style['fill']="#E8E8E8";
			tnode.style['stroke']="#1E90FF";
		}
		if(tnode.nodeName=='text'){
			tnode.style['stroke']="#FFFF00";
		}
	}
}
function onMouseOut(status,node){
	node.style['stroke-width'] = 0;
	for(var i=0;i<node.childNodes.length;i++){
		var tnode = node.childNodes[i];
		if(tnode.nodeName=="rect"){
			tnode.style['fill']=status;
			tnode.style['stroke']="#363636";
		}
		if(tnode.nodeName=='text'){
			tnode.style['stroke']="#363636";
		}
	}
}