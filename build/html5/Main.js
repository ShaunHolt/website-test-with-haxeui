(function ($global) { "use strict";
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	this.r = new RegExp(r,opt.split("u").join(""));
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = "EReg";
EReg.prototype = {
	r: null
	,match: function(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) {
			return this.r.m[n];
		} else {
			throw haxe_Exception.thrown("EReg::matched");
		}
	}
	,matchedPos: function() {
		if(this.r.m == null) {
			throw haxe_Exception.thrown("No string matched");
		}
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchSub: function(s,pos,len) {
		if(len == null) {
			len = -1;
		}
		if(this.r.global) {
			this.r.lastIndex = pos;
			this.r.m = this.r.exec(len < 0 ? s : HxOverrides.substr(s,0,pos + len));
			var b = this.r.m != null;
			if(b) {
				this.r.s = s;
			}
			return b;
		} else {
			var b = this.match(len < 0 ? HxOverrides.substr(s,pos,null) : HxOverrides.substr(s,pos,len));
			if(b) {
				this.r.s = s;
				this.r.m.index += pos;
			}
			return b;
		}
	}
	,split: function(s) {
		var d = "#__delim__#";
		return s.replace(this.r,d).split(d);
	}
	,map: function(s,f) {
		var offset = 0;
		var buf_b = "";
		while(true) {
			if(offset >= s.length) {
				break;
			} else if(!this.matchSub(s,offset)) {
				buf_b += Std.string(HxOverrides.substr(s,offset,null));
				break;
			}
			var p = this.matchedPos();
			buf_b += Std.string(HxOverrides.substr(s,offset,p.pos - offset));
			buf_b += Std.string(f(this));
			if(p.len == 0) {
				buf_b += Std.string(HxOverrides.substr(s,p.pos,1));
				offset = p.pos + 1;
			} else {
				offset = p.pos + p.len;
			}
			if(!this.r.global) {
				break;
			}
		}
		if(!this.r.global && offset > 0 && offset < s.length) {
			buf_b += Std.string(HxOverrides.substr(s,offset,null));
		}
		return buf_b;
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = "HxOverrides";
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
HxOverrides.now = function() {
	return Date.now();
};
var Main = function() { };
$hxClasses["Main"] = Main;
Main.__name__ = "Main";
Main.main = function() {
	var app = new haxe_ui_HaxeUIApp();
	app.ready(function() {
		app.addComponent(new MainView());
		app.start();
	});
};
var haxe_ui_backend_ComponentSurface = function() {
};
$hxClasses["haxe.ui.backend.ComponentSurface"] = haxe_ui_backend_ComponentSurface;
haxe_ui_backend_ComponentSurface.__name__ = "haxe.ui.backend.ComponentSurface";
haxe_ui_backend_ComponentSurface.prototype = {
	__class__: haxe_ui_backend_ComponentSurface
};
var haxe_ui_core_ComponentCommon = function() {
	haxe_ui_backend_ComponentSurface.call(this);
};
$hxClasses["haxe.ui.core.ComponentCommon"] = haxe_ui_core_ComponentCommon;
haxe_ui_core_ComponentCommon.__name__ = "haxe.ui.core.ComponentCommon";
haxe_ui_core_ComponentCommon.__super__ = haxe_ui_backend_ComponentSurface;
haxe_ui_core_ComponentCommon.prototype = $extend(haxe_ui_backend_ComponentSurface.prototype,{
	getTextDisplay: function() {
		return null;
	}
	,hasTextDisplay: function() {
		return false;
	}
	,getTextInput: function() {
		return null;
	}
	,hasTextInput: function() {
		return false;
	}
	,getImageDisplay: function() {
		return null;
	}
	,hasImageDisplay: function() {
		return false;
	}
	,__class__: haxe_ui_core_ComponentCommon
});
var haxe_ui_core_IClonable = function() { };
$hxClasses["haxe.ui.core.IClonable"] = haxe_ui_core_IClonable;
haxe_ui_core_IClonable.__name__ = "haxe.ui.core.IClonable";
haxe_ui_core_IClonable.__isInterface__ = true;
haxe_ui_core_IClonable.prototype = {
	cloneComponent: null
	,self: null
	,__class__: haxe_ui_core_IClonable
};
var haxe_ui_core_ComponentContainer = function() {
	this._id = null;
	this._layoutLocked = false;
	this._layout = null;
	this._ready = false;
	this.parentComponent = null;
	haxe_ui_core_ComponentCommon.call(this);
	this.behaviours = new haxe_ui_behaviours_Behaviours(js_Boot.__cast(this , haxe_ui_core_Component));
};
$hxClasses["haxe.ui.core.ComponentContainer"] = haxe_ui_core_ComponentContainer;
haxe_ui_core_ComponentContainer.__name__ = "haxe.ui.core.ComponentContainer";
haxe_ui_core_ComponentContainer.__interfaces__ = [haxe_ui_core_IClonable];
haxe_ui_core_ComponentContainer.__super__ = haxe_ui_core_ComponentCommon;
haxe_ui_core_ComponentContainer.prototype = $extend(haxe_ui_core_ComponentCommon.prototype,{
	behaviours: null
	,parentComponent: null
	,dispatch: function(event) {
	}
	,_ready: null
	,isReady: null
	,get_isReady: function() {
		return this._ready;
	}
	,_children: null
	,childComponents: null
	,get_childComponents: function() {
		if(this._children == null) {
			return [];
		}
		return this._children;
	}
	,registerBehaviours: function() {
		this.behaviours.register("disabled",haxe_ui_core_ComponentDisabledBehaviour);
		this.behaviours.register("tooltip",haxe_ui_core_ComponentToolTipBehaviour,null);
		this.behaviours.register("tooltipRenderer",haxe_ui_core_ComponentToolTipRendererBehaviour,null);
		this.behaviours.register("text",haxe_ui_core_ComponentTextBehaviour);
		this.behaviours.register("value",haxe_ui_core_ComponentValueBehaviour);
	}
	,addComponent: function(child) {
		return null;
	}
	,addComponentAt: function(child,index) {
		return null;
	}
	,removeComponent: function(child,dispose,invalidate) {
		if(invalidate == null) {
			invalidate = true;
		}
		if(dispose == null) {
			dispose = true;
		}
		return null;
	}
	,removeComponentAt: function(index,dispose,invalidate) {
		if(invalidate == null) {
			invalidate = true;
		}
		if(dispose == null) {
			dispose = true;
		}
		return null;
	}
	,moveComponentToBack: function() {
		if(this.parentComponent == null || this.parentComponent.get_numComponents() <= 1) {
			return;
		}
		this.parentComponent.setComponentIndex(this,0);
	}
	,moveComponentBackward: function() {
		if(this.parentComponent == null || this.parentComponent.get_numComponents() <= 1) {
			return;
		}
		var index = this.parentComponent.getComponentIndex(this);
		if(index == 0) {
			return;
		}
		this.parentComponent.setComponentIndex(this,index - 1);
	}
	,moveComponentToFront: function() {
		if(this.parentComponent == null || this.parentComponent.get_numComponents() <= 1) {
			return;
		}
		this.parentComponent.setComponentIndex(this,this.parentComponent.get_numComponents() - 1);
	}
	,moveComponentFrontward: function() {
		if(this.parentComponent == null || this.parentComponent.get_numComponents() <= 1) {
			return;
		}
		var index = this.parentComponent.getComponentIndex(this);
		if(index == this.parentComponent.get_numComponents() - 1) {
			return;
		}
		this.parentComponent.setComponentIndex(this,index + 1);
	}
	,bottomComponent: null
	,get_bottomComponent: function() {
		if(this._children == null || this._children.length == 0) {
			return null;
		}
		return this._children[0];
	}
	,topComponent: null
	,get_topComponent: function() {
		if(this._children == null || this._children.length == 0) {
			return null;
		}
		return this._children[this._children.length - 1];
	}
	,_layout: null
	,_layoutLocked: null
	,_style: null
	,_id: null
	,get_id: function() {
		return this._id;
	}
	,set_id: function(value) {
		if(this._id != value) {
			this._id = value;
		}
		return this._id;
	}
	,get_disabled: function() {
		return haxe_ui_util_Variant.toBool(this.behaviours.get("disabled"));
	}
	,set_disabled: function(value) {
		this.behaviours.set("disabled",haxe_ui_util_Variant.fromBool(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertyChange",null,"disabled"));
		return value;
	}
	,get_tooltip: function() {
		return this.behaviours.getDynamic("tooltip");
	}
	,set_tooltip: function(value) {
		this.behaviours.setDynamic("tooltip",value);
		this.dispatch(new haxe_ui_events_UIEvent("propertyChange",null,"tooltip"));
		return value;
	}
	,get_tooltipRenderer: function() {
		return haxe_ui_util_Variant.toComponent(this.behaviours.get("tooltipRenderer"));
	}
	,set_tooltipRenderer: function(value) {
		this.behaviours.set("tooltipRenderer",haxe_ui_util_Variant.fromComponent(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertyChange",null,"tooltipRenderer"));
		return value;
	}
	,get_text: function() {
		return haxe_ui_util_Variant.toString(this.behaviours.get("text"));
	}
	,set_text: function(value) {
		var _g = Type.typeof(value);
		if(_g._hx_index == 6) {
			if(_g.c == String) {
				if(value != null && value.indexOf("{{") != -1 && value.indexOf("}}") != -1) {
					haxe_ui_locale_LocaleManager.get_instance().registerComponent(this,"text",null,value);
					return value;
				}
			}
		}
		this.behaviours.set("text",haxe_ui_util_Variant.fromString(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertyChange",null,"text"));
		return value;
	}
	,get_value: function() {
		return this.behaviours.getDynamic("value");
	}
	,set_value: function(value) {
		this.behaviours.setDynamic("value",value);
		this.dispatch(new haxe_ui_events_UIEvent("propertyChange",null,"value"));
		return value;
	}
	,cloneComponent: function() {
		var c = this.self();
		if(this.get_id() != null) {
			c.set_id(this.get_id());
		}
		c.set_disabled(this.get_disabled());
		if(this.get_tooltip() != null) {
			c.set_tooltip(this.get_tooltip());
		}
		if(this.get_tooltipRenderer() != null) {
			c.set_tooltipRenderer(this.get_tooltipRenderer());
		}
		if(this.get_text() != null) {
			c.set_text(this.get_text());
		}
		if(this.get_value() != null) {
			c.set_value(this.get_value());
		}
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		return c;
	}
	,self: function() {
		return new haxe_ui_core_ComponentContainer();
	}
	,__class__: haxe_ui_core_ComponentContainer
	,__properties__: {set_value:"set_value",get_value:"get_value",set_text:"set_text",get_text:"get_text",set_tooltipRenderer:"set_tooltipRenderer",get_tooltipRenderer:"get_tooltipRenderer",set_tooltip:"set_tooltip",get_tooltip:"get_tooltip",set_disabled:"set_disabled",get_disabled:"get_disabled",set_id:"set_id",get_id:"get_id",get_topComponent:"get_topComponent",get_bottomComponent:"get_bottomComponent",get_childComponents:"get_childComponents",get_isReady:"get_isReady"}
});
var haxe_ui_core_ComponentEvents = function() {
	this._pausedEvents = null;
	this._interactivityDisabledCounter = 0;
	this._interactivityDisabled = false;
	this._internalEventsClass = null;
	this._internalEvents = null;
	haxe_ui_core_ComponentContainer.call(this);
};
$hxClasses["haxe.ui.core.ComponentEvents"] = haxe_ui_core_ComponentEvents;
haxe_ui_core_ComponentEvents.__name__ = "haxe.ui.core.ComponentEvents";
haxe_ui_core_ComponentEvents.__super__ = haxe_ui_core_ComponentContainer;
haxe_ui_core_ComponentEvents.prototype = $extend(haxe_ui_core_ComponentContainer.prototype,{
	_internalEvents: null
	,_internalEventsClass: null
	,registerInternalEvents: function(eventsClass,reregister) {
		if(reregister == null) {
			reregister = false;
		}
		if(this._internalEvents == null && eventsClass != null) {
			this._internalEvents = Type.createInstance(eventsClass,[this]);
			this._internalEvents.register();
		}
		if(reregister == true && this._internalEvents != null) {
			this._internalEvents.register();
		}
	}
	,unregisterInternalEvents: function() {
		if(this._internalEvents == null) {
			return;
		}
		this._internalEvents.unregister();
		this._internalEvents = null;
	}
	,__events: null
	,registerEvent: function(type,listener,priority) {
		if(priority == null) {
			priority = 0;
		}
		if((js_Boot.__cast(this , haxe_ui_core_Component)).classes.indexOf(":mobile") != -1 && (type == "mouseover" || type == "mouseout")) {
			return;
		}
		if(this.get_disabled() == true && this.isInteractiveEvent(type) == true) {
			if(this._disabledEvents == null) {
				this._disabledEvents = new haxe_ui_util_EventMap();
			}
			this._disabledEvents.add(type,listener,priority);
			return;
		}
		if(this.__events == null) {
			this.__events = new haxe_ui_util_EventMap();
		}
		if(this.__events.add(type,listener,priority) == true) {
			this.mapEvent(type,$bind(this,this._onMappedEvent));
		}
	}
	,hasEvent: function(type,listener) {
		if(this.__events == null) {
			return false;
		}
		return this.__events.contains(type,listener);
	}
	,unregisterEvent: function(type,listener) {
		if(this._disabledEvents != null && !this._interactivityDisabled) {
			this._disabledEvents.remove(type,listener);
		}
		if(this.__events != null) {
			if(this.__events.remove(type,listener) == true) {
				this.unmapEvent(type,$bind(this,this._onMappedEvent));
			}
		}
	}
	,dispatch: function(event) {
		if(event != null) {
			if(this.__events != null) {
				this.__events.invoke(event.type,event,js_Boot.__cast(this , haxe_ui_core_Component));
			}
			if(event.bubble == true && event.canceled == false && this.parentComponent != null) {
				this.parentComponent.dispatch(event);
			}
		}
	}
	,dispatchRecursively: function(event) {
		this.dispatch(event);
		var _g = 0;
		var _g1 = this._children == null ? [] : this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.dispatchRecursively(event);
		}
	}
	,dispatchRecursivelyWhen: function(event,condition) {
		if(condition(this) == true) {
			this.dispatch(event);
		}
		var _g = 0;
		var _g1 = this._children == null ? [] : this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(condition(child) == true) {
				child.dispatchRecursivelyWhen(event,condition);
			}
		}
	}
	,_onMappedEvent: function(event) {
		this.dispatch(event);
	}
	,_disabledEvents: null
	,isInteractiveEvent: function(type) {
		return haxe_ui_core_ComponentEvents.INTERACTIVE_EVENTS.indexOf(type) != -1;
	}
	,_interactivityDisabled: null
	,_interactivityDisabledCounter: null
	,disableInteractivity: function(disable,recursive,updateStyle,force) {
		if(force == null) {
			force = false;
		}
		if(updateStyle == null) {
			updateStyle = false;
		}
		if(recursive == null) {
			recursive = true;
		}
		if(force == true) {
			this._interactivityDisabledCounter = 0;
		}
		if(disable == true) {
			this._interactivityDisabledCounter++;
		} else {
			this._interactivityDisabledCounter--;
		}
		if(this._interactivityDisabledCounter > 0 && this._interactivityDisabled == false) {
			this._interactivityDisabled = true;
			if(updateStyle == true) {
				(js_Boot.__cast(this , haxe_ui_core_Component)).swapClass(":disabled",":hover");
			}
			if(this.__events != null) {
				var eventType = this.__events.keys();
				while(eventType.hasNext()) {
					var eventType1 = eventType.next();
					if(!this.isInteractiveEvent(eventType1)) {
						continue;
					}
					var listeners = this.__events.listeners(eventType1);
					if(listeners != null) {
						var listener = listeners.copy().iterator();
						while(listener.hasNext()) {
							var listener1 = listener.next();
							if(this._disabledEvents == null) {
								this._disabledEvents = new haxe_ui_util_EventMap();
							}
							this._disabledEvents.add(eventType1,haxe_ui_util_Listener.toFunc(listener1));
							this.unregisterEvent(eventType1,haxe_ui_util_Listener.toFunc(listener1));
						}
					}
				}
			}
			this.dispatch(new haxe_ui_events_UIEvent("disabled"));
		} else if(this._interactivityDisabledCounter < 1 && this._interactivityDisabled == true) {
			this._interactivityDisabled = false;
			if(updateStyle == true) {
				(js_Boot.__cast(this , haxe_ui_core_Component)).removeClass(":disabled");
			}
			if(this._disabledEvents != null) {
				var eventType = this._disabledEvents.keys();
				while(eventType.hasNext()) {
					var eventType1 = eventType.next();
					var listeners = this._disabledEvents.listeners(eventType1);
					if(listeners != null) {
						var listener = listeners.copy().iterator();
						while(listener.hasNext()) {
							var listener1 = listener.next();
							this.registerEvent(eventType1,haxe_ui_util_Listener.toFunc(listener1));
						}
					}
				}
				this._disabledEvents = null;
			}
			this.dispatch(new haxe_ui_events_UIEvent("enabled"));
		}
		if(recursive == true) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.disableInteractivity(disable,recursive,updateStyle);
			}
		}
	}
	,unregisterEvents: function() {
		if(this.__events != null) {
			var copy = [];
			var eventType = this.__events.keys();
			while(eventType.hasNext()) {
				var eventType1 = eventType.next();
				copy.push(eventType1);
			}
			var _g = 0;
			while(_g < copy.length) {
				var eventType = copy[_g];
				++_g;
				var listeners = this.__events.listeners(eventType);
				if(listeners != null) {
					var listener = listeners.iterator();
					while(listener.hasNext()) {
						var listener1 = listener.next();
						if(listener1 != null) {
							if(this.__events.remove(eventType,haxe_ui_util_Listener.toFunc(listener1)) == true) {
								this.unmapEvent(eventType,$bind(this,this._onMappedEvent));
							}
						}
					}
				}
			}
		}
	}
	,_pausedEvents: null
	,pauseEvent: function(type,recursive) {
		if(recursive == null) {
			recursive = false;
		}
		if(this.__events == null || this.__events.contains(type) == false) {
			return;
		}
		if(this._pausedEvents == null) {
			this._pausedEvents = new haxe_ds_StringMap();
		}
		var pausedList = this._pausedEvents.h[type];
		if(pausedList == null) {
			pausedList = [];
			this._pausedEvents.h[type] = pausedList;
		}
		var listeners = this.__events.listeners(type).copy();
		var l = listeners.iterator();
		while(l.hasNext()) {
			var l1 = l.next();
			pausedList.push(haxe_ui_util_Listener.toFunc(l1));
			this.unregisterEvent(type,haxe_ui_util_Listener.toFunc(l1));
		}
		if(recursive == true) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				c.pauseEvent(type,recursive);
			}
		}
	}
	,resumeEvent: function(type,recursive) {
		if(recursive == null) {
			recursive = false;
		}
		var _gthis = this;
		if(this.__events == null) {
			return;
		}
		if(this._pausedEvents == null) {
			return;
		}
		if(Object.prototype.hasOwnProperty.call(this._pausedEvents.h,type) == false) {
			return;
		}
		haxe_ui_Toolkit.callLater(function() {
			var pausedList = _gthis._pausedEvents.h[type];
			var _g = 0;
			while(_g < pausedList.length) {
				var l = pausedList[_g];
				++_g;
				_gthis.registerEvent(type,l);
			}
			var _this = _gthis._pausedEvents;
			if(Object.prototype.hasOwnProperty.call(_this.h,type)) {
				delete(_this.h[type]);
			}
		});
		if(recursive == true) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				c.resumeEvent(type,recursive);
			}
		}
	}
	,mapEvent: function(type,listener) {
	}
	,unmapEvent: function(type,listener) {
	}
	,registerBehaviours: function() {
		haxe_ui_core_ComponentContainer.prototype.registerBehaviours.call(this);
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_ComponentContainer.prototype.cloneComponent.call(this);
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		return c;
	}
	,self: function() {
		return new haxe_ui_core_ComponentEvents();
	}
	,__class__: haxe_ui_core_ComponentEvents
});
var haxe_ui_core_ComponentValidation = function() {
	this._depth = -1;
	this._invalidateCount = 0;
	this._isDisposed = false;
	this._isInitialized = false;
	this._isValidating = false;
	this._isAllInvalid = false;
	this._delayedInvalidationFlags = new haxe_ds_StringMap();
	this._invalidationFlags = new haxe_ds_StringMap();
	haxe_ui_core_ComponentEvents.call(this);
};
$hxClasses["haxe.ui.core.ComponentValidation"] = haxe_ui_core_ComponentValidation;
haxe_ui_core_ComponentValidation.__name__ = "haxe.ui.core.ComponentValidation";
haxe_ui_core_ComponentValidation.__super__ = haxe_ui_core_ComponentEvents;
haxe_ui_core_ComponentValidation.prototype = $extend(haxe_ui_core_ComponentEvents.prototype,{
	_invalidationFlags: null
	,_delayedInvalidationFlags: null
	,_isAllInvalid: null
	,_isValidating: null
	,_isInitialized: null
	,_isDisposed: null
	,_invalidateCount: null
	,_depth: null
	,get_depth: function() {
		return this._depth;
	}
	,set_depth: function(value) {
		if(this._depth == value) {
			return value;
		}
		this._depth = value;
		return value;
	}
	,isComponentInvalid: function(flag) {
		if(flag == null) {
			flag = "all";
		}
		if(this._isAllInvalid == true) {
			return true;
		}
		if(flag == "all") {
			var h = this._invalidationFlags.h;
			var value_h = h;
			var value_keys = Object.keys(h);
			var value_length = value_keys.length;
			var value_current = 0;
			while(value_current < value_length) {
				var value = value_h[value_keys[value_current++]];
				return true;
			}
			return false;
		}
		return Object.prototype.hasOwnProperty.call(this._invalidationFlags.h,flag);
	}
	,invalidateComponent: function(flag,recursive) {
		if(recursive == null) {
			recursive = false;
		}
		if(flag == null) {
			flag = "all";
		}
		if(this._ready == false) {
			return;
		}
		var isAlreadyInvalid = this.isComponentInvalid();
		var isAlreadyDelayedInvalid = false;
		if(this._isValidating == true) {
			var h = this._delayedInvalidationFlags.h;
			var value_h = h;
			var value_keys = Object.keys(h);
			var value_length = value_keys.length;
			var value_current = 0;
			while(value_current < value_length) {
				var value = value_h[value_keys[value_current++]];
				isAlreadyDelayedInvalid = true;
				break;
			}
		}
		if(flag == "all") {
			if(this._isValidating == true) {
				this._delayedInvalidationFlags.h["all"] = true;
			} else {
				this._isAllInvalid = true;
			}
		} else if(this._isValidating == true) {
			this._delayedInvalidationFlags.h[flag] = true;
		} else if(flag != "all" && !Object.prototype.hasOwnProperty.call(this._invalidationFlags.h,flag)) {
			this._invalidationFlags.h[flag] = true;
		}
		if(this._isValidating == true) {
			if(isAlreadyDelayedInvalid == true) {
				return;
			}
			this._invalidateCount++;
			if(this._invalidateCount >= 10) {
				throw haxe_Exception.thrown("The validation queue returned too many times during validation. This may be an infinite loop. Try to avoid doing anything that calls invalidate() during validation.");
			}
			haxe_ui_validation_ValidationManager.get_instance().add(js_Boot.__cast(this , haxe_ui_core_Component));
			return;
		} else if(isAlreadyInvalid == true) {
			return;
		}
		this._invalidateCount = 0;
		haxe_ui_validation_ValidationManager.get_instance().add(js_Boot.__cast(this , haxe_ui_core_Component));
		if(recursive == true) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.invalidateComponent(flag,recursive);
			}
		}
	}
	,invalidateComponentData: function(recursive) {
		if(recursive == null) {
			recursive = false;
		}
		this.invalidateComponent("data",recursive);
	}
	,invalidateComponentLayout: function(recursive) {
		if(recursive == null) {
			recursive = false;
		}
		if(this._layout == null || this._layoutLocked == true) {
			return;
		}
		this.invalidateComponent("layout",recursive);
	}
	,invalidateComponentPosition: function(recursive) {
		if(recursive == null) {
			recursive = false;
		}
		this.invalidateComponent("position",recursive);
	}
	,invalidateComponentDisplay: function(recursive) {
		if(recursive == null) {
			recursive = false;
		}
		this.invalidateComponent("display",recursive);
	}
	,invalidateComponentStyle: function(force,recursive) {
		if(recursive == null) {
			recursive = false;
		}
		if(force == null) {
			force = false;
		}
		this.invalidateComponent("style",recursive);
		if(force == true) {
			this._style = null;
		}
	}
	,validateComponent: function(nextFrame) {
		if(nextFrame == null) {
			nextFrame = true;
		}
		if(this._ready == false || this._isDisposed == true || this._isValidating == true || this.isComponentInvalid() == false) {
			return;
		}
		var isInitialized = this._isInitialized;
		if(isInitialized == false) {
			this.initializeComponent();
		}
		this._isValidating = true;
		this.validateComponentInternal(nextFrame);
		this.validateInitialSize(isInitialized);
		this._invalidationFlags.h = Object.create(null);
		this._isAllInvalid = false;
		var h = this._delayedInvalidationFlags.h;
		var flag_h = h;
		var flag_keys = Object.keys(h);
		var flag_length = flag_keys.length;
		var flag_current = 0;
		while(flag_current < flag_length) {
			var flag = flag_keys[flag_current++];
			if(flag == "all") {
				this._isAllInvalid = true;
			} else {
				this._invalidationFlags.h[flag] = true;
			}
		}
		this._delayedInvalidationFlags.h = Object.create(null);
		this._isValidating = false;
	}
	,validateNow: function() {
		var _g = 0;
		var _g1 = this._children == null ? [] : this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.validateNow();
		}
		this.invalidateComponent();
		this.syncComponentValidation(false);
	}
	,syncComponentValidation: function(nextFrame) {
		if(nextFrame == null) {
			nextFrame = true;
		}
		var count = 0;
		while(this.isComponentInvalid()) {
			this.validateComponent(nextFrame);
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.syncComponentValidation(nextFrame);
			}
			if(++count >= 10) {
				if(this._isDisposed) {
					throw haxe_Exception.thrown("There was a problem validating this component as it has already been destroyed");
				} else {
					throw haxe_Exception.thrown("The syncValidation returned too many times during validation. This may be an infinite loop. Try to avoid doing anything that calls invalidate() during validation.");
				}
			}
		}
	}
	,validateComponentInternal: function(nextFrame) {
		if(nextFrame == null) {
			nextFrame = true;
		}
		var dataInvalid = this.isComponentInvalid("data");
		var styleInvalid = this.isComponentInvalid("style");
		var textDisplayInvalid = this.isComponentInvalid("textDisplay") && this.hasTextDisplay();
		var textInputInvalid = this.isComponentInvalid("textInput") && this.hasTextInput();
		var imageDisplayInvalid = this.isComponentInvalid("imageDisplay") && this.hasImageDisplay();
		var positionInvalid = this.isComponentInvalid("position");
		var displayInvalid = this.isComponentInvalid("display");
		var layoutInvalid = this.isComponentInvalid("layout") && this._layoutLocked == false;
		if(dataInvalid) {
			this.validateComponentData();
		}
		if(styleInvalid) {
			this.validateComponentStyle();
		}
		if(textDisplayInvalid) {
			this.getTextDisplay().validateComponent();
		}
		if(textInputInvalid) {
			this.getTextInput().validateComponent();
		}
		if(imageDisplayInvalid) {
			this.getImageDisplay().validateComponent();
		}
		if(positionInvalid) {
			this.validateComponentPosition();
		}
		if(layoutInvalid) {
			if(this.validateComponentLayout()) {
				displayInvalid = true;
			}
		}
		if(displayInvalid || styleInvalid) {
			haxe_ui_validation_ValidationManager.get_instance().addDisplay(js_Boot.__cast(this , haxe_ui_core_Component),nextFrame);
		}
	}
	,initializeComponent: function() {
	}
	,validateInitialSize: function(isInitialized) {
	}
	,validateComponentData: function() {
		this.behaviours.validateData();
	}
	,validateComponentLayout: function() {
		return false;
	}
	,validateComponentStyle: function() {
	}
	,validateComponentPosition: function() {
	}
	,registerBehaviours: function() {
		haxe_ui_core_ComponentEvents.prototype.registerBehaviours.call(this);
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_ComponentEvents.prototype.cloneComponent.call(this);
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		return c;
	}
	,self: function() {
		return new haxe_ui_core_ComponentValidation();
	}
	,__class__: haxe_ui_core_ComponentValidation
	,__properties__: $extend(haxe_ui_core_ComponentEvents.prototype.__properties__,{set_depth:"set_depth",get_depth:"get_depth"})
});
var haxe_ui_core_ComponentLayout = function() {
	haxe_ui_core_ComponentValidation.call(this);
};
$hxClasses["haxe.ui.core.ComponentLayout"] = haxe_ui_core_ComponentLayout;
haxe_ui_core_ComponentLayout.__name__ = "haxe.ui.core.ComponentLayout";
haxe_ui_core_ComponentLayout.__super__ = haxe_ui_core_ComponentValidation;
haxe_ui_core_ComponentLayout.prototype = $extend(haxe_ui_core_ComponentValidation.prototype,{
	get_style: function() {
		return this._style;
	}
	,set_style: function(value) {
		this._style = value;
		return value;
	}
	,registerBehaviours: function() {
		haxe_ui_core_ComponentValidation.prototype.registerBehaviours.call(this);
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_ComponentValidation.prototype.cloneComponent.call(this);
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		return c;
	}
	,self: function() {
		return new haxe_ui_core_ComponentLayout();
	}
	,__class__: haxe_ui_core_ComponentLayout
	,__properties__: $extend(haxe_ui_core_ComponentValidation.prototype.__properties__,{set_style:"set_style",get_style:"get_style"})
});
var haxe_ui_core_ComponentBounds = function() {
	this._componentClipRect = null;
	this._top = 0;
	this._left = 0;
	this._hasScreen = null;
	this._cachedPercentHeight = null;
	this._cachedPercentWidth = null;
	haxe_ui_core_ComponentLayout.call(this);
};
$hxClasses["haxe.ui.core.ComponentBounds"] = haxe_ui_core_ComponentBounds;
haxe_ui_core_ComponentBounds.__name__ = "haxe.ui.core.ComponentBounds";
haxe_ui_core_ComponentBounds.__super__ = haxe_ui_core_ComponentLayout;
haxe_ui_core_ComponentBounds.prototype = $extend(haxe_ui_core_ComponentLayout.prototype,{
	autoWidth: null
	,get_autoWidth: function() {
		if(this._percentWidth != null || this._width != null || this.get_style() == null) {
			return false;
		}
		if(this.get_style().autoWidth == null) {
			return false;
		}
		return this.get_style().autoWidth;
	}
	,autoHeight: null
	,get_autoHeight: function() {
		if(this._percentHeight != null || this._height != null || this.get_style() == null) {
			return false;
		}
		if(this.get_style().autoHeight == null) {
			return false;
		}
		return this.get_style().autoHeight;
	}
	,resizeComponent: function(w,h) {
		var invalidate = false;
		if(w != null && this._componentWidth != w) {
			this._componentWidth = w;
			invalidate = true;
		}
		if(h != null && this._componentHeight != h) {
			this._componentHeight = h;
			invalidate = true;
		}
		if(invalidate == true && this.isComponentInvalid("layout") == false) {
			if(!(this._layout == null || this._layoutLocked == true)) {
				this.invalidateComponent("layout",false);
			}
		}
	}
	,actualComponentWidth: null
	,get_actualComponentWidth: function() {
		return this.get_componentWidth() * haxe_ui_Toolkit.get_scaleX();
	}
	,actualComponentHeight: null
	,get_actualComponentHeight: function() {
		return this.get_componentHeight() * haxe_ui_Toolkit.get_scaleY();
	}
	,_componentWidth: null
	,get_componentWidth: function() {
		if(this._componentWidth == null) {
			return 0;
		}
		return this._componentWidth;
	}
	,set_componentWidth: function(value) {
		this.resizeComponent(value,null);
		return value;
	}
	,_componentHeight: null
	,get_componentHeight: function() {
		if(this._componentHeight == null) {
			return 0;
		}
		return this._componentHeight;
	}
	,set_componentHeight: function(value) {
		this.resizeComponent(null,value);
		return value;
	}
	,_percentWidth: null
	,get_percentWidth: function() {
		return this._percentWidth;
	}
	,set_percentWidth: function(value) {
		if(this._percentWidth == value) {
			return value;
		}
		this._percentWidth = value;
		if(this.parentComponent != null) {
			var _this = this.parentComponent;
			if(!(_this._layout == null || _this._layoutLocked == true)) {
				_this.invalidateComponent("layout",false);
			}
		} else {
			haxe_ui_core_Screen.get_instance().resizeRootComponents();
		}
		return value;
	}
	,_percentHeight: null
	,get_percentHeight: function() {
		return this._percentHeight;
	}
	,set_percentHeight: function(value) {
		if(this._percentHeight == value) {
			return value;
		}
		this._percentHeight = value;
		if(this.parentComponent != null) {
			var _this = this.parentComponent;
			if(!(_this._layout == null || _this._layoutLocked == true)) {
				_this.invalidateComponent("layout",false);
			}
		} else {
			haxe_ui_core_Screen.get_instance().resizeRootComponents();
		}
		return value;
	}
	,_cachedPercentWidth: null
	,_cachedPercentHeight: null
	,cachePercentSizes: function(clearExisting) {
		if(clearExisting == null) {
			clearExisting = true;
		}
		if(this._percentWidth != null) {
			this._cachedPercentWidth = this._percentWidth;
			if(clearExisting == true) {
				this._percentWidth = null;
			}
		}
		if(this._percentHeight != null) {
			this._cachedPercentHeight = this._percentHeight;
			if(clearExisting == true) {
				this._percentHeight = null;
			}
		}
	}
	,restorePercentSizes: function() {
		if(this._cachedPercentWidth != null) {
			this.set_percentWidth(this._cachedPercentWidth);
		}
		if(this._cachedPercentHeight != null) {
			this.set_percentHeight(this._cachedPercentHeight);
		}
	}
	,_width: null
	,set_width: function(value) {
		if(this._width == value) {
			return value;
		}
		this._width = value;
		this.set_componentWidth(value);
		return value;
	}
	,get_width: function() {
		var f = this.get_componentWidth();
		return f;
	}
	,_height: null
	,set_height: function(value) {
		if(this._height == value) {
			return value;
		}
		this._height = value;
		this.set_componentHeight(value);
		return value;
	}
	,get_height: function() {
		var f = this.get_componentHeight();
		return f;
	}
	,_actualWidth: null
	,_actualHeight: null
	,_hasScreen: null
	,hasScreen: null
	,get_hasScreen: function() {
		var p = this;
		while(p != null) {
			if(p._hasScreen == false) {
				return false;
			}
			p = p.parentComponent;
		}
		return true;
	}
	,hitTest: function(left,top,allowZeroSized) {
		if(allowZeroSized == null) {
			allowZeroSized = false;
		}
		if(this.get_hasScreen() == false) {
			return false;
		}
		left *= haxe_ui_Toolkit.get_scale();
		top *= haxe_ui_Toolkit.get_scale();
		var b = false;
		var sx = this.get_screenLeft();
		var sy = this.get_screenTop();
		var cx = 0;
		if(this.get_componentWidth() != null) {
			cx = this.get_actualComponentWidth();
		}
		var cy = 0;
		if(this.get_componentHeight() != null) {
			cy = this.get_actualComponentHeight();
		}
		if(allowZeroSized == true) {
			var c = js_Boot.__cast(this , haxe_ui_core_Component);
			if(c.get_layout() != null) {
				var us = c.get_layout().get_usableSize();
				if(us.width <= 0 || us.height <= 0) {
					return true;
				}
			}
		}
		if(left >= sx && left < sx + cx && top >= sy && top < sy + cy) {
			b = true;
		}
		return b;
	}
	,autoSize: function() {
		if(this._ready == false || this._layout == null) {
			return false;
		}
		return this._layout.autoSize();
	}
	,moveComponent: function(left,top) {
		var invalidate = false;
		if(left != null && this._left != left) {
			this._left = left;
			invalidate = true;
		}
		if(top != null && this._top != top) {
			this._top = top;
			invalidate = true;
		}
		if(invalidate == true && this.isComponentInvalid("position") == false) {
			this.invalidateComponent("position",false);
		}
	}
	,_left: null
	,get_left: function() {
		return this._left;
	}
	,set_left: function(value) {
		this.moveComponent(value,null);
		return value;
	}
	,_top: null
	,get_top: function() {
		return this._top;
	}
	,set_top: function(value) {
		this.moveComponent(null,value);
		return value;
	}
	,screenLeft: null
	,get_screenLeft: function() {
		var c = this;
		var xpos = 0;
		while(c != null) {
			var l = c.get_left();
			if(c.parentComponent != null) {
				l *= haxe_ui_Toolkit.get_scale();
			}
			xpos += l;
			if(c.get_componentClipRect() != null) {
				xpos -= c.get_componentClipRect().left * haxe_ui_Toolkit.get_scaleX();
			}
			c = c.parentComponent;
		}
		return xpos;
	}
	,screenTop: null
	,get_screenTop: function() {
		var c = this;
		var ypos = 0;
		while(c != null) {
			var t = c.get_top();
			if(c.parentComponent != null) {
				t *= haxe_ui_Toolkit.get_scale();
			}
			ypos += t;
			if(c.get_componentClipRect() != null) {
				ypos -= c.get_componentClipRect().top * haxe_ui_Toolkit.get_scaleY();
			}
			c = c.parentComponent;
		}
		return ypos;
	}
	,_componentClipRect: null
	,get_componentClipRect: function() {
		if(this.get_style() != null && this.get_style().clip != null && this.get_style().clip == true) {
			return new haxe_ui_geom_Rectangle(0,0,this.get_componentWidth(),this.get_componentHeight());
		}
		return this._componentClipRect;
	}
	,set_componentClipRect: function(value) {
		this._componentClipRect = value;
		this.invalidateComponent("display",false);
		return value;
	}
	,isComponentClipped: null
	,get_isComponentClipped: function() {
		return this.get_componentClipRect() != null;
	}
	,registerBehaviours: function() {
		haxe_ui_core_ComponentLayout.prototype.registerBehaviours.call(this);
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_ComponentLayout.prototype.cloneComponent.call(this);
		if(this.get_componentWidth() != null) {
			c.set_componentWidth(this.get_componentWidth());
		}
		if(this.get_componentHeight() != null) {
			c.set_componentHeight(this.get_componentHeight());
		}
		if(this.get_percentWidth() != null) {
			c.set_percentWidth(this.get_percentWidth());
		}
		if(this.get_percentHeight() != null) {
			c.set_percentHeight(this.get_percentHeight());
		}
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		return c;
	}
	,self: function() {
		return new haxe_ui_core_ComponentBounds();
	}
	,__class__: haxe_ui_core_ComponentBounds
	,__properties__: $extend(haxe_ui_core_ComponentLayout.prototype.__properties__,{get_isComponentClipped:"get_isComponentClipped",set_componentClipRect:"set_componentClipRect",get_componentClipRect:"get_componentClipRect",get_screenTop:"get_screenTop",get_screenLeft:"get_screenLeft",set_top:"set_top",get_top:"get_top",set_left:"set_left",get_left:"get_left",get_hasScreen:"get_hasScreen",set_height:"set_height",get_height:"get_height",set_width:"set_width",get_width:"get_width",set_percentHeight:"set_percentHeight",get_percentHeight:"get_percentHeight",set_percentWidth:"set_percentWidth",get_percentWidth:"get_percentWidth",set_componentHeight:"set_componentHeight",get_componentHeight:"get_componentHeight",set_componentWidth:"set_componentWidth",get_componentWidth:"get_componentWidth",get_actualComponentHeight:"get_actualComponentHeight",get_actualComponentWidth:"get_actualComponentWidth",get_autoHeight:"get_autoHeight",get_autoWidth:"get_autoWidth"})
});
var haxe_ui_backend_ComponentBase = function() {
	this._nativeClassName = null;
	this._className = null;
	haxe_ui_core_ComponentBounds.call(this);
};
$hxClasses["haxe.ui.backend.ComponentBase"] = haxe_ui_backend_ComponentBase;
haxe_ui_backend_ComponentBase.__name__ = "haxe.ui.backend.ComponentBase";
haxe_ui_backend_ComponentBase.__super__ = haxe_ui_core_ComponentBounds;
haxe_ui_backend_ComponentBase.prototype = $extend(haxe_ui_core_ComponentBounds.prototype,{
	handleCreate: function(native) {
	}
	,handlePosition: function(left,top,style) {
	}
	,handleSize: function(width,height,style) {
	}
	,handleReady: function() {
	}
	,handleClipRect: function(value) {
	}
	,handleVisibility: function(show) {
	}
	,getComponentOffset: function() {
		return new haxe_ui_geom_Point(0,0);
	}
	,isNativeScroller: null
	,get_isNativeScroller: function() {
		return false;
	}
	,isScroller: null
	,get_isScroller: function() {
		return false;
	}
	,handleFrameworkProperty: function(id,value) {
	}
	,handleSetComponentIndex: function(child,index) {
	}
	,handleAddComponent: function(child) {
		return child;
	}
	,handleAddComponentAt: function(child,index) {
		return child;
	}
	,handleRemoveComponent: function(child,dispose) {
		if(dispose == null) {
			dispose = true;
		}
		return child;
	}
	,handleRemoveComponentAt: function(index,dispose) {
		if(dispose == null) {
			dispose = true;
		}
		return null;
	}
	,applyStyle: function(style) {
	}
	,mapEvent: function(type,listener) {
	}
	,unmapEvent: function(type,listener) {
	}
	,_textDisplay: null
	,createTextDisplay: function(text) {
		if(this._textDisplay == null) {
			this._textDisplay = new haxe_ui_core_TextDisplay();
			this._textDisplay.parentComponent = js_Boot.__cast(this , haxe_ui_core_Component);
		}
		if(text != null) {
			this._textDisplay.set_text(text);
		}
		return this._textDisplay;
	}
	,getTextDisplay: function() {
		return this.createTextDisplay();
	}
	,hasTextDisplay: function() {
		return this._textDisplay != null;
	}
	,_textInput: null
	,createTextInput: function(text) {
		if(this._textInput == null) {
			this._textInput = new haxe_ui_core_TextInput();
			this._textInput.parentComponent = js_Boot.__cast(this , haxe_ui_core_Component);
		}
		if(text != null) {
			this._textInput.set_text(text);
		}
		return this._textInput;
	}
	,getTextInput: function() {
		return this.createTextInput();
	}
	,hasTextInput: function() {
		return this._textInput != null;
	}
	,_imageDisplay: null
	,createImageDisplay: function() {
		if(this._imageDisplay == null) {
			this._imageDisplay = new haxe_ui_core_ImageDisplay();
			this._imageDisplay.parentComponent = js_Boot.__cast(this , haxe_ui_core_Component);
		}
		return this._imageDisplay;
	}
	,getImageDisplay: function() {
		return this.createImageDisplay();
	}
	,hasImageDisplay: function() {
		return this._imageDisplay != null;
	}
	,removeImageDisplay: function() {
		if(this._imageDisplay != null) {
			this._imageDisplay.dispose();
			this._imageDisplay = null;
		}
	}
	,handlePreReposition: function() {
	}
	,handlePostReposition: function() {
	}
	,getClassProperty: function(name) {
		var v = null;
		if(this._classProperties != null) {
			v = this._classProperties.h[name];
		}
		if(v == null) {
			var c = js_Boot.getClass(this);
			var c1 = c.__name__.toLowerCase() + "." + name;
			v = haxe_ui_Toolkit.properties.h[c1];
		}
		return v;
	}
	,_classProperties: null
	,setClassProperty: function(name,value) {
		if(this._classProperties == null) {
			this._classProperties = new haxe_ds_StringMap();
		}
		this._classProperties.h[name] = value;
	}
	,_hasNativeEntry: null
	,hasNativeEntry: null
	,get_hasNativeEntry: function() {
		if(this._hasNativeEntry == null) {
			this._hasNativeEntry = this.getNativeConfigProperty(".@id") != null;
		}
		return this._hasNativeEntry;
	}
	,getNativeConfigProperty: function(query,defaultValue) {
		query = "component[id=" + this.get_nativeClassName() + "]" + query;
		return haxe_ui_Toolkit.nativeConfig.query(query,defaultValue,this);
	}
	,getNativeConfigPropertyBool: function(query,defaultValue) {
		if(defaultValue == null) {
			defaultValue = false;
		}
		query = "component[id=" + this.get_nativeClassName() + "]" + query;
		return haxe_ui_Toolkit.nativeConfig.queryBool(query,defaultValue,this);
	}
	,getNativeConfigProperties: function(query) {
		if(query == null) {
			query = "";
		}
		query = "component[id=" + this.get_nativeClassName() + "]" + query;
		return haxe_ui_Toolkit.nativeConfig.queryValues(query,this);
	}
	,_className: null
	,className: null
	,get_className: function() {
		if(this._className != null) {
			return this._className;
		}
		var c = js_Boot.getClass(this);
		this._className = c.__name__;
		return this._className;
	}
	,_nativeClassName: null
	,nativeClassName: null
	,get_nativeClassName: function() {
		if(this._nativeClassName != null) {
			return this._nativeClassName;
		}
		var r = js_Boot.getClass(this);
		while(r != null) {
			var c = r.__name__;
			var t = haxe_ui_Toolkit.nativeConfig.query("component[id=" + c + "].@class",null,this);
			if(t != null) {
				this._nativeClassName = c;
				break;
			}
			r = r.__super__;
			if(r == haxe_ui_core_Component) {
				break;
			}
		}
		if(this._nativeClassName == null) {
			this._nativeClassName = this.get_className();
		}
		return this._nativeClassName;
	}
	,registerBehaviours: function() {
		haxe_ui_core_ComponentBounds.prototype.registerBehaviours.call(this);
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_ComponentBounds.prototype.cloneComponent.call(this);
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		return c;
	}
	,self: function() {
		return new haxe_ui_backend_ComponentBase();
	}
	,__class__: haxe_ui_backend_ComponentBase
	,__properties__: $extend(haxe_ui_core_ComponentBounds.prototype.__properties__,{get_nativeClassName:"get_nativeClassName",get_className:"get_className",get_hasNativeEntry:"get_hasNativeEntry",get_isScroller:"get_isScroller",get_isNativeScroller:"get_isNativeScroller"})
});
var haxe_ui_backend_ComponentImpl = function() {
	this._canvas = null;
	haxe_ui_backend_ComponentBase.call(this);
	this._eventMap = new haxe_ds_StringMap();
	if(haxe_ui_backend_ComponentImpl._mutationObserver == null) {
		haxe_ui_backend_ComponentImpl._mutationObserver = new MutationObserver(haxe_ui_backend_ComponentImpl.onMutationEvent);
		haxe_ui_backend_ComponentImpl._mutationObserver.observe(haxe_ui_core_Screen.get_instance().get_container(),{ childList : true});
	}
	if(window.document.styleSheets.length == 0) {
		var style = window.document.createElement("style");
		style.appendChild(window.document.createTextNode(""));
		window.document.head.appendChild(style);
	}
	if(haxe_ui_backend_ComponentImpl._stylesAdded == false) {
		haxe_ui_backend_ComponentImpl._stylesAdded = true;
		var sheet = haxe_ui_backend_html5_util_StyleSheetHelper.getValidStyleSheet();
		sheet.insertRule("#haxeui-container .haxeui-component, .haxeui-component:focus {\r\n                position: absolute;\r\n                box-sizing: border-box;\r\n                -webkit-touch-callout: none;\r\n                -webkit-user-select: none;\r\n                -khtml-user-select: none;\r\n                -moz-user-select: none;\r\n                -ms-user-select: none;\r\n                user-select: none;\r\n                -webkit-tap-highlight-color: transparent;\r\n                webkit-user-select;\r\n                outline: none !important;\r\n            }",sheet.cssRules.length);
		haxe_ui_core_Screen.get_instance().get_container().classList.add("haxeui-theme-" + haxe_ui_Toolkit.get_theme());
	}
};
$hxClasses["haxe.ui.backend.ComponentImpl"] = haxe_ui_backend_ComponentImpl;
haxe_ui_backend_ComponentImpl.__name__ = "haxe.ui.backend.ComponentImpl";
haxe_ui_backend_ComponentImpl.onMutationEvent = function(records,o) {
	var done = false;
	var _g = 0;
	while(_g < records.length) {
		var record = records[_g];
		++_g;
		var _g1 = 0;
		var _g2 = record.addedNodes.length;
		while(_g1 < _g2) {
			var i = _g1++;
			var node = record.addedNodes.item(i);
			var c = haxe_ui_backend_ComponentImpl.elementToComponent.h[node.__id__];
			if(c != null) {
				c.recursiveReady();
			}
		}
		if(done == true) {
			break;
		}
	}
};
haxe_ui_backend_ComponentImpl.__super__ = haxe_ui_backend_ComponentBase;
haxe_ui_backend_ComponentImpl.prototype = $extend(haxe_ui_backend_ComponentBase.prototype,{
	element: null
	,_eventMap: null
	,get_isNativeScroller: function() {
		return false;
	}
	,recursiveReady: function() {
		haxe_ui_backend_ComponentImpl.elementToComponent.remove(this.element);
		var component = js_Boot.__cast(this , haxe_ui_core_Component);
		if(!(component._layout == null || component._layoutLocked == true)) {
			component.invalidateComponent("layout",false);
		}
		component.ready();
		var _g = 0;
		var _g1 = component._children == null ? [] : component._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.recursiveReady();
		}
	}
	,handleCreate: function(native) {
		if(this.get_isScroller()) {
			if(this.element == null) {
				this.element = window.document.createElement("div");
			}
			this.element.scrollTop = 0;
			this.element.scrollLeft = 0;
			this.element.style.overflow = "hidden";
			this.element.classList.add("haxeui-component");
			haxe_ui_backend_ComponentImpl.elementToComponent.set(this.element,js_Boot.__cast(this , haxe_ui_core_Component));
			return;
		}
		var newElement = window.document.createElement("div");
		newElement.classList.add("haxeui-component");
		if(((this) instanceof haxe_ui_components_Image)) {
			newElement.style.boxSizing = "initial";
		}
		if(this.element != null) {
			var p = this.element.parentElement;
			if(p != null) {
				haxe_ui_backend_ComponentImpl.elementToComponent.remove(this.element);
				p.replaceChild(newElement,this.element);
			}
		}
		this.element = newElement;
		haxe_ui_backend_ComponentImpl.elementToComponent.set(this.element,js_Boot.__cast(this , haxe_ui_core_Component));
		this.remapEvents();
	}
	,remapEvents: function() {
		if(this._eventMap == null) {
			return;
		}
		var copy_h = Object.create(null);
		var h = this._eventMap.h;
		var k_h = h;
		var k_keys = Object.keys(h);
		var k_length = k_keys.length;
		var k_current = 0;
		while(k_current < k_length) {
			var k = k_keys[k_current++];
			var fn = this._eventMap.h[k];
			copy_h[k] = fn;
			this.unmapEvent(k,fn);
		}
		this._eventMap = new haxe_ds_StringMap();
		var h = copy_h;
		var k_h = h;
		var k_keys = Object.keys(h);
		var k_length = k_keys.length;
		var k_current = 0;
		while(k_current < k_length) {
			var k = k_keys[k_current++];
			this.mapEvent(k,copy_h[k]);
		}
	}
	,handlePosition: function(left,top,style) {
		if(this.element == null) {
			return;
		}
		if(left != null) {
			this.element.style.left = "" + left + "px";
		}
		if(top != null) {
			this.element.style.top = "" + top + "px";
		}
	}
	,handleSize: function(width,height,style) {
		if(width == null || height == null || width <= 0 || height <= 0) {
			return;
		}
		if(this.element == null) {
			return;
		}
		var c = js_Boot.__cast(this , haxe_ui_core_Component);
		var css = this.element.style;
		haxe_ui_backend_html5_StyleHelper.apply(this,width,height,style);
		var parent = c.parentComponent;
		if(parent != null && parent.element.style.borderWidth != null) {
			css.marginTop = "-" + parent.element.style.borderWidth;
			css.marginLeft = "-" + parent.element.style.borderWidth;
		} else if(parent != null) {
			css.marginTop = "";
			css.marginLeft = "";
		}
		var _g = 0;
		var _this = js_Boot.__cast(this , haxe_ui_core_Component);
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(style.borderLeftSize != null && style.borderLeftSize > 0) {
				child.element.style.marginLeft = "-" + style.borderLeftSize + "px";
			} else {
				child.element.style.marginLeft = "";
			}
			if(style.borderTopSize != null && style.borderTopSize > 0) {
				child.element.style.marginTop = "-" + style.borderTopSize + "px";
			} else {
				child.element.style.marginTop = "";
			}
		}
	}
	,handleReady: function() {
		if((js_Boot.__cast(this , haxe_ui_core_Component)).get_id() != null) {
			this.element.id = (js_Boot.__cast(this , haxe_ui_core_Component)).get_id();
		}
	}
	,handleFrameworkProperty: function(id,value) {
		if(id == "allowMouseInteraction") {
			if(value == true && this.element.style.getPropertyValue("pointer-events") != null) {
				this.element.style.removeProperty("pointer-events");
			} else if(this.element.style.getPropertyValue("pointer-events") != "none") {
				this.element.style.setProperty("pointer-events","none");
				this.setCursor(null);
			}
		}
	}
	,handleClipRect: function(value) {
		var c = js_Boot.__cast(this , haxe_ui_core_Component);
		var parent = c.parentComponent;
		if(value != null && parent != null) {
			var tmp = "rect(" + ("" + value.top + "px") + "," + ("" + value.get_right() + "px") + "," + ("" + value.get_bottom() + "px") + ",";
			this.element.style.clip = tmp + ("" + value.left + "px") + ")";
			var tmp = "" + (c.get_left() - value.left | 0) + "px";
			this.element.style.left = "" + tmp;
			var tmp = "" + (c.get_top() - value.top | 0) + "px";
			this.element.style.top = "" + tmp;
		} else {
			this.element.style.removeProperty("clip");
		}
	}
	,handleVisibility: function(show) {
		this.element.style.display = show == true ? "" : "none";
	}
	,createTextDisplay: function(text) {
		if(this._textDisplay == null) {
			haxe_ui_backend_ComponentBase.prototype.createTextDisplay.call(this,text);
			this.element.appendChild(this._textDisplay.element);
		}
		return this._textDisplay;
	}
	,createTextInput: function(text) {
		if(this._textInput == null) {
			haxe_ui_backend_ComponentBase.prototype.createTextInput.call(this,text);
			this.element.appendChild(this._textInput.element);
		}
		return this._textInput;
	}
	,createImageDisplay: function() {
		if(this._imageDisplay == null) {
			haxe_ui_backend_ComponentBase.prototype.createImageDisplay.call(this);
			this.element.appendChild(this._imageDisplay.element);
		}
		return this._imageDisplay;
	}
	,handleSetComponentIndex: function(child,index) {
		if(index == (this._children == null ? [] : this._children).length - 1) {
			this.element.appendChild(child.element);
		} else if(index == (this._children == null ? [] : this._children).indexOf(child) - 1) {
			var before = (this._children == null ? [] : this._children)[index];
			haxe_ui_backend_html5_HtmlUtils.insertBefore(before.element,child.element);
		} else {
			var before = (this._children == null ? [] : this._children)[index + 1];
			haxe_ui_backend_html5_HtmlUtils.insertBefore(before.element,child.element);
		}
	}
	,handleAddComponent: function(child) {
		this.element.appendChild(child.element);
		return child;
	}
	,handleAddComponentAt: function(child,index) {
		this.handleAddComponent(child);
		this.handleSetComponentIndex(child,index);
		return child;
	}
	,handleRemoveComponent: function(child,dispose) {
		if(dispose == null) {
			dispose = true;
		}
		haxe_ui_backend_html5_HtmlUtils.removeElement(child.element);
		return child;
	}
	,handleRemoveComponentAt: function(index,dispose) {
		if(dispose == null) {
			dispose = true;
		}
		var child = (js_Boot.__cast(this , haxe_ui_core_Component))._children[index];
		haxe_ui_backend_html5_HtmlUtils.removeElement(child.element);
		return child;
	}
	,applyStyle: function(style) {
		if(this.element == null) {
			return;
		}
		this.setCursor(style.cursor);
		if(style.filter != null) {
			if(((style.filter[0]) instanceof haxe_ui_filters_DropShadow)) {
				var dropShadow = style.filter[0];
				if(dropShadow.inner == false) {
					var tmp = "" + dropShadow.distance + "px " + (dropShadow.distance + 2) + "px " + (dropShadow.blurX - 1) + "px " + (dropShadow.blurY - 1) + "px ";
					var tmp1 = haxe_ui_backend_html5_HtmlUtils.rgba(dropShadow.color,dropShadow.alpha);
					this.element.style.boxShadow = tmp + tmp1;
				} else {
					var tmp = "inset " + dropShadow.distance + "px " + dropShadow.distance + "px " + dropShadow.blurX + "px 0px ";
					var tmp1 = haxe_ui_backend_html5_HtmlUtils.rgba(dropShadow.color,dropShadow.alpha);
					this.element.style.boxShadow = tmp + tmp1;
				}
			} else if(((style.filter[0]) instanceof haxe_ui_filters_Blur)) {
				var blur = style.filter[0];
				this.element.style.setProperty("-webkit-filter","blur(" + blur.amount + "px)");
				this.element.style.setProperty("-moz-filter","blur(" + blur.amount + "px)");
				this.element.style.setProperty("-o-filter","blur(" + blur.amount + "px)");
				this.element.style.setProperty("filter","blur(" + blur.amount + "px)");
			} else if(((style.filter[0]) instanceof haxe_ui_filters_Grayscale)) {
				var grayscale = style.filter[0];
				this.element.style.setProperty("-webkit-filter","grayscale(" + grayscale.amount + "%)");
				this.element.style.setProperty("-moz-filter","grayscale(" + grayscale.amount + "%)");
				this.element.style.setProperty("-o-filter","grayscale(" + grayscale.amount + "%)");
				this.element.style.setProperty("filter","grayscale(" + grayscale.amount + "%)");
			}
		} else {
			this.element.style.filter = null;
			this.element.style.boxShadow = null;
			this.element.style.removeProperty("box-shadow");
			this.element.style.removeProperty("-webkit-filter");
			this.element.style.removeProperty("-moz-filter");
			this.element.style.removeProperty("-o-filter");
			this.element.style.removeProperty("filter");
		}
		if(style.backdropFilter != null) {
			if(((style.backdropFilter[0]) instanceof haxe_ui_filters_Blur)) {
				var blur = style.backdropFilter[0];
				this.element.style.setProperty("backdrop-filter","blur(" + blur.amount + "px)");
			}
		} else {
			this.element.style.removeProperty("backdrop-filter");
		}
		if(style.opacity != null) {
			this.element.style.opacity = "" + style.opacity;
		}
		if(style.fontName != null) {
			this.element.style.fontFamily = style.fontName;
		}
		if(style.fontSize != null) {
			this.element.style.fontSize = "" + style.fontSize + "px";
		}
		if(style.color != null) {
			this.element.style.color = haxe_ui_backend_html5_HtmlUtils.color(style.color);
		}
	}
	,setCursor: function(cursor) {
		var tmp = cursor == null;
		if(cursor == null) {
			this.element.style.removeProperty("cursor");
			if(this.hasImageDisplay()) {
				this.getImageDisplay().element.style.removeProperty("cursor");
			}
		} else {
			this.element.style.cursor = cursor;
			if(this.hasImageDisplay()) {
				this.getImageDisplay().element.style.cursor = cursor;
			}
			if(this.hasTextDisplay()) {
				this.getTextDisplay().element.style.cursor = cursor;
			}
		}
		var _g = 0;
		var _this = js_Boot.__cast(this , haxe_ui_core_Component);
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			if(c.element.style.cursor == null) {
				c.setCursor("inherit");
			}
		}
	}
	,_canvas: null
	,getCanvas: function(width,height) {
		if(this._canvas == null) {
			this._canvas = window.document.createElement("canvas");
			this._canvas.style.setProperty("-webkit-backface-visibility","hidden");
			this._canvas.style.setProperty("-moz-backface-visibility","hidden");
			this._canvas.style.setProperty("-ms-backface-visibility","hidden");
			this._canvas.style.position = "absolute";
			this._canvas.style.setProperty("pointer-events","none");
			this._canvas.width = width;
			this._canvas.height = height;
			this.element.insertBefore(this._canvas,this.element.firstChild);
		}
		if(width != this._canvas.width) {
			this._canvas.width = width;
		}
		if(height != this._canvas.height) {
			this._canvas.height = height;
		}
		return this._canvas;
	}
	,hasCanvas: function() {
		return this._canvas != null;
	}
	,removeCanvas: function() {
		if(this._canvas != null && this.element.contains(this._canvas)) {
			this.element.removeChild(this._canvas);
			this._canvas = null;
		}
	}
	,mapEvent: function(type,listener) {
		switch(type) {
		case "change":
			if(Object.prototype.hasOwnProperty.call(this._eventMap.h,type) == false) {
				if(this.hasTextInput() == true) {
					this._eventMap.h[type] = listener;
					var tmp = haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM.h["keyup"];
					this.getTextInput().element.addEventListener(tmp,$bind(this,this.__onTextFieldChangeEvent));
				}
			}
			break;
		case "click":case "doubleclick":case "mousedown":case "mousemove":case "mouseout":case "mouseover":case "mouseup":
			if(Object.prototype.hasOwnProperty.call(this._eventMap.h,type) == false) {
				if(haxe_ui_backend_html5_EventMapper.MOUSE_TO_TOUCH.h[type] != null) {
					this.element.addEventListener(haxe_ui_backend_html5_EventMapper.MOUSE_TO_TOUCH.h[type],$bind(this,this.__onMouseEvent));
				}
				this._eventMap.h[type] = listener;
				this.element.addEventListener(haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM.h[type],$bind(this,this.__onMouseEvent));
			}
			break;
		case "keydown":case "keyup":
			if(Object.prototype.hasOwnProperty.call(this._eventMap.h,type) == false) {
				this._eventMap.h[type] = listener;
				this.element.addEventListener(haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM.h[type],$bind(this,this.__onKeyboardEvent));
			}
			break;
		case "mousewheel":
			this._eventMap.h[type] = listener;
			if(haxe_ui_backend_html5_UserAgent.get_instance().get_firefox() == true) {
				this.element.addEventListener("DOMMouseScroll",$bind(this,this.__onMouseWheelEvent));
			} else {
				this.element.addEventListener("mousewheel",$bind(this,this.__onMouseWheelEvent));
			}
			break;
		case "rightclick":
			if(Object.prototype.hasOwnProperty.call(this._eventMap.h,type) == false) {
				this._eventMap.h[type] = listener;
				this.element.addEventListener("contextmenu",$bind(this,this.__onContextMenu));
			}
			break;
		case "scrollchange":
			this._eventMap.h[type] = listener;
			this.element.addEventListener("scroll",$bind(this,this.__onScrollEvent));
			break;
		}
	}
	,unmapEvent: function(type,listener) {
		switch(type) {
		case "change":
			if(this.hasTextInput()) {
				var _this = this._eventMap;
				if(Object.prototype.hasOwnProperty.call(_this.h,type)) {
					delete(_this.h[type]);
				}
				var tmp = haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM.h["keyup"];
				this.getTextInput().element.removeEventListener(tmp,$bind(this,this.__onTextFieldChangeEvent));
			}
			break;
		case "click":case "doubleclick":case "mousedown":case "mousemove":case "mouseout":case "mouseover":case "mouseup":
			var _this = this._eventMap;
			if(Object.prototype.hasOwnProperty.call(_this.h,type)) {
				delete(_this.h[type]);
			}
			this.element.removeEventListener(haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM.h[type],$bind(this,this.__onMouseEvent));
			if(haxe_ui_backend_html5_EventMapper.MOUSE_TO_TOUCH.h[type] != null) {
				this.element.removeEventListener(haxe_ui_backend_html5_EventMapper.MOUSE_TO_TOUCH.h[type],$bind(this,this.__onMouseEvent));
			}
			break;
		case "keydown":case "keyup":
			var _this = this._eventMap;
			if(Object.prototype.hasOwnProperty.call(_this.h,type)) {
				delete(_this.h[type]);
			}
			this.element.removeEventListener(haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM.h[type],$bind(this,this.__onKeyboardEvent));
			break;
		case "mousewheel":
			var _this = this._eventMap;
			if(Object.prototype.hasOwnProperty.call(_this.h,type)) {
				delete(_this.h[type]);
			}
			if(haxe_ui_backend_html5_UserAgent.get_instance().get_firefox() == true) {
				this.element.removeEventListener("DOMMouseScroll",$bind(this,this.__onMouseWheelEvent));
			} else {
				this.element.removeEventListener("mousewheel",$bind(this,this.__onMouseWheelEvent));
			}
			break;
		case "rightclick":
			var _this = this._eventMap;
			if(Object.prototype.hasOwnProperty.call(_this.h,type)) {
				delete(_this.h[type]);
			}
			this.element.removeEventListener("contextmenu",$bind(this,this.__onContextMenu));
			break;
		}
	}
	,__onContextMenu: function(event) {
		event.preventDefault();
		var type = "rightclick";
		if(type != null) {
			var fn = this._eventMap.h[type];
			if(fn != null) {
				var uiEvent = new haxe_ui_events_MouseEvent(type);
				uiEvent.screenX = event.pageX;
				uiEvent.screenY = event.pageY;
				fn(uiEvent);
			}
		}
		return false;
	}
	,__onChangeEvent: function(event) {
		var type = haxe_ui_backend_html5_EventMapper.DOM_TO_HAXEUI.h[event.type];
		if(type != null) {
			var fn = this._eventMap.h[type];
			if(fn != null) {
				var uiEvent = new haxe_ui_events_UIEvent(type);
				fn(uiEvent);
			}
		}
	}
	,__onTextFieldChangeEvent: function(event) {
		var fn = this._eventMap.h["change"];
		if(fn != null) {
			var uiEvent = new haxe_ui_events_UIEvent("change");
			fn(uiEvent);
		}
	}
	,__onMouseEvent: function(event) {
		var type = haxe_ui_backend_html5_EventMapper.DOM_TO_HAXEUI.h[event.type];
		if(type != null) {
			try {
				var tmp = type == "mousedown";
			} catch( _g ) {
			}
			var fn = this._eventMap.h[type];
			if(fn != null) {
				var mouseEvent = new haxe_ui_events_MouseEvent(type);
				mouseEvent._originalEvent = event;
				var touchEvent = false;
				try {
					touchEvent = ((event) instanceof TouchEvent);
				} catch( _g ) {
				}
				if(touchEvent == true) {
					var te = js_Boot.__cast(event , TouchEvent);
					mouseEvent.screenX = (te.changedTouches[0].pageX - haxe_ui_core_Screen.get_instance().get_container().offsetLeft) / haxe_ui_Toolkit.get_scaleX();
					mouseEvent.screenY = (te.changedTouches[0].pageY - haxe_ui_core_Screen.get_instance().get_container().offsetTop) / haxe_ui_Toolkit.get_scaleY();
					mouseEvent.touchEvent = true;
				} else if(((event) instanceof MouseEvent)) {
					var me = js_Boot.__cast(event , MouseEvent);
					mouseEvent.buttonDown = me.buttons != 0;
					mouseEvent.screenX = (me.pageX - haxe_ui_core_Screen.get_instance().get_container().offsetLeft) / haxe_ui_Toolkit.get_scaleX();
					mouseEvent.screenY = (me.pageY - haxe_ui_core_Screen.get_instance().get_container().offsetTop) / haxe_ui_Toolkit.get_scaleY();
					mouseEvent.ctrlKey = me.ctrlKey;
					mouseEvent.shiftKey = me.shiftKey;
				}
				fn(mouseEvent);
			}
		}
	}
	,getComponentOffset: function() {
		return new haxe_ui_geom_Point(0,0);
	}
	,__onMouseWheelEvent: function(event) {
		var fn = this._eventMap.h["mousewheel"];
		if(fn == null) {
			return;
		}
		var delta = 0;
		if(Reflect.field(event,"wheelDelta") != null) {
			delta = Reflect.field(event,"wheelDelta");
		} else if(((event) instanceof WheelEvent)) {
			delta = (js_Boot.__cast(event , WheelEvent)).deltaY;
		} else {
			delta = -event.detail;
		}
		delta = Math.max(-1,Math.min(1,delta));
		var mouseEvent = new haxe_ui_events_MouseEvent("mousewheel");
		mouseEvent._originalEvent = event;
		mouseEvent.screenX = (event.pageX - haxe_ui_core_Screen.get_instance().get_container().offsetLeft) / haxe_ui_Toolkit.get_scaleX();
		mouseEvent.screenY = (event.pageY - haxe_ui_core_Screen.get_instance().get_container().offsetTop) / haxe_ui_Toolkit.get_scaleY();
		mouseEvent.ctrlKey = event.ctrlKey;
		mouseEvent.shiftKey = event.shiftKey;
		mouseEvent.delta = delta;
		fn(mouseEvent);
	}
	,__onKeyboardEvent: function(event) {
		var type = haxe_ui_backend_html5_EventMapper.DOM_TO_HAXEUI.h[event.type];
		if(type != null) {
			var fn = this._eventMap.h[type];
			if(fn != null) {
				var keyboardEvent = new haxe_ui_events_KeyboardEvent(type);
				keyboardEvent._originalEvent = event;
				if(((event) instanceof KeyboardEvent)) {
					var me = js_Boot.__cast(event , KeyboardEvent);
					keyboardEvent.keyCode = me.keyCode;
					keyboardEvent.altKey = me.altKey;
					keyboardEvent.ctrlKey = me.ctrlKey;
					keyboardEvent.shiftKey = me.shiftKey;
				}
				fn(keyboardEvent);
			}
		}
	}
	,__onScrollEvent: function(event) {
		var type = haxe_ui_backend_html5_EventMapper.DOM_TO_HAXEUI.h[event.type];
		var fn = this._eventMap.h[type];
		if(fn != null) {
			var scrollEvent = new haxe_ui_events_ScrollEvent("scrollchange");
			fn(scrollEvent);
		}
	}
	,registerBehaviours: function() {
		haxe_ui_backend_ComponentBase.prototype.registerBehaviours.call(this);
	}
	,cloneComponent: function() {
		var c = haxe_ui_backend_ComponentBase.prototype.cloneComponent.call(this);
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		return c;
	}
	,self: function() {
		return new haxe_ui_backend_ComponentImpl();
	}
	,__class__: haxe_ui_backend_ComponentImpl
});
var haxe_ui_validation_IValidating = function() { };
$hxClasses["haxe.ui.validation.IValidating"] = haxe_ui_validation_IValidating;
haxe_ui_validation_IValidating.__name__ = "haxe.ui.validation.IValidating";
haxe_ui_validation_IValidating.__isInterface__ = true;
haxe_ui_validation_IValidating.prototype = {
	get_depth: null
	,set_depth: null
	,validateComponent: null
	,updateComponentDisplay: null
	,__class__: haxe_ui_validation_IValidating
	,__properties__: {set_depth:"set_depth",get_depth:"get_depth"}
};
var haxe_ui_core_IComponentBase = function() { };
$hxClasses["haxe.ui.core.IComponentBase"] = haxe_ui_core_IComponentBase;
haxe_ui_core_IComponentBase.__name__ = "haxe.ui.core.IComponentBase";
haxe_ui_core_IComponentBase.__isInterface__ = true;
haxe_ui_core_IComponentBase.prototype = {
	mapEvent: null
	,handleAddComponent: null
	,__class__: haxe_ui_core_IComponentBase
};
var haxe_ui_core_Component = function() {
	this._zeroSize = false;
	this._initialSizeApplied = false;
	this._scriptAccess = true;
	this._includeInLayout = true;
	this._styleSheet = null;
	this._cachedStyleSheetRef = null;
	this._useCachedStyleSheetRef = false;
	this.classes = [];
	this._customStyle = null;
	this._hidden = false;
	this.bindingRoot = false;
	this._dragInitiator = null;
	this.userData = null;
	this._animatable = true;
	this._native = null;
	this._defaultLayoutClass = null;
	haxe_ui_backend_ComponentImpl.call(this);
	this.addClass(haxe_ui_Backend.get_id(),false);
	var c = js_Boot.getClass(this);
	while(c != null) {
		var css = c.__name__;
		var className = css.split(".").pop();
		this.addClass(className.toLowerCase(),false);
		this.addClass(haxe_ui_util_StringUtil.toDashes(className),false);
		if(className.toLowerCase() == "component") {
			break;
		}
		c = c.__super__;
	}
	var s = haxe_ui_Toolkit.styleSheet.buildStyleFor(this);
	if(s.native != null && this.get_hasNativeEntry() == true) {
		this.set_native(s.native);
	} else {
		this.create();
	}
	if(haxe_ui_Toolkit.get_initialized() == false) {
		console.log("haxe/ui/core/Component.hx:74:","WARNING: You are trying to create a component before the toolkit has been initialized. This could have undefined results.");
	}
};
$hxClasses["haxe.ui.core.Component"] = haxe_ui_core_Component;
haxe_ui_core_Component.__name__ = "haxe.ui.core.Component";
haxe_ui_core_Component.__interfaces__ = [haxe_ui_validation_IValidating,haxe_ui_core_IComponentBase];
haxe_ui_core_Component.addNamedComponentsFrom = function(parent,list) {
	if(parent == null) {
		return;
	}
	if(parent.get_id() != null) {
		list.push(parent);
	}
	var _g = 0;
	var _g1 = parent._children == null ? [] : parent._children;
	while(_g < _g1.length) {
		var child = _g1[_g];
		++_g;
		haxe_ui_core_Component.addNamedComponentsFrom(child,list);
	}
};
haxe_ui_core_Component.__super__ = haxe_ui_backend_ComponentImpl;
haxe_ui_core_Component.prototype = $extend(haxe_ui_backend_ComponentImpl.prototype,{
	_defaultLayoutClass: null
	,create: function() {
		if(this.get_native() == false || this.get_native() == null) {
			this.registerComposite();
		}
		this.createDefaults();
		this.handleCreate(this.get_native());
		this.destroyChildren();
		this.registerBehaviours();
		this.behaviours.replaceNative();
		if(this.get_native() == false || this.get_native() == null) {
			if(this._compositeBuilderClass != null) {
				if(this._compositeBuilder == null) {
					this._compositeBuilder = Type.createInstance(this._compositeBuilderClass,[this]);
				}
				this._compositeBuilder.create();
			}
			this.createChildren();
			if(this._internalEventsClass != null && this._internalEvents == null) {
				this.registerInternalEvents(this._internalEventsClass);
			}
		} else {
			var builderClass = this.getNativeConfigProperty(".builder.@class");
			if(builderClass != null) {
				if(this._compositeBuilder == null) {
					this._compositeBuilder = Type.createInstance($hxClasses[builderClass],[this]);
				}
				this._compositeBuilder.create();
			}
		}
		this.behaviours.applyDefaults();
	}
	,_compositeBuilderClass: null
	,_compositeBuilder: null
	,registerComposite: function() {
	}
	,createDefaults: function() {
	}
	,createChildren: function() {
	}
	,destroyChildren: function() {
		this.unregisterInternalEvents();
	}
	,createLayout: function() {
		var l = null;
		if(this.get_native() == true) {
			var sizeProps = this.getNativeConfigProperties(".size");
			if(sizeProps != null && Object.prototype.hasOwnProperty.call(sizeProps.h,"class")) {
				var name = sizeProps.h["class"];
				var size = Type.createInstance($hxClasses[name],[]);
				size.config = sizeProps;
				l = new haxe_ui_layouts_DelegateLayout(size);
			} else {
				var layoutProps = this.getNativeConfigProperties(".layout");
				if(layoutProps != null && Object.prototype.hasOwnProperty.call(layoutProps.h,"class")) {
					var name = layoutProps.h["class"];
					l = Type.createInstance($hxClasses[name],[]);
				}
			}
		}
		if(l == null) {
			if(this._defaultLayoutClass != null) {
				l = Type.createInstance(this._defaultLayoutClass,[]);
			} else {
				l = new haxe_ui_layouts_DefaultLayout();
			}
		}
		return l;
	}
	,_native: null
	,get_native: function() {
		if(this._native == null) {
			return false;
		}
		if(this.get_hasNativeEntry() == false) {
			return false;
		}
		return this._native;
	}
	,set_native: function(value) {
		if(this.get_hasNativeEntry() == false) {
			return value;
		}
		if(this._native == value) {
			return value;
		}
		this._native = value;
		this.get_customStyle().native = value;
		if(this._native == true && this.get_hasNativeEntry()) {
			this.addClass(":native");
		} else {
			this.removeClass(":native");
		}
		this.behaviours.cache();
		this.behaviours.detatch();
		this.create();
		if(this.get_layout() != null) {
			this.set_layout(this.createLayout());
		}
		this.behaviours.restore();
		return value;
	}
	,_animatable: null
	,get_animatable: function() {
		return false;
	}
	,set_animatable: function(value) {
		if(this._animatable != value) {
			if(value == false && this._componentAnimation != null) {
				this._componentAnimation.stop();
				this._componentAnimation = null;
			}
			this._animatable = value;
		}
		this._animatable = value;
		return value;
	}
	,_componentAnimation: null
	,get_componentAnimation: function() {
		return this._componentAnimation;
	}
	,set_componentAnimation: function(value) {
		if(this._componentAnimation != value && this._animatable == true) {
			if(this._componentAnimation != null) {
				this._componentAnimation.stop();
			}
			this._componentAnimation = value;
		}
		return value;
	}
	,userData: null
	,screen: null
	,get_screen: function() {
		return haxe_ui_Toolkit.get_screen();
	}
	,get_draggable: function() {
		return haxe_ui_dragdrop_DragManager.get_instance().isRegisteredDraggable(this);
	}
	,set_draggable: function(value) {
		if(value == true) {
			haxe_ui_dragdrop_DragManager.get_instance().registerDraggable(this,{ mouseTarget : this._dragInitiator});
		} else {
			haxe_ui_dragdrop_DragManager.get_instance().unregisterDraggable(this);
		}
		return value;
	}
	,_dragInitiator: null
	,get_dragInitiator: function() {
		return this._dragInitiator;
	}
	,set_dragInitiator: function(value) {
		this._dragInitiator = value;
		this.set_draggable(true);
		return value;
	}
	,bindingRoot: null
	,get_rootComponent: function() {
		var r = this;
		while(r.parentComponent != null) r = r.parentComponent;
		return r;
	}
	,get_numComponents: function() {
		if(this._compositeBuilder != null) {
			return this._compositeBuilder.get_numComponents();
		} else if(this._children == null) {
			return 0;
		} else {
			return this._children.length;
		}
	}
	,addComponent: function(child) {
		if(this._compositeBuilder != null) {
			var v = this._compositeBuilder.addComponent(child);
			if(v != null) {
				v.set_scriptAccess(this.get_scriptAccess());
				return v;
			}
		}
		if(this.get_native() == true) {
			var allowChildren = this.getNativeConfigPropertyBool(".@allowChildren",true);
			if(allowChildren == false) {
				return child;
			}
		}
		child.parentComponent = this;
		child._isDisposed = false;
		if(this._children == null) {
			this._children = [];
		}
		this._children.push(child);
		this.handleAddComponent(child);
		if(this._ready) {
			child.ready();
		}
		this.assignPositionClasses();
		if(!(this._layout == null || this._layoutLocked == true)) {
			this.invalidateComponent("layout",false);
		}
		if(this.get_disabled()) {
			child.set_disabled(true);
		}
		if(this._compositeBuilder != null) {
			this._compositeBuilder.onComponentAdded(child);
		}
		this.onComponentAdded(child);
		this.dispatch(new haxe_ui_events_UIEvent("componentAdded"));
		child.set_scriptAccess(this.get_scriptAccess());
		return child;
	}
	,addComponentAt: function(child,index) {
		if(this._compositeBuilder != null) {
			var v = this._compositeBuilder.addComponentAt(child,index);
			if(v != null) {
				v.set_scriptAccess(this.get_scriptAccess());
				return v;
			}
		}
		if(this.get_native() == true) {
			var allowChildren = this.getNativeConfigPropertyBool(".@allowChildren",true);
			if(allowChildren == false) {
				return child;
			}
		}
		child.parentComponent = this;
		child._isDisposed = false;
		if(this._children == null) {
			this._children = [];
		}
		this._children.splice(index,0,child);
		this.handleAddComponentAt(child,index);
		if(this._ready) {
			child.ready();
		}
		this.assignPositionClasses();
		if(!(this._layout == null || this._layoutLocked == true)) {
			this.invalidateComponent("layout",false);
		}
		if(this.get_disabled()) {
			child.set_disabled(true);
		}
		if(this._compositeBuilder != null) {
			this._compositeBuilder.onComponentAdded(child);
		}
		this.onComponentAdded(child);
		this.dispatch(new haxe_ui_events_UIEvent("componentAdded"));
		child.set_scriptAccess(this.get_scriptAccess());
		return child;
	}
	,onComponentAdded: function(child) {
	}
	,removeComponent: function(child,dispose,invalidate) {
		if(invalidate == null) {
			invalidate = true;
		}
		if(dispose == null) {
			dispose = true;
		}
		if(child == null) {
			return null;
		}
		if(this._compositeBuilder != null) {
			var v = this._compositeBuilder.removeComponent(child,dispose,invalidate);
			if(v != null) {
				return v;
			}
		}
		if(this._children != null) {
			if(HxOverrides.remove(this._children,child)) {
				child.parentComponent = null;
				child.set_depth(-1);
			}
			if(dispose == true) {
				child.disposeComponent();
			}
		}
		this.handleRemoveComponent(child,dispose);
		this.assignPositionClasses(invalidate);
		if(this._children != null && invalidate == true) {
			if(!(this._layout == null || this._layoutLocked == true)) {
				this.invalidateComponent("layout",false);
			}
		}
		if(this._compositeBuilder != null) {
			this._compositeBuilder.onComponentRemoved(child);
		}
		this.onComponentRemoved(child);
		this.dispatch(new haxe_ui_events_UIEvent("componentRemoved"));
		return child;
	}
	,disposeComponent: function() {
		this._isDisposed = true;
		this.removeAllComponents(true);
		this.destroyComponent();
		this.unregisterEvents();
	}
	,removeComponentAt: function(index,dispose,invalidate) {
		if(invalidate == null) {
			invalidate = true;
		}
		if(dispose == null) {
			dispose = true;
		}
		if(this._children == null) {
			return null;
		}
		var childCount = this._children.length;
		if(this._compositeBuilder != null) {
			var compositeChildCount = this._compositeBuilder.get_numComponents();
			if(compositeChildCount != null) {
				childCount = compositeChildCount;
			}
		}
		if(index < 0 || index > childCount - 1) {
			return null;
		}
		if(this._compositeBuilder != null) {
			var v = this._compositeBuilder.removeComponentAt(index,dispose,invalidate);
			if(v != null) {
				return v;
			}
		}
		var child = this._children[index];
		if(child == null) {
			return null;
		}
		if(dispose == true) {
			child._isDisposed = true;
			child.removeAllComponents(true);
		}
		this.handleRemoveComponentAt(index,dispose);
		if(HxOverrides.remove(this._children,child)) {
			child.parentComponent = null;
			child.set_depth(-1);
		}
		if(dispose == true) {
			child.destroyComponent();
			child.unregisterEvents();
		}
		this.assignPositionClasses(invalidate);
		if(invalidate == true) {
			if(!(this._layout == null || this._layoutLocked == true)) {
				this.invalidateComponent("layout",false);
			}
		}
		if(this._compositeBuilder != null) {
			this._compositeBuilder.onComponentRemoved(child);
		}
		this.onComponentRemoved(child);
		this.dispatch(new haxe_ui_events_UIEvent("componentRemoved"));
		return child;
	}
	,onComponentRemoved: function(child) {
	}
	,assignPositionClasses: function(invalidate) {
		if(invalidate == null) {
			invalidate = true;
		}
		var _g = 0;
		var _g1 = (this._children == null ? [] : this._children).length;
		while(_g < _g1) {
			var i = _g++;
			var c = (this._children == null ? [] : this._children)[i];
			if(i == 0) {
				c.swapClass("first","last",invalidate);
			} else if((this._children == null ? [] : this._children).length > 1 && i == (this._children == null ? [] : this._children).length - 1) {
				c.swapClass("last","first",invalidate);
			} else {
				c.removeClasses(["first","last"],invalidate);
			}
		}
	}
	,destroyComponent: function() {
		if(this._compositeBuilder != null) {
			this._compositeBuilder.destroy();
		}
		haxe_ui_locale_LocaleManager.get_instance().unregisterComponent(this);
		this.onDestroy();
	}
	,onDestroy: function() {
		var _g = 0;
		var _g1 = this._children == null ? [] : this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.onDestroy();
		}
		this.dispatch(new haxe_ui_events_UIEvent("destroy"));
	}
	,walkComponents: function(callback) {
		if(callback(this) == false) {
			return;
		}
		var _g = 0;
		var _g1 = this._children == null ? [] : this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(callback(child) == false) {
				return;
			}
		}
		var _g = 0;
		var _g1 = this._children == null ? [] : this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			var cont = [true];
			child.walkComponents((function(cont) {
				return function(c) {
					cont[0] = callback(c);
					return cont[0];
				};
			})(cont));
			if(cont[0] == false) {
				break;
			}
		}
	}
	,removeAllComponents: function(dispose) {
		if(dispose == null) {
			dispose = true;
		}
		if(this._children != null) {
			while(this._children.length > 0) {
				this._children[0].removeAllComponents(dispose);
				this.removeComponent(this._children[0],dispose,false);
			}
			if(!(this._layout == null || this._layoutLocked == true)) {
				this.invalidateComponent("layout",false);
			}
		}
	}
	,matchesSearch: function(criteria,type,searchType) {
		if(searchType == null) {
			searchType = "id";
		}
		if(criteria != null) {
			if(!(searchType == "id" && this.get_id() == criteria)) {
				if(searchType == "css") {
					return this.classes.indexOf(criteria) != -1 == true;
				} else {
					return false;
				}
			} else {
				return true;
			}
		} else if(type != null) {
			return js_Boot.__instanceof(this,type) == true;
		}
		return false;
	}
	,findComponent: function(criteria,type,recursive,searchType) {
		if(searchType == null) {
			searchType = "id";
		}
		if(recursive == null && criteria != null && searchType == "id") {
			recursive = true;
		}
		var match = null;
		var _g = 0;
		var _g1 = this._children == null ? [] : this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.matchesSearch(criteria,type,searchType)) {
				match = child;
				break;
			}
		}
		if(match == null && recursive == true) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				var temp = child.findComponent(criteria,type,recursive,searchType);
				if(temp != null) {
					match = temp;
					break;
				}
			}
			if(match == null && this._compositeBuilder != null) {
				match = this._compositeBuilder.findComponent(criteria,type,recursive,searchType);
			}
		}
		return match;
	}
	,findComponents: function(styleName,type,maxDepth) {
		if(maxDepth == null) {
			maxDepth = 5;
		}
		if(maxDepth == -1) {
			maxDepth = 100;
		}
		if(maxDepth <= 0) {
			return [];
		}
		--maxDepth;
		var r = [];
		if(this._compositeBuilder != null) {
			var childArray = this._compositeBuilder.findComponents(styleName,type,maxDepth);
			if(childArray != null) {
				var _g = 0;
				while(_g < childArray.length) {
					var c = childArray[_g];
					++_g;
					r.push(c);
				}
			}
		}
		var _g = 0;
		var _g1 = this._children == null ? [] : this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			var match = true;
			if(styleName != null && child.classes.indexOf(styleName) != -1 == false) {
				match = false;
			}
			if(type != null && js_Boot.__instanceof(child,type) == false) {
				match = false;
			}
			if(match == true) {
				r.push(child);
			} else {
				var childArray = child.findComponents(styleName,type,maxDepth);
				var _g2 = 0;
				while(_g2 < childArray.length) {
					var c = childArray[_g2];
					++_g2;
					r.push(c);
				}
			}
		}
		return r;
	}
	,findAncestor: function(criteria,type,searchType) {
		if(searchType == null) {
			searchType = "id";
		}
		var match = null;
		var p = this.parentComponent;
		while(p != null) if(p.matchesSearch(criteria,type,searchType)) {
			match = p;
			break;
		} else {
			p = p.parentComponent;
		}
		return match;
	}
	,findComponentsUnderPoint: function(screenX,screenY,type) {
		var c = [];
		if(this.hitTest(screenX,screenY,true)) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				if(child.hitTest(screenX,screenY,true)) {
					var match = true;
					if(type != null && js_Boot.__instanceof(child,type) == false) {
						match = false;
					}
					if(match == true) {
						c.push(child);
					}
					c = c.concat(child.findComponentsUnderPoint(screenX,screenY,type));
				}
			}
		}
		return c;
	}
	,getComponentIndex: function(child) {
		if(this._compositeBuilder != null) {
			var index = this._compositeBuilder.getComponentIndex(child);
			if(index != -2147483648) {
				return index;
			}
		}
		var index = -1;
		if(this._children != null && child != null) {
			index = this._children.indexOf(child);
		}
		return index;
	}
	,setComponentIndex: function(child,index) {
		if(this._compositeBuilder != null) {
			var v = this._compositeBuilder.setComponentIndex(child,index);
			if(v != null) {
				return v;
			}
		}
		if(index >= 0 && index <= this._children.length && child.parentComponent == this) {
			this.handleSetComponentIndex(child,index);
			HxOverrides.remove(this._children,child);
			this._children.splice(index,0,child);
			if(!(this._layout == null || this._layoutLocked == true)) {
				this.invalidateComponent("layout",false);
			}
		}
		return child;
	}
	,getComponentAt: function(index) {
		if(this._compositeBuilder != null) {
			var v = this._compositeBuilder.getComponentAt(index);
			if(v != null) {
				return v;
			}
		}
		if(this._children == null) {
			return null;
		}
		return this._children[index];
	}
	,hide: function() {
		if(this._compositeBuilder != null) {
			var v = this._compositeBuilder.hide();
			if(v == true) {
				return;
			}
		}
		if(this._hidden == false) {
			this._hidden = true;
			this.handleVisibility(false);
			if(this.parentComponent != null) {
				var _this = this.parentComponent;
				if(!(_this._layout == null || _this._layoutLocked == true)) {
					_this.invalidateComponent("layout",false);
				}
			}
			this.dispatchRecursively(new haxe_ui_events_UIEvent("hidden"));
		}
	}
	,hideInternal: function(dispatchChildren) {
		if(dispatchChildren == null) {
			dispatchChildren = false;
		}
		if(this._compositeBuilder != null) {
			var v = this._compositeBuilder.hide();
			if(v == true) {
				return;
			}
		}
		if(this._hidden == false) {
			this._hidden = true;
			this.handleVisibility(false);
			if(this.parentComponent != null) {
				var _this = this.parentComponent;
				if(!(_this._layout == null || _this._layoutLocked == true)) {
					_this.invalidateComponent("layout",false);
				}
			}
			if(dispatchChildren == true) {
				this.dispatchRecursively(new haxe_ui_events_UIEvent("hidden"));
			} else {
				this.dispatch(new haxe_ui_events_UIEvent("hidden"));
			}
		}
	}
	,show: function() {
		if(this._compositeBuilder != null) {
			var v = this._compositeBuilder.show();
			if(v == true) {
				return;
			}
		}
		if(this._hidden == true) {
			this._hidden = false;
			this.handleVisibility(true);
			if(!(this._layout == null || this._layoutLocked == true)) {
				this.invalidateComponent("layout",false);
			}
			if(this.parentComponent != null) {
				var _this = this.parentComponent;
				if(!(_this._layout == null || _this._layoutLocked == true)) {
					_this.invalidateComponent("layout",false);
				}
			}
			this.dispatchRecursively(new haxe_ui_events_UIEvent("shown"));
		}
	}
	,showInternal: function(dispatchChildren) {
		if(dispatchChildren == null) {
			dispatchChildren = false;
		}
		if(this._compositeBuilder != null) {
			var v = this._compositeBuilder.show();
			if(v == true) {
				return;
			}
		}
		if(this._hidden == true) {
			this._hidden = false;
			this.handleVisibility(true);
			if(!(this._layout == null || this._layoutLocked == true)) {
				this.invalidateComponent("layout",false);
			}
			if(this.parentComponent != null) {
				var _this = this.parentComponent;
				if(!(_this._layout == null || _this._layoutLocked == true)) {
					_this.invalidateComponent("layout",false);
				}
			}
			if(dispatchChildren == true) {
				this.dispatchRecursively(new haxe_ui_events_UIEvent("shown"));
			} else {
				this.dispatch(new haxe_ui_events_UIEvent("shown"));
			}
		}
	}
	,fadeIn: function(onEnd,show) {
		if(show == null) {
			show = true;
		}
		var _gthis = this;
		if(onEnd != null || show == true) {
			var prevStart = this.onAnimationStart;
			var prevEnd = this.onAnimationEnd;
			if(show == true) {
				prevStart = this.onAnimationStart;
				this.set_onAnimationStart(function(e) {
					_gthis.show();
					_gthis.set_onAnimationStart(prevStart);
				});
			}
			this.set_onAnimationEnd(function(e) {
				if(onEnd != null) {
					onEnd();
				}
				_gthis.removeClass("fade-in");
				_gthis.set_onAnimationEnd(prevEnd);
			});
		}
		this.swapClass("fade-in","fade-out");
	}
	,fadeOut: function(onEnd,hide) {
		if(hide == null) {
			hide = true;
		}
		var _gthis = this;
		if(onEnd != null || hide == true) {
			var prevEnd = this.onAnimationEnd;
			this.set_onAnimationEnd(function(e) {
				if(hide == true) {
					_gthis.hide();
				}
				if(onEnd != null) {
					onEnd();
				}
				_gthis.set_onAnimationEnd(prevEnd);
				_gthis.removeClass("fade-out");
			});
		}
		this.swapClass("fade-out","fade-in");
	}
	,_hidden: null
	,get_hidden: function() {
		if(this._hidden == true) {
			return true;
		}
		if(this.parentComponent != null) {
			return this.parentComponent.get_hidden();
		}
		return false;
	}
	,set_hidden: function(value) {
		if(value == this._hidden) {
			return value;
		}
		if(value == true) {
			this.hide();
		} else {
			this.show();
		}
		return value;
	}
	,_customStyle: null
	,get_customStyle: function() {
		if(this._customStyle == null) {
			this._customStyle = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		return this._customStyle;
	}
	,set_customStyle: function(value) {
		if(value != this._customStyle) {
			this.invalidateComponent("style",false);
		}
		this._customStyle = value;
		return value;
	}
	,classes: null
	,addClass: function(name,invalidate,recursive) {
		if(recursive == null) {
			recursive = false;
		}
		if(invalidate == null) {
			invalidate = true;
		}
		if(this.classes.indexOf(name) == -1) {
			this.classes.push(name);
			if(invalidate == true) {
				this.invalidateComponent("style",false);
			}
		}
		if(recursive == true) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.addClass(name,invalidate,recursive);
			}
		}
	}
	,addClasses: function(names,invalidate,recursive) {
		if(recursive == null) {
			recursive = false;
		}
		if(invalidate == null) {
			invalidate = true;
		}
		var needsInvalidate = false;
		var _g = 0;
		while(_g < names.length) {
			var name = names[_g];
			++_g;
			if(this.classes.indexOf(name) == -1) {
				this.classes.push(name);
				if(invalidate == true) {
					needsInvalidate = true;
				}
			}
		}
		if(needsInvalidate == true) {
			this.invalidateComponent("style",false);
		}
		if(recursive == true) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.addClasses(names,invalidate,recursive);
			}
		}
	}
	,removeClass: function(name,invalidate,recursive) {
		if(recursive == null) {
			recursive = false;
		}
		if(invalidate == null) {
			invalidate = true;
		}
		if(this.classes.indexOf(name) != -1) {
			HxOverrides.remove(this.classes,name);
			if(invalidate == true) {
				this.invalidateComponent("style",false);
			}
		}
		if(recursive == true) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.removeClass(name,invalidate,recursive);
			}
		}
	}
	,removeClasses: function(names,invalidate,recursive) {
		if(recursive == null) {
			recursive = false;
		}
		if(invalidate == null) {
			invalidate = true;
		}
		var needsInvalidate = false;
		var _g = 0;
		while(_g < names.length) {
			var name = names[_g];
			++_g;
			if(this.classes.indexOf(name) != -1) {
				HxOverrides.remove(this.classes,name);
				if(invalidate == true) {
					needsInvalidate = true;
				}
			}
		}
		if(needsInvalidate == true) {
			this.invalidateComponent("style",false);
		}
		if(recursive == true) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.removeClasses(names,invalidate,recursive);
			}
		}
	}
	,hasClass: function(name) {
		return this.classes.indexOf(name) != -1;
	}
	,swapClass: function(classToAdd,classToRemove,invalidate,recursive) {
		if(recursive == null) {
			recursive = false;
		}
		if(invalidate == null) {
			invalidate = true;
		}
		var needsInvalidate = false;
		if(classToAdd != null && this.classes.indexOf(classToAdd) == -1) {
			this.classes.push(classToAdd);
			needsInvalidate = true;
		}
		if(classToRemove != null && this.classes.indexOf(classToRemove) != -1) {
			HxOverrides.remove(this.classes,classToRemove);
			needsInvalidate = true;
		}
		if(invalidate == true && needsInvalidate == true) {
			this.invalidateComponent("style",false);
		}
		if(recursive == true) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.swapClass(classToAdd,classToRemove,invalidate,recursive);
			}
		}
	}
	,get_styleNames: function() {
		return this.classes.join(" ");
	}
	,set_styleNames: function(value) {
		if(value == null) {
			return value;
		}
		var _g = 0;
		var _g1 = value.split(" ");
		while(_g < _g1.length) {
			var x = _g1[_g];
			++_g;
			this.addClass(x);
		}
		return value;
	}
	,_styleString: null
	,get_styleString: function() {
		return this._styleString;
	}
	,set_styleString: function(value) {
		if(value == null || value == this._styleString) {
			return value;
		}
		var cssString = StringTools.trim(value);
		if(cssString.length == 0) {
			return value;
		}
		if(StringTools.endsWith(cssString,";") == false) {
			cssString += ";";
		}
		cssString = "_ { " + cssString + "}";
		var s = new haxe_ui_styles_Parser().parse(cssString);
		this.get_customStyle().mergeDirectives(s.get_rules()[0].directives);
		this._styleString = value;
		this.invalidateComponent("style",false);
		return value;
	}
	,_useCachedStyleSheetRef: null
	,_cachedStyleSheetRef: null
	,_styleSheet: null
	,get_styleSheet: function() {
		if(this._useCachedStyleSheetRef == true) {
			return this._cachedStyleSheetRef;
		}
		var s = null;
		var ref = this;
		while(ref != null) {
			if(ref._styleSheet != null) {
				s = ref._styleSheet;
				break;
			}
			ref = ref.parentComponent;
		}
		this._useCachedStyleSheetRef = true;
		this._cachedStyleSheetRef = s;
		return s;
	}
	,set_styleSheet: function(value) {
		this._styleSheet = value;
		this.resetCachedStyleSheetRef();
		return value;
	}
	,resetCachedStyleSheetRef: function() {
		this._cachedStyleSheetRef = null;
		this._useCachedStyleSheetRef = false;
		var _g = 0;
		var _g1 = this._children == null ? [] : this._children;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			c.resetCachedStyleSheetRef();
		}
	}
	,_includeInLayout: null
	,get_includeInLayout: function() {
		if(this._hidden == true) {
			return false;
		}
		return this._includeInLayout;
	}
	,set_includeInLayout: function(value) {
		this._includeInLayout = value;
		return value;
	}
	,get_layout: function() {
		return this._layout;
	}
	,set_layout: function(value) {
		if(value == null) {
			return value;
		}
		var tmp;
		if(this._layout != null) {
			var c = js_Boot.getClass(value);
			var tmp1 = c.__name__;
			var c = js_Boot.getClass(this._layout);
			tmp = tmp1 == c.__name__;
		} else {
			tmp = false;
		}
		if(tmp) {
			return value;
		}
		this._layout = value;
		this._layout.set_component(this);
		return value;
	}
	,lockLayout: function(recursive) {
		if(recursive == null) {
			recursive = false;
		}
		if(this._layoutLocked == true) {
			return;
		}
		this._layoutLocked = true;
		if(recursive == true) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.lockLayout(recursive);
			}
		}
	}
	,unlockLayout: function(recursive) {
		if(recursive == null) {
			recursive = false;
		}
		if(this._layoutLocked == false) {
			return;
		}
		if(recursive == true) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.unlockLayout(recursive);
			}
		}
		this._layoutLocked = false;
		if(!(this._layout == null || this._layoutLocked == true)) {
			this.invalidateComponent("layout",false);
		}
	}
	,ready: function() {
		var _gthis = this;
		this.set_depth(haxe_ui_util_ComponentUtil.getDepth(this));
		if(this.isComponentInvalid()) {
			this._invalidateCount = 0;
			haxe_ui_validation_ValidationManager.get_instance().add(this);
		}
		if(this._ready == false) {
			this._ready = true;
			this.handleReady();
			if((this._children == null ? [] : this._children) != null) {
				var _g = 0;
				var _g1 = this._children == null ? [] : this._children;
				while(_g < _g1.length) {
					var child = _g1[_g];
					++_g;
					child.ready();
				}
			}
			this.invalidateComponent();
			this.behaviours.ready();
			this.behaviours.update();
			haxe_ui_Toolkit.callLater(function() {
				_gthis.invalidateComponent("data",false);
				_gthis.invalidateComponent("style",false);
				if(_gthis._compositeBuilder != null) {
					_gthis._compositeBuilder.onReady();
				}
				_gthis.onReady();
				_gthis.dispatch(new haxe_ui_events_UIEvent("ready"));
				if(_gthis._hidden == false) {
					_gthis.dispatch(new haxe_ui_events_UIEvent("shown"));
				}
			});
		}
	}
	,onReady: function() {
	}
	,onInitialize: function() {
	}
	,onResized: function() {
	}
	,onMoved: function() {
	}
	,_scriptAccess: null
	,get_scriptAccess: function() {
		return this._scriptAccess;
	}
	,set_scriptAccess: function(value) {
		if(value == this._scriptAccess) {
			return value;
		}
		this._scriptAccess = value;
		var _g = 0;
		var _g1 = this._children == null ? [] : this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.set_scriptAccess(value);
		}
		return value;
	}
	,namedComponents: null
	,get_namedComponents: function() {
		var list = [];
		haxe_ui_core_Component.addNamedComponentsFrom(this,list);
		return list;
	}
	,onThemeChanged: function() {
		this._initialSizeApplied = false;
		if(this._style != null) {
			if(this._style.initialWidth != null) {
				this.set_width(0);
			}
			if(this._style.initialPercentWidth != null) {
				this.set_percentWidth(null);
			}
			if(this._style.initialHeight != null) {
				this.set_height(0);
			}
			if(this._style.initialPercentHeight != null) {
				this.set_percentHeight(null);
			}
		}
	}
	,initializeComponent: function() {
		if(this._isInitialized == true) {
			return;
		}
		if(this._compositeBuilder != null) {
			this._compositeBuilder.onInitialize();
		}
		this.onInitialize();
		if(this._layout == null) {
			this.set_layout(this.createLayout());
		}
		this._isInitialized = true;
		if(this.hasEvent("initialize")) {
			this.dispatch(new haxe_ui_events_UIEvent("initialize"));
		}
	}
	,_initialSizeApplied: null
	,validateInitialSize: function(isInitialized) {
		if(isInitialized == false && this._style != null && this._initialSizeApplied == false) {
			if((this._style.initialWidth != null || this._style.initialPercentWidth != null) && (this.get_width() <= 0 && this.get_percentWidth() == null)) {
				if(this._style.initialWidth != null) {
					this.set_width(this._style.initialWidth);
					this._initialSizeApplied = true;
				} else if(this._style.initialPercentWidth != null) {
					this.set_percentWidth(this._style.initialPercentWidth);
					this._initialSizeApplied = true;
				}
			}
			if((this._style.initialHeight != null || this._style.initialPercentHeight != null) && (this.get_height() <= 0 && this.get_percentHeight() == null)) {
				if(this._style.initialHeight != null) {
					this.set_height(this._style.initialHeight);
					this._initialSizeApplied = true;
				} else if(this._style.initialPercentHeight != null) {
					this.set_percentHeight(this._style.initialPercentHeight);
					this._initialSizeApplied = true;
				}
			}
		}
	}
	,validateComponentLayout: function() {
		this.get_layout().refresh();
		while(this.validateComponentAutoSize()) this.get_layout().refresh();
		var sizeChanged = false;
		if(this._componentWidth != this._actualWidth || this._componentHeight != this._actualHeight) {
			this._actualWidth = this._componentWidth;
			this._actualHeight = this._componentHeight;
			this.enforceSizeConstraints();
			if(this.parentComponent != null) {
				var _this = this.parentComponent;
				if(!(_this._layout == null || _this._layoutLocked == true)) {
					_this.invalidateComponent("layout",false);
				}
			}
			this.onResized();
			this.dispatch(new haxe_ui_events_UIEvent("resize"));
			sizeChanged = true;
		}
		if(this._compositeBuilder != null) {
			if(this._compositeBuilder.validateComponentLayout()) {
				sizeChanged = true;
			}
		}
		return sizeChanged;
	}
	,enforceSizeConstraints: function() {
		if(this.get_style() != null) {
			if(this.get_style().minWidth != null && this._componentWidth < this.get_style().minWidth) {
				this._componentWidth = this._actualWidth = this._width = this.get_style().minWidth;
			}
			if(this.get_style().maxWidth != null && this.get_style().maxPercentWidth == null && this._componentWidth > this.get_style().maxWidth) {
				this._componentWidth = this._actualWidth = this._width = this.get_style().maxWidth;
			} else if(this.get_style().maxWidth == null && this.get_style().maxPercentWidth != null) {
				var p = this;
				var max = 0;
				while(p != null) {
					if(p.get_style() != null && p.get_style().maxPercentWidth == null) {
						max += p.get_width();
						break;
					}
					if(p.get_style() != null && p != this) {
						max -= p.get_style().paddingLeft + p.get_style().paddingRight;
					}
					p = p.parentComponent;
				}
				max = max * this.get_style().maxPercentWidth / 100;
				if(max > 0 && this._componentWidth > max) {
					this._componentWidth = this._actualWidth = this._width = max;
				}
			}
			if(this.get_style().minHeight != null && this._componentHeight < this.get_style().minHeight) {
				this._componentHeight = this._actualHeight = this._height = this.get_style().minHeight;
			}
			if(this.get_style().maxHeight != null && this.get_style().maxPercentHeight == null && this._componentHeight > this.get_style().maxHeight) {
				this._componentHeight = this._actualHeight = this._height = this.get_style().maxHeight;
			} else if(this.get_style().maxHeight == null && this.get_style().maxPercentHeight != null) {
				var p = this;
				var max = 0;
				while(p != null) {
					if(p.get_style() != null && p.get_style().maxPercentHeight == null) {
						max += p.get_height();
						break;
					}
					if(p.get_style() != null && p != this) {
						max -= p.get_style().paddingTop + p.get_style().paddingBottom;
					}
					p = p.parentComponent;
				}
				max = max * this.get_style().maxPercentHeight / 100;
				if(max > 0 && this._componentHeight > max) {
					this._componentHeight = this._actualHeight = this._height = max;
				}
			}
		}
	}
	,validateComponentStyle: function() {
		var s = haxe_ui_Toolkit.styleSheet.buildStyleFor(this);
		if(this.get_styleSheet() != null) {
			var localStyle = this.get_styleSheet().buildStyleFor(this);
			s.apply(localStyle);
		}
		s.apply(this.get_customStyle());
		if(this._style == null || this._style.equalTo(s) == false) {
			var marginsChanged = false;
			if(this.parentComponent != null && this._style != null) {
				marginsChanged = this._style.marginLeft != s.marginLeft || this._style.marginRight != s.marginRight || this._style.marginTop != s.marginTop || this._style.marginBottom != s.marginBottom;
			}
			this._style = s;
			this.applyStyle(s);
			if(marginsChanged == true) {
				var _this = this.parentComponent;
				if(!(_this._layout == null || _this._layoutLocked == true)) {
					_this.invalidateComponent("layout",false);
				}
			}
		}
	}
	,validateComponentPosition: function() {
		this.handlePosition(this._left,this._top,this._style);
		this.onMoved();
		this.dispatch(new haxe_ui_events_UIEvent("move"));
	}
	,_zeroSize: null
	,updateComponentDisplay: function() {
		if(this.get_componentWidth() == null || this.get_componentHeight() == null) {
			return;
		}
		this.handleSize(this.get_componentWidth(),this.get_componentHeight(),this._style);
		if(this._componentClipRect != null || this.get_style() != null && this.get_style().clip != null && this.get_style().clip == true) {
			this.handleClipRect(this._componentClipRect != null ? this._componentClipRect : new haxe_ui_geom_Rectangle(0,0,this.get_componentWidth(),this.get_componentHeight()));
		}
	}
	,validateComponentAutoSize: function() {
		var invalidate = false;
		if(this.get_autoWidth() == true || this.get_autoHeight() == true) {
			var s = this.get_layout().calcAutoSize();
			if(this.get_autoWidth() == true) {
				if(s.width != this._componentWidth) {
					this._componentWidth = s.width;
					invalidate = true;
				}
			}
			if(this.get_autoHeight() == true) {
				if(s.height != this._componentHeight) {
					this._componentHeight = s.height;
					invalidate = true;
				}
			}
		}
		return invalidate;
	}
	,applyStyle: function(style) {
		haxe_ui_backend_ComponentImpl.prototype.applyStyle.call(this,style);
		if(style != null && this._initialSizeApplied == false) {
			if((style.initialWidth != null || style.initialPercentWidth != null) && (this.get_width() <= 0 && this.get_percentWidth() == null)) {
				if(style.initialWidth != null) {
					this.set_width(style.initialWidth);
					this._initialSizeApplied = true;
				} else if(style.initialPercentWidth != null) {
					this.set_percentWidth(style.initialPercentWidth);
					this._initialSizeApplied = true;
				}
			}
			if(style.autoHeight != true && (style.initialHeight != null || style.initialPercentHeight != null) && (this.get_height() <= 0 && this.get_percentHeight() == null)) {
				if(style.initialHeight != null) {
					this.set_height(style.initialHeight);
					this._initialSizeApplied = true;
				} else if(style.initialPercentHeight != null) {
					this.set_percentHeight(style.initialPercentHeight);
					this._initialSizeApplied = true;
				}
			}
		}
		if(style.left != null) {
			this.set_left(style.left);
		}
		if(style.top != null) {
			this.set_top(style.top);
		}
		if(style.percentWidth != null) {
			this.set_componentWidth(null);
			this.set_percentWidth(style.percentWidth);
		}
		if(style.percentHeight != null) {
			this.set_componentHeight(null);
			this.set_percentHeight(style.percentHeight);
		}
		if(style.width != null) {
			this.set_percentWidth(null);
			this.set_width(style.width);
		}
		if(style.height != null) {
			this.set_percentHeight(null);
			this.set_height(style.height);
		}
		if(style.native != null) {
			this.set_native(style.native);
		}
		if(style.hidden != null) {
			this.set_hidden(style.hidden);
		}
		if(style.animationName != null) {
			var animationKeyFrames = haxe_ui_Toolkit.styleSheet.get_animations().h[style.animationName];
			this.applyAnimationKeyFrame(animationKeyFrames,style.animationOptions);
		} else if(this.get_componentAnimation() != null) {
			this.set_componentAnimation(null);
		}
		if(style.pointerEvents != null && style.pointerEvents != "none") {
			if(this.hasEvent("mouseover",$bind(this,this.onPointerEventsMouseOver)) == false) {
				this.get_customStyle().cursor = "pointer";
				this.registerEvent("mouseover",$bind(this,this.onPointerEventsMouseOver));
			}
			if(this.hasEvent("mouseout",$bind(this,this.onPointerEventsMouseOut)) == false) {
				this.registerEvent("mouseout",$bind(this,this.onPointerEventsMouseOut));
			}
			if(this.hasEvent("mousedown",$bind(this,this.onPointerEventsMouseDown)) == false) {
				this.registerEvent("mousedown",$bind(this,this.onPointerEventsMouseDown));
			}
			if(this.hasEvent("mouseup",$bind(this,this.onPointerEventsMouseUp)) == false) {
				this.registerEvent("mouseup",$bind(this,this.onPointerEventsMouseUp));
			}
			this.handleFrameworkProperty("allowMouseInteraction",true);
		} else if(style.pointerEvents != null) {
			if(this.hasEvent("mouseover",$bind(this,this.onPointerEventsMouseOver)) == true) {
				this.get_customStyle().cursor = null;
				this.unregisterEvent("mouseover",$bind(this,this.onPointerEventsMouseOver));
			}
			if(this.hasEvent("mouseout",$bind(this,this.onPointerEventsMouseOut)) == true) {
				this.unregisterEvent("mouseout",$bind(this,this.onPointerEventsMouseOut));
			}
			if(this.hasEvent("mousedown",$bind(this,this.onPointerEventsMouseDown)) == true) {
				this.unregisterEvent("mousedown",$bind(this,this.onPointerEventsMouseDown));
			}
			if(this.hasEvent("mouseup",$bind(this,this.onPointerEventsMouseUp)) == true) {
				this.unregisterEvent("mouseup",$bind(this,this.onPointerEventsMouseUp));
			}
			this.handleFrameworkProperty("allowMouseInteraction",false);
		}
		if(this._compositeBuilder != null) {
			this._compositeBuilder.applyStyle(style);
		}
	}
	,onPointerEventsMouseOver: function(e) {
		this.addClass(":hover",true,true);
	}
	,onPointerEventsMouseOut: function(e) {
		this.removeClass(":hover",true,true);
	}
	,onPointerEventsMouseDown: function(e) {
		this.addClass(":down",true,true);
	}
	,onPointerEventsMouseUp: function(e) {
		this.removeClass(":down",true,true);
	}
	,applyAnimationKeyFrame: function(animationKeyFrames,options) {
		var _gthis = this;
		if(this._animatable == false || options == null || options.duration == 0 || this._componentAnimation != null && this._componentAnimation.name == animationKeyFrames.id && options.compareToAnimation(this._componentAnimation) == true) {
			return;
		}
		if(this.hasEvent("animationstart")) {
			this.dispatch(new haxe_ui_events_AnimationEvent("animationstart"));
		}
		this.set_componentAnimation(haxe_ui_styles_animation_Animation.createWithKeyFrames(animationKeyFrames,this,options));
		this.get_componentAnimation().run(function() {
			if(_gthis.hasEvent("animationend")) {
				_gthis.dispatch(new haxe_ui_events_AnimationEvent("animationend"));
			}
		});
	}
	,cloneComponent: function() {
		var c = haxe_ui_backend_ComponentImpl.prototype.cloneComponent.call(this);
		c.set_hidden(this.get_hidden());
		if(this.get_styleNames() != null) {
			c.set_styleNames(this.get_styleNames());
		}
		if(this.get_styleString() != null) {
			c.set_styleString(this.get_styleString());
		}
		var tmp = this._ready == false;
		if(this.get_autoWidth() == false && this.get_width() > 0) {
			c.set_width(this.get_width());
		}
		if(this.get_autoHeight() == false && this.get_height() > 0) {
			c.set_height(this.get_height());
		}
		if(this.get_customStyle() != null) {
			if(c.get_customStyle() == null) {
				c.set_customStyle(new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null));
			}
			c.get_customStyle().apply(this.get_customStyle());
		}
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		return c;
	}
	,get_isComponentClipped: function() {
		if(this._compositeBuilder != null) {
			return this._compositeBuilder.get_isComponentClipped();
		}
		return this.get_componentClipRect() != null;
	}
	,cssName: null
	,get_cssName: function() {
		var cssName = null;
		if(this._compositeBuilder != null) {
			cssName = this._compositeBuilder.get_cssName();
		}
		if(cssName == null) {
			var c = js_Boot.getClass(this);
			cssName = c.__name__.split(".").pop().toLowerCase();
		}
		return cssName;
	}
	,registerBehaviours: function() {
		haxe_ui_backend_ComponentImpl.prototype.registerBehaviours.call(this);
	}
	,get_color: function() {
		if(this.get_customStyle().color != null) {
			return this.get_customStyle().color;
		}
		if(this.get_style() == null || this.get_style().color == null) {
			return null;
		}
		return this.get_style().color;
	}
	,set_color: function(value) {
		if(this.get_customStyle().color == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().color = null;
		} else {
			this.get_customStyle().color = haxe_ui_util_Color.toInt(value);
		}
		this.invalidateComponent("style",false);
		return value;
	}
	,get_backgroundColor: function() {
		if(this.get_customStyle().backgroundColor != null) {
			return this.get_customStyle().backgroundColor;
		}
		if(this.get_style() == null || this.get_style().backgroundColor == null) {
			return null;
		}
		return this.get_style().backgroundColor;
	}
	,set_backgroundColor: function(value) {
		if(this.get_customStyle().backgroundColor == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().backgroundColor = null;
		} else {
			this.get_customStyle().backgroundColor = haxe_ui_util_Color.toInt(value);
		}
		this.invalidateComponent("style",false);
		return value;
	}
	,get_backgroundImage: function() {
		if(this.get_customStyle().backgroundImage != null) {
			return this.get_customStyle().backgroundImage;
		}
		if(this.get_style() == null || this.get_style().backgroundImage == null) {
			return null;
		}
		return this.get_style().backgroundImage;
	}
	,set_backgroundImage: function(value) {
		if(this.get_customStyle().backgroundImage == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().backgroundImage = null;
		} else {
			this.get_customStyle().backgroundImage = value;
		}
		this.invalidateComponent("style",false);
		return value;
	}
	,get_borderColor: function() {
		if(this.get_customStyle().borderColor != null) {
			return this.get_customStyle().borderColor;
		}
		if(this.get_style() == null || this.get_style().borderColor == null) {
			return null;
		}
		return this.get_style().borderColor;
	}
	,set_borderColor: function(value) {
		if(this.get_customStyle().borderColor == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().borderColor = null;
		} else {
			this.get_customStyle().borderColor = haxe_ui_util_Color.toInt(value);
		}
		this.get_customStyle().borderTopColor = haxe_ui_util_Color.toInt(value);
		this.get_customStyle().borderLeftColor = haxe_ui_util_Color.toInt(value);
		this.get_customStyle().borderBottomColor = haxe_ui_util_Color.toInt(value);
		this.get_customStyle().borderRightColor = haxe_ui_util_Color.toInt(value);
		this.invalidateComponent("style",false);
		return value;
	}
	,get_borderSize: function() {
		if(this.get_customStyle().borderSize != null) {
			return this.get_customStyle().borderSize;
		}
		if(this.get_style() == null || this.get_style().borderSize == null) {
			return null;
		}
		return this.get_style().borderSize;
	}
	,set_borderSize: function(value) {
		if(this.get_customStyle().borderSize == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().borderSize = null;
		} else {
			this.get_customStyle().borderSize = value;
		}
		this.get_customStyle().borderTopSize = value;
		this.get_customStyle().borderLeftSize = value;
		this.get_customStyle().borderBottomSize = value;
		this.get_customStyle().borderRightSize = value;
		this.invalidateComponent("style",false);
		return value;
	}
	,get_borderRadius: function() {
		if(this.get_customStyle().borderRadius != null) {
			return this.get_customStyle().borderRadius;
		}
		if(this.get_style() == null || this.get_style().borderRadius == null) {
			return null;
		}
		return this.get_style().borderRadius;
	}
	,set_borderRadius: function(value) {
		if(this.get_customStyle().borderRadius == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().borderRadius = null;
		} else {
			this.get_customStyle().borderRadius = value;
		}
		this.invalidateComponent("style",false);
		return value;
	}
	,get_padding: function() {
		if(this.get_customStyle().padding != null) {
			return this.get_customStyle().padding;
		}
		if(this.get_style() == null || this.get_style().padding == null) {
			return null;
		}
		return this.get_style().padding;
	}
	,set_padding: function(value) {
		if(this.get_customStyle().padding == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().set_padding(null);
		} else {
			this.get_customStyle().set_padding(value);
		}
		this.invalidateComponent("style",false);
		return value;
	}
	,get_paddingLeft: function() {
		if(this.get_customStyle().paddingLeft != null) {
			return this.get_customStyle().paddingLeft;
		}
		if(this.get_style() == null || this.get_style().paddingLeft == null) {
			return null;
		}
		return this.get_style().paddingLeft;
	}
	,set_paddingLeft: function(value) {
		if(this.get_customStyle().paddingLeft == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().paddingLeft = null;
		} else {
			this.get_customStyle().paddingLeft = value;
		}
		this.invalidateComponent("style",false);
		return value;
	}
	,get_paddingRight: function() {
		if(this.get_customStyle().paddingRight != null) {
			return this.get_customStyle().paddingRight;
		}
		if(this.get_style() == null || this.get_style().paddingRight == null) {
			return null;
		}
		return this.get_style().paddingRight;
	}
	,set_paddingRight: function(value) {
		if(this.get_customStyle().paddingRight == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().paddingRight = null;
		} else {
			this.get_customStyle().paddingRight = value;
		}
		this.invalidateComponent("style",false);
		return value;
	}
	,get_paddingTop: function() {
		if(this.get_customStyle().paddingTop != null) {
			return this.get_customStyle().paddingTop;
		}
		if(this.get_style() == null || this.get_style().paddingTop == null) {
			return null;
		}
		return this.get_style().paddingTop;
	}
	,set_paddingTop: function(value) {
		if(this.get_customStyle().paddingTop == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().paddingTop = null;
		} else {
			this.get_customStyle().paddingTop = value;
		}
		this.invalidateComponent("style",false);
		return value;
	}
	,get_paddingBottom: function() {
		if(this.get_customStyle().paddingBottom != null) {
			return this.get_customStyle().paddingBottom;
		}
		if(this.get_style() == null || this.get_style().paddingBottom == null) {
			return null;
		}
		return this.get_style().paddingBottom;
	}
	,set_paddingBottom: function(value) {
		if(this.get_customStyle().paddingBottom == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().paddingBottom = null;
		} else {
			this.get_customStyle().paddingBottom = value;
		}
		this.invalidateComponent("style",false);
		return value;
	}
	,get_marginLeft: function() {
		if(this.get_customStyle().marginLeft != null) {
			return this.get_customStyle().marginLeft;
		}
		if(this.get_style() == null || this.get_style().marginLeft == null) {
			return null;
		}
		return this.get_style().marginLeft;
	}
	,set_marginLeft: function(value) {
		if(this.get_customStyle().marginLeft == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().marginLeft = null;
		} else {
			this.get_customStyle().marginLeft = value;
		}
		this.invalidateComponent("style",false);
		return value;
	}
	,get_marginRight: function() {
		if(this.get_customStyle().marginRight != null) {
			return this.get_customStyle().marginRight;
		}
		if(this.get_style() == null || this.get_style().marginRight == null) {
			return null;
		}
		return this.get_style().marginRight;
	}
	,set_marginRight: function(value) {
		if(this.get_customStyle().marginRight == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().marginRight = null;
		} else {
			this.get_customStyle().marginRight = value;
		}
		this.invalidateComponent("style",false);
		return value;
	}
	,get_marginTop: function() {
		if(this.get_customStyle().marginTop != null) {
			return this.get_customStyle().marginTop;
		}
		if(this.get_style() == null || this.get_style().marginTop == null) {
			return null;
		}
		return this.get_style().marginTop;
	}
	,set_marginTop: function(value) {
		if(this.get_customStyle().marginTop == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().marginTop = null;
		} else {
			this.get_customStyle().marginTop = value;
		}
		this.invalidateComponent("style",false);
		return value;
	}
	,get_marginBottom: function() {
		if(this.get_customStyle().marginBottom != null) {
			return this.get_customStyle().marginBottom;
		}
		if(this.get_style() == null || this.get_style().marginBottom == null) {
			return null;
		}
		return this.get_style().marginBottom;
	}
	,set_marginBottom: function(value) {
		if(this.get_customStyle().marginBottom == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().marginBottom = null;
		} else {
			this.get_customStyle().marginBottom = value;
		}
		this.invalidateComponent("style",false);
		return value;
	}
	,get_clip: function() {
		if(this.get_customStyle().clip != null) {
			return this.get_customStyle().clip;
		}
		if(this.get_style() == null || this.get_style().clip == null) {
			return null;
		}
		return this.get_style().clip;
	}
	,set_clip: function(value) {
		if(this.get_customStyle().clip == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().clip = null;
		} else {
			this.get_customStyle().clip = value;
		}
		this.invalidateComponent("style",false);
		return value;
	}
	,get_opacity: function() {
		if(this.get_customStyle().opacity != null) {
			return this.get_customStyle().opacity;
		}
		if(this.get_style() == null || this.get_style().opacity == null) {
			return null;
		}
		return this.get_style().opacity;
	}
	,set_opacity: function(value) {
		if(this.get_customStyle().opacity == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().opacity = null;
		} else {
			this.get_customStyle().opacity = value;
		}
		this.invalidateComponent("style",false);
		return value;
	}
	,get_horizontalAlign: function() {
		if(this.get_customStyle().horizontalAlign != null) {
			return this.get_customStyle().horizontalAlign;
		}
		if(this.get_style() == null || this.get_style().horizontalAlign == null) {
			return null;
		}
		return this.get_style().horizontalAlign;
	}
	,set_horizontalAlign: function(value) {
		if(this.get_customStyle().horizontalAlign == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().horizontalAlign = null;
		} else {
			this.get_customStyle().horizontalAlign = value;
		}
		this.invalidateComponent("style",false);
		if(this.parentComponent != null) {
			var _this = this.parentComponent;
			if(!(_this._layout == null || _this._layoutLocked == true)) {
				_this.invalidateComponent("layout",false);
			}
		}
		return value;
	}
	,get_verticalAlign: function() {
		if(this.get_customStyle().verticalAlign != null) {
			return this.get_customStyle().verticalAlign;
		}
		if(this.get_style() == null || this.get_style().verticalAlign == null) {
			return null;
		}
		return this.get_style().verticalAlign;
	}
	,set_verticalAlign: function(value) {
		if(this.get_customStyle().verticalAlign == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().verticalAlign = null;
		} else {
			this.get_customStyle().verticalAlign = value;
		}
		this.invalidateComponent("style",false);
		if(this.parentComponent != null) {
			var _this = this.parentComponent;
			if(!(_this._layout == null || _this._layoutLocked == true)) {
				_this.invalidateComponent("layout",false);
			}
		}
		return value;
	}
	,self: function() {
		return new haxe_ui_core_Component();
	}
	,__onAnimationStart: null
	,onAnimationStart: null
	,set_onAnimationStart: function(value) {
		if(this.__onAnimationStart != null) {
			this.unregisterEvent("animationstart",this.__onAnimationStart);
			this.__onAnimationStart = null;
		}
		if(value != null) {
			this.__onAnimationStart = value;
			this.registerEvent("animationstart",value);
		}
		return value;
	}
	,__onAnimationEnd: null
	,onAnimationEnd: null
	,set_onAnimationEnd: function(value) {
		if(this.__onAnimationEnd != null) {
			this.unregisterEvent("animationend",this.__onAnimationEnd);
			this.__onAnimationEnd = null;
		}
		if(value != null) {
			this.__onAnimationEnd = value;
			this.registerEvent("animationend",value);
		}
		return value;
	}
	,__onClick: null
	,onClick: null
	,set_onClick: function(value) {
		if(this.__onClick != null) {
			this.unregisterEvent("click",this.__onClick);
			this.__onClick = null;
		}
		if(value != null) {
			this.__onClick = value;
			this.registerEvent("click",value);
		}
		return value;
	}
	,__onDblClick: null
	,onDblClick: null
	,set_onDblClick: function(value) {
		if(this.__onDblClick != null) {
			this.unregisterEvent("doubleclick",this.__onDblClick);
			this.__onDblClick = null;
		}
		if(value != null) {
			this.__onDblClick = value;
			this.registerEvent("doubleclick",value);
		}
		return value;
	}
	,__onRightClick: null
	,onRightClick: null
	,set_onRightClick: function(value) {
		if(this.__onRightClick != null) {
			this.unregisterEvent("rightclick",this.__onRightClick);
			this.__onRightClick = null;
		}
		if(value != null) {
			this.__onRightClick = value;
			this.registerEvent("rightclick",value);
		}
		return value;
	}
	,__onChange: null
	,onChange: null
	,set_onChange: function(value) {
		if(this.__onChange != null) {
			this.unregisterEvent("change",this.__onChange);
			this.__onChange = null;
		}
		if(value != null) {
			this.__onChange = value;
			this.registerEvent("change",value);
		}
		return value;
	}
	,__class__: haxe_ui_core_Component
	,__properties__: $extend(haxe_ui_backend_ComponentImpl.prototype.__properties__,{set_onChange:"set_onChange",set_onRightClick:"set_onRightClick",set_onDblClick:"set_onDblClick",set_onClick:"set_onClick",set_onAnimationEnd:"set_onAnimationEnd",set_onAnimationStart:"set_onAnimationStart",set_verticalAlign:"set_verticalAlign",get_verticalAlign:"get_verticalAlign",set_horizontalAlign:"set_horizontalAlign",get_horizontalAlign:"get_horizontalAlign",set_opacity:"set_opacity",get_opacity:"get_opacity",set_clip:"set_clip",get_clip:"get_clip",set_marginBottom:"set_marginBottom",get_marginBottom:"get_marginBottom",set_marginTop:"set_marginTop",get_marginTop:"get_marginTop",set_marginRight:"set_marginRight",get_marginRight:"get_marginRight",set_marginLeft:"set_marginLeft",get_marginLeft:"get_marginLeft",set_paddingBottom:"set_paddingBottom",get_paddingBottom:"get_paddingBottom",set_paddingTop:"set_paddingTop",get_paddingTop:"get_paddingTop",set_paddingRight:"set_paddingRight",get_paddingRight:"get_paddingRight",set_paddingLeft:"set_paddingLeft",get_paddingLeft:"get_paddingLeft",set_padding:"set_padding",get_padding:"get_padding",set_borderRadius:"set_borderRadius",get_borderRadius:"get_borderRadius",set_borderSize:"set_borderSize",get_borderSize:"get_borderSize",set_borderColor:"set_borderColor",get_borderColor:"get_borderColor",set_backgroundImage:"set_backgroundImage",get_backgroundImage:"get_backgroundImage",set_backgroundColor:"set_backgroundColor",get_backgroundColor:"get_backgroundColor",set_color:"set_color",get_color:"get_color",get_cssName:"get_cssName",get_namedComponents:"get_namedComponents",set_scriptAccess:"set_scriptAccess",get_scriptAccess:"get_scriptAccess",set_layout:"set_layout",get_layout:"get_layout",set_includeInLayout:"set_includeInLayout",get_includeInLayout:"get_includeInLayout",set_styleSheet:"set_styleSheet",get_styleSheet:"get_styleSheet",set_styleString:"set_styleString",get_styleString:"get_styleString",set_styleNames:"set_styleNames",get_styleNames:"get_styleNames",set_customStyle:"set_customStyle",get_customStyle:"get_customStyle",set_hidden:"set_hidden",get_hidden:"get_hidden",get_numComponents:"get_numComponents",get_rootComponent:"get_rootComponent",set_dragInitiator:"set_dragInitiator",get_dragInitiator:"get_dragInitiator",set_draggable:"set_draggable",get_draggable:"get_draggable",get_screen:"get_screen",set_componentAnimation:"set_componentAnimation",get_componentAnimation:"get_componentAnimation",set_animatable:"set_animatable",get_animatable:"get_animatable",set_native:"set_native",get_native:"get_native"})
});
var haxe_ui_containers_Box = function() {
	this._direction = null;
	haxe_ui_core_Component.call(this);
};
$hxClasses["haxe.ui.containers.Box"] = haxe_ui_containers_Box;
haxe_ui_containers_Box.__name__ = "haxe.ui.containers.Box";
haxe_ui_containers_Box.__super__ = haxe_ui_core_Component;
haxe_ui_containers_Box.prototype = $extend(haxe_ui_core_Component.prototype,{
	_layoutName: null
	,get_layoutName: function() {
		return this._layoutName;
	}
	,set_layoutName: function(value) {
		if(this._layoutName == value) {
			return value;
		}
		this._layoutName = value;
		this.set_layout(haxe_ui_layouts_LayoutFactory.createFromName(this.get_layoutName()));
		return value;
	}
	,createDefaults: function() {
		haxe_ui_core_Component.prototype.createDefaults.call(this);
		if(this._defaultLayoutClass == null) {
			this._defaultLayoutClass = haxe_ui_layouts_DefaultLayout;
		}
	}
	,_direction: null
	,applyStyle: function(style) {
		haxe_ui_core_Component.prototype.applyStyle.call(this,style);
		if(style.direction != null && style.direction != this._direction) {
			this._direction = style.direction;
			this.set_layout(haxe_ui_layouts_LayoutFactory.createFromName(this._direction));
		}
	}
	,registerComposite: function() {
		haxe_ui_core_Component.prototype.registerComposite.call(this);
		this._defaultLayoutClass = haxe_ui_layouts_DefaultLayout;
	}
	,registerBehaviours: function() {
		haxe_ui_core_Component.prototype.registerBehaviours.call(this);
		this.behaviours.register("icon",haxe_ui_behaviours_DefaultBehaviour);
	}
	,get_icon: function() {
		return haxe_ui_util_Variant.toString(this.behaviours.get("icon"));
	}
	,set_icon: function(value) {
		var _g = Type.typeof(value);
		if(_g._hx_index == 6) {
			if(_g.c == String) {
				if(value != null && value.indexOf("{{") != -1 && value.indexOf("}}") != -1) {
					haxe_ui_locale_LocaleManager.get_instance().registerComponent(this,"icon",null,value);
					return value;
				}
			}
		}
		this.behaviours.set("icon",haxe_ui_util_Variant.fromString(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertyChange",null,"icon"));
		return value;
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_Component.prototype.cloneComponent.call(this);
		if(this.get_layoutName() != null) {
			c.set_layoutName(this.get_layoutName());
		}
		if(this.get_icon() != null) {
			c.set_icon(this.get_icon());
		}
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		return c;
	}
	,self: function() {
		return new haxe_ui_containers_Box();
	}
	,__class__: haxe_ui_containers_Box
	,__properties__: $extend(haxe_ui_core_Component.prototype.__properties__,{set_icon:"set_icon",get_icon:"get_icon",set_layoutName:"set_layoutName",get_layoutName:"get_layoutName"})
});
var haxe_ui_containers_VBox = function() {
	haxe_ui_containers_Box.call(this);
	this.set_layout(new haxe_ui_layouts_VerticalLayout());
};
$hxClasses["haxe.ui.containers.VBox"] = haxe_ui_containers_VBox;
haxe_ui_containers_VBox.__name__ = "haxe.ui.containers.VBox";
haxe_ui_containers_VBox.__super__ = haxe_ui_containers_Box;
haxe_ui_containers_VBox.prototype = $extend(haxe_ui_containers_Box.prototype,{
	registerBehaviours: function() {
		haxe_ui_containers_Box.prototype.registerBehaviours.call(this);
	}
	,cloneComponent: function() {
		var c = haxe_ui_containers_Box.prototype.cloneComponent.call(this);
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		return c;
	}
	,self: function() {
		return new haxe_ui_containers_VBox();
	}
	,__class__: haxe_ui_containers_VBox
});
var MainView = function() {
	haxe_ui_containers_VBox.call(this);
	haxe_ui_Toolkit.styleSheet.parse("\r\n            .styled-button {\r\n                background: #79bbff #378de5;\r\n                border: 3px solid #337bc4;\r\n                border-radius:10px;\r\n                padding:10px 25px;\r\n                font-size: 16px;\r\n                color: white;\r\n                filter: drop-shadow(1, 45, #000000, 0.2, 0, 0, 0, 3, false);\r\n            }\r\n            \r\n            .styled-button:hover {\r\n                background: #add6ff #66a8eb;\r\n            }\r\n            \r\n            .styled-button:down {\r\n                background: #47a3ff #1b75d0;\r\n                border-color: #28619a;\r\n            }\r\n        ","user");
	var c0 = new haxe_ui_containers_Absolute();
	c0.set_id("box1");
	c0.set_width(400.);
	c0.set_height(400.);
	c0.set_styleString("border: 0px solid #ababab");
	var c1 = new haxe_ui_containers_Box();
	c1.set_height(1.);
	c1.set_percentWidth(100.);
	c1.set_styleString("background-color: #d9d9d9;");
	c0.addComponent(c1);
	var c2 = new haxe_ui_containers_HBox();
	c2.set_left(540.);
	c2.set_top(110.);
	c2.set_percentWidth(100.);
	var c3 = new haxe_ui_components_Button();
	c3.set_text("Videos");
	c3.set_styleNames("styled-button");
	c3.set_styleString("background-opacity: .1");
	c2.addComponent(c3);
	var c4 = new haxe_ui_components_Button();
	c4.set_text("Chat");
	c4.set_styleNames("styled-button");
	c4.set_styleString("background-opacity: .1");
	c2.addComponent(c4);
	var c5 = new haxe_ui_components_Button();
	c5.set_text("Social");
	c5.set_styleNames("styled-button");
	c5.set_styleString("background-opacity: .1");
	c2.addComponent(c5);
	var c6 = new haxe_ui_components_Button();
	c6.set_text("Sensors");
	c6.set_styleNames("styled-button");
	c6.set_styleString("background-opacity: .1");
	c2.addComponent(c6);
	var c7 = new haxe_ui_components_Button();
	c7.set_text("Robotics");
	c7.set_styleNames("styled-button");
	c7.set_styleString("background-opacity: .1");
	c2.addComponent(c7);
	var c8 = new haxe_ui_components_Button();
	c8.set_text("Toolbox");
	c8.set_styleNames("styled-button");
	c8.set_styleString("background-opacity: .1");
	c2.addComponent(c8);
	var c9 = new haxe_ui_components_Button();
	c9.set_text("Guides");
	c9.set_styleNames("styled-button");
	c9.set_styleString("background-opacity: .1");
	c2.addComponent(c9);
	var c10 = new haxe_ui_components_Button();
	c10.set_text("Hosting");
	c10.set_styleNames("styled-button");
	c10.set_styleString("background-opacity: .1");
	c2.addComponent(c10);
	c0.addComponent(c2);
	var c11 = new haxe_ui_containers_Box();
	c11.set_left(180.);
	c11.set_top(250.);
	c11.set_percentWidth(100.);
	c11.set_percentHeight(100.);
	c11.set_styleString("background-color: black;border:0px solid blue;background-opacity: .5");
	c0.addComponent(c11);
	var c12 = new haxe_ui_containers_Box();
	c12.set_left(230.);
	c12.set_top(300.);
	c12.set_percentWidth(75.);
	c12.set_percentHeight(75.);
	c12.set_styleString("background-color: white;border:0px solid green;background-opacity: .1");
	c0.addComponent(c12);
	var c13 = new haxe_ui_components_Image();
	c13.set_left(1670.);
	c13.set_top(110.);
	c13.set_width(100.);
	c13.set_height(100.);
	c13.set_styleString("border:0px solid #ababab");
	c13.set_resource(haxe_ui_util_Variant.fromString("haxeui-core/styles/default/haxeui.png"));
	c0.addComponent(c13);
	var c14 = new haxe_ui_components_Image();
	c14.set_left(360.);
	c14.set_top(430.);
	c14.set_width(300.);
	c14.set_height(300.);
	c14.set_styleString("border:0px solid #ababab");
	c14.set_resource(haxe_ui_util_Variant.fromString("assets/profile.jpg"));
	c0.addComponent(c14);
	this.addComponent(c0);
	this.bindingRoot = true;
	this.box1 = c0;
};
$hxClasses["MainView"] = MainView;
MainView.__name__ = "MainView";
MainView.__super__ = haxe_ui_containers_VBox;
MainView.prototype = $extend(haxe_ui_containers_VBox.prototype,{
	registerBehaviours: function() {
		haxe_ui_containers_VBox.prototype.registerBehaviours.call(this);
	}
	,cloneComponent: function() {
		var c = haxe_ui_containers_VBox.prototype.cloneComponent.call(this);
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		return c;
	}
	,self: function() {
		return new MainView();
	}
	,box1: null
	,__class__: MainView
});
Math.__name__ = "Math";
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = "Reflect";
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( _g ) {
		return null;
	}
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) {
		return null;
	} else {
		var tmp1;
		if(o.__properties__) {
			tmp = o.__properties__["get_" + field];
			tmp1 = tmp;
		} else {
			tmp1 = false;
		}
		if(tmp1) {
			return o[tmp]();
		} else {
			return o[field];
		}
	}
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	var tmp1;
	if(o.__properties__) {
		tmp = o.__properties__["set_" + field];
		tmp1 = tmp;
	} else {
		tmp1 = false;
	}
	if(tmp1) {
		o[tmp](value);
	} else {
		o[field] = value;
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
			a.push(f);
		}
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	if(typeof(f) == "function") {
		return !(f.__name__ || f.__ename__);
	} else {
		return false;
	}
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = "Std";
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	if(x != null) {
		var _g = 0;
		var _g1 = x.length;
		while(_g < _g1) {
			var i = _g++;
			var c = x.charCodeAt(i);
			if(c <= 8 || c >= 14 && c != 32 && c != 45) {
				var nc = x.charCodeAt(i + 1);
				var v = parseInt(x,nc == 120 || nc == 88 ? 16 : 10);
				if(isNaN(v)) {
					return null;
				} else {
					return v;
				}
			}
		}
	}
	return null;
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = "StringTools";
StringTools.startsWith = function(s,start) {
	if(s.length >= start.length) {
		return s.lastIndexOf(start,0) == 0;
	} else {
		return false;
	}
};
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	if(slen >= elen) {
		return s.indexOf(end,slen - elen) == slen - elen;
	} else {
		return false;
	}
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	if(!(c > 8 && c < 14)) {
		return c == 32;
	} else {
		return true;
	}
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,r,l - r);
	} else {
		return s;
	}
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,0,l - r);
	} else {
		return s;
	}
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	while(true) {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
		if(!(n > 0)) {
			break;
		}
	}
	if(digits != null) {
		while(s.length < digits) s = "0" + s;
	}
	return s;
};
var ValueType = $hxEnums["ValueType"] = { __ename__:true,__constructs__:null
	,TNull: {_hx_name:"TNull",_hx_index:0,__enum__:"ValueType",toString:$estr}
	,TInt: {_hx_name:"TInt",_hx_index:1,__enum__:"ValueType",toString:$estr}
	,TFloat: {_hx_name:"TFloat",_hx_index:2,__enum__:"ValueType",toString:$estr}
	,TBool: {_hx_name:"TBool",_hx_index:3,__enum__:"ValueType",toString:$estr}
	,TObject: {_hx_name:"TObject",_hx_index:4,__enum__:"ValueType",toString:$estr}
	,TFunction: {_hx_name:"TFunction",_hx_index:5,__enum__:"ValueType",toString:$estr}
	,TClass: ($_=function(c) { return {_hx_index:6,c:c,__enum__:"ValueType",toString:$estr}; },$_._hx_name="TClass",$_.__params__ = ["c"],$_)
	,TEnum: ($_=function(e) { return {_hx_index:7,e:e,__enum__:"ValueType",toString:$estr}; },$_._hx_name="TEnum",$_.__params__ = ["e"],$_)
	,TUnknown: {_hx_name:"TUnknown",_hx_index:8,__enum__:"ValueType",toString:$estr}
};
ValueType.__constructs__ = [ValueType.TNull,ValueType.TInt,ValueType.TFloat,ValueType.TBool,ValueType.TObject,ValueType.TFunction,ValueType.TClass,ValueType.TEnum,ValueType.TUnknown];
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = "Type";
Type.createInstance = function(cl,args) {
	var ctor = Function.prototype.bind.apply(cl,[null].concat(args));
	return new (ctor);
};
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
};
Type.typeof = function(v) {
	switch(typeof(v)) {
	case "boolean":
		return ValueType.TBool;
	case "function":
		if(v.__name__ || v.__ename__) {
			return ValueType.TObject;
		}
		return ValueType.TFunction;
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) {
			return ValueType.TInt;
		}
		return ValueType.TFloat;
	case "object":
		if(v == null) {
			return ValueType.TNull;
		}
		var e = v.__enum__;
		if(e != null) {
			return ValueType.TEnum($hxEnums[e]);
		}
		var c = js_Boot.getClass(v);
		if(c != null) {
			return ValueType.TClass(c);
		}
		return ValueType.TObject;
	case "string":
		return ValueType.TClass(String);
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = "haxe.IMap";
haxe_IMap.__isInterface__ = true;
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
};
$hxClasses["haxe.Exception"] = haxe_Exception;
haxe_Exception.__name__ = "haxe.Exception";
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	__skipStack: null
	,__nativeException: null
	,__previousException: null
	,get_native: function() {
		return this.__nativeException;
	}
	,__class__: haxe_Exception
	,__properties__: {get_native:"get_native"}
});
var haxe_Resource = function() { };
$hxClasses["haxe.Resource"] = haxe_Resource;
haxe_Resource.__name__ = "haxe.Resource";
haxe_Resource.listNames = function() {
	var _g = [];
	var _g1 = 0;
	var _g2 = haxe_Resource.content;
	while(_g1 < _g2.length) {
		var x = _g2[_g1];
		++_g1;
		_g.push(x.name);
	}
	return _g;
};
haxe_Resource.getString = function(name) {
	var _g = 0;
	var _g1 = haxe_Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		if(x.name == name) {
			if(x.str != null) {
				return x.str;
			}
			var b = haxe_crypto_Base64.decode(x.data);
			return b.toString();
		}
	}
	return null;
};
haxe_Resource.getBytes = function(name) {
	var _g = 0;
	var _g1 = haxe_Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		if(x.name == name) {
			if(x.str != null) {
				return haxe_io_Bytes.ofString(x.str);
			}
			return haxe_crypto_Base64.decode(x.data);
		}
	}
	return null;
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe_Timer;
haxe_Timer.__name__ = "haxe.Timer";
haxe_Timer.prototype = {
	id: null
	,stop: function() {
		if(this.id == null) {
			return;
		}
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
};
$hxClasses["haxe.ValueException"] = haxe_ValueException;
haxe_ValueException.__name__ = "haxe.ValueException";
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	value: null
	,__class__: haxe_ValueException
});
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = "haxe.io.Bytes";
haxe_io_Bytes.ofString = function(s,encoding) {
	if(encoding == haxe_io_Encoding.RawNative) {
		var buf = new Uint8Array(s.length << 1);
		var _g = 0;
		var _g1 = s.length;
		while(_g < _g1) {
			var i = _g++;
			var c = s.charCodeAt(i);
			buf[i << 1] = c & 255;
			buf[i << 1 | 1] = c >> 8;
		}
		return new haxe_io_Bytes(buf.buffer);
	}
	var a = [];
	var i = 0;
	while(i < s.length) {
		var c = s.charCodeAt(i++);
		if(55296 <= c && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(i++) & 1023;
		}
		if(c <= 127) {
			a.push(c);
		} else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.ofData = function(b) {
	var hb = b.hxBytes;
	if(hb != null) {
		return hb;
	}
	return new haxe_io_Bytes(b);
};
haxe_io_Bytes.prototype = {
	length: null
	,b: null
	,getString: function(pos,len,encoding) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(encoding == null) {
			encoding = haxe_io_Encoding.UTF8;
		}
		var s = "";
		var b = this.b;
		var i = pos;
		var max = pos + len;
		switch(encoding._hx_index) {
		case 0:
			var debug = pos > 0;
			while(i < max) {
				var c = b[i++];
				if(c < 128) {
					if(c == 0) {
						break;
					}
					s += String.fromCodePoint(c);
				} else if(c < 224) {
					var code = (c & 63) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else if(c < 240) {
					var c2 = b[i++];
					var code1 = (c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code1);
				} else {
					var c21 = b[i++];
					var c3 = b[i++];
					var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(u);
				}
			}
			break;
		case 1:
			while(i < max) {
				var c = b[i++] | b[i++] << 8;
				s += String.fromCodePoint(c);
			}
			break;
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,__class__: haxe_io_Bytes
};
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:true,__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe_io_Encoding.__constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
var haxe_crypto_Base64 = function() { };
$hxClasses["haxe.crypto.Base64"] = haxe_crypto_Base64;
haxe_crypto_Base64.__name__ = "haxe.crypto.Base64";
haxe_crypto_Base64.decode = function(str,complement) {
	if(complement == null) {
		complement = true;
	}
	if(complement) {
		while(HxOverrides.cca(str,str.length - 1) == 61) str = HxOverrides.substr(str,0,-1);
	}
	return new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).decodeBytes(haxe_io_Bytes.ofString(str));
};
var haxe_crypto_BaseCode = function(base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) ++nbits;
	if(nbits > 8 || len != 1 << nbits) {
		throw haxe_Exception.thrown("BaseCode : base length must be a power of two.");
	}
	this.base = base;
	this.nbits = nbits;
};
$hxClasses["haxe.crypto.BaseCode"] = haxe_crypto_BaseCode;
haxe_crypto_BaseCode.__name__ = "haxe.crypto.BaseCode";
haxe_crypto_BaseCode.prototype = {
	base: null
	,nbits: null
	,tbl: null
	,initTable: function() {
		var tbl = [];
		var _g = 0;
		while(_g < 256) {
			var i = _g++;
			tbl[i] = -1;
		}
		var _g = 0;
		var _g1 = this.base.length;
		while(_g < _g1) {
			var i = _g++;
			tbl[this.base.b[i]] = i;
		}
		this.tbl = tbl;
	}
	,decodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		if(this.tbl == null) {
			this.initTable();
		}
		var tbl = this.tbl;
		var size = b.length * nbits >> 3;
		var out = new haxe_io_Bytes(new ArrayBuffer(size));
		var buf = 0;
		var curbits = 0;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < 8) {
				curbits += nbits;
				buf <<= nbits;
				var i = tbl[b.b[pin++]];
				if(i == -1) {
					throw haxe_Exception.thrown("BaseCode : invalid encoded char");
				}
				buf |= i;
			}
			curbits -= 8;
			out.b[pout++] = buf >> curbits & 255;
		}
		return out;
	}
	,__class__: haxe_crypto_BaseCode
};
var haxe_ds_ArraySort = function() { };
$hxClasses["haxe.ds.ArraySort"] = haxe_ds_ArraySort;
haxe_ds_ArraySort.__name__ = "haxe.ds.ArraySort";
haxe_ds_ArraySort.sort = function(a,cmp) {
	haxe_ds_ArraySort.rec(a,cmp,0,a.length);
};
haxe_ds_ArraySort.rec = function(a,cmp,from,to) {
	var middle = from + to >> 1;
	if(to - from < 12) {
		if(to <= from) {
			return;
		}
		var _g = from + 1;
		var _g1 = to;
		while(_g < _g1) {
			var i = _g++;
			var j = i;
			while(j > from) {
				if(cmp(a[j],a[j - 1]) < 0) {
					haxe_ds_ArraySort.swap(a,j - 1,j);
				} else {
					break;
				}
				--j;
			}
		}
		return;
	}
	haxe_ds_ArraySort.rec(a,cmp,from,middle);
	haxe_ds_ArraySort.rec(a,cmp,middle,to);
	haxe_ds_ArraySort.doMerge(a,cmp,from,middle,to,middle - from,to - middle);
};
haxe_ds_ArraySort.doMerge = function(a,cmp,from,pivot,to,len1,len2) {
	var first_cut;
	var second_cut;
	var len11;
	var len22;
	if(len1 == 0 || len2 == 0) {
		return;
	}
	if(len1 + len2 == 2) {
		if(cmp(a[pivot],a[from]) < 0) {
			haxe_ds_ArraySort.swap(a,pivot,from);
		}
		return;
	}
	if(len1 > len2) {
		len11 = len1 >> 1;
		first_cut = from + len11;
		second_cut = haxe_ds_ArraySort.lower(a,cmp,pivot,to,first_cut);
		len22 = second_cut - pivot;
	} else {
		len22 = len2 >> 1;
		second_cut = pivot + len22;
		first_cut = haxe_ds_ArraySort.upper(a,cmp,from,pivot,second_cut);
		len11 = first_cut - from;
	}
	haxe_ds_ArraySort.rotate(a,cmp,first_cut,pivot,second_cut);
	var new_mid = first_cut + len22;
	haxe_ds_ArraySort.doMerge(a,cmp,from,first_cut,new_mid,len11,len22);
	haxe_ds_ArraySort.doMerge(a,cmp,new_mid,second_cut,to,len1 - len11,len2 - len22);
};
haxe_ds_ArraySort.rotate = function(a,cmp,from,mid,to) {
	if(from == mid || mid == to) {
		return;
	}
	var n = haxe_ds_ArraySort.gcd(to - from,mid - from);
	while(n-- != 0) {
		var val = a[from + n];
		var shift = mid - from;
		var p1 = from + n;
		var p2 = from + n + shift;
		while(p2 != from + n) {
			a[p1] = a[p2];
			p1 = p2;
			if(to - p2 > shift) {
				p2 += shift;
			} else {
				p2 = from + (shift - (to - p2));
			}
		}
		a[p1] = val;
	}
};
haxe_ds_ArraySort.gcd = function(m,n) {
	while(n != 0) {
		var t = m % n;
		m = n;
		n = t;
	}
	return m;
};
haxe_ds_ArraySort.upper = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[val],a[mid]) < 0) {
			len = half;
		} else {
			from = mid + 1;
			len = len - half - 1;
		}
	}
	return from;
};
haxe_ds_ArraySort.lower = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[mid],a[val]) < 0) {
			from = mid + 1;
			len = len - half - 1;
		} else {
			len = half;
		}
	}
	return from;
};
haxe_ds_ArraySort.swap = function(a,i,j) {
	var tmp = a[i];
	a[i] = a[j];
	a[j] = tmp;
};
var haxe_ds_ObjectMap = function() {
	this.h = { __keys__ : { }};
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = "haxe.ds.ObjectMap";
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	h: null
	,set: function(key,value) {
		var id = key.__id__;
		if(id == null) {
			id = (key.__id__ = $global.$haxeUID++);
		}
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) {
			return false;
		}
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) {
			a.push(this.h.__keys__[key]);
		}
		}
		return new haxe_iterators_ArrayIterator(a);
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds_StringMap = function() {
	this.h = Object.create(null);
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = "haxe.ds.StringMap";
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	h: null
	,__class__: haxe_ds_StringMap
};
var haxe_ds__$StringMap_StringMapKeyIterator = function(h) {
	this.h = h;
	this.keys = Object.keys(h);
	this.length = this.keys.length;
	this.current = 0;
};
$hxClasses["haxe.ds._StringMap.StringMapKeyIterator"] = haxe_ds__$StringMap_StringMapKeyIterator;
haxe_ds__$StringMap_StringMapKeyIterator.__name__ = "haxe.ds._StringMap.StringMapKeyIterator";
haxe_ds__$StringMap_StringMapKeyIterator.prototype = {
	h: null
	,keys: null
	,length: null
	,current: null
	,hasNext: function() {
		return this.current < this.length;
	}
	,next: function() {
		return this.keys[this.current++];
	}
	,__class__: haxe_ds__$StringMap_StringMapKeyIterator
};
var haxe_io_Error = $hxEnums["haxe.io.Error"] = { __ename__:true,__constructs__:null
	,Blocked: {_hx_name:"Blocked",_hx_index:0,__enum__:"haxe.io.Error",toString:$estr}
	,Overflow: {_hx_name:"Overflow",_hx_index:1,__enum__:"haxe.io.Error",toString:$estr}
	,OutsideBounds: {_hx_name:"OutsideBounds",_hx_index:2,__enum__:"haxe.io.Error",toString:$estr}
	,Custom: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"haxe.io.Error",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["e"],$_)
};
haxe_io_Error.__constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds,haxe_io_Error.Custom];
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
$hxClasses["haxe.iterators.ArrayIterator"] = haxe_iterators_ArrayIterator;
haxe_iterators_ArrayIterator.__name__ = "haxe.iterators.ArrayIterator";
haxe_iterators_ArrayIterator.prototype = {
	array: null
	,current: null
	,hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
	,__class__: haxe_iterators_ArrayIterator
};
var haxe_ui_backend_BackendImpl = function() { };
$hxClasses["haxe.ui.backend.BackendImpl"] = haxe_ui_backend_BackendImpl;
haxe_ui_backend_BackendImpl.__name__ = "haxe.ui.backend.BackendImpl";
var haxe_ui_Backend = function() { };
$hxClasses["haxe.ui.Backend"] = haxe_ui_Backend;
haxe_ui_Backend.__name__ = "haxe.ui.Backend";
haxe_ui_Backend.__properties__ = {get_id:"get_id"};
haxe_ui_Backend.get_id = function() {
	return haxe_ui_backend_BackendImpl.id;
};
haxe_ui_Backend.__super__ = haxe_ui_backend_BackendImpl;
haxe_ui_Backend.prototype = $extend(haxe_ui_backend_BackendImpl.prototype,{
	__class__: haxe_ui_Backend
});
var haxe_ui_backend_CallLaterImpl = function(fn) {
	window.requestAnimationFrame(function(timestamp) {
		fn();
	});
};
$hxClasses["haxe.ui.backend.CallLaterImpl"] = haxe_ui_backend_CallLaterImpl;
haxe_ui_backend_CallLaterImpl.__name__ = "haxe.ui.backend.CallLaterImpl";
haxe_ui_backend_CallLaterImpl.prototype = {
	__class__: haxe_ui_backend_CallLaterImpl
};
var haxe_ui_CallLater = function(fn) {
	haxe_ui_backend_CallLaterImpl.call(this,fn);
};
$hxClasses["haxe.ui.CallLater"] = haxe_ui_CallLater;
haxe_ui_CallLater.__name__ = "haxe.ui.CallLater";
haxe_ui_CallLater.__super__ = haxe_ui_backend_CallLaterImpl;
haxe_ui_CallLater.prototype = $extend(haxe_ui_backend_CallLaterImpl.prototype,{
	__class__: haxe_ui_CallLater
});
var haxe_ui_backend_AppBase = function() {
	this.__events = null;
};
$hxClasses["haxe.ui.backend.AppBase"] = haxe_ui_backend_AppBase;
haxe_ui_backend_AppBase.__name__ = "haxe.ui.backend.AppBase";
haxe_ui_backend_AppBase.prototype = {
	__events: null
	,registerEvent: function(type,listener,priority) {
		if(priority == null) {
			priority = 0;
		}
		if(this.__events == null) {
			this.__events = new haxe_ui_util_EventMap();
		}
		this.__events.add(type,listener,priority);
	}
	,hasEvent: function(type,listener) {
		if(this.__events == null) {
			return false;
		}
		return this.__events.contains(type,listener);
	}
	,unregisterEvent: function(type,listener) {
		if(this.__events != null) {
			this.__events.remove(type,listener);
		}
	}
	,dispatch: function(event) {
		if(this.__events != null) {
			this.__events.invoke(event.type,event,null);
		}
	}
	,build: function() {
	}
	,init: function(onReady,onEnd) {
		onReady();
	}
	,getToolkitInit: function() {
		return { };
	}
	,start: function() {
	}
	,exit: function() {
	}
	,buildPreloadList: function() {
		return [];
	}
	,__class__: haxe_ui_backend_AppBase
};
var haxe_ui_backend_AppImpl = function() {
	haxe_ui_backend_AppBase.call(this);
};
$hxClasses["haxe.ui.backend.AppImpl"] = haxe_ui_backend_AppImpl;
haxe_ui_backend_AppImpl.__name__ = "haxe.ui.backend.AppImpl";
haxe_ui_backend_AppImpl.__super__ = haxe_ui_backend_AppBase;
haxe_ui_backend_AppImpl.prototype = $extend(haxe_ui_backend_AppBase.prototype,{
	init: function(onReady,onEnd) {
		var title = haxe_ui_Toolkit.get_backendProperties().getProp("haxe.ui.html5.title");
		if(title != null) {
			haxe_ui_core_Screen.get_instance().set_title(title);
		}
		if(window.document.readyState == "complete") {
			onReady();
		} else {
			window.document.body.onload = function(e) {
				onReady();
			};
		}
	}
	,getToolkitInit: function() {
		return { container : this.findContainer(haxe_ui_Toolkit.get_backendProperties().getProp("haxe.ui.html5.container","body"))};
	}
	,findContainer: function(id) {
		var el = null;
		if(id == "body") {
			el = window.document.body;
		} else if(id != null) {
			el = window.document.getElementById(id);
		}
		if(el == null) {
			el = window.document.body;
		}
		el.style.overflow = "hidden";
		return el;
	}
	,__class__: haxe_ui_backend_AppImpl
});
var haxe_ui_HaxeUIApp = function(options) {
	haxe_ui_backend_AppImpl.call(this);
	haxe_ui_HaxeUIApp.instance = this;
	this._options = options;
	haxe_ui_Toolkit.build();
	this.build();
};
$hxClasses["haxe.ui.HaxeUIApp"] = haxe_ui_HaxeUIApp;
haxe_ui_HaxeUIApp.__name__ = "haxe.ui.HaxeUIApp";
haxe_ui_HaxeUIApp.__super__ = haxe_ui_backend_AppImpl;
haxe_ui_HaxeUIApp.prototype = $extend(haxe_ui_backend_AppImpl.prototype,{
	_options: null
	,ready: function(onReady,onEnd) {
		this.init(onReady,onEnd);
	}
	,init: function(onReady,onEnd) {
		if(haxe_ui_Toolkit.get_backendProperties().getProp("haxe.ui.theme") != null && haxe_ui_Toolkit.get_theme() == "default") {
			haxe_ui_Toolkit.set_theme(haxe_ui_Toolkit.get_backendProperties().getProp("haxe.ui.theme"));
		}
		if(this._options == null) {
			haxe_ui_Toolkit.init(this.getToolkitInit());
		} else {
			haxe_ui_Toolkit.init(this._options);
		}
		var preloadList = null;
		var preloader = null;
		preloadList = this.buildPreloadList();
		if(preloadList != null && preloadList.length > 0) {
			preloader = new haxe_ui_Preloader();
			preloader.progress(0,preloadList.length);
			this.addComponent(preloader);
			preloader.validateComponent();
		}
		this.handlePreload(preloadList,onReady,onEnd,preloader);
	}
	,handlePreload: function(list,onReady,onEnd,preloader) {
		var _gthis = this;
		if(list == null || list.length == 0) {
			if(preloader != null) {
				preloader.complete();
			}
			haxe_ui_backend_AppImpl.prototype.init.call(this,onReady,onEnd);
			return;
		}
		var item = list.shift();
		switch(item.type) {
		case "font":
			haxe_ui_ToolkitAssets.get_instance().getFont(item.resourceId,function(f) {
				if(preloader != null) {
					preloader.increment();
				}
				_gthis.handlePreload(list,onReady,onEnd,preloader);
			});
			break;
		case "image":
			haxe_ui_ToolkitAssets.get_instance().getImage(item.resourceId,function(i) {
				if(preloader != null) {
					preloader.increment();
				}
				_gthis.handlePreload(list,onReady,onEnd,preloader);
			});
			break;
		default:
			console.log("haxe/ui/HaxeUIApp.hx:81:","WARNING: unknown type to preload \"" + item.type + "\", continuing");
			if(preloader != null) {
				preloader.increment();
			}
			this.handlePreload(list,onReady,onEnd,preloader);
		}
	}
	,addComponent: function(component) {
		return haxe_ui_core_Screen.get_instance().addComponent(component);
	}
	,removeComponent: function(component,dispose) {
		if(dispose == null) {
			dispose = true;
		}
		return haxe_ui_core_Screen.get_instance().removeComponent(component,dispose);
	}
	,setComponentIndex: function(child,index) {
		return haxe_ui_core_Screen.get_instance().setComponentIndex(child,index);
	}
	,buildPreloadList: function() {
		var list = haxe_ui_backend_AppImpl.prototype.buildPreloadList.call(this);
		if(list == null) {
			list = [];
		}
		list = list.concat(haxe_ui_ToolkitAssets.get_instance().preloadList);
		return list;
	}
	,__class__: haxe_ui_HaxeUIApp
});
var haxe_ui_Preloader = function() {
	haxe_ui_core_Component.call(this);
	this.set_id("preloader");
	this.set_styleString("width:auto;height:auto;");
};
$hxClasses["haxe.ui.Preloader"] = haxe_ui_Preloader;
haxe_ui_Preloader.__name__ = "haxe.ui.Preloader";
haxe_ui_Preloader.__super__ = haxe_ui_core_Component;
haxe_ui_Preloader.prototype = $extend(haxe_ui_core_Component.prototype,{
	createChildren: function() {
		var label = new haxe_ui_components_Label();
		label.set_text("Loading");
		this.addComponent(label);
	}
	,validateComponentLayout: function() {
		var b = haxe_ui_core_Component.prototype.validateComponentLayout.call(this);
		if(this.get_width() > 0 && this.get_height() > 0) {
			this.set_left(haxe_ui_core_Screen.get_instance().get_width() / 2 - this.get_width() / 2);
			this.set_top(haxe_ui_core_Screen.get_instance().get_height() / 2 - this.get_height() / 2);
		}
		return b;
	}
	,_current: null
	,_max: null
	,progress: function(current,max) {
		this._current = current;
		this._max = max;
		if(current > 0) {
			var label = this.findComponent(null,haxe_ui_components_Label);
			var text = label.get_text();
			if(StringTools.endsWith(text,"....")) {
				text = "Loading";
			}
			label.set_text(text);
		}
	}
	,increment: function() {
		this.progress(this._current + 1,this._max);
	}
	,complete: function() {
		haxe_ui_core_Screen.get_instance().removeComponent(this);
	}
	,registerBehaviours: function() {
		haxe_ui_core_Component.prototype.registerBehaviours.call(this);
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_Component.prototype.cloneComponent.call(this);
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		return c;
	}
	,self: function() {
		return new haxe_ui_Preloader();
	}
	,__class__: haxe_ui_Preloader
});
var haxe_ui_util_Properties = function() {
	this._props = new haxe_ds_StringMap();
};
$hxClasses["haxe.ui.util.Properties"] = haxe_ui_util_Properties;
haxe_ui_util_Properties.__name__ = "haxe.ui.util.Properties";
haxe_ui_util_Properties.prototype = {
	_props: null
	,exists: function(name) {
		return Object.prototype.hasOwnProperty.call(this._props.h,name);
	}
	,getProp: function(name,defaultValue) {
		var v = defaultValue;
		if(Object.prototype.hasOwnProperty.call(this._props.h,name)) {
			v = this._props.h[name];
		}
		return v;
	}
	,getPropInt: function(name,defaultValue) {
		if(defaultValue == null) {
			defaultValue = 0;
		}
		var v = defaultValue;
		var stringValue = this.getProp(name);
		if(stringValue != null) {
			v = Std.parseInt(stringValue);
		}
		return v;
	}
	,getPropBool: function(name,defaultValue) {
		if(defaultValue == null) {
			defaultValue = false;
		}
		var v = defaultValue;
		var stringValue = this.getProp(name);
		if(stringValue != null) {
			v = stringValue == "true";
		}
		return v;
	}
	,getPropCol: function(name,defaultValue) {
		if(defaultValue == null) {
			defaultValue = 0;
		}
		var v = defaultValue;
		var stringValue = this.getProp(name);
		if(stringValue != null) {
			var s = stringValue;
			if(StringTools.startsWith(s,"#")) {
				s = s.substring(1,s.length);
			} else if(StringTools.startsWith(s,"0x")) {
				s = s.substring(2,s.length);
			}
			v = Std.parseInt("0x" + s);
		}
		return v;
	}
	,setProp: function(name,value) {
		this._props.h[name] = value;
	}
	,names: function() {
		return new haxe_ds__$StringMap_StringMapKeyIterator(this._props.h);
	}
	,addAll: function(p) {
		var name = p.names();
		while(name.hasNext()) {
			var name1 = name.next();
			var this1 = this._props;
			var value = p.getProp(name1);
			this1.h[name1] = value;
		}
	}
	,__class__: haxe_ui_util_Properties
};
var haxe_ui_util_GenericConfig = function() {
	this.values = new haxe_ds_StringMap();
	this.sections = new haxe_ds_StringMap();
};
$hxClasses["haxe.ui.util.GenericConfig"] = haxe_ui_util_GenericConfig;
haxe_ui_util_GenericConfig.__name__ = "haxe.ui.util.GenericConfig";
haxe_ui_util_GenericConfig.prototype = {
	values: null
	,sections: null
	,addSection: function(name) {
		var config = new haxe_ui_util_GenericConfig();
		var array = this.sections.h[name];
		if(array == null) {
			array = [];
			this.sections.h[name] = array;
		}
		array.push(config);
		return config;
	}
	,findBy: function(section,field,value) {
		var array = this.sections.h[section];
		if(array == null) {
			return null;
		}
		if(field == null && value == null) {
			return array[0];
		}
		var r = null;
		var _g = 0;
		while(_g < array.length) {
			var item = array[_g];
			++_g;
			var h = item.values.h;
			var key_h = h;
			var key_keys = Object.keys(h);
			var key_length = key_keys.length;
			var key_current = 0;
			while(key_current < key_length) {
				var key = key_keys[key_current++];
				if(key == field && item.values.h[key] == value) {
					r = item;
					break;
				}
			}
			if(r != null) {
				break;
			}
		}
		return r;
	}
	,queryBool: function(q,defaultValue,conditionRef) {
		if(defaultValue == null) {
			defaultValue = false;
		}
		var r = this.query(q,null,conditionRef);
		if(r == null) {
			return defaultValue;
		}
		return r == "true";
	}
	,query: function(q,defaultValue,conditionRef) {
		if(Object.prototype.hasOwnProperty.call(haxe_ui_util_GenericConfig.cache.h,q)) {
			if(defaultValue != null && haxe_ui_util_GenericConfig.cache.h[q] == null) {
				return defaultValue;
			}
			return haxe_ui_util_GenericConfig.cache.h[q];
		}
		var regexp = new EReg("\\.(?![^\\[]*\\])","g");
		var finalArray = regexp.split(q);
		var ref = this;
		var value = null;
		var _g = 0;
		while(_g < finalArray.length) {
			var f = finalArray[_g];
			++_g;
			if(f.indexOf("[") == -1 && f.indexOf("@") == -1) {
				ref = ref.findBy(f);
			} else if(f.indexOf("[") != -1) {
				var p = f.split("[");
				var p1 = p[0];
				var p2 = p[1].split("=")[0];
				var p3 = p[1].split("=")[1];
				p3 = HxOverrides.substr(p3,0,p3.length - 1);
				ref = ref.findBy(p1,p2,p3);
			} else if(f.indexOf("@") != -1) {
				var v = HxOverrides.substr(f,1,f.length);
				value = ref.values.h[v];
				break;
			}
			if(ref == null) {
				haxe_ui_util_GenericConfig.cache.h[q] = defaultValue;
				return defaultValue;
			}
		}
		if(value == null) {
			value = defaultValue;
		}
		if(value != null) {
			haxe_ui_util_GenericConfig.cache.h[q] = value;
		}
		return value;
	}
	,queryValues: function(q,conditionRef) {
		var regexp = new EReg("\\.(?![^\\[]*\\])","g");
		var finalArray = regexp.split(q);
		var ref = this;
		var _g = 0;
		while(_g < finalArray.length) {
			var f = finalArray[_g];
			++_g;
			if(f.indexOf("[") == -1 && f.indexOf("@") == -1) {
				ref = ref.findBy(f);
			} else if(f.indexOf("[") != -1) {
				var p = f.split("[");
				var p1 = p[0];
				var p2 = p[1].split("=")[0];
				var p3 = p[1].split("=")[1];
				p3 = HxOverrides.substr(p3,0,p3.length - 1);
				ref = ref.findBy(p1,p2,p3);
			}
			if(ref == null) {
				return null;
			}
		}
		return ref.values;
	}
	,__class__: haxe_ui_util_GenericConfig
};
var haxe_ui_styles_CompositeStyleSheet = function() {
	this._animations = null;
	this._styleSheets = [];
};
$hxClasses["haxe.ui.styles.CompositeStyleSheet"] = haxe_ui_styles_CompositeStyleSheet;
haxe_ui_styles_CompositeStyleSheet.__name__ = "haxe.ui.styles.CompositeStyleSheet";
haxe_ui_styles_CompositeStyleSheet.prototype = {
	_styleSheets: null
	,_animations: null
	,get_animations: function() {
		if(this._animations != null) {
			return this._animations;
		}
		this._animations = new haxe_ds_StringMap();
		var _g = 0;
		var _g1 = this._styleSheets;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			var h = s.get_animations().h;
			var key_h = h;
			var key_keys = Object.keys(h);
			var key_length = key_keys.length;
			var key_current = 0;
			while(key_current < key_length) {
				var key = key_keys[key_current++];
				var a = s.get_animations().h[key];
				this._animations.h[key] = a;
			}
		}
		return this._animations;
	}
	,findAnimation: function(id) {
		var h = this.get_animations().h;
		var a_h = h;
		var a_keys = Object.keys(h);
		var a_length = a_keys.length;
		var a_current = 0;
		while(a_current < a_length) {
			var a = a_h[a_keys[a_current++]];
			if(a.id == id) {
				return a;
			}
		}
		return null;
	}
	,hasMediaQueries: null
	,get_hasMediaQueries: function() {
		var _g = 0;
		var _g1 = this._styleSheets;
		while(_g < _g1.length) {
			var styleSheet = _g1[_g];
			++_g;
			if(styleSheet.get_hasMediaQueries() == true) {
				return true;
			}
		}
		return false;
	}
	,getAnimation: function(id,create) {
		if(create == null) {
			create = true;
		}
		var a = this.findAnimation(id);
		if(a == null) {
			a = new haxe_ui_styles_elements_AnimationKeyFrames(id,[]);
			this.addAnimation(a);
		}
		return a;
	}
	,addAnimation: function(animation) {
		this._styleSheets[0].addAnimation(animation);
	}
	,addStyleSheet: function(styleSheet) {
		this._styleSheets.push(styleSheet);
	}
	,removeStyleSheet: function(styleSheet) {
		HxOverrides.remove(this._styleSheets,styleSheet);
	}
	,parse: function(css,styleSheetName,invalidateAll) {
		if(invalidateAll == null) {
			invalidateAll = false;
		}
		if(styleSheetName == null) {
			styleSheetName = "default";
		}
		var s = this.findStyleSheet(styleSheetName);
		if(s == null) {
			s = new haxe_ui_styles_StyleSheet();
			s.name = styleSheetName;
			this._styleSheets.push(s);
		}
		s.parse(css);
		this._animations = null;
		if(invalidateAll == true) {
			haxe_ui_core_Screen.get_instance().invalidateAll();
		}
	}
	,findStyleSheet: function(styleSheetName) {
		var _g = 0;
		var _g1 = this._styleSheets;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			if(s.name == styleSheetName) {
				return s;
			}
		}
		return null;
	}
	,findRule: function(selector) {
		var _g = 0;
		var _g1 = this._styleSheets;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			var el = s.findRule(selector);
			if(el != null) {
				return el;
			}
		}
		return null;
	}
	,findMatchingRules: function(selector) {
		var m = [];
		var _g = 0;
		var _g1 = this._styleSheets;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			m = m.concat(s.findMatchingRules(selector));
		}
		return m;
	}
	,getAllRules: function() {
		var r = [];
		var _g = 0;
		var _g1 = this._styleSheets;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			r = r.concat(s.get_rules());
		}
		return r;
	}
	,buildStyleFor: function(c) {
		var style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		var _g = 0;
		var _g1 = this._styleSheets;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			style = s.buildStyleFor(c,style);
		}
		return style;
	}
	,clear: function(styleSheetName) {
		var s = this.findStyleSheet(styleSheetName);
		if(s != null) {
			s.clear();
			this._animations = null;
		}
	}
	,__class__: haxe_ui_styles_CompositeStyleSheet
	,__properties__: {get_hasMediaQueries:"get_hasMediaQueries",get_animations:"get_animations"}
};
var haxe_ui_Toolkit = function() { };
$hxClasses["haxe.ui.Toolkit"] = haxe_ui_Toolkit;
haxe_ui_Toolkit.__name__ = "haxe.ui.Toolkit";
haxe_ui_Toolkit.__properties__ = {set_scale:"set_scale",get_scale:"get_scale",set_scaleY:"set_scaleY",get_scaleY:"get_scaleY",set_scaleX:"set_scaleX",get_scaleX:"get_scaleX",get_autoScaleDPIThreshold:"get_autoScaleDPIThreshold",set_pixelsPerRem:"set_pixelsPerRem",get_screen:"get_screen",get_assets:"get_assets",get_initialized:"get_initialized",get_backendProperties:"get_backendProperties",set_theme:"set_theme",get_theme:"get_theme"};
haxe_ui_Toolkit.get_theme = function() {
	return haxe_ui_Toolkit._theme;
};
haxe_ui_Toolkit.set_theme = function(value) {
	if(haxe_ui_Toolkit._theme == value) {
		return value;
	}
	haxe_ui_Toolkit._theme = value;
	if(haxe_ui_Toolkit._initialized == true) {
		haxe_ui_themes_ThemeManager.get_instance().applyTheme(haxe_ui_Toolkit._theme);
		haxe_ui_core_Screen.get_instance().onThemeChanged();
		haxe_ui_core_Screen.get_instance().invalidateAll();
	}
	return value;
};
haxe_ui_Toolkit.get_backendProperties = function() {
	haxe_ui_Toolkit.buildBackend();
	return haxe_ui_Toolkit._backendProperties;
};
haxe_ui_Toolkit.build = function() {
	if(haxe_ui_Toolkit._built == true) {
		return;
	}
	haxe_ui_themes_ThemeManager.get_instance().getTheme("native").parent = "default";
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("native","haxeui-core/styles/native/main.css",-3.);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("global","haxeui-core/styles/global.css",-4.);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/main.css",-3.);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/buttons.css",-2.99);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/dialogs.css",-2.9800000000000004);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/textinputs.css",-2.9700000000000006);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/scrollbars.css",-2.9600000000000009);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/scrollview.css",-2.9500000000000011);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/checkboxes.css",-2.9400000000000013);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/optionboxes.css",-2.9300000000000015);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/ranges.css",-2.9200000000000017);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/progressbars.css",-2.9100000000000019);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/sliders.css",-2.9000000000000021);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/steppers.css",-2.8900000000000023);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/tabs.css",-2.8800000000000026);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/listview.css",-2.8700000000000028);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/dropdowns.css",-2.860000000000003);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/tableview.css",-2.8500000000000032);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/switches.css",-2.8400000000000034);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/calendars.css",-2.8300000000000036);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/menus.css",-2.8200000000000038);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/accordion.css",-2.8100000000000041);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/propertygrids.css",-2.8000000000000043);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/frames.css",-2.7900000000000045);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/splitters.css",-2.7800000000000047);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/tooltips.css",-2.7700000000000049);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/rules.css",-2.7600000000000051);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/sidebars.css",-2.7500000000000053);
	haxe_ui_themes_ThemeManager.get_instance().getTheme("dark").parent = "default";
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("dark","haxeui-core/styles/dark/main.css",-2.);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("dark","haxeui-core/styles/dark/buttons.css",-1.99);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("dark","haxeui-core/styles/dark/dialogs.css",-1.98);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("dark","haxeui-core/styles/dark/textinputs.css",-1.97);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("dark","haxeui-core/styles/dark/scrollbars.css",-1.96);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("dark","haxeui-core/styles/dark/scrollview.css",-1.95);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("dark","haxeui-core/styles/dark/checkboxes.css",-1.94);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("dark","haxeui-core/styles/dark/optionboxes.css",-1.93);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("dark","haxeui-core/styles/dark/ranges.css",-1.92);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("dark","haxeui-core/styles/dark/progressbars.css",-1.91);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("dark","haxeui-core/styles/dark/sliders.css",-1.9);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("dark","haxeui-core/styles/dark/steppers.css",-1.89);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("dark","haxeui-core/styles/dark/tabs.css",-1.88);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("dark","haxeui-core/styles/dark/listview.css",-1.8699999999999999);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("dark","haxeui-core/styles/dark/dropdowns.css",-1.8599999999999999);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("dark","haxeui-core/styles/dark/tableview.css",-1.8499999999999999);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("dark","haxeui-core/styles/dark/switches.css",-1.8399999999999999);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("dark","haxeui-core/styles/dark/calendars.css",-1.8299999999999998);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("dark","haxeui-core/styles/dark/menus.css",-1.8199999999999998);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("dark","haxeui-core/styles/dark/accordion.css",-1.8099999999999998);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("dark","haxeui-core/styles/dark/propertygrids.css",-1.7999999999999998);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("dark","haxeui-core/styles/dark/frames.css",-1.7899999999999998);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("dark","haxeui-core/styles/dark/splitters.css",-1.7799999999999998);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("dark","haxeui-core/styles/dark/tooltips.css",-1.7699999999999998);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("dark","haxeui-core/styles/dark/rules.css",-1.7599999999999998);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("dark","haxeui-core/styles/dark/sidebars.css",-1.7499999999999998);
	haxe_ui_locale_LocaleManager.get_instance().parseResource("en","haxeui-core/locale/en/dialog.properties");
	haxe_ui_locale_LocaleManager.get_instance().parseResource("es","haxeui-core/locale/es/dialog.properties");
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("native","styles/native/main.css",-1);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("global","styles/main.css",-2);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","styles/default/main.css",-1);
	haxe_ui_core_TypeMap.addTypeInfo("haxe.ui.core.InteractiveComponent","allowInteraction","Bool");
	haxe_ui_core_TypeMap.addTypeInfo("haxe.ui.core.ComponentContainer","value","Dynamic");
	haxe_ui_core_TypeMap.addTypeInfo("haxe.ui.core.ComponentContainer","tooltipRenderer","Component");
	haxe_ui_core_TypeMap.addTypeInfo("haxe.ui.core.ComponentContainer","tooltip","Dynamic");
	haxe_ui_core_TypeMap.addTypeInfo("haxe.ui.core.ComponentContainer","text","String");
	haxe_ui_core_TypeMap.addTypeInfo("haxe.ui.core.ComponentContainer","disabled","Bool");
	haxe_ui_core_TypeMap.addTypeInfo("haxe.ui.core.ComponentBounds","width","Null<Float>");
	haxe_ui_core_TypeMap.addTypeInfo("haxe.ui.core.ComponentBounds","percentWidth","Null<Float>");
	haxe_ui_core_TypeMap.addTypeInfo("haxe.ui.core.ComponentBounds","percentHeight","Null<Float>");
	haxe_ui_core_TypeMap.addTypeInfo("haxe.ui.core.ComponentBounds","height","Null<Float>");
	haxe_ui_core_TypeMap.addTypeInfo("haxe.ui.containers.Box","icon","String");
	haxe_ui_core_TypeMap.addTypeInfo("haxe.ui.components.Label","value","String");
	haxe_ui_core_TypeMap.addTypeInfo("haxe.ui.components.Label","text","String");
	haxe_ui_core_TypeMap.addTypeInfo("haxe.ui.components.Label","htmlText","String");
	haxe_ui_core_TypeMap.addTypeInfo("haxe.ui.components.Image","value","Variant");
	haxe_ui_core_TypeMap.addTypeInfo("haxe.ui.components.Image","scaleMode","ScaleMode");
	haxe_ui_core_TypeMap.addTypeInfo("haxe.ui.components.Image","resource","Variant");
	haxe_ui_core_TypeMap.addTypeInfo("haxe.ui.components.Image","originalWidth","Float");
	haxe_ui_core_TypeMap.addTypeInfo("haxe.ui.components.Image","originalHeight","Float");
	haxe_ui_core_TypeMap.addTypeInfo("haxe.ui.components.Image","imageVerticalAlign","VerticalAlign");
	haxe_ui_core_TypeMap.addTypeInfo("haxe.ui.components.Image","imageHorizontalAlign","HorizontalAlign");
	haxe_ui_core_TypeMap.addTypeInfo("haxe.ui.components.Button","value","String");
	haxe_ui_core_TypeMap.addTypeInfo("haxe.ui.components.Button","toggle","Bool");
	haxe_ui_core_TypeMap.addTypeInfo("haxe.ui.components.Button","text","String");
	haxe_ui_core_TypeMap.addTypeInfo("haxe.ui.components.Button","selected","Bool");
	haxe_ui_core_TypeMap.addTypeInfo("haxe.ui.components.Button","repeater","Bool");
	haxe_ui_core_TypeMap.addTypeInfo("haxe.ui.components.Button","repeatInterval","Int");
	haxe_ui_core_TypeMap.addTypeInfo("haxe.ui.components.Button","remainPressed","Bool");
	haxe_ui_core_TypeMap.addTypeInfo("haxe.ui.components.Button","icon","Variant");
	haxe_ui_core_TypeMap.addTypeInfo("haxe.ui.components.Button","easeInRepeater","Bool");
	haxe_ui_Toolkit.buildBackend();
	haxe_ui_Toolkit._built = true;
};
haxe_ui_Toolkit.buildBackend = function() {
	if(haxe_ui_Toolkit._backendBuilt == true) {
		return;
	}
	haxe_ui_Toolkit._backendBuilt = true;
};
haxe_ui_Toolkit.get_initialized = function() {
	return haxe_ui_Toolkit._initialized;
};
haxe_ui_Toolkit.init = function(options) {
	haxe_ui_Toolkit.build();
	haxe_ui_themes_ThemeManager.get_instance().applyTheme(haxe_ui_Toolkit._theme);
	if(options != null) {
		haxe_ui_Toolkit.get_screen().set_options(options);
		haxe_ui_ToolkitAssets.get_instance().options = options;
	}
	haxe_ui_Toolkit.get_screen().registerEvent("keydown",haxe_ui_Toolkit.onKeyDown);
	haxe_ui_Toolkit._initialized = true;
};
haxe_ui_Toolkit.onKeyDown = function(event) {
	if(event.keyCode == 9) {
		if(event.shiftKey == false) {
			haxe_ui_focus_FocusManager.get_instance().focusNext();
		} else {
			haxe_ui_focus_FocusManager.get_instance().focusPrev();
		}
	}
};
haxe_ui_Toolkit.get_assets = function() {
	return haxe_ui_ToolkitAssets.get_instance();
};
haxe_ui_Toolkit.get_screen = function() {
	return haxe_ui_core_Screen.get_instance();
};
haxe_ui_Toolkit.set_pixelsPerRem = function(value) {
	if(haxe_ui_Toolkit.pixelsPerRem == value) {
		return value;
	}
	haxe_ui_Toolkit.pixelsPerRem = value;
	haxe_ui_core_Screen.get_instance().refreshStyleRootComponents();
	return value;
};
haxe_ui_Toolkit.get_autoScaleDPIThreshold = function() {
	if(haxe_ui_core_Screen.get_instance().get_isRetina() == true) {
		return 192;
	}
	return 120;
};
haxe_ui_Toolkit.get_scaleX = function() {
	if(haxe_ui_Toolkit._scaleX == 0) {
		if(haxe_ui_Toolkit.autoScale == true) {
			var dpi = haxe_ui_core_Screen.get_instance().get_dpi();
			if(dpi > haxe_ui_Toolkit.get_autoScaleDPIThreshold()) {
				if(haxe_ui_Toolkit.roundScale == true) {
					haxe_ui_Toolkit._scaleX = Math.round(dpi / haxe_ui_Toolkit.get_autoScaleDPIThreshold());
				} else {
					haxe_ui_Toolkit._scaleX = dpi / haxe_ui_Toolkit.get_autoScaleDPIThreshold();
				}
			} else {
				haxe_ui_Toolkit._scaleX = 1;
			}
		} else {
			haxe_ui_Toolkit._scaleX = 1;
		}
	}
	return haxe_ui_Toolkit._scaleX;
};
haxe_ui_Toolkit.set_scaleX = function(value) {
	if(haxe_ui_Toolkit._scaleX == value) {
		return value;
	}
	haxe_ui_Toolkit._scaleX = value;
	haxe_ui_Toolkit.autoScale = false;
	return value;
};
haxe_ui_Toolkit.get_scaleY = function() {
	if(haxe_ui_Toolkit._scaleY == 0) {
		if(haxe_ui_Toolkit.autoScale == true) {
			var dpi = haxe_ui_core_Screen.get_instance().get_dpi();
			if(dpi > haxe_ui_Toolkit.get_autoScaleDPIThreshold()) {
				if(haxe_ui_Toolkit.roundScale == true) {
					haxe_ui_Toolkit._scaleY = Math.round(dpi / haxe_ui_Toolkit.get_autoScaleDPIThreshold());
				} else {
					haxe_ui_Toolkit._scaleY = dpi / haxe_ui_Toolkit.get_autoScaleDPIThreshold();
				}
			} else {
				haxe_ui_Toolkit._scaleY = 1;
			}
		} else {
			haxe_ui_Toolkit._scaleY = 1;
		}
	}
	return haxe_ui_Toolkit._scaleY;
};
haxe_ui_Toolkit.set_scaleY = function(value) {
	if(haxe_ui_Toolkit._scaleY == value) {
		return value;
	}
	haxe_ui_Toolkit._scaleY = value;
	haxe_ui_Toolkit.autoScale = false;
	return value;
};
haxe_ui_Toolkit.get_scale = function() {
	return Math.max(haxe_ui_Toolkit.get_scaleX(),haxe_ui_Toolkit.get_scaleY());
};
haxe_ui_Toolkit.set_scale = function(value) {
	haxe_ui_Toolkit.set_scaleX(value);
	haxe_ui_Toolkit.set_scaleY(value);
	return value;
};
haxe_ui_Toolkit.callLater = function(fn) {
	new haxe_ui_CallLater(fn);
};
var haxe_ui_backend_AssetsBase = function() {
};
$hxClasses["haxe.ui.backend.AssetsBase"] = haxe_ui_backend_AssetsBase;
haxe_ui_backend_AssetsBase.__name__ = "haxe.ui.backend.AssetsBase";
haxe_ui_backend_AssetsBase.isAbsolutePath = function(path) {
	if(StringTools.startsWith(path,"/")) {
		return true;
	}
	if(path.charAt(1) == ":") {
		return true;
	}
	if(StringTools.startsWith(path,"\\\\")) {
		return true;
	}
	return false;
};
haxe_ui_backend_AssetsBase.prototype = {
	getTextDelegate: function(resourceId) {
		return null;
	}
	,getImageInternal: function(resourceId,callback) {
		callback(null);
	}
	,getImageFromHaxeResource: function(resourceId,callback) {
		callback(resourceId,null);
	}
	,imageFromBytes: function(bytes,callback) {
		callback(null);
	}
	,imageFromFile: function(filename,callback) {
		console.log("haxe/ui/backend/AssetsBase.hx:50:","WARNING: cant load from file system on non-sys targets [" + filename + "]");
		callback(null);
	}
	,getFontInternal: function(resourceId,callback) {
		callback(null);
	}
	,getFontFromHaxeResource: function(resourceId,callback) {
		callback(resourceId,null);
	}
	,imageInfoFromImageData: function(imageData) {
		return { data : imageData, width : 0, height : 0};
	}
	,__class__: haxe_ui_backend_AssetsBase
};
var haxe_ui_backend_AssetsImpl = function() {
	haxe_ui_backend_AssetsBase.call(this);
};
$hxClasses["haxe.ui.backend.AssetsImpl"] = haxe_ui_backend_AssetsImpl;
haxe_ui_backend_AssetsImpl.__name__ = "haxe.ui.backend.AssetsImpl";
haxe_ui_backend_AssetsImpl.__super__ = haxe_ui_backend_AssetsBase;
haxe_ui_backend_AssetsImpl.prototype = $extend(haxe_ui_backend_AssetsBase.prototype,{
	getImageInternal: function(resourceId,callback) {
		var bytes = haxe_Resource.getBytes(resourceId);
		if(bytes != null) {
			callback(null);
			return;
		}
		var image = window.document.createElement("img");
		image.onload = function(e) {
			var imageInfo = { width : image.width, height : image.height, data : image};
			callback(imageInfo);
		};
		image.onerror = function(e) {
			callback(null);
		};
		image.src = resourceId;
	}
	,getImageFromHaxeResource: function(resourceId,callback) {
		var bytes = haxe_Resource.getBytes(resourceId);
		this.imageFromBytes(bytes,function(imageInfo) {
			callback(resourceId,imageInfo);
		});
	}
	,imageFromBytes: function(bytes,callback) {
		if(bytes == null) {
			callback(null);
			return;
		}
		var image = window.document.createElement("img");
		image.onload = function(e) {
			var imageInfo = { width : image.width, height : image.height, data : image};
			callback(imageInfo);
		};
		image.onerror = function(e) {
			window.console.log(e);
			callback(null);
		};
		var blob = new Blob([bytes.b.bufferValue]);
		var blobUrl = URL.createObjectURL(blob);
		image.src = blobUrl;
	}
	,getFontInternal: function(resourceId,callback) {
		var bytes = haxe_Resource.getBytes(resourceId);
		if(bytes == null) {
			haxe_ui_backend_html5_util_FontDetect.onFontLoaded(resourceId,function(f) {
				var fontInfo = { data : f};
				callback(fontInfo);
			},function(f) {
				callback(null);
			});
			return;
		}
		this.getFontFromHaxeResource(resourceId,function(r,f) {
			callback(f);
		});
	}
	,getFontFromHaxeResource: function(resourceId,callback) {
		var bytes = haxe_Resource.getBytes(resourceId);
		if(bytes == null) {
			callback(resourceId,null);
			return;
		}
		var fontFamilyParts = resourceId.split("/");
		var fontFamily = fontFamilyParts[fontFamilyParts.length - 1];
		if(fontFamily.indexOf(".") != -1) {
			fontFamily = HxOverrides.substr(fontFamily,0,fontFamily.indexOf("."));
		}
		var fontFace = new FontFace(fontFamily,bytes.b.bufferValue);
		fontFace.load().then(function(loadedFace) {
			window.document.fonts.add(loadedFace);
			haxe_ui_backend_html5_util_FontDetect.onFontLoaded(fontFamily,function(f) {
				var fontInfo = { data : fontFamily};
				callback(resourceId,fontInfo);
			},function(f) {
				callback(resourceId,null);
			});
		}).catch(function(error) {
			callback(resourceId,null);
		});
	}
	,__class__: haxe_ui_backend_AssetsImpl
});
var haxe_ui_ToolkitAssets = function() {
	this.options = null;
	this.preloadList = [];
	haxe_ui_backend_AssetsImpl.call(this);
};
$hxClasses["haxe.ui.ToolkitAssets"] = haxe_ui_ToolkitAssets;
haxe_ui_ToolkitAssets.__name__ = "haxe.ui.ToolkitAssets";
haxe_ui_ToolkitAssets.__properties__ = {get_instance:"get_instance"};
haxe_ui_ToolkitAssets.get_instance = function() {
	if(haxe_ui_ToolkitAssets._instance == null) {
		haxe_ui_ToolkitAssets._instance = new haxe_ui_ToolkitAssets();
	}
	return haxe_ui_ToolkitAssets._instance;
};
haxe_ui_ToolkitAssets.__super__ = haxe_ui_backend_AssetsImpl;
haxe_ui_ToolkitAssets.prototype = $extend(haxe_ui_backend_AssetsImpl.prototype,{
	preloadList: null
	,options: null
	,_fontCache: null
	,_fontCallbacks: null
	,_imageCache: null
	,_imageCallbacks: null
	,getFont: function(resourceId,callback,useCache) {
		if(useCache == null) {
			useCache = true;
		}
		var _gthis = this;
		if(this._fontCache != null && this._fontCache.h[resourceId] != null && useCache == true) {
			callback(this._fontCache.h[resourceId]);
		} else {
			if(this._fontCallbacks == null) {
				this._fontCallbacks = new haxe_ui_util_CallbackMap();
			}
			this._fontCallbacks.add(resourceId,callback);
			if(this._fontCallbacks.count(resourceId) == 1) {
				this.getFontInternal(resourceId,function(font) {
					if(font != null) {
						_gthis._onFontLoaded(resourceId,font);
					} else if(haxe_Resource.listNames().indexOf(resourceId) != -1) {
						_gthis.getFontFromHaxeResource(resourceId,$bind(_gthis,_gthis._onFontLoaded));
					} else {
						_gthis._fontCallbacks.remove(resourceId,callback);
						callback(null);
					}
				});
			}
		}
	}
	,_onFontLoaded: function(resourceId,font) {
		if(this._fontCache == null) {
			this._fontCache = new haxe_ds_StringMap();
		}
		this._fontCache.h[resourceId] = font;
		this._fontCallbacks.invokeAndRemove(resourceId,font);
	}
	,getImage: function(resourceId,callback,useCache) {
		if(useCache == null) {
			useCache = true;
		}
		var _gthis = this;
		var orginalResourceId = resourceId;
		resourceId = this.runPlugins(resourceId);
		if(this._imageCache != null && this._imageCache.h[resourceId] != null && useCache == true) {
			callback(this._imageCache.h[resourceId]);
		} else {
			if(this._imageCallbacks == null) {
				this._imageCallbacks = new haxe_ui_util_CallbackMap();
			}
			this._imageCallbacks.add(resourceId,callback);
			if(this._imageCallbacks.count(resourceId) == 1) {
				this.getImageInternal(resourceId,function(imageInfo) {
					if(imageInfo != null) {
						_gthis._onImageLoaded(resourceId,imageInfo);
					} else if(haxe_Resource.listNames().indexOf(orginalResourceId) != -1) {
						_gthis._imageCallbacks.remove(resourceId,callback);
						_gthis._imageCallbacks.add(orginalResourceId,callback);
						_gthis.getImageFromHaxeResource(orginalResourceId,$bind(_gthis,_gthis._onImageLoaded));
					} else if(haxe_Resource.listNames().indexOf(resourceId) != -1) {
						_gthis.getImageFromHaxeResource(resourceId,$bind(_gthis,_gthis._onImageLoaded));
					} else {
						_gthis._imageCallbacks.remove(resourceId,callback);
						callback(null);
					}
				});
			}
		}
	}
	,_onImageLoaded: function(resourceId,imageInfo) {
		if(imageInfo != null && (imageInfo.width == -1 || imageInfo.width == -1)) {
			console.log("haxe/ui/ToolkitAssets.hx:106:","WARNING: imageData.originalWidth == -1 || imageData.originalHeight == -1");
		}
		if(this._imageCache == null) {
			this._imageCache = new haxe_ds_StringMap();
		}
		this._imageCache.h[resourceId] = imageInfo;
		this._imageCallbacks.invokeAndRemove(resourceId,imageInfo);
	}
	,getText: function(resourceId) {
		var s = this.getTextDelegate(resourceId);
		if(s == null) {
			s = haxe_Resource.getString(resourceId);
		}
		return s;
	}
	,getBytes: function(resourceId) {
		return null;
	}
	,_plugins: null
	,addPlugin: function(plugin) {
		if(this._plugins == null) {
			this._plugins = [];
		}
		this._plugins.push(plugin);
	}
	,runPlugins: function(asset) {
		if(this._plugins == null) {
			return asset;
		}
		var _g = 0;
		var _g1 = this._plugins;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			asset = p.invoke(asset);
		}
		return asset;
	}
	,__class__: haxe_ui_ToolkitAssets
});
var haxe_ui_assets_AssetPlugin = function() {
};
$hxClasses["haxe.ui.assets.AssetPlugin"] = haxe_ui_assets_AssetPlugin;
haxe_ui_assets_AssetPlugin.__name__ = "haxe.ui.assets.AssetPlugin";
haxe_ui_assets_AssetPlugin.prototype = {
	_props: null
	,invoke: function(asset) {
		return asset;
	}
	,setProperty: function(name,value) {
		if(this._props == null) {
			this._props = new haxe_ds_StringMap();
		}
		this._props.h[name] = value;
	}
	,getProperty: function(name,defaultValue) {
		if(this._props == null) {
			return defaultValue;
		}
		var v = this._props.h[name];
		if(v == null) {
			v = defaultValue;
		}
		return v;
	}
	,__class__: haxe_ui_assets_AssetPlugin
};
var haxe_ui_backend_EventBase = function() { };
$hxClasses["haxe.ui.backend.EventBase"] = haxe_ui_backend_EventBase;
haxe_ui_backend_EventBase.__name__ = "haxe.ui.backend.EventBase";
haxe_ui_backend_EventBase.prototype = {
	cancel: function() {
	}
	,postClone: function(event) {
	}
	,__class__: haxe_ui_backend_EventBase
};
var haxe_ui_backend_EventImpl = function() { };
$hxClasses["haxe.ui.backend.EventImpl"] = haxe_ui_backend_EventImpl;
haxe_ui_backend_EventImpl.__name__ = "haxe.ui.backend.EventImpl";
haxe_ui_backend_EventImpl.__super__ = haxe_ui_backend_EventBase;
haxe_ui_backend_EventImpl.prototype = $extend(haxe_ui_backend_EventBase.prototype,{
	_originalEvent: null
	,cancel: function() {
		if(this._originalEvent != null) {
			this._originalEvent.preventDefault();
			this._originalEvent.stopImmediatePropagation();
			this._originalEvent.stopPropagation();
		}
	}
	,postClone: function(event) {
		event._originalEvent = this._originalEvent;
	}
	,__class__: haxe_ui_backend_EventImpl
});
var haxe_ui_backend_ImageSurface = function() {
};
$hxClasses["haxe.ui.backend.ImageSurface"] = haxe_ui_backend_ImageSurface;
haxe_ui_backend_ImageSurface.__name__ = "haxe.ui.backend.ImageSurface";
haxe_ui_backend_ImageSurface.prototype = {
	__class__: haxe_ui_backend_ImageSurface
};
var haxe_ui_backend_ImageBase = function() {
	this._imageHeight = 0;
	this._imageWidth = 0;
	this._top = 0;
	this._left = 0;
	this.aspectRatio = 1;
	haxe_ui_backend_ImageSurface.call(this);
};
$hxClasses["haxe.ui.backend.ImageBase"] = haxe_ui_backend_ImageBase;
haxe_ui_backend_ImageBase.__name__ = "haxe.ui.backend.ImageBase";
haxe_ui_backend_ImageBase.__super__ = haxe_ui_backend_ImageSurface;
haxe_ui_backend_ImageBase.prototype = $extend(haxe_ui_backend_ImageSurface.prototype,{
	parentComponent: null
	,aspectRatio: null
	,_left: null
	,_top: null
	,_imageWidth: null
	,_imageHeight: null
	,_imageInfo: null
	,_imageClipRect: null
	,dispose: function() {
	}
	,validateData: function() {
	}
	,validatePosition: function() {
	}
	,validateDisplay: function() {
	}
	,__class__: haxe_ui_backend_ImageBase
});
var haxe_ui_backend_ImageDisplayImpl = function() {
	haxe_ui_backend_ImageBase.call(this);
	this.element = window.document.createElement("img");
	this.element.style.position = "absolute";
	this.element.style.borderRadius = "inherit";
	this.element.style.setProperty("pointer-events","none");
	this.element.style.setProperty("image-rendering","pixelated");
	this.element.style.setProperty("image-rendering","-moz-crisp-edges");
	this.element.style.setProperty("image-rendering","crisp-edges");
};
$hxClasses["haxe.ui.backend.ImageDisplayImpl"] = haxe_ui_backend_ImageDisplayImpl;
haxe_ui_backend_ImageDisplayImpl.__name__ = "haxe.ui.backend.ImageDisplayImpl";
haxe_ui_backend_ImageDisplayImpl.__super__ = haxe_ui_backend_ImageBase;
haxe_ui_backend_ImageDisplayImpl.prototype = $extend(haxe_ui_backend_ImageBase.prototype,{
	element: null
	,dispose: function() {
		if(this.element != null) {
			haxe_ui_backend_html5_HtmlUtils.removeElement(this.element);
		}
	}
	,validateData: function() {
		if(this.element.src != this._imageInfo.data.src) {
			this.element.src = this._imageInfo.data.src;
		}
	}
	,validatePosition: function() {
		var style = this.element.style;
		style.left = "" + this._left + "px";
		style.top = "" + this._top + "px";
	}
	,validateDisplay: function() {
		var style = this.element.style;
		style.width = "" + this._imageWidth + "px";
		style.height = "" + this._imageHeight + "px";
		if(this._imageClipRect != null) {
			var clipValue = "rect(" + ("" + (-this._top + this._imageClipRect.top) + "px") + "," + ("" + (-this._left + this._imageClipRect.left + this._imageClipRect.width) + "px") + "," + ("" + (-this._top + this._imageClipRect.top + this._imageClipRect.height) + "px") + "," + ("" + (-this._left + this._imageClipRect.left) + "px") + ")";
			if(this.element.style.clip != clipValue) {
				this.element.style.clip = clipValue;
			}
		} else if(this.element.style.clip != null) {
			this.element.style.removeProperty("clip");
		}
	}
	,__class__: haxe_ui_backend_ImageDisplayImpl
});
var haxe_ui_backend_PlatformBase = function() {
};
$hxClasses["haxe.ui.backend.PlatformBase"] = haxe_ui_backend_PlatformBase;
haxe_ui_backend_PlatformBase.__name__ = "haxe.ui.backend.PlatformBase";
haxe_ui_backend_PlatformBase.prototype = {
	getMetric: function(id) {
		return 0;
	}
	,getColor: function(id) {
		return null;
	}
	,getSystemLocale: function() {
		return null;
	}
	,__class__: haxe_ui_backend_PlatformBase
};
var haxe_ui_backend_PlatformImpl = function() {
	haxe_ui_backend_PlatformBase.call(this);
};
$hxClasses["haxe.ui.backend.PlatformImpl"] = haxe_ui_backend_PlatformImpl;
haxe_ui_backend_PlatformImpl.__name__ = "haxe.ui.backend.PlatformImpl";
haxe_ui_backend_PlatformImpl.calcScrollSize = function() {
	if(haxe_ui_backend_PlatformImpl._vscrollWidth >= 0 && haxe_ui_backend_PlatformImpl._hscrollHeight >= 0) {
		return;
	}
	var div = window.document.createElement("div");
	div.style.position = "absolute";
	div.style.top = "-99999px";
	div.style.left = "-99999px";
	div.style.height = "100px";
	div.style.width = "100px";
	div.style.overflow = "scroll";
	window.document.body.appendChild(div);
	haxe_ui_backend_PlatformImpl._vscrollWidth = div.offsetWidth - div.clientWidth;
	haxe_ui_backend_PlatformImpl._hscrollHeight = div.offsetHeight - div.clientHeight;
	haxe_ui_backend_html5_HtmlUtils.removeElement(div);
};
haxe_ui_backend_PlatformImpl.__super__ = haxe_ui_backend_PlatformBase;
haxe_ui_backend_PlatformImpl.prototype = $extend(haxe_ui_backend_PlatformBase.prototype,{
	getMetric: function(id) {
		switch(id) {
		case "patform.metrics.hscroll.height":
			haxe_ui_backend_PlatformImpl.calcScrollSize();
			return haxe_ui_backend_PlatformImpl._hscrollHeight;
		case "patform.metrics.vscroll.width":
			haxe_ui_backend_PlatformImpl.calcScrollSize();
			return haxe_ui_backend_PlatformImpl._vscrollWidth;
		}
		return haxe_ui_backend_PlatformBase.prototype.getMetric.call(this,id);
	}
	,getSystemLocale: function() {
		return $global.navigator.language;
	}
	,__class__: haxe_ui_backend_PlatformImpl
});
var haxe_ui_backend_ScreenBase = function() {
	this._focus = null;
};
$hxClasses["haxe.ui.backend.ScreenBase"] = haxe_ui_backend_ScreenBase;
haxe_ui_backend_ScreenBase.__name__ = "haxe.ui.backend.ScreenBase";
haxe_ui_backend_ScreenBase.prototype = {
	rootComponents: null
	,_focus: null
	,get_focus: function() {
		return this._focus;
	}
	,set_focus: function(value) {
		this._focus = value;
		return this._focus;
	}
	,_options: null
	,get_options: function() {
		return this._options;
	}
	,set_options: function(value) {
		this._options = value;
		return value;
	}
	,dpi: null
	,get_dpi: function() {
		return 72;
	}
	,get_title: function() {
		return null;
	}
	,set_title: function(s) {
		return s;
	}
	,width: null
	,get_width: function() {
		return 0;
	}
	,height: null
	,get_height: function() {
		return 0;
	}
	,actualWidth: null
	,get_actualWidth: function() {
		return this.get_width() * haxe_ui_Toolkit.get_scaleX();
	}
	,actualHeight: null
	,get_actualHeight: function() {
		return this.get_height() * haxe_ui_Toolkit.get_scaleY();
	}
	,isRetina: null
	,get_isRetina: function() {
		return false;
	}
	,addComponent: function(component) {
		return component;
	}
	,removeComponent: function(component,dispose) {
		if(dispose == null) {
			dispose = true;
		}
		return component;
	}
	,handleSetComponentIndex: function(child,index) {
	}
	,resizeComponent: function(c) {
		var cx = null;
		var cy = null;
		if(c.get_percentWidth() > 0) {
			cx = this.get_width() * c.get_percentWidth() / 100;
		}
		if(c.get_percentHeight() > 0) {
			cy = this.get_height() * c.get_percentHeight() / 100;
		}
		c.resizeComponent(cx,cy);
	}
	,refreshStyleRootComponents: function() {
		var _g = 0;
		var _g1 = this.rootComponents;
		while(_g < _g1.length) {
			var component = _g1[_g];
			++_g;
			this._refreshStyleComponent(component);
		}
	}
	,resizeRootComponents: function() {
		var _g = 0;
		var _g1 = this.rootComponents;
		while(_g < _g1.length) {
			var component = _g1[_g];
			++_g;
			this.resizeComponent(component);
		}
	}
	,_refreshStyleComponent: function(component) {
		var _g = 0;
		var _g1 = component._children == null ? [] : component._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.invalidateComponent("style",false);
			child.invalidateComponent("display",false);
			this._refreshStyleComponent(child);
		}
	}
	,_onRootComponentResize: function(e) {
		this._refreshStyleComponent(e.target);
	}
	,invalidateAll: function(flag) {
		if(flag == null) {
			flag = "all";
		}
		var _g = 0;
		var _g1 = this.rootComponents;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			this.invalidateChildren(c,flag);
		}
	}
	,invalidateChildren: function(c,flag) {
		if(flag == null) {
			flag = "all";
		}
		var _g = 0;
		var _g1 = c._children == null ? [] : c._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			this.invalidateChildren(child,flag);
		}
		c.invalidateComponent(flag);
	}
	,supportsEvent: function(type) {
		return false;
	}
	,mapEvent: function(type,listener) {
	}
	,unmapEvent: function(type,listener) {
	}
	,__class__: haxe_ui_backend_ScreenBase
	,__properties__: {get_isRetina:"get_isRetina",get_actualHeight:"get_actualHeight",get_actualWidth:"get_actualWidth",get_height:"get_height",get_width:"get_width",set_title:"set_title",get_title:"get_title",get_dpi:"get_dpi",set_options:"set_options",get_options:"get_options",set_focus:"set_focus",get_focus:"get_focus"}
};
var haxe_ui_backend_ScreenImpl = function() {
	this._hasListener = false;
	this._pageRoot = null;
	this._percentContainerHeightAdded = false;
	this._percentContainerWidthAdded = false;
	haxe_ui_backend_ScreenBase.call(this);
	this._mapping = new haxe_ds_StringMap();
};
$hxClasses["haxe.ui.backend.ScreenImpl"] = haxe_ui_backend_ScreenImpl;
haxe_ui_backend_ScreenImpl.__name__ = "haxe.ui.backend.ScreenImpl";
haxe_ui_backend_ScreenImpl.__super__ = haxe_ui_backend_ScreenBase;
haxe_ui_backend_ScreenImpl.prototype = $extend(haxe_ui_backend_ScreenBase.prototype,{
	_mapping: null
	,set_options: function(value) {
		haxe_ui_backend_ScreenBase.prototype.set_options.call(this,value);
		var cx = haxe_ui_Toolkit.get_backendProperties().getProp("haxe.ui.html5.container.width",null);
		var cy = haxe_ui_Toolkit.get_backendProperties().getProp("haxe.ui.html5.container.height",null);
		var c = this.get_container();
		if(cx != null) {
			c.style.width = cx;
		}
		if(cy != null) {
			c.style.height = cy;
		}
		return value;
	}
	,get_dpi: function() {
		return haxe_ui_backend_html5_HtmlUtils.get_dpi();
	}
	,get_title: function() {
		return window.document.title;
	}
	,set_title: function(s) {
		window.document.title = s;
		return s;
	}
	,get_width: function() {
		var cx = this.get_container().offsetWidth;
		if(cx <= 0) {
			var _g = 0;
			var _g1 = this.rootComponents;
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				if(c.get_width() > cx) {
					cx = c.get_width();
				}
			}
		}
		return cx / haxe_ui_Toolkit.get_scaleX();
	}
	,get_height: function() {
		var cy = this.get_container().offsetHeight;
		if(cy <= 0) {
			var _g = 0;
			var _g1 = this.rootComponents;
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				if(c.get_height() > cy) {
					cy = c.get_height();
				}
			}
		}
		return cy / haxe_ui_Toolkit.get_scaleY();
	}
	,get_isRetina: function() {
		return haxe_ui_backend_html5_HtmlUtils.isRetinaDisplay();
	}
	,addComponent: function(component) {
		this.get_container().appendChild(component.element);
		component.ready();
		if(haxe_ui_Toolkit.get_scaleX() != 1 || haxe_ui_Toolkit.get_scaleY() != 1) {
			var transformString = "";
			if(haxe_ui_Toolkit.get_scaleX() != 1) {
				transformString += "scaleX(" + haxe_ui_Toolkit.get_scaleX() + ") ";
			}
			if(haxe_ui_Toolkit.get_scaleY() != 1) {
				transformString += "scaleY(" + haxe_ui_Toolkit.get_scaleY() + ") ";
			}
			component.element.style.transform = transformString;
			component.element.style.transformOrigin = "top left";
		}
		if(component.get_percentWidth() != null) {
			this.addPercentContainerWidth();
		}
		if(component.get_percentHeight() != null) {
			this.addPercentContainerHeight();
		}
		this.addResizeListener();
		this.resizeComponent(component);
		return component;
	}
	,_percentContainerWidthAdded: null
	,addPercentContainerWidth: function() {
		if(this._percentContainerWidthAdded == true) {
			return;
		}
		this._percentContainerWidthAdded = true;
		var sheet = haxe_ui_backend_html5_util_StyleSheetHelper.getValidStyleSheet();
		sheet.insertRule("#haxeui-container-parent {\r\n            margin: 0;\r\n            width: 100%;\r\n        }",sheet.cssRules.length);
		sheet.insertRule("#haxeui-container {\r\n            margin: 0;\r\n            width: 100%;\r\n        }",sheet.cssRules.length);
	}
	,_percentContainerHeightAdded: null
	,addPercentContainerHeight: function() {
		if(this._percentContainerHeightAdded == true) {
			return;
		}
		this._percentContainerHeightAdded = true;
		var sheet = haxe_ui_backend_html5_util_StyleSheetHelper.getValidStyleSheet();
		sheet.insertRule("#haxeui-container-parent {\r\n            margin: 0;\r\n            height: 100%;\r\n        }",sheet.cssRules.length);
		sheet.insertRule("#haxeui-container {\r\n            margin: 0;\r\n            height: 100%;\r\n        }",sheet.cssRules.length);
	}
	,removeComponent: function(component,dispose) {
		if(dispose == null) {
			dispose = true;
		}
		HxOverrides.remove(this.rootComponents,component);
		if(this.get_container().contains(component.element) == true) {
			this.get_container().removeChild(component.element);
		}
		return component;
	}
	,handleSetComponentIndex: function(child,index) {
		if(index == (js_Boot.__cast(this , haxe_ui_core_Screen)).rootComponents.length - 1) {
			this.get_container().appendChild(child.element);
		} else {
			haxe_ui_backend_html5_HtmlUtils.insertBefore((js_Boot.__cast(this , haxe_ui_core_Screen)).rootComponents[index + 1].element,child.element);
		}
	}
	,container: null
	,get_container: function() {
		var c = null;
		if(this.get_options() == null || this.get_options().container == null) {
			c = window.document.body;
		} else {
			c = this.get_options().container;
		}
		if(c.style.overflow == null || c.style.overflow == "") {
			c.style.overflow = "hidden";
		}
		if(c.id != "haxeui-container") {
			c.id = "haxeui-container";
			if(c.parentElement != null && c.parentElement.id != "haxeui-container-parent") {
				c.parentElement.id = "haxeui-container-parent";
			}
		}
		return c;
	}
	,_pageRoot: null
	,pageRoot: function(from) {
		if(this._pageRoot != null) {
			return this._pageRoot;
		}
		var r = null;
		var el = from;
		while(el != null) {
			if(el.classList.contains("haxeui-component") == false) {
				r = el;
				this._pageRoot = el;
				break;
			}
			el = el.parentElement;
		}
		return r;
	}
	,_hasListener: null
	,addResizeListener: function() {
		var _gthis = this;
		if(this._hasListener == true) {
			return;
		}
		this._hasListener = true;
		window.addEventListener("resize",function(e) {
			_gthis.resizeRootComponents();
		});
	}
	,supportsEvent: function(type) {
		return haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM.h[type] != null;
	}
	,mapEvent: function(type,listener) {
		var _gthis = this;
		var container = window.document.body;
		switch(type) {
		case "keydown":case "keyup":
			if(Object.prototype.hasOwnProperty.call(this._mapping.h,type) == false) {
				this._mapping.h[type] = listener;
				container.addEventListener(haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM.h[type],$bind(this,this.__onKeyEvent));
			}
			break;
		case "click":case "doubleclick":case "mousedown":case "mousemove":case "mouseout":case "mouseover":case "mouseup":case "rightclick":case "rightmousedown":case "rightmouseup":
			if(type == "mousemove" && Object.prototype.hasOwnProperty.call(this._mapping.h,type) == false && haxe_ui_backend_html5_UserAgent.get_instance().get_chrome() == true) {
				var fn = null;
				fn = function(e) {
					container.removeEventListener(haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM.h["mousemove"],fn);
					if(haxe_ui_backend_html5_EventMapper.MOUSE_TO_TOUCH.h[type] != null) {
						container.removeEventListener(haxe_ui_backend_html5_EventMapper.MOUSE_TO_TOUCH.h[type],fn);
					}
					if(Object.prototype.hasOwnProperty.call(_gthis._mapping.h,type) == false) {
						if(haxe_ui_backend_html5_EventMapper.MOUSE_TO_TOUCH.h[type] != null) {
							container.addEventListener(haxe_ui_backend_html5_EventMapper.MOUSE_TO_TOUCH.h[type],$bind(_gthis,_gthis.__onMouseEvent));
						}
						_gthis._mapping.h[type] = listener;
						container.addEventListener(haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM.h["mousemove"],$bind(_gthis,_gthis.__onMouseEvent));
					}
				};
				container.addEventListener(haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM.h["mousemove"],fn);
				if(haxe_ui_backend_html5_EventMapper.MOUSE_TO_TOUCH.h[type] != null) {
					container.addEventListener(haxe_ui_backend_html5_EventMapper.MOUSE_TO_TOUCH.h[type],fn);
				}
				return;
			}
			if(Object.prototype.hasOwnProperty.call(this._mapping.h,type) == false) {
				if(haxe_ui_backend_html5_EventMapper.MOUSE_TO_TOUCH.h[type] != null) {
					container.addEventListener(haxe_ui_backend_html5_EventMapper.MOUSE_TO_TOUCH.h[type],$bind(this,this.__onMouseEvent));
				}
				this._mapping.h[type] = listener;
				container.addEventListener(haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM.h[type],$bind(this,this.__onMouseEvent));
			}
			break;
		}
	}
	,unmapEvent: function(type,listener) {
		var container = window.document.body;
		switch(type) {
		case "keydown":case "keyup":
			var _this = this._mapping;
			if(Object.prototype.hasOwnProperty.call(_this.h,type)) {
				delete(_this.h[type]);
			}
			container.removeEventListener(haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM.h[type],$bind(this,this.__onKeyEvent));
			break;
		case "click":case "doubleclick":case "mousedown":case "mousemove":case "mouseout":case "mouseover":case "mouseup":case "rightclick":case "rightmousedown":case "rightmouseup":
			var _this = this._mapping;
			if(Object.prototype.hasOwnProperty.call(_this.h,type)) {
				delete(_this.h[type]);
			}
			container.removeEventListener(haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM.h[type],$bind(this,this.__onMouseEvent));
			if(haxe_ui_backend_html5_EventMapper.MOUSE_TO_TOUCH.h[type] != null) {
				container.removeEventListener(haxe_ui_backend_html5_EventMapper.MOUSE_TO_TOUCH.h[type],$bind(this,this.__onMouseEvent));
			}
			break;
		}
	}
	,__onMouseEvent: function(event) {
		var button = -1;
		var touchEvent = false;
		try {
			touchEvent = ((event) instanceof TouchEvent);
		} catch( _g ) {
		}
		if(touchEvent == false && ((event) instanceof MouseEvent)) {
			var me = js_Boot.__cast(event , MouseEvent);
			button = me.which;
		}
		var r = true;
		var type = haxe_ui_backend_html5_EventMapper.DOM_TO_HAXEUI.h[event.type];
		if(type == "rightclick") {
			event.stopPropagation();
			event.preventDefault();
			r = false;
		}
		if(type != null) {
			var fn = this._mapping.h[type];
			if(fn != null) {
				var mouseEvent = new haxe_ui_events_MouseEvent(type);
				mouseEvent._originalEvent = event;
				if(touchEvent == true) {
					var te = js_Boot.__cast(event , TouchEvent);
					mouseEvent.screenX = (te.changedTouches[0].pageX - haxe_ui_core_Screen.get_instance().get_container().offsetLeft) / haxe_ui_Toolkit.get_scaleX();
					mouseEvent.screenY = (te.changedTouches[0].pageY - haxe_ui_core_Screen.get_instance().get_container().offsetTop) / haxe_ui_Toolkit.get_scaleY();
					mouseEvent.touchEvent = true;
				} else if(((event) instanceof MouseEvent)) {
					var me = js_Boot.__cast(event , MouseEvent);
					mouseEvent.buttonDown = me.buttons != 0;
					mouseEvent.screenX = (me.pageX - haxe_ui_core_Screen.get_instance().get_container().offsetLeft) / haxe_ui_Toolkit.get_scaleX();
					mouseEvent.screenY = (me.pageY - haxe_ui_core_Screen.get_instance().get_container().offsetTop) / haxe_ui_Toolkit.get_scaleY();
					mouseEvent.ctrlKey = me.ctrlKey;
					mouseEvent.shiftKey = me.shiftKey;
				}
				fn(mouseEvent);
			}
		}
		return r;
	}
	,__onKeyEvent: function(event) {
		var type = haxe_ui_backend_html5_EventMapper.DOM_TO_HAXEUI.h[event.type];
		if(type != null) {
			if(event.keyCode == 9 || event.which == 9) {
				event.preventDefault();
				event.stopImmediatePropagation();
				event.stopPropagation();
			}
			var fn = this._mapping.h[type];
			if(fn != null) {
				var keyboardEvent = new haxe_ui_events_KeyboardEvent(type);
				keyboardEvent._originalEvent = event;
				keyboardEvent.keyCode = event.keyCode;
				keyboardEvent.ctrlKey = event.ctrlKey;
				keyboardEvent.shiftKey = event.shiftKey;
				fn(keyboardEvent);
			}
		}
	}
	,__class__: haxe_ui_backend_ScreenImpl
	,__properties__: $extend(haxe_ui_backend_ScreenBase.prototype.__properties__,{get_container:"get_container"})
});
var haxe_ui_backend_TextBase = function() {
	this._textHeight = 0;
	this._textWidth = 0;
	this._height = 0;
	this._width = 0;
	this._top = 0;
	this._left = 0;
	this._htmlText = null;
	this._inputData = new haxe_ui_core_TextInputData();
	this._displayData = new haxe_ui_core_TextDisplayData();
};
$hxClasses["haxe.ui.backend.TextBase"] = haxe_ui_backend_TextBase;
haxe_ui_backend_TextBase.__name__ = "haxe.ui.backend.TextBase";
haxe_ui_backend_TextBase.prototype = {
	parentComponent: null
	,_displayData: null
	,_inputData: null
	,_text: null
	,_htmlText: null
	,_left: null
	,_top: null
	,_width: null
	,_height: null
	,_textWidth: null
	,_textHeight: null
	,_textStyle: null
	,_fontInfo: null
	,focus: function() {
	}
	,blur: function() {
	}
	,_dataSource: null
	,get_dataSource: function() {
		return this._dataSource;
	}
	,set_dataSource: function(value) {
		this._dataSource = value;
		return value;
	}
	,supportsHtml: null
	,get_supportsHtml: function() {
		return false;
	}
	,validateData: function() {
	}
	,validateStyle: function() {
		return false;
	}
	,validatePosition: function() {
	}
	,validateDisplay: function() {
	}
	,measureText: function() {
	}
	,measureTextWidth: function() {
		var textDisplay = new haxe_ui_core_TextDisplay();
		textDisplay._textStyle = this._textStyle;
		textDisplay._fontInfo = this._fontInfo;
		textDisplay.validateStyle();
		textDisplay._text = this._text;
		textDisplay.validateData();
		textDisplay.measureText();
		return textDisplay._textWidth;
	}
	,__class__: haxe_ui_backend_TextBase
	,__properties__: {get_supportsHtml:"get_supportsHtml",set_dataSource:"set_dataSource",get_dataSource:"get_dataSource"}
};
var haxe_ui_backend_TextDisplayImpl = function() {
	this._fixedHeight = false;
	this._fixedWidth = false;
	haxe_ui_backend_TextBase.call(this);
	this._displayData.multiline = false;
	this.element = this.createElement();
};
$hxClasses["haxe.ui.backend.TextDisplayImpl"] = haxe_ui_backend_TextDisplayImpl;
haxe_ui_backend_TextDisplayImpl.__name__ = "haxe.ui.backend.TextDisplayImpl";
haxe_ui_backend_TextDisplayImpl.__super__ = haxe_ui_backend_TextBase;
haxe_ui_backend_TextDisplayImpl.prototype = $extend(haxe_ui_backend_TextBase.prototype,{
	element: null
	,_html: null
	,validateData: function() {
		var html = null;
		if(this._text != null) {
			html = this.normalizeText(this._text);
		} else if(this._htmlText != null) {
			html = this.normalizeText(this._htmlText,false);
		}
		if(html != null && this._html != html) {
			this.element.innerHTML = html;
			this._html = html;
			if(this.get_autoWidth() == false) {
				this._fixedWidth = false;
				this._fixedHeight = false;
			}
		}
	}
	,_rawFontName: null
	,validateStyle: function() {
		var measureTextRequired = false;
		if(this._displayData.wordWrap == true && this.element.style.whiteSpace != null) {
			this.element.style.whiteSpace = "pre-wrap";
			this.element.style.wordBreak = "break-word";
			measureTextRequired = true;
		} else if(this._displayData.wordWrap == false && this.element.style.whiteSpace != "pre") {
			this.element.style.whiteSpace = "pre";
			measureTextRequired = true;
		}
		if(this._textStyle != null) {
			if(this.element.style.textAlign != this._textStyle.textAlign) {
				this.element.style.textAlign = this._textStyle.textAlign;
			}
			var fontSizeValue = "" + this._textStyle.fontSize + "px";
			if(this.element.style.fontSize != fontSizeValue) {
				this.element.style.fontSize = fontSizeValue;
				measureTextRequired = true;
			}
			if(this._textStyle.fontBold == true && this.element.style.fontWeight != "bold") {
				this.element.style.fontWeight = "bold";
				measureTextRequired = true;
			}
			if(this._textStyle.fontItalic == true && this.element.style.fontStyle != "italic") {
				this.element.style.fontStyle = "italic";
				measureTextRequired = true;
			}
			if(this._textStyle.fontUnderline == true && this.element.style.textDecoration != "underline") {
				this.element.style.textDecoration = "underline";
				measureTextRequired = true;
			}
			var colorValue = haxe_ui_backend_html5_HtmlUtils.color(this._textStyle.color);
			if(this.element.style.color != colorValue) {
				this.element.style.color = colorValue;
			}
			if(this._fontInfo != null && this._fontInfo.data != this._rawFontName) {
				this.element.style.fontFamily = this._fontInfo.data;
				this._rawFontName = this._fontInfo.data;
				measureTextRequired = true;
				var _this = this.parentComponent;
				if(!(_this._layout == null || _this._layoutLocked == true)) {
					_this.invalidateComponent("layout",false);
				}
			}
		}
		if(measureTextRequired == true) {
			this._fixedWidth = false;
			this._fixedHeight = false;
		}
		return measureTextRequired;
	}
	,validatePosition: function() {
		var style = this.element.style;
		style.left = "" + this._left + "px";
		style.top = "" + this._top + "px";
	}
	,_fixedWidth: null
	,_fixedHeight: null
	,validateDisplay: function() {
		var style = this.element.style;
		var allowFixed = true;
		if(this.get_autoWidth() == false && style.width != "" + this._width + "px") {
			allowFixed = false;
		}
		if(this._width > 0 && this.get_autoWidth() == false) {
			this._fixedWidth = true;
			style.width = "" + this._width + "px";
		}
		if(this._height > 0 && this.get_autoWidth() == false) {
			this._fixedHeight = true;
			style.height = "" + this._height + "px";
		}
		if(allowFixed == false) {
			this._fixedHeight = false;
		}
	}
	,measureText: function() {
		if(this._fixedWidth == true && this._fixedHeight == true) {
			return;
		}
		if(haxe_ui_backend_html5_HtmlUtils.DIV_HELPER == null) {
			haxe_ui_backend_html5_HtmlUtils.createDivHelper();
		}
		var div = haxe_ui_backend_html5_HtmlUtils.DIV_HELPER;
		this.setTempDivData(div);
		if(this._fixedWidth == false) {
			this._textWidth = div.clientWidth + 1;
		}
		if(this._fixedHeight == false) {
			this._textHeight = div.clientHeight;
		}
	}
	,createElement: function() {
		var el = window.document.createElement("div");
		el.style.position = "absolute";
		el.style.cursor = "inherit";
		return el;
	}
	,setTempDivData: function(div) {
		var t = null;
		if(this._text != null) {
			t = this.normalizeText(this._text);
		} else if(this._htmlText != null) {
			t = this.normalizeText(this._htmlText,false);
		}
		if(t == null || t.length == 0) {
			t = "|";
		}
		div.style.fontFamily = this.element.style.fontFamily;
		div.style.fontSize = this.element.style.fontSize;
		div.style.whiteSpace = this.element.style.whiteSpace;
		div.style.wordBreak = this.element.style.wordBreak;
		div.style.lineHeight = null;
		if(this.get_autoWidth() == false) {
			div.style.width = this._width > 0 ? "" + ("" + this._width + "px") : "";
		} else {
			div.style.width = "";
		}
		div.innerHTML = t;
	}
	,normalizeText: function(text,$escape) {
		if($escape == null) {
			$escape = true;
		}
		var html = text;
		if($escape == true) {
			html = haxe_ui_backend_html5_HtmlUtils.escape(text);
		}
		html = StringTools.replace(html,"\\n","\n");
		html = StringTools.replace(html,"\r\n","<br/>");
		html = StringTools.replace(html,"\r","<br/>");
		html = StringTools.replace(html,"\n","<br/>");
		return html;
	}
	,autoWidth: null
	,get_autoWidth: function() {
		if(((this.parentComponent) instanceof haxe_ui_components_Label)) {
			return (js_Boot.__cast(this.parentComponent , haxe_ui_components_Label)).get_autoWidth();
		}
		return false;
	}
	,get_supportsHtml: function() {
		return true;
	}
	,measureTextWidth: function() {
		if(haxe_ui_backend_html5_HtmlUtils.DIV_HELPER == null) {
			haxe_ui_backend_html5_HtmlUtils.createDivHelper();
		}
		var div = haxe_ui_backend_html5_HtmlUtils.DIV_HELPER;
		this.setTempDivData(div);
		div.style.width = "";
		return div.clientWidth;
	}
	,__class__: haxe_ui_backend_TextDisplayImpl
	,__properties__: $extend(haxe_ui_backend_TextBase.prototype.__properties__,{get_autoWidth:"get_autoWidth"})
});
var haxe_ui_backend_TextInputImpl = function() {
	haxe_ui_backend_TextDisplayImpl.call(this);
};
$hxClasses["haxe.ui.backend.TextInputImpl"] = haxe_ui_backend_TextInputImpl;
haxe_ui_backend_TextInputImpl.__name__ = "haxe.ui.backend.TextInputImpl";
haxe_ui_backend_TextInputImpl.__super__ = haxe_ui_backend_TextDisplayImpl;
haxe_ui_backend_TextInputImpl.prototype = $extend(haxe_ui_backend_TextDisplayImpl.prototype,{
	focus: function() {
		this.element.focus({preventScroll: true});
	}
	,blur: function() {
		this.element.blur();
	}
	,onChangeEvent: function(e) {
		var newText = null;
		if(((this.element) instanceof HTMLTextAreaElement)) {
			newText = (js_Boot.__cast(this.element , HTMLTextAreaElement)).value;
		} else {
			newText = (js_Boot.__cast(this.element , HTMLInputElement)).value;
		}
		if(newText != this._text) {
			this._text = newText;
			this.measureText();
			if(this._inputData.onChangedCallback != null) {
				this._inputData.onChangedCallback();
			}
		}
	}
	,onScroll: function(e) {
		this._inputData.hscrollPos = this.element.scrollLeft;
		this._inputData.vscrollPos = this.element.scrollTop;
		this._inputData.hscrollMax = this._textWidth - this._width;
		this._inputData.hscrollPageSize = this._width * this._inputData.hscrollMax / this._textWidth;
		this._inputData.vscrollMax = this._textHeight - this._height;
		this._inputData.vscrollPageSize = this._height * this._inputData.vscrollMax / this._textHeight;
		if(this._inputData.onScrollCallback != null) {
			this._inputData.onScrollCallback();
		}
	}
	,validateData: function() {
		if(this._text != null) {
			var html = this.normalizeText(this._text);
			if(((this.element) instanceof HTMLInputElement)) {
				(js_Boot.__cast(this.element , HTMLInputElement)).value = html;
			} else if(((this.element) instanceof HTMLTextAreaElement)) {
				(js_Boot.__cast(this.element , HTMLTextAreaElement)).value = html;
			}
		}
		var hscrollValue = this._inputData.hscrollPos | 0;
		if(this.element.scrollLeft != hscrollValue) {
			this.element.scrollLeft = hscrollValue;
		}
		var vscrollValue = this._inputData.vscrollPos | 0;
		if(this.element.scrollTop != vscrollValue) {
			this.element.scrollTop = vscrollValue;
		}
	}
	,validateStyle: function() {
		var measureTextRequired = false;
		if(this._displayData.multiline == false && ((this.element) instanceof HTMLInputElement) == false || this._displayData.multiline == true && ((this.element) instanceof HTMLTextAreaElement) == false) {
			var newElement = this.createElement();
			this.element.parentElement.appendChild(newElement);
			haxe_ui_backend_html5_HtmlUtils.removeElement(this.element);
			this.element.removeEventListener("input",$bind(this,this.onChangeEvent));
			this.element.removeEventListener("propertychange",$bind(this,this.onChangeEvent));
			this.element.removeEventListener("scroll",$bind(this,this.onScroll));
			this.element = newElement;
			this.validateData();
			measureTextRequired = true;
		}
		if(((this.element) instanceof HTMLInputElement)) {
			var inputElement = this.element;
			if(this._inputData.password == true && inputElement.type != "password") {
				inputElement.type = "password";
			} else if(this._inputData.password == false && inputElement.type != "") {
				inputElement.type = "";
			}
		}
		if(this.parentComponent.get_disabled() || this.parentComponent._interactivityDisabled == true) {
			this.element.style.cursor = "not-allowed";
			if(((this.element) instanceof HTMLInputElement)) {
				(js_Boot.__cast(this.element , HTMLInputElement)).disabled = true;
			} else if(((this.element) instanceof HTMLTextAreaElement)) {
				(js_Boot.__cast(this.element , HTMLTextAreaElement)).disabled = true;
			}
		} else {
			this.element.style.cursor = null;
			if(((this.element) instanceof HTMLInputElement)) {
				(js_Boot.__cast(this.element , HTMLInputElement)).disabled = false;
			} else if(((this.element) instanceof HTMLTextAreaElement)) {
				(js_Boot.__cast(this.element , HTMLTextAreaElement)).disabled = false;
			}
		}
		if(!haxe_ui_backend_TextDisplayImpl.prototype.validateStyle.call(this)) {
			return measureTextRequired;
		} else {
			return true;
		}
	}
	,measureText: function() {
		if(haxe_ui_backend_html5_HtmlUtils.DIV_HELPER == null) {
			haxe_ui_backend_html5_HtmlUtils.createDivHelper();
		}
		var div = haxe_ui_backend_html5_HtmlUtils.DIV_HELPER;
		this.setTempDivData(div);
		this._textWidth = div.clientWidth;
		this._textHeight = div.clientHeight;
		this._inputData.hscrollMax = this._textWidth - this._width;
		this._inputData.hscrollPageSize = this._width * this._inputData.hscrollMax / this._textWidth;
		this._inputData.vscrollMax = this._textHeight - this._height;
		this._inputData.vscrollPageSize = this._height * this._inputData.vscrollMax / this._textHeight;
	}
	,createElement: function() {
		if(this.element != null) {
			this.element.removeEventListener("input",$bind(this,this.onChangeEvent));
			this.element.removeEventListener("propertychange",$bind(this,this.onChangeEvent));
			this.element.removeEventListener("scroll",$bind(this,this.onScroll));
		}
		var el = null;
		if(this._displayData.multiline == false) {
			el = window.document.createElement("input");
			el.style.border = "none";
			el.style.outline = "none";
			el.style.whiteSpace = "pre";
			el.style.overflow = "hidden";
			el.style.cursor = "initial";
			el.style.position = "absolute";
			el.style.backgroundColor = "inherit";
			el.style.padding = "0px";
			el.style.marginLeft = "-1px";
			el.style.marginTop = "-1px";
			el.spellcheck = false;
		} else {
			el = window.document.createElement("textarea");
			el.style.border = "none";
			el.style.resize = "none";
			el.style.outline = "none";
			el.style.lineHeight = "1.4";
			el.style.padding = "0px";
			el.style.margin = "0px";
			el.style.bottom = "0px";
			el.style.right = "0px";
			el.style.overflow = "hidden";
			el.style.cursor = "initial";
			el.style.position = "absolute";
			el.style.backgroundColor = "inherit";
			el.style.whiteSpace = "pre-wrap";
			el.id = "textArea";
			el.spellcheck = false;
			el.onkeydown = function(e) {
				if(e.keyCode == 9 || e.which == 9) {
					e.preventDefault();
					e.stopImmediatePropagation();
					e.stopPropagation();
					var ta = js_Boot.__cast(el , HTMLTextAreaElement);
					var s = ta.selectionStart;
					ta.value = ta.value.substring(0,ta.selectionStart) + "\t" + ta.value.substring(ta.selectionEnd);
					ta.selectionEnd = s + 1;
					return false;
				}
				return true;
			};
		}
		el.addEventListener("input",$bind(this,this.onChangeEvent));
		el.addEventListener("propertychange",$bind(this,this.onChangeEvent));
		el.addEventListener("scroll",$bind(this,this.onScroll));
		return el;
	}
	,setTempDivData: function(div) {
		var t = this._text;
		if(t == null || t.length == 0) {
			t = "|";
		}
		div.style.fontFamily = this.element.style.fontFamily;
		div.style.fontSize = this.element.style.fontSize;
		div.style.whiteSpace = this.element.style.whiteSpace;
		div.style.lineHeight = this.element.style.lineHeight;
		if(this.get_autoWidth() == false) {
			div.style.width = this._width > 0 ? "" + ("" + this._width + "px") : "";
		} else {
			div.style.width = "";
		}
		var normalizedText = haxe_ui_backend_TextDisplayImpl.prototype.normalizeText.call(this,t);
		if(this._displayData.multiline == true) {
			normalizedText += "<br>";
		}
		div.innerHTML = normalizedText;
	}
	,normalizeText: function(text,$escape) {
		if($escape == null) {
			$escape = true;
		}
		return StringTools.replace(text,"\\n","\n");
	}
	,__class__: haxe_ui_backend_TextInputImpl
});
var haxe_ui_backend_TimerImpl = function(delay,callback) {
	this._timer = new haxe_Timer(delay);
	this._timer.run = function() {
		callback();
	};
};
$hxClasses["haxe.ui.backend.TimerImpl"] = haxe_ui_backend_TimerImpl;
haxe_ui_backend_TimerImpl.__name__ = "haxe.ui.backend.TimerImpl";
haxe_ui_backend_TimerImpl.prototype = {
	_timer: null
	,stop: function() {
		this._timer.stop();
	}
	,__class__: haxe_ui_backend_TimerImpl
};
var haxe_ui_backend_html5_EventMapper = function() { };
$hxClasses["haxe.ui.backend.html5.EventMapper"] = haxe_ui_backend_html5_EventMapper;
haxe_ui_backend_html5_EventMapper.__name__ = "haxe.ui.backend.html5.EventMapper";
var haxe_ui_validation_ValidationManager = function() {
	this._displayQueue = [];
	this._queue = [];
	this.isValidating = false;
	this.isPending = false;
};
$hxClasses["haxe.ui.validation.ValidationManager"] = haxe_ui_validation_ValidationManager;
haxe_ui_validation_ValidationManager.__name__ = "haxe.ui.validation.ValidationManager";
haxe_ui_validation_ValidationManager.__properties__ = {get_instance:"get_instance"};
haxe_ui_validation_ValidationManager.get_instance = function() {
	if(haxe_ui_validation_ValidationManager.instance == null) {
		haxe_ui_validation_ValidationManager.instance = new haxe_ui_validation_ValidationManager();
	}
	return haxe_ui_validation_ValidationManager.instance;
};
haxe_ui_validation_ValidationManager.prototype = {
	isValidating: null
	,isPending: null
	,_queue: null
	,_displayQueue: null
	,_events: null
	,registerEvent: function(type,listener) {
		if(this._events == null) {
			this._events = new haxe_ui_util_EventMap();
		}
		this._events.add(type,listener);
	}
	,unregisterEvent: function(type,listener) {
		if(this._events == null) {
			this._events.remove(type,listener);
		}
	}
	,dispatch: function(event) {
		if(this._events != null) {
			this._events.invoke(event.type,event);
		}
	}
	,dispose: function() {
		this.isValidating = false;
		this._queue.splice(0,this._queue.length);
	}
	,add: function(object) {
		if(this._queue.indexOf(object) != -1) {
			return;
		}
		var queueLength = this._queue.length;
		if(this.isValidating == true) {
			var depth = object.get_depth();
			var min = 0;
			var max = queueLength;
			var i = 0;
			var otherDepth = 0;
			while(max > min) {
				i = min + max >>> 1;
				otherDepth = this._queue[i].get_depth();
				if(otherDepth == depth) {
					break;
				} else if(otherDepth < depth) {
					max = i;
				} else {
					min = i + 1;
				}
			}
			if(otherDepth >= depth) {
				++i;
			}
			this._queue.splice(i,0,object);
		} else {
			this._queue[queueLength] = object;
			if(this.isPending == false) {
				this.isPending = true;
				haxe_ui_Toolkit.callLater($bind(this,this.process));
			}
		}
	}
	,addDisplay: function(item,nextFrame) {
		if(nextFrame == null) {
			nextFrame = true;
		}
		if(this._displayQueue.indexOf(item) == -1) {
			this._displayQueue.push(item);
		}
		if(nextFrame == false) {
			this.process();
		}
	}
	,process: function() {
		if(this.isValidating == true || this.isPending == false) {
			return;
		}
		var queueLength = this._queue.length;
		if(queueLength == 0) {
			this.isPending = false;
			return;
		}
		this.isValidating = true;
		if(queueLength > 1) {
			this._queue.sort($bind(this,this.queueSortFunction));
		}
		this.dispatch(new haxe_ui_events_ValidationEvent("ValidationStart"));
		while(this._queue.length > 0) {
			var item = this._queue.shift();
			if(item.get_depth() < 0) {
				continue;
			}
			item.validateComponent();
		}
		var _g = 0;
		var _g1 = this._displayQueue.length;
		while(_g < _g1) {
			var i = _g++;
			var item = this._displayQueue[i];
			item.updateComponentDisplay();
		}
		this._displayQueue.splice(0,this._displayQueue.length);
		this.isValidating = false;
		this.isPending = false;
		this.dispatch(new haxe_ui_events_ValidationEvent("ValidationStop"));
	}
	,queueSortFunction: function(first,second) {
		var difference = second.get_depth() - first.get_depth();
		if(difference > 0) {
			return 1;
		} else if(difference < 0) {
			return -1;
		} else {
			return 0;
		}
	}
	,__class__: haxe_ui_validation_ValidationManager
};
var haxe_ui_backend_html5_HtmlUtils = function() { };
$hxClasses["haxe.ui.backend.html5.HtmlUtils"] = haxe_ui_backend_html5_HtmlUtils;
haxe_ui_backend_html5_HtmlUtils.__name__ = "haxe.ui.backend.html5.HtmlUtils";
haxe_ui_backend_html5_HtmlUtils.__properties__ = {get_dpi:"get_dpi"};
haxe_ui_backend_html5_HtmlUtils.px = function(value) {
	return "" + value + "px";
};
haxe_ui_backend_html5_HtmlUtils.color = function(value) {
	if(value == null) {
		return "rgba(0, 0, 0, 0)";
	}
	return "#" + StringTools.hex(value,6);
};
haxe_ui_backend_html5_HtmlUtils.rgba = function(value,alpha) {
	if(alpha == null) {
		alpha = 1;
	}
	var r = value >> 16 & 255;
	var g = value >> 8 & 255;
	var b = value & 255;
	return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
};
haxe_ui_backend_html5_HtmlUtils.escape = function(s) {
	s = StringTools.replace(s,"\"","&quot;");
	s = StringTools.replace(s,"'","&#39;");
	s = StringTools.replace(s,"<","&lt;");
	s = StringTools.replace(s,">","&gt;");
	return s;
};
haxe_ui_backend_html5_HtmlUtils.namedChild = function(el,child,index) {
	if(index == null) {
		index = 0;
	}
	if(child != null) {
		var list = el.getElementsByTagName(child);
		if(list.length == 0) {
			return null;
		}
		el = list.item(index);
	}
	return el;
};
haxe_ui_backend_html5_HtmlUtils.onValidationStop = function(e) {
	var tmp = haxe_ui_backend_html5_HtmlUtils.DIV_HELPER != null;
};
haxe_ui_backend_html5_HtmlUtils.createDivHelper = function() {
	if(haxe_ui_backend_html5_HtmlUtils.DIV_HELPER == null) {
		haxe_ui_backend_html5_HtmlUtils.DIV_HELPER = window.document.createElement("div");
		haxe_ui_backend_html5_HtmlUtils.DIV_HELPER.style.position = "absolute";
		haxe_ui_backend_html5_HtmlUtils.DIV_HELPER.style.top = "-99999px";
		haxe_ui_backend_html5_HtmlUtils.DIV_HELPER.style.left = "-99999px";
		window.document.body.appendChild(haxe_ui_backend_html5_HtmlUtils.DIV_HELPER);
	}
};
haxe_ui_backend_html5_HtmlUtils.measureText = function(text,addWidth,addHeight,fontSize,fontName) {
	if(fontSize == null) {
		fontSize = -1;
	}
	if(addHeight == null) {
		addHeight = 0;
	}
	if(addWidth == null) {
		addWidth = 0;
	}
	if(haxe_ui_backend_html5_HtmlUtils.DIV_HELPER == null) {
		haxe_ui_backend_html5_HtmlUtils.createDivHelper();
	}
	haxe_ui_backend_html5_HtmlUtils.DIV_HELPER.style.width = "";
	haxe_ui_backend_html5_HtmlUtils.DIV_HELPER.style.height = "";
	if(fontSize > 0) {
		haxe_ui_backend_html5_HtmlUtils.DIV_HELPER.style.fontSize = "" + fontSize + "px";
	} else {
		haxe_ui_backend_html5_HtmlUtils.DIV_HELPER.style.fontSize = "";
	}
	if(fontName != null) {
		haxe_ui_backend_html5_HtmlUtils.DIV_HELPER.style.fontFamily = fontName;
	} else {
		haxe_ui_backend_html5_HtmlUtils.DIV_HELPER.style.fontFamily = "";
	}
	haxe_ui_backend_html5_HtmlUtils.DIV_HELPER.innerHTML = text;
	return new haxe_ui_geom_Size(haxe_ui_backend_html5_HtmlUtils.DIV_HELPER.clientWidth + addWidth,haxe_ui_backend_html5_HtmlUtils.DIV_HELPER.clientHeight + addHeight);
};
haxe_ui_backend_html5_HtmlUtils.get_dpi = function() {
	if(haxe_ui_backend_html5_HtmlUtils._dpi != 0) {
		return haxe_ui_backend_html5_HtmlUtils._dpi;
	}
	var div = window.document.createElement("div");
	div.style.width = "1in";
	div.style.height = "1in";
	div.style.position = "absolute";
	div.style.top = "-99999px";
	div.style.left = "-99999px";
	window.document.body.appendChild(div);
	var devicePixelRatio = window.devicePixelRatio;
	if(devicePixelRatio == null) {
		devicePixelRatio = 1;
	}
	haxe_ui_backend_html5_HtmlUtils._dpi = div.offsetWidth * devicePixelRatio;
	haxe_ui_backend_html5_HtmlUtils.removeElement(div);
	return haxe_ui_backend_html5_HtmlUtils._dpi;
};
haxe_ui_backend_html5_HtmlUtils.swapElements = function(el1,el2) {
	el2.parentElement.insertBefore(el2,el1);
};
haxe_ui_backend_html5_HtmlUtils.insertBefore = function(el,before) {
	before.parentElement.insertBefore(before,el);
};
haxe_ui_backend_html5_HtmlUtils.removeElement = function(el) {
	if(el != null && el.parentElement != null) {
		el.parentElement.removeChild(el);
	}
};
haxe_ui_backend_html5_HtmlUtils.isRetinaDisplay = function() {
	if(haxe_ui_backend_html5_HtmlUtils._isRetina == null) {
		var query = "(-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2), (min-resolution: 192dpi)";
		if(window.matchMedia(query).matches) {
			haxe_ui_backend_html5_HtmlUtils._isRetina = true;
		} else {
			haxe_ui_backend_html5_HtmlUtils._isRetina = false;
		}
	}
	return haxe_ui_backend_html5_HtmlUtils._isRetina;
};
var haxe_ui_backend_html5_StyleHelper = function() { };
$hxClasses["haxe.ui.backend.html5.StyleHelper"] = haxe_ui_backend_html5_StyleHelper;
haxe_ui_backend_html5_StyleHelper.__name__ = "haxe.ui.backend.html5.StyleHelper";
haxe_ui_backend_html5_StyleHelper.apply = function(component,width,height,style) {
	var element = component.element;
	var css = element.style;
	var slice = null;
	if(style.backgroundImageSliceTop != null && style.backgroundImageSliceLeft != null && style.backgroundImageSliceBottom != null && style.backgroundImageSliceRight != null) {
		slice = new haxe_ui_geom_Rectangle(style.backgroundImageSliceLeft,style.backgroundImageSliceTop,style.backgroundImageSliceRight - style.backgroundImageSliceLeft,style.backgroundImageSliceBottom - style.backgroundImageSliceTop);
	}
	if(slice != null) {
		width = Math.round(width);
		height = Math.round(height);
	}
	css.width = "" + width + "px";
	css.height = "" + height + "px";
	var borderStyle = style.borderStyle;
	if(borderStyle == null) {
		borderStyle = "solid";
	}
	if(style.borderLeftSize != null && style.borderLeftSize == style.borderRightSize && style.borderLeftSize == style.borderBottomSize && style.borderLeftSize == style.borderTopSize) {
		if(style.borderLeftSize > 0) {
			css.borderWidth = "" + style.borderLeftSize + "px";
			css.borderStyle = borderStyle;
		} else {
			css.removeProperty("border-width");
			css.removeProperty("border-style");
		}
	} else if(style.borderLeftSize == null && style.borderRightSize == null && style.borderBottomSize == null && style.borderTopSize == null) {
		css.removeProperty("border-width");
		css.removeProperty("border-style");
	} else {
		if(style.borderTopSize != null && style.borderTopSize > 0) {
			css.borderTopWidth = "" + style.borderTopSize + "px";
			css.borderTopStyle = borderStyle;
		} else {
			css.removeProperty("border-top-width");
			css.removeProperty("border-top-style");
		}
		if(style.borderLeftSize != null && style.borderLeftSize > 0) {
			css.borderLeftWidth = "" + style.borderLeftSize + "px";
			css.borderLeftStyle = borderStyle;
		} else {
			css.removeProperty("border-left-width");
			css.removeProperty("border-left-style");
		}
		if(style.borderBottomSize != null && style.borderBottomSize > 0) {
			css.borderBottomWidth = "" + style.borderBottomSize + "px";
			css.borderBottomStyle = borderStyle;
		} else {
			css.removeProperty("border-bottom-width");
			css.removeProperty("border-bottom-style");
		}
		if(style.borderRightSize != null && style.borderRightSize > 0) {
			css.borderRightWidth = "" + style.borderRightSize + "px";
			css.borderRightStyle = borderStyle;
		} else {
			css.removeProperty("border-right-width");
			css.removeProperty("border-right-style");
		}
	}
	if(style.borderLeftColor != null && style.borderLeftColor == style.borderRightColor && style.borderLeftColor == style.borderBottomColor && style.borderLeftColor == style.borderTopColor) {
		if(style.borderOpacity == null) {
			css.borderColor = haxe_ui_backend_html5_HtmlUtils.color(style.borderLeftColor);
		} else {
			css.borderColor = haxe_ui_backend_html5_HtmlUtils.rgba(style.borderLeftColor,style.borderOpacity);
		}
	} else if(style.borderLeftColor == null && style.borderRightColor == null && style.borderBottomColor == null && style.borderTopColor == null) {
		css.removeProperty("border-color");
	} else {
		if(style.borderTopColor != null && style.borderTopSize != null) {
			if(style.borderOpacity == null) {
				css.borderTopColor = haxe_ui_backend_html5_HtmlUtils.color(style.borderTopColor);
			} else {
				css.borderTopColor = haxe_ui_backend_html5_HtmlUtils.rgba(style.borderTopColor,style.borderOpacity);
			}
		} else if(style.borderTopColor == null && style.borderTopSize != null) {
			css.borderTopColor = haxe_ui_backend_html5_HtmlUtils.color(style.borderTopColor);
		} else {
			css.removeProperty("border-top-color");
		}
		if(style.borderLeftColor != null && style.borderLeftSize != null) {
			if(style.borderOpacity == null) {
				css.borderLeftColor = haxe_ui_backend_html5_HtmlUtils.color(style.borderLeftColor);
			} else {
				css.borderLeftColor = haxe_ui_backend_html5_HtmlUtils.rgba(style.borderLeftColor,style.borderOpacity);
			}
		} else if(style.borderLeftColor == null && style.borderLeftSize != null) {
			css.borderLeftColor = haxe_ui_backend_html5_HtmlUtils.color(style.borderLeftColor);
		} else {
			css.removeProperty("border-left-color");
		}
		if(style.borderBottomColor != null && style.borderBottomSize != null) {
			if(style.borderOpacity == null) {
				css.borderBottomColor = haxe_ui_backend_html5_HtmlUtils.color(style.borderBottomColor);
			} else {
				css.borderBottomColor = haxe_ui_backend_html5_HtmlUtils.rgba(style.borderBottomColor,style.borderOpacity);
			}
		} else if(style.borderBottomColor == null && style.borderBottomSize != null) {
			css.borderBottomColor = haxe_ui_backend_html5_HtmlUtils.color(style.borderBottomColor);
		} else {
			css.removeProperty("border-bottom-color");
		}
		if(style.borderRightColor != null && style.borderRightSize != null) {
			if(style.borderOpacity == null) {
				css.borderRightColor = haxe_ui_backend_html5_HtmlUtils.color(style.borderRightColor);
			} else {
				css.borderRightColor = haxe_ui_backend_html5_HtmlUtils.rgba(style.borderRightColor,style.borderOpacity);
			}
		} else if(style.borderRightColor == null && style.borderRightSize != null) {
			css.borderRightColor = haxe_ui_backend_html5_HtmlUtils.color(style.borderRightColor);
		} else {
			css.removeProperty("border-right-color");
		}
	}
	var background = [];
	if(style.backgroundColor != null) {
		if(style.backgroundColorEnd != null && style.backgroundColorEnd != style.backgroundColor) {
			css.removeProperty("background-color");
			var gradientStyle = style.backgroundGradientStyle;
			if(gradientStyle == null) {
				gradientStyle = "vertical";
			}
			if(style.backgroundOpacity != null) {
				if(gradientStyle == "vertical") {
					background.push("linear-gradient(to bottom, " + haxe_ui_backend_html5_HtmlUtils.rgba(style.backgroundColor,style.backgroundOpacity) + ", " + haxe_ui_backend_html5_HtmlUtils.rgba(style.backgroundColorEnd,style.backgroundOpacity) + ")");
				} else if(gradientStyle == "horizontal") {
					background.push("linear-gradient(to right, " + haxe_ui_backend_html5_HtmlUtils.rgba(style.backgroundColor,style.backgroundOpacity) + ", " + haxe_ui_backend_html5_HtmlUtils.rgba(style.backgroundColorEnd,style.backgroundOpacity) + ")");
				}
			} else if(gradientStyle == "vertical") {
				background.push("linear-gradient(to bottom, " + haxe_ui_backend_html5_HtmlUtils.color(style.backgroundColor) + ", " + haxe_ui_backend_html5_HtmlUtils.color(style.backgroundColorEnd) + ")");
			} else if(gradientStyle == "horizontal") {
				background.push("linear-gradient(to right, " + haxe_ui_backend_html5_HtmlUtils.color(style.backgroundColor) + ", " + haxe_ui_backend_html5_HtmlUtils.color(style.backgroundColorEnd) + ")");
			}
		} else {
			css.removeProperty("background");
			if(style.backgroundOpacity != null) {
				css.backgroundColor = haxe_ui_backend_html5_HtmlUtils.rgba(style.backgroundColor,style.backgroundOpacity);
			} else {
				css.backgroundColor = haxe_ui_backend_html5_HtmlUtils.color(style.backgroundColor);
			}
		}
	} else {
		css.removeProperty("background");
		css.removeProperty("background-color");
	}
	if(style.borderRadius != null && style.borderRadius > 0 && (style.borderRadiusTopLeft == null || style.borderRadiusTopLeft == style.borderRadius) && (style.borderRadiusTopRight == null || style.borderRadiusTopRight == style.borderRadius) && (style.borderRadiusBottomLeft == null || style.borderRadiusBottomLeft == style.borderRadius) && (style.borderRadiusBottomRight == null || style.borderRadiusBottomRight == style.borderRadius)) {
		css.borderRadius = "" + style.borderRadius + "px";
	} else if(style.borderRadiusTopLeft != null && style.borderRadiusTopLeft > 0 || style.borderRadiusTopRight != null && style.borderRadiusTopRight > 0 || style.borderRadiusBottomLeft != null && style.borderRadiusBottomLeft > 0 || style.borderRadiusBottomRight != null && style.borderRadiusBottomRight > 0) {
		if(style.borderRadiusTopLeft != null && style.borderRadiusTopLeft > 0) {
			css.borderTopLeftRadius = "" + style.borderRadiusTopLeft + "px";
		} else {
			css.removeProperty("border-top-left-radius");
		}
		if(style.borderRadiusTopRight != null && style.borderRadiusTopRight > 0) {
			css.borderTopRightRadius = "" + style.borderRadiusTopRight + "px";
		} else {
			css.removeProperty("border-top-right-radius");
		}
		if(style.borderRadiusBottomLeft != null && style.borderRadiusBottomLeft > 0) {
			css.borderBottomLeftRadius = "" + style.borderRadiusBottomLeft + "px";
		} else {
			css.removeProperty("border-bottom-left-radius");
		}
		if(style.borderRadiusBottomRight != null && style.borderRadiusBottomRight > 0) {
			css.borderBottomRightRadius = "" + style.borderRadiusBottomRight + "px";
		} else {
			css.removeProperty("border-bottom-right-radius");
		}
	} else {
		css.removeProperty("border-radius");
	}
	if(style.backgroundImage != null) {
		haxe_ui_Toolkit.get_assets().getImage(style.backgroundImage,function(imageInfo) {
			if(imageInfo == null) {
				return;
			}
			var imageRect = new haxe_ui_geom_Rectangle(0,0,imageInfo.width,imageInfo.height);
			if(style.backgroundImageClipTop != null && style.backgroundImageClipLeft != null && style.backgroundImageClipBottom != null && style.backgroundImageClipRight != null) {
				imageRect = new haxe_ui_geom_Rectangle(style.backgroundImageClipLeft,style.backgroundImageClipTop,style.backgroundImageClipRight - style.backgroundImageClipLeft,style.backgroundImageClipBottom - style.backgroundImageClipTop);
			}
			if(slice == null) {
				if(imageRect.width == imageInfo.width && imageRect.height == imageInfo.height) {
					background.push("url(" + imageInfo.data.src + ")");
					if(style.backgroundImageRepeat == null) {
						css.backgroundRepeat = "no-repeat";
						css.removeProperty("background-size");
					} else if(style.backgroundImageRepeat == "repeat") {
						css.backgroundRepeat = "repeat";
						css.removeProperty("background-size");
					} else if(style.backgroundImageRepeat == "stretch") {
						css.backgroundRepeat = "no-repeat";
						css.backgroundSize = "100% 100%";
					}
					background.reverse();
					css.background = background.join(",");
				} else {
					var canvas = component.getCanvas(width,height);
					var ctx = canvas.getContext("2d",null);
					ctx.clearRect(0,0,width,height);
					haxe_ui_backend_html5_StyleHelper.paintBitmap(ctx,imageInfo.data,imageRect,new haxe_ui_geom_Rectangle(0,0,width,height));
				}
			} else {
				var rects = haxe_ui_geom_Slice9.buildRects(width,height,imageRect.width,imageRect.height,slice);
				var srcRects = rects.src;
				var dstRects = rects.dst;
				var canvas = component.getCanvas(width,height);
				var ctx = canvas.getContext("2d",null);
				ctx.clearRect(0,0,width,height);
				ctx.imageSmoothingEnabled = false;
				var _g = 0;
				var _g1 = srcRects.length;
				while(_g < _g1) {
					var i = _g++;
					var srcRect = new haxe_ui_geom_Rectangle(srcRects[i].left + imageRect.left,srcRects[i].top + imageRect.top,srcRects[i].width,srcRects[i].height);
					var dstRect = dstRects[i];
					haxe_ui_backend_html5_StyleHelper.paintBitmap(ctx,imageInfo.data,srcRect,dstRect);
				}
			}
		});
	} else {
		component.removeCanvas();
		css.background = background[0];
	}
};
haxe_ui_backend_html5_StyleHelper.paintBitmap = function(ctx,img,srcRect,dstRect) {
	if(srcRect.width == 0 || srcRect.height == 0) {
		return;
	}
	if(dstRect.width == 0 || dstRect.height == 0) {
		return;
	}
	ctx.drawImage(img,srcRect.left | 0,srcRect.top | 0,srcRect.width | 0,srcRect.height | 0,dstRect.left | 0,dstRect.top | 0,dstRect.width | 0,dstRect.height | 0);
};
var haxe_ui_backend_html5_UserAgent = function() {
	this._unknown = false;
	this._msie = false;
	this._firefox = false;
	this._safari = false;
	this._chrome = false;
	this._opera = false;
	var ua = $global.navigator.userAgent;
	if(ua.indexOf("Opera") != -1 || ua.indexOf("OPR") != -1) {
		this._opera = true;
	} else if(ua.indexOf("Chrome") != -1) {
		this._chrome = true;
	} else if(ua.indexOf("Safari") != -1) {
		this._safari = true;
	} else if(ua.indexOf("Firefox") != -1) {
		this._firefox = true;
	} else if(ua.indexOf("MSIE") != -1) {
		this._msie = true;
	} else {
		this._unknown = true;
	}
};
$hxClasses["haxe.ui.backend.html5.UserAgent"] = haxe_ui_backend_html5_UserAgent;
haxe_ui_backend_html5_UserAgent.__name__ = "haxe.ui.backend.html5.UserAgent";
haxe_ui_backend_html5_UserAgent.__properties__ = {get_instance:"get_instance"};
haxe_ui_backend_html5_UserAgent.get_instance = function() {
	if(haxe_ui_backend_html5_UserAgent._instance == null) {
		haxe_ui_backend_html5_UserAgent._instance = new haxe_ui_backend_html5_UserAgent();
	}
	return haxe_ui_backend_html5_UserAgent._instance;
};
haxe_ui_backend_html5_UserAgent.prototype = {
	_opera: null
	,opera: null
	,get_opera: function() {
		return this._opera;
	}
	,_chrome: null
	,chrome: null
	,get_chrome: function() {
		return this._chrome;
	}
	,_safari: null
	,safari: null
	,get_safari: function() {
		return this._safari;
	}
	,_firefox: null
	,firefox: null
	,get_firefox: function() {
		return this._firefox;
	}
	,_msie: null
	,msie: null
	,get_msie: function() {
		return this._msie;
	}
	,_unknown: null
	,unknown: null
	,get_unknown: function() {
		return this._unknown;
	}
	,__class__: haxe_ui_backend_html5_UserAgent
	,__properties__: {get_unknown:"get_unknown",get_msie:"get_msie",get_firefox:"get_firefox",get_safari:"get_safari",get_chrome:"get_chrome",get_opera:"get_opera"}
};
var haxe_ui_backend_html5_util_FontDetect = function() {
};
$hxClasses["haxe.ui.backend.html5.util.FontDetect"] = haxe_ui_backend_html5_util_FontDetect;
haxe_ui_backend_html5_util_FontDetect.__name__ = "haxe.ui.backend.html5.util.FontDetect";
haxe_ui_backend_html5_util_FontDetect.init = function() {
	if(haxe_ui_backend_html5_util_FontDetect._initialized == true) {
		return;
	}
	haxe_ui_backend_html5_util_FontDetect._initialized = true;
	var body = window.document.body;
	var firstChild = window.document.body.firstChild;
	var div = window.document.createElement("div");
	div.id = "fontdetectHelper";
	haxe_ui_backend_html5_util_FontDetect.span = window.document.createElement("span");
	haxe_ui_backend_html5_util_FontDetect.span.innerText = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	div.appendChild(haxe_ui_backend_html5_util_FontDetect.span);
	body.insertBefore(div,firstChild);
	div.style.position = "absolute";
	div.style.visibility = "hidden";
	div.style.top = "-200px";
	div.style.left = "-100000px";
	div.style.width = "100000px";
	div.style.height = "200px";
	div.style.fontSize = "100px";
};
haxe_ui_backend_html5_util_FontDetect.onFontLoaded = function(cssFontName,onLoad,onFail,options) {
	if(cssFontName == null) {
		return;
	}
	var msInterval = 10;
	if(options != null && options.msInterval != null) {
		msInterval = options.msInterval;
	}
	var msTimeout = 2000;
	if(options != null && options.msTimeout != null) {
		msTimeout = options.msTimeout;
	}
	if(onLoad == null && onFail == null) {
		return;
	}
	if(haxe_ui_backend_html5_util_FontDetect._initialized == false) {
		haxe_ui_backend_html5_util_FontDetect.init();
	}
	if(haxe_ui_backend_html5_util_FontDetect.isFontLoaded(cssFontName)) {
		if(onLoad != null) {
			onLoad(cssFontName);
		}
		return;
	}
	var utStart = new Date().getTime();
	var idInterval = 0;
	idInterval = window.setInterval(function() {
		if(haxe_ui_backend_html5_util_FontDetect.isFontLoaded(cssFontName)) {
			window.clearInterval(idInterval);
			if(onLoad != null) {
				onLoad(cssFontName);
			}
			return;
		} else {
			var utNow = new Date().getTime();
			if(utNow - utStart > msTimeout) {
				window.clearInterval(idInterval);
				if(onFail != null) {
					onFail(cssFontName);
				}
			}
		}
	},msInterval);
};
haxe_ui_backend_html5_util_FontDetect.isFontLoaded = function(cssFontName) {
	var wThisFont = 0;
	var wPrevFont = 0;
	if(haxe_ui_backend_html5_util_FontDetect._initialized == false) {
		haxe_ui_backend_html5_util_FontDetect.init();
	}
	var _g = 0;
	var _g1 = haxe_ui_backend_html5_util_FontDetect._aFallbackFonts.length;
	while(_g < _g1) {
		var ix = _g++;
		haxe_ui_backend_html5_util_FontDetect.span.style.fontFamily = cssFontName + "," + haxe_ui_backend_html5_util_FontDetect._aFallbackFonts[ix];
		wThisFont = haxe_ui_backend_html5_util_FontDetect.span.offsetWidth;
		if(ix > 0 && wThisFont != wPrevFont) {
			return false;
		}
		wPrevFont = wThisFont;
	}
	return true;
};
haxe_ui_backend_html5_util_FontDetect.prototype = {
	__class__: haxe_ui_backend_html5_util_FontDetect
};
var haxe_ui_backend_html5_util_StyleSheetHelper = function() {
};
$hxClasses["haxe.ui.backend.html5.util.StyleSheetHelper"] = haxe_ui_backend_html5_util_StyleSheetHelper;
haxe_ui_backend_html5_util_StyleSheetHelper.__name__ = "haxe.ui.backend.html5.util.StyleSheetHelper";
haxe_ui_backend_html5_util_StyleSheetHelper.getValidStyleSheet = function() {
	if(haxe_ui_backend_html5_util_StyleSheetHelper._sheet != null) {
		return haxe_ui_backend_html5_util_StyleSheetHelper._sheet;
	}
	var sheet = null;
	var _g = 0;
	var _g1 = window.document.styleSheets;
	while(_g < _g1.length) {
		var test = _g1[_g];
		++_g;
		if(test.ownerNode == null || test.disabled == true) {
			continue;
		}
		var css = js_Boot.__cast(test , CSSStyleSheet);
		if(css.ownerNode.nodeName == "STYLE" && css.href == null) {
			try {
				var r = css.cssRules;
				sheet = css;
				break;
			} catch( _g2 ) {
			}
		}
	}
	if(sheet == null) {
		var styleElement = window.document.createElement("style");
		styleElement.appendChild(window.document.createTextNode(""));
		window.document.head.appendChild(styleElement);
		sheet = js_Boot.__cast(styleElement.sheet , CSSStyleSheet);
	}
	haxe_ui_backend_html5_util_StyleSheetHelper._sheet = sheet;
	return sheet;
};
haxe_ui_backend_html5_util_StyleSheetHelper.prototype = {
	__class__: haxe_ui_backend_html5_util_StyleSheetHelper
};
var haxe_ui_behaviours_Behaviour = function(component) {
	this.config = null;
	this._component = component;
};
$hxClasses["haxe.ui.behaviours.Behaviour"] = haxe_ui_behaviours_Behaviour;
haxe_ui_behaviours_Behaviour.__name__ = "haxe.ui.behaviours.Behaviour";
haxe_ui_behaviours_Behaviour.prototype = {
	config: null
	,_component: null
	,id: null
	,set: function(value) {
	}
	,setDynamic: function(value) {
		this.set(haxe_ui_util_Variant.fromDynamic(value));
	}
	,detatch: function() {
	}
	,get: function() {
		return null;
	}
	,getDynamic: function() {
		return haxe_ui_util_Variant.toDynamic(this.get());
	}
	,update: function() {
	}
	,call: function(param) {
		return null;
	}
	,getConfigValue: function(name,defaultValue) {
		if(this.config == null) {
			return defaultValue;
		}
		if(Object.prototype.hasOwnProperty.call(this.config.h,name) == false) {
			return defaultValue;
		}
		return this.config.h[name];
	}
	,getConfigValueBool: function(name,defaultValue) {
		if(defaultValue == null) {
			defaultValue = false;
		}
		var v = defaultValue;
		var s = this.getConfigValue(name);
		if(s != null) {
			v = s == "true";
		}
		return v;
	}
	,__class__: haxe_ui_behaviours_Behaviour
};
var haxe_ui_behaviours_Behaviours = function(component) {
	this._actualUpdateOrder = null;
	this._updateOrder = [];
	this._instances = new haxe_ds_StringMap();
	this._registry = new haxe_ds_StringMap();
	this._component = component;
};
$hxClasses["haxe.ui.behaviours.Behaviours"] = haxe_ui_behaviours_Behaviours;
haxe_ui_behaviours_Behaviours.__name__ = "haxe.ui.behaviours.Behaviours";
haxe_ui_behaviours_Behaviours.prototype = {
	_component: null
	,_registry: null
	,_instances: null
	,register: function(id,cls,defaultValue) {
		var info = { id : id, cls : cls, defaultValue : defaultValue, isSet : false};
		this._registry.h[id] = info;
		HxOverrides.remove(this._updateOrder,id);
		this._updateOrder.push(id);
		this._actualUpdateOrder = null;
	}
	,isRegistered: function(id) {
		return Object.prototype.hasOwnProperty.call(this._registry.h,id);
	}
	,replaceNative: function() {
		if(this._component.get_native() == false || this._component.get_hasNativeEntry() == false) {
			return;
		}
		var ids = [];
		var h = this._registry.h;
		var id_h = h;
		var id_keys = Object.keys(h);
		var id_length = id_keys.length;
		var id_current = 0;
		while(id_current < id_length) {
			var id = id_keys[id_current++];
			ids.push(id);
		}
		var _g = 0;
		while(_g < ids.length) {
			var id = ids[_g];
			++_g;
			var nativeProps = this._component.getNativeConfigProperties(".behaviour[id=" + id + "]");
			if(nativeProps != null && Object.prototype.hasOwnProperty.call(nativeProps.h,"class")) {
				var registered = this._registry.h[id];
				var name = nativeProps.h["class"];
				var info = { id : id, cls : $hxClasses[name], defaultValue : registered.defaultValue, config : nativeProps, isSet : false};
				this._registry.h[id] = info;
			}
		}
	}
	,validateData: function() {
		var _g = 0;
		var _g1 = this.get_actualUpdateOrder();
		while(_g < _g1.length) {
			var key = _g1[_g];
			++_g;
			var b = this._instances.h[key];
			if(((b) instanceof haxe_ui_behaviours_DataBehaviour)) {
				(js_Boot.__cast(b , haxe_ui_behaviours_DataBehaviour)).validate();
			}
		}
	}
	,_updateOrder: null
	,get_updateOrder: function() {
		return this._updateOrder;
	}
	,set_updateOrder: function(value) {
		this._updateOrder = value;
		this._actualUpdateOrder = null;
		return value;
	}
	,_actualUpdateOrder: null
	,actualUpdateOrder: null
	,get_actualUpdateOrder: function() {
		if(this._actualUpdateOrder == null) {
			this._actualUpdateOrder = this._updateOrder.slice();
			var h = this._instances.h;
			var key_h = h;
			var key_keys = Object.keys(h);
			var key_length = key_keys.length;
			var key_current = 0;
			while(key_current < key_length) {
				var key = key_keys[key_current++];
				if(this._actualUpdateOrder.indexOf(key) == -1) {
					this._actualUpdateOrder.push(key);
				}
			}
		}
		return this._actualUpdateOrder;
	}
	,update: function() {
		var _g = 0;
		var _g1 = this.get_actualUpdateOrder();
		while(_g < _g1.length) {
			var key = _g1[_g];
			++_g;
			var b = this._instances.h[key];
			if(b != null) {
				b.update();
			}
		}
	}
	,find: function(id,create) {
		if(create == null) {
			create = true;
		}
		var b = this._instances.h[id];
		if(b == null && create == true) {
			var info = this._registry.h[id];
			if(info != null) {
				b = Type.createInstance(info.cls,[this._component]);
				if(b != null) {
					b.config = info.config;
					b.id = id;
					this._instances.h[id] = b;
					this._actualUpdateOrder = null;
				} else {
					var c = js_Boot.getClass(this._component);
					console.log("haxe/ui/behaviours/Behaviours.hx:140:","WARNING: problem creating behaviour class '" + Std.string(info.cls) + "' for '" + c.__name__ + ":" + id + "'");
				}
			}
		}
		if(b == null) {
			throw haxe_Exception.thrown("behaviour " + id + " not found");
		}
		return b;
	}
	,_cache: null
	,cache: function() {
		this._cache = new haxe_ds_StringMap();
		var h = this._registry.h;
		var registeredKey_h = h;
		var registeredKey_keys = Object.keys(h);
		var registeredKey_length = registeredKey_keys.length;
		var registeredKey_current = 0;
		while(registeredKey_current < registeredKey_length) {
			var registeredKey = registeredKey_keys[registeredKey_current++];
			var v = this._registry.h[registeredKey].defaultValue;
			var instance = this._instances.h[registeredKey];
			if(instance != null) {
				v = instance.get();
			}
			if(v != null) {
				this._cache.h[registeredKey] = v;
			}
		}
	}
	,detatch: function() {
		var h = this._instances.h;
		var b_h = h;
		var b_keys = Object.keys(h);
		var b_length = b_keys.length;
		var b_current = 0;
		while(b_current < b_length) {
			var b = b_h[b_keys[b_current++]];
			b.detatch();
		}
		this._instances = new haxe_ds_StringMap();
	}
	,restore: function() {
		if(this._cache == null) {
			return;
		}
		var _g = 0;
		var _g1 = this.get_actualUpdateOrder();
		while(_g < _g1.length) {
			var key = _g1[_g];
			++_g;
			var v = this._cache.h[key];
			if(v != null) {
				this.set(key,v);
			}
		}
		this._cache = null;
	}
	,lock: function() {
	}
	,unlock: function() {
	}
	,setDynamic: function(id,value) {
		this.lock();
		var b = this.find(id);
		var changed = null;
		if(((b) instanceof haxe_ui_behaviours_ValueBehaviour)) {
			var v = haxe_ui_util_Variant.toDynamic((js_Boot.__cast(b , haxe_ui_behaviours_ValueBehaviour))._value);
			changed = v != value;
		}
		b.setDynamic(value);
		var info = this._registry.h[id];
		info.isSet = true;
		this.unlock();
		this.performAutoDispatch(b,changed);
	}
	,set: function(id,value) {
		this.lock();
		var b = this.find(id);
		var changed = null;
		if(((b) instanceof haxe_ui_behaviours_ValueBehaviour)) {
			var v = (js_Boot.__cast(b , haxe_ui_behaviours_ValueBehaviour))._value;
			changed = haxe_ui_util_Variant.neq(v,value);
		}
		b.set(value);
		var info = this._registry.h[id];
		info.isSet = true;
		this.unlock();
		this.performAutoDispatch(b,changed);
	}
	,softSet: function(id,value) {
		var b = this.find(id);
		if(((b) instanceof haxe_ui_behaviours_ValueBehaviour)) {
			(js_Boot.__cast(b , haxe_ui_behaviours_ValueBehaviour))._value = value;
		}
	}
	,ready: function() {
		if(this._autoDispatch == null) {
			return;
		}
		var b = this._autoDispatch.keys();
		while(b.hasNext()) {
			var b1 = b.next();
			var changed = this._autoDispatch.h[b1.__id__];
			this.performAutoDispatch(b1,changed);
		}
		this._autoDispatch = null;
	}
	,_autoDispatch: null
	,performAutoDispatch: function(b,changed) {
		if(this._component.get_isReady() == false) {
			if(this._autoDispatch == null) {
				this._autoDispatch = new haxe_ds_ObjectMap();
			}
			this._autoDispatch.set(b,changed);
			return;
		}
		var autoDispatch = b.getConfigValue("autoDispatch",null);
		if(autoDispatch != null) {
			var arr = autoDispatch.split(".");
			var eventName = arr.pop().toLowerCase();
			var cls = arr.join(".");
			var event = Type.createInstance($hxClasses[cls],[eventName]);
			if(eventName != "change") {
				b._component.dispatch(event);
			} else if(changed == true || changed == null) {
				b._component.dispatch(event);
			}
		}
	}
	,get: function(id) {
		this.lock();
		var b = this.find(id);
		var v = null;
		if(b != null) {
			var info = this._registry.h[id];
			if(info.isSet == false && info.defaultValue != null && js_Boot.getClass(b) == haxe_ui_behaviours_DefaultBehaviour) {
				v = info.defaultValue;
			} else {
				v = b.get();
			}
		}
		this.unlock();
		return v;
	}
	,getDynamic: function(id) {
		this.lock();
		var b = this.find(id);
		var v = null;
		if(b != null) {
			v = b.getDynamic();
		}
		this.unlock();
		return v;
	}
	,call: function(id,param) {
		return this.find(id).call(param);
	}
	,applyDefaults: function() {
		var order = this._updateOrder.slice();
		var h = this._registry.h;
		var key_h = h;
		var key_keys = Object.keys(h);
		var key_length = key_keys.length;
		var key_current = 0;
		while(key_current < key_length) {
			var key = key_keys[key_current++];
			if(order.indexOf(key) == -1) {
				order.push(key);
			}
		}
		var _g = 0;
		while(_g < order.length) {
			var key = order[_g];
			++_g;
			var r = this._registry.h[key];
			if(r.defaultValue != null) {
				this.set(key,r.defaultValue);
			}
		}
	}
	,__class__: haxe_ui_behaviours_Behaviours
	,__properties__: {get_actualUpdateOrder:"get_actualUpdateOrder",set_updateOrder:"set_updateOrder",get_updateOrder:"get_updateOrder"}
};
var haxe_ui_behaviours_ValueBehaviour = function(component) {
	haxe_ui_behaviours_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.behaviours.ValueBehaviour"] = haxe_ui_behaviours_ValueBehaviour;
haxe_ui_behaviours_ValueBehaviour.__name__ = "haxe.ui.behaviours.ValueBehaviour";
haxe_ui_behaviours_ValueBehaviour.__super__ = haxe_ui_behaviours_Behaviour;
haxe_ui_behaviours_ValueBehaviour.prototype = $extend(haxe_ui_behaviours_Behaviour.prototype,{
	_value: null
	,get: function() {
		return this._value;
	}
	,set: function(value) {
		if(haxe_ui_util_Variant.eq(value,this._value)) {
			return;
		}
		this._value = value;
	}
	,__class__: haxe_ui_behaviours_ValueBehaviour
});
var haxe_ui_behaviours_DataBehaviour = function(component) {
	haxe_ui_behaviours_ValueBehaviour.call(this,component);
};
$hxClasses["haxe.ui.behaviours.DataBehaviour"] = haxe_ui_behaviours_DataBehaviour;
haxe_ui_behaviours_DataBehaviour.__name__ = "haxe.ui.behaviours.DataBehaviour";
haxe_ui_behaviours_DataBehaviour.__super__ = haxe_ui_behaviours_ValueBehaviour;
haxe_ui_behaviours_DataBehaviour.prototype = $extend(haxe_ui_behaviours_ValueBehaviour.prototype,{
	_dataInvalid: null
	,set: function(value) {
		if(haxe_ui_util_Variant.eq(value,this.get())) {
			return;
		}
		this._value = value;
		this.invalidateData();
	}
	,validate: function() {
		if(this._dataInvalid) {
			this._dataInvalid = false;
			this.validateData();
		}
	}
	,invalidateData: function() {
		this._dataInvalid = true;
		this._component.invalidateComponent("data",false);
	}
	,validateData: function() {
	}
	,__class__: haxe_ui_behaviours_DataBehaviour
});
var haxe_ui_behaviours_DefaultBehaviour = function(component) {
	this._value = null;
	haxe_ui_behaviours_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.behaviours.DefaultBehaviour"] = haxe_ui_behaviours_DefaultBehaviour;
haxe_ui_behaviours_DefaultBehaviour.__name__ = "haxe.ui.behaviours.DefaultBehaviour";
haxe_ui_behaviours_DefaultBehaviour.__super__ = haxe_ui_behaviours_Behaviour;
haxe_ui_behaviours_DefaultBehaviour.prototype = $extend(haxe_ui_behaviours_Behaviour.prototype,{
	_value: null
	,get: function() {
		return this._value;
	}
	,set: function(value) {
		if(haxe_ui_util_Variant.eq(value,this._value)) {
			return;
		}
		this._value = value;
		haxe_ui_behaviours_Behaviour.prototype.set.call(this,value);
	}
	,__class__: haxe_ui_behaviours_DefaultBehaviour
});
var haxe_ui_behaviours_InvalidatingBehaviour = function(component) {
	haxe_ui_behaviours_ValueBehaviour.call(this,component);
};
$hxClasses["haxe.ui.behaviours.InvalidatingBehaviour"] = haxe_ui_behaviours_InvalidatingBehaviour;
haxe_ui_behaviours_InvalidatingBehaviour.__name__ = "haxe.ui.behaviours.InvalidatingBehaviour";
haxe_ui_behaviours_InvalidatingBehaviour.__super__ = haxe_ui_behaviours_ValueBehaviour;
haxe_ui_behaviours_InvalidatingBehaviour.prototype = $extend(haxe_ui_behaviours_ValueBehaviour.prototype,{
	get: function() {
		return this._value;
	}
	,set: function(value) {
		if(haxe_ui_util_Variant.eq(value,this._value)) {
			return;
		}
		haxe_ui_behaviours_ValueBehaviour.prototype.set.call(this,value);
		var _this = this._component;
		if(!(_this._layout == null || _this._layoutLocked == true)) {
			_this.invalidateComponent("layout",false);
		}
	}
	,__class__: haxe_ui_behaviours_InvalidatingBehaviour
});
var haxe_ui_focus_IFocusable = function() { };
$hxClasses["haxe.ui.focus.IFocusable"] = haxe_ui_focus_IFocusable;
haxe_ui_focus_IFocusable.__name__ = "haxe.ui.focus.IFocusable";
haxe_ui_focus_IFocusable.__isInterface__ = true;
haxe_ui_focus_IFocusable.prototype = {
	get_focus: null
	,set_focus: null
	,get_allowFocus: null
	,set_allowFocus: null
	,__class__: haxe_ui_focus_IFocusable
	,__properties__: {set_allowFocus:"set_allowFocus",get_allowFocus:"get_allowFocus",set_focus:"set_focus",get_focus:"get_focus"}
};
var haxe_ui_core_InteractiveComponent = function() {
	this._allowFocus = true;
	this._focus = false;
	haxe_ui_core_Component.call(this);
};
$hxClasses["haxe.ui.core.InteractiveComponent"] = haxe_ui_core_InteractiveComponent;
haxe_ui_core_InteractiveComponent.__name__ = "haxe.ui.core.InteractiveComponent";
haxe_ui_core_InteractiveComponent.__interfaces__ = [haxe_ui_focus_IFocusable];
haxe_ui_core_InteractiveComponent.__super__ = haxe_ui_core_Component;
haxe_ui_core_InteractiveComponent.prototype = $extend(haxe_ui_core_Component.prototype,{
	_focus: null
	,get_focus: function() {
		return this._focus;
	}
	,set_focus: function(value) {
		if(this._focus == value || this.get_allowFocus() == false) {
			return value;
		}
		this._focus = value;
		var eventType = null;
		if(this._focus == true) {
			this.addClass(":active");
			eventType = "focusin";
			haxe_ui_focus_FocusManager.get_instance().set_focus(js_Boot.__cast(this , haxe_ui_focus_IFocusable));
			var scrollview = this.findScroller();
			if(scrollview != null) {
				scrollview.ensureVisible(this);
			}
		} else {
			this.removeClass(":active");
			eventType = "focusout";
			haxe_ui_focus_FocusManager.get_instance().set_focus(null);
		}
		this.invalidateComponent("data",false);
		this.dispatch(new haxe_ui_events_FocusEvent(eventType));
		return value;
	}
	,_allowFocus: null
	,get_allowFocus: function() {
		return this._allowFocus;
	}
	,set_allowFocus: function(value) {
		if(this._allowFocus == value) {
			return value;
		}
		this._allowFocus = value;
		var _g = 0;
		var _g1 = this._children == null ? [] : this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(js_Boot.__implements(child,haxe_ui_focus_IFocusable)) {
				(js_Boot.__cast(child , haxe_ui_focus_IFocusable)).set_allowFocus(value);
			}
		}
		return value;
	}
	,findScroller: function() {
		var view = null;
		var ref = this;
		while(ref != null) {
			if(js_Boot.__implements(ref,haxe_ui_core_IScrollView)) {
				view = js_Boot.__cast(ref , haxe_ui_core_IScrollView);
				break;
			}
			ref = ref.parentComponent;
		}
		return view;
	}
	,registerBehaviours: function() {
		haxe_ui_core_Component.prototype.registerBehaviours.call(this);
		this.behaviours.register("allowInteraction",haxe_ui_behaviours_DefaultBehaviour,haxe_ui_util_Variant.fromBool(true));
	}
	,get_allowInteraction: function() {
		return haxe_ui_util_Variant.toBool(this.behaviours.get("allowInteraction"));
	}
	,set_allowInteraction: function(value) {
		this.behaviours.set("allowInteraction",haxe_ui_util_Variant.fromBool(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertyChange",null,"allowInteraction"));
		return value;
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_Component.prototype.cloneComponent.call(this);
		c.set_allowInteraction(this.get_allowInteraction());
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		return c;
	}
	,self: function() {
		return new haxe_ui_core_InteractiveComponent();
	}
	,__class__: haxe_ui_core_InteractiveComponent
	,__properties__: $extend(haxe_ui_core_Component.prototype.__properties__,{set_allowInteraction:"set_allowInteraction",get_allowInteraction:"get_allowInteraction",set_allowFocus:"set_allowFocus",get_allowFocus:"get_allowFocus",set_focus:"set_focus",get_focus:"get_focus"})
});
var haxe_ui_components_Button = function() {
	haxe_ui_core_InteractiveComponent.call(this);
};
$hxClasses["haxe.ui.components.Button"] = haxe_ui_components_Button;
haxe_ui_components_Button.__name__ = "haxe.ui.components.Button";
haxe_ui_components_Button.__super__ = haxe_ui_core_InteractiveComponent;
haxe_ui_components_Button.prototype = $extend(haxe_ui_core_InteractiveComponent.prototype,{
	registerBehaviours: function() {
		haxe_ui_core_InteractiveComponent.prototype.registerBehaviours.call(this);
		this.behaviours.register("repeater",haxe_ui_behaviours_DefaultBehaviour,haxe_ui_util_Variant.fromBool(false));
		this.behaviours.register("repeatInterval",haxe_ui_behaviours_DefaultBehaviour,haxe_ui_util_Variant.fromInt(50));
		this.behaviours.register("easeInRepeater",haxe_ui_behaviours_DefaultBehaviour,haxe_ui_util_Variant.fromBool(false));
		this.behaviours.register("remainPressed",haxe_ui_behaviours_DefaultBehaviour,haxe_ui_util_Variant.fromBool(false));
		this.behaviours.register("toggle",haxe_ui_components__$Button_ToggleBehaviour);
		this.behaviours.register("selected",haxe_ui_components__$Button_SelectedBehaviour);
		this.behaviours.register("text",haxe_ui_components__$Button_TextBehaviour);
		this.behaviours.register("icon",haxe_ui_components__$Button_IconBehaviour);
	}
	,get_repeater: function() {
		return haxe_ui_util_Variant.toBool(this.behaviours.get("repeater"));
	}
	,set_repeater: function(value) {
		this.behaviours.set("repeater",haxe_ui_util_Variant.fromBool(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertyChange",null,"repeater"));
		return value;
	}
	,get_repeatInterval: function() {
		return haxe_ui_util_Variant.toInt(this.behaviours.get("repeatInterval"));
	}
	,set_repeatInterval: function(value) {
		this.behaviours.set("repeatInterval",haxe_ui_util_Variant.fromInt(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertyChange",null,"repeatInterval"));
		return value;
	}
	,get_easeInRepeater: function() {
		return haxe_ui_util_Variant.toBool(this.behaviours.get("easeInRepeater"));
	}
	,set_easeInRepeater: function(value) {
		this.behaviours.set("easeInRepeater",haxe_ui_util_Variant.fromBool(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertyChange",null,"easeInRepeater"));
		return value;
	}
	,get_remainPressed: function() {
		return haxe_ui_util_Variant.toBool(this.behaviours.get("remainPressed"));
	}
	,set_remainPressed: function(value) {
		this.behaviours.set("remainPressed",haxe_ui_util_Variant.fromBool(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertyChange",null,"remainPressed"));
		return value;
	}
	,get_toggle: function() {
		return haxe_ui_util_Variant.toBool(this.behaviours.get("toggle"));
	}
	,set_toggle: function(value) {
		this.behaviours.set("toggle",haxe_ui_util_Variant.fromBool(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertyChange",null,"toggle"));
		return value;
	}
	,get_selected: function() {
		return haxe_ui_util_Variant.toBool(this.behaviours.get("selected"));
	}
	,set_selected: function(value) {
		this.behaviours.set("selected",haxe_ui_util_Variant.fromBool(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertyChange",null,"selected"));
		return value;
	}
	,get_icon: function() {
		return this.behaviours.get("icon");
	}
	,set_icon: function(value) {
		this.behaviours.set("icon",value);
		this.dispatch(new haxe_ui_events_UIEvent("propertyChange",null,"icon"));
		return value;
	}
	,get_value: function() {
		return this.get_text();
	}
	,set_value: function(value) {
		this.set_text(value);
		return value;
	}
	,get_iconPosition: function() {
		if(this.get_customStyle().iconPosition != null) {
			return this.get_customStyle().iconPosition;
		}
		if(this.get_style() == null || this.get_style().iconPosition == null) {
			return null;
		}
		return this.get_style().iconPosition;
	}
	,set_iconPosition: function(value) {
		if(this.get_customStyle().iconPosition == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().iconPosition = null;
		} else {
			this.get_customStyle().iconPosition = value;
		}
		this.invalidateComponent("style",false);
		if(!(this._layout == null || this._layoutLocked == true)) {
			this.invalidateComponent("layout",false);
		}
		return value;
	}
	,get_fontSize: function() {
		if(this.get_customStyle().fontSize != null) {
			return this.get_customStyle().fontSize;
		}
		if(this.get_style() == null || this.get_style().fontSize == null) {
			return null;
		}
		return this.get_style().fontSize;
	}
	,set_fontSize: function(value) {
		if(this.get_customStyle().fontSize == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().fontSize = null;
		} else {
			this.get_customStyle().fontSize = value;
		}
		this.invalidateComponent("style",false);
		if(!(this._layout == null || this._layoutLocked == true)) {
			this.invalidateComponent("layout",false);
		}
		return value;
	}
	,get_textAlign: function() {
		if(this.get_customStyle().textAlign != null) {
			return this.get_customStyle().textAlign;
		}
		if(this.get_style() == null || this.get_style().textAlign == null) {
			return null;
		}
		return this.get_style().textAlign;
	}
	,set_textAlign: function(value) {
		if(this.get_customStyle().textAlign == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().textAlign = null;
		} else {
			this.get_customStyle().textAlign = value;
		}
		this.invalidateComponent("style",false);
		if(!(this._layout == null || this._layoutLocked == true)) {
			this.invalidateComponent("layout",false);
		}
		return value;
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_InteractiveComponent.prototype.cloneComponent.call(this);
		c.set_repeater(this.get_repeater());
		c.set_repeatInterval(this.get_repeatInterval());
		c.set_easeInRepeater(this.get_easeInRepeater());
		c.set_remainPressed(this.get_remainPressed());
		c.set_toggle(this.get_toggle());
		c.set_selected(this.get_selected());
		if(this.get_icon() != null) {
			c.set_icon(this.get_icon());
		}
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		return c;
	}
	,self: function() {
		return new haxe_ui_components_Button();
	}
	,registerComposite: function() {
		haxe_ui_core_InteractiveComponent.prototype.registerComposite.call(this);
		this._internalEventsClass = haxe_ui_components_ButtonEvents;
		this._compositeBuilderClass = haxe_ui_components_ButtonBuilder;
		this._defaultLayoutClass = haxe_ui_components_ButtonLayout;
	}
	,__class__: haxe_ui_components_Button
	,__properties__: $extend(haxe_ui_core_InteractiveComponent.prototype.__properties__,{set_textAlign:"set_textAlign",get_textAlign:"get_textAlign",set_fontSize:"set_fontSize",get_fontSize:"get_fontSize",set_iconPosition:"set_iconPosition",get_iconPosition:"get_iconPosition",set_icon:"set_icon",get_icon:"get_icon",set_selected:"set_selected",get_selected:"get_selected",set_toggle:"set_toggle",get_toggle:"get_toggle",set_remainPressed:"set_remainPressed",get_remainPressed:"get_remainPressed",set_easeInRepeater:"set_easeInRepeater",get_easeInRepeater:"get_easeInRepeater",set_repeatInterval:"set_repeatInterval",get_repeatInterval:"get_repeatInterval",set_repeater:"set_repeater",get_repeater:"get_repeater"})
});
var haxe_ui_layouts_ILayout = function() { };
$hxClasses["haxe.ui.layouts.ILayout"] = haxe_ui_layouts_ILayout;
haxe_ui_layouts_ILayout.__name__ = "haxe.ui.layouts.ILayout";
haxe_ui_layouts_ILayout.__isInterface__ = true;
var haxe_ui_layouts_Layout = function() {
};
$hxClasses["haxe.ui.layouts.Layout"] = haxe_ui_layouts_Layout;
haxe_ui_layouts_Layout.__name__ = "haxe.ui.layouts.Layout";
haxe_ui_layouts_Layout.__interfaces__ = [haxe_ui_layouts_ILayout];
haxe_ui_layouts_Layout.prototype = {
	_component: null
	,get_component: function() {
		return this._component;
	}
	,set_component: function(value) {
		this._component = value;
		if(this._component != null) {
			var _this = this._component;
			if(!(_this._layout == null || _this._layoutLocked == true)) {
				_this.invalidateComponent("layout",false);
			}
		}
		return value;
	}
	,findComponent: function(criteria,type,recursive,searchType) {
		if(searchType == null) {
			searchType = "id";
		}
		if(this._component == null) {
			return null;
		}
		return this._component.findComponent(criteria,type,recursive,searchType);
	}
	,findComponents: function(styleName,type,maxDepth) {
		if(maxDepth == null) {
			maxDepth = 5;
		}
		if(this._component == null) {
			return null;
		}
		return this._component.findComponents(styleName,type,maxDepth);
	}
	,refresh: function() {
		if(this._component != null && this._component.get_isReady() == true) {
			this.resizeChildren();
			this._component.handlePreReposition();
			this.repositionChildren();
			this._component.handlePostReposition();
		}
	}
	,autoSize: function() {
		if(this.get_component().get_isReady() == false) {
			return false;
		}
		var calculatedWidth = null;
		var calculatedHeight = null;
		if(this.get_component().get_autoWidth() == true || this.get_component().get_autoHeight() == true) {
			var size = this.calcAutoSize();
			if(this.get_component().get_autoWidth() == true) {
				calculatedWidth = size.width;
			}
			if(this.get_component().get_autoHeight() == true) {
				calculatedHeight = size.height;
			}
			this.get_component().resizeComponent(calculatedWidth,calculatedHeight);
		}
		if(calculatedWidth == null) {
			return calculatedHeight != null;
		} else {
			return true;
		}
	}
	,marginTop: function(child) {
		if(child == null || child.get_style() == null || child.get_style().marginTop == null) {
			return 0;
		}
		return child.get_style().marginTop;
	}
	,marginLeft: function(child) {
		if(child == null || child.get_style() == null || child.get_style().marginLeft == null) {
			return 0;
		}
		return child.get_style().marginLeft;
	}
	,marginBottom: function(child) {
		if(child == null || child.get_style() == null || child.get_style().marginBottom == null) {
			return 0;
		}
		return child.get_style().marginBottom;
	}
	,marginRight: function(child) {
		if(child == null || child.get_style() == null || child.get_style().marginRight == null) {
			return 0;
		}
		return child.get_style().marginRight;
	}
	,hidden: function(c) {
		if(c == null) {
			c = this.get_component();
		}
		return c.get_hidden();
	}
	,horizontalAlign: function(child) {
		if(child == null || child.get_style() == null || child.get_style().horizontalAlign == null) {
			return "left";
		}
		return child.get_style().horizontalAlign;
	}
	,verticalAlign: function(child) {
		if(child == null || child.get_style() == null || child.get_style().verticalAlign == null) {
			return "top";
		}
		return child.get_style().verticalAlign;
	}
	,fixedMinWidth: function(child) {
		var fixedMinWidth = false;
		if(child != null && child.get_style() != null && child.get_style().minWidth != null) {
			fixedMinWidth = child.get_componentWidth() <= child.get_style().minWidth;
		}
		return fixedMinWidth;
	}
	,fixedMinHeight: function(child) {
		var fixedMinHeight = false;
		if(child != null && child.get_style() != null && child.get_style().minHeight != null) {
			fixedMinHeight = child.get_componentHeight() <= child.get_style().minHeight;
		}
		return fixedMinHeight;
	}
	,borderSize: null
	,get_borderSize: function() {
		if(this._component.get_style() == null) {
			return 0;
		}
		var n = this._component.get_style().get_fullBorderSize();
		if(n > 0) {
			--n;
		}
		return n;
	}
	,paddingLeft: null
	,get_paddingLeft: function() {
		if(this._component == null || this._component.get_style() == null || this._component.get_style().paddingLeft == null) {
			return 0;
		}
		return this._component.get_style().paddingLeft;
	}
	,paddingTop: null
	,get_paddingTop: function() {
		if(this._component == null || this._component.get_style() == null || this._component.get_style().paddingTop == null) {
			return 0;
		}
		return this._component.get_style().paddingTop;
	}
	,paddingBottom: null
	,get_paddingBottom: function() {
		if(this._component == null || this._component.get_style() == null || this._component.get_style().paddingBottom == null) {
			return 0;
		}
		return this._component.get_style().paddingBottom;
	}
	,paddingRight: null
	,get_paddingRight: function() {
		if(this._component == null || this._component.get_style() == null || this._component.get_style().paddingRight == null) {
			return 0;
		}
		return this._component.get_style().paddingRight;
	}
	,horizontalSpacing: null
	,get_horizontalSpacing: function() {
		if(this._component == null || this._component.get_style() == null || this._component.get_style().horizontalSpacing == null) {
			return 0;
		}
		return this._component.get_style().horizontalSpacing;
	}
	,verticalSpacing: null
	,get_verticalSpacing: function() {
		if(this._component == null || this._component.get_style() == null || this._component.get_style().verticalSpacing == null) {
			return 0;
		}
		return this._component.get_style().verticalSpacing;
	}
	,innerWidth: null
	,innerHeight: null
	,get_innerWidth: function() {
		if(this.get_component() == null) {
			return 0;
		}
		return this.get_component().get_componentWidth() - (this.get_paddingLeft() + this.get_paddingRight());
	}
	,get_innerHeight: function() {
		if(this.get_component() == null) {
			return 0;
		}
		var padding = 0;
		if(this.get_component().get_style() != null && this.get_component().get_style().paddingTop != null) {
			padding = this.get_component().get_style().paddingTop + padding;
		}
		if(this.get_component().get_style() != null && this.get_component().get_style().paddingBottom != null) {
			padding = this.get_component().get_style().paddingBottom + padding;
		}
		var icy = this.get_component().get_componentHeight() - padding;
		return icy;
	}
	,resizeChildren: function() {
	}
	,repositionChildren: function() {
	}
	,usableSize: null
	,get_usableSize: function() {
		var ucx = 0;
		if(this._component.get_componentWidth() != null) {
			ucx = this._component.get_componentWidth();
			ucx -= this.get_paddingLeft() + this.get_paddingRight();
		}
		var ucy = 0;
		if(this._component.get_componentHeight() != null) {
			ucy = this._component.get_componentHeight();
			ucy -= this.get_paddingTop() + this.get_paddingBottom();
		}
		return new haxe_ui_geom_Size(ucx,ucy);
	}
	,usableWidth: null
	,get_usableWidth: function() {
		return this.get_usableSize().width;
	}
	,usableHeight: null
	,get_usableHeight: function() {
		return this.get_usableSize().height;
	}
	,calcAutoWidth: function() {
		return this.calcAutoSize().width;
	}
	,calcAutoHeight: function() {
		return this.calcAutoSize().height;
	}
	,calcAutoSize: function(exclusions) {
		var x1 = 16777215;
		var x2 = 0;
		var y1 = 16777215;
		var y2 = 0;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false || this.excluded(exclusions,child) == true) {
				continue;
			}
			if(child.get_percentWidth() == null) {
				if(child.get_left() < x1) {
					x1 = child.get_left();
				}
				if(child.get_componentWidth() != null && child.get_left() + child.get_componentWidth() > x2) {
					x2 = child.get_left() + child.get_componentWidth();
				}
			}
			if(child.get_percentHeight() == null) {
				if(child.get_top() < y1) {
					y1 = child.get_top();
				}
				if(child.get_componentHeight() != null && child.get_top() + child.get_componentHeight() > y2) {
					y2 = child.get_top() + child.get_componentHeight();
				}
			}
		}
		if(x1 == 16777215) {
			x1 = 0;
		}
		if(y1 == 16777215) {
			y1 = 0;
		}
		var w = x2 - x1 + (this.get_paddingLeft() + this.get_paddingRight());
		var h = y2 - y1 + (this.get_paddingTop() + this.get_paddingBottom());
		if(((this) instanceof haxe_ui_layouts_AbsoluteLayout)) {
			w += x1;
			h += y1;
		}
		return new haxe_ui_geom_Size(w,h);
	}
	,excluded: function(exclusions,child) {
		if(exclusions == null) {
			return false;
		}
		return exclusions.indexOf(child) != -1;
	}
	,__class__: haxe_ui_layouts_Layout
	,__properties__: {get_usableHeight:"get_usableHeight",get_usableWidth:"get_usableWidth",get_usableSize:"get_usableSize",get_innerHeight:"get_innerHeight",get_innerWidth:"get_innerWidth",get_verticalSpacing:"get_verticalSpacing",get_horizontalSpacing:"get_horizontalSpacing",get_paddingRight:"get_paddingRight",get_paddingBottom:"get_paddingBottom",get_paddingTop:"get_paddingTop",get_paddingLeft:"get_paddingLeft",get_borderSize:"get_borderSize",set_component:"set_component",get_component:"get_component"}
};
var haxe_ui_layouts_DefaultLayout = function() {
	this._calcFullHeights = false;
	this._calcFullWidths = false;
	haxe_ui_layouts_Layout.call(this);
};
$hxClasses["haxe.ui.layouts.DefaultLayout"] = haxe_ui_layouts_DefaultLayout;
haxe_ui_layouts_DefaultLayout.__name__ = "haxe.ui.layouts.DefaultLayout";
haxe_ui_layouts_DefaultLayout.__super__ = haxe_ui_layouts_Layout;
haxe_ui_layouts_DefaultLayout.prototype = $extend(haxe_ui_layouts_Layout.prototype,{
	_calcFullWidths: null
	,_calcFullHeights: null
	,resizeChildren: function() {
		var usableSize = this.get_usableSize();
		var percentWidth = 100;
		var percentHeight = 100;
		var fullWidthValue = 100;
		var fullHeightValue = 100;
		if(this._calcFullWidths == true || this._calcFullHeights == true) {
			var n1 = 0;
			var n2 = 0;
			var _g = 0;
			var _this = this.get_component();
			var _g1 = _this._children == null ? [] : _this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				if(child.get_includeInLayout() == false) {
					continue;
				}
				if(this._calcFullWidths == true && child.get_percentWidth() != null && child.get_percentWidth() == 100) {
					++n1;
				}
				if(this._calcFullHeights == true && child.get_percentHeight() != null && child.get_percentHeight() == 100) {
					++n2;
				}
			}
			if(n1 > 0) {
				fullWidthValue = 100 / n1;
			}
			if(n2 > 0) {
				fullHeightValue = 100 / n2;
			}
		}
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			var cx = null;
			var cy = null;
			if(child.get_percentWidth() != null) {
				var childPercentWidth = child.get_percentWidth();
				if(childPercentWidth == 100) {
					childPercentWidth = fullWidthValue;
				}
				cx = usableSize.width * childPercentWidth / percentWidth - this.marginLeft(child) - this.marginRight(child);
			}
			if(child.get_percentHeight() != null) {
				var childPercentHeight = child.get_percentHeight();
				if(childPercentHeight == 100) {
					childPercentHeight = fullHeightValue;
				}
				cy = usableSize.height * childPercentHeight / percentHeight - this.marginTop(child) - this.marginBottom(child);
			}
			if(this.fixedMinWidth(child) && child.get_percentWidth() != null) {
				percentWidth -= child.get_percentWidth();
			}
			if(this.fixedMinHeight(child) && child.get_percentHeight() != null) {
				percentHeight -= child.get_percentHeight();
			}
			child.resizeComponent(cx,cy);
		}
	}
	,repositionChildren: function() {
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			var xpos = 0;
			var ypos = 0;
			switch(this.horizontalAlign(child)) {
			case "center":
				xpos = (this.get_component().get_componentWidth() - child.get_componentWidth()) / 2 + this.marginLeft(child) - this.marginRight(child);
				break;
			case "right":
				xpos = this.get_component().get_componentWidth() - (child.get_componentWidth() + this.get_paddingRight() + this.marginRight(child));
				break;
			default:
				xpos = this.get_paddingLeft() + this.marginLeft(child);
			}
			switch(this.verticalAlign(child)) {
			case "bottom":
				ypos = this.get_component().get_componentHeight() - (child.get_componentHeight() + this.get_paddingBottom() + this.marginBottom(child));
				break;
			case "center":
				ypos = (this.get_component().get_componentHeight() - child.get_componentHeight()) / 2 + this.marginTop(child) - this.marginBottom(child);
				break;
			default:
				ypos = this.get_paddingTop() + this.marginTop(child);
			}
			child.moveComponent(xpos,ypos);
		}
	}
	,__class__: haxe_ui_layouts_DefaultLayout
});
var haxe_ui_components_ButtonLayout = function() {
	haxe_ui_layouts_DefaultLayout.call(this);
};
$hxClasses["haxe.ui.components.ButtonLayout"] = haxe_ui_components_ButtonLayout;
haxe_ui_components_ButtonLayout.__name__ = "haxe.ui.components.ButtonLayout";
haxe_ui_components_ButtonLayout.__super__ = haxe_ui_layouts_DefaultLayout;
haxe_ui_components_ButtonLayout.prototype = $extend(haxe_ui_layouts_DefaultLayout.prototype,{
	iconPosition: null
	,get_iconPosition: function() {
		if(this.get_component().get_style() == null || this.get_component().get_style().iconPosition == null) {
			return "left";
		}
		return this.get_component().get_style().iconPosition;
	}
	,resizeChildren: function() {
		haxe_ui_layouts_DefaultLayout.prototype.resizeChildren.call(this);
		var label = this.get_component().findComponent(null,haxe_ui_components_Label,false);
		var icon = this.get_component().findComponent("button-icon",null,false);
		if(this._component.get_autoWidth() == false) {
			var ucx = this.get_usableSize();
			if(label != null) {
				var cx = ucx.width;
				if(icon != null && (this.get_iconPosition() == "far-right" || this.get_iconPosition() == "far-left" || this.get_iconPosition() == "left" || this.get_iconPosition() == "right")) {
					cx -= icon.get_width() + this.get_verticalSpacing();
				}
				label.set_width(cx);
			}
		}
	}
	,repositionChildren: function() {
		haxe_ui_layouts_DefaultLayout.prototype.repositionChildren.call(this);
		var label = this.get_component().findComponent(null,haxe_ui_components_Label,false);
		if(label != null && label.get_hidden() == true) {
			label = null;
		}
		var icon = this.get_component().findComponent("button-icon",null,false);
		if(icon != null && icon.get_hidden() == true) {
			icon = null;
		}
		switch(this.get_iconPosition()) {
		case "far-left":
			if(label != null && icon != null) {
				var x = this.get_paddingLeft();
				if(this.get_iconPosition() == "far-left") {
					icon.set_left(x + this.marginLeft(icon) - this.marginRight(icon));
					x += this.get_horizontalSpacing() + icon.get_componentWidth();
					label.set_left(x + this.marginLeft(label) - this.marginRight(label));
				}
				label.set_top((this.get_component().get_componentHeight() / 2 - label.get_componentHeight() / 2 | 0) + this.marginTop(label) - this.marginBottom(label));
				icon.set_top((this.get_component().get_componentHeight() / 2 - icon.get_componentHeight() / 2 | 0) + this.marginTop(icon) - this.marginBottom(icon));
			} else if(label != null) {
				label.set_left(this.get_paddingLeft());
				label.set_top((this.get_component().get_componentHeight() / 2 - label.get_componentHeight() / 2 | 0) + this.marginTop(label) - this.marginBottom(label));
			} else if(icon != null) {
				icon.set_left(this.get_component().get_componentWidth() / 2 - icon.get_componentWidth() / 2 | 0);
				icon.set_top((this.get_component().get_componentHeight() / 2 - icon.get_componentHeight() / 2 | 0) + this.marginTop(icon) - this.marginBottom(icon));
			}
			break;
		case "far-right":
			if(label != null && icon != null) {
				var cx = label.get_componentWidth() + icon.get_componentWidth() + this.get_horizontalSpacing();
				var x = this.get_component().get_componentWidth() / 2 - cx / 2 | 0;
				if(this.get_iconPosition() == "far-right") {
					if(cx + this.get_paddingLeft() + this.get_paddingRight() < this.get_component().get_componentWidth()) {
						label.set_left(this.get_paddingLeft());
						x += this.get_horizontalSpacing() + label.get_componentWidth();
						icon.set_left(this.get_component().get_componentWidth() - icon.get_componentWidth() - this.get_paddingRight() + this.marginLeft(icon) - this.marginRight(icon));
					} else {
						label.set_left(this.get_paddingLeft());
						x += this.get_horizontalSpacing() + label.get_componentWidth();
						icon.set_left(x + this.marginLeft(icon) - this.marginRight(icon));
					}
				}
				label.set_top((this.get_component().get_componentHeight() / 2 - label.get_componentHeight() / 2 | 0) + this.marginTop(label) - this.marginBottom(label));
				icon.set_top((this.get_component().get_componentHeight() / 2 - icon.get_componentHeight() / 2 | 0) + this.marginTop(icon) - this.marginBottom(icon));
			} else if(label != null) {
				label.set_left(this.get_paddingLeft());
				label.set_top((this.get_component().get_componentHeight() / 2 - label.get_componentHeight() / 2 | 0) + this.marginTop(label) - this.marginBottom(label));
			} else if(icon != null) {
				icon.set_left(this.get_component().get_componentWidth() / 2 - icon.get_componentWidth() / 2 | 0);
				icon.set_top((this.get_component().get_componentHeight() / 2 - icon.get_componentHeight() / 2 | 0) + this.marginTop(icon) - this.marginBottom(icon));
			}
			break;
		case "left":case "right":
			if(label != null && icon != null) {
				var cx = label.get_componentWidth() + icon.get_componentWidth() + this.get_horizontalSpacing();
				var x = this.get_component().get_componentWidth() / 2 - cx / 2 | 0;
				if((js_Boot.__cast(this.get_component() , haxe_ui_components_Button)).get_textAlign() == "left") {
					x = this.get_paddingLeft();
				}
				if(this.get_iconPosition() == "right") {
					label.set_left(x + this.marginLeft(label) - this.marginRight(label));
					x += this.get_horizontalSpacing() + label.get_componentWidth();
					icon.set_left(x + this.marginLeft(icon) - this.marginRight(icon));
				} else {
					icon.set_left(x + this.marginLeft(icon) - this.marginRight(icon));
					x += this.get_horizontalSpacing() + icon.get_componentWidth();
					label.set_left(x + this.marginLeft(label) - this.marginRight(label));
				}
				label.set_top((this.get_component().get_componentHeight() / 2 - label.get_componentHeight() / 2 | 0) + this.marginTop(label) - this.marginBottom(label));
				icon.set_top((this.get_component().get_componentHeight() / 2 - icon.get_componentHeight() / 2 | 0) + this.marginTop(icon) - this.marginBottom(icon));
			} else if(label != null) {
				label.set_left(this.getTextAlignPos(label,this.get_component().get_componentWidth()));
				label.set_top((this.get_component().get_componentHeight() / 2 - label.get_componentHeight() / 2 | 0) + this.marginTop(label) - this.marginBottom(label));
			} else if(icon != null) {
				icon.set_left(this.get_component().get_componentWidth() / 2 - icon.get_componentWidth() / 2 | 0);
				icon.set_top((this.get_component().get_componentHeight() / 2 - icon.get_componentHeight() / 2 | 0) + this.marginTop(icon) - this.marginBottom(icon));
			}
			break;
		case "bottom":case "top":
			if(label != null && icon != null) {
				var cy = label.get_componentHeight() + icon.get_componentHeight() + this.get_verticalSpacing();
				var y = this.get_component().get_componentHeight() / 2 - cy / 2 | 0;
				if(this.get_iconPosition() == "bottom") {
					label.set_top(y + this.marginTop(label) - this.marginBottom(label));
					y += this.get_verticalSpacing() + label.get_componentHeight();
					icon.set_top(y + this.marginTop(icon) - this.marginBottom(icon));
				} else {
					icon.set_top(y + this.marginTop(icon) - this.marginBottom(icon));
					y += this.get_verticalSpacing() + icon.get_componentHeight();
					label.set_top(y + this.marginTop(label) - this.marginBottom(label));
				}
				label.set_left(this.getTextAlignPos(label,this.get_component().get_componentWidth()));
				icon.set_left((this.get_component().get_componentWidth() / 2 - icon.get_componentWidth() / 2 | 0) + this.marginLeft(icon) - this.marginRight(icon));
			} else if(label != null) {
				label.set_left((this.get_component().get_componentWidth() / 2 - label.get_componentWidth() / 2 | 0) + this.marginLeft(label) - this.marginRight(label));
				label.set_top((this.get_component().get_componentHeight() / 2 - label.get_componentHeight() / 2 | 0) + this.marginTop(label) - this.marginBottom(label));
			} else if(icon != null) {
				icon.set_left((this.get_component().get_componentWidth() / 2 - icon.get_componentWidth() / 2 | 0) + this.marginLeft(icon) - this.marginRight(icon));
				icon.set_top((this.get_component().get_componentHeight() / 2 - icon.get_componentHeight() / 2 | 0) + this.marginTop(icon) - this.marginBottom(icon));
			}
			break;
		}
	}
	,getTextAlignPos: function(label,usableWidth) {
		switch((js_Boot.__cast(this.get_component() , haxe_ui_components_Button)).get_textAlign()) {
		case "left":
			return this.marginLeft(label) + this.get_paddingLeft();
		case "right":
			return usableWidth - label.get_componentWidth() - this.marginRight(label) - this.get_paddingRight();
		default:
			return (usableWidth / 2 - label.get_componentWidth() / 2 | 0) + this.marginLeft(label) - this.marginRight(label);
		}
	}
	,__class__: haxe_ui_components_ButtonLayout
	,__properties__: $extend(haxe_ui_layouts_DefaultLayout.prototype.__properties__,{get_iconPosition:"get_iconPosition"})
});
var haxe_ui_components__$Button_TextBehaviour = function(component) {
	haxe_ui_behaviours_DataBehaviour.call(this,component);
};
$hxClasses["haxe.ui.components._Button.TextBehaviour"] = haxe_ui_components__$Button_TextBehaviour;
haxe_ui_components__$Button_TextBehaviour.__name__ = "haxe.ui.components._Button.TextBehaviour";
haxe_ui_components__$Button_TextBehaviour.__super__ = haxe_ui_behaviours_DataBehaviour;
haxe_ui_components__$Button_TextBehaviour.prototype = $extend(haxe_ui_behaviours_DataBehaviour.prototype,{
	validateData: function() {
		var label = this._component.findComponent(null,haxe_ui_components_Label,false);
		if(label == null) {
			label = new haxe_ui_components_Label();
			label.set_id("button-label");
			label.set_scriptAccess(false);
			this._component.addComponent(label);
			var _this = this._component;
			var force = true;
			if(force == null) {
				force = false;
			}
			_this.invalidateComponent("style",false);
			if(force == true) {
				_this._style = null;
			}
		}
		label.set_text(haxe_ui_util_Variant.toString(this._value));
	}
	,__class__: haxe_ui_components__$Button_TextBehaviour
});
var haxe_ui_components__$Button_IconBehaviour = function(component) {
	haxe_ui_behaviours_DataBehaviour.call(this,component);
};
$hxClasses["haxe.ui.components._Button.IconBehaviour"] = haxe_ui_components__$Button_IconBehaviour;
haxe_ui_components__$Button_IconBehaviour.__name__ = "haxe.ui.components._Button.IconBehaviour";
haxe_ui_components__$Button_IconBehaviour.__super__ = haxe_ui_behaviours_DataBehaviour;
haxe_ui_components__$Button_IconBehaviour.prototype = $extend(haxe_ui_behaviours_DataBehaviour.prototype,{
	validateData: function() {
		var icon = this._component.findComponent("button-icon",null,false);
		if((this._value == null || haxe_ui_util_Variant.get_isNull(this._value)) && icon != null) {
			this._component.get_customStyle().icon = null;
			this._component.removeComponent(icon);
			return;
		}
		if(icon == null) {
			icon = new haxe_ui_components_Image();
			icon.addClass("icon");
			icon.set_id("button-icon");
			icon.set_scriptAccess(false);
			this._component.addComponentAt(icon,0);
			var _this = this._component;
			var force = true;
			if(force == null) {
				force = false;
			}
			_this.invalidateComponent("style",false);
			if(force == true) {
				_this._style = null;
			}
		}
		this._component.get_customStyle().icon = haxe_ui_util_Variant.toString(this._value);
		icon.set_resource(this._value);
	}
	,__class__: haxe_ui_components__$Button_IconBehaviour
});
var haxe_ui_components__$Button_ToggleBehaviour = function(component) {
	haxe_ui_behaviours_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.components._Button.ToggleBehaviour"] = haxe_ui_components__$Button_ToggleBehaviour;
haxe_ui_components__$Button_ToggleBehaviour.__name__ = "haxe.ui.components._Button.ToggleBehaviour";
haxe_ui_components__$Button_ToggleBehaviour.__super__ = haxe_ui_behaviours_Behaviour;
haxe_ui_components__$Button_ToggleBehaviour.prototype = $extend(haxe_ui_behaviours_Behaviour.prototype,{
	_value: null
	,get: function() {
		return this._value;
	}
	,set: function(value) {
		if(haxe_ui_util_Variant.eq(this._value,value)) {
			return;
		}
		this._value = value;
		var button = js_Boot.__cast(this._component , haxe_ui_components_Button);
		if(haxe_ui_util_Variant.eq(value,haxe_ui_util_Variant.fromBool(false))) {
			button.set_selected(false);
		}
		button.registerInternalEvents(button._internalEventsClass,true);
	}
	,__class__: haxe_ui_components__$Button_ToggleBehaviour
});
var haxe_ui_components__$Button_SelectedBehaviour = function(component) {
	haxe_ui_behaviours_DataBehaviour.call(this,component);
};
$hxClasses["haxe.ui.components._Button.SelectedBehaviour"] = haxe_ui_components__$Button_SelectedBehaviour;
haxe_ui_components__$Button_SelectedBehaviour.__name__ = "haxe.ui.components._Button.SelectedBehaviour";
haxe_ui_components__$Button_SelectedBehaviour.__super__ = haxe_ui_behaviours_DataBehaviour;
haxe_ui_components__$Button_SelectedBehaviour.prototype = $extend(haxe_ui_behaviours_DataBehaviour.prototype,{
	validateData: function() {
		var button = js_Boot.__cast(this._component , haxe_ui_components_Button);
		if(button.get_toggle() == false) {
			return;
		}
		if(haxe_ui_util_Variant.eq(this._value,haxe_ui_util_Variant.fromBool(false))) {
			button.removeClass(":down",true,true);
		} else {
			button.addClass(":down",true,true);
		}
		var events = js_Boot.__cast(button._internalEvents , haxe_ui_components_ButtonEvents);
		if(events.lastMouseEvent != null && button.hitTest(events.lastMouseEvent.screenX,events.lastMouseEvent.screenY)) {
			button.addClass(":hover",true,true);
			events.lastMouseEvent = null;
		} else {
			button.removeClass(":hover",true,true);
		}
		events.dispatchChanged();
	}
	,__class__: haxe_ui_components__$Button_SelectedBehaviour
});
var haxe_ui_events_Events = function(target) {
	this._target = target;
};
$hxClasses["haxe.ui.events.Events"] = haxe_ui_events_Events;
haxe_ui_events_Events.__name__ = "haxe.ui.events.Events";
haxe_ui_events_Events.prototype = {
	_target: null
	,register: function() {
	}
	,unregister: function() {
	}
	,registerEvent: function(type,listener,priority) {
		if(priority == null) {
			priority = 0;
		}
		if(this.hasEvent(type,listener) == false) {
			this._target.registerEvent(type,listener,priority);
		}
	}
	,hasEvent: function(type,listener) {
		return this._target.hasEvent(type,listener);
	}
	,unregisterEvent: function(type,listener) {
		this._target.unregisterEvent(type,listener);
	}
	,dispatch: function(event) {
		this._target.dispatch(event);
	}
	,__class__: haxe_ui_events_Events
};
var haxe_ui_components_ButtonEvents = function(button) {
	this._lastScreenEvent = null;
	this.lastMouseEvent = null;
	this._repeatInterval = 0;
	this._repeater = false;
	this._down = false;
	haxe_ui_events_Events.call(this,button);
	this._button = button;
};
$hxClasses["haxe.ui.components.ButtonEvents"] = haxe_ui_components_ButtonEvents;
haxe_ui_components_ButtonEvents.__name__ = "haxe.ui.components.ButtonEvents";
haxe_ui_components_ButtonEvents.__super__ = haxe_ui_events_Events;
haxe_ui_components_ButtonEvents.prototype = $extend(haxe_ui_events_Events.prototype,{
	_button: null
	,_down: null
	,_repeatTimer: null
	,_repeater: null
	,_repeatInterval: null
	,lastMouseEvent: null
	,register: function() {
		if(this.hasEvent("mouseover",$bind(this,this.onMouseOver)) == false) {
			this.registerEvent("mouseover",$bind(this,this.onMouseOver));
		}
		if(this.hasEvent("mouseout",$bind(this,this.onMouseOut)) == false) {
			this.registerEvent("mouseout",$bind(this,this.onMouseOut));
		}
		if(this.hasEvent("mousedown",$bind(this,this.onMouseDown)) == false) {
			this.registerEvent("mousedown",$bind(this,this.onMouseDown));
		}
		if(this.hasEvent("move",$bind(this,this.onMove)) == false) {
			this.registerEvent("move",$bind(this,this.onMove));
		}
		if(this._button.get_toggle() == true) {
			this.registerEvent("click",$bind(this,this.onMouseClick));
		}
	}
	,unregister: function() {
		this.unregisterEvent("mouseover",$bind(this,this.onMouseOver));
		this.unregisterEvent("mouseout",$bind(this,this.onMouseOut));
		this.unregisterEvent("mousedown",$bind(this,this.onMouseDown));
		this.unregisterEvent("click",$bind(this,this.onMouseClick));
		this.unregisterEvent("move",$bind(this,this.onMove));
	}
	,onMouseOver: function(event) {
		if(this._button.get_toggle() == true && this._button.classes.indexOf(":down") != -1) {
			return;
		}
		if(event.buttonDown == false || this._down == false) {
			this._button.addClass(":hover",true,true);
		} else {
			this._button.addClass(":down",true,true);
		}
	}
	,onMouseOut: function(event) {
		if(this._button.get_toggle() == true && this._button.get_selected() == true) {
			return;
		}
		if(this._button.get_remainPressed() == false) {
			this._button.removeClass(":down",true,true);
		}
		this._button.removeClass(":hover",true,true);
	}
	,onMouseDown: function(event) {
		var _gthis = this;
		if(this._button.get_allowFocus() == true && haxe_ui_focus_FocusManager.get_instance().get_focusInfo() != null && haxe_ui_focus_FocusManager.get_instance().get_focusInfo().currentFocus != null) {
			haxe_ui_focus_FocusManager.get_instance().get_focusInfo().currentFocus.set_focus(false);
		}
		if(this._button.get_repeater() == true && this._repeatInterval == 0) {
			this._repeatInterval = this._button.get_easeInRepeater() ? this._button.get_repeatInterval() * 2 : this._button.get_repeatInterval();
		}
		this._down = true;
		this._button.addClass(":down",true,true);
		this._button.get_screen().registerEvent("mouseup",$bind(this,this.onMouseUp));
		if(this._repeater == true && this._repeatInterval == this._button.get_repeatInterval()) {
			this._repeatTimer = new haxe_ui_util_Timer(this._repeatInterval,$bind(this,this.onRepeatTimer));
		} else if(this._button.get_repeater() == true) {
			if(this._repeatTimer != null) {
				this._repeatTimer.stop();
				this._repeatTimer = null;
			}
			haxe_ui_util_Timer.delay(function() {
				if(_gthis._repeater == true && _gthis._repeatTimer == null) {
					if(_gthis._button.get_easeInRepeater() == true && _gthis._repeatInterval > _gthis._button.get_repeatInterval()) {
						var tmp = _gthis._repeatInterval - (_gthis._repeatInterval - _gthis._button.get_repeatInterval()) / 2 | 0;
						_gthis._repeatInterval = tmp;
						_gthis.onRepeatTimer();
					}
					_gthis.onMouseDown(event);
				}
			},this._repeatInterval);
		}
		this._repeater = this._button.get_repeater();
	}
	,_lastScreenEvent: null
	,onMouseUp: function(event) {
		this._down = this._repeater = false;
		this._repeatInterval = this._button.get_easeInRepeater() ? this._button.get_repeatInterval() * 2 : this._button.get_repeatInterval();
		this._button.get_screen().unregisterEvent("mouseup",$bind(this,this.onMouseUp));
		if(this._button.get_toggle() == true) {
			return;
		}
		this._lastScreenEvent = event;
		this._button.removeClass(":down",true,true);
		var over = this._button.hitTest(event.screenX,event.screenY);
		if(event.touchEvent == false && over == true) {
			this._button.addClass(":hover",true,true);
		} else if(over == false) {
			this._button.removeClass(":hover",true,true);
		}
		if(this._repeatTimer != null) {
			this._repeatTimer.stop();
			this._repeatTimer = null;
		}
	}
	,onMove: function(event) {
		if(this._lastScreenEvent == null) {
			return;
		}
		var over = this._button.hitTest(this._lastScreenEvent.screenX,this._lastScreenEvent.screenY);
		if(this._lastScreenEvent.touchEvent == false && over == true) {
			this._button.addClass(":hover",true,true);
		} else if(over == false) {
			this._button.removeClass(":hover",true,true);
		}
		this._lastScreenEvent = null;
	}
	,onRepeatTimer: function() {
		if(this._button.classes.indexOf(":hover") != -1 && this._down == true) {
			var event = new haxe_ui_events_MouseEvent("click");
			this._button.dispatch(event);
		}
	}
	,onMouseClick: function(event) {
		this._button.set_selected(!this._button.get_selected());
		if(this._button.get_selected() == false) {
			this._button.removeClass(":down",true,true);
		}
		if(this._button.hitTest(event.screenX,event.screenY)) {
			this._button.addClass(":hover",true,true);
		}
	}
	,dispatchChanged: function() {
		this._button.dispatch(new haxe_ui_events_UIEvent("change"));
	}
	,__class__: haxe_ui_components_ButtonEvents
});
var haxe_ui_core_CompositeBuilder = function(component) {
	this._component = component;
};
$hxClasses["haxe.ui.core.CompositeBuilder"] = haxe_ui_core_CompositeBuilder;
haxe_ui_core_CompositeBuilder.__name__ = "haxe.ui.core.CompositeBuilder";
haxe_ui_core_CompositeBuilder.prototype = {
	_component: null
	,create: function() {
	}
	,destroy: function() {
	}
	,onInitialize: function() {
	}
	,onReady: function() {
	}
	,show: function() {
		return false;
	}
	,hide: function() {
		return false;
	}
	,get_numComponents: function() {
		return null;
	}
	,get_cssName: function() {
		return null;
	}
	,addComponent: function(child) {
		return null;
	}
	,addComponentAt: function(child,index) {
		return null;
	}
	,removeComponent: function(child,dispose,invalidate) {
		if(invalidate == null) {
			invalidate = true;
		}
		if(dispose == null) {
			dispose = true;
		}
		return null;
	}
	,removeComponentAt: function(index,dispose,invalidate) {
		if(invalidate == null) {
			invalidate = true;
		}
		if(dispose == null) {
			dispose = true;
		}
		return null;
	}
	,getComponentIndex: function(child) {
		return -2147483648;
	}
	,setComponentIndex: function(child,index) {
		return null;
	}
	,getComponentAt: function(index) {
		return null;
	}
	,validateComponentLayout: function() {
		return false;
	}
	,applyStyle: function(style) {
	}
	,onComponentAdded: function(child) {
	}
	,onComponentRemoved: function(child) {
	}
	,findComponent: function(criteria,type,recursive,searchType) {
		var _g = 0;
		var _g1 = this.get_numComponents();
		while(_g < _g1) {
			var i = _g++;
			var c = this.getComponentAt(i);
			var match = c.findComponent(criteria,type,recursive,searchType);
			if(match != null) {
				return match;
			}
		}
		return null;
	}
	,findComponents: function(styleName,type,maxDepth) {
		if(maxDepth == null) {
			maxDepth = 5;
		}
		return null;
	}
	,isComponentClipped: null
	,get_isComponentClipped: function() {
		return this._component.get_componentClipRect() != null;
	}
	,__class__: haxe_ui_core_CompositeBuilder
	,__properties__: {get_isComponentClipped:"get_isComponentClipped",get_cssName:"get_cssName",get_numComponents:"get_numComponents"}
};
var haxe_ui_components_ButtonBuilder = function(button) {
	haxe_ui_core_CompositeBuilder.call(this,button);
	this._button = button;
};
$hxClasses["haxe.ui.components.ButtonBuilder"] = haxe_ui_components_ButtonBuilder;
haxe_ui_components_ButtonBuilder.__name__ = "haxe.ui.components.ButtonBuilder";
haxe_ui_components_ButtonBuilder.__super__ = haxe_ui_core_CompositeBuilder;
haxe_ui_components_ButtonBuilder.prototype = $extend(haxe_ui_core_CompositeBuilder.prototype,{
	_button: null
	,applyStyle: function(style) {
		var label = this._button.findComponent(null,haxe_ui_components_Label);
		if(label != null && (label.get_customStyle().color != style.color || label.get_customStyle().fontName != style.fontName || label.get_customStyle().fontSize != style.fontSize || label.get_customStyle().cursor != style.cursor || label.get_customStyle().textAlign != style.textAlign)) {
			label.get_customStyle().color = style.color;
			label.get_customStyle().fontName = style.fontName;
			label.get_customStyle().fontSize = style.fontSize;
			label.get_customStyle().cursor = style.cursor;
			label.get_customStyle().textAlign = style.textAlign;
			label.invalidateComponent("style",false);
		}
		var icon = this._button.findComponent("button-icon",null,false);
		if(icon != null && icon.get_customStyle().cursor != style.cursor) {
			icon.get_customStyle().cursor = style.cursor;
			icon.invalidateComponent("style",false);
		}
		if(style.icon != null) {
			this._button.set_icon(haxe_ui_util_Variant.fromString(style.icon));
		} else if(icon != null) {
			this._button.set_icon(null);
		}
	}
	,__class__: haxe_ui_components_ButtonBuilder
});
var haxe_ui_components_Image = function() {
	haxe_ui_core_Component.call(this);
};
$hxClasses["haxe.ui.components.Image"] = haxe_ui_components_Image;
haxe_ui_components_Image.__name__ = "haxe.ui.components.Image";
haxe_ui_components_Image.__super__ = haxe_ui_core_Component;
haxe_ui_components_Image.prototype = $extend(haxe_ui_core_Component.prototype,{
	registerComposite: function() {
		haxe_ui_core_Component.prototype.registerComposite.call(this);
		this._defaultLayoutClass = haxe_ui_components__$Image_ImageLayout;
		this._compositeBuilderClass = haxe_ui_components__$Image_Builder;
	}
	,registerBehaviours: function() {
		haxe_ui_core_Component.prototype.registerBehaviours.call(this);
		this.behaviours.register("resource",haxe_ui_components__$Image_ResourceBehaviour);
		this.behaviours.register("scaleMode",haxe_ui_behaviours_InvalidatingBehaviour,haxe_ui_util_Variant.fromString("fill"));
		this.behaviours.register("imageHorizontalAlign",haxe_ui_behaviours_InvalidatingBehaviour,haxe_ui_util_Variant.fromString("center"));
		this.behaviours.register("imageVerticalAlign",haxe_ui_behaviours_InvalidatingBehaviour,haxe_ui_util_Variant.fromString("center"));
		this.behaviours.register("originalWidth",haxe_ui_behaviours_DefaultBehaviour);
		this.behaviours.register("originalHeight",haxe_ui_behaviours_DefaultBehaviour);
	}
	,get_resource: function() {
		return this.behaviours.get("resource");
	}
	,set_resource: function(value) {
		this.behaviours.set("resource",value);
		this.dispatch(new haxe_ui_events_UIEvent("propertyChange",null,"resource"));
		return value;
	}
	,get_scaleMode: function() {
		return haxe_ui_util_Variant.toString(this.behaviours.get("scaleMode"));
	}
	,set_scaleMode: function(value) {
		this.behaviours.set("scaleMode",haxe_ui_util_Variant.fromString(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertyChange",null,"scaleMode"));
		return value;
	}
	,get_imageHorizontalAlign: function() {
		return haxe_ui_util_Variant.toString(this.behaviours.get("imageHorizontalAlign"));
	}
	,set_imageHorizontalAlign: function(value) {
		this.behaviours.set("imageHorizontalAlign",haxe_ui_util_Variant.fromString(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertyChange",null,"imageHorizontalAlign"));
		return value;
	}
	,get_imageVerticalAlign: function() {
		return haxe_ui_util_Variant.toString(this.behaviours.get("imageVerticalAlign"));
	}
	,set_imageVerticalAlign: function(value) {
		this.behaviours.set("imageVerticalAlign",haxe_ui_util_Variant.fromString(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertyChange",null,"imageVerticalAlign"));
		return value;
	}
	,get_originalWidth: function() {
		return haxe_ui_util_Variant.toFloat(this.behaviours.get("originalWidth"));
	}
	,set_originalWidth: function(value) {
		this.behaviours.set("originalWidth",haxe_ui_util_Variant.fromFloat(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertyChange",null,"originalWidth"));
		return value;
	}
	,get_originalHeight: function() {
		return haxe_ui_util_Variant.toFloat(this.behaviours.get("originalHeight"));
	}
	,set_originalHeight: function(value) {
		this.behaviours.set("originalHeight",haxe_ui_util_Variant.fromFloat(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertyChange",null,"originalHeight"));
		return value;
	}
	,get_value: function() {
		return haxe_ui_util_Variant.toDynamic(this.get_resource());
	}
	,set_value: function(value) {
		this.set_resource(haxe_ui_util_Variant.fromDynamic(value));
		return value;
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_Component.prototype.cloneComponent.call(this);
		if(this.get_resource() != null) {
			c.set_resource(this.get_resource());
		}
		if(this.get_scaleMode() != null) {
			c.set_scaleMode(this.get_scaleMode());
		}
		if(this.get_imageHorizontalAlign() != null) {
			c.set_imageHorizontalAlign(this.get_imageHorizontalAlign());
		}
		if(this.get_imageVerticalAlign() != null) {
			c.set_imageVerticalAlign(this.get_imageVerticalAlign());
		}
		c.set_originalWidth(this.get_originalWidth());
		c.set_originalHeight(this.get_originalHeight());
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		return c;
	}
	,self: function() {
		return new haxe_ui_components_Image();
	}
	,__class__: haxe_ui_components_Image
	,__properties__: $extend(haxe_ui_core_Component.prototype.__properties__,{set_originalHeight:"set_originalHeight",get_originalHeight:"get_originalHeight",set_originalWidth:"set_originalWidth",get_originalWidth:"get_originalWidth",set_imageVerticalAlign:"set_imageVerticalAlign",get_imageVerticalAlign:"get_imageVerticalAlign",set_imageHorizontalAlign:"set_imageHorizontalAlign",get_imageHorizontalAlign:"get_imageHorizontalAlign",set_scaleMode:"set_scaleMode",get_scaleMode:"get_scaleMode",set_resource:"set_resource",get_resource:"get_resource"})
});
var haxe_ui_components__$Image_ImageLayout = function() {
	haxe_ui_layouts_DefaultLayout.call(this);
};
$hxClasses["haxe.ui.components._Image.ImageLayout"] = haxe_ui_components__$Image_ImageLayout;
haxe_ui_components__$Image_ImageLayout.__name__ = "haxe.ui.components._Image.ImageLayout";
haxe_ui_components__$Image_ImageLayout.__super__ = haxe_ui_layouts_DefaultLayout;
haxe_ui_components__$Image_ImageLayout.prototype = $extend(haxe_ui_layouts_DefaultLayout.prototype,{
	get_imageScaleMode: function() {
		return (js_Boot.__cast(this._component , haxe_ui_components_Image)).get_scaleMode();
	}
	,get_imageHorizontalAlign: function() {
		return (js_Boot.__cast(this._component , haxe_ui_components_Image)).get_imageHorizontalAlign();
	}
	,get_imageVerticalAlign: function() {
		return (js_Boot.__cast(this._component , haxe_ui_components_Image)).get_imageVerticalAlign();
	}
	,resizeChildren: function() {
		if(this.get_component().hasImageDisplay()) {
			var image = js_Boot.__cast(this._component , haxe_ui_components_Image);
			var imageDisplay = image.getImageDisplay();
			var maxWidth = this.get_usableSize().width;
			var maxHeight = this.get_usableSize().height;
			if(this.get_component().get_autoWidth() == true) {
				maxWidth = -1;
			}
			if(this._component.get_autoHeight() == true) {
				maxHeight = -1;
			}
			var scaleW = maxWidth != -1 ? maxWidth / image.get_originalWidth() : 1;
			var scaleH = maxHeight != -1 ? maxHeight / image.get_originalHeight() : 1;
			if(this.get_imageScaleMode() != "fill") {
				var scale;
				switch(this.get_imageScaleMode()) {
				case "fitheight":
					scale = scaleH;
					break;
				case "fitinside":
					scale = scaleW < scaleH ? scaleW : scaleH;
					break;
				case "fitoutside":
					scale = scaleW > scaleH ? scaleW : scaleH;
					break;
				case "fitwidth":
					scale = scaleW;
					break;
				default:
					scale = 1;
				}
				imageDisplay.set_imageWidth(image.get_originalWidth() * scale);
				imageDisplay.set_imageHeight(image.get_originalHeight() * scale);
			} else {
				imageDisplay.set_imageWidth(image.get_originalWidth() * scaleW);
				imageDisplay.set_imageHeight(image.get_originalHeight() * scaleH);
			}
		}
	}
	,repositionChildren: function() {
		if(this.get_component().hasImageDisplay()) {
			var image = js_Boot.__cast(this._component , haxe_ui_components_Image);
			var imageDisplay = this._component.getImageDisplay();
			switch(image.get_imageHorizontalAlign()) {
			case "center":
				imageDisplay.set_left((this._component.get_componentWidth() - imageDisplay.get_imageWidth()) / 2);
				break;
			case "left":
				imageDisplay.set_left(this.get_paddingLeft());
				break;
			case "right":
				imageDisplay.set_left(this._component.get_componentWidth() - imageDisplay.get_imageWidth() - this.get_paddingRight());
				break;
			}
			switch(image.get_imageVerticalAlign()) {
			case "bottom":
				imageDisplay.set_top(this._component.get_componentHeight() - imageDisplay.get_imageHeight() - this.get_paddingBottom());
				break;
			case "center":
				imageDisplay.set_top((this._component.get_componentHeight() - imageDisplay.get_imageHeight()) / 2);
				break;
			case "top":
				imageDisplay.set_top(this.get_paddingTop());
				break;
			}
		}
	}
	,calcAutoSize: function(exclusions) {
		var size = haxe_ui_layouts_DefaultLayout.prototype.calcAutoSize.call(this,exclusions);
		if(this.get_component().hasImageDisplay()) {
			size.width += this.get_component().getImageDisplay().get_imageWidth();
			size.height += this.get_component().getImageDisplay().get_imageHeight();
		}
		return size;
	}
	,refresh: function() {
		haxe_ui_layouts_DefaultLayout.prototype.refresh.call(this);
		this.updateClipRect();
	}
	,updateClipRect: function() {
		if(this.get_component().hasImageDisplay()) {
			var usz = this.get_usableSize();
			var imageDisplay = this.get_component().getImageDisplay();
			var rc = imageDisplay.get_imageClipRect();
			if(imageDisplay.get_imageWidth() > usz.width || imageDisplay.get_imageHeight() > usz.height) {
				if(rc == null) {
					rc = new haxe_ui_geom_Rectangle();
				}
				rc.top = this.get_paddingLeft();
				rc.left = this.get_paddingTop();
				rc.width = usz.width;
				rc.height = usz.height;
			} else {
				rc = null;
			}
			imageDisplay.set_imageClipRect(rc);
		}
	}
	,__class__: haxe_ui_components__$Image_ImageLayout
	,__properties__: $extend(haxe_ui_layouts_DefaultLayout.prototype.__properties__,{get_imageVerticalAlign:"get_imageVerticalAlign",get_imageHorizontalAlign:"get_imageHorizontalAlign",get_imageScaleMode:"get_imageScaleMode"})
});
var haxe_ui_components__$Image_ResourceBehaviour = function(component) {
	haxe_ui_behaviours_DataBehaviour.call(this,component);
};
$hxClasses["haxe.ui.components._Image.ResourceBehaviour"] = haxe_ui_components__$Image_ResourceBehaviour;
haxe_ui_components__$Image_ResourceBehaviour.__name__ = "haxe.ui.components._Image.ResourceBehaviour";
haxe_ui_components__$Image_ResourceBehaviour.__super__ = haxe_ui_behaviours_DataBehaviour;
haxe_ui_components__$Image_ResourceBehaviour.prototype = $extend(haxe_ui_behaviours_DataBehaviour.prototype,{
	validateData: function() {
		var _gthis = this;
		if(this._value == null || haxe_ui_util_Variant.get_isNull(this._value)) {
			this._component.removeImageDisplay();
			this._component.invalidateComponent();
			return;
		}
		var imageLoader = new haxe_ui_util_ImageLoader(this._value);
		imageLoader.load(function(imageInfo) {
			if(imageInfo != null) {
				if(_gthis._value == null || haxe_ui_util_Variant.get_isNull(_gthis._value)) {
					_gthis._component.removeImageDisplay();
					_gthis._component.invalidateComponent();
					return;
				}
				var image = js_Boot.__cast(_gthis._component , haxe_ui_components_Image);
				var display = image.getImageDisplay();
				if(display != null) {
					display.set_imageInfo(imageInfo);
					image.set_originalWidth(imageInfo.width);
					image.set_originalHeight(imageInfo.height);
					if(image.autoSize() == true && image.parentComponent != null) {
						var _this = image.parentComponent;
						if(!(_this._layout == null || _this._layoutLocked == true)) {
							_this.invalidateComponent("layout",false);
						}
					}
					image.invalidateComponent();
					display.validateComponent();
				}
			}
		});
	}
	,__class__: haxe_ui_components__$Image_ResourceBehaviour
});
var haxe_ui_components__$Image_Builder = function(image) {
	var _gthis = this;
	haxe_ui_core_CompositeBuilder.call(this,image);
	this._image = image;
	this._image.registerEvent("shown",function(_) {
		if(_gthis._image.parentComponent != null) {
			var _this = _gthis._image.parentComponent;
			if(!(_this._layout == null || _this._layoutLocked == true)) {
				_this.invalidateComponent("layout",false);
			}
		}
	});
};
$hxClasses["haxe.ui.components._Image.Builder"] = haxe_ui_components__$Image_Builder;
haxe_ui_components__$Image_Builder.__name__ = "haxe.ui.components._Image.Builder";
haxe_ui_components__$Image_Builder.__super__ = haxe_ui_core_CompositeBuilder;
haxe_ui_components__$Image_Builder.prototype = $extend(haxe_ui_core_CompositeBuilder.prototype,{
	_image: null
	,applyStyle: function(style) {
		if(style.resource != null) {
			this._image.set_resource(haxe_ui_util_Variant.fromString(style.resource));
		}
	}
	,__class__: haxe_ui_components__$Image_Builder
});
var haxe_ui_components_Label = function() {
	haxe_ui_core_Component.call(this);
};
$hxClasses["haxe.ui.components.Label"] = haxe_ui_components_Label;
haxe_ui_components_Label.__name__ = "haxe.ui.components.Label";
haxe_ui_components_Label.__super__ = haxe_ui_core_Component;
haxe_ui_components_Label.prototype = $extend(haxe_ui_core_Component.prototype,{
	registerComposite: function() {
		haxe_ui_core_Component.prototype.registerComposite.call(this);
		this._compositeBuilderClass = haxe_ui_components__$Label_Builder;
		this._defaultLayoutClass = haxe_ui_components__$Label_LabelLayout;
	}
	,registerBehaviours: function() {
		haxe_ui_core_Component.prototype.registerBehaviours.call(this);
		this.behaviours.register("text",haxe_ui_components__$Label_TextBehaviour);
		this.behaviours.register("htmlText",haxe_ui_components__$Label_HtmlTextBehaviour);
	}
	,get_htmlText: function() {
		return haxe_ui_util_Variant.toString(this.behaviours.get("htmlText"));
	}
	,set_htmlText: function(value) {
		var _g = Type.typeof(value);
		if(_g._hx_index == 6) {
			if(_g.c == String) {
				if(value != null && value.indexOf("{{") != -1 && value.indexOf("}}") != -1) {
					haxe_ui_locale_LocaleManager.get_instance().registerComponent(this,"htmlText",null,value);
					return value;
				}
			}
		}
		this.behaviours.set("htmlText",haxe_ui_util_Variant.fromString(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertyChange",null,"htmlText"));
		return value;
	}
	,get_value: function() {
		return this.get_text();
	}
	,set_value: function(value) {
		this.set_text(value);
		return value;
	}
	,get_textAlign: function() {
		if(this.get_customStyle().textAlign != null) {
			return this.get_customStyle().textAlign;
		}
		if(this.get_style() == null || this.get_style().textAlign == null) {
			return null;
		}
		return this.get_style().textAlign;
	}
	,set_textAlign: function(value) {
		if(this.get_customStyle().textAlign == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().textAlign = null;
		} else {
			this.get_customStyle().textAlign = value;
		}
		this.invalidateComponent("style",false);
		if(!(this._layout == null || this._layoutLocked == true)) {
			this.invalidateComponent("layout",false);
		}
		return value;
	}
	,get_wordWrap: function() {
		if(this.get_customStyle().wordWrap != null) {
			return this.get_customStyle().wordWrap;
		}
		if(this.get_style() == null || this.get_style().wordWrap == null) {
			return null;
		}
		return this.get_style().wordWrap;
	}
	,set_wordWrap: function(value) {
		if(this.get_customStyle().wordWrap == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().wordWrap = null;
		} else {
			this.get_customStyle().wordWrap = value;
		}
		this.invalidateComponent("style",false);
		if(!(this._layout == null || this._layoutLocked == true)) {
			this.invalidateComponent("layout",false);
		}
		return value;
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_Component.prototype.cloneComponent.call(this);
		if(this.get_htmlText() != null) {
			c.set_htmlText(this.get_htmlText());
		}
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		return c;
	}
	,self: function() {
		return new haxe_ui_components_Label();
	}
	,__class__: haxe_ui_components_Label
	,__properties__: $extend(haxe_ui_core_Component.prototype.__properties__,{set_wordWrap:"set_wordWrap",get_wordWrap:"get_wordWrap",set_textAlign:"set_textAlign",get_textAlign:"get_textAlign",set_htmlText:"set_htmlText",get_htmlText:"get_htmlText"})
});
var haxe_ui_components__$Label_LabelLayout = function() {
	haxe_ui_layouts_DefaultLayout.call(this);
};
$hxClasses["haxe.ui.components._Label.LabelLayout"] = haxe_ui_components__$Label_LabelLayout;
haxe_ui_components__$Label_LabelLayout.__name__ = "haxe.ui.components._Label.LabelLayout";
haxe_ui_components__$Label_LabelLayout.__super__ = haxe_ui_layouts_DefaultLayout;
haxe_ui_components__$Label_LabelLayout.prototype = $extend(haxe_ui_layouts_DefaultLayout.prototype,{
	resizeChildren: function() {
		if(this.get_component().get_autoWidth() == false) {
			this.get_component().getTextDisplay().set_width(this.get_component().get_componentWidth() - this.get_paddingLeft() - this.get_paddingRight());
			var wordWrap = true;
			if(this._component.get_style() != null && this._component.get_style().wordWrap != null) {
				wordWrap = this._component.get_style().wordWrap;
			}
			this.get_component().getTextDisplay().set_wordWrap(wordWrap);
		} else {
			this.get_component().getTextDisplay().set_width(this.get_component().getTextDisplay().get_textWidth());
		}
		if(this.get_component().get_autoHeight() == true) {
			this.get_component().getTextDisplay().set_height(this.get_component().getTextDisplay().get_textHeight());
		} else {
			this.get_component().getTextDisplay().set_height(this.get_component().get_height());
		}
	}
	,repositionChildren: function() {
		if(this.get_component().hasTextDisplay() == true) {
			this.get_component().getTextDisplay().set_left(this.get_paddingLeft());
			this.get_component().getTextDisplay().set_top(this.get_paddingTop());
		}
	}
	,calcAutoSize: function(exclusions) {
		var size = haxe_ui_layouts_DefaultLayout.prototype.calcAutoSize.call(this,exclusions);
		if(this.get_component().hasTextDisplay() == true) {
			size.width += this.get_component().getTextDisplay().get_textWidth();
			size.height += this.get_component().getTextDisplay().get_textHeight();
		}
		return size;
	}
	,textAlign: function(child) {
		if(child == null || child.get_style() == null || child.get_style().textAlign == null) {
			return "left";
		}
		return child.get_style().textAlign;
	}
	,__class__: haxe_ui_components__$Label_LabelLayout
});
var haxe_ui_components__$Label_TextBehaviour = function(component) {
	haxe_ui_behaviours_DataBehaviour.call(this,component);
};
$hxClasses["haxe.ui.components._Label.TextBehaviour"] = haxe_ui_components__$Label_TextBehaviour;
haxe_ui_components__$Label_TextBehaviour.__name__ = "haxe.ui.components._Label.TextBehaviour";
haxe_ui_components__$Label_TextBehaviour.__super__ = haxe_ui_behaviours_DataBehaviour;
haxe_ui_components__$Label_TextBehaviour.prototype = $extend(haxe_ui_behaviours_DataBehaviour.prototype,{
	validateData: function() {
		if(this._component.getTextDisplay().get_textStyle() != this._component.get_style()) {
			var _this = this._component;
			var force = true;
			if(force == null) {
				force = false;
			}
			_this.invalidateComponent("style",false);
			if(force == true) {
				_this._style = null;
			}
		}
		this._component.getTextDisplay().set_text("" + (this._value == null ? "null" : haxe_ui_util_Variant.toString(this._value)));
		this._component.dispatch(new haxe_ui_events_UIEvent("change"));
	}
	,__class__: haxe_ui_components__$Label_TextBehaviour
});
var haxe_ui_components__$Label_HtmlTextBehaviour = function(component) {
	haxe_ui_behaviours_DataBehaviour.call(this,component);
};
$hxClasses["haxe.ui.components._Label.HtmlTextBehaviour"] = haxe_ui_components__$Label_HtmlTextBehaviour;
haxe_ui_components__$Label_HtmlTextBehaviour.__name__ = "haxe.ui.components._Label.HtmlTextBehaviour";
haxe_ui_components__$Label_HtmlTextBehaviour.__super__ = haxe_ui_behaviours_DataBehaviour;
haxe_ui_components__$Label_HtmlTextBehaviour.prototype = $extend(haxe_ui_behaviours_DataBehaviour.prototype,{
	validateData: function() {
		if(this._component.getTextDisplay().get_textStyle() != this._component.get_style()) {
			var _this = this._component;
			var force = true;
			if(force == null) {
				force = false;
			}
			_this.invalidateComponent("style",false);
			if(force == true) {
				_this._style = null;
			}
		}
		this._component.getTextDisplay().set_htmlText("" + (this._value == null ? "null" : haxe_ui_util_Variant.toString(this._value)));
		this._component.dispatch(new haxe_ui_events_UIEvent("change"));
	}
	,__class__: haxe_ui_components__$Label_HtmlTextBehaviour
});
var haxe_ui_components__$Label_Builder = function(label) {
	haxe_ui_core_CompositeBuilder.call(this,label);
	this._label = label;
};
$hxClasses["haxe.ui.components._Label.Builder"] = haxe_ui_components__$Label_Builder;
haxe_ui_components__$Label_Builder.__name__ = "haxe.ui.components._Label.Builder";
haxe_ui_components__$Label_Builder.isHtml = function(v) {
	if(v == null) {
		return false;
	} else {
		return v.indexOf("<font ") != -1;
	}
};
haxe_ui_components__$Label_Builder.__super__ = haxe_ui_core_CompositeBuilder;
haxe_ui_components__$Label_Builder.prototype = $extend(haxe_ui_core_CompositeBuilder.prototype,{
	_label: null
	,applyStyle: function(style) {
		if(this._label.hasTextDisplay() == true) {
			this._label.getTextDisplay().set_textStyle(style);
			var tmp;
			if((style.contentType == "auto" || style.contentType == "html") && this._label.getTextDisplay().get_supportsHtml()) {
				var v = Std.string(this._component.get_text());
				tmp = v == null ? false : v.indexOf("<font ") != -1;
			} else {
				tmp = false;
			}
			if(tmp) {
				this._label.set_htmlText(this._label.get_text());
			}
		}
	}
	,get_isComponentClipped: function() {
		var componentClipRect = this._component.get_componentClipRect();
		if(componentClipRect == null) {
			return false;
		}
		return this._label.getTextDisplay().measureTextWidth() > componentClipRect.width;
	}
	,__class__: haxe_ui_components__$Label_Builder
});
var haxe_ui_containers_Absolute = function() {
	haxe_ui_containers_Box.call(this);
	this.set_layout(new haxe_ui_layouts_AbsoluteLayout());
};
$hxClasses["haxe.ui.containers.Absolute"] = haxe_ui_containers_Absolute;
haxe_ui_containers_Absolute.__name__ = "haxe.ui.containers.Absolute";
haxe_ui_containers_Absolute.__super__ = haxe_ui_containers_Box;
haxe_ui_containers_Absolute.prototype = $extend(haxe_ui_containers_Box.prototype,{
	registerBehaviours: function() {
		haxe_ui_containers_Box.prototype.registerBehaviours.call(this);
	}
	,cloneComponent: function() {
		var c = haxe_ui_containers_Box.prototype.cloneComponent.call(this);
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		return c;
	}
	,self: function() {
		return new haxe_ui_containers_Absolute();
	}
	,__class__: haxe_ui_containers_Absolute
});
var haxe_ui_containers_HBox = function() {
	haxe_ui_containers_Box.call(this);
	this.set_layout(new haxe_ui_layouts_HorizontalLayout());
};
$hxClasses["haxe.ui.containers.HBox"] = haxe_ui_containers_HBox;
haxe_ui_containers_HBox.__name__ = "haxe.ui.containers.HBox";
haxe_ui_containers_HBox.__super__ = haxe_ui_containers_Box;
haxe_ui_containers_HBox.prototype = $extend(haxe_ui_containers_Box.prototype,{
	get_continuous: function() {
		return ((this._layout) instanceof haxe_ui_layouts_HorizontalContinuousLayout);
	}
	,set_continuous: function(value) {
		if(value == true) {
			this.set_layout(new haxe_ui_layouts_HorizontalContinuousLayout());
		} else {
			this.set_layout(new haxe_ui_layouts_HorizontalLayout());
		}
		return value;
	}
	,registerBehaviours: function() {
		haxe_ui_containers_Box.prototype.registerBehaviours.call(this);
	}
	,cloneComponent: function() {
		var c = haxe_ui_containers_Box.prototype.cloneComponent.call(this);
		c.set_continuous(this.get_continuous());
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		return c;
	}
	,self: function() {
		return new haxe_ui_containers_HBox();
	}
	,__class__: haxe_ui_containers_HBox
	,__properties__: $extend(haxe_ui_containers_Box.prototype.__properties__,{set_continuous:"set_continuous",get_continuous:"get_continuous"})
});
var haxe_ui_core_ComponentTextBehaviour = function(component) {
	haxe_ui_behaviours_DefaultBehaviour.call(this,component);
};
$hxClasses["haxe.ui.core.ComponentTextBehaviour"] = haxe_ui_core_ComponentTextBehaviour;
haxe_ui_core_ComponentTextBehaviour.__name__ = "haxe.ui.core.ComponentTextBehaviour";
haxe_ui_core_ComponentTextBehaviour.__super__ = haxe_ui_behaviours_DefaultBehaviour;
haxe_ui_core_ComponentTextBehaviour.prototype = $extend(haxe_ui_behaviours_DefaultBehaviour.prototype,{
	set: function(value) {
		if(haxe_ui_util_Variant.eq(value,this._value)) {
			return;
		}
		this._value = value;
		haxe_ui_behaviours_DefaultBehaviour.prototype.set.call(this,value);
	}
	,__class__: haxe_ui_core_ComponentTextBehaviour
});
var haxe_ui_core_ComponentDisabledBehaviour = function(component) {
	haxe_ui_behaviours_DataBehaviour.call(this,component);
	this._value = haxe_ui_util_Variant.fromBool(false);
};
$hxClasses["haxe.ui.core.ComponentDisabledBehaviour"] = haxe_ui_core_ComponentDisabledBehaviour;
haxe_ui_core_ComponentDisabledBehaviour.__name__ = "haxe.ui.core.ComponentDisabledBehaviour";
haxe_ui_core_ComponentDisabledBehaviour.__super__ = haxe_ui_behaviours_DataBehaviour;
haxe_ui_core_ComponentDisabledBehaviour.prototype = $extend(haxe_ui_behaviours_DataBehaviour.prototype,{
	validateData: function() {
		if(this._value != null && haxe_ui_util_Variant.get_isNull(this._value) == false) {
			this._component.disableInteractivity(haxe_ui_util_Variant.toBool(this._value),true,true);
		}
	}
	,__class__: haxe_ui_core_ComponentDisabledBehaviour
});
var haxe_ui_core_ComponentValueBehaviour = function(component) {
	haxe_ui_behaviours_ValueBehaviour.call(this,component);
};
$hxClasses["haxe.ui.core.ComponentValueBehaviour"] = haxe_ui_core_ComponentValueBehaviour;
haxe_ui_core_ComponentValueBehaviour.__name__ = "haxe.ui.core.ComponentValueBehaviour";
haxe_ui_core_ComponentValueBehaviour.__super__ = haxe_ui_behaviours_ValueBehaviour;
haxe_ui_core_ComponentValueBehaviour.prototype = $extend(haxe_ui_behaviours_ValueBehaviour.prototype,{
	set: function(value) {
		if(haxe_ui_util_Variant.eq(value,this._value)) {
			return;
		}
		this._value = value;
		this._component.set_text(haxe_ui_util_Variant.toString(value));
	}
	,get: function() {
		return this._value;
	}
	,getDynamic: function() {
		return haxe_ui_util_Variant.toDynamic(this._value);
	}
	,__class__: haxe_ui_core_ComponentValueBehaviour
});
var haxe_ui_core_ComponentToolTipBehaviour = function(component) {
	haxe_ui_behaviours_DataBehaviour.call(this,component);
};
$hxClasses["haxe.ui.core.ComponentToolTipBehaviour"] = haxe_ui_core_ComponentToolTipBehaviour;
haxe_ui_core_ComponentToolTipBehaviour.__name__ = "haxe.ui.core.ComponentToolTipBehaviour";
haxe_ui_core_ComponentToolTipBehaviour.__super__ = haxe_ui_behaviours_DataBehaviour;
haxe_ui_core_ComponentToolTipBehaviour.prototype = $extend(haxe_ui_behaviours_DataBehaviour.prototype,{
	validateData: function() {
		if(this._value == null || haxe_ui_util_Variant.get_isNull(this._value)) {
			haxe_ui_tooltips_ToolTipManager.get_instance().unregisterTooltip(this._component);
		} else {
			haxe_ui_tooltips_ToolTipManager.get_instance().registerTooltip(this._component,{ tipData : haxe_ui_util_Variant.toDynamic(this._value), renderer : this._component.get_tooltipRenderer()});
		}
	}
	,setDynamic: function(value) {
		if(value == null) {
			haxe_ui_tooltips_ToolTipManager.get_instance().unregisterTooltip(this._component);
		} else {
			haxe_ui_tooltips_ToolTipManager.get_instance().registerTooltip(this._component,{ tipData : value, renderer : this._component.get_tooltipRenderer()});
		}
	}
	,getDynamic: function() {
		var options = haxe_ui_tooltips_ToolTipManager.get_instance().getTooltipOptions(this._component);
		if(options == null) {
			return null;
		}
		return options.tipData;
	}
	,__class__: haxe_ui_core_ComponentToolTipBehaviour
});
var haxe_ui_core_ComponentToolTipRendererBehaviour = function(component) {
	haxe_ui_behaviours_DataBehaviour.call(this,component);
};
$hxClasses["haxe.ui.core.ComponentToolTipRendererBehaviour"] = haxe_ui_core_ComponentToolTipRendererBehaviour;
haxe_ui_core_ComponentToolTipRendererBehaviour.__name__ = "haxe.ui.core.ComponentToolTipRendererBehaviour";
haxe_ui_core_ComponentToolTipRendererBehaviour.__super__ = haxe_ui_behaviours_DataBehaviour;
haxe_ui_core_ComponentToolTipRendererBehaviour.prototype = $extend(haxe_ui_behaviours_DataBehaviour.prototype,{
	validateData: function() {
		if(this._value == null || haxe_ui_util_Variant.get_isNull(this._value)) {
			haxe_ui_tooltips_ToolTipManager.get_instance().updateTooltipRenderer(this._component,null);
		} else {
			haxe_ui_tooltips_ToolTipManager.get_instance().updateTooltipRenderer(this._component,haxe_ui_util_Variant.toComponent(this._value));
		}
	}
	,__class__: haxe_ui_core_ComponentToolTipRendererBehaviour
});
var haxe_ui_core_IScrollView = function() { };
$hxClasses["haxe.ui.core.IScrollView"] = haxe_ui_core_IScrollView;
haxe_ui_core_IScrollView.__name__ = "haxe.ui.core.IScrollView";
haxe_ui_core_IScrollView.__isInterface__ = true;
haxe_ui_core_IScrollView.prototype = {
	ensureVisible: null
	,__class__: haxe_ui_core_IScrollView
};
var haxe_ui_core_ImageDisplay = function() {
	this._isValidating = false;
	this._isAllInvalid = false;
	this._invalidationFlags = new haxe_ds_StringMap();
	haxe_ui_backend_ImageDisplayImpl.call(this);
};
$hxClasses["haxe.ui.core.ImageDisplay"] = haxe_ui_core_ImageDisplay;
haxe_ui_core_ImageDisplay.__name__ = "haxe.ui.core.ImageDisplay";
haxe_ui_core_ImageDisplay.__super__ = haxe_ui_backend_ImageDisplayImpl;
haxe_ui_core_ImageDisplay.prototype = $extend(haxe_ui_backend_ImageDisplayImpl.prototype,{
	_invalidationFlags: null
	,_isAllInvalid: null
	,_isValidating: null
	,get_left: function() {
		return this._left;
	}
	,set_left: function(value) {
		if(value == this._left) {
			return value;
		}
		this._left = value;
		this.invalidateComponent("position");
		return value;
	}
	,get_top: function() {
		return this._top;
	}
	,set_top: function(value) {
		if(value == this._top) {
			return value;
		}
		this._top = value;
		this.invalidateComponent("position");
		return value;
	}
	,set_imageWidth: function(value) {
		if(this._imageWidth == value || value <= 0) {
			return value;
		}
		this._imageWidth = value;
		this.invalidateComponent("display");
		return value;
	}
	,get_imageWidth: function() {
		return this._imageWidth;
	}
	,set_imageHeight: function(value) {
		if(this._imageHeight == value || value <= 0) {
			return value;
		}
		this._imageHeight = value;
		this.invalidateComponent("display");
		return value;
	}
	,get_imageHeight: function() {
		return this._imageHeight;
	}
	,get_imageInfo: function() {
		return this._imageInfo;
	}
	,set_imageInfo: function(value) {
		if(value == this._imageInfo) {
			return value;
		}
		this._imageInfo = value;
		this._imageWidth = this._imageInfo.width;
		this._imageHeight = this._imageInfo.height;
		this.invalidateComponent("data");
		this.invalidateComponent("display");
		return value;
	}
	,get_imageClipRect: function() {
		return this._imageClipRect;
	}
	,set_imageClipRect: function(value) {
		this._imageClipRect = value;
		this.invalidateComponent("display");
		return value;
	}
	,isComponentInvalid: function(flag) {
		if(flag == null) {
			flag = "all";
		}
		if(this._isAllInvalid == true) {
			return true;
		}
		if(flag == "all") {
			var h = this._invalidationFlags.h;
			var value_h = h;
			var value_keys = Object.keys(h);
			var value_length = value_keys.length;
			var value_current = 0;
			while(value_current < value_length) {
				var value = value_h[value_keys[value_current++]];
				return true;
			}
			return false;
		}
		return Object.prototype.hasOwnProperty.call(this._invalidationFlags.h,flag);
	}
	,invalidateComponent: function(flag) {
		if(flag == null) {
			flag = "all";
		}
		if(flag == "all") {
			this._isAllInvalid = true;
			this.parentComponent.invalidateComponent("imageDisplay");
		} else if(!Object.prototype.hasOwnProperty.call(this._invalidationFlags.h,flag)) {
			this._invalidationFlags.h[flag] = true;
			this.parentComponent.invalidateComponent("imageDisplay");
		}
	}
	,validateComponent: function() {
		if(this._isValidating == true || this.isComponentInvalid() == false) {
			return;
		}
		this._isValidating = true;
		this.handleValidate();
		var h = this._invalidationFlags.h;
		var flag_h = h;
		var flag_keys = Object.keys(h);
		var flag_length = flag_keys.length;
		var flag_current = 0;
		while(flag_current < flag_length) {
			var flag = flag_keys[flag_current++];
			var _this = this._invalidationFlags;
			if(Object.prototype.hasOwnProperty.call(_this.h,flag)) {
				delete(_this.h[flag]);
			}
		}
		this._isAllInvalid = false;
		this._isValidating = false;
	}
	,handleValidate: function() {
		var dataInvalid = this.isComponentInvalid("data");
		var positionInvalid = this.isComponentInvalid("position");
		var displayInvalid = this.isComponentInvalid("display");
		if(dataInvalid) {
			this.validateData();
		}
		if(positionInvalid) {
			this.validatePosition();
		}
		if(displayInvalid) {
			this.validateDisplay();
		}
	}
	,__class__: haxe_ui_core_ImageDisplay
	,__properties__: {set_imageClipRect:"set_imageClipRect",get_imageClipRect:"get_imageClipRect",set_imageInfo:"set_imageInfo",get_imageInfo:"get_imageInfo",set_imageHeight:"set_imageHeight",get_imageHeight:"get_imageHeight",set_imageWidth:"set_imageWidth",get_imageWidth:"get_imageWidth",set_top:"set_top",get_top:"get_top",set_left:"set_left",get_left:"get_left"}
});
var haxe_ui_core_ItemRenderer = function() {
	this._fieldList = null;
	this.itemIndex = -1;
	this._allowHover = true;
	haxe_ui_containers_Box.call(this);
	this.registerEvent("mouseover",$bind(this,this._onItemMouseOver));
	this.registerEvent("mouseout",$bind(this,this._onItemMouseOut));
	this.registerEvent("mousedown",$bind(this,this._onItemMouseDown));
	this.registerEvent("mouseup",$bind(this,this._onItemMouseUp));
};
$hxClasses["haxe.ui.core.ItemRenderer"] = haxe_ui_core_ItemRenderer;
haxe_ui_core_ItemRenderer.__name__ = "haxe.ui.core.ItemRenderer";
haxe_ui_core_ItemRenderer.__super__ = haxe_ui_containers_Box;
haxe_ui_core_ItemRenderer.prototype = $extend(haxe_ui_containers_Box.prototype,{
	_onItemMouseOver: function(event) {
		this.addClass(":hover");
	}
	,_onItemMouseOut: function(event) {
		this.removeClass(":hover");
	}
	,_onItemMouseDown: function(event) {
		this.addClass(":down");
	}
	,_onItemMouseUp: function(event) {
		this.removeClass(":down");
	}
	,_allowHover: null
	,get_allowHover: function() {
		return this._allowHover;
	}
	,set_allowHover: function(value) {
		if(this._allowHover == value) {
			return value;
		}
		this._allowHover = value;
		if(this._allowHover == true) {
			this.registerEvent("mouseover",$bind(this,this._onItemMouseOver));
			this.registerEvent("mouseout",$bind(this,this._onItemMouseOut));
		} else {
			this.unregisterEvent("mouseover",$bind(this,this._onItemMouseOver));
			this.unregisterEvent("mouseout",$bind(this,this._onItemMouseOut));
		}
		return value;
	}
	,_data: null
	,get_data: function() {
		return this._data;
	}
	,set_data: function(value) {
		if(value == this._data) {
			return value;
		}
		this._data = value;
		this.invalidateComponent("data",false);
		return value;
	}
	,itemIndex: null
	,_fieldList: null
	,validateComponentData: function() {
		if(this._data != null && (this._fieldList == null || this._fieldList.length == 0)) {
			var _g = Type.typeof(this._data);
			switch(_g._hx_index) {
			case 4:
				if(typeof(this._data) == "string" == false) {
					var fieldList = Reflect.fields(this._data);
					if(js_Boot.getClass(this._data) != null) {
						var instanceFields = Type.getInstanceFields(js_Boot.getClass(this._data));
						var _g1 = 0;
						while(_g1 < instanceFields.length) {
							var i = instanceFields[_g1];
							++_g1;
							if(Reflect.isFunction(Reflect.getProperty(this._data,i)) == false && fieldList.indexOf(i) == -1) {
								fieldList.push(i);
							}
						}
						this._fieldList = fieldList;
					}
				} else {
					this._fieldList = ["text"];
				}
				break;
			case 6:
				var _g1 = _g.c;
				if(typeof(this._data) == "string" == false) {
					var fieldList = Reflect.fields(this._data);
					if(js_Boot.getClass(this._data) != null) {
						var instanceFields = Type.getInstanceFields(js_Boot.getClass(this._data));
						var _g = 0;
						while(_g < instanceFields.length) {
							var i = instanceFields[_g];
							++_g;
							if(Reflect.isFunction(Reflect.getProperty(this._data,i)) == false && fieldList.indexOf(i) == -1) {
								fieldList.push(i);
							}
						}
						this._fieldList = fieldList;
					}
				} else {
					this._fieldList = ["text"];
				}
				break;
			default:
				this._fieldList = ["text"];
			}
		}
		this.updateValues(this._data,this._fieldList);
		var components = this.findComponents(null,haxe_ui_core_InteractiveComponent);
		var _g = 0;
		while(_g < components.length) {
			var c = components[_g];
			++_g;
			if(((c) instanceof haxe_ui_components_Button)) {
				if(c.hasEvent("click",$bind(this,this.onItemClick)) == false) {
					c.registerEvent("click",$bind(this,this.onItemClick));
				}
			} else if(c.hasEvent("change",$bind(this,this.onItemChange)) == false) {
				c.registerEvent("change",$bind(this,this.onItemChange));
			}
		}
		this.onDataChanged(this._data);
	}
	,onDataChanged: function(data) {
	}
	,onItemChange: function(event) {
		if(this.itemIndex < 0) {
			return;
		}
		var v = event.target.get_value();
		if(this._data != null) {
			Reflect.setProperty(this._data,event.target.get_id(),v);
		}
		var e = new haxe_ui_events_ItemEvent("itemComponentEvent");
		e.bubble = true;
		e.source = event.target;
		e.sourceEvent = event;
		e.itemIndex = this.itemIndex;
		e.data = this._data;
		this.dispatch(e);
	}
	,onItemClick: function(event) {
		if(this.itemIndex < 0) {
			return;
		}
		var e = new haxe_ui_events_ItemEvent("itemComponentEvent");
		e.bubble = true;
		e.source = event.target;
		e.sourceEvent = event;
		e.itemIndex = this.itemIndex;
		e.data = this._data;
		this.dispatch(e);
	}
	,updateValues: function(value,fieldList) {
		if(fieldList == null) {
			fieldList = Reflect.fields(value);
		}
		var valueObject = null;
		var _g = Type.typeof(value);
		switch(_g._hx_index) {
		case 4:
			if(typeof(value) == "string" == false) {
				valueObject = value;
			} else {
				valueObject = { text : value};
			}
			break;
		case 6:
			var _g1 = _g.c;
			if(typeof(value) == "string" == false) {
				valueObject = value;
			} else {
				valueObject = { text : value};
			}
			break;
		default:
			valueObject = { text : value};
		}
		var _g = 0;
		while(_g < fieldList.length) {
			var f = fieldList[_g];
			++_g;
			var v = Reflect.getProperty(valueObject,f);
			if(Type.typeof(v) == ValueType.TObject) {
				this.updateValues(v);
			} else {
				var c = this.findComponent(f,null,true);
				if(c != null && v != null) {
					var propValue = haxe_ui_util_TypeConverter.convertTo(v,haxe_ui_core_TypeMap.getTypeInfo(c.get_className(),"value"));
					c.set_value(propValue);
					if(((c) instanceof haxe_ui_core_InteractiveComponent)) {
						if(c.hasEvent("change",$bind(this,this.onItemChange)) == false) {
							c.registerEvent("change",$bind(this,this.onItemChange));
						}
						if(c.hasEvent("click",$bind(this,this.onItemClick)) == false) {
							c.registerEvent("click",$bind(this,this.onItemClick));
						}
					}
					c.show();
				} else if(c != null) {
					c.hide();
				} else if(f != "id") {
					try {
						Reflect.setProperty(this,f,v);
					} catch( _g1 ) {
					}
				}
			}
		}
	}
	,registerBehaviours: function() {
		haxe_ui_containers_Box.prototype.registerBehaviours.call(this);
	}
	,cloneComponent: function() {
		var c = haxe_ui_containers_Box.prototype.cloneComponent.call(this);
		c.set_allowHover(this.get_allowHover());
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		return c;
	}
	,self: function() {
		return new haxe_ui_core_ItemRenderer();
	}
	,__class__: haxe_ui_core_ItemRenderer
	,__properties__: $extend(haxe_ui_containers_Box.prototype.__properties__,{set_data:"set_data",get_data:"get_data",set_allowHover:"set_allowHover",get_allowHover:"get_allowHover"})
});
var haxe_ui_core_Platform = function() {
	haxe_ui_backend_PlatformImpl.call(this);
};
$hxClasses["haxe.ui.core.Platform"] = haxe_ui_core_Platform;
haxe_ui_core_Platform.__name__ = "haxe.ui.core.Platform";
haxe_ui_core_Platform.__properties__ = {get_instance:"get_instance",get_hscrollHeight:"get_hscrollHeight",get_vscrollWidth:"get_vscrollWidth"};
haxe_ui_core_Platform.get_vscrollWidth = function() {
	return haxe_ui_core_Platform.get_instance().getMetric("patform.metrics.vscroll.width");
};
haxe_ui_core_Platform.get_hscrollHeight = function() {
	return haxe_ui_core_Platform.get_instance().getMetric("patform.metrics.hscroll.height");
};
haxe_ui_core_Platform.get_instance = function() {
	if(haxe_ui_core_Platform._instance == null) {
		haxe_ui_core_Platform._instance = new haxe_ui_core_Platform();
	}
	return haxe_ui_core_Platform._instance;
};
haxe_ui_core_Platform.__super__ = haxe_ui_backend_PlatformImpl;
haxe_ui_core_Platform.prototype = $extend(haxe_ui_backend_PlatformImpl.prototype,{
	getMetric: function(id) {
		return haxe_ui_backend_PlatformImpl.prototype.getMetric.call(this,id);
	}
	,__class__: haxe_ui_core_Platform
});
var haxe_ui_core_Screen = function() {
	haxe_ui_backend_ScreenImpl.call(this);
	this.rootComponents = [];
	this._eventMap = new haxe_ui_util_EventMap();
};
$hxClasses["haxe.ui.core.Screen"] = haxe_ui_core_Screen;
haxe_ui_core_Screen.__name__ = "haxe.ui.core.Screen";
haxe_ui_core_Screen.__properties__ = {get_instance:"get_instance"};
haxe_ui_core_Screen.get_instance = function() {
	if(haxe_ui_core_Screen._instance == null) {
		haxe_ui_core_Screen._instance = new haxe_ui_core_Screen();
	}
	return haxe_ui_core_Screen._instance;
};
haxe_ui_core_Screen.__super__ = haxe_ui_backend_ScreenImpl;
haxe_ui_core_Screen.prototype = $extend(haxe_ui_backend_ScreenImpl.prototype,{
	_eventMap: null
	,addComponent: function(component) {
		var wasReady = component.get_isReady();
		component._hasScreen = true;
		haxe_ui_backend_ScreenImpl.prototype.addComponent.call(this,component);
		component.ready();
		if(this.rootComponents.indexOf(component) == -1) {
			this.rootComponents.push(component);
		}
		if(haxe_ui_focus_FocusManager.get_instance().hasView(component) == false) {
			haxe_ui_focus_FocusManager.get_instance().pushView(component);
		}
		if(component.hasEvent("resize",$bind(this,this._onRootComponentResize)) == false) {
			component.registerEvent("resize",$bind(this,this._onRootComponentResize));
		}
		if(wasReady && component.get_hidden() == false) {
			component.dispatch(new haxe_ui_events_UIEvent("shown"));
		}
		return component;
	}
	,removeComponent: function(component,dispose) {
		if(dispose == null) {
			dispose = true;
		}
		component._hasScreen = false;
		haxe_ui_backend_ScreenImpl.prototype.removeComponent.call(this,component,dispose);
		component.set_depth(-1);
		HxOverrides.remove(this.rootComponents,component);
		haxe_ui_focus_FocusManager.get_instance().removeView(component);
		component.unregisterEvent("resize",$bind(this,this._onRootComponentResize));
		if(dispose == true) {
			component.disposeComponent();
		}
		return component;
	}
	,setComponentIndex: function(child,index) {
		if(index >= 0 && index <= this.rootComponents.length) {
			this.handleSetComponentIndex(child,index);
			HxOverrides.remove(this.rootComponents,child);
			this.rootComponents.splice(index,0,child);
		}
		return child;
	}
	,findComponentsUnderPoint: function(screenX,screenY,type) {
		var c = [];
		var _g = 0;
		var _g1 = this.rootComponents;
		while(_g < _g1.length) {
			var r = _g1[_g];
			++_g;
			c = c.concat(r.findComponentsUnderPoint(screenX,screenY,type));
		}
		return c;
	}
	,onThemeChanged: function() {
		var _g = 0;
		var _g1 = this.rootComponents;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			this.onThemeChangedChildren(c);
		}
	}
	,onThemeChangedChildren: function(c) {
		var _g = 0;
		var _g1 = c._children == null ? [] : c._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			this.onThemeChangedChildren(child);
		}
		c.onThemeChanged();
	}
	,registerEvent: function(type,listener,priority) {
		if(priority == null) {
			priority = 0;
		}
		if(this.supportsEvent(type) == true) {
			if(this._eventMap.add(type,listener,priority) == true) {
				this.mapEvent(type,$bind(this,this._onMappedEvent));
			}
		}
	}
	,unregisterEvent: function(type,listener) {
		if(this._eventMap.remove(type,listener) == true) {
			this.unmapEvent(type,$bind(this,this._onMappedEvent));
		}
	}
	,_onMappedEvent: function(event) {
		this._eventMap.invoke(event.type,event);
	}
	,__class__: haxe_ui_core_Screen
});
var haxe_ui_core_TextDisplayData = function() {
	this.wordWrap = false;
	this.multiline = false;
};
$hxClasses["haxe.ui.core.TextDisplayData"] = haxe_ui_core_TextDisplayData;
haxe_ui_core_TextDisplayData.__name__ = "haxe.ui.core.TextDisplayData";
haxe_ui_core_TextDisplayData.prototype = {
	multiline: null
	,wordWrap: null
	,__class__: haxe_ui_core_TextDisplayData
};
var haxe_ui_core_TextDisplay = function() {
	this._depth = -1;
	this._isValidating = false;
	this._isAllInvalid = false;
	this._invalidationFlags = new haxe_ds_StringMap();
	haxe_ui_backend_TextDisplayImpl.call(this);
};
$hxClasses["haxe.ui.core.TextDisplay"] = haxe_ui_core_TextDisplay;
haxe_ui_core_TextDisplay.__name__ = "haxe.ui.core.TextDisplay";
haxe_ui_core_TextDisplay.__interfaces__ = [haxe_ui_validation_IValidating];
haxe_ui_core_TextDisplay.__super__ = haxe_ui_backend_TextDisplayImpl;
haxe_ui_core_TextDisplay.prototype = $extend(haxe_ui_backend_TextDisplayImpl.prototype,{
	_invalidationFlags: null
	,_isAllInvalid: null
	,_isValidating: null
	,get_textStyle: function() {
		return this._textStyle;
	}
	,set_textStyle: function(value) {
		var _gthis = this;
		if(value == null) {
			return value;
		}
		if(value.fontName != null && this._textStyle == null || this._textStyle != null && value.fontName != this._textStyle.fontName) {
			haxe_ui_ToolkitAssets.get_instance().getFont(value.fontName,function(fontInfo) {
				_gthis._fontInfo = fontInfo;
				_gthis.invalidateComponent("style");
				_gthis.parentComponent.invalidateComponent("style");
			});
		} else {
			this.invalidateComponent("style");
		}
		this._textStyle = value;
		return value;
	}
	,get_text: function() {
		return this._text;
	}
	,set_text: function(value) {
		if(value == this._text) {
			return value;
		}
		this._text = value;
		this._htmlText = null;
		this.invalidateComponent("data");
		return value;
	}
	,get_htmlText: function() {
		return this._htmlText;
	}
	,set_htmlText: function(value) {
		if(value == this._htmlText) {
			return value;
		}
		this._htmlText = value;
		this._text = null;
		this.invalidateComponent("data");
		return value;
	}
	,get_left: function() {
		return this._left;
	}
	,set_left: function(value) {
		if(value == this._left) {
			return value;
		}
		this.invalidateComponent("position");
		this._left = value;
		return value;
	}
	,get_top: function() {
		return this._top;
	}
	,set_top: function(value) {
		if(value == this._top) {
			return value;
		}
		this.invalidateComponent("position");
		this._top = value;
		return value;
	}
	,set_width: function(value) {
		if(this._width == value) {
			return value;
		}
		this.invalidateComponent("display");
		this._width = value;
		return value;
	}
	,get_width: function() {
		return this._width;
	}
	,set_height: function(value) {
		if(this._height == value) {
			return value;
		}
		this.invalidateComponent("display");
		this._height = value;
		return value;
	}
	,get_height: function() {
		return this._height;
	}
	,textWidth: null
	,get_textWidth: function() {
		if(this._text == null && this._htmlText == null) {
			return 0;
		}
		if(this._text != null && this._text.length == 0) {
			return 0;
		}
		if(this._htmlText != null && this._htmlText.length == 0) {
			return 0;
		}
		if(this.isComponentInvalid() == true) {
			this.validateComponent();
		}
		return this._textWidth;
	}
	,textHeight: null
	,get_textHeight: function() {
		if(this._text == null && this._htmlText == null) {
			return 0;
		}
		if(this._text != null && this._text.length == 0) {
			return 0;
		}
		if(this._htmlText != null && this._htmlText.length == 0) {
			return 0;
		}
		if(this.isComponentInvalid() == true) {
			this.validateComponent();
		}
		return this._textHeight;
	}
	,get_multiline: function() {
		return this._displayData.multiline;
	}
	,set_multiline: function(value) {
		if(value == this._displayData.multiline) {
			return value;
		}
		this.invalidateComponent("style");
		this._displayData.multiline = value;
		return value;
	}
	,get_wordWrap: function() {
		return this._displayData.wordWrap;
	}
	,set_wordWrap: function(value) {
		if(value == this._displayData.wordWrap) {
			return value;
		}
		this.invalidateComponent("style");
		this._displayData.wordWrap = value;
		return value;
	}
	,isComponentInvalid: function(flag) {
		if(flag == null) {
			flag = "all";
		}
		if(this._isAllInvalid == true) {
			return true;
		}
		if(flag == "all") {
			var h = this._invalidationFlags.h;
			var value_h = h;
			var value_keys = Object.keys(h);
			var value_length = value_keys.length;
			var value_current = 0;
			while(value_current < value_length) {
				var value = value_h[value_keys[value_current++]];
				return true;
			}
			return false;
		}
		return Object.prototype.hasOwnProperty.call(this._invalidationFlags.h,flag);
	}
	,invalidateComponent: function(flag) {
		if(flag == null) {
			flag = "all";
		}
		if(flag == "all") {
			this._isAllInvalid = true;
			this.parentComponent.invalidateComponent("textDisplay");
		} else if(!Object.prototype.hasOwnProperty.call(this._invalidationFlags.h,flag)) {
			this._invalidationFlags.h[flag] = true;
			this.parentComponent.invalidateComponent("textDisplay");
		}
	}
	,_depth: null
	,get_depth: function() {
		return this._depth;
	}
	,set_depth: function(value) {
		if(this._depth == value) {
			return value;
		}
		this._depth = value;
		return value;
	}
	,updateComponentDisplay: function() {
	}
	,validateComponent: function(nextFrame) {
		if(nextFrame == null) {
			nextFrame = true;
		}
		if(this._isValidating == true || this.isComponentInvalid() == false) {
			return;
		}
		this._isValidating = true;
		this.validateComponentInternal();
		this._invalidationFlags.h = Object.create(null);
		this._isAllInvalid = false;
		this._isValidating = false;
	}
	,validateComponentInternal: function() {
		var dataInvalid = this.isComponentInvalid("data");
		var styleInvalid = this.isComponentInvalid("style");
		var positionInvalid = this.isComponentInvalid("position");
		var displayInvalid = this.isComponentInvalid("display");
		var measureInvalid = this.isComponentInvalid("measure");
		if(dataInvalid) {
			this.validateData();
		}
		if(styleInvalid) {
			if(this.validateStyle()) {
				measureInvalid = true;
			}
		}
		if(positionInvalid || styleInvalid) {
			this.validatePosition();
		}
		if(displayInvalid) {
			this.validateDisplay();
		}
		if(dataInvalid || displayInvalid || measureInvalid) {
			var oldTextWidth = this.get_textWidth();
			var oldTextHeight = this.get_textHeight();
			this.measureText();
			if(this.get_textWidth() != oldTextWidth || this.get_textHeight() != oldTextHeight) {
				this.parentComponent.invalidateComponent("layout");
			}
		}
	}
	,__class__: haxe_ui_core_TextDisplay
	,__properties__: $extend(haxe_ui_backend_TextDisplayImpl.prototype.__properties__,{set_depth:"set_depth",get_depth:"get_depth",set_wordWrap:"set_wordWrap",get_wordWrap:"get_wordWrap",set_multiline:"set_multiline",get_multiline:"get_multiline",get_textHeight:"get_textHeight",get_textWidth:"get_textWidth",set_height:"set_height",get_height:"get_height",set_width:"set_width",get_width:"get_width",set_top:"set_top",get_top:"get_top",set_left:"set_left",get_left:"get_left",set_htmlText:"set_htmlText",get_htmlText:"get_htmlText",set_text:"set_text",get_text:"get_text",set_textStyle:"set_textStyle",get_textStyle:"get_textStyle"})
});
var haxe_ui_core_TextInputData = function() {
	this.onChangedCallback = null;
	this.onScrollCallback = null;
	this.vscrollNativeWheel = false;
	this.vscrollPageStep = null;
	this.vscrollPageSize = 0;
	this.vscrollMax = 0;
	this.vscrollPos = 0;
	this.hscrollPageSize = 0;
	this.hscrollMax = 0;
	this.hscrollPos = 0;
	this.password = false;
};
$hxClasses["haxe.ui.core.TextInputData"] = haxe_ui_core_TextInputData;
haxe_ui_core_TextInputData.__name__ = "haxe.ui.core.TextInputData";
haxe_ui_core_TextInputData.prototype = {
	password: null
	,hscrollPos: null
	,hscrollMax: null
	,hscrollPageSize: null
	,vscrollPos: null
	,vscrollMax: null
	,vscrollPageSize: null
	,vscrollPageStep: null
	,vscrollNativeWheel: null
	,onScrollCallback: null
	,onChangedCallback: null
	,__class__: haxe_ui_core_TextInputData
};
var haxe_ui_core_TextInput = function() {
	this._depth = -1;
	this._isValidating = false;
	this._isAllInvalid = false;
	this._invalidationFlags = new haxe_ds_StringMap();
	haxe_ui_backend_TextInputImpl.call(this);
	this._isAllInvalid = true;
};
$hxClasses["haxe.ui.core.TextInput"] = haxe_ui_core_TextInput;
haxe_ui_core_TextInput.__name__ = "haxe.ui.core.TextInput";
haxe_ui_core_TextInput.__interfaces__ = [haxe_ui_validation_IValidating];
haxe_ui_core_TextInput.__super__ = haxe_ui_backend_TextInputImpl;
haxe_ui_core_TextInput.prototype = $extend(haxe_ui_backend_TextInputImpl.prototype,{
	_invalidationFlags: null
	,_isAllInvalid: null
	,_isValidating: null
	,focus: function() {
		haxe_ui_backend_TextInputImpl.prototype.focus.call(this);
	}
	,blur: function() {
		haxe_ui_backend_TextInputImpl.prototype.blur.call(this);
	}
	,get_textStyle: function() {
		return this._textStyle;
	}
	,set_textStyle: function(value) {
		var _gthis = this;
		if(value == null) {
			return value;
		}
		if(value.fontName != null && this._textStyle == null || this._textStyle != null && value.fontName != this._textStyle.fontName) {
			haxe_ui_ToolkitAssets.get_instance().getFont(value.fontName,function(fontInfo) {
				_gthis._fontInfo = fontInfo;
				_gthis.invalidateComponent("style");
			});
		} else {
			this.invalidateComponent("style");
		}
		this._textStyle = value;
		return value;
	}
	,data: null
	,get_data: function() {
		return this._inputData;
	}
	,get_text: function() {
		return this._text;
	}
	,set_text: function(value) {
		if(value == this._text) {
			return value;
		}
		this._text = value;
		this.invalidateComponent("data");
		return value;
	}
	,get_htmlText: function() {
		return this._htmlText;
	}
	,set_htmlText: function(value) {
		if(value == this._htmlText) {
			return value;
		}
		this._htmlText = value;
		this._text = null;
		this.invalidateComponent("data");
		return value;
	}
	,get_password: function() {
		return this._inputData.password;
	}
	,set_password: function(value) {
		if(value == this._inputData.password) {
			return value;
		}
		this._inputData.password = value;
		this.invalidateComponent("style");
		return value;
	}
	,get_left: function() {
		return this._left;
	}
	,set_left: function(value) {
		if(value == this._left) {
			return value;
		}
		this._left = value;
		this.invalidateComponent("position");
		return value;
	}
	,get_top: function() {
		return this._top;
	}
	,set_top: function(value) {
		if(value == this._top) {
			return value;
		}
		this._top = value;
		this.invalidateComponent("position");
		return value;
	}
	,set_width: function(value) {
		if(this._width == value) {
			return value;
		}
		this._width = value;
		this.invalidateComponent("display");
		return value;
	}
	,get_width: function() {
		return this._width;
	}
	,set_height: function(value) {
		if(this._height == value) {
			return value;
		}
		this._height = value;
		this.invalidateComponent("display");
		return value;
	}
	,get_height: function() {
		return this._height;
	}
	,textWidth: null
	,get_textWidth: function() {
		if(this._text == null || this._text.length == 0) {
			return 0;
		}
		if(this.isComponentInvalid() == true) {
			this.validateComponent();
		}
		return this._textWidth;
	}
	,textHeight: null
	,get_textHeight: function() {
		var tmp = this._text == null || this._text.length == 0;
		if(this.isComponentInvalid() == true) {
			this.validateComponent();
		}
		return this._textHeight;
	}
	,get_multiline: function() {
		return this._displayData.multiline;
	}
	,set_multiline: function(value) {
		if(value == this._displayData.multiline) {
			return value;
		}
		this._displayData.multiline = value;
		this.invalidateComponent("style");
		return value;
	}
	,get_wordWrap: function() {
		return this._displayData.wordWrap;
	}
	,set_wordWrap: function(value) {
		if(value == this._displayData.wordWrap) {
			return value;
		}
		this._displayData.wordWrap = value;
		this.invalidateComponent("style");
		return value;
	}
	,get_hscrollPos: function() {
		return this._inputData.hscrollPos;
	}
	,set_hscrollPos: function(value) {
		if(value == this._inputData.hscrollPos) {
			return value;
		}
		this._inputData.hscrollPos = value;
		this.invalidateComponent("data");
		return value;
	}
	,hscrollMax: null
	,get_hscrollMax: function() {
		return this._inputData.hscrollMax;
	}
	,hscrollPageSize: null
	,get_hscrollPageSize: function() {
		return this._inputData.hscrollPageSize;
	}
	,get_vscrollPos: function() {
		return this._inputData.vscrollPos;
	}
	,set_vscrollPos: function(value) {
		if(value == this._inputData.vscrollPos) {
			return value;
		}
		this._inputData.vscrollPos = value;
		this.invalidateComponent("data");
		return value;
	}
	,vscrollMax: null
	,get_vscrollMax: function() {
		return this._inputData.vscrollMax;
	}
	,vscrollPageSize: null
	,get_vscrollPageSize: function() {
		return this._inputData.vscrollPageSize;
	}
	,isComponentInvalid: function(flag) {
		if(flag == null) {
			flag = "all";
		}
		if(this._isAllInvalid == true) {
			return true;
		}
		if(flag == "all") {
			var h = this._invalidationFlags.h;
			var value_h = h;
			var value_keys = Object.keys(h);
			var value_length = value_keys.length;
			var value_current = 0;
			while(value_current < value_length) {
				var value = value_h[value_keys[value_current++]];
				return true;
			}
			return false;
		}
		return Object.prototype.hasOwnProperty.call(this._invalidationFlags.h,flag);
	}
	,invalidateComponent: function(flag) {
		if(flag == null) {
			flag = "all";
		}
		if(flag == "all") {
			this._isAllInvalid = true;
			this.parentComponent.invalidateComponent("textInput");
		} else if(!Object.prototype.hasOwnProperty.call(this._invalidationFlags.h,flag)) {
			this._invalidationFlags.h[flag] = true;
			this.parentComponent.invalidateComponent("textInput");
		}
	}
	,_depth: null
	,get_depth: function() {
		return this._depth;
	}
	,set_depth: function(value) {
		if(this._depth == value) {
			return value;
		}
		this._depth = value;
		return value;
	}
	,updateComponentDisplay: function() {
	}
	,validateComponent: function(nextFrame) {
		if(nextFrame == null) {
			nextFrame = true;
		}
		if(this._isValidating == true || this.isComponentInvalid() == false) {
			return;
		}
		this._isValidating = true;
		this.validateComponentInternal();
		var h = this._invalidationFlags.h;
		var flag_h = h;
		var flag_keys = Object.keys(h);
		var flag_length = flag_keys.length;
		var flag_current = 0;
		while(flag_current < flag_length) {
			var flag = flag_keys[flag_current++];
			var _this = this._invalidationFlags;
			if(Object.prototype.hasOwnProperty.call(_this.h,flag)) {
				delete(_this.h[flag]);
			}
		}
		this._isAllInvalid = false;
		this._isValidating = false;
	}
	,validateComponentInternal: function() {
		var dataInvalid = this.isComponentInvalid("data");
		var styleInvalid = this.isComponentInvalid("style");
		var positionInvalid = this.isComponentInvalid("position");
		var displayInvalid = this.isComponentInvalid("display");
		var measureInvalid = this.isComponentInvalid("measure");
		if(dataInvalid) {
			this.validateData();
		}
		if(styleInvalid) {
			if(this.validateStyle()) {
				measureInvalid = true;
			}
		}
		if(positionInvalid) {
			this.validatePosition();
		}
		if(displayInvalid) {
			this.validateDisplay();
		}
		if(dataInvalid || displayInvalid || measureInvalid) {
			this.measureText();
		}
	}
	,__class__: haxe_ui_core_TextInput
	,__properties__: $extend(haxe_ui_backend_TextInputImpl.prototype.__properties__,{set_depth:"set_depth",get_depth:"get_depth",get_vscrollPageSize:"get_vscrollPageSize",get_vscrollMax:"get_vscrollMax",set_vscrollPos:"set_vscrollPos",get_vscrollPos:"get_vscrollPos",get_hscrollPageSize:"get_hscrollPageSize",get_hscrollMax:"get_hscrollMax",set_hscrollPos:"set_hscrollPos",get_hscrollPos:"get_hscrollPos",set_wordWrap:"set_wordWrap",get_wordWrap:"get_wordWrap",set_multiline:"set_multiline",get_multiline:"get_multiline",get_textHeight:"get_textHeight",get_textWidth:"get_textWidth",set_height:"set_height",get_height:"get_height",set_width:"set_width",get_width:"get_width",set_top:"set_top",get_top:"get_top",set_left:"set_left",get_left:"get_left",set_password:"set_password",get_password:"get_password",set_htmlText:"set_htmlText",get_htmlText:"get_htmlText",set_text:"set_text",get_text:"get_text",get_data:"get_data",set_textStyle:"set_textStyle",get_textStyle:"get_textStyle"})
});
var haxe_ui_core_TypeMap = function() { };
$hxClasses["haxe.ui.core.TypeMap"] = haxe_ui_core_TypeMap;
haxe_ui_core_TypeMap.__name__ = "haxe.ui.core.TypeMap";
haxe_ui_core_TypeMap.addTypeInfo = function(className,property,type) {
	if(haxe_ui_core_TypeMap.typeInfo == null) {
		haxe_ui_core_TypeMap.typeInfo = new haxe_ds_StringMap();
	}
	var classTypeMap = haxe_ui_core_TypeMap.typeInfo.h[className];
	if(classTypeMap == null) {
		classTypeMap = new haxe_ds_StringMap();
		haxe_ui_core_TypeMap.typeInfo.h[className] = classTypeMap;
	}
	classTypeMap.h[property] = type;
};
haxe_ui_core_TypeMap.getTypeInfo = function(className,property) {
	if(haxe_ui_core_TypeMap.typeInfo == null) {
		return null;
	}
	var classTypeMap = haxe_ui_core_TypeMap.typeInfo.h[className];
	if(classTypeMap == null) {
		return null;
	}
	return classTypeMap.h[property];
};
var haxe_ui_data_DataSource = function(transformer) {
	this.onClear = null;
	this.onRemove = null;
	this.onUpdate = null;
	this.onInsert = null;
	this.onAdd = null;
	this.transformer = transformer;
	this._allowCallbacks = true;
	this._changed = false;
};
$hxClasses["haxe.ui.data.DataSource"] = haxe_ui_data_DataSource;
haxe_ui_data_DataSource.__name__ = "haxe.ui.data.DataSource";
haxe_ui_data_DataSource.fromString = function(data,type) {
	return null;
};
haxe_ui_data_DataSource.prototype = {
	onChange: null
	,transformer: null
	,_changed: null
	,onAdd: null
	,onInsert: null
	,onUpdate: null
	,onRemove: null
	,onClear: null
	,_allowCallbacks: null
	,get_allowCallbacks: function() {
		return this._allowCallbacks;
	}
	,set_allowCallbacks: function(value) {
		this._allowCallbacks = value;
		if(this._allowCallbacks == true && this._changed == true) {
			this._changed = false;
			if(this.onChange != null) {
				this.onChange();
			}
		}
		return value;
	}
	,get_data: function() {
		return this.handleGetData();
	}
	,set_data: function(value) {
		this.handleSetData(value);
		this.handleChanged();
		return value;
	}
	,size: null
	,get_size: function() {
		return this.handleGetSize();
	}
	,get: function(index) {
		var r = this.handleGetItem(index);
		if(js_Boot.__implements(r,haxe_ui_data_IDataItem)) {
			(js_Boot.__cast(r , haxe_ui_data_IDataItem)).onDataSourceChanged = this.onChange;
		}
		if(this.transformer != null) {
			r = this.transformer.transformFrom(r);
		}
		return r;
	}
	,indexOf: function(item) {
		if(this.transformer != null) {
			item = this.transformer.transformFrom(item);
		}
		return this.handleIndexOf(item);
	}
	,add: function(item) {
		var r = this.handleAddItem(item);
		this.handleChanged();
		if(this._allowCallbacks == true && this.onAdd != null) {
			this.onAdd(r);
		}
		return r;
	}
	,insert: function(index,item) {
		var r = this.handleInsert(index,item);
		this.handleChanged();
		if(this._allowCallbacks == true && this.onInsert != null) {
			this.onInsert(index,r);
		}
		return r;
	}
	,remove: function(item) {
		var r = this.handleRemoveItem(item);
		this.handleChanged();
		if(this._allowCallbacks == true && this.onRemove != null) {
			this.onRemove(r);
		}
		return r;
	}
	,removeAt: function(index) {
		var item = this.get(index);
		return this.remove(item);
	}
	,update: function(index,item) {
		var r = this.handleUpdateItem(index,item);
		this.handleChanged();
		if(this._allowCallbacks == true && this.onUpdate != null) {
			this.onUpdate(index,r);
		}
		return r;
	}
	,clear: function() {
		var o = this._allowCallbacks;
		this._allowCallbacks = false;
		this.handleClear();
		this._allowCallbacks = o;
		this.handleChanged();
		if(this._allowCallbacks == true && this.onClear != null) {
			this.onClear();
		}
	}
	,clearFilter: function() {
	}
	,filter: function(fn) {
	}
	,handleChanged: function() {
		this._changed = true;
		if(this._allowCallbacks == true && this.onChange != null) {
			this._changed = false;
			this.onChange();
		}
	}
	,sortCustom: function(fn) {
	}
	,sort: function(field,direction) {
		var _g = $bind(this,this.sortByFn);
		var field1 = field;
		var direction1 = direction;
		this.sortCustom(function(o1,o2) {
			return _g(o1,o2,field1,direction1);
		});
	}
	,sortByFn: function(o1,o2,field,direction) {
		var f1 = o1;
		var f2 = o2;
		if(field != null) {
			f1 = Reflect.field(o1,field);
			f2 = Reflect.field(o2,field);
		}
		if(f1 == null || f2 == null) {
			return 0;
		}
		f1 = Std.string(f1);
		f2 = Std.string(f2);
		if(direction == null) {
			direction = "asc";
		}
		var high = 1;
		var low = -1;
		if(direction == "desc") {
			high = -1;
			low = 1;
		}
		var alpha1 = f1.replace(haxe_ui_data_DataSource.regexAlpha.r,"");
		var alpha2 = f2.replace(haxe_ui_data_DataSource.regexAlpha.r,"");
		if(alpha1 == alpha2) {
			var numeric1 = Std.parseInt(f1.replace(haxe_ui_data_DataSource.regexNumeric.r,""));
			var numeric2 = Std.parseInt(f2.replace(haxe_ui_data_DataSource.regexNumeric.r,""));
			if(numeric1 == numeric2) {
				return 0;
			} else if(numeric1 > numeric2) {
				return high;
			} else {
				return low;
			}
		}
		if(alpha1 > alpha2) {
			return high;
		} else {
			return low;
		}
	}
	,handleGetSize: function() {
		return 0;
	}
	,handleGetItem: function(index) {
		return null;
	}
	,handleIndexOf: function(item) {
		return 0;
	}
	,handleAddItem: function(item) {
		return null;
	}
	,handleInsert: function(index,item) {
		return null;
	}
	,handleRemoveItem: function(item) {
		return null;
	}
	,handleGetData: function() {
		return null;
	}
	,handleSetData: function(v) {
	}
	,handleClear: function() {
		var cachedTransformer = this.transformer;
		this.transformer = null;
		while(this.get_size() > 0) this.remove(this.get(0));
		this.transformer = cachedTransformer;
	}
	,handleUpdateItem: function(index,item) {
		return null;
	}
	,clone: function() {
		var c = new haxe_ui_data_DataSource();
		return c;
	}
	,__class__: haxe_ui_data_DataSource
	,__properties__: {get_size:"get_size",set_data:"set_data",get_data:"get_data",set_allowCallbacks:"set_allowCallbacks",get_allowCallbacks:"get_allowCallbacks"}
};
var haxe_ui_data_IDataItem = function() { };
$hxClasses["haxe.ui.data.IDataItem"] = haxe_ui_data_IDataItem;
haxe_ui_data_IDataItem.__name__ = "haxe.ui.data.IDataItem";
haxe_ui_data_IDataItem.__isInterface__ = true;
haxe_ui_data_IDataItem.prototype = {
	onDataSourceChanged: null
	,__class__: haxe_ui_data_IDataItem
};
var haxe_ui_data_transformation_IItemTransformer = function() { };
$hxClasses["haxe.ui.data.transformation.IItemTransformer"] = haxe_ui_data_transformation_IItemTransformer;
haxe_ui_data_transformation_IItemTransformer.__name__ = "haxe.ui.data.transformation.IItemTransformer";
haxe_ui_data_transformation_IItemTransformer.__isInterface__ = true;
haxe_ui_data_transformation_IItemTransformer.prototype = {
	transformFrom: null
	,__class__: haxe_ui_data_transformation_IItemTransformer
};
var haxe_ui_dragdrop_DragManager = function() {
	this._dragComponents = new haxe_ds_ObjectMap();
	this._mouseTargetToDragTarget = new haxe_ds_ObjectMap();
};
$hxClasses["haxe.ui.dragdrop.DragManager"] = haxe_ui_dragdrop_DragManager;
haxe_ui_dragdrop_DragManager.__name__ = "haxe.ui.dragdrop.DragManager";
haxe_ui_dragdrop_DragManager.__properties__ = {get_instance:"get_instance"};
haxe_ui_dragdrop_DragManager.get_instance = function() {
	if(haxe_ui_dragdrop_DragManager._instance == null) {
		haxe_ui_dragdrop_DragManager._instance = new haxe_ui_dragdrop_DragManager();
	}
	return haxe_ui_dragdrop_DragManager._instance;
};
haxe_ui_dragdrop_DragManager.prototype = {
	_dragComponents: null
	,_mouseTargetToDragTarget: null
	,_currentComponent: null
	,_currentOptions: null
	,_mouseOffset: null
	,getDragOptions: function(component) {
		var dragOptions = this._dragComponents.h[component.__id__];
		return dragOptions;
	}
	,registerDraggable: function(component,dragOptions) {
		if(this.isRegisteredDraggable(component)) {
			return null;
		}
		if(dragOptions == null) {
			dragOptions = { };
		}
		if(dragOptions.mouseTarget == null) {
			dragOptions.mouseTarget = component;
		}
		if(dragOptions.dragOffsetX == null) {
			dragOptions.dragOffsetX = 0;
		}
		if(dragOptions.dragOffsetY == null) {
			dragOptions.dragOffsetY = 0;
		}
		if(dragOptions.dragTolerance == null) {
			dragOptions.dragTolerance = haxe_ui_Toolkit.get_scale() | 0;
		}
		if(dragOptions.draggableStyleName == null) {
			dragOptions.draggableStyleName = "draggable";
		}
		if(dragOptions.draggingStyleName == null) {
			dragOptions.draggingStyleName = "dragging";
		}
		this._dragComponents.set(component,dragOptions);
		this._mouseTargetToDragTarget.set(dragOptions.mouseTarget,component);
		if(!dragOptions.mouseTarget.hasEvent("mousedown",$bind(this,this.onMouseDown))) {
			dragOptions.mouseTarget.registerEvent("mousedown",$bind(this,this.onMouseDown));
		}
		if(dragOptions.draggableStyleName != null) {
			dragOptions.mouseTarget.addClass(dragOptions.draggableStyleName);
		}
		return dragOptions;
	}
	,unregisterDraggable: function(component) {
		if(!this.isRegisteredDraggable(component)) {
			return;
		}
		var dragOptions = this.getDragOptions(component);
		if(dragOptions != null && dragOptions.mouseTarget != null) {
			dragOptions.mouseTarget.unregisterEvent("mousedown",$bind(this,this.onMouseDown));
			this._mouseTargetToDragTarget.remove(dragOptions.mouseTarget);
		}
		haxe_ui_core_Screen.get_instance().unregisterEvent("mousemove",$bind(this,this.onScreenCheckForDrag));
		haxe_ui_core_Screen.get_instance().unregisterEvent("mousemove",$bind(this,this.onScreenDrag));
		haxe_ui_core_Screen.get_instance().unregisterEvent("mouseup",$bind(this,this.onScreenMouseUp));
		this._dragComponents.remove(component);
	}
	,isRegisteredDraggable: function(component) {
		return this._dragComponents.h.__keys__[component.__id__] != null;
	}
	,onMouseDown: function(e) {
		e.screenX *= haxe_ui_Toolkit.get_scaleX();
		e.screenY *= haxe_ui_Toolkit.get_scaleY();
		this._currentComponent = this._mouseTargetToDragTarget.h[e.target.__id__];
		this._currentOptions = this.getDragOptions(this._currentComponent);
		this._mouseOffset = new haxe_ui_geom_Point(e.screenX - this._currentComponent.get_left(),e.screenY - this._currentComponent.get_top());
		haxe_ui_core_Screen.get_instance().registerEvent("mouseup",$bind(this,this.onScreenMouseUp));
		haxe_ui_core_Screen.get_instance().registerEvent("mousemove",$bind(this,this.onScreenCheckForDrag));
	}
	,onScreenCheckForDrag: function(e) {
		e.screenX *= haxe_ui_Toolkit.get_scaleX();
		e.screenY *= haxe_ui_Toolkit.get_scaleY();
		var x1 = e.screenX - this._currentComponent.get_left();
		var y1 = e.screenY - this._currentComponent.get_top();
		var x2 = this._mouseOffset.x;
		var y2 = this._mouseOffset.y;
		if(Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) > this._currentOptions.dragTolerance) {
			haxe_ui_core_Screen.get_instance().unregisterEvent("mousemove",$bind(this,this.onScreenCheckForDrag));
			haxe_ui_core_Screen.get_instance().registerEvent("mousemove",$bind(this,this.onScreenDrag));
			this._mouseOffset.x -= this._currentOptions.dragOffsetX;
			this._mouseOffset.y -= this._currentOptions.dragOffsetY;
			if(this._currentOptions.draggingStyleName != null) {
				this._currentComponent.addClass(this._currentOptions.draggingStyleName);
			}
			this._currentComponent.dispatch(new haxe_ui_events_UIEvent("dragStart"));
		}
	}
	,onScreenDrag: function(e) {
		e.screenX *= haxe_ui_Toolkit.get_scaleX();
		e.screenY *= haxe_ui_Toolkit.get_scaleY();
		if(this._currentOptions.dragBounds != null) {
			var v = e.screenX;
			var min = this._currentOptions.dragBounds.left + this._mouseOffset.x;
			var max = this._currentOptions.dragBounds.get_right() - this._currentComponent.get_actualComponentWidth() + this._mouseOffset.x;
			var boundX;
			if(v == null || isNaN(v)) {
				boundX = min;
			} else {
				if(min != null && v < min) {
					v = min;
				} else if(max != null && v > max) {
					v = max;
				}
				boundX = v;
			}
			var v = e.screenY;
			var min = this._currentOptions.dragBounds.top + this._mouseOffset.y;
			var max = this._currentOptions.dragBounds.get_bottom() - this._currentComponent.get_actualComponentHeight() + this._mouseOffset.y;
			var boundY;
			if(v == null || isNaN(v)) {
				boundY = min;
			} else {
				if(min != null && v < min) {
					v = min;
				} else if(max != null && v > max) {
					v = max;
				}
				boundY = v;
			}
			this._currentComponent.moveComponent(boundX - this._mouseOffset.x,boundY - this._mouseOffset.y);
		} else {
			var xpos = e.screenX;
			var ypos = e.screenY;
			this._currentComponent.moveComponent(xpos - this._mouseOffset.x,ypos - this._mouseOffset.y);
		}
	}
	,onScreenMouseUp: function(e) {
		if(this._currentOptions.draggingStyleName != null) {
			this._currentComponent.removeClass(this._currentOptions.draggingStyleName);
		}
		this._currentComponent.dispatch(new haxe_ui_events_UIEvent("dragEnd"));
		this._currentComponent = null;
		this._currentOptions = null;
		this._mouseOffset.x = 0;
		this._mouseOffset.y = 0;
		haxe_ui_core_Screen.get_instance().unregisterEvent("mouseup",$bind(this,this.onScreenMouseUp));
		haxe_ui_core_Screen.get_instance().unregisterEvent("mousemove",$bind(this,this.onScreenCheckForDrag));
		haxe_ui_core_Screen.get_instance().unregisterEvent("mousemove",$bind(this,this.onScreenDrag));
	}
	,__class__: haxe_ui_dragdrop_DragManager
};
var haxe_ui_events_UIEvent = function(type,bubble,data) {
	if(bubble == null) {
		bubble = false;
	}
	this.type = type;
	this.bubble = bubble;
	this.data = data;
	this.canceled = false;
};
$hxClasses["haxe.ui.events.UIEvent"] = haxe_ui_events_UIEvent;
haxe_ui_events_UIEvent.__name__ = "haxe.ui.events.UIEvent";
haxe_ui_events_UIEvent.__super__ = haxe_ui_backend_EventImpl;
haxe_ui_events_UIEvent.prototype = $extend(haxe_ui_backend_EventImpl.prototype,{
	bubble: null
	,type: null
	,target: null
	,data: null
	,canceled: null
	,cancel: function() {
		haxe_ui_backend_EventImpl.prototype.cancel.call(this);
		this.canceled = true;
	}
	,clone: function() {
		var c = new haxe_ui_events_UIEvent(this.type);
		c.type = this.type;
		c.bubble = this.bubble;
		c.target = this.target;
		c.data = this.data;
		c.canceled = this.canceled;
		this.postClone(c);
		return c;
	}
	,__class__: haxe_ui_events_UIEvent
});
var haxe_ui_events_AnimationEvent = function(type) {
	haxe_ui_events_UIEvent.call(this,type);
};
$hxClasses["haxe.ui.events.AnimationEvent"] = haxe_ui_events_AnimationEvent;
haxe_ui_events_AnimationEvent.__name__ = "haxe.ui.events.AnimationEvent";
haxe_ui_events_AnimationEvent.__super__ = haxe_ui_events_UIEvent;
haxe_ui_events_AnimationEvent.prototype = $extend(haxe_ui_events_UIEvent.prototype,{
	clone: function() {
		var c = new haxe_ui_events_AnimationEvent(this.type);
		return c;
	}
	,__class__: haxe_ui_events_AnimationEvent
});
var haxe_ui_events_FocusEvent = function(type) {
	haxe_ui_events_UIEvent.call(this,type);
};
$hxClasses["haxe.ui.events.FocusEvent"] = haxe_ui_events_FocusEvent;
haxe_ui_events_FocusEvent.__name__ = "haxe.ui.events.FocusEvent";
haxe_ui_events_FocusEvent.__super__ = haxe_ui_events_UIEvent;
haxe_ui_events_FocusEvent.prototype = $extend(haxe_ui_events_UIEvent.prototype,{
	clone: function() {
		var c = new haxe_ui_events_FocusEvent(this.type);
		c.type = this.type;
		c.target = this.target;
		this.postClone(c);
		return c;
	}
	,__class__: haxe_ui_events_FocusEvent
});
var haxe_ui_events_ItemEvent = function(type,bubble,data) {
	this.itemIndex = -1;
	this.sourceEvent = null;
	this.source = null;
	haxe_ui_events_UIEvent.call(this,type,bubble,data);
};
$hxClasses["haxe.ui.events.ItemEvent"] = haxe_ui_events_ItemEvent;
haxe_ui_events_ItemEvent.__name__ = "haxe.ui.events.ItemEvent";
haxe_ui_events_ItemEvent.__super__ = haxe_ui_events_UIEvent;
haxe_ui_events_ItemEvent.prototype = $extend(haxe_ui_events_UIEvent.prototype,{
	source: null
	,sourceEvent: null
	,itemIndex: null
	,clone: function() {
		var c = new haxe_ui_events_ItemEvent(this.type);
		c.source = this.source;
		c.sourceEvent = this.sourceEvent;
		c.itemIndex = this.itemIndex;
		c.type = this.type;
		c.bubble = this.bubble;
		c.target = this.target;
		c.data = this.data;
		c.canceled = this.canceled;
		this.postClone(c);
		return c;
	}
	,__class__: haxe_ui_events_ItemEvent
});
var haxe_ui_events_KeyboardEvent = function(type) {
	haxe_ui_events_UIEvent.call(this,type);
};
$hxClasses["haxe.ui.events.KeyboardEvent"] = haxe_ui_events_KeyboardEvent;
haxe_ui_events_KeyboardEvent.__name__ = "haxe.ui.events.KeyboardEvent";
haxe_ui_events_KeyboardEvent.__super__ = haxe_ui_events_UIEvent;
haxe_ui_events_KeyboardEvent.prototype = $extend(haxe_ui_events_UIEvent.prototype,{
	keyCode: null
	,altKey: null
	,ctrlKey: null
	,shiftKey: null
	,clone: function() {
		var c = new haxe_ui_events_KeyboardEvent(this.type);
		c.type = this.type;
		c.target = this.target;
		c.keyCode = this.keyCode;
		c.altKey = this.altKey;
		c.ctrlKey = this.ctrlKey;
		c.shiftKey = this.shiftKey;
		return c;
	}
	,__class__: haxe_ui_events_KeyboardEvent
});
var haxe_ui_events_MouseEvent = function(type) {
	haxe_ui_events_UIEvent.call(this,type);
};
$hxClasses["haxe.ui.events.MouseEvent"] = haxe_ui_events_MouseEvent;
haxe_ui_events_MouseEvent.__name__ = "haxe.ui.events.MouseEvent";
haxe_ui_events_MouseEvent.__super__ = haxe_ui_events_UIEvent;
haxe_ui_events_MouseEvent.prototype = $extend(haxe_ui_events_UIEvent.prototype,{
	screenX: null
	,screenY: null
	,buttonDown: null
	,delta: null
	,touchEvent: null
	,ctrlKey: null
	,shiftKey: null
	,localX: null
	,get_localX: function() {
		if(this.target == null) {
			return null;
		}
		return (this.screenX * haxe_ui_Toolkit.get_scaleX() - this.target.get_screenLeft()) / haxe_ui_Toolkit.get_scaleX();
	}
	,localY: null
	,get_localY: function() {
		if(this.target == null) {
			return null;
		}
		return (this.screenY * haxe_ui_Toolkit.get_scaleY() - this.target.get_screenTop()) / haxe_ui_Toolkit.get_scaleY();
	}
	,clone: function() {
		var c = new haxe_ui_events_MouseEvent(this.type);
		c.type = this.type;
		c.target = this.target;
		c.screenX = this.screenX;
		c.screenY = this.screenY;
		c.buttonDown = this.buttonDown;
		c.delta = this.delta;
		c.touchEvent = this.touchEvent;
		c.ctrlKey = this.ctrlKey;
		c.shiftKey = this.shiftKey;
		this.postClone(c);
		return c;
	}
	,__class__: haxe_ui_events_MouseEvent
	,__properties__: {get_localY:"get_localY",get_localX:"get_localX"}
});
var haxe_ui_events_ScrollEvent = function(type) {
	haxe_ui_events_UIEvent.call(this,type);
};
$hxClasses["haxe.ui.events.ScrollEvent"] = haxe_ui_events_ScrollEvent;
haxe_ui_events_ScrollEvent.__name__ = "haxe.ui.events.ScrollEvent";
haxe_ui_events_ScrollEvent.__super__ = haxe_ui_events_UIEvent;
haxe_ui_events_ScrollEvent.prototype = $extend(haxe_ui_events_UIEvent.prototype,{
	clone: function() {
		var c = new haxe_ui_events_ScrollEvent(this.type);
		c.type = this.type;
		c.target = this.target;
		this.postClone(c);
		return c;
	}
	,__class__: haxe_ui_events_ScrollEvent
});
var haxe_ui_events_ThemeEvent = function(type,bubble,data) {
	haxe_ui_events_UIEvent.call(this,type,bubble,data);
};
$hxClasses["haxe.ui.events.ThemeEvent"] = haxe_ui_events_ThemeEvent;
haxe_ui_events_ThemeEvent.__name__ = "haxe.ui.events.ThemeEvent";
haxe_ui_events_ThemeEvent.__super__ = haxe_ui_events_UIEvent;
haxe_ui_events_ThemeEvent.prototype = $extend(haxe_ui_events_UIEvent.prototype,{
	__class__: haxe_ui_events_ThemeEvent
});
var haxe_ui_events_ValidationEvent = function(type) {
	haxe_ui_events_UIEvent.call(this,type);
};
$hxClasses["haxe.ui.events.ValidationEvent"] = haxe_ui_events_ValidationEvent;
haxe_ui_events_ValidationEvent.__name__ = "haxe.ui.events.ValidationEvent";
haxe_ui_events_ValidationEvent.__super__ = haxe_ui_events_UIEvent;
haxe_ui_events_ValidationEvent.prototype = $extend(haxe_ui_events_UIEvent.prototype,{
	clone: function() {
		var c = new haxe_ui_events_ValidationEvent(this.type);
		c.type = this.type;
		c.target = this.target;
		this.postClone(c);
		return c;
	}
	,__class__: haxe_ui_events_ValidationEvent
});
var haxe_ui_filters_Filter = function() {
};
$hxClasses["haxe.ui.filters.Filter"] = haxe_ui_filters_Filter;
haxe_ui_filters_Filter.__name__ = "haxe.ui.filters.Filter";
haxe_ui_filters_Filter.prototype = {
	__class__: haxe_ui_filters_Filter
};
var haxe_ui_filters_Blur = function() {
	haxe_ui_filters_Filter.call(this);
};
$hxClasses["haxe.ui.filters.Blur"] = haxe_ui_filters_Blur;
haxe_ui_filters_Blur.__name__ = "haxe.ui.filters.Blur";
haxe_ui_filters_Blur.__super__ = haxe_ui_filters_Filter;
haxe_ui_filters_Blur.prototype = $extend(haxe_ui_filters_Filter.prototype,{
	amount: null
	,__class__: haxe_ui_filters_Blur
});
var haxe_ui_filters_DropShadow = function() {
	haxe_ui_filters_Filter.call(this);
};
$hxClasses["haxe.ui.filters.DropShadow"] = haxe_ui_filters_DropShadow;
haxe_ui_filters_DropShadow.__name__ = "haxe.ui.filters.DropShadow";
haxe_ui_filters_DropShadow.__super__ = haxe_ui_filters_Filter;
haxe_ui_filters_DropShadow.prototype = $extend(haxe_ui_filters_Filter.prototype,{
	distance: null
	,angle: null
	,color: null
	,alpha: null
	,blurX: null
	,blurY: null
	,strength: null
	,quality: null
	,inner: null
	,__class__: haxe_ui_filters_DropShadow
});
var haxe_ui_filters_FilterParser = function() { };
$hxClasses["haxe.ui.filters.FilterParser"] = haxe_ui_filters_FilterParser;
haxe_ui_filters_FilterParser.__name__ = "haxe.ui.filters.FilterParser";
haxe_ui_filters_FilterParser.parseFilter = function(filterDetails) {
	var filter = null;
	if(filterDetails[0] == "drop-shadow") {
		filter = haxe_ui_filters_FilterParser.parseDropShadow(filterDetails);
	} else if(filterDetails[0] == "blur") {
		filter = haxe_ui_filters_FilterParser.parseBlur(filterDetails);
	} else if(filterDetails[0] == "outline") {
		filter = haxe_ui_filters_FilterParser.parseOutline(filterDetails);
	} else if(filterDetails[0] == "grayscale") {
		filter = haxe_ui_filters_FilterParser.parseGrayscale(filterDetails);
	}
	return filter;
};
haxe_ui_filters_FilterParser.parseDropShadow = function(filterDetails) {
	if(filterDetails == null || filterDetails.length == 0) {
		return null;
	}
	var copy = filterDetails.slice();
	haxe_ui_filters_FilterParser.buildDefaults();
	var filterName = copy[0];
	HxOverrides.remove(copy,filterName);
	copy = haxe_ui_filters_FilterParser.copyFilterDefaults(filterName,copy);
	var dropShadow = new haxe_ui_filters_DropShadow();
	dropShadow.distance = copy[0];
	dropShadow.angle = copy[1];
	dropShadow.color = copy[2];
	dropShadow.alpha = copy[3];
	dropShadow.blurX = copy[4];
	dropShadow.blurY = copy[5];
	dropShadow.strength = copy[6];
	dropShadow.quality = copy[7];
	dropShadow.inner = copy[8];
	return dropShadow;
};
haxe_ui_filters_FilterParser.parseBlur = function(filterDetails) {
	if(filterDetails == null || filterDetails.length == 0) {
		return null;
	}
	var copy = filterDetails.slice();
	haxe_ui_filters_FilterParser.buildDefaults();
	var filterName = copy[0];
	HxOverrides.remove(copy,filterName);
	copy = haxe_ui_filters_FilterParser.copyFilterDefaults(filterName,copy);
	var blur = new haxe_ui_filters_Blur();
	blur.amount = copy[0];
	return blur;
};
haxe_ui_filters_FilterParser.parseOutline = function(filterDetails) {
	if(filterDetails == null || filterDetails.length == 0) {
		return null;
	}
	var copy = filterDetails.slice();
	haxe_ui_filters_FilterParser.buildDefaults();
	var filterName = copy[0];
	HxOverrides.remove(copy,filterName);
	copy = haxe_ui_filters_FilterParser.copyFilterDefaults(filterName,copy);
	var outline = new haxe_ui_filters_Outline();
	outline.color = copy[0];
	outline.size = copy[1];
	return outline;
};
haxe_ui_filters_FilterParser.copyFilterDefaults = function(filterName,params) {
	var copy = [];
	var defaultParams = haxe_ui_filters_FilterParser.filterParamDefaults.h[filterName];
	if(defaultParams != null) {
		var _g = 0;
		while(_g < defaultParams.length) {
			var p = defaultParams[_g];
			++_g;
			copy.push(p);
		}
	}
	if(params != null) {
		var n = 0;
		var _g = 0;
		while(_g < params.length) {
			var p = params[_g];
			++_g;
			copy[n] = p;
			++n;
		}
	}
	return copy;
};
haxe_ui_filters_FilterParser.parseGrayscale = function(filterDetails) {
	if(filterDetails == null || filterDetails.length == 0) {
		return null;
	}
	var copy = filterDetails.slice();
	haxe_ui_filters_FilterParser.buildDefaults();
	var filterName = copy[0];
	HxOverrides.remove(copy,filterName);
	copy = haxe_ui_filters_FilterParser.copyFilterDefaults(filterName,copy);
	var grayscale = new haxe_ui_filters_Grayscale();
	grayscale.amount = copy[0];
	return grayscale;
};
haxe_ui_filters_FilterParser.buildDefaults = function() {
	if(haxe_ui_filters_FilterParser.filterParamDefaults != null) {
		return;
	}
	haxe_ui_filters_FilterParser.filterParamDefaults = new haxe_ds_StringMap();
	var v = [];
	haxe_ui_filters_FilterParser.filterParamDefaults.h["drop-shadow"] = v;
	var this1 = haxe_ui_filters_FilterParser.filterParamDefaults;
	var v = haxe_ui_filters_FilterParser.filterParamDefaults.h["drop-shadow"].concat([4,45,0,1,4,4,1,1,false,false,false]);
	this1.h["drop-shadow"] = v;
	var v = [];
	haxe_ui_filters_FilterParser.filterParamDefaults.h["blur"] = v;
	var this1 = haxe_ui_filters_FilterParser.filterParamDefaults;
	var v = haxe_ui_filters_FilterParser.filterParamDefaults.h["blur"].concat([1]);
	this1.h["blur"] = v;
	var v = [];
	haxe_ui_filters_FilterParser.filterParamDefaults.h["outline"] = v;
	var this1 = haxe_ui_filters_FilterParser.filterParamDefaults;
	var v = haxe_ui_filters_FilterParser.filterParamDefaults.h["outline"].concat([0,1]);
	this1.h["outline"] = v;
	var v = [];
	haxe_ui_filters_FilterParser.filterParamDefaults.h["grayscale"] = v;
	var this1 = haxe_ui_filters_FilterParser.filterParamDefaults;
	var v = haxe_ui_filters_FilterParser.filterParamDefaults.h["grayscale"].concat([100]);
	this1.h["grayscale"] = v;
};
var haxe_ui_filters_Grayscale = function() {
	haxe_ui_filters_Filter.call(this);
};
$hxClasses["haxe.ui.filters.Grayscale"] = haxe_ui_filters_Grayscale;
haxe_ui_filters_Grayscale.__name__ = "haxe.ui.filters.Grayscale";
haxe_ui_filters_Grayscale.__super__ = haxe_ui_filters_Filter;
haxe_ui_filters_Grayscale.prototype = $extend(haxe_ui_filters_Filter.prototype,{
	amount: null
	,__class__: haxe_ui_filters_Grayscale
});
var haxe_ui_filters_Outline = function() {
	haxe_ui_filters_Filter.call(this);
};
$hxClasses["haxe.ui.filters.Outline"] = haxe_ui_filters_Outline;
haxe_ui_filters_Outline.__name__ = "haxe.ui.filters.Outline";
haxe_ui_filters_Outline.__super__ = haxe_ui_filters_Filter;
haxe_ui_filters_Outline.prototype = $extend(haxe_ui_filters_Filter.prototype,{
	color: null
	,size: null
	,__class__: haxe_ui_filters_Outline
});
var haxe_ui_focus_FocusInfo = function() {
};
$hxClasses["haxe.ui.focus.FocusInfo"] = haxe_ui_focus_FocusInfo;
haxe_ui_focus_FocusInfo.__name__ = "haxe.ui.focus.FocusInfo";
haxe_ui_focus_FocusInfo.prototype = {
	view: null
	,currentFocus: null
	,__class__: haxe_ui_focus_FocusInfo
};
var haxe_ui_focus_FocusManager = function() {
	this._views = [];
	this._focusInfo = new haxe_ds_ObjectMap();
	haxe_ui_core_Screen.get_instance().registerEvent("mousedown",$bind(this,this.onScreenMouseDown));
};
$hxClasses["haxe.ui.focus.FocusManager"] = haxe_ui_focus_FocusManager;
haxe_ui_focus_FocusManager.__name__ = "haxe.ui.focus.FocusManager";
haxe_ui_focus_FocusManager.__properties__ = {get_instance:"get_instance"};
haxe_ui_focus_FocusManager.get_instance = function() {
	if(haxe_ui_focus_FocusManager._instance == null) {
		haxe_ui_focus_FocusManager._instance = new haxe_ui_focus_FocusManager();
	}
	return haxe_ui_focus_FocusManager._instance;
};
haxe_ui_focus_FocusManager.prototype = {
	_views: null
	,_focusInfo: null
	,onScreenMouseDown: function(event) {
		var list = haxe_ui_core_Screen.get_instance().findComponentsUnderPoint(event.screenX,event.screenY);
		var _g = 0;
		while(_g < list.length) {
			var l = list[_g];
			++_g;
			if(js_Boot.__implements(l,haxe_ui_focus_IFocusable)) {
				return;
			}
		}
		this.set_focus(null);
	}
	,pushView: function(component) {
		this._views.push(component);
	}
	,hasView: function(component) {
		return this._views.indexOf(component) != -1;
	}
	,popView: function() {
		var c = this._views.pop();
		this._focusInfo.remove(c);
	}
	,removeView: function(component) {
		HxOverrides.remove(this._views,component);
	}
	,focusInfo: null
	,get_focusInfo: function() {
		if(this._views.length == 0) {
			return null;
		}
		var c = this._views[this._views.length - 1];
		var info = this._focusInfo.h[c.__id__];
		if(info == null) {
			info = new haxe_ui_focus_FocusInfo();
			info.view = c;
			this._focusInfo.set(c,info);
		}
		return info;
	}
	,get_focus: function() {
		if(this.get_focusInfo() == null) {
			return null;
		}
		return this.get_focusInfo().currentFocus;
	}
	,set_focus: function(value) {
		if(value != null && js_Boot.__implements(value,haxe_ui_focus_IFocusable) == false) {
			throw haxe_Exception.thrown("Component does not implement IFocusable");
		}
		if(this.get_focusInfo() == null) {
			return value;
		}
		if(this.get_focusInfo().currentFocus != null && this.get_focusInfo().currentFocus != value) {
			this.get_focusInfo().currentFocus.set_focus(false);
			this.get_focusInfo().currentFocus = null;
		}
		if(value != null) {
			this.get_focusInfo().currentFocus = value;
			this.get_focusInfo().currentFocus.set_focus(true);
		}
		haxe_ui_Toolkit.get_screen().set_focus(value);
		return this.get_focusInfo().currentFocus;
	}
	,focusNext: function() {
		if(this._views.length == 0) {
			return null;
		}
		var list = [];
		var info = this.get_focusInfo();
		var currentFocus = this.buildFocusableList(info.view,list);
		var index = -1;
		if(currentFocus != null) {
			index = list.indexOf(currentFocus);
		}
		var nextIndex = index + 1;
		if(nextIndex > list.length - 1) {
			nextIndex = 0;
		}
		var nextFocus = list[nextIndex];
		this.set_focus(nextFocus);
		return nextFocus;
	}
	,focusPrev: function() {
		if(this._views.length == 0) {
			return null;
		}
		var list = [];
		var info = this.get_focusInfo();
		var currentFocus = this.buildFocusableList(info.view,list);
		var index = -1;
		if(currentFocus != null) {
			index = list.indexOf(currentFocus);
		}
		var prevIndex = index - 1;
		if(prevIndex < 0) {
			prevIndex = list.length - 1;
		}
		var prevFocus = list[prevIndex];
		this.set_focus(prevFocus);
		return prevFocus;
	}
	,buildFocusableList: function(c,list) {
		var currentFocus = null;
		if(js_Boot.__implements(c,haxe_ui_focus_IFocusable)) {
			var f = c;
			if(f.get_allowFocus() == true) {
				if(f.get_focus() == true) {
					currentFocus = f;
				}
				list.push(f);
			}
		}
		var _g = 0;
		var _g1 = c._children == null ? [] : c._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			var f = this.buildFocusableList(child,list);
			if(f != null) {
				currentFocus = f;
			}
		}
		return currentFocus;
	}
	,__class__: haxe_ui_focus_FocusManager
	,__properties__: {set_focus:"set_focus",get_focus:"get_focus",get_focusInfo:"get_focusInfo"}
};
var haxe_ui_geom_Point = function(x,y) {
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this.x = x;
	this.y = y;
};
$hxClasses["haxe.ui.geom.Point"] = haxe_ui_geom_Point;
haxe_ui_geom_Point.__name__ = "haxe.ui.geom.Point";
haxe_ui_geom_Point.prototype = {
	x: null
	,y: null
	,__class__: haxe_ui_geom_Point
};
var haxe_ui_geom_Rectangle = function(left,top,width,height) {
	if(height == null) {
		height = 0;
	}
	if(width == null) {
		width = 0;
	}
	if(top == null) {
		top = 0;
	}
	if(left == null) {
		left = 0;
	}
	this._intersectionCache = null;
	this.left = left;
	this.top = top;
	this.width = width;
	this.height = height;
};
$hxClasses["haxe.ui.geom.Rectangle"] = haxe_ui_geom_Rectangle;
haxe_ui_geom_Rectangle.__name__ = "haxe.ui.geom.Rectangle";
haxe_ui_geom_Rectangle.prototype = {
	left: null
	,top: null
	,width: null
	,height: null
	,set: function(left,top,width,height) {
		if(height == null) {
			height = 0;
		}
		if(width == null) {
			width = 0;
		}
		if(top == null) {
			top = 0;
		}
		if(left == null) {
			left = 0;
		}
		this.left = left;
		this.top = top;
		this.width = width;
		this.height = height;
	}
	,get_right: function() {
		return this.left + this.width;
	}
	,set_right: function(value) {
		this.width = value - this.left;
		return value;
	}
	,get_bottom: function() {
		return this.top + this.height;
	}
	,set_bottom: function(value) {
		this.height = value - this.top;
		return value;
	}
	,inflate: function(dx,dy) {
		this.left -= dx;
		this.width += dx * 2;
		this.top -= dy;
		this.height += dy * 2;
	}
	,containsPoint: function(x,y) {
		if(x >= this.left && x < this.left + this.width && y >= this.top && y < this.top + this.height) {
			return true;
		}
		return false;
	}
	,containsRect: function(rect) {
		if(rect.width <= 0 || rect.height <= 0) {
			if(rect.left > this.left && rect.top > this.top && rect.get_right() < this.get_right()) {
				return rect.get_bottom() < this.get_bottom();
			} else {
				return false;
			}
		} else if(rect.left >= this.left && rect.top >= this.top && rect.get_right() <= this.get_right()) {
			return rect.get_bottom() <= this.get_bottom();
		} else {
			return false;
		}
	}
	,intersects: function(rect) {
		var x0 = this.left < rect.left ? rect.left : this.left;
		var x1 = this.get_right() > rect.get_right() ? rect.get_right() : this.get_right();
		if(x1 <= x0) {
			return false;
		}
		var y0 = this.top < rect.top ? rect.top : this.top;
		var y1 = this.get_bottom() > rect.get_bottom() ? rect.get_bottom() : this.get_bottom();
		return y1 > y0;
	}
	,_intersectionCache: null
	,intersection: function(rect,noAlloc) {
		if(noAlloc == null) {
			noAlloc = true;
		}
		if(noAlloc == true && this._intersectionCache == null) {
			this._intersectionCache = new haxe_ui_geom_Rectangle();
		}
		var x0 = this.left < rect.left ? rect.left : this.left;
		var x1 = this.get_right() > rect.get_right() ? rect.get_right() : this.get_right();
		if(x1 <= x0) {
			if(noAlloc == true) {
				this._intersectionCache.set();
				return this._intersectionCache;
			} else {
				return new haxe_ui_geom_Rectangle();
			}
		}
		var y0 = this.top < rect.top ? rect.top : this.top;
		var y1 = this.get_bottom() > rect.get_bottom() ? rect.get_bottom() : this.get_bottom();
		if(y1 <= y0) {
			if(noAlloc == true) {
				this._intersectionCache.set();
				return this._intersectionCache;
			} else {
				return new haxe_ui_geom_Rectangle();
			}
		}
		var r = null;
		if(noAlloc == true) {
			r = this._intersectionCache;
		} else {
			r = new haxe_ui_geom_Rectangle();
		}
		r.set(x0,y0,x1 - x0,y1 - y0);
		return r;
	}
	,toInts: function() {
		this.left = this.left | 0;
		this.top = this.top | 0;
		this.width = this.width | 0;
		this.height = this.height | 0;
	}
	,copy: function() {
		return new haxe_ui_geom_Rectangle(this.left,this.top,this.width,this.height);
	}
	,toString: function() {
		return "{left: " + this.left + ", top: " + this.top + ", bottom: " + this.get_bottom() + ", right: " + this.get_right() + ", width: " + this.width + ", height: " + this.height + "}";
	}
	,__class__: haxe_ui_geom_Rectangle
	,__properties__: {set_bottom:"set_bottom",get_bottom:"get_bottom",set_right:"set_right",get_right:"get_right"}
};
var haxe_ui_geom_Size = function(width,height) {
	if(height == null) {
		height = 0;
	}
	if(width == null) {
		width = 0;
	}
	this.width = width;
	this.height = height;
};
$hxClasses["haxe.ui.geom.Size"] = haxe_ui_geom_Size;
haxe_ui_geom_Size.__name__ = "haxe.ui.geom.Size";
haxe_ui_geom_Size.prototype = {
	width: null
	,height: null
	,round: function() {
		this.width = Math.round(this.width);
		this.height = Math.round(this.height);
	}
	,toString: function() {
		return "[" + this.width + "x" + this.height + "]";
	}
	,__class__: haxe_ui_geom_Size
};
var haxe_ui_geom_Slice9 = function() { };
$hxClasses["haxe.ui.geom.Slice9"] = haxe_ui_geom_Slice9;
haxe_ui_geom_Slice9.__name__ = "haxe.ui.geom.Slice9";
haxe_ui_geom_Slice9.buildRects = function(w,h,bitmapWidth,bitmapHeight,slice) {
	var srcRects = haxe_ui_geom_Slice9.buildSrcRects(bitmapWidth,bitmapHeight,slice);
	var dstRects = haxe_ui_geom_Slice9.buildDstRects(w,h,srcRects);
	return { src : srcRects, dst : dstRects};
};
haxe_ui_geom_Slice9.buildSrcRects = function(bitmapWidth,bitmapHeight,slice) {
	var x1 = slice.left;
	var y1 = slice.top;
	var x2 = slice.get_right();
	var y2 = slice.get_bottom();
	var srcRects = [];
	srcRects.push(new haxe_ui_geom_Rectangle(0,0,x1,y1));
	srcRects.push(new haxe_ui_geom_Rectangle(x1,0,x2 - x1,y1));
	srcRects.push(new haxe_ui_geom_Rectangle(x2,0,bitmapWidth - x2,y1));
	srcRects.push(new haxe_ui_geom_Rectangle(0,y1,x1,y2 - y1));
	srcRects.push(new haxe_ui_geom_Rectangle(x1,y1,x2 - x1,y2 - y1));
	srcRects.push(new haxe_ui_geom_Rectangle(x2,y1,bitmapWidth - x2,y2 - y1));
	srcRects.push(new haxe_ui_geom_Rectangle(0,y2,x1,bitmapHeight - y2));
	srcRects.push(new haxe_ui_geom_Rectangle(x1,y2,x2 - x1,bitmapHeight - y2));
	srcRects.push(new haxe_ui_geom_Rectangle(x2,y2,bitmapWidth - x2,bitmapHeight - y2));
	return srcRects;
};
haxe_ui_geom_Slice9.buildDstRects = function(w,h,srcRects) {
	var dstRects = [];
	dstRects.push(new haxe_ui_geom_Rectangle(0,0,srcRects[0].width,srcRects[0].height));
	dstRects.push(new haxe_ui_geom_Rectangle(srcRects[0].width,0,w - srcRects[0].width - srcRects[2].width,srcRects[1].height));
	dstRects.push(new haxe_ui_geom_Rectangle(w - srcRects[2].width,0,srcRects[2].width,srcRects[2].height));
	dstRects.push(new haxe_ui_geom_Rectangle(0,srcRects[0].height,srcRects[3].width,h - srcRects[0].height - srcRects[6].height));
	dstRects.push(new haxe_ui_geom_Rectangle(srcRects[3].width,srcRects[0].height,w - srcRects[3].width - srcRects[5].width,h - srcRects[1].height - srcRects[7].height));
	dstRects.push(new haxe_ui_geom_Rectangle(w - srcRects[5].width,srcRects[2].height,srcRects[5].width,h - srcRects[2].height - srcRects[8].height));
	dstRects.push(new haxe_ui_geom_Rectangle(0,h - srcRects[6].height,srcRects[6].width,srcRects[6].height));
	dstRects.push(new haxe_ui_geom_Rectangle(srcRects[6].width,h - srcRects[7].height,w - srcRects[6].width - srcRects[8].width,srcRects[7].height));
	dstRects.push(new haxe_ui_geom_Rectangle(w - srcRects[8].width,h - srcRects[8].height,srcRects[8].width,srcRects[8].height));
	return dstRects;
};
var haxe_ui_layouts_AbsoluteLayout = function() {
	haxe_ui_layouts_DefaultLayout.call(this);
};
$hxClasses["haxe.ui.layouts.AbsoluteLayout"] = haxe_ui_layouts_AbsoluteLayout;
haxe_ui_layouts_AbsoluteLayout.__name__ = "haxe.ui.layouts.AbsoluteLayout";
haxe_ui_layouts_AbsoluteLayout.__super__ = haxe_ui_layouts_DefaultLayout;
haxe_ui_layouts_AbsoluteLayout.prototype = $extend(haxe_ui_layouts_DefaultLayout.prototype,{
	repositionChildren: function() {
	}
	,__class__: haxe_ui_layouts_AbsoluteLayout
});
var haxe_ui_layouts_DelegateLayout = function(size) {
	haxe_ui_layouts_DefaultLayout.call(this);
	this._size = size;
};
$hxClasses["haxe.ui.layouts.DelegateLayout"] = haxe_ui_layouts_DelegateLayout;
haxe_ui_layouts_DelegateLayout.__name__ = "haxe.ui.layouts.DelegateLayout";
haxe_ui_layouts_DelegateLayout.__super__ = haxe_ui_layouts_DefaultLayout;
haxe_ui_layouts_DelegateLayout.prototype = $extend(haxe_ui_layouts_DefaultLayout.prototype,{
	_size: null
	,calcAutoSize: function(exclusions) {
		this._size.component = this.get_component();
		var cx = this._size.get_width();
		var cy = this._size.get_height();
		if(this._size.getBool("includePadding",false) == true) {
			cx += this.get_paddingLeft() + this.get_paddingRight();
			cy += this.get_paddingTop() + this.get_paddingBottom();
		}
		var size = new haxe_ui_geom_Size(cx,cy);
		return size;
	}
	,get_usableSize: function() {
		var size = haxe_ui_layouts_DefaultLayout.prototype.get_usableSize.call(this);
		this._size.component = this.get_component();
		size.width -= this._size.get_usableWidthModifier();
		size.height -= this._size.get_usableHeightModifier();
		return size;
	}
	,__class__: haxe_ui_layouts_DelegateLayout
});
var haxe_ui_layouts_DelegateLayoutSize = function() {
};
$hxClasses["haxe.ui.layouts.DelegateLayoutSize"] = haxe_ui_layouts_DelegateLayoutSize;
haxe_ui_layouts_DelegateLayoutSize.__name__ = "haxe.ui.layouts.DelegateLayoutSize";
haxe_ui_layouts_DelegateLayoutSize.prototype = {
	component: null
	,config: null
	,width: null
	,get_width: function() {
		return 0;
	}
	,height: null
	,get_height: function() {
		return 0;
	}
	,usableWidthModifier: null
	,get_usableWidthModifier: function() {
		return 0;
	}
	,usableHeightModifier: null
	,get_usableHeightModifier: function() {
		return 0;
	}
	,getString: function(name,defaultValue) {
		if(this.config == null) {
			return defaultValue;
		}
		if(Object.prototype.hasOwnProperty.call(this.config.h,name) == false) {
			return defaultValue;
		}
		return this.config.h[name];
	}
	,getInt: function(name,defaultValue) {
		if(defaultValue == null) {
			defaultValue = 0;
		}
		var v = this.getString(name);
		if(v == null) {
			return defaultValue;
		}
		return Std.parseInt(v);
	}
	,getBool: function(name,defaultValue) {
		if(defaultValue == null) {
			defaultValue = false;
		}
		var v = this.getString(name);
		if(v == null) {
			return defaultValue;
		}
		return v == "true";
	}
	,__class__: haxe_ui_layouts_DelegateLayoutSize
	,__properties__: {get_usableHeightModifier:"get_usableHeightModifier",get_usableWidthModifier:"get_usableWidthModifier",get_height:"get_height",get_width:"get_width"}
};
var haxe_ui_layouts_HorizontalLayout = function() {
	haxe_ui_layouts_DefaultLayout.call(this);
	this._calcFullWidths = true;
};
$hxClasses["haxe.ui.layouts.HorizontalLayout"] = haxe_ui_layouts_HorizontalLayout;
haxe_ui_layouts_HorizontalLayout.__name__ = "haxe.ui.layouts.HorizontalLayout";
haxe_ui_layouts_HorizontalLayout.__super__ = haxe_ui_layouts_DefaultLayout;
haxe_ui_layouts_HorizontalLayout.prototype = $extend(haxe_ui_layouts_DefaultLayout.prototype,{
	repositionChildren: function() {
		var xpos = this.get_paddingLeft();
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			var ypos = 0;
			switch(this.verticalAlign(child)) {
			case "bottom":
				if(child.get_componentHeight() < this.get_component().get_componentHeight()) {
					ypos = this.get_component().get_componentHeight() - (child.get_componentHeight() + this.get_paddingBottom() + this.marginTop(child));
				}
				break;
			case "center":
				ypos = (this.get_component().get_componentHeight() - child.get_componentHeight()) / 2 + this.marginTop(child) - this.marginBottom(child);
				break;
			default:
				ypos = this.get_paddingTop() + this.marginTop(child);
			}
			child.moveComponent(xpos + this.marginLeft(child),ypos);
			xpos += child.get_componentWidth() + this.get_horizontalSpacing();
		}
	}
	,get_usableSize: function() {
		var size = haxe_ui_layouts_DefaultLayout.prototype.get_usableSize.call(this);
		var _this = this.get_component();
		var visibleChildren = (_this._children == null ? [] : _this._children).length;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				--visibleChildren;
				continue;
			}
			if(child.get_componentWidth() > 0 && (child.get_percentWidth() == null || this.fixedMinWidth(child) == true)) {
				size.width -= child.get_componentWidth() + this.marginLeft(child) + this.marginRight(child);
			}
		}
		if(visibleChildren > 1) {
			size.width -= this.get_horizontalSpacing() * (visibleChildren - 1);
		}
		if(size.width < 0) {
			size.width = 0;
		}
		return size;
	}
	,__class__: haxe_ui_layouts_HorizontalLayout
});
var haxe_ui_layouts_HorizontalContinuousLayout = function() {
	haxe_ui_layouts_HorizontalLayout.call(this);
};
$hxClasses["haxe.ui.layouts.HorizontalContinuousLayout"] = haxe_ui_layouts_HorizontalContinuousLayout;
haxe_ui_layouts_HorizontalContinuousLayout.__name__ = "haxe.ui.layouts.HorizontalContinuousLayout";
haxe_ui_layouts_HorizontalContinuousLayout.__super__ = haxe_ui_layouts_HorizontalLayout;
haxe_ui_layouts_HorizontalContinuousLayout.prototype = $extend(haxe_ui_layouts_HorizontalLayout.prototype,{
	resizeChildren: function() {
	}
	,repositionChildren: function() {
		if(this.get_component().get_autoWidth() == true) {
			haxe_ui_layouts_HorizontalLayout.prototype.repositionChildren.call(this);
			return;
		}
		var ucx = this.get_usableWidth();
		if(ucx <= 0) {
			return;
		}
		var ucx = this.get_component().get_componentWidth() - (this.get_paddingLeft() + this.get_paddingRight());
		var ucy = this.get_component().get_componentHeight() - (this.get_paddingTop() + this.get_paddingBottom());
		var dimensions = [];
		var heights = [];
		var row = 0;
		var usedCX = 0;
		var xpos = this.get_paddingLeft();
		var ypos = this.get_paddingTop();
		var rowCY = 0;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			var rc = new haxe_ui_layouts_ComponentRectangle(child.get_left(),child.get_top(),child.get_componentWidth(),child.get_componentHeight());
			if(child.get_percentWidth() != null) {
				rc.width = ucx * child.get_percentWidth() / 100;
			} else {
				usedCX += this.get_horizontalSpacing();
			}
			if(child.get_percentHeight() != null) {
				rc.height = ucy * child.get_percentHeight() / 100;
			}
			rc.component = child;
			usedCX += rc.width;
			if(usedCX > ucx) {
				heights.push(rowCY);
				ypos += rowCY + this.get_verticalSpacing();
				xpos = this.get_paddingLeft();
				usedCX = rc.width;
				rowCY = 0;
				++row;
			}
			if(dimensions.length <= row) {
				dimensions.push([]);
			}
			if(dimensions[row] == null) {
				ypos -= this.get_verticalSpacing();
				--row;
				dimensions[row].pop();
			}
			rc.left = xpos;
			rc.top = ypos;
			dimensions[row].push(rc);
			xpos += rc.width;
			if(rc.height > rowCY) {
				rowCY = rc.height;
			}
		}
		if(rowCY > 0) {
			heights.push(rowCY);
		}
		var x = 0;
		var _g = 0;
		while(_g < dimensions.length) {
			var r = dimensions[_g];
			++_g;
			var height = heights[x];
			var spaceX = (r.length - 1) / r.length * this.get_horizontalSpacing();
			var n = 0;
			var _g1 = 0;
			while(_g1 < r.length) {
				var c = r[_g1];
				++_g1;
				switch(this.verticalAlign(c.component)) {
				case "bottom":
					c.top += height - c.height;
					break;
				case "center":
					c.top += height / 2 - c.height / 2;
					break;
				default:
				}
				if(c.component.get_percentWidth() != null) {
					c.left += n * (this.get_horizontalSpacing() - spaceX);
					c.width -= spaceX;
				} else {
					c.left += n * this.get_horizontalSpacing();
				}
				c.apply();
				++n;
			}
			++x;
		}
	}
	,get_usableSize: function() {
		if(this.get_component().get_autoWidth() == true) {
			return haxe_ui_layouts_HorizontalLayout.prototype.get_usableSize.call(this);
		}
		var ucx = 0;
		if(this._component.get_componentWidth() != null) {
			ucx = this._component.get_componentWidth();
			ucx -= this.get_paddingLeft() + this.get_paddingRight();
		}
		var ucy = 0;
		if(this._component.get_componentHeight() != null) {
			ucy = this._component.get_componentHeight();
			ucy -= this.get_paddingTop() + this.get_paddingBottom();
		}
		return new haxe_ui_geom_Size(ucx,ucy);
	}
	,__class__: haxe_ui_layouts_HorizontalContinuousLayout
});
var haxe_ui_layouts_ComponentRectangle = function(left,top,width,height) {
	haxe_ui_geom_Rectangle.call(this,left,top,width,height);
};
$hxClasses["haxe.ui.layouts.ComponentRectangle"] = haxe_ui_layouts_ComponentRectangle;
haxe_ui_layouts_ComponentRectangle.__name__ = "haxe.ui.layouts.ComponentRectangle";
haxe_ui_layouts_ComponentRectangle.__super__ = haxe_ui_geom_Rectangle;
haxe_ui_layouts_ComponentRectangle.prototype = $extend(haxe_ui_geom_Rectangle.prototype,{
	component: null
	,apply: function() {
		this.component.moveComponent(this.left,this.top);
		this.component.resizeComponent(this.width,this.height);
	}
	,__class__: haxe_ui_layouts_ComponentRectangle
});
var haxe_ui_layouts_HorizontalGridLayout = function() {
	this._rows = 1;
	haxe_ui_layouts_Layout.call(this);
};
$hxClasses["haxe.ui.layouts.HorizontalGridLayout"] = haxe_ui_layouts_HorizontalGridLayout;
haxe_ui_layouts_HorizontalGridLayout.__name__ = "haxe.ui.layouts.HorizontalGridLayout";
haxe_ui_layouts_HorizontalGridLayout.__super__ = haxe_ui_layouts_Layout;
haxe_ui_layouts_HorizontalGridLayout.prototype = $extend(haxe_ui_layouts_Layout.prototype,{
	_rows: null
	,get_rows: function() {
		return this._rows;
	}
	,set_rows: function(value) {
		if(this._rows == value) {
			return value;
		}
		this._rows = value;
		if(this._component != null) {
			var _this = this._component;
			if(!(_this._layout == null || _this._layoutLocked == true)) {
				_this.invalidateComponent("layout",false);
			}
		}
		return value;
	}
	,get_usableSize: function() {
		var size = haxe_ui_layouts_Layout.prototype.get_usableSize.call(this);
		var columnWidths = this.calcColumnWidths(size,false);
		var rowHeights = this.calcRowHeights(size,false);
		var _g = 0;
		while(_g < columnWidths.length) {
			var columnWidth = columnWidths[_g];
			++_g;
			size.width -= columnWidth;
		}
		var _g = 0;
		while(_g < rowHeights.length) {
			var rowHeight = rowHeights[_g];
			++_g;
			size.height -= rowHeight;
		}
		var _this = this.get_component();
		if((_this._children == null ? [] : _this._children).length > 1) {
			var _this = this.get_component();
			var columns = Math.ceil((_this._children == null ? [] : _this._children).length / this._rows);
			size.width -= this.get_horizontalSpacing() * (columns - 1);
			size.height -= this.get_verticalSpacing() * (this.get_rows() - 1);
		}
		if(size.width < 0) {
			size.width = 0;
		}
		if(size.height < 0) {
			size.height = 0;
		}
		return size;
	}
	,resizeChildren: function() {
		var size = this.get_usableSize();
		var columnWidths = this.calcColumnWidths(size,true);
		var rowHeights = this.calcRowHeights(size,true);
		var explicitWidths = this.calcExplicitWidths();
		var explicitHeights = this.calcExplicitHeights();
		var rowIndex = 0;
		var columnIndex = 0;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			var cx = null;
			var cy = null;
			if(child.get_percentWidth() != null) {
				var ucx = columnWidths[columnIndex];
				if(explicitWidths[columnIndex] == false) {
					cx = ucx;
				} else {
					cx = ucx * child.get_percentWidth() / 100;
				}
			}
			if(child.get_percentHeight() != null) {
				var ucy = rowHeights[rowIndex];
				if(explicitHeights[rowIndex] == false) {
					cy = ucy;
				} else {
					cy = ucy * child.get_percentHeight() / 100;
				}
			}
			child.resizeComponent(cx,cy);
			++rowIndex;
			if(rowIndex >= this._rows) {
				rowIndex = 0;
				++columnIndex;
			}
		}
	}
	,repositionChildren: function() {
		var size = this.get_usableSize();
		var columnWidths = this.calcColumnWidths(size,true);
		var rowHeights = this.calcRowHeights(size,true);
		var rowIndex = 0;
		var columnIndex = 0;
		var xpos = this.get_paddingLeft();
		var ypos = this.get_paddingTop();
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			var halign = this.horizontalAlign(child);
			var valign = this.verticalAlign(child);
			var xposChild = 0;
			var yposChild = 0;
			switch(halign) {
			case "center":
				xposChild = xpos + (columnWidths[columnIndex] - child.get_componentWidth()) * 0.5 + this.marginLeft(child) - this.marginRight(child);
				break;
			case "right":
				xposChild = xpos + (columnWidths[columnIndex] - child.get_componentWidth()) + this.marginLeft(child) - this.marginRight(child);
				break;
			default:
				xposChild = xpos + this.marginLeft(child) - this.marginRight(child);
			}
			switch(valign) {
			case "bottom":
				yposChild = ypos + (rowHeights[rowIndex] - child.get_componentHeight()) + this.marginTop(child) - this.marginBottom(child);
				break;
			case "center":
				yposChild = ypos + (rowHeights[rowIndex] - child.get_componentHeight()) * 0.5 + this.marginTop(child) - this.marginBottom(child);
				break;
			default:
				yposChild = ypos + this.marginTop(child) - this.marginBottom(child);
			}
			child.moveComponent(xposChild,yposChild);
			ypos += rowHeights[rowIndex] + this.get_verticalSpacing();
			++rowIndex;
			if(rowIndex >= this._rows) {
				ypos = this.get_paddingTop();
				xpos += columnWidths[columnIndex] + this.get_horizontalSpacing();
				rowIndex = 0;
				++columnIndex;
			}
		}
	}
	,calcColumnWidths: function(usableSize,includePercentage) {
		var _this = this.get_component();
		var visibleChildren = (_this._children == null ? [] : _this._children).length;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				--visibleChildren;
			}
		}
		var columnCount = visibleChildren / this._rows | 0;
		if(visibleChildren % this._rows != 0) {
			++columnCount;
		}
		var columnWidths = [];
		var _g = 0;
		var _g1 = columnCount;
		while(_g < _g1) {
			var _ = _g++;
			columnWidths.push(0);
		}
		var rowIndex = 0;
		var columnIndex = 0;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			if(child.get_percentWidth() == null) {
				if(child.get_componentWidth() > columnWidths[columnIndex]) {
					columnWidths[columnIndex] = child.get_componentWidth();
				}
			}
			++rowIndex;
			if(rowIndex >= this._rows) {
				rowIndex = 0;
				++columnIndex;
			}
		}
		if(includePercentage) {
			rowIndex = 0;
			columnIndex = 0;
			var _g = 0;
			var _this = this.get_component();
			var _g1 = _this._children == null ? [] : _this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				if(child.get_includeInLayout() == false) {
					continue;
				}
				if(child.get_percentWidth() != null) {
					var cx = usableSize.width * child.get_percentWidth() / 100;
					if(cx > columnWidths[rowIndex] && this._rows == 1) {
						columnWidths[columnIndex] = cx;
					} else if(usableSize.width > columnWidths[columnIndex]) {
						columnWidths[columnIndex] = usableSize.width;
					}
				}
				++rowIndex;
				if(rowIndex >= this._rows) {
					rowIndex = 0;
					++columnIndex;
				}
			}
		}
		return columnWidths;
	}
	,calcRowHeights: function(usableSize,includePercentage) {
		var rowHeights = [];
		var _g = 0;
		var _g1 = this._rows;
		while(_g < _g1) {
			var _ = _g++;
			rowHeights.push(0);
		}
		var rowIndex = 0;
		var columnIndex = 0;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			if(child.get_percentHeight() == null) {
				if(child.get_componentHeight() > rowHeights[rowIndex]) {
					rowHeights[rowIndex] = child.get_componentHeight();
				}
			}
			++rowIndex;
			if(rowIndex >= this._rows) {
				rowIndex = 0;
				++columnIndex;
			}
		}
		if(includePercentage) {
			rowIndex = 0;
			columnIndex = 0;
			var _g = 0;
			var _this = this.get_component();
			var _g1 = _this._children == null ? [] : _this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				if(child.get_includeInLayout() == false) {
					continue;
				}
				if(child.get_percentHeight() != null) {
					var cy = usableSize.height * child.get_percentHeight() / 100;
					if(cy > rowHeights[rowIndex]) {
						rowHeights[rowIndex] = cy;
					}
				}
				++rowIndex;
				if(rowIndex >= this._rows) {
					rowIndex = 0;
					++columnIndex;
				}
			}
		}
		return rowHeights;
	}
	,calcExplicitWidths: function() {
		var _this = this.get_component();
		var visibleChildren = (_this._children == null ? [] : _this._children).length;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				--visibleChildren;
			}
		}
		var columnCount = visibleChildren / this._rows | 0;
		if(visibleChildren % this._rows != 0) {
			++columnCount;
		}
		var explicitWidths = [];
		var _g = 0;
		var _g1 = columnCount;
		while(_g < _g1) {
			var _ = _g++;
			explicitWidths.push(false);
		}
		var rowIndex = 0;
		var columnIndex = 0;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			if(child.get_percentWidth() == null && child.get_componentWidth() > 0) {
				explicitWidths[rowIndex % this._rows] = true;
			}
			++rowIndex;
			if(rowIndex >= this._rows) {
				rowIndex = 0;
				++columnIndex;
			}
		}
		return explicitWidths;
	}
	,calcExplicitHeights: function() {
		var explicitHeights = [];
		var _g = 0;
		var _g1 = this._rows;
		while(_g < _g1) {
			var _ = _g++;
			explicitHeights.push(false);
		}
		var rowIndex = 0;
		var columnIndex = 0;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			if(child.get_percentHeight() == null && child.get_componentHeight() > 0) {
				explicitHeights[rowIndex] = true;
			}
			++rowIndex;
			if(rowIndex >= this._rows) {
				rowIndex = 0;
				++columnIndex;
			}
		}
		return explicitHeights;
	}
	,__class__: haxe_ui_layouts_HorizontalGridLayout
	,__properties__: $extend(haxe_ui_layouts_Layout.prototype.__properties__,{set_rows:"set_rows",get_rows:"get_rows"})
});
var haxe_ui_layouts_LayoutFactory = function() { };
$hxClasses["haxe.ui.layouts.LayoutFactory"] = haxe_ui_layouts_LayoutFactory;
haxe_ui_layouts_LayoutFactory.__name__ = "haxe.ui.layouts.LayoutFactory";
haxe_ui_layouts_LayoutFactory.createFromName = function(name) {
	switch(name) {
	case "absolute":
		return new haxe_ui_layouts_AbsoluteLayout();
	case "continuous horizontal":case "continuousHorizontal":
		return new haxe_ui_layouts_HorizontalContinuousLayout();
	case "horizontal":
		return new haxe_ui_layouts_HorizontalLayout();
	case "horizontal grid":case "horizontalgrid":
		return new haxe_ui_layouts_HorizontalGridLayout();
	case "vertical":
		return new haxe_ui_layouts_VerticalLayout();
	case "vertical grid":case "verticalgrid":
		return new haxe_ui_layouts_VerticalGridLayout();
	}
	return new haxe_ui_layouts_DefaultLayout();
};
var haxe_ui_layouts_VerticalGridLayout = function() {
	this._columns = 1;
	haxe_ui_layouts_Layout.call(this);
};
$hxClasses["haxe.ui.layouts.VerticalGridLayout"] = haxe_ui_layouts_VerticalGridLayout;
haxe_ui_layouts_VerticalGridLayout.__name__ = "haxe.ui.layouts.VerticalGridLayout";
haxe_ui_layouts_VerticalGridLayout.__super__ = haxe_ui_layouts_Layout;
haxe_ui_layouts_VerticalGridLayout.prototype = $extend(haxe_ui_layouts_Layout.prototype,{
	_columns: null
	,get_columns: function() {
		return this._columns;
	}
	,set_columns: function(value) {
		if(this._columns == value) {
			return value;
		}
		this._columns = value;
		if(this._component != null) {
			var _this = this._component;
			if(!(_this._layout == null || _this._layoutLocked == true)) {
				_this.invalidateComponent("layout",false);
			}
		}
		return value;
	}
	,get_usableSize: function() {
		var size = haxe_ui_layouts_Layout.prototype.get_usableSize.call(this);
		var columnWidths = this.calcColumnWidths(size,false);
		var rowHeights = this.calcRowHeights(size,false);
		var _g = 0;
		while(_g < columnWidths.length) {
			var columnWidth = columnWidths[_g];
			++_g;
			size.width -= columnWidth;
		}
		var _g = 0;
		while(_g < rowHeights.length) {
			var rowHeight = rowHeights[_g];
			++_g;
			size.height -= rowHeight;
		}
		var _this = this.get_component();
		if((_this._children == null ? [] : _this._children).length > 1) {
			var _this = this.get_component();
			var rows = Math.ceil((_this._children == null ? [] : _this._children).length / this.get_columns());
			var c = this.get_columns();
			var _this = this.get_component();
			var c1 = Math.min(c,(_this._children == null ? [] : _this._children).length);
			size.width -= this.get_horizontalSpacing() * (c1 - 1);
			size.height -= this.get_verticalSpacing() * (rows - 1);
		}
		if(size.width < 0) {
			size.width = 0;
		}
		if(size.height < 0) {
			size.height = 0;
		}
		return size;
	}
	,resizeChildren: function() {
		var size = this.get_usableSize();
		var columnWidths = this.calcColumnWidths(size,true);
		var rowHeights = this.calcRowHeights(size,true);
		var explicitWidths = this.calcExplicitWidths();
		var explicitHeights = this.calcExplicitHeights();
		var rowIndex = 0;
		var columnIndex = 0;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			var cx = null;
			var cy = null;
			if(child.get_percentWidth() != null) {
				var ucx = columnWidths[columnIndex];
				if(explicitWidths[columnIndex] == false) {
					cx = ucx;
				} else {
					cx = ucx * child.get_percentWidth() / 100;
				}
			}
			if(child.get_percentHeight() != null) {
				var ucy = rowHeights[rowIndex];
				if(explicitHeights[rowIndex] == false) {
					cy = ucy;
				} else {
					cy = ucy * child.get_percentHeight() / 100;
				}
			}
			child.resizeComponent(cx,cy);
			++columnIndex;
			if(columnIndex >= this._columns) {
				columnIndex = 0;
				++rowIndex;
			}
		}
	}
	,repositionChildren: function() {
		var size = this.get_usableSize();
		var columnWidths = this.calcColumnWidths(size,true);
		var rowHeights = this.calcRowHeights(size,true);
		var rowIndex = 0;
		var columnIndex = 0;
		var xpos = this.get_paddingLeft();
		var ypos = this.get_paddingTop();
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			var halign = this.horizontalAlign(child);
			var valign = this.verticalAlign(child);
			var xposChild = 0;
			var yposChild = 0;
			switch(halign) {
			case "center":
				xposChild = xpos + (columnWidths[columnIndex] - child.get_componentWidth()) * 0.5 + this.marginLeft(child) - this.marginRight(child);
				break;
			case "right":
				xposChild = xpos + (columnWidths[columnIndex] - child.get_componentWidth()) + this.marginLeft(child) - this.marginRight(child);
				break;
			default:
				xposChild = xpos + this.marginLeft(child) - this.marginRight(child);
			}
			switch(valign) {
			case "bottom":
				yposChild = ypos + (rowHeights[rowIndex] - child.get_componentHeight()) + this.marginTop(child) - this.marginBottom(child);
				break;
			case "center":
				yposChild = ypos + (rowHeights[rowIndex] - child.get_componentHeight()) * 0.5 + this.marginTop(child) - this.marginBottom(child);
				break;
			default:
				yposChild = ypos + this.marginTop(child) - this.marginBottom(child);
			}
			child.moveComponent(xposChild,yposChild);
			xpos += columnWidths[columnIndex] + this.get_horizontalSpacing();
			++columnIndex;
			if(columnIndex >= this.get_columns()) {
				xpos = this.get_paddingLeft();
				ypos += rowHeights[rowIndex] + this.get_verticalSpacing();
				columnIndex = 0;
				++rowIndex;
			}
		}
	}
	,calcColumnWidths: function(usableSize,includePercentage) {
		var columnWidths = [];
		var _g = 0;
		var _g1 = this._columns;
		while(_g < _g1) {
			var _ = _g++;
			columnWidths.push(0);
		}
		var rowIndex = 0;
		var columnIndex = 0;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			if(child.get_percentWidth() == null) {
				if(child.get_componentWidth() > columnWidths[columnIndex]) {
					columnWidths[columnIndex] = child.get_componentWidth();
				}
			}
			++columnIndex;
			if(columnIndex >= this._columns) {
				columnIndex = 0;
				++rowIndex;
			}
		}
		if(includePercentage) {
			rowIndex = 0;
			columnIndex = 0;
			var fullWidthsCounts = [0];
			var _g = 0;
			var _this = this.get_component();
			var _g1 = _this._children == null ? [] : _this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				if(child.get_includeInLayout() == false) {
					continue;
				}
				if(child.get_percentWidth() != null && child.get_percentWidth() == 100) {
					fullWidthsCounts[rowIndex]++;
				}
				++columnIndex;
				if(columnIndex >= this._columns) {
					columnIndex = 0;
					++rowIndex;
					fullWidthsCounts.push(0);
				}
			}
			rowIndex = 0;
			columnIndex = 0;
			var _g = 0;
			var _this = this.get_component();
			var _g1 = _this._children == null ? [] : _this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				if(child.get_includeInLayout() == false) {
					continue;
				}
				if(child.get_percentWidth() != null) {
					var childPercentWidth = child.get_percentWidth();
					if(childPercentWidth == 100 && fullWidthsCounts[rowIndex] != 0) {
						var f = fullWidthsCounts[rowIndex];
						if(rowIndex > 0 && fullWidthsCounts[rowIndex - 1] != 0) {
							f = fullWidthsCounts[rowIndex - 1];
						}
						childPercentWidth = 100 / f;
					}
					var cx = usableSize.width * childPercentWidth / 100;
					if(cx > columnWidths[columnIndex]) {
						columnWidths[columnIndex] = cx;
					}
				}
				++columnIndex;
				if(columnIndex >= this._columns) {
					columnIndex = 0;
					++rowIndex;
				}
			}
		}
		return columnWidths;
	}
	,calcRowHeights: function(usableSize,includePercentage) {
		var _this = this.get_component();
		var visibleChildren = (_this._children == null ? [] : _this._children).length;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				--visibleChildren;
			}
		}
		var rowCount = visibleChildren / this._columns | 0;
		if(visibleChildren % this._columns != 0) {
			++rowCount;
		}
		var rowHeights = [];
		var _g = 0;
		var _g1 = rowCount;
		while(_g < _g1) {
			var _ = _g++;
			rowHeights.push(0);
		}
		var rowIndex = 0;
		var columnIndex = 0;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			if(child.get_percentHeight() == null) {
				if(child.get_height() > rowHeights[rowIndex]) {
					rowHeights[rowIndex] = child.get_height();
				}
			}
			++columnIndex;
			if(columnIndex >= this._columns) {
				columnIndex = 0;
				++rowIndex;
			}
		}
		if(includePercentage) {
			rowIndex = 0;
			columnIndex = 0;
			var newRow = true;
			var fullHeightRowCount = 0;
			var _g = 0;
			var _this = this.get_component();
			var _g1 = _this._children == null ? [] : _this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				if(child.get_includeInLayout() == false) {
					continue;
				}
				if(child.get_percentHeight() != null && child.get_percentHeight() == 100) {
					if(newRow == true) {
						newRow = false;
						++fullHeightRowCount;
					}
				}
				++columnIndex;
				if(columnIndex >= this._columns) {
					columnIndex = 0;
					++rowIndex;
					newRow = true;
				}
			}
			rowIndex = 0;
			columnIndex = 0;
			var _g = 0;
			var _this = this.get_component();
			var _g1 = _this._children == null ? [] : _this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				if(child.get_includeInLayout() == false) {
					continue;
				}
				if(child.get_percentHeight() != null) {
					var childPercentHeight = child.get_percentHeight();
					if(childPercentHeight == 100 && fullHeightRowCount > 1) {
						childPercentHeight = 100 / fullHeightRowCount;
					}
					var cy = usableSize.height * childPercentHeight / 100;
					if(cy > rowHeights[rowIndex]) {
						rowHeights[rowIndex] = cy;
					} else {
						var tmp = usableSize.height > rowHeights[rowIndex];
					}
				}
				++columnIndex;
				if(columnIndex >= this._columns) {
					columnIndex = 0;
					++rowIndex;
				}
			}
		}
		return rowHeights;
	}
	,calcExplicitWidths: function() {
		var explicitWidths = [];
		var _g = 0;
		var _g1 = this._columns;
		while(_g < _g1) {
			var _ = _g++;
			explicitWidths.push(false);
		}
		var rowIndex = 0;
		var columnIndex = 0;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			if(child.get_percentWidth() == null && child.get_componentWidth() > 0) {
				explicitWidths[columnIndex] = true;
			}
			++columnIndex;
			if(columnIndex >= this._columns) {
				columnIndex = 0;
				++rowIndex;
			}
		}
		return explicitWidths;
	}
	,calcExplicitHeights: function() {
		var _this = this.get_component();
		var visibleChildren = (_this._children == null ? [] : _this._children).length;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				--visibleChildren;
			}
		}
		var rowCount = visibleChildren / this.get_columns() | 0;
		if(visibleChildren % this._columns != 0) {
			++rowCount;
		}
		var explicitHeights = [];
		var _g = 0;
		var _g1 = rowCount;
		while(_g < _g1) {
			var _ = _g++;
			explicitHeights.push(false);
		}
		var rowIndex = 0;
		var columnIndex = 0;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			if(child.get_percentHeight() == null && child.get_componentHeight() > 0) {
				explicitHeights[columnIndex % this._columns] = true;
			}
			++columnIndex;
			if(columnIndex >= this._columns) {
				columnIndex = 0;
				++rowIndex;
			}
		}
		return explicitHeights;
	}
	,__class__: haxe_ui_layouts_VerticalGridLayout
	,__properties__: $extend(haxe_ui_layouts_Layout.prototype.__properties__,{set_columns:"set_columns",get_columns:"get_columns"})
});
var haxe_ui_layouts_VerticalLayout = function() {
	haxe_ui_layouts_DefaultLayout.call(this);
	this._calcFullHeights = true;
};
$hxClasses["haxe.ui.layouts.VerticalLayout"] = haxe_ui_layouts_VerticalLayout;
haxe_ui_layouts_VerticalLayout.__name__ = "haxe.ui.layouts.VerticalLayout";
haxe_ui_layouts_VerticalLayout.__super__ = haxe_ui_layouts_DefaultLayout;
haxe_ui_layouts_VerticalLayout.prototype = $extend(haxe_ui_layouts_DefaultLayout.prototype,{
	repositionChildren: function() {
		var ypos = this.get_paddingTop();
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			var xpos = 0;
			switch(this.horizontalAlign(child)) {
			case "center":
				xpos = (this.get_component().get_componentWidth() - child.get_componentWidth()) / 2 + this.marginLeft(child) - this.marginRight(child);
				break;
			case "right":
				if(child.get_componentWidth() < this.get_component().get_componentWidth()) {
					xpos = this.get_component().get_componentWidth() - (child.get_componentWidth() + this.get_paddingRight() + this.marginLeft(child));
				}
				break;
			default:
				xpos = this.get_paddingLeft() + this.marginLeft(child);
			}
			child.moveComponent(xpos,ypos + this.marginTop(child));
			ypos += child.get_componentHeight() + this.get_verticalSpacing();
		}
	}
	,get_usableSize: function() {
		var size = haxe_ui_layouts_DefaultLayout.prototype.get_usableSize.call(this);
		var _this = this.get_component();
		var visibleChildren = (_this._children == null ? [] : _this._children).length;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				--visibleChildren;
				continue;
			}
			if(child.get_componentHeight() > 0 && (child.get_percentHeight() == null || this.fixedMinHeight(child) == true)) {
				size.height -= child.get_componentHeight() + this.marginTop(child) + this.marginBottom(child);
			}
		}
		if(visibleChildren > 1) {
			size.height -= this.get_verticalSpacing() * (visibleChildren - 1);
		}
		if(size.height < 0) {
			size.height = 0;
		}
		return size;
	}
	,__class__: haxe_ui_layouts_VerticalLayout
});
var haxe_ui_locale_LocaleEvent = function(type) {
	haxe_ui_events_UIEvent.call(this,type);
};
$hxClasses["haxe.ui.locale.LocaleEvent"] = haxe_ui_locale_LocaleEvent;
haxe_ui_locale_LocaleEvent.__name__ = "haxe.ui.locale.LocaleEvent";
haxe_ui_locale_LocaleEvent.__super__ = haxe_ui_events_UIEvent;
haxe_ui_locale_LocaleEvent.prototype = $extend(haxe_ui_events_UIEvent.prototype,{
	clone: function() {
		var c = new haxe_ui_locale_LocaleEvent(this.type);
		return c;
	}
	,__class__: haxe_ui_locale_LocaleEvent
});
var haxe_ui_locale_LocaleManager = function() {
	this._localeMap = new haxe_ds_StringMap();
	this._language = "en";
	this._eventMap = null;
};
$hxClasses["haxe.ui.locale.LocaleManager"] = haxe_ui_locale_LocaleManager;
haxe_ui_locale_LocaleManager.__name__ = "haxe.ui.locale.LocaleManager";
haxe_ui_locale_LocaleManager.__properties__ = {get_instance:"get_instance"};
haxe_ui_locale_LocaleManager.get_instance = function() {
	if(haxe_ui_locale_LocaleManager._instance == null) {
		haxe_ui_locale_LocaleManager._instance = new haxe_ui_locale_LocaleManager();
	}
	return haxe_ui_locale_LocaleManager._instance;
};
haxe_ui_locale_LocaleManager.prototype = {
	_eventMap: null
	,registerComponent: function(component,prop,callback,expr,fix) {
		if(fix == null) {
			fix = true;
		}
		if(callback == null && expr == null) {
			return;
		}
		var fixedExpr = null;
		if(fix == true) {
			if(expr != null) {
				fixedExpr = haxe_ui_util_ExpressionUtil.stringToLanguageExpression(expr,"LocaleManager");
				if(StringTools.endsWith(fixedExpr,";") == true) {
					fixedExpr = HxOverrides.substr(fixedExpr,0,fixedExpr.length - 1);
				}
			}
		} else {
			fixedExpr = expr;
		}
		var propMap = haxe_ui_locale_LocaleManager._registeredComponents.h[component.__id__];
		if(propMap == null) {
			propMap = new haxe_ds_StringMap();
			haxe_ui_locale_LocaleManager._registeredComponents.set(component,propMap);
		}
		propMap.h[prop] = { callback : callback, expr : fixedExpr};
		this.refreshFor(component);
	}
	,unregisterComponent: function(component) {
		haxe_ui_locale_LocaleManager._registeredComponents.remove(component);
	}
	,findBindingExpr: function(component,prop) {
		var propMap = haxe_ui_locale_LocaleManager._registeredComponents.h[component.__id__];
		if(propMap == null) {
			return null;
		}
		var entry = propMap.h[prop];
		return entry.expr;
	}
	,cloneForComponent: function(from,to) {
		var propMap = haxe_ui_locale_LocaleManager._registeredComponents.h[from.__id__];
		if(propMap == null) {
			return;
		}
		var h = propMap.h;
		var prop_h = h;
		var prop_keys = Object.keys(h);
		var prop_length = prop_keys.length;
		var prop_current = 0;
		while(prop_current < prop_length) {
			var prop = prop_keys[prop_current++];
			var entry = propMap.h[prop];
			this.registerComponent(to,prop,entry.callback,entry.expr,false);
		}
	}
	,onComponentReady: function(e) {
		e.target.unregisterEvent("initialize",$bind(this,this.onComponentReady));
		this.refreshFor(e.target);
	}
	,refreshFor: function(component) {
		if(component.get_isReady() == false) {
			component.registerEvent("initialize",$bind(this,this.onComponentReady));
			return;
		}
		var propMap = haxe_ui_locale_LocaleManager._registeredComponents.h[component.__id__];
		if(propMap == null) {
			return;
		}
		var context = { LocaleManager : haxe_ui_locale_LocaleManager, MathUtil : haxe_ui_util_MathUtil};
		var root = this.findRoot(component);
		var _g = 0;
		var _g1 = root.get_namedComponents();
		while(_g < _g1.length) {
			var k = _g1[_g];
			++_g;
			if(k.get_scriptAccess() == false) {
				continue;
			}
			context[k.get_id()] = k;
		}
		var h = propMap.h;
		var prop_h = h;
		var prop_keys = Object.keys(h);
		var prop_length = prop_keys.length;
		var prop_current = 0;
		while(prop_current < prop_length) {
			var prop = prop_keys[prop_current++];
			var entry = propMap.h[prop];
			if(entry.callback != null) {
				var value = entry.callback();
				Reflect.setProperty(component,prop,value);
			} else if(entry.expr != null) {
				var value1 = haxe_ui_util_SimpleExpressionEvaluator.eval(entry.expr,context);
				Reflect.setProperty(component,prop,value1);
			}
		}
	}
	,refreshAll: function() {
		var c = haxe_ui_locale_LocaleManager._registeredComponents.keys();
		while(c.hasNext()) {
			var c1 = c.next();
			this.refreshFor(c1);
		}
	}
	,_language: null
	,get_language: function() {
		return this._language;
	}
	,set_language: function(value) {
		if(value == null) {
			return value;
		}
		if(this._language == value) {
			return value;
		}
		if(this.getStrings(value) == null) {
			return value;
		}
		this._language = value;
		this.refreshAll();
		if(this._eventMap != null) {
			var event = new haxe_ui_locale_LocaleEvent("localeChanged");
			this._eventMap.invoke("localeChanged",event);
		}
		return value;
	}
	,registerEvent: function(type,listener,priority) {
		if(priority == null) {
			priority = 0;
		}
		if(this._eventMap == null) {
			this._eventMap = new haxe_ui_util_EventMap();
		}
		this._eventMap.add(type,listener,priority);
	}
	,hasEvent: function(type,listener) {
		if(this._eventMap == null) {
			return false;
		}
		return this._eventMap.contains(type,listener);
	}
	,unregisterEvent: function(type,listener) {
		if(this._eventMap != null) {
			this._eventMap.remove(type,listener);
		}
	}
	,parseResource: function(localeId,resourceId) {
		var content = haxe_ui_ToolkitAssets.get_instance().getText(resourceId);
		if(content != null) {
			var parts = resourceId.split(".");
			var extension = parts.pop();
			var filename = parts.join(".");
			var n = filename.lastIndexOf("/");
			if(n != -1) {
				filename = HxOverrides.substr(filename,n + 1,null);
			}
			var parser = haxe_ui_parsers_locale_LocaleParser.get(extension);
			var map = parser.parse(content);
			this.addStrings(localeId,map,filename);
		}
	}
	,_localeMap: null
	,addStrings: function(localeId,map,filename) {
		var stringMap = this._localeMap.h[localeId];
		if(stringMap == null) {
			stringMap = new haxe_ds_StringMap();
			this._localeMap.h[localeId] = stringMap;
		}
		var h = map.h;
		var k_h = h;
		var k_keys = Object.keys(h);
		var k_length = k_keys.length;
		var k_current = 0;
		while(k_current < k_length) {
			var k = k_keys[k_current++];
			var v = map.h[k];
			if(filename != null && filename != localeId && StringTools.startsWith(k,filename) == false) {
				var altKey = filename + "." + k;
				stringMap.h[altKey] = v;
			}
			stringMap.h[k] = v;
		}
		localeId = StringTools.replace(localeId,"-","_");
		var parts = localeId.split("_");
		if(parts.length > 1) {
			var parent = this._localeMap.h[parts[0]];
			if(parent != null) {
				var h = parent.h;
				var k_h = h;
				var k_keys = Object.keys(h);
				var k_length = k_keys.length;
				var k_current = 0;
				while(k_current < k_length) {
					var k = k_keys[k_current++];
					if(Object.prototype.hasOwnProperty.call(stringMap.h,k) == false) {
						stringMap.h[k] = parent.h[k];
					}
				}
			}
		}
	}
	,getStrings: function(localeId) {
		var strings = this._localeMap.h[localeId];
		if(strings != null) {
			return strings;
		}
		localeId = StringTools.replace(localeId,"-","_");
		var parts = localeId.split("_");
		return this._localeMap.h[parts[0]];
	}
	,hasString: function(id) {
		var strings = this.getStrings(this.get_language());
		if(strings == null) {
			return false;
		}
		return Object.prototype.hasOwnProperty.call(strings.h,id);
	}
	,lookupString: function(id,param0,param1,param2,param3) {
		var strings = this.getStrings(this.get_language());
		if(strings == null) {
			return id;
		}
		var value = strings.h[id];
		if(value == null) {
			return id;
		}
		if(param0 != null) {
			value = StringTools.replace(value,"{0}",param0);
		}
		if(param1 != null) {
			value = StringTools.replace(value,"{1}",param1);
		}
		if(param2 != null) {
			value = StringTools.replace(value,"{2}",param2);
		}
		if(param3 != null) {
			value = StringTools.replace(value,"{3}",param3);
		}
		return value;
	}
	,findRoot: function(c) {
		var root = c;
		var ref = c;
		while(ref != null) {
			root = ref;
			if(root.bindingRoot) {
				break;
			}
			ref = ref.parentComponent;
		}
		return root;
	}
	,__class__: haxe_ui_locale_LocaleManager
	,__properties__: {set_language:"set_language",get_language:"get_language"}
};
var haxe_ui_macros_BackendMacros = function() { };
$hxClasses["haxe.ui.macros.BackendMacros"] = haxe_ui_macros_BackendMacros;
haxe_ui_macros_BackendMacros.__name__ = "haxe.ui.macros.BackendMacros";
var haxe_ui_macros_ModuleMacros = function() { };
$hxClasses["haxe.ui.macros.ModuleMacros"] = haxe_ui_macros_ModuleMacros;
haxe_ui_macros_ModuleMacros.__name__ = "haxe.ui.macros.ModuleMacros";
var haxe_ui_macros_NativeMacros = function() { };
$hxClasses["haxe.ui.macros.NativeMacros"] = haxe_ui_macros_NativeMacros;
haxe_ui_macros_NativeMacros.__name__ = "haxe.ui.macros.NativeMacros";
var haxe_ui_parsers_locale_LocaleParser = function() {
};
$hxClasses["haxe.ui.parsers.locale.LocaleParser"] = haxe_ui_parsers_locale_LocaleParser;
haxe_ui_parsers_locale_LocaleParser.__name__ = "haxe.ui.parsers.locale.LocaleParser";
haxe_ui_parsers_locale_LocaleParser.get = function(extension) {
	haxe_ui_parsers_locale_LocaleParser.defaultParsers();
	var cls = haxe_ui_parsers_locale_LocaleParser._parsers.h[extension];
	if(cls == null) {
		throw haxe_Exception.thrown("No locale parser found for \"" + extension + "\"");
	}
	var instance = Type.createInstance(cls,[]);
	if(instance == null) {
		throw haxe_Exception.thrown("Could not create locale parser instance \"" + Std.string(cls) + "\"");
	}
	return instance;
};
haxe_ui_parsers_locale_LocaleParser.defaultParsers = function() {
	haxe_ui_parsers_locale_LocaleParser.register("properties",haxe_ui_parsers_locale_PropertiesParser);
	haxe_ui_parsers_locale_LocaleParser.register("po",haxe_ui_parsers_locale_PoParser);
};
haxe_ui_parsers_locale_LocaleParser.register = function(extension,cls) {
	if(haxe_ui_parsers_locale_LocaleParser._parsers == null) {
		haxe_ui_parsers_locale_LocaleParser._parsers = new haxe_ds_StringMap();
	}
	haxe_ui_parsers_locale_LocaleParser._parsers.h[extension] = cls;
};
haxe_ui_parsers_locale_LocaleParser.prototype = {
	parse: function(data) {
		throw haxe_Exception.thrown("Locale parser not implemented!");
	}
	,__class__: haxe_ui_parsers_locale_LocaleParser
};
var haxe_ui_parsers_locale_PoParser = function() {
	haxe_ui_parsers_locale_LocaleParser.call(this);
};
$hxClasses["haxe.ui.parsers.locale.PoParser"] = haxe_ui_parsers_locale_PoParser;
haxe_ui_parsers_locale_PoParser.__name__ = "haxe.ui.parsers.locale.PoParser";
haxe_ui_parsers_locale_PoParser.__super__ = haxe_ui_parsers_locale_LocaleParser;
haxe_ui_parsers_locale_PoParser.prototype = $extend(haxe_ui_parsers_locale_LocaleParser.prototype,{
	parse: function(data) {
		var msgidEReg = new EReg("msgid *= *\"(.*)\"","");
		var msgstrEReg = new EReg("msgstr *= *\"(.*)\"","");
		var result = new haxe_ds_StringMap();
		var lines = data.split("\n");
		var currentID = null;
		var _g = 0;
		while(_g < lines.length) {
			var line = lines[_g];
			++_g;
			line = StringTools.trim(line);
			if(line.length == 0 || StringTools.startsWith(line,"#")) {
				continue;
			}
			if(currentID == null) {
				if(msgidEReg.match(line)) {
					currentID = msgidEReg.matched(1);
				} else {
					throw haxe_Exception.thrown("Locale parser: Invalid line " + line);
				}
			} else if(msgstrEReg.match(line)) {
				var value = msgstrEReg.matched(1);
				result.h[currentID] = value;
				currentID = null;
			} else {
				throw haxe_Exception.thrown("Locale parser: Invalid line " + line);
			}
		}
		return result;
	}
	,__class__: haxe_ui_parsers_locale_PoParser
});
var haxe_ui_parsers_locale_PropertiesParser = function() {
	haxe_ui_parsers_locale_LocaleParser.call(this);
};
$hxClasses["haxe.ui.parsers.locale.PropertiesParser"] = haxe_ui_parsers_locale_PropertiesParser;
haxe_ui_parsers_locale_PropertiesParser.__name__ = "haxe.ui.parsers.locale.PropertiesParser";
haxe_ui_parsers_locale_PropertiesParser.__super__ = haxe_ui_parsers_locale_LocaleParser;
haxe_ui_parsers_locale_PropertiesParser.prototype = $extend(haxe_ui_parsers_locale_LocaleParser.prototype,{
	parse: function(data) {
		var result = new haxe_ds_StringMap();
		var lines = data.split("\n");
		var _g = 0;
		while(_g < lines.length) {
			var line = lines[_g];
			++_g;
			line = StringTools.trim(line);
			if(line.length == 0 || StringTools.startsWith(line,"#")) {
				continue;
			}
			var separator = line.indexOf("=");
			if(separator == -1) {
				throw haxe_Exception.thrown("Locale parser: Invalid line " + line);
			}
			var key = StringTools.trim(HxOverrides.substr(line,0,separator));
			var content = StringTools.trim(HxOverrides.substr(line,separator + 1,null));
			result.h[key] = content;
		}
		return result;
	}
	,__class__: haxe_ui_parsers_locale_PropertiesParser
});
var haxe_ui_styles_Dimension = $hxEnums["haxe.ui.styles.Dimension"] = { __ename__:true,__constructs__:null
	,PERCENT: ($_=function(value) { return {_hx_index:0,value:value,__enum__:"haxe.ui.styles.Dimension",toString:$estr}; },$_._hx_name="PERCENT",$_.__params__ = ["value"],$_)
	,PX: ($_=function(value) { return {_hx_index:1,value:value,__enum__:"haxe.ui.styles.Dimension",toString:$estr}; },$_._hx_name="PX",$_.__params__ = ["value"],$_)
	,VW: ($_=function(value) { return {_hx_index:2,value:value,__enum__:"haxe.ui.styles.Dimension",toString:$estr}; },$_._hx_name="VW",$_.__params__ = ["value"],$_)
	,VH: ($_=function(value) { return {_hx_index:3,value:value,__enum__:"haxe.ui.styles.Dimension",toString:$estr}; },$_._hx_name="VH",$_.__params__ = ["value"],$_)
	,REM: ($_=function(value) { return {_hx_index:4,value:value,__enum__:"haxe.ui.styles.Dimension",toString:$estr}; },$_._hx_name="REM",$_.__params__ = ["value"],$_)
	,CALC: ($_=function(s) { return {_hx_index:5,s:s,__enum__:"haxe.ui.styles.Dimension",toString:$estr}; },$_._hx_name="CALC",$_.__params__ = ["s"],$_)
};
haxe_ui_styles_Dimension.__constructs__ = [haxe_ui_styles_Dimension.PERCENT,haxe_ui_styles_Dimension.PX,haxe_ui_styles_Dimension.VW,haxe_ui_styles_Dimension.VH,haxe_ui_styles_Dimension.REM,haxe_ui_styles_Dimension.CALC];
var haxe_ui_styles_EasingFunction = $hxEnums["haxe.ui.styles.EasingFunction"] = { __ename__:true,__constructs__:null
	,LINEAR: {_hx_name:"LINEAR",_hx_index:0,__enum__:"haxe.ui.styles.EasingFunction",toString:$estr}
	,EASE: {_hx_name:"EASE",_hx_index:1,__enum__:"haxe.ui.styles.EasingFunction",toString:$estr}
	,EASE_IN: {_hx_name:"EASE_IN",_hx_index:2,__enum__:"haxe.ui.styles.EasingFunction",toString:$estr}
	,EASE_OUT: {_hx_name:"EASE_OUT",_hx_index:3,__enum__:"haxe.ui.styles.EasingFunction",toString:$estr}
	,EASE_IN_OUT: {_hx_name:"EASE_IN_OUT",_hx_index:4,__enum__:"haxe.ui.styles.EasingFunction",toString:$estr}
};
haxe_ui_styles_EasingFunction.__constructs__ = [haxe_ui_styles_EasingFunction.LINEAR,haxe_ui_styles_EasingFunction.EASE,haxe_ui_styles_EasingFunction.EASE_IN,haxe_ui_styles_EasingFunction.EASE_OUT,haxe_ui_styles_EasingFunction.EASE_IN_OUT];
var haxe_ui_styles_Parser = function() {
};
$hxClasses["haxe.ui.styles.Parser"] = haxe_ui_styles_Parser;
haxe_ui_styles_Parser.__name__ = "haxe.ui.styles.Parser";
haxe_ui_styles_Parser.prototype = {
	parse: function(source) {
		var _gthis = this;
		source = source.replace(haxe_ui_styles_Parser.cssCommentsRegex.r,"");
		var styleSheet = new haxe_ui_styles_StyleSheet();
		source = haxe_ui_styles_Parser.cssImportStatementRegex.map(source,function(e) {
			var i = e.matched(0);
			i = HxOverrides.substr(i,7,null);
			var _this_r = new RegExp("\"|'|;","g".split("u").join(""));
			i = i.replace(_this_r,"");
			i = StringTools.trim(i);
			styleSheet.addImport(new haxe_ui_styles_elements_ImportElement(i));
			return "";
		});
		source = haxe_ui_styles_Parser.cssKeyframesRegex.map(source,function(e) {
			var id = e.matched(1);
			var data = e.matched(2);
			var keyframes = [];
			haxe_ui_styles_Parser.cssKeyframeSelectorRegex.map(data,function(e) {
				var selector = e.matched(1);
				var directives = e.matched(2);
				if(selector == "from") {
					selector = "0%";
				} else if(selector == "to") {
					selector = "100%";
				}
				var keyframe = new haxe_ui_styles_elements_AnimationKeyFrame();
				keyframe.time = haxe_ui_styles_ValueTools.parse(selector);
				keyframe.directives = _gthis.parseDirectives(directives);
				keyframes.push(keyframe);
				return null;
			});
			var animation = new haxe_ui_styles_elements_AnimationKeyFrames(id,keyframes);
			styleSheet.addAnimation(animation);
			return "";
		});
		haxe_ui_styles_Parser.combinedCSSMediaRegex.map(source,function(e) {
			var selector = "";
			if(e.matched(2) == null) {
				selector = StringTools.trim(e.matched(5).split("\r\n").join("\n"));
			} else {
				selector = StringTools.trim(e.matched(2).split("\r\n").join("\n"));
			}
			selector = selector.replace(haxe_ui_styles_Parser.newlineRegex.r,"\n");
			if(selector.indexOf("@media") != -1) {
				var n1 = selector.indexOf("(");
				var n2 = selector.lastIndexOf(")");
				var mediaQuery = selector.substring(n1 + 1,n2);
				var mediaStyleSheet = new haxe_ui_styles_Parser().parse(e.matched(3) + "\n}");
				var mq = new haxe_ui_styles_elements_MediaQuery(_gthis.parseDirectives(mediaQuery),mediaStyleSheet);
				styleSheet.addMediaQuery(mq);
			} else {
				var directives = _gthis.parseDirectives(e.matched(6));
				var selectors = selector.split(",");
				var _g = 0;
				while(_g < selectors.length) {
					var s = selectors[_g];
					++_g;
					s = StringTools.trim(s);
					if(s.length > 0) {
						styleSheet.addRule(new haxe_ui_styles_elements_RuleElement(s,directives));
					}
				}
			}
			return null;
		});
		return styleSheet;
	}
	,parseDirectives: function(rulesString) {
		rulesString = rulesString.split("\r\n").join("\n");
		var ret = [];
		var rules = rulesString.split(";");
		var _g = 0;
		while(_g < rules.length) {
			var line = rules[_g];
			++_g;
			var d = this.parseDirective(line);
			if(d != null) {
				ret.push(d);
			}
		}
		return ret;
	}
	,parseDirective: function(line) {
		var d = null;
		line = StringTools.trim(line);
		if(line.length == 0) {
			return null;
		}
		if(line.indexOf(":") != -1) {
			var parts = line.split(":");
			var cssDirective = StringTools.trim(parts[0]);
			var cssValue = StringTools.trim(parts.slice(1).join(":"));
			if(cssDirective.length < 1 || cssValue.length < 1) {
				return null;
			}
			d = new haxe_ui_styles_elements_Directive(cssDirective,haxe_ui_styles_ValueTools.parse(cssValue));
		} else {
			d = new haxe_ui_styles_elements_Directive("",haxe_ui_styles_ValueTools.parse(line),true);
		}
		return d;
	}
	,__class__: haxe_ui_styles_Parser
};
var haxe_ui_styles_StyleBorderType = $hxEnums["haxe.ui.styles.StyleBorderType"] = { __ename__:true,__constructs__:null
	,None: {_hx_name:"None",_hx_index:0,__enum__:"haxe.ui.styles.StyleBorderType",toString:$estr}
	,Full: {_hx_name:"Full",_hx_index:1,__enum__:"haxe.ui.styles.StyleBorderType",toString:$estr}
	,Compound: {_hx_name:"Compound",_hx_index:2,__enum__:"haxe.ui.styles.StyleBorderType",toString:$estr}
};
haxe_ui_styles_StyleBorderType.__constructs__ = [haxe_ui_styles_StyleBorderType.None,haxe_ui_styles_StyleBorderType.Full,haxe_ui_styles_StyleBorderType.Compound];
var haxe_ui_styles_Style = function(left,top,autoWidth,width,percentWidth,initialWidth,initialPercentWidth,minWidth,minPercentWidth,maxWidth,maxPercentWidth,autoHeight,height,percentHeight,initialHeight,initialPercentHeight,minHeight,minPercentHeight,maxHeight,maxPercentHeight,padding,paddingTop,paddingLeft,paddingRight,paddingBottom,marginTop,marginLeft,marginRight,marginBottom,horizontalSpacing,verticalSpacing,color,backgroundColor,backgroundColorEnd,backgroundGradientStyle,backgroundOpacity,backgroundImage,backgroundImageRepeat,backgroundImageClipTop,backgroundImageClipLeft,backgroundImageClipBottom,backgroundImageClipRight,backgroundImageSliceTop,backgroundImageSliceLeft,backgroundImageSliceBottom,backgroundImageSliceRight,borderColor,borderTopColor,borderLeftColor,borderBottomColor,borderRightColor,borderSize,borderTopSize,borderLeftSize,borderBottomSize,borderRightSize,borderRadius,borderRadiusTopLeft,borderRadiusTopRight,borderRadiusBottomLeft,borderRadiusBottomRight,borderOpacity,borderStyle,icon,iconPosition,horizontalAlign,verticalAlign,textAlign,opacity,clip,native,fontName,fontSize,fontBold,fontUnderline,fontItalic,cursor,hidden,filter,backdropFilter,resource,animationName,animationOptions,mode,pointerEvents,contentType,direction,contentWidth,contentWidthPercent,contentHeight,contentHeightPercent,wordWrap,borderType,hasBorder,fullBorderSize) {
	this.left = left;
	this.top = top;
	this.autoWidth = autoWidth;
	this.width = width;
	this.percentWidth = percentWidth;
	this.initialWidth = initialWidth;
	this.initialPercentWidth = initialPercentWidth;
	this.minWidth = minWidth;
	this.minPercentWidth = minPercentWidth;
	this.maxWidth = maxWidth;
	this.maxPercentWidth = maxPercentWidth;
	this.autoHeight = autoHeight;
	this.height = height;
	this.percentHeight = percentHeight;
	this.initialHeight = initialHeight;
	this.initialPercentHeight = initialPercentHeight;
	this.minHeight = minHeight;
	this.minPercentHeight = minPercentHeight;
	this.maxHeight = maxHeight;
	this.maxPercentHeight = maxPercentHeight;
	this.padding = padding;
	this.paddingTop = paddingTop;
	this.paddingLeft = paddingLeft;
	this.paddingRight = paddingRight;
	this.paddingBottom = paddingBottom;
	this.marginTop = marginTop;
	this.marginLeft = marginLeft;
	this.marginRight = marginRight;
	this.marginBottom = marginBottom;
	this.horizontalSpacing = horizontalSpacing;
	this.verticalSpacing = verticalSpacing;
	this.color = color;
	this.backgroundColor = backgroundColor;
	this.backgroundColorEnd = backgroundColorEnd;
	this.backgroundGradientStyle = backgroundGradientStyle;
	this.backgroundOpacity = backgroundOpacity;
	this.backgroundImage = backgroundImage;
	this.backgroundImageRepeat = backgroundImageRepeat;
	this.backgroundImageClipTop = backgroundImageClipTop;
	this.backgroundImageClipLeft = backgroundImageClipLeft;
	this.backgroundImageClipBottom = backgroundImageClipBottom;
	this.backgroundImageClipRight = backgroundImageClipRight;
	this.backgroundImageSliceTop = backgroundImageSliceTop;
	this.backgroundImageSliceLeft = backgroundImageSliceLeft;
	this.backgroundImageSliceBottom = backgroundImageSliceBottom;
	this.backgroundImageSliceRight = backgroundImageSliceRight;
	this.borderColor = borderColor;
	this.borderTopColor = borderTopColor;
	this.borderLeftColor = borderLeftColor;
	this.borderBottomColor = borderBottomColor;
	this.borderRightColor = borderRightColor;
	this.borderSize = borderSize;
	this.borderTopSize = borderTopSize;
	this.borderLeftSize = borderLeftSize;
	this.borderBottomSize = borderBottomSize;
	this.borderRightSize = borderRightSize;
	this.borderRadius = borderRadius;
	this.borderRadiusTopLeft = borderRadiusTopLeft;
	this.borderRadiusTopRight = borderRadiusTopRight;
	this.borderRadiusBottomLeft = borderRadiusBottomLeft;
	this.borderRadiusBottomRight = borderRadiusBottomRight;
	this.borderOpacity = borderOpacity;
	this.borderStyle = borderStyle;
	this.icon = icon;
	this.iconPosition = iconPosition;
	this.horizontalAlign = horizontalAlign;
	this.verticalAlign = verticalAlign;
	this.textAlign = textAlign;
	this.opacity = opacity;
	this.clip = clip;
	this.native = native;
	this.fontName = fontName;
	this.fontSize = fontSize;
	this.fontBold = fontBold;
	this.fontUnderline = fontUnderline;
	this.fontItalic = fontItalic;
	this.cursor = cursor;
	this.hidden = hidden;
	this.filter = filter;
	this.backdropFilter = backdropFilter;
	this.resource = resource;
	this.animationName = animationName;
	this.animationOptions = animationOptions;
	this.mode = mode;
	this.pointerEvents = pointerEvents;
	this.contentType = contentType;
	this.direction = direction;
	this.contentWidth = contentWidth;
	this.contentWidthPercent = contentWidthPercent;
	this.contentHeight = contentHeight;
	this.contentHeightPercent = contentHeightPercent;
	this.wordWrap = wordWrap;
	this.borderType = borderType;
	this.hasBorder = hasBorder;
	this.fullBorderSize = fullBorderSize;
};
$hxClasses["haxe.ui.styles.Style"] = haxe_ui_styles_Style;
haxe_ui_styles_Style.__name__ = "haxe.ui.styles.Style";
haxe_ui_styles_Style.prototype = {
	left: null
	,top: null
	,autoWidth: null
	,width: null
	,percentWidth: null
	,initialWidth: null
	,initialPercentWidth: null
	,minWidth: null
	,minPercentWidth: null
	,maxWidth: null
	,maxPercentWidth: null
	,autoHeight: null
	,height: null
	,percentHeight: null
	,initialHeight: null
	,initialPercentHeight: null
	,minHeight: null
	,minPercentHeight: null
	,maxHeight: null
	,maxPercentHeight: null
	,padding: null
	,set_padding: function(value) {
		this.paddingTop = value;
		this.paddingLeft = value;
		this.paddingRight = value;
		this.paddingBottom = value;
		return value;
	}
	,paddingTop: null
	,paddingLeft: null
	,paddingRight: null
	,paddingBottom: null
	,marginTop: null
	,marginLeft: null
	,marginRight: null
	,marginBottom: null
	,horizontalSpacing: null
	,verticalSpacing: null
	,color: null
	,backgroundColor: null
	,backgroundColorEnd: null
	,backgroundGradientStyle: null
	,backgroundOpacity: null
	,backgroundImage: null
	,backgroundImageRepeat: null
	,backgroundImageClipTop: null
	,backgroundImageClipLeft: null
	,backgroundImageClipBottom: null
	,backgroundImageClipRight: null
	,backgroundImageSliceTop: null
	,backgroundImageSliceLeft: null
	,backgroundImageSliceBottom: null
	,backgroundImageSliceRight: null
	,borderColor: null
	,borderTopColor: null
	,borderLeftColor: null
	,borderBottomColor: null
	,borderRightColor: null
	,borderSize: null
	,borderTopSize: null
	,borderLeftSize: null
	,borderBottomSize: null
	,borderRightSize: null
	,borderRadius: null
	,borderRadiusTopLeft: null
	,borderRadiusTopRight: null
	,borderRadiusBottomLeft: null
	,borderRadiusBottomRight: null
	,borderOpacity: null
	,borderStyle: null
	,icon: null
	,iconPosition: null
	,horizontalAlign: null
	,verticalAlign: null
	,textAlign: null
	,opacity: null
	,clip: null
	,native: null
	,fontName: null
	,fontSize: null
	,fontBold: null
	,fontUnderline: null
	,fontItalic: null
	,cursor: null
	,hidden: null
	,filter: null
	,backdropFilter: null
	,resource: null
	,animationName: null
	,animationOptions: null
	,mode: null
	,pointerEvents: null
	,contentType: null
	,direction: null
	,contentWidth: null
	,contentWidthPercent: null
	,contentHeight: null
	,contentHeightPercent: null
	,wordWrap: null
	,borderType: null
	,get_borderType: function() {
		var t = haxe_ui_styles_StyleBorderType.Compound;
		if(this.borderLeftSize != null && this.borderLeftSize == this.borderRightSize && this.borderLeftSize == this.borderBottomSize && this.borderLeftSize == this.borderTopSize) {
			t = haxe_ui_styles_StyleBorderType.Full;
		} else if(this.borderLeftSize == null && this.borderRightSize == null && this.borderBottomSize == null && this.borderTopSize == null) {
			t = haxe_ui_styles_StyleBorderType.None;
		}
		return t;
	}
	,hasBorder: null
	,get_hasBorder: function() {
		return this.get_borderType() != haxe_ui_styles_StyleBorderType.None;
	}
	,fullBorderSize: null
	,get_fullBorderSize: function() {
		if(this.get_borderType() == haxe_ui_styles_StyleBorderType.Full) {
			return this.borderLeftSize;
		}
		return 0;
	}
	,mergeDirectives: function(map) {
		var h = map.h;
		var key_h = h;
		var key_keys = Object.keys(h);
		var key_length = key_keys.length;
		var key_current = 0;
		while(key_current < key_length) {
			var key = key_keys[key_current++];
			var v = map.h[key];
			switch(key) {
			case "animation-delay":
				if(this.animationOptions == null) {
					this.animationOptions = new haxe_ui_styles_animation_AnimationOptions(null,null,null,null,null,null);
				}
				this.animationOptions.delay = haxe_ui_styles_ValueTools.time(v.value);
				break;
			case "animation-direction":
				if(this.animationOptions == null) {
					this.animationOptions = new haxe_ui_styles_animation_AnimationOptions(null,null,null,null,null,null);
				}
				this.animationOptions.direction = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "animation-duration":
				if(this.animationOptions == null) {
					this.animationOptions = new haxe_ui_styles_animation_AnimationOptions(null,null,null,null,null,null);
				}
				this.animationOptions.duration = haxe_ui_styles_ValueTools.time(v.value);
				break;
			case "animation-fill-mode":
				if(this.animationOptions == null) {
					this.animationOptions = new haxe_ui_styles_animation_AnimationOptions(null,null,null,null,null,null);
				}
				this.animationOptions.fillMode = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "animation-iteration-count":
				if(this.animationOptions == null) {
					this.animationOptions = new haxe_ui_styles_animation_AnimationOptions(null,null,null,null,null,null);
				}
				var _g = v.value;
				var tmp;
				if(_g._hx_index == 6) {
					var val = _g.v;
					tmp = val == "infinite" ? -1 : 0;
				} else {
					tmp = haxe_ui_styles_ValueTools.int(v.value);
				}
				this.animationOptions.iterationCount = tmp;
				break;
			case "animation-name":
				this.animationName = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "animation-timing-function":
				if(this.animationOptions == null) {
					this.animationOptions = new haxe_ui_styles_animation_AnimationOptions(null,null,null,null,null,null);
				}
				this.animationOptions.easingFunction = haxe_ui_styles_ValueTools.calcEasing(v.value);
				break;
			case "backdrop-filter":
				var _g1 = v.value;
				switch(_g1._hx_index) {
				case 5:
					var f = _g1.f;
					var vl = _g1.vl;
					var arr = haxe_ui_styles_ValueTools.array(vl);
					arr.splice(0,0,f);
					this.backdropFilter = [haxe_ui_filters_FilterParser.parseFilter(arr)];
					break;
				case 6:
					var f1 = _g1.v;
					this.backdropFilter = [haxe_ui_filters_FilterParser.parseFilter([f1])];
					break;
				case 9:
					this.backdropFilter = null;
					break;
				default:
				}
				break;
			case "background-color":
				var _g2 = v.value;
				this.backgroundColor = haxe_ui_styles_ValueTools.int(v.value);
				if(Object.prototype.hasOwnProperty.call(map.h,"background-color-end")) {
					this.backgroundColorEnd = haxe_ui_styles_ValueTools.int(map.h["background-color-end"].value);
				} else {
					this.backgroundColorEnd = null;
				}
				break;
			case "background-color-end":
				this.backgroundColorEnd = haxe_ui_styles_ValueTools.int(v.value);
				break;
			case "background-gradient-style":
				this.backgroundGradientStyle = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "background-image":
				this.backgroundImage = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "background-image-clip-bottom":
				this.backgroundImageClipBottom = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "background-image-clip-left":
				this.backgroundImageClipLeft = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "background-image-clip-right":
				this.backgroundImageClipRight = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "background-image-clip-top":
				this.backgroundImageClipTop = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "background-image-repeat":
				this.backgroundImageRepeat = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "background-image-slice-bottom":
				this.backgroundImageSliceBottom = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "background-image-slice-left":
				this.backgroundImageSliceLeft = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "background-image-slice-right":
				this.backgroundImageSliceRight = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "background-image-slice-top":
				this.backgroundImageSliceTop = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "background-opacity":
				this.backgroundOpacity = haxe_ui_styles_ValueTools.float(v.value);
				break;
			case "border-bottom-color":
				this.borderBottomColor = haxe_ui_styles_ValueTools.int(v.value);
				break;
			case "border-bottom-left-radius":
				this.borderRadiusBottomLeft = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "border-bottom-right-radius":
				this.borderRadiusBottomRight = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "border-bottom-size":case "border-bottom-width":
				if(v.value == haxe_ui_styles_Value.VNone) {
					this.borderBottomSize = 0;
				} else {
					this.borderBottomSize = haxe_ui_styles_ValueTools.calcDimension(v.value);
				}
				break;
			case "border-color":
				this.borderColor = haxe_ui_styles_ValueTools.int(v.value);
				break;
			case "border-left-color":
				this.borderLeftColor = haxe_ui_styles_ValueTools.int(v.value);
				break;
			case "border-left-size":case "border-left-width":
				if(v.value == haxe_ui_styles_Value.VNone) {
					this.borderLeftSize = 0;
				} else {
					this.borderLeftSize = haxe_ui_styles_ValueTools.calcDimension(v.value);
				}
				break;
			case "border-opacity":
				this.borderOpacity = haxe_ui_styles_ValueTools.float(v.value);
				break;
			case "border-radius":
				this.borderRadius = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "border-right-color":
				this.borderRightColor = haxe_ui_styles_ValueTools.int(v.value);
				break;
			case "border-right-size":case "border-right-width":
				if(v.value == haxe_ui_styles_Value.VNone) {
					this.borderRightSize = 0;
				} else {
					this.borderRightSize = haxe_ui_styles_ValueTools.calcDimension(v.value);
				}
				break;
			case "border-style":
				this.borderStyle = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "border-top-color":
				this.borderTopColor = haxe_ui_styles_ValueTools.int(v.value);
				break;
			case "border-top-left-radius":
				this.borderRadiusTopLeft = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "border-top-right-radius":
				this.borderRadiusTopRight = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "border-top-size":case "border-top-width":
				if(v.value == haxe_ui_styles_Value.VNone) {
					this.borderTopSize = 0;
				} else {
					this.borderTopSize = haxe_ui_styles_ValueTools.calcDimension(v.value);
				}
				break;
			case "clip":
				this.clip = haxe_ui_styles_ValueTools.bool(v.value);
				break;
			case "color":
				this.color = haxe_ui_styles_ValueTools.int(v.value);
				break;
			case "content-height":
				this.contentHeight = haxe_ui_styles_ValueTools.calcDimension(v.value);
				this.contentHeightPercent = haxe_ui_styles_ValueTools.percent(v.value);
				break;
			case "content-type":
				this.contentType = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "content-width":
				this.contentWidth = haxe_ui_styles_ValueTools.calcDimension(v.value);
				this.contentWidthPercent = haxe_ui_styles_ValueTools.percent(v.value);
				break;
			case "cursor":
				this.cursor = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "direction":
				this.direction = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "display":
				this.hidden = haxe_ui_styles_ValueTools.none(v.value);
				break;
			case "filter":
				var _g3 = v.value;
				switch(_g3._hx_index) {
				case 5:
					var f2 = _g3.f;
					var vl1 = _g3.vl;
					var arr1 = haxe_ui_styles_ValueTools.array(vl1);
					arr1.splice(0,0,f2);
					this.filter = [haxe_ui_filters_FilterParser.parseFilter(arr1)];
					break;
				case 6:
					var f3 = _g3.v;
					this.filter = [haxe_ui_filters_FilterParser.parseFilter([f3])];
					break;
				case 9:
					this.filter = null;
					break;
				default:
				}
				break;
			case "font-bold":
				this.fontBold = haxe_ui_styles_ValueTools.bool(v.value);
				break;
			case "font-family":case "font-name":
				this.fontName = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "font-italic":
				this.fontItalic = haxe_ui_styles_ValueTools.bool(v.value);
				break;
			case "font-size":
				this.fontSize = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "font-underline":
				this.fontUnderline = haxe_ui_styles_ValueTools.bool(v.value);
				break;
			case "height":
				this.autoHeight = haxe_ui_styles_ValueTools.constant(v.value,"auto");
				this.height = haxe_ui_styles_ValueTools.calcDimension(v.value);
				this.percentHeight = haxe_ui_styles_ValueTools.percent(v.value);
				break;
			case "hidden":
				this.hidden = haxe_ui_styles_ValueTools.bool(v.value);
				break;
			case "horizontal-align":
				this.horizontalAlign = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "horizontal-spacing":
				this.horizontalSpacing = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "icon":
				if(v.value._hx_index == 9) {
					this.icon = null;
				} else {
					this.icon = haxe_ui_styles_ValueTools.string(v.value);
				}
				break;
			case "icon-position":
				this.iconPosition = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "initial-height":
				this.initialHeight = haxe_ui_styles_ValueTools.calcDimension(v.value);
				this.initialPercentHeight = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "initial-width":
				this.initialWidth = haxe_ui_styles_ValueTools.calcDimension(v.value);
				this.initialPercentWidth = haxe_ui_styles_ValueTools.percent(v.value);
				break;
			case "left":
				this.left = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "margin-bottom":
				this.marginBottom = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "margin-left":
				this.marginLeft = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "margin-right":
				this.marginRight = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "margin-top":
				this.marginTop = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "max-height":
				this.maxHeight = haxe_ui_styles_ValueTools.calcDimension(v.value);
				this.maxPercentHeight = haxe_ui_styles_ValueTools.percent(v.value);
				break;
			case "max-width":
				this.maxWidth = haxe_ui_styles_ValueTools.calcDimension(v.value);
				this.maxPercentWidth = haxe_ui_styles_ValueTools.percent(v.value);
				break;
			case "min-height":
				this.minHeight = haxe_ui_styles_ValueTools.calcDimension(v.value);
				this.minPercentHeight = haxe_ui_styles_ValueTools.percent(v.value);
				break;
			case "min-width":
				this.minWidth = haxe_ui_styles_ValueTools.calcDimension(v.value);
				this.minPercentWidth = haxe_ui_styles_ValueTools.percent(v.value);
				break;
			case "mode":
				this.mode = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "native":
				this.native = haxe_ui_styles_ValueTools.bool(v.value);
				break;
			case "opacity":
				this.opacity = haxe_ui_styles_ValueTools.float(v.value);
				break;
			case "padding-bottom":
				this.paddingBottom = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "padding-left":
				this.paddingLeft = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "padding-right":
				this.paddingRight = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "padding-top":
				this.paddingTop = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "pointer-events":
				if(v.value._hx_index == 9) {
					this.pointerEvents = "none";
				} else {
					this.pointerEvents = haxe_ui_styles_ValueTools.string(v.value);
				}
				break;
			case "resource":
				this.resource = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "text-align":
				this.textAlign = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "top":
				this.top = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "vertical-align":
				this.verticalAlign = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "vertical-spacing":
				this.verticalSpacing = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "width":
				this.autoWidth = haxe_ui_styles_ValueTools.constant(v.value,"auto");
				this.width = haxe_ui_styles_ValueTools.calcDimension(v.value);
				this.percentWidth = haxe_ui_styles_ValueTools.percent(v.value);
				break;
			case "word-wrap":
				this.wordWrap = haxe_ui_styles_ValueTools.bool(v.value);
				break;
			}
		}
	}
	,apply: function(s) {
		if(s.cursor != null) {
			this.cursor = s.cursor;
		}
		if(s.hidden != null) {
			this.hidden = s.hidden;
		}
		if(s.left != null) {
			this.left = s.left;
		}
		if(s.top != null) {
			this.top = s.top;
		}
		if(s.autoWidth != null) {
			this.autoWidth = s.autoWidth;
		}
		if(s.autoHeight != null) {
			this.autoHeight = s.autoHeight;
		}
		if(s.verticalSpacing != null) {
			this.verticalSpacing = s.verticalSpacing;
		}
		if(s.horizontalSpacing != null) {
			this.horizontalSpacing = s.horizontalSpacing;
		}
		if(s.width != null) {
			this.width = s.width;
			this.autoWidth = false;
		}
		if(s.initialWidth != null) {
			this.initialWidth = s.initialWidth;
		}
		if(s.initialPercentWidth != null) {
			this.initialPercentWidth = s.initialPercentWidth;
		}
		if(s.minWidth != null) {
			this.minWidth = s.minWidth;
		}
		if(s.minPercentWidth != null) {
			this.minPercentWidth = s.minPercentWidth;
		}
		if(s.maxWidth != null) {
			this.maxWidth = s.maxWidth;
		}
		if(s.maxPercentWidth != null) {
			this.maxPercentWidth = s.maxPercentWidth;
		}
		if(s.height != null) {
			this.height = s.height;
			this.autoHeight = false;
		}
		if(s.initialHeight != null) {
			this.initialHeight = s.initialHeight;
		}
		if(s.initialPercentHeight != null) {
			this.initialPercentHeight = s.initialPercentHeight;
		}
		if(s.minHeight != null) {
			this.minHeight = s.minHeight;
		}
		if(s.minPercentHeight != null) {
			this.minPercentHeight = s.minPercentHeight;
		}
		if(s.maxHeight != null) {
			this.maxHeight = s.maxHeight;
		}
		if(s.maxPercentHeight != null) {
			this.maxPercentHeight = s.maxPercentHeight;
		}
		if(s.percentWidth != null) {
			this.percentWidth = s.percentWidth;
			this.autoWidth = false;
		}
		if(s.percentHeight != null) {
			this.percentHeight = s.percentHeight;
			this.autoHeight = false;
		}
		if(s.paddingTop != null) {
			this.paddingTop = s.paddingTop;
		}
		if(s.paddingLeft != null) {
			this.paddingLeft = s.paddingLeft;
		}
		if(s.paddingRight != null) {
			this.paddingRight = s.paddingRight;
		}
		if(s.paddingBottom != null) {
			this.paddingBottom = s.paddingBottom;
		}
		if(s.marginTop != null) {
			this.marginTop = s.marginTop;
		}
		if(s.marginLeft != null) {
			this.marginLeft = s.marginLeft;
		}
		if(s.marginRight != null) {
			this.marginRight = s.marginRight;
		}
		if(s.marginBottom != null) {
			this.marginBottom = s.marginBottom;
		}
		if(s.color != null) {
			this.color = s.color;
		}
		if(s.backgroundColor != null) {
			this.backgroundColor = s.backgroundColor;
			this.backgroundColorEnd = null;
		}
		if(s.backgroundColorEnd != null) {
			this.backgroundColorEnd = s.backgroundColorEnd;
		}
		if(s.backgroundGradientStyle != null) {
			this.backgroundGradientStyle = s.backgroundGradientStyle;
		}
		if(s.backgroundOpacity != null) {
			this.backgroundOpacity = s.backgroundOpacity;
		}
		if(s.backgroundImage != null) {
			this.backgroundImage = s.backgroundImage;
		}
		if(s.backgroundImageRepeat != null) {
			this.backgroundImageRepeat = s.backgroundImageRepeat;
		}
		if(s.backgroundImageClipTop != null) {
			this.backgroundImageClipTop = s.backgroundImageClipTop;
		}
		if(s.backgroundImageClipLeft != null) {
			this.backgroundImageClipLeft = s.backgroundImageClipLeft;
		}
		if(s.backgroundImageClipBottom != null) {
			this.backgroundImageClipBottom = s.backgroundImageClipBottom;
		}
		if(s.backgroundImageClipRight != null) {
			this.backgroundImageClipRight = s.backgroundImageClipRight;
		}
		if(s.backgroundImageSliceTop != null) {
			this.backgroundImageSliceTop = s.backgroundImageSliceTop;
		}
		if(s.backgroundImageSliceLeft != null) {
			this.backgroundImageSliceLeft = s.backgroundImageSliceLeft;
		}
		if(s.backgroundImageSliceBottom != null) {
			this.backgroundImageSliceBottom = s.backgroundImageSliceBottom;
		}
		if(s.backgroundImageSliceRight != null) {
			this.backgroundImageSliceRight = s.backgroundImageSliceRight;
		}
		if(s.borderColor != null) {
			this.borderColor = s.borderColor;
		}
		if(s.borderTopColor != null) {
			this.borderTopColor = s.borderTopColor;
		}
		if(s.borderLeftColor != null) {
			this.borderLeftColor = s.borderLeftColor;
		}
		if(s.borderBottomColor != null) {
			this.borderBottomColor = s.borderBottomColor;
		}
		if(s.borderRightColor != null) {
			this.borderRightColor = s.borderRightColor;
		}
		if(s.borderSize != null) {
			this.borderSize = s.borderSize;
		}
		if(s.borderTopSize != null) {
			this.borderTopSize = s.borderTopSize;
		}
		if(s.borderLeftSize != null) {
			this.borderLeftSize = s.borderLeftSize;
		}
		if(s.borderBottomSize != null) {
			this.borderBottomSize = s.borderBottomSize;
		}
		if(s.borderRightSize != null) {
			this.borderRightSize = s.borderRightSize;
		}
		if(s.borderRadius != null) {
			this.borderRadius = s.borderRadius;
		}
		if(s.borderRadiusTopLeft != null) {
			this.borderRadiusTopLeft = s.borderRadiusTopLeft;
		}
		if(s.borderRadiusTopRight != null) {
			this.borderRadiusTopRight = s.borderRadiusTopRight;
		}
		if(s.borderRadiusBottomLeft != null) {
			this.borderRadiusBottomLeft = s.borderRadiusBottomLeft;
		}
		if(s.borderRadiusBottomRight != null) {
			this.borderRadiusBottomRight = s.borderRadiusBottomRight;
		}
		if(s.borderOpacity != null) {
			this.borderOpacity = s.borderOpacity;
		}
		if(s.borderStyle != null) {
			this.borderStyle = s.borderStyle;
		}
		if(s.filter != null) {
			this.filter = s.filter.slice();
		}
		if(s.backdropFilter != null) {
			this.backdropFilter = s.backdropFilter.slice();
		}
		if(s.resource != null) {
			this.resource = s.resource;
		}
		if(s.icon != null) {
			this.icon = s.icon;
		}
		if(s.iconPosition != null) {
			this.iconPosition = s.iconPosition;
		}
		if(s.horizontalAlign != null) {
			this.horizontalAlign = s.horizontalAlign;
		}
		if(s.verticalAlign != null) {
			this.verticalAlign = s.verticalAlign;
		}
		if(s.textAlign != null) {
			this.textAlign = s.textAlign;
		}
		if(s.opacity != null) {
			this.opacity = s.opacity;
		}
		if(s.clip != null) {
			this.clip = s.clip;
		}
		if(s.native != null) {
			this.native = s.native;
		}
		if(s.fontName != null) {
			this.fontName = s.fontName;
		}
		if(s.fontSize != null) {
			this.fontSize = s.fontSize;
		}
		if(s.fontBold != null) {
			this.fontBold = s.fontBold;
		}
		if(s.fontUnderline != null) {
			this.fontUnderline = s.fontUnderline;
		}
		if(s.fontItalic != null) {
			this.fontItalic = s.fontItalic;
		}
		if(s.animationName != null) {
			this.animationName = s.animationName;
		}
		if(s.animationOptions != null) {
			if(this.animationOptions == null) {
				this.animationOptions = new haxe_ui_styles_animation_AnimationOptions(null,null,null,null,null,null);
			}
			if(s.animationOptions.duration != null) {
				this.animationOptions.duration = s.animationOptions.duration;
			}
			if(s.animationOptions.delay != null) {
				this.animationOptions.delay = s.animationOptions.delay;
			}
			if(s.animationOptions.iterationCount != null) {
				this.animationOptions.iterationCount = s.animationOptions.iterationCount;
			}
			if(s.animationOptions.easingFunction != null) {
				this.animationOptions.easingFunction = s.animationOptions.easingFunction;
			}
			if(s.animationOptions.direction != null) {
				this.animationOptions.direction = s.animationOptions.direction;
			}
			if(s.animationOptions.fillMode != null) {
				this.animationOptions.fillMode = s.animationOptions.fillMode;
			}
		}
		if(s.mode != null) {
			this.mode = s.mode;
		}
		if(s.pointerEvents != null) {
			this.pointerEvents = s.pointerEvents;
		}
		if(s.contentType != null) {
			this.contentType = s.contentType;
		}
		if(s.direction != null) {
			this.direction = s.direction;
		}
		if(s.contentWidth != null) {
			this.contentWidth = s.contentWidth;
		}
		if(s.contentWidthPercent != null) {
			this.contentWidthPercent = s.contentWidthPercent;
		}
		if(s.contentHeight != null) {
			this.contentHeight = s.contentHeight;
		}
		if(s.contentHeightPercent != null) {
			this.contentHeightPercent = s.contentHeightPercent;
		}
		if(s.wordWrap != null) {
			this.wordWrap = s.wordWrap;
		}
	}
	,equalTo: function(s) {
		if(s.backgroundColor != this.backgroundColor) {
			return false;
		}
		if(s.backgroundColorEnd != this.backgroundColorEnd) {
			return false;
		}
		if(s.backgroundGradientStyle != this.backgroundGradientStyle) {
			return false;
		}
		if(s.backgroundOpacity != this.backgroundOpacity) {
			return false;
		}
		if(s.borderColor != this.borderColor) {
			return false;
		}
		if(s.borderTopColor != this.borderTopColor) {
			return false;
		}
		if(s.borderLeftColor != this.borderLeftColor) {
			return false;
		}
		if(s.borderBottomColor != this.borderBottomColor) {
			return false;
		}
		if(s.borderRightColor != this.borderRightColor) {
			return false;
		}
		if(s.borderSize != this.borderSize) {
			return false;
		}
		if(s.borderTopSize != this.borderTopSize) {
			return false;
		}
		if(s.borderLeftSize != this.borderLeftSize) {
			return false;
		}
		if(s.borderBottomSize != this.borderBottomSize) {
			return false;
		}
		if(s.borderRightSize != this.borderRightSize) {
			return false;
		}
		if(s.borderRadius != this.borderRadius) {
			return false;
		}
		if(s.borderRadiusTopLeft != this.borderRadiusTopLeft) {
			return false;
		}
		if(s.borderRadiusTopRight != this.borderRadiusTopRight) {
			return false;
		}
		if(s.borderRadiusBottomLeft != this.borderRadiusBottomLeft) {
			return false;
		}
		if(s.borderRadiusBottomRight != this.borderRadiusBottomRight) {
			return false;
		}
		if(s.borderOpacity != this.borderOpacity) {
			return false;
		}
		if(s.borderStyle != this.borderStyle) {
			return false;
		}
		if(s.color != this.color) {
			return false;
		}
		if(s.cursor != this.cursor) {
			return false;
		}
		if(s.hidden != this.hidden) {
			return false;
		}
		if(s.left != this.left) {
			return false;
		}
		if(s.top != this.top) {
			return false;
		}
		if(s.autoWidth != this.autoWidth) {
			return false;
		}
		if(s.autoHeight != this.autoHeight) {
			return false;
		}
		if(s.verticalSpacing != this.verticalSpacing) {
			return false;
		}
		if(s.horizontalSpacing != this.horizontalSpacing) {
			return false;
		}
		if(s.width != this.width) {
			return false;
		}
		if(s.initialWidth != this.initialWidth) {
			return false;
		}
		if(s.initialPercentWidth != this.initialPercentWidth) {
			return false;
		}
		if(s.minWidth != this.minWidth) {
			return false;
		}
		if(s.minPercentWidth != this.minPercentWidth) {
			return false;
		}
		if(s.maxWidth != this.maxWidth) {
			return false;
		}
		if(s.maxPercentWidth != this.maxPercentWidth) {
			return false;
		}
		if(s.height != this.height) {
			return false;
		}
		if(s.initialHeight != this.initialHeight) {
			return false;
		}
		if(s.initialPercentHeight != this.initialPercentHeight) {
			return false;
		}
		if(s.minHeight != this.minHeight) {
			return false;
		}
		if(s.minPercentHeight != this.minPercentHeight) {
			return false;
		}
		if(s.maxHeight != this.maxHeight) {
			return false;
		}
		if(s.maxPercentHeight != this.maxPercentHeight) {
			return false;
		}
		if(s.percentWidth != this.percentWidth) {
			return false;
		}
		if(s.percentHeight != this.percentHeight) {
			return false;
		}
		if(s.paddingTop != this.paddingTop) {
			return false;
		}
		if(s.paddingLeft != this.paddingLeft) {
			return false;
		}
		if(s.paddingRight != this.paddingRight) {
			return false;
		}
		if(s.paddingBottom != this.paddingBottom) {
			return false;
		}
		if(s.marginTop != this.marginTop) {
			return false;
		}
		if(s.marginLeft != this.marginLeft) {
			return false;
		}
		if(s.marginRight != this.marginRight) {
			return false;
		}
		if(s.marginBottom != this.marginBottom) {
			return false;
		}
		if(s.backgroundImage != this.backgroundImage) {
			return false;
		}
		if(s.backgroundImageRepeat != this.backgroundImageRepeat) {
			return false;
		}
		if(s.backgroundImageClipTop != this.backgroundImageClipTop) {
			return false;
		}
		if(s.backgroundImageClipLeft != this.backgroundImageClipLeft) {
			return false;
		}
		if(s.backgroundImageClipBottom != this.backgroundImageClipBottom) {
			return false;
		}
		if(s.backgroundImageClipRight != this.backgroundImageClipRight) {
			return false;
		}
		if(s.backgroundImageSliceTop != this.backgroundImageSliceTop) {
			return false;
		}
		if(s.backgroundImageSliceLeft != this.backgroundImageSliceLeft) {
			return false;
		}
		if(s.backgroundImageSliceBottom != this.backgroundImageSliceBottom) {
			return false;
		}
		if(s.backgroundImageSliceRight != this.backgroundImageSliceRight) {
			return false;
		}
		if(s.filter != this.filter) {
			return false;
		}
		if(s.backdropFilter != this.backdropFilter) {
			return false;
		}
		if(s.resource != this.resource) {
			return false;
		}
		if(s.icon != this.icon) {
			return false;
		}
		if(s.iconPosition != this.iconPosition) {
			return false;
		}
		if(s.horizontalAlign != this.horizontalAlign) {
			return false;
		}
		if(s.verticalAlign != this.verticalAlign) {
			return false;
		}
		if(s.textAlign != this.textAlign) {
			return false;
		}
		if(s.opacity != this.opacity) {
			return false;
		}
		if(s.clip != this.clip) {
			return false;
		}
		if(s.native != this.native) {
			return false;
		}
		if(s.fontName != this.fontName) {
			return false;
		}
		if(s.fontSize != this.fontSize) {
			return false;
		}
		if(s.fontBold != this.fontBold) {
			return false;
		}
		if(s.fontUnderline != this.fontUnderline) {
			return false;
		}
		if(s.fontItalic != this.fontItalic) {
			return false;
		}
		if(s.resource != this.resource) {
			return false;
		}
		if(s.animationName != this.animationName) {
			return false;
		}
		if(this.animationOptions != null && this.animationOptions.compareTo(s.animationOptions) == false) {
			return false;
		}
		if(s.mode != this.mode) {
			return false;
		}
		if(s.pointerEvents != this.pointerEvents) {
			return false;
		}
		if(s.contentType != this.contentType) {
			return false;
		}
		if(s.direction != this.direction) {
			return false;
		}
		if(s.contentWidth != this.contentWidth) {
			return false;
		}
		if(s.contentWidthPercent != this.contentWidthPercent) {
			return false;
		}
		if(s.contentHeight != this.contentHeight) {
			return false;
		}
		if(s.contentHeightPercent != this.contentHeightPercent) {
			return false;
		}
		if(s.wordWrap != this.wordWrap) {
			return false;
		}
		return true;
	}
	,createAnimationOptions: function() {
		if(this.animationOptions == null) {
			this.animationOptions = new haxe_ui_styles_animation_AnimationOptions(null,null,null,null,null,null);
		}
	}
	,clone: function() {
		var c = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		c.apply(this);
		return c;
	}
	,__class__: haxe_ui_styles_Style
	,__properties__: {get_fullBorderSize:"get_fullBorderSize",get_hasBorder:"get_hasBorder",get_borderType:"get_borderType",set_padding:"set_padding"}
};
var haxe_ui_styles_StyleSheet = function() {
	this._animations = new haxe_ds_StringMap();
	this._mediaQueries = [];
	this._rules = [];
	this._imports = [];
};
$hxClasses["haxe.ui.styles.StyleSheet"] = haxe_ui_styles_StyleSheet;
haxe_ui_styles_StyleSheet.__name__ = "haxe.ui.styles.StyleSheet";
haxe_ui_styles_StyleSheet.prototype = {
	name: null
	,_imports: null
	,_rules: null
	,_mediaQueries: null
	,_animations: null
	,get_animations: function() {
		return this._animations;
	}
	,addImport: function(el) {
		this._imports.push(el);
	}
	,imports: null
	,get_imports: function() {
		return this._imports;
	}
	,rules: null
	,get_rules: function() {
		var r = this._rules.slice();
		var _g = 0;
		var _g1 = this._mediaQueries;
		while(_g < _g1.length) {
			var mq = _g1[_g];
			++_g;
			if(mq.get_relevant()) {
				r = r.concat(mq.get_styleSheet().get_rules());
			}
		}
		return r;
	}
	,hasMediaQueries: null
	,get_hasMediaQueries: function() {
		return this._mediaQueries.length > 0;
	}
	,findRule: function(selector) {
		var _g = 0;
		var _g1 = this.get_rules();
		while(_g < _g1.length) {
			var r = _g1[_g];
			++_g;
			if(r.selector.toString() == selector) {
				return r;
			}
		}
		return null;
	}
	,findMatchingRules: function(selector) {
		var m = [];
		var _g = 0;
		var _g1 = this.get_rules();
		while(_g < _g1.length) {
			var r = _g1[_g];
			++_g;
			if(r.selector.toString() == selector) {
				m.push(r);
			}
		}
		return m;
	}
	,removeRule: function(selector) {
		var r = this.findRule(selector);
		if(r != null) {
			HxOverrides.remove(this._rules,r);
		}
	}
	,removeAllRules: function() {
		this._rules = [];
	}
	,clear: function() {
		this.removeAllRules();
		this._imports = [];
		this._mediaQueries = [];
		this._animations = new haxe_ds_StringMap();
	}
	,addRule: function(el) {
		this._rules.push(el);
	}
	,addMediaQuery: function(el) {
		this._mediaQueries.push(el);
	}
	,addAnimation: function(el) {
		this._animations.h[el.id] = el;
	}
	,parse: function(css) {
		var parser = new haxe_ui_styles_Parser();
		var ss = parser.parse(css);
		var f = new haxe_ui_styles_StyleSheet();
		var _g = 0;
		var _g1 = ss.get_imports();
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			var importCss = haxe_ui_ToolkitAssets.get_instance().getText(i.url);
			var importStyleSheet = new haxe_ui_styles_Parser().parse(importCss);
			f.merge(importStyleSheet);
		}
		f.merge(ss);
		this.merge(f);
	}
	,merge: function(styleSheet) {
		this._imports = this._imports.concat(styleSheet._imports);
		this._rules = this._rules.concat(styleSheet._rules);
		this._mediaQueries = this._mediaQueries.concat(styleSheet._mediaQueries);
		var h = styleSheet._animations.h;
		var k_h = h;
		var k_keys = Object.keys(h);
		var k_length = k_keys.length;
		var k_current = 0;
		while(k_current < k_length) {
			var k = k_keys[k_current++];
			this._animations.h[k] = styleSheet._animations.h[k];
		}
	}
	,buildStyleFor: function(c,style) {
		if(style == null) {
			style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		var _g = 0;
		var _g1 = this.get_rules();
		while(_g < _g1.length) {
			var r = _g1[_g];
			++_g;
			if(!r.match(c)) {
				continue;
			}
			style.mergeDirectives(r.directives);
		}
		return style;
	}
	,__class__: haxe_ui_styles_StyleSheet
	,__properties__: {get_hasMediaQueries:"get_hasMediaQueries",get_rules:"get_rules",get_imports:"get_imports",get_animations:"get_animations"}
};
var haxe_ui_styles_Value = $hxEnums["haxe.ui.styles.Value"] = { __ename__:true,__constructs__:null
	,VString: ($_=function(v) { return {_hx_index:0,v:v,__enum__:"haxe.ui.styles.Value",toString:$estr}; },$_._hx_name="VString",$_.__params__ = ["v"],$_)
	,VNumber: ($_=function(v) { return {_hx_index:1,v:v,__enum__:"haxe.ui.styles.Value",toString:$estr}; },$_._hx_name="VNumber",$_.__params__ = ["v"],$_)
	,VBool: ($_=function(v) { return {_hx_index:2,v:v,__enum__:"haxe.ui.styles.Value",toString:$estr}; },$_._hx_name="VBool",$_.__params__ = ["v"],$_)
	,VDimension: ($_=function(v) { return {_hx_index:3,v:v,__enum__:"haxe.ui.styles.Value",toString:$estr}; },$_._hx_name="VDimension",$_.__params__ = ["v"],$_)
	,VColor: ($_=function(v) { return {_hx_index:4,v:v,__enum__:"haxe.ui.styles.Value",toString:$estr}; },$_._hx_name="VColor",$_.__params__ = ["v"],$_)
	,VCall: ($_=function(f,vl) { return {_hx_index:5,f:f,vl:vl,__enum__:"haxe.ui.styles.Value",toString:$estr}; },$_._hx_name="VCall",$_.__params__ = ["f","vl"],$_)
	,VConstant: ($_=function(v) { return {_hx_index:6,v:v,__enum__:"haxe.ui.styles.Value",toString:$estr}; },$_._hx_name="VConstant",$_.__params__ = ["v"],$_)
	,VComposite: ($_=function(vl) { return {_hx_index:7,vl:vl,__enum__:"haxe.ui.styles.Value",toString:$estr}; },$_._hx_name="VComposite",$_.__params__ = ["vl"],$_)
	,VTime: ($_=function(v,unit) { return {_hx_index:8,v:v,unit:unit,__enum__:"haxe.ui.styles.Value",toString:$estr}; },$_._hx_name="VTime",$_.__params__ = ["v","unit"],$_)
	,VNone: {_hx_name:"VNone",_hx_index:9,__enum__:"haxe.ui.styles.Value",toString:$estr}
};
haxe_ui_styles_Value.__constructs__ = [haxe_ui_styles_Value.VString,haxe_ui_styles_Value.VNumber,haxe_ui_styles_Value.VBool,haxe_ui_styles_Value.VDimension,haxe_ui_styles_Value.VColor,haxe_ui_styles_Value.VCall,haxe_ui_styles_Value.VConstant,haxe_ui_styles_Value.VComposite,haxe_ui_styles_Value.VTime,haxe_ui_styles_Value.VNone];
var haxe_ui_styles_ValueTools = function() { };
$hxClasses["haxe.ui.styles.ValueTools"] = haxe_ui_styles_ValueTools;
haxe_ui_styles_ValueTools.__name__ = "haxe.ui.styles.ValueTools";
haxe_ui_styles_ValueTools.parse = function(s) {
	var v = null;
	var hasSpace = s.indexOf(" ") != -1;
	if(StringTools.endsWith(s,"%") == true && hasSpace == false) {
		v = haxe_ui_styles_Value.VDimension(haxe_ui_styles_Dimension.PERCENT(parseFloat(s)));
	} else if(StringTools.endsWith(s,"px") == true && hasSpace == false) {
		v = haxe_ui_styles_Value.VDimension(haxe_ui_styles_Dimension.PX(parseFloat(s)));
	} else if(StringTools.endsWith(s,"vw") == true && hasSpace == false) {
		v = haxe_ui_styles_Value.VDimension(haxe_ui_styles_Dimension.VW(parseFloat(s)));
	} else if(StringTools.endsWith(s,"vh") == true && hasSpace == false) {
		v = haxe_ui_styles_Value.VDimension(haxe_ui_styles_Dimension.VH(parseFloat(s)));
	} else if(StringTools.endsWith(s,"rem") == true && hasSpace == false) {
		v = haxe_ui_styles_Value.VDimension(haxe_ui_styles_Dimension.REM(parseFloat(s)));
	} else if(haxe_ui_styles_ValueTools.validColor(s)) {
		v = haxe_ui_styles_ValueTools.parseColor(s);
	} else if(s == "none") {
		v = haxe_ui_styles_Value.VNone;
	} else if(s.indexOf("(") != -1 && StringTools.endsWith(s,")")) {
		var n = s.indexOf("(");
		var f = HxOverrides.substr(s,0,n);
		var params = HxOverrides.substr(s,n + 1,s.length - n - 2);
		if(f == "calc") {
			params = "'" + params + "'";
		}
		var vl = [];
		var _g = 0;
		var _g1 = params.split(",");
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			p = StringTools.trim(p);
			vl.push(haxe_ui_styles_ValueTools.parse(p));
		}
		v = haxe_ui_styles_Value.VCall(f,vl);
	} else if(StringTools.startsWith(s,"\"") && StringTools.endsWith(s,"\"")) {
		v = haxe_ui_styles_Value.VString(HxOverrides.substr(s,1,s.length - 2));
	} else if(StringTools.startsWith(s,"'") && StringTools.endsWith(s,"'")) {
		v = haxe_ui_styles_Value.VString(HxOverrides.substr(s,1,s.length - 2));
	} else if(haxe_ui_styles_ValueTools.isNum(s) == true) {
		v = haxe_ui_styles_Value.VNumber(parseFloat(s));
	} else if(s == "true" || s == "false") {
		v = haxe_ui_styles_Value.VBool(s == "true");
	} else if(haxe_ui_styles_ValueTools.timeEReg.match(s)) {
		v = haxe_ui_styles_Value.VTime(parseFloat(haxe_ui_styles_ValueTools.timeEReg.matched(1)),haxe_ui_styles_ValueTools.timeEReg.matched(2));
	} else {
		var arr = s.split(" ");
		if(arr.length == 1) {
			v = haxe_ui_styles_Value.VConstant(s);
		} else {
			var vl = [];
			var _g = 0;
			while(_g < arr.length) {
				var a = arr[_g];
				++_g;
				a = StringTools.trim(a);
				vl.push(haxe_ui_styles_ValueTools.parse(a));
			}
			v = haxe_ui_styles_Value.VComposite(vl);
		}
	}
	return v;
};
haxe_ui_styles_ValueTools.compositeParts = function(value) {
	if(value == null) {
		return 0;
	}
	if(value._hx_index == 7) {
		var vl = value.vl;
		return vl.length;
	} else {
		return 0;
	}
};
haxe_ui_styles_ValueTools.composite = function(value) {
	if(value == null) {
		return null;
	}
	switch(value._hx_index) {
	case 1:
		var _g = value.v;
		return [value];
	case 3:
		var _g = value.v;
		return [value];
	case 7:
		var vl = value.vl;
		return vl;
	case 9:
		return [];
	default:
		return null;
	}
};
haxe_ui_styles_ValueTools.isNum = function(s) {
	var b = true;
	var _g = 0;
	var _g1 = s.length;
	while(_g < _g1) {
		var i = _g++;
		var c = HxOverrides.cca(s,i);
		if(!(c >= 48 && c <= 57 || c == 46 || c == 45)) {
			b = false;
			break;
		}
	}
	return b;
};
haxe_ui_styles_ValueTools.parseColor = function(s) {
	if(StringTools.startsWith(s,"#")) {
		s = s.substring(1);
		if(s.length == 6) {
			return haxe_ui_styles_Value.VColor(Std.parseInt("0x" + s));
		} else if(s.length == 3) {
			return haxe_ui_styles_Value.VColor(Std.parseInt("0x" + s.charAt(0) + s.charAt(0) + s.charAt(1) + s.charAt(1) + s.charAt(2) + s.charAt(2)));
		}
	} else if(Object.prototype.hasOwnProperty.call(haxe_ui_styles_ValueTools.colors.h,s)) {
		return haxe_ui_styles_Value.VColor(haxe_ui_styles_ValueTools.colors.h[s]);
	}
	return null;
};
haxe_ui_styles_ValueTools.validColor = function(s) {
	if(StringTools.startsWith(s,"#") && (s.length == 7 || s.length == 4)) {
		return true;
	} else if(Object.prototype.hasOwnProperty.call(haxe_ui_styles_ValueTools.colors.h,s)) {
		return true;
	}
	return false;
};
haxe_ui_styles_ValueTools.time = function(value) {
	if(value == null) {
		return null;
	}
	if(value._hx_index == 8) {
		var v = value.v;
		var unit = value.unit;
		switch(unit) {
		case "ms":
			return v / 1000;
		case "s":
			return v;
		default:
			return null;
		}
	} else {
		return null;
	}
};
haxe_ui_styles_ValueTools.string = function(value) {
	if(value == null) {
		return null;
	}
	switch(value._hx_index) {
	case 0:
		var v = value.v;
		return v;
	case 2:
		var v = value.v;
		if(v == null) {
			return "null";
		} else {
			return "" + v;
		}
		break;
	case 5:
		var f = value.f;
		var vl = value.vl;
		return haxe_ui_styles_ValueTools.call(f,vl);
	case 6:
		var v = value.v;
		return v;
	default:
		return null;
	}
};
haxe_ui_styles_ValueTools.bool = function(value) {
	if(value == null) {
		return null;
	}
	if(value._hx_index == 2) {
		var v = value.v;
		return v;
	} else {
		return null;
	}
};
haxe_ui_styles_ValueTools.none = function(value) {
	if(value == null) {
		return null;
	}
	if(value._hx_index == 9) {
		return true;
	} else {
		return null;
	}
};
haxe_ui_styles_ValueTools.int = function(value) {
	if(value == null) {
		return null;
	}
	switch(value._hx_index) {
	case 1:
		var v = value.v;
		return v | 0;
	case 4:
		var v = value.v;
		return v;
	case 5:
		var f = value.f;
		var vl = value.vl;
		return haxe_ui_styles_ValueTools.call(f,vl);
	case 9:
		return null;
	default:
		return null;
	}
};
haxe_ui_styles_ValueTools.float = function(value) {
	if(value == null) {
		return null;
	}
	switch(value._hx_index) {
	case 1:
		var v = value.v;
		return v;
	case 4:
		var v = value.v;
		return v;
	case 9:
		return null;
	default:
		return null;
	}
};
haxe_ui_styles_ValueTools.any = function(v) {
	if(v == null) {
		return null;
	}
	switch(v._hx_index) {
	case 1:
		var v1 = v.v;
		return v1;
	case 2:
		var v1 = v.v;
		return v1;
	case 3:
		var _g = v.v;
		if(_g._hx_index == 1) {
			var v1 = _g.value;
			return v1;
		} else {
			return null;
		}
		break;
	case 4:
		var v1 = v.v;
		return v1;
	default:
		return null;
	}
};
haxe_ui_styles_ValueTools.array = function(vl) {
	var arr = [];
	var _g = 0;
	while(_g < vl.length) {
		var v = vl[_g];
		++_g;
		var a = haxe_ui_styles_ValueTools.any(v);
		if(a != null) {
			arr.push(a);
		}
	}
	return arr;
};
haxe_ui_styles_ValueTools.percent = function(value) {
	if(value == null) {
		return null;
	}
	if(value._hx_index == 3) {
		var v = value.v;
		if(v._hx_index == 0) {
			var d = v.value;
			return d;
		} else {
			return null;
		}
	} else {
		return null;
	}
};
haxe_ui_styles_ValueTools.constant = function(value,required) {
	if(value == null) {
		return false;
	}
	if(value._hx_index == 6) {
		var v = value.v;
		return v == required;
	} else {
		return false;
	}
};
haxe_ui_styles_ValueTools.calcDimension = function(value) {
	if(value == null) {
		return null;
	}
	switch(value._hx_index) {
	case 1:
		var v = value.v;
		return v;
	case 3:
		var v = value.v;
		switch(v._hx_index) {
		case 1:
			var d = v.value;
			return d;
		case 2:
			var d = v.value;
			return d / 100 * haxe_ui_core_Screen.get_instance().get_width();
		case 3:
			var d = v.value;
			return d / 100 * haxe_ui_core_Screen.get_instance().get_height();
		case 4:
			var d = v.value;
			return d * haxe_ui_Toolkit.pixelsPerRem;
		default:
			return null;
		}
		break;
	case 5:
		var f = value.f;
		var vl = value.vl;
		return haxe_ui_styles_ValueTools.call(f,vl);
	case 9:
		return null;
	default:
		return null;
	}
};
haxe_ui_styles_ValueTools.calcEasing = function(value) {
	switch(value._hx_index) {
	case 0:
		var v = value.v;
		switch(v) {
		case "ease":
			return haxe_ui_styles_EasingFunction.EASE;
		case "ease-in":
			return haxe_ui_styles_EasingFunction.EASE_IN;
		case "ease-in-out":
			return haxe_ui_styles_EasingFunction.EASE_IN_OUT;
		case "ease-out":
			return haxe_ui_styles_EasingFunction.EASE_OUT;
		case "linear":
			return haxe_ui_styles_EasingFunction.LINEAR;
		default:
			return null;
		}
		break;
	case 6:
		var v = value.v;
		switch(v) {
		case "ease":
			return haxe_ui_styles_EasingFunction.EASE;
		case "ease-in":
			return haxe_ui_styles_EasingFunction.EASE_IN;
		case "ease-in-out":
			return haxe_ui_styles_EasingFunction.EASE_IN_OUT;
		case "ease-out":
			return haxe_ui_styles_EasingFunction.EASE_OUT;
		case "linear":
			return haxe_ui_styles_EasingFunction.LINEAR;
		default:
			return null;
		}
		break;
	default:
		return null;
	}
};
haxe_ui_styles_ValueTools.call = function(f,vl) {
	switch(f) {
	case "calc":
		return null;
	case "platform-color":
		return haxe_ui_core_Platform.get_instance().getColor(haxe_ui_styles_ValueTools.string(vl[0]));
	case "theme-icon":case "theme-image":
		console.log("haxe/ui/styles/ValueTools.hx:399:","here");
		return haxe_ui_themes_ThemeManager.get_instance().image(haxe_ui_styles_ValueTools.string(vl[0]));
	default:
		return null;
	}
};
var haxe_ui_styles_animation_AnimationOptions = function(duration,delay,iterationCount,easingFunction,direction,fillMode) {
	this.duration = duration;
	this.delay = delay;
	this.iterationCount = iterationCount;
	this.easingFunction = easingFunction;
	this.direction = direction;
	this.fillMode = fillMode;
};
$hxClasses["haxe.ui.styles.animation.AnimationOptions"] = haxe_ui_styles_animation_AnimationOptions;
haxe_ui_styles_animation_AnimationOptions.__name__ = "haxe.ui.styles.animation.AnimationOptions";
haxe_ui_styles_animation_AnimationOptions.prototype = {
	duration: null
	,delay: null
	,iterationCount: null
	,easingFunction: null
	,direction: null
	,fillMode: null
	,compareTo: function(op) {
		if(op != null && op.duration == this.duration && op.delay == this.delay && op.iterationCount == this.iterationCount && op.easingFunction == this.easingFunction && op.direction == this.direction) {
			return op.fillMode == this.fillMode;
		} else {
			return false;
		}
	}
	,compareToAnimation: function(anim) {
		if((this.duration == null && anim.duration == 0 || this.duration != null && anim.duration == this.duration) && (this.delay == null && anim.delay == 0 || this.delay != null && anim.delay == this.delay) && (this.iterationCount == null && anim.iterationCount == 1 || this.iterationCount != null && anim.iterationCount == this.iterationCount) && (this.easingFunction == null && anim.easingFunction == haxe_ui_styles_animation_AnimationOptions.DEFAULT_EASING_FUNCTION || this.easingFunction != null && anim.easingFunction == this.easingFunction) && (this.direction == null && anim.direction == "normal" || this.direction != null && anim.direction == this.direction)) {
			if(!(this.fillMode == null && anim.fillMode == "forwards")) {
				if(this.fillMode != null) {
					return anim.fillMode == this.fillMode;
				} else {
					return false;
				}
			} else {
				return true;
			}
		} else {
			return false;
		}
	}
	,__class__: haxe_ui_styles_animation_AnimationOptions
};
var haxe_ui_styles_animation_Animation = function(target,options) {
	this._initialized = false;
	this._currentIterationCount = -1;
	this._currentKeyFrameIndex = -1;
	this.iterationCount = 1;
	this.fillMode = "forwards";
	this.easingFunction = haxe_ui_styles_animation_AnimationOptions.DEFAULT_EASING_FUNCTION;
	this.duration = 0;
	this.direction = "normal";
	this.delay = 0;
	this.target = target;
	if(options != null) {
		if(options.duration != null) {
			this.duration = options.duration;
		}
		if(options.easingFunction != null) {
			this.easingFunction = options.easingFunction;
		}
		if(options.delay != null) {
			this.delay = options.delay;
		}
		if(options.iterationCount != null) {
			this.iterationCount = options.iterationCount;
		}
		if(options.direction != null) {
			this.direction = options.direction;
		}
		if(options.fillMode != null) {
			this.fillMode = options.fillMode;
		}
	}
};
$hxClasses["haxe.ui.styles.animation.Animation"] = haxe_ui_styles_animation_Animation;
haxe_ui_styles_animation_Animation.__name__ = "haxe.ui.styles.animation.Animation";
haxe_ui_styles_animation_Animation.createWithKeyFrames = function(animationKeyFrames,target,options) {
	var animation = new haxe_ui_styles_animation_Animation(target,options);
	animation.name = animationKeyFrames.id;
	if(animation._keyframes == null) {
		animation._keyframes = [];
	}
	var _g = 0;
	var _g1 = animationKeyFrames.get_keyFrames();
	while(_g < _g1.length) {
		var keyFrame = _g1[_g];
		++_g;
		var kf = new haxe_ui_styles_animation_KeyFrame();
		var _g2 = keyFrame.time;
		if(_g2._hx_index == 3) {
			var v = _g2.v;
			if(v._hx_index == 0) {
				var p = v.value;
				kf.time = p / 100;
				kf.easingFunction = animation.easingFunction;
				kf.directives = keyFrame.directives;
				animation._keyframes.push(kf);
			}
		}
	}
	return animation;
};
haxe_ui_styles_animation_Animation.prototype = {
	delay: null
	,direction: null
	,duration: null
	,easingFunction: null
	,fillMode: null
	,iterationCount: null
	,name: null
	,running: null
	,target: null
	,run: function(onFinish) {
		if(this.get_keyframeCount() == 0 || this.running) {
			return;
		}
		if(!this._initialized) {
			this._initialize();
		}
		this._currentKeyFrameIndex = -1;
		this._currentIterationCount = 0;
		this.running = true;
		this._saveState();
		this._runNextKeyframe(onFinish);
	}
	,stop: function() {
		if(this.running == false) {
			return;
		}
		this.running = false;
		var currentKF = this.get_currentKeyFrame();
		if(currentKF != null) {
			currentKF.stop();
			this._currentKeyFrameIndex = -1;
		}
		this._keyframes = null;
		this._restoreState();
	}
	,_currentKeyFrameIndex: null
	,_currentIterationCount: null
	,_initialState: null
	,_initialized: null
	,_keyframes: null
	,get_keyframeCount: function() {
		if(this._keyframes == null) {
			return 0;
		} else {
			return this._keyframes.length;
		}
	}
	,get_currentKeyFrame: function() {
		if(this._currentKeyFrameIndex >= 0) {
			return this._keyframes[this._currentKeyFrameIndex];
		} else {
			return null;
		}
	}
	,_initialize: function() {
		switch(this.direction) {
		case "alternate":
			this._addAlternateKeyframes();
			break;
		case "alternate-reverse":
			this._reverseCurrentKeyframes();
			this._addAlternateKeyframes();
			break;
		case "normal":
			break;
		case "reverse":
			this._reverseCurrentKeyframes();
			break;
		}
		var currentTime = 0;
		var _g = 0;
		var _g1 = this._keyframes;
		while(_g < _g1.length) {
			var keyframe = _g1[_g];
			++_g;
			switch(this.direction) {
			case "alternate-reverse":case "reverse":
				keyframe.time = 1 - keyframe.time;
				break;
			case "alternate":case "normal":
				break;
			}
			keyframe.time = this.duration * keyframe.time - currentTime;
			currentTime += keyframe.time;
		}
		if(this.delay > 0) {
			var keyframe = new haxe_ui_styles_animation_KeyFrame();
			keyframe.time = this.delay;
			keyframe.easingFunction = this.easingFunction;
			this._keyframes.unshift(keyframe);
		} else if(this.delay < 0) {
			currentTime = 0;
			var lastKeyframe = null;
			while(this._keyframes.length > 0) {
				var keyframe = this._keyframes[0];
				currentTime -= keyframe.time;
				if(currentTime >= this.delay) {
					lastKeyframe = keyframe;
					this._keyframes.splice(0,1);
				} else {
					keyframe.delay = -(currentTime - this.delay + keyframe.time);
					if(lastKeyframe != null) {
						lastKeyframe.time = 0;
						this._keyframes.unshift(lastKeyframe);
					}
					break;
				}
			}
		}
		this._initialized = true;
	}
	,_runNextKeyframe: function(onFinish) {
		if(this.running == false) {
			return;
		}
		if(++this._currentKeyFrameIndex >= this._keyframes.length) {
			this._currentKeyFrameIndex = -1;
			this._restoreState();
			if(this.iterationCount == -1 || ++this._currentIterationCount < this.iterationCount) {
				this._saveState();
				this._runNextKeyframe(onFinish);
			} else {
				this.running = false;
				if(onFinish != null) {
					onFinish();
				}
			}
			return;
		} else {
			var _g = $bind(this,this._runNextKeyframe);
			var onFinish1 = onFinish;
			var tmp = function() {
				_g(onFinish1);
			};
			this.get_currentKeyFrame().run(this.target,tmp);
		}
	}
	,_addAlternateKeyframes: function() {
		var i = this._keyframes.length;
		while(--i >= 0) {
			var keyframe = this._keyframes[i];
			var newKeyframe = new haxe_ui_styles_animation_KeyFrame();
			newKeyframe.time = 1 - keyframe.time;
			newKeyframe.easingFunction = this._getReverseEasingFunction(keyframe.easingFunction);
			newKeyframe.directives = keyframe.directives;
			this._keyframes.push(newKeyframe);
		}
	}
	,_reverseCurrentKeyframes: function() {
		this._keyframes.reverse();
		var func = this._getReverseEasingFunction(this.easingFunction);
		var _g = 0;
		var _g1 = this._keyframes;
		while(_g < _g1.length) {
			var keyframe = _g1[_g];
			++_g;
			keyframe.easingFunction = func;
		}
	}
	,_getReverseEasingFunction: function(easingFunction) {
		switch(easingFunction._hx_index) {
		case 2:
			return haxe_ui_styles_EasingFunction.EASE_OUT;
		case 3:
			return haxe_ui_styles_EasingFunction.EASE_IN;
		default:
			return easingFunction;
		}
	}
	,_saveState: function() {
		if(!this._shouldRestoreState()) {
			return;
		}
		if(this._initialState == null) {
			this._initialState = new haxe_ds_StringMap();
		}
		var _g = 0;
		var _g1 = this._keyframes;
		while(_g < _g1.length) {
			var keyframe = _g1[_g];
			++_g;
			var _g2 = 0;
			var _g3 = keyframe.directives;
			while(_g2 < _g3.length) {
				var directive = _g3[_g2];
				++_g2;
				var property = haxe_ui_util_StyleUtil.styleProperty2ComponentProperty(directive.directive);
				if(!Object.prototype.hasOwnProperty.call(this._initialState.h,property)) {
					var this1 = this._initialState;
					var value = Reflect.getProperty(this.target,property);
					this1.h[property] = value;
				}
			}
		}
	}
	,_restoreState: function() {
		if(!this._shouldRestoreState()) {
			return;
		}
		if(this._initialState != null) {
			var h = this._initialState.h;
			var property_h = h;
			var property_keys = Object.keys(h);
			var property_length = property_keys.length;
			var property_current = 0;
			while(property_current < property_length) {
				var property = property_keys[property_current++];
				Reflect.setProperty(this.target,property,this._initialState.h[property]);
			}
			this._initialState = null;
		}
	}
	,_shouldRestoreState: function() {
		if(!(this.fillMode == "none" || this.fillMode == "forwards" && this.direction != "normal" && this.direction != "alternate")) {
			if(this.fillMode == "backwards" && this.direction != "reverse") {
				return this.direction != "alternate-reverse";
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
	,__class__: haxe_ui_styles_animation_Animation
	,__properties__: {get_keyframeCount:"get_keyframeCount",get_currentKeyFrame:"get_currentKeyFrame"}
};
var haxe_ui_styles_animation_KeyFrame = function() {
	this.delay = 0;
	this.time = 0;
	this.directives = [];
};
$hxClasses["haxe.ui.styles.animation.KeyFrame"] = haxe_ui_styles_animation_KeyFrame;
haxe_ui_styles_animation_KeyFrame.__name__ = "haxe.ui.styles.animation.KeyFrame";
haxe_ui_styles_animation_KeyFrame.prototype = {
	directives: null
	,time: null
	,delay: null
	,easingFunction: null
	,_actuator: null
	,stop: function() {
		if(this._actuator != null) {
			this._actuator.stop();
			this._actuator = null;
		}
	}
	,run: function(target,cb) {
		var _gthis = this;
		if(this._actuator != null) {
			return;
		}
		var properties = { };
		var _g = 0;
		var _g1 = this.directives;
		while(_g < _g1.length) {
			var d = _g1[_g];
			++_g;
			properties[d.directive] = d.value;
		}
		this._actuator = new haxe_ui_styles_animation_util_Actuator(target,properties,this.time,new haxe_ui_styles_animation_util_ActuatorOptions(this.delay,this.easingFunction,function() {
			_gthis._actuator = null;
			cb();
		},null));
		this._actuator.run();
	}
	,__class__: haxe_ui_styles_animation_KeyFrame
};
var haxe_ui_styles_animation_util_ActuatorOptions = function(delay,easingFunction,onComplete,onUpdate) {
	this.delay = delay;
	this.easingFunction = easingFunction;
	this.onComplete = onComplete;
	this.onUpdate = onUpdate;
};
$hxClasses["haxe.ui.styles.animation.util.ActuatorOptions"] = haxe_ui_styles_animation_util_ActuatorOptions;
haxe_ui_styles_animation_util_ActuatorOptions.__name__ = "haxe.ui.styles.animation.util.ActuatorOptions";
haxe_ui_styles_animation_util_ActuatorOptions.prototype = {
	delay: null
	,easingFunction: null
	,onComplete: null
	,onUpdate: null
	,__class__: haxe_ui_styles_animation_util_ActuatorOptions
};
var haxe_ui_styles_animation_util_Actuator = function(target,properties,duration,options) {
	this.delay = 0;
	this.duration = 0;
	this.target = target;
	this.properties = properties;
	this.duration = duration;
	if(options != null) {
		this._easeFunc = haxe_ui_styles_animation_util__$Actuator_Ease.get(options.easingFunction != null ? options.easingFunction : haxe_ui_styles_EasingFunction.EASE);
		if(options.delay != null) {
			this.delay = options.delay;
		}
		if(options.onComplete != null) {
			this._onComplete = options.onComplete;
		}
		if(options.onUpdate != null) {
			this._onUpdate = options.onUpdate;
		}
	}
};
$hxClasses["haxe.ui.styles.animation.util.Actuator"] = haxe_ui_styles_animation_util_Actuator;
haxe_ui_styles_animation_util_Actuator.__name__ = "haxe.ui.styles.animation.util.Actuator";
haxe_ui_styles_animation_util_Actuator.tween = function(target,properties,duration,options) {
	var actuator = new haxe_ui_styles_animation_util_Actuator(target,properties,duration,options);
	actuator.run();
	return actuator;
};
haxe_ui_styles_animation_util_Actuator.prototype = {
	target: null
	,properties: null
	,duration: null
	,delay: null
	,stop: function() {
		this._stopped = true;
	}
	,run: function() {
		this._initialize();
		this._stopped = false;
		if(this.duration == 0) {
			this._apply(1);
			this._finish();
		} else {
			this._currentTime = HxOverrides.now() / 1000;
			if(this.delay > 0) {
				haxe_ui_util_Timer.delay($bind(this,this._nextFrame),this.delay * 1000 | 0);
			} else {
				new haxe_ui_CallLater($bind(this,this._nextFrame));
			}
		}
	}
	,_currentTime: null
	,_easeFunc: null
	,_onComplete: null
	,_onUpdate: null
	,_stopped: null
	,_propertyDetails: null
	,_colorPropertyDetails: null
	,_stringPropertyDetails: null
	,_initialize: function() {
		this._propertyDetails = [];
		this._colorPropertyDetails = [];
		this._stringPropertyDetails = [];
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			var componentProperty = haxe_ui_util_StyleUtil.styleProperty2ComponentProperty(p);
			var end = Reflect.getProperty(this.properties,p);
			if(end._hx_index == 3) {
				var _g2 = end.v;
				if(_g2._hx_index == 0) {
					var v = _g2.value;
					componentProperty = "percent" + haxe_ui_util_StringUtil.capitalizeFirstLetter(componentProperty);
				}
			}
			var start = Reflect.getProperty(this.target,componentProperty);
			if(start == null) {
				switch(end._hx_index) {
				case 0:
					var v1 = end.v;
					start = v1;
					break;
				case 1:
					var v2 = end.v;
					start = 0;
					break;
				case 3:
					var _g3 = end.v;
					if(_g3._hx_index == 0) {
						var v3 = _g3.value;
						start = 0;
					}
					break;
				default:
				}
			}
			var isVariant = false;
			if(start != null) {
				try {
					if(start._hx_index == 2) {
						var v4 = start.s;
						start = v4;
						isVariant = true;
					}
				} catch( _g4 ) {
				}
			}
			if(end != null) {
				try {
					if(end._hx_index == 2) {
						var v5 = end.s;
						end = v5;
						isVariant = true;
					}
				} catch( _g5 ) {
				}
			}
			if(start == null || end == null) {
				continue;
			}
			switch(end._hx_index) {
			case 0:
				var v6 = end.v;
				var startVal = start;
				var endVal = haxe_ui_styles_ValueTools.string(end);
				if(endVal.indexOf("[[") != -1) {
					var n1 = endVal.indexOf("[[");
					var n2 = endVal.indexOf("]]") + 2;
					var before = HxOverrides.substr(endVal,0,n1);
					var after = HxOverrides.substr(endVal,n2,null);
					var s = StringTools.replace(startVal,before,"");
					s = StringTools.replace(s,after,"");
					var startInt = Std.parseInt(s);
					var s1 = StringTools.replace(endVal,before + "[[","");
					s1 = StringTools.replace(s1,"]]" + after,"");
					var endInt = Std.parseInt(s1);
					var details = new haxe_ui_styles_animation_util_StringPropertyDetails(this.target,componentProperty,startVal,endVal);
					details.pattern = before + "[[n]]" + after;
					details.startInt = startInt;
					details.changeInt = endInt - startInt;
					var c = js_Boot.getClass(this.target);
					var typeInfo = haxe_ui_core_TypeMap.getTypeInfo(c.__name__,componentProperty);
					if(typeInfo != null && isVariant == false && typeInfo == "Variant") {
						isVariant = true;
					}
					details.isVariant = isVariant;
					this._stringPropertyDetails.push(details);
				} else {
					var details1 = new haxe_ui_styles_animation_util_StringPropertyDetails(this.target,componentProperty,startVal,endVal);
					this._stringPropertyDetails.push(details1);
				}
				break;
			case 3:
				var _g6 = end.v;
				if(_g6._hx_index == 0) {
					var v7 = _g6.value;
					var val = v7;
					if(val != null) {
						var details2 = new haxe_ui_styles_animation_util_PropertyDetails(this.target,componentProperty,start,val - start);
						this._propertyDetails.push(details2);
					}
				} else {
					var val1 = haxe_ui_styles_ValueTools.calcDimension(end);
					if(val1 != null) {
						var details3 = new haxe_ui_styles_animation_util_PropertyDetails(this.target,componentProperty,start,val1 - start);
						this._propertyDetails.push(details3);
					} else {
						var details4 = new haxe_ui_styles_animation_util_PropertyDetails(this.target,componentProperty,start,end - start);
						this._propertyDetails.push(details4);
					}
				}
				break;
			case 4:
				var v8 = end.v;
				var startColor = js_Boot.__cast(start , Int);
				var endColor = v8;
				var details5 = new haxe_ui_styles_animation_util_ColorPropertyDetails(this.target,componentProperty,startColor,(endColor >> 16 & 255) - (startColor >> 16 & 255),(endColor >> 8 & 255) - (startColor >> 8 & 255),(endColor & 255) - (startColor & 255),(endColor >> 24 & 255) - (startColor >> 24 & 255));
				if(this._colorPropertyDetails == null) {
					this._colorPropertyDetails = [];
				}
				this._colorPropertyDetails.push(details5);
				break;
			default:
				var val2 = haxe_ui_styles_ValueTools.calcDimension(end);
				if(val2 != null) {
					var details6 = new haxe_ui_styles_animation_util_PropertyDetails(this.target,componentProperty,start,val2 - start);
					this._propertyDetails.push(details6);
				} else {
					var details7 = new haxe_ui_styles_animation_util_PropertyDetails(this.target,componentProperty,start,end - start);
					this._propertyDetails.push(details7);
				}
			}
		}
	}
	,_nextFrame: function() {
		if(this._stopped == true) {
			return;
		}
		var currentTime = HxOverrides.now() / 1000;
		var delta = currentTime - this._currentTime;
		if(this.delay < 0) {
			delta += -this.delay;
		}
		var tweenPosition = delta / this.duration;
		if(tweenPosition > 1) {
			tweenPosition = 1;
		}
		this._apply(tweenPosition);
		if(this._onUpdate != null) {
			this._onUpdate(currentTime);
		}
		if(delta >= this.duration) {
			this._finish();
		} else {
			new haxe_ui_CallLater($bind(this,this._nextFrame));
		}
	}
	,_apply: function(position) {
		position = this._easeFunc(position);
		var _g = 0;
		var _g1 = this._propertyDetails;
		while(_g < _g1.length) {
			var details = _g1[_g];
			++_g;
			Reflect.setProperty(this.target,details.propertyName,details.start + details.change * position);
		}
		var _g = 0;
		var _g1 = this._stringPropertyDetails;
		while(_g < _g1.length) {
			var details = _g1[_g];
			++_g;
			if(details.pattern != null) {
				var newInt = details.startInt + position * details.changeInt | 0;
				var newString = StringTools.replace(details.pattern,"[[n]]","" + newInt);
				if(details.isVariant) {
					var v = haxe_ui_util_Variant.fromString(newString);
					Reflect.setProperty(this.target,details.propertyName,v);
				} else {
					Reflect.setProperty(this.target,details.propertyName,newString);
				}
			} else if(position != 1) {
				Reflect.setProperty(this.target,details.propertyName,details.start);
			} else {
				Reflect.setProperty(this.target,details.propertyName,details.end);
			}
		}
		var _g = 0;
		var _g1 = this._colorPropertyDetails;
		while(_g < _g1.length) {
			var details = _g1[_g];
			++_g;
			var currentColor = haxe_ui_util_Color.fromComponents((details.start >> 16 & 255) + details.changeR * position | 0,(details.start >> 8 & 255) + details.changeG * position | 0,(details.start & 255) + details.changeB * position | 0,(details.start >> 24 & 255) + details.changeA * position | 0);
			Reflect.setProperty(details.target,details.propertyName,currentColor);
		}
	}
	,_finish: function() {
		this._stopped = true;
		if(this._onComplete != null) {
			this._onComplete();
		}
	}
	,__class__: haxe_ui_styles_animation_util_Actuator
};
var haxe_ui_styles_animation_util__$Actuator_Ease = function() { };
$hxClasses["haxe.ui.styles.animation.util._Actuator.Ease"] = haxe_ui_styles_animation_util__$Actuator_Ease;
haxe_ui_styles_animation_util__$Actuator_Ease.__name__ = "haxe.ui.styles.animation.util._Actuator.Ease";
haxe_ui_styles_animation_util__$Actuator_Ease.get = function(easingFunction) {
	switch(easingFunction._hx_index) {
	case 0:
		return haxe_ui_styles_animation_util__$Actuator_Ease.linear;
	case 2:
		return haxe_ui_styles_animation_util__$Actuator_Ease.easeIn;
	case 3:
		return haxe_ui_styles_animation_util__$Actuator_Ease.easeOut;
	case 1:case 4:
		return haxe_ui_styles_animation_util__$Actuator_Ease.easeInOut;
	}
};
haxe_ui_styles_animation_util__$Actuator_Ease.linear = function(k) {
	return k;
};
haxe_ui_styles_animation_util__$Actuator_Ease.easeIn = function(k) {
	return k * k * k;
};
haxe_ui_styles_animation_util__$Actuator_Ease.easeOut = function(k) {
	return --k * k * k + 1;
};
haxe_ui_styles_animation_util__$Actuator_Ease.easeInOut = function(k) {
	if((k /= 0.5) < 1) {
		return 0.5 * k * k * k;
	} else {
		return 0.5 * ((k -= 2) * k * k + 2);
	}
};
var haxe_ui_styles_animation_util_ColorPropertyDetails = function(target,propertyName,start,changeR,changeG,changeB,changeA) {
	this.target = target;
	this.propertyName = propertyName;
	this.start = start;
	this.changeR = changeR;
	this.changeG = changeG;
	this.changeB = changeB;
	this.changeA = changeA;
};
$hxClasses["haxe.ui.styles.animation.util.ColorPropertyDetails"] = haxe_ui_styles_animation_util_ColorPropertyDetails;
haxe_ui_styles_animation_util_ColorPropertyDetails.__name__ = "haxe.ui.styles.animation.util.ColorPropertyDetails";
haxe_ui_styles_animation_util_ColorPropertyDetails.prototype = {
	changeR: null
	,changeG: null
	,changeB: null
	,changeA: null
	,propertyName: null
	,start: null
	,target: null
	,__class__: haxe_ui_styles_animation_util_ColorPropertyDetails
};
var haxe_ui_styles_animation_util_PropertyDetails = function(target,propertyName,start,change) {
	this.target = target;
	this.propertyName = propertyName;
	this.start = start;
	this.change = change;
};
$hxClasses["haxe.ui.styles.animation.util.PropertyDetails"] = haxe_ui_styles_animation_util_PropertyDetails;
haxe_ui_styles_animation_util_PropertyDetails.__name__ = "haxe.ui.styles.animation.util.PropertyDetails";
haxe_ui_styles_animation_util_PropertyDetails.prototype = {
	change: null
	,propertyName: null
	,start: null
	,target: null
	,__class__: haxe_ui_styles_animation_util_PropertyDetails
};
var haxe_ui_styles_animation_util_StringPropertyDetails = function(target,propertyName,start,end) {
	this.isVariant = false;
	this.pattern = null;
	this.target = target;
	this.propertyName = propertyName;
	this.start = start;
	this.end = end;
};
$hxClasses["haxe.ui.styles.animation.util.StringPropertyDetails"] = haxe_ui_styles_animation_util_StringPropertyDetails;
haxe_ui_styles_animation_util_StringPropertyDetails.__name__ = "haxe.ui.styles.animation.util.StringPropertyDetails";
haxe_ui_styles_animation_util_StringPropertyDetails.prototype = {
	propertyName: null
	,start: null
	,end: null
	,target: null
	,startInt: null
	,changeInt: null
	,pattern: null
	,isVariant: null
	,__class__: haxe_ui_styles_animation_util_StringPropertyDetails
};
var haxe_ui_styles_elements_AnimationKeyFrame = function() {
};
$hxClasses["haxe.ui.styles.elements.AnimationKeyFrame"] = haxe_ui_styles_elements_AnimationKeyFrame;
haxe_ui_styles_elements_AnimationKeyFrame.__name__ = "haxe.ui.styles.elements.AnimationKeyFrame";
haxe_ui_styles_elements_AnimationKeyFrame.prototype = {
	time: null
	,directives: null
	,set: function(directive) {
		var found = false;
		var _g = 0;
		var _g1 = this.directives;
		while(_g < _g1.length) {
			var d = _g1[_g];
			++_g;
			if(d.directive == directive.directive) {
				d.value = directive.value;
				found = true;
			}
		}
		if(found == false) {
			this.directives.push(directive);
		}
	}
	,find: function(id) {
		var _g = 0;
		var _g1 = this.directives;
		while(_g < _g1.length) {
			var d = _g1[_g];
			++_g;
			if(d.directive == id) {
				return d;
			}
		}
		return null;
	}
	,clear: function() {
		this.directives = [];
	}
	,__class__: haxe_ui_styles_elements_AnimationKeyFrame
};
var haxe_ui_styles_elements_AnimationKeyFrames = function(id,keyframes) {
	this._keyframes = [];
	this.id = id;
	this._keyframes = keyframes;
};
$hxClasses["haxe.ui.styles.elements.AnimationKeyFrames"] = haxe_ui_styles_elements_AnimationKeyFrames;
haxe_ui_styles_elements_AnimationKeyFrames.__name__ = "haxe.ui.styles.elements.AnimationKeyFrames";
haxe_ui_styles_elements_AnimationKeyFrames.prototype = {
	id: null
	,_keyframes: null
	,keyFrames: null
	,get_keyFrames: function() {
		return this._keyframes;
	}
	,__class__: haxe_ui_styles_elements_AnimationKeyFrames
	,__properties__: {get_keyFrames:"get_keyFrames"}
};
var haxe_ui_styles_elements_Directive = function(directive,value,defective) {
	if(defective == null) {
		defective = false;
	}
	this.defective = false;
	this.value = null;
	this.directive = null;
	this.directive = directive;
	this.value = value;
	this.defective = defective;
};
$hxClasses["haxe.ui.styles.elements.Directive"] = haxe_ui_styles_elements_Directive;
haxe_ui_styles_elements_Directive.__name__ = "haxe.ui.styles.elements.Directive";
haxe_ui_styles_elements_Directive.prototype = {
	directive: null
	,value: null
	,defective: null
	,__class__: haxe_ui_styles_elements_Directive
};
var haxe_ui_styles_elements_ImportElement = function(url) {
	this.url = url;
};
$hxClasses["haxe.ui.styles.elements.ImportElement"] = haxe_ui_styles_elements_ImportElement;
haxe_ui_styles_elements_ImportElement.__name__ = "haxe.ui.styles.elements.ImportElement";
haxe_ui_styles_elements_ImportElement.prototype = {
	url: null
	,__class__: haxe_ui_styles_elements_ImportElement
};
var haxe_ui_styles_elements_MediaQuery = function(directives,styleSheet) {
	this._directives = [];
	this._directives = directives;
	this._styleSheet = styleSheet;
};
$hxClasses["haxe.ui.styles.elements.MediaQuery"] = haxe_ui_styles_elements_MediaQuery;
haxe_ui_styles_elements_MediaQuery.__name__ = "haxe.ui.styles.elements.MediaQuery";
haxe_ui_styles_elements_MediaQuery.prototype = {
	_directives: null
	,_styleSheet: null
	,addDirective: function(el) {
		this._directives.push(el);
	}
	,relevant: null
	,get_relevant: function() {
		var b = true;
		var _g = 0;
		var _g1 = this._directives;
		while(_g < _g1.length) {
			var d = _g1[_g];
			++_g;
			switch(d.directive) {
			case "backend":
				b = b && haxe_ui_Backend.get_id() == haxe_ui_styles_ValueTools.string(d.value);
				break;
			case "max-aspect-ratio":
				var sr = haxe_ui_core_Screen.get_instance().get_width() / haxe_ui_core_Screen.get_instance().get_height();
				b = b && sr < this.buildRatio(haxe_ui_styles_ValueTools.string(d.value));
				break;
			case "max-height":
				b = b && haxe_ui_core_Screen.get_instance().get_height() < haxe_ui_styles_ValueTools.calcDimension(d.value);
				break;
			case "max-width":
				b = b && haxe_ui_core_Screen.get_instance().get_width() < haxe_ui_styles_ValueTools.calcDimension(d.value);
				break;
			case "min-aspect-ratio":
				var sr1 = haxe_ui_core_Screen.get_instance().get_width() / haxe_ui_core_Screen.get_instance().get_height();
				b = b && sr1 > this.buildRatio(haxe_ui_styles_ValueTools.string(d.value));
				break;
			case "min-height":
				b = b && haxe_ui_core_Screen.get_instance().get_height() > haxe_ui_styles_ValueTools.calcDimension(d.value);
				break;
			case "min-width":
				b = b && haxe_ui_core_Screen.get_instance().get_width() > haxe_ui_styles_ValueTools.calcDimension(d.value);
				break;
			case "orientation":
				var v = haxe_ui_styles_ValueTools.string(d.value);
				if(v == "landscape") {
					b = b && haxe_ui_core_Screen.get_instance().get_width() > haxe_ui_core_Screen.get_instance().get_height();
				} else if(v == "portrait") {
					b = b && haxe_ui_core_Screen.get_instance().get_height() > haxe_ui_core_Screen.get_instance().get_width();
				}
				break;
			default:
			}
		}
		return b;
	}
	,buildRatio: function(s) {
		var p = s.split("/");
		var w = Std.parseInt(StringTools.trim(p[0]));
		var h = Std.parseInt(StringTools.trim(p[1]));
		return w / h;
	}
	,styleSheet: null
	,get_styleSheet: function() {
		return this._styleSheet;
	}
	,__class__: haxe_ui_styles_elements_MediaQuery
	,__properties__: {get_styleSheet:"get_styleSheet",get_relevant:"get_relevant"}
};
var haxe_ui_styles_elements_RuleElement = function(selector,directives) {
	this.directives = new haxe_ds_StringMap();
	this.selector = new haxe_ui_styles_elements_Selector(selector);
	var _g = 0;
	while(_g < directives.length) {
		var d = directives[_g];
		++_g;
		this.processDirective(d);
	}
};
$hxClasses["haxe.ui.styles.elements.RuleElement"] = haxe_ui_styles_elements_RuleElement;
haxe_ui_styles_elements_RuleElement.__name__ = "haxe.ui.styles.elements.RuleElement";
haxe_ui_styles_elements_RuleElement.ruleMatch = function(c,d) {
	if(c.nodeName == "*") {
		return true;
	}
	if(c.pseudoClass != null) {
		var pc = ":" + c.pseudoClass;
		if(d.classes.indexOf(pc) != -1 == false) {
			return false;
		}
	}
	if(c.className != null) {
		var _g = 0;
		var _g1 = c.get_classNameParts();
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			if(d.classes.indexOf(p) != -1 == false) {
				return false;
			}
		}
	}
	if(c.id != null && c.id != d.get_id()) {
		return false;
	}
	if(c.parent != null) {
		if(c.direct == true) {
			var p = d.parentComponent;
			if(p == null) {
				return false;
			}
			if(!haxe_ui_styles_elements_RuleElement.ruleMatch(c.parent,p)) {
				return false;
			}
		} else {
			var p = d.parentComponent;
			while(p != null) {
				if(haxe_ui_styles_elements_RuleElement.ruleMatch(c.parent,p)) {
					break;
				}
				p = p.parentComponent;
			}
			if(p == null) {
				return false;
			}
		}
	}
	return true;
};
haxe_ui_styles_elements_RuleElement.prototype = {
	selector: null
	,directives: null
	,addDirective: function(directive,value) {
		var d = new haxe_ui_styles_elements_Directive(directive,value);
		this.processDirective(d);
	}
	,match: function(d) {
		return haxe_ui_styles_elements_RuleElement.ruleMatch(this.selector.parts[this.selector.parts.length - 1],d);
	}
	,processDirective: function(d) {
		switch(d.directive) {
		case "animation":
			this.processComposite(d,["animation-name","animation-duration","animation-timing-function","animation-delay","animation-iteration-count","animation-direction","animation-fill-mode"]);
			break;
		case "background":
			this.processComposite(d,["background-color","background-color-end","background-gradient-style"]);
			break;
		case "background-image-clip":
			this.processComposite(d,["background-image-clip-top","background-image-clip-left","background-image-clip-bottom","background-image-clip-right"]);
			break;
		case "background-image-slice":
			this.processComposite(d,["background-image-slice-top","background-image-slice-left","background-image-slice-bottom","background-image-slice-right"]);
			break;
		case "border":
			this.processComposite(d,["border-size","border-style","border-color"]);
			break;
		case "border-bottom":
			this.processComposite(d,["border-bottom-size","border-style","border-bottom-color"]);
			break;
		case "border-color":
			this.processComposite(d,["border-top-color","border-left-color","border-right-color","border-bottom-color"],true);
			break;
		case "border-left":
			this.processComposite(d,["border-left-size","border-style","border-left-color"]);
			break;
		case "border-right":
			this.processComposite(d,["border-right-size","border-style","border-right-color"]);
			break;
		case "border-size":
			this.processComposite(d,["border-top-size","border-left-size","border-right-size","border-bottom-size"]);
			break;
		case "border-top":
			this.processComposite(d,["border-top-size","border-style","border-top-color"]);
			break;
		case "font-style":
			var v1 = haxe_ui_styles_ValueTools.composite(d.value);
			if(v1 == null) {
				v1 = [d.value];
			}
			var _g = 0;
			while(_g < v1.length) {
				var v = v1[_g];
				++_g;
				var s = haxe_ui_styles_ValueTools.string(v).toLowerCase();
				if(s == "bold") {
					var this1 = this.directives;
					var value = new haxe_ui_styles_elements_Directive("font-bold",haxe_ui_styles_Value.VBool(true));
					this1.h["font-bold"] = value;
				} else if(s == "italic") {
					var this2 = this.directives;
					var value1 = new haxe_ui_styles_elements_Directive("font-italic",haxe_ui_styles_Value.VBool(true));
					this2.h["font-italic"] = value1;
				} else if(s == "underline") {
					var this3 = this.directives;
					var value2 = new haxe_ui_styles_elements_Directive("font-underline",haxe_ui_styles_Value.VBool(true));
					this3.h["font-underline"] = value2;
				}
			}
			break;
		case "margin":
			var vl = haxe_ui_styles_ValueTools.composite(d.value);
			if(vl.length == 4 || vl.length == 1) {
				this.processComposite(d,["margin-top","margin-left","margin-right","margin-bottom"]);
			} else if(vl.length == 2) {
				this.processComposite(new haxe_ui_styles_elements_Directive("",vl[0]),["margin-top","margin-bottom"]);
				this.processComposite(new haxe_ui_styles_elements_Directive("",vl[1]),["margin-left","margin-right"]);
			}
			break;
		case "padding":
			var vl = haxe_ui_styles_ValueTools.composite(d.value);
			if(vl.length == 4 || vl.length == 1) {
				this.processComposite(d,["padding-top","padding-left","padding-right","padding-bottom"]);
			} else if(vl.length == 2) {
				this.processComposite(new haxe_ui_styles_elements_Directive("",vl[0]),["padding-top","padding-bottom"]);
				this.processComposite(new haxe_ui_styles_elements_Directive("",vl[1]),["padding-left","padding-right"]);
			} else if(vl.length == 0) {
				this.processComposite(d,["padding-top","padding-left","padding-right","padding-bottom"]);
			}
			break;
		case "spacing":
			this.processComposite(d,["horizontal-spacing","vertical-spacing"]);
			break;
		default:
			this.directives.h[d.directive] = d;
		}
	}
	,processComposite: function(d,parts,duplicate) {
		if(duplicate == null) {
			duplicate = false;
		}
		var _g = 0;
		while(_g < parts.length) {
			var p = parts[_g];
			++_g;
			var _this = this.directives;
			if(Object.prototype.hasOwnProperty.call(_this.h,p)) {
				delete(_this.h[p]);
			}
		}
		var _g = d.value;
		switch(_g._hx_index) {
		case 1:
			var _g1 = _g.v;
			var _g1 = 0;
			while(_g1 < parts.length) {
				var p = parts[_g1];
				++_g1;
				var this1 = this.directives;
				var value = new haxe_ui_styles_elements_Directive(p,d.value);
				this1.h[p] = value;
			}
			break;
		case 3:
			var v = _g.v;
			var _g1 = 0;
			while(_g1 < parts.length) {
				var p = parts[_g1];
				++_g1;
				var this1 = this.directives;
				var value = new haxe_ui_styles_elements_Directive(p,haxe_ui_styles_Value.VDimension(v));
				this1.h[p] = value;
			}
			break;
		case 4:
			var _g1 = _g.v;
			if(duplicate == false) {
				var this1 = this.directives;
				var value = new haxe_ui_styles_elements_Directive(parts[0],d.value);
				this1.h[parts[0]] = value;
			} else {
				var _g1 = 0;
				while(_g1 < parts.length) {
					var p = parts[_g1];
					++_g1;
					var this1 = this.directives;
					var value = new haxe_ui_styles_elements_Directive(p,d.value);
					this1.h[p] = value;
				}
			}
			break;
		case 6:
			var _g1 = _g.v;
			break;
		case 7:
			var vl = _g.vl;
			var n = 0;
			var _g = 0;
			while(_g < parts.length) {
				var p = parts[_g];
				++_g;
				if(vl[n] != null) {
					var nd = new haxe_ui_styles_elements_Directive(p,vl[n]);
					this.processDirective(nd);
					this.directives.h[p] = nd;
				}
				++n;
			}
			break;
		case 9:
			var _g = 0;
			while(_g < parts.length) {
				var p = parts[_g];
				++_g;
				var nd = new haxe_ui_styles_elements_Directive(p,d.value);
				this.processDirective(nd);
				this.directives.h[p] = nd;
			}
			break;
		default:
		}
	}
	,__class__: haxe_ui_styles_elements_RuleElement
};
var haxe_ui_styles_elements_Selector = function(s) {
	this.parts = [];
	s = StringTools.replace(s,">"," > ");
	var p = s.split(" ");
	var parent = null;
	var nextDirect = false;
	var _g = 0;
	while(_g < p.length) {
		var i = p[_g];
		++_g;
		i = StringTools.trim(i);
		if(i.length == 0) {
			continue;
		}
		if(i == ">") {
			nextDirect = true;
			continue;
		}
		var current = new haxe_ui_styles_elements_SelectorPart();
		if(nextDirect == true) {
			current.direct = true;
			nextDirect = false;
		}
		current.parent = parent;
		var p1 = i.split(":");
		current.pseudoClass = p1[1];
		var main = p1[0];
		if(main.charAt(0) == ".") {
			current.className = main.substring(1);
		} else {
			var p2 = main.split(".");
			if(p2[0].charAt(0) == "#") {
				current.id = p2[0].substring(1);
			} else {
				current.nodeName = p2[0].toLowerCase();
			}
			current.className = p2[1];
		}
		this.parts.push(current);
		parent = current;
	}
};
$hxClasses["haxe.ui.styles.elements.Selector"] = haxe_ui_styles_elements_Selector;
haxe_ui_styles_elements_Selector.__name__ = "haxe.ui.styles.elements.Selector";
haxe_ui_styles_elements_Selector.prototype = {
	parts: null
	,toString: function() {
		return this.parts.join(" ");
	}
	,__class__: haxe_ui_styles_elements_Selector
};
var haxe_ui_styles_elements_SelectorPart = function() {
	this._parts = null;
	this.direct = false;
	this.nodeName = null;
	this.id = null;
	this.className = null;
	this.pseudoClass = null;
	this.parent = null;
};
$hxClasses["haxe.ui.styles.elements.SelectorPart"] = haxe_ui_styles_elements_SelectorPart;
haxe_ui_styles_elements_SelectorPart.__name__ = "haxe.ui.styles.elements.SelectorPart";
haxe_ui_styles_elements_SelectorPart.prototype = {
	parent: null
	,pseudoClass: null
	,className: null
	,id: null
	,nodeName: null
	,direct: null
	,_parts: null
	,classNameParts: null
	,get_classNameParts: function() {
		if(this.className == null) {
			return null;
		}
		if(this._parts == null) {
			this._parts = this.className.split(".");
		}
		return this._parts;
	}
	,toString: function() {
		var sb_b = "";
		if(this.id != null) {
			sb_b += Std.string("#" + this.id);
		}
		if(this.nodeName != null) {
			sb_b += Std.string(this.nodeName);
		}
		if(this.className != null) {
			sb_b += Std.string("." + this.className);
		}
		if(this.pseudoClass != null) {
			sb_b += Std.string(":" + this.pseudoClass);
		}
		return sb_b;
	}
	,__class__: haxe_ui_styles_elements_SelectorPart
	,__properties__: {get_classNameParts:"get_classNameParts"}
};
var haxe_ui_themes_Theme = function() {
	this.styles = [];
	this.images = [];
};
$hxClasses["haxe.ui.themes.Theme"] = haxe_ui_themes_Theme;
haxe_ui_themes_Theme.__name__ = "haxe.ui.themes.Theme";
haxe_ui_themes_Theme.prototype = {
	parent: null
	,styles: null
	,images: null
	,__class__: haxe_ui_themes_Theme
};
var haxe_ui_themes_ThemeManager = function() {
	this._eventMap = null;
	this._themes = new haxe_ds_StringMap();
};
$hxClasses["haxe.ui.themes.ThemeManager"] = haxe_ui_themes_ThemeManager;
haxe_ui_themes_ThemeManager.__name__ = "haxe.ui.themes.ThemeManager";
haxe_ui_themes_ThemeManager.__properties__ = {get_instance:"get_instance"};
haxe_ui_themes_ThemeManager.get_instance = function() {
	if(haxe_ui_themes_ThemeManager._instance == null) {
		haxe_ui_themes_ThemeManager._instance = new haxe_ui_themes_ThemeManager();
	}
	return haxe_ui_themes_ThemeManager._instance;
};
haxe_ui_themes_ThemeManager.prototype = {
	_themes: null
	,_themeImages: null
	,_eventMap: null
	,registerEvent: function(type,listener,priority) {
		if(priority == null) {
			priority = 0;
		}
		if(this._eventMap == null) {
			this._eventMap = new haxe_ui_util_EventMap();
		}
		this._eventMap.add(type,listener);
	}
	,unregisterEvent: function(type,listener) {
		if(this._eventMap == null) {
			return;
		}
		this._eventMap.remove(type,listener);
	}
	,dispatch: function(event) {
		if(this._eventMap == null) {
			return;
		}
		this._eventMap.invoke(event.type,new haxe_ui_events_ThemeEvent(haxe_ui_events_ThemeEvent.THEME_CHANGED));
	}
	,getTheme: function(themeName) {
		var theme = this._themes.h[themeName];
		if(theme == null) {
			theme = new haxe_ui_themes_Theme();
			this._themes.h[themeName] = theme;
		}
		return theme;
	}
	,addStyleResource: function(themeName,resourceId,priority) {
		if(priority == null) {
			priority = 0;
		}
		this.getTheme(themeName).styles.push({ resourceId : resourceId, priority : priority});
	}
	,addImageResource: function(themeName,id,resourceId,priority) {
		if(priority == null) {
			priority = 0;
		}
		this.getTheme(themeName).images.push({ id : id, resourceId : resourceId, priority : priority});
	}
	,applyTheme: function(themeName) {
		haxe_ui_Toolkit.styleSheet.clear("default");
		var entries = [];
		this.buildThemeEntries("global",entries);
		this.buildThemeEntries(themeName,entries);
		haxe_ds_ArraySort.sort(entries,function(a,b) {
			if(a.priority < b.priority) {
				return -1;
			} else if(a.priority > b.priority) {
				return 1;
			}
			return 0;
		});
		var _g = 0;
		while(_g < entries.length) {
			var e = entries[_g];
			++_g;
			this.applyResource(e.resourceId);
		}
		var images = [];
		this.buildThemeImages("global",images);
		this.buildThemeImages(themeName,images);
		haxe_ds_ArraySort.sort(images,function(a,b) {
			if(a.priority < b.priority) {
				return -1;
			} else if(a.priority > b.priority) {
				return 1;
			}
			return 0;
		});
		var _g = 0;
		while(_g < images.length) {
			var i = images[_g];
			++_g;
			if(this._themeImages == null) {
				this._themeImages = new haxe_ds_StringMap();
			}
			this._themeImages.h[i.id] = i;
		}
		this.dispatch(new haxe_ui_events_ThemeEvent(haxe_ui_events_ThemeEvent.THEME_CHANGED));
	}
	,applyResource: function(resourceId) {
		var style = haxe_ui_Toolkit.get_assets().getText(resourceId);
		if(style != null) {
			this.addStyleString(style);
		}
	}
	,addStyleString: function(style) {
		haxe_ui_Toolkit.styleSheet.parse(style);
	}
	,buildThemeEntries: function(themeName,arr) {
		var theme = this._themes.h[themeName];
		if(theme == null) {
			return;
		}
		if(theme.parent != null) {
			this.buildThemeEntries(theme.parent,arr);
		}
		var _g = 0;
		var _g1 = theme.styles;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			arr.push(s);
		}
	}
	,buildThemeImages: function(themeName,arr) {
		var theme = this._themes.h[themeName];
		if(theme == null) {
			return;
		}
		if(theme.parent != null) {
			this.buildThemeImages(theme.parent,arr);
		}
		var _g = 0;
		var _g1 = theme.images;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			arr.push(s);
		}
	}
	,image: function(id) {
		var image = this._themeImages.h[id];
		if(image == null) {
			return null;
		}
		return image.resourceId;
	}
	,icon: function(id) {
		return this.image(id);
	}
	,__class__: haxe_ui_themes_ThemeManager
};
var haxe_ui_tooltips_ToolTip = function() {
	haxe_ui_containers_Box.call(this);
};
$hxClasses["haxe.ui.tooltips.ToolTip"] = haxe_ui_tooltips_ToolTip;
haxe_ui_tooltips_ToolTip.__name__ = "haxe.ui.tooltips.ToolTip";
haxe_ui_tooltips_ToolTip.__super__ = haxe_ui_containers_Box;
haxe_ui_tooltips_ToolTip.prototype = $extend(haxe_ui_containers_Box.prototype,{
	registerBehaviours: function() {
		haxe_ui_containers_Box.prototype.registerBehaviours.call(this);
	}
	,cloneComponent: function() {
		var c = haxe_ui_containers_Box.prototype.cloneComponent.call(this);
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		return c;
	}
	,self: function() {
		return new haxe_ui_tooltips_ToolTip();
	}
	,__class__: haxe_ui_tooltips_ToolTip
});
var haxe_ui_tooltips_ToolTipManager = function() {
	this._toolTipContents = null;
	this._toolTip = null;
	this._timer = null;
	this._currentComponent = null;
	this._lastMouseEvent = null;
	this._toolTipOptions = new haxe_ds_ObjectMap();
};
$hxClasses["haxe.ui.tooltips.ToolTipManager"] = haxe_ui_tooltips_ToolTipManager;
haxe_ui_tooltips_ToolTipManager.__name__ = "haxe.ui.tooltips.ToolTipManager";
haxe_ui_tooltips_ToolTipManager.__properties__ = {get_instance:"get_instance"};
haxe_ui_tooltips_ToolTipManager.get_instance = function() {
	if(haxe_ui_tooltips_ToolTipManager._instance == null) {
		haxe_ui_tooltips_ToolTipManager._instance = new haxe_ui_tooltips_ToolTipManager();
	}
	return haxe_ui_tooltips_ToolTipManager._instance;
};
haxe_ui_tooltips_ToolTipManager.prototype = {
	_lastMouseEvent: null
	,_toolTipOptions: null
	,registerTooltip: function(target,options) {
		if(this._toolTipOptions.h.__keys__[target.__id__] != null) {
			return;
		}
		if(options == null) {
			options = { };
		}
		if(options.tipData == null) {
			options.tipData = { text : target.get_tooltip()};
		}
		this._toolTipOptions.set(target,options);
		target.registerEvent("mouseover",$bind(this,this.onTargetMouseOver));
	}
	,unregisterTooltip: function(target) {
		target.unregisterEvent("mouseover",$bind(this,this.onTargetMouseOver));
		target.unregisterEvent("mouseout",$bind(this,this.onTargetMouseOut));
		target.unregisterEvent("mousemove",$bind(this,this.onTargetMouseMove));
		this._toolTipOptions.remove(target);
	}
	,getTooltipOptions: function(target) {
		return this._toolTipOptions.h[target.__id__];
	}
	,updateTooltipRenderer: function(target,renderer) {
		if(this._toolTipOptions.h.__keys__[target.__id__] == null) {
			return;
		}
		var options = this._toolTipOptions.h[target.__id__];
		options.renderer = renderer;
	}
	,_currentComponent: null
	,_timer: null
	,onTargetMouseOver: function(event) {
		this.stopCurrent();
		this._lastMouseEvent = event;
		this._currentComponent = event.target;
		event.target.registerEvent("mouseout",$bind(this,this.onTargetMouseOut));
		event.target.registerEvent("mousemove",$bind(this,this.onTargetMouseMove));
		haxe_ui_core_Screen.get_instance().registerEvent("mousemove",$bind(this,this.onScreenMouseMove));
		this.startTimer();
	}
	,onTargetMouseMove: function(event) {
		if(this._toolTip != null && this._toolTip.get_hidden() == false) {
			return;
		}
		this.stopTimer();
		this.startTimer();
	}
	,onTargetMouseOut: function(event) {
		this.stopCurrent();
		this.hideToolTip();
	}
	,onDelayTimer: function() {
		this._timer.stop();
		this._timer = null;
		this.showToolTip();
	}
	,onScreenMouseMove: function(event) {
		this._lastMouseEvent = event;
	}
	,onScreenMouseDown: function(event) {
		this.hideToolTip();
	}
	,startTimer: function() {
		this._timer = new haxe_ui_util_Timer(haxe_ui_tooltips_ToolTipManager.defaultDelay,$bind(this,this.onDelayTimer));
	}
	,stopTimer: function() {
		if(this._timer != null) {
			this._timer.stop();
			this._timer = null;
		}
	}
	,stopCurrent: function() {
		if(this._currentComponent != null) {
			this._currentComponent.unregisterEvent("mouseout",$bind(this,this.onTargetMouseOut));
			this._currentComponent = null;
		}
		this.stopTimer();
		haxe_ui_core_Screen.get_instance().unregisterEvent("mousemove",$bind(this,this.onScreenMouseMove));
	}
	,_toolTip: null
	,_toolTipContents: null
	,createToolTip: function() {
		if(this._toolTip != null) {
			return;
		}
		this._toolTip = new haxe_ui_tooltips_ToolTip();
	}
	,showToolTip: function() {
		var _gthis = this;
		if(this._currentComponent == null) {
			return;
		}
		if(this._currentComponent.get_disabled() == true || this._currentComponent.get_hidden() == true) {
			this.stopCurrent();
			return;
		}
		this.createToolTip();
		this._toolTip.hide();
		var options = this._toolTipOptions.h[this._currentComponent.__id__];
		var renderer = this.createToolTipRenderer(options);
		var _this = this._toolTip;
		if((_this._children == null ? [] : _this._children)[0] != renderer) {
			var _this = this._toolTip;
			if((_this._children == null ? [] : _this._children).length > 0) {
				this._toolTip.removeComponentAt(0,false);
			}
			this._toolTip.addComponent(renderer);
		}
		renderer.set_data(options.tipData);
		haxe_ui_core_Screen.get_instance().addComponent(this._toolTip);
		haxe_ui_core_Screen.get_instance().setComponentIndex(this._toolTip,haxe_ui_core_Screen.get_instance().rootComponents.length - 1);
		this._toolTip.validateNow();
		this.positionToolTip();
		haxe_ui_Toolkit.callLater(function() {
			if(haxe_ui_tooltips_ToolTipManager.fade == true) {
				_gthis._toolTip.fadeIn();
			} else {
				_gthis._toolTip.show();
			}
		});
		haxe_ui_core_Screen.get_instance().registerEvent("mousedown",$bind(this,this.onScreenMouseDown));
	}
	,positionToolTip: function() {
		var x = this._lastMouseEvent.screenX + this._toolTip.get_marginLeft();
		var y = this._lastMouseEvent.screenY + this._toolTip.get_marginTop();
		var w = this._toolTip.get_width();
		var h = this._toolTip.get_height();
		var maxX = haxe_ui_core_Screen.get_instance().get_width();
		var maxY = haxe_ui_core_Screen.get_instance().get_height();
		if(x + w > maxX) {
			x -= w;
		}
		if(y + h > maxY) {
			y = this._lastMouseEvent.screenY - h - this._toolTip.get_marginTop() / 2;
		}
		this._toolTip.set_left(x);
		this._toolTip.set_top(y);
	}
	,hideToolTip: function() {
		if(this._toolTip != null) {
			if(haxe_ui_tooltips_ToolTipManager.fade == true) {
				this._toolTip.fadeOut();
			} else {
				this._toolTip.hide();
			}
		}
		haxe_ui_core_Screen.get_instance().unregisterEvent("mousedown",$bind(this,this.onScreenMouseDown));
	}
	,createToolTipRenderer: function(options) {
		if(options.renderer != null) {
			return options.renderer;
		}
		if(haxe_ui_tooltips_ToolTipManager.defaultRenderer != null) {
			return haxe_ui_tooltips_ToolTipManager.defaultRenderer;
		}
		if(this._toolTipContents != null) {
			return this._toolTipContents;
		}
		this._toolTipContents = new haxe_ui_core_ItemRenderer();
		var label = new haxe_ui_components_Label();
		label.set_id("text");
		this._toolTipContents.addComponent(label);
		return this._toolTipContents;
	}
	,__class__: haxe_ui_tooltips_ToolTipManager
};
var haxe_ui_util_CallbackMap = function() {
	this._map = new haxe_ds_StringMap();
};
$hxClasses["haxe.ui.util.CallbackMap"] = haxe_ui_util_CallbackMap;
haxe_ui_util_CallbackMap.__name__ = "haxe.ui.util.CallbackMap";
haxe_ui_util_CallbackMap.prototype = {
	_map: null
	,add: function(key,callback,priority) {
		if(priority == null) {
			priority = 0;
		}
		if(callback == null) {
			return false;
		}
		var b = false;
		var arr = this._map.h[key];
		if(arr == null) {
			arr = new haxe_ui_util_FunctionArray();
			arr.push(callback,priority);
			this._map.h[key] = arr;
			b = true;
		} else if(arr.contains(callback) == false) {
			arr.push(callback,priority);
		}
		return b;
	}
	,remove: function(key,callback) {
		var b = false;
		var arr = this._map.h[key];
		if(arr != null) {
			arr.remove(callback);
			if(arr.get_length() == 0) {
				var _this = this._map;
				if(Object.prototype.hasOwnProperty.call(_this.h,key)) {
					delete(_this.h[key]);
				}
				b = true;
			}
		}
		return b;
	}
	,removeAll: function(key) {
		var arr = this._map.h[key];
		if(arr != null) {
			while(arr.get_length() > 0) arr.remove(arr.get(0));
			var _this = this._map;
			if(Object.prototype.hasOwnProperty.call(_this.h,key)) {
				delete(_this.h[key]);
			}
		}
	}
	,invoke: function(key,param) {
		var arr = this._map.h[key];
		if(arr != null) {
			arr = arr.copy();
			var listener = arr.iterator();
			while(listener.hasNext()) {
				var listener1 = listener.next();
				listener1.callback(param);
			}
		}
	}
	,invokeAndRemove: function(key,param) {
		var arr = this._map.h[key];
		if(arr != null) {
			arr = arr.copy();
			this.removeAll(key);
			var listener = arr.iterator();
			while(listener.hasNext()) {
				var listener1 = listener.next();
				listener1.callback(param);
			}
		}
	}
	,count: function(key) {
		var n = 0;
		var arr = this._map.h[key];
		if(arr != null) {
			n = arr.get_length();
		}
		return n;
	}
	,__class__: haxe_ui_util_CallbackMap
};
var haxe_ui_util_Color = {};
haxe_ui_util_Color.__properties__ = {set_a:"set_a",get_a:"get_a",set_b:"set_b",get_b:"get_b",set_g:"set_g",get_g:"get_g",set_r:"set_r",get_r:"get_r"};
haxe_ui_util_Color.fromString = function(s) {
	if(StringTools.startsWith(s,"0x") || StringTools.startsWith(s,"#")) {
		return Std.parseInt("0x" + s.substring(s.length - 6));
	}
	switch(s) {
	case "aliceblue":
		return 15792383;
	case "antiquewhite":
		return 16444375;
	case "aqua":
		return 65535;
	case "aquamarine":
		return 8388564;
	case "azure":
		return 15794175;
	case "beige":
		return 16119260;
	case "bisque":
		return 16770244;
	case "black":
		return 0;
	case "blanchedalmond":
		return 16772045;
	case "blue":
		return 255;
	case "blueviolet":
		return 9055202;
	case "brown":
		return 10824234;
	case "burlywood":
		return 14596231;
	case "cadetblue":
		return 6266528;
	case "chartreuse":
		return 8388352;
	case "chocolate":
		return 13789470;
	case "coral":
		return 16744272;
	case "cornflowerblue":
		return 6591981;
	case "cornsilk":
		return 16775388;
	case "crimson":
		return 14423100;
	case "cyan":
		return 65535;
	case "darkblue":
		return 139;
	case "darkcyan":
		return 35723;
	case "darkgoldenrod":
		return 12092939;
	case "darkgray":
		return 11119017;
	case "darkgreen":
		return 25600;
	case "darkkhaki":
		return 12433259;
	case "darkmagenta":
		return 9109643;
	case "darkolivegreen":
		return 5597999;
	case "darkorange":
		return 16747520;
	case "darkorchid":
		return 10040012;
	case "darkred":
		return 9109504;
	case "darksalmon":
		return 15308410;
	case "darkseagreen":
		return 9419919;
	case "darkslateblue":
		return 4734347;
	case "darkslategray":
		return 3100495;
	case "darkturquoise":
		return 52945;
	case "darkviolet":
		return 9699539;
	case "deeppink":
		return 16716947;
	case "deepskyblue":
		return 49151;
	case "dimgray":
		return 6908265;
	case "dodgerblue":
		return 2003199;
	case "firebrick":
		return 11674146;
	case "floralwhite":
		return 16775920;
	case "forestgreen":
		return 2263842;
	case "fuchsia":
		return 16711935;
	case "gainsboro":
		return 14474460;
	case "ghostwhite":
		return 16316671;
	case "gold":
		return 16766720;
	case "goldenrod":
		return 14329120;
	case "green":
		return 32768;
	case "greenyellow":
		return 11403055;
	case "gray":case "grey":
		return 8421504;
	case "honeydew":
		return 15794160;
	case "hotpink":
		return 16738740;
	case "indianred":
		return 13458524;
	case "indigo":
		return 4915330;
	case "ivory":
		return 16777200;
	case "khaki":
		return 15787660;
	case "lavender":
		return 15132410;
	case "lavenderblush":
		return 16773365;
	case "lawngreen":
		return 8190976;
	case "lemonchiffon":
		return 16775885;
	case "lightblue":
		return 11393254;
	case "lightcoral":
		return 15761536;
	case "lightcyan":
		return 14745599;
	case "lightgoldenrodyellow":
		return 16448210;
	case "lightgray":
		return 13882323;
	case "lightgreen":
		return 9498256;
	case "lightpink":
		return 16758465;
	case "lightsalmon":
		return 16752762;
	case "lightseagreen":
		return 2142890;
	case "lightskyblue":
		return 8900346;
	case "lightslategray":
		return 7833753;
	case "lightsteelblue":
		return 11584734;
	case "lightyellow":
		return 16777184;
	case "lime":
		return 65280;
	case "limegreen":
		return 3329330;
	case "linen":
		return 16445670;
	case "magenta":
		return 16711935;
	case "maroon":
		return 8388608;
	case "mediumaquamarine":
		return 6737322;
	case "mediumblue":
		return 205;
	case "mediumorchid":
		return 12211667;
	case "mediumpurple":
		return 9662683;
	case "mediumseagreen":
		return 3978097;
	case "mediumslateblue":
		return 8087790;
	case "mediumspringgreen":
		return 64154;
	case "mediumturquoise":
		return 4772300;
	case "mediumvioletred":
		return 13047173;
	case "midnightblue":
		return 1644912;
	case "mintcream":
		return 16121850;
	case "mistyrose":
		return 16770273;
	case "moccasin":
		return 16770229;
	case "navajowhite":
		return 16768685;
	case "navy":
		return 128;
	case "oldlace":
		return 16643558;
	case "olive":
		return 8421376;
	case "olivedrab":
		return 7048739;
	case "orange":
		return 16753920;
	case "orangered":
		return 16729344;
	case "orchid":
		return 14315734;
	case "palegoldenrod":
		return 15657130;
	case "palegreen":
		return 10025880;
	case "paleturquoise":
		return 11529966;
	case "palevioletred":
		return 14381203;
	case "papayawhip":
		return 16773077;
	case "peachpuff":
		return 16767673;
	case "peru":
		return 13468991;
	case "pink":
		return 16761035;
	case "plum":
		return 14524637;
	case "powderblue":
		return 11591910;
	case "purple":
		return 8388736;
	case "red":
		return 16711680;
	case "rosybrown":
		return 12357519;
	case "royalblue":
		return 4286945;
	case "saddlebrown":
		return 9127187;
	case "salmon":
		return 16416882;
	case "sandybrown":
		return 16032864;
	case "seagreen":
		return 3050327;
	case "seashell":
		return 16774638;
	case "sienna":
		return 10506797;
	case "silver":
		return 12632256;
	case "skyblue":
		return 8900331;
	case "slateblue":
		return 6970061;
	case "slategray":
		return 7372944;
	case "snow":
		return 16775930;
	case "springgreen":
		return 65407;
	case "steelblue":
		return 4620980;
	case "tan":
		return 13808780;
	case "teal":
		return 32896;
	case "thistle":
		return 14204888;
	case "tomato":
		return 16737095;
	case "turquoise":
		return 4251856;
	case "violet":
		return 15631086;
	case "wheat":
		return 16113331;
	case "white":
		return 16777215;
	case "whitesmoke":
		return 16119285;
	case "yellow":
		return 16776960;
	case "yellowgreen":
		return 10145074;
	default:
		return 0;
	}
};
haxe_ui_util_Color.fromComponents = function(r,g,b,a) {
	var result = (a & 255) << 24 | (r & 255) << 16 | (g & 255) << 8 | b & 255;
	return result;
};
haxe_ui_util_Color.get_r = function(this1) {
	return this1 >> 16 & 255;
};
haxe_ui_util_Color.set_r = function(this1,value) {
	this1 = (this1 >> 24 & 255 & 255) << 24 | (value & 255) << 16 | (this1 >> 8 & 255 & 255) << 8 | this1 & 255 & 255;
	return this1;
};
haxe_ui_util_Color.get_g = function(this1) {
	return this1 >> 8 & 255;
};
haxe_ui_util_Color.set_g = function(this1,value) {
	this1 = (this1 >> 24 & 255 & 255) << 24 | (this1 >> 16 & 255 & 255) << 16 | (value & 255) << 8 | this1 & 255 & 255;
	return this1;
};
haxe_ui_util_Color.get_b = function(this1) {
	return this1 & 255;
};
haxe_ui_util_Color.set_b = function(this1,value) {
	this1 = (this1 >> 24 & 255 & 255) << 24 | (this1 >> 16 & 255 & 255) << 16 | (this1 >> 8 & 255 & 255) << 8 | value & 255;
	return this1;
};
haxe_ui_util_Color.get_a = function(this1) {
	return this1 >> 24 & 255;
};
haxe_ui_util_Color.set_a = function(this1,value) {
	this1 = (value & 255) << 24 | (this1 >> 16 & 255 & 255) << 16 | (this1 >> 8 & 255 & 255) << 8 | this1 & 255 & 255;
	return this1;
};
haxe_ui_util_Color.set = function(this1,r,g,b,a) {
	this1 = (a & 255) << 24 | (r & 255) << 16 | (g & 255) << 8 | b & 255;
	return this1;
};
haxe_ui_util_Color.toInt = function(this1) {
	return this1;
};
haxe_ui_util_Color.or = function(a,b) {
	return haxe_ui_util_Color.toInt(a) | haxe_ui_util_Color.toInt(b);
};
haxe_ui_util_Color.sumColor = function(a,b) {
	return haxe_ui_util_Color.toInt(haxe_ui_util_Color.fromComponents((a >> 16 & 255) + (b >> 16 & 255),(a >> 8 & 255) + (b >> 8 & 255),(a & 255) + (b & 255),(a >> 24 & 255) + (b >> 24 & 255)));
};
haxe_ui_util_Color.restColor = function(a,b) {
	return haxe_ui_util_Color.toInt(haxe_ui_util_Color.fromComponents((a >> 16 & 255) - (b >> 16 & 255),(a >> 8 & 255) - (b >> 8 & 255),(a & 255) - (b & 255),(a >> 24 & 255) - (b >> 24 & 255)));
};
haxe_ui_util_Color.sumFloat = function(a,b) {
	var bInt = b | 0;
	return haxe_ui_util_Color.toInt(haxe_ui_util_Color.fromComponents((a >> 16 & 255) - bInt,(a >> 8 & 255) - bInt,(a & 255) - bInt,(a >> 24 & 255) - bInt));
};
haxe_ui_util_Color.mulFloat = function(a,b) {
	return haxe_ui_util_Color.toInt(haxe_ui_util_Color.fromComponents((a >> 16 & 255) * b | 0,(a >> 8 & 255) * b | 0,(a & 255) * b | 0,(a >> 24 & 255) * b | 0));
};
var haxe_ui_util_ColorUtil = function() { };
$hxClasses["haxe.ui.util.ColorUtil"] = haxe_ui_util_ColorUtil;
haxe_ui_util_ColorUtil.__name__ = "haxe.ui.util.ColorUtil";
haxe_ui_util_ColorUtil.buildColorArray = function(startColor,endColor,size) {
	var array = [];
	var r1 = startColor >> 16 & 255;
	var g1 = startColor >> 8 & 255;
	var b1 = startColor & 255;
	var r2 = endColor >> 16 & 255;
	var g2 = endColor >> 8 & 255;
	var b2 = endColor & 255;
	var rd = r2 - r1;
	var gd = g2 - g1;
	var bd = b2 - b1;
	var ri = rd / (size - 1);
	var gi = gd / (size - 1);
	var bi = bd / (size - 1);
	var r = r1;
	var g = g1;
	var b = b1;
	var c;
	var _g = 0;
	var _g1 = size;
	while(_g < _g1) {
		var n = _g++;
		c = 0 | (Math.round(r) & 255) << 16 | (Math.round(g) & 255) << 8 | Math.round(b) & 255;
		array.push(haxe_ui_util_Color.toInt(c));
		r += ri;
		g += gi;
		b += bi;
	}
	return array;
};
haxe_ui_util_ColorUtil.parseColor = function(s) {
	if(StringTools.startsWith(s,"#")) {
		s = s.substring(1,s.length);
	} else if(StringTools.startsWith(s,"0x")) {
		s = s.substring(2,s.length);
	}
	return Std.parseInt("0x" + s);
};
var haxe_ui_util_ComponentUtil = function() { };
$hxClasses["haxe.ui.util.ComponentUtil"] = haxe_ui_util_ComponentUtil;
haxe_ui_util_ComponentUtil.__name__ = "haxe.ui.util.ComponentUtil";
haxe_ui_util_ComponentUtil.getDepth = function(target) {
	var count = 0;
	while(target.parentComponent != null) {
		target = target.parentComponent;
		++count;
	}
	return count;
};
var haxe_ui_util_EventMap = function() {
	this._map = new haxe_ds_StringMap();
};
$hxClasses["haxe.ui.util.EventMap"] = haxe_ui_util_EventMap;
haxe_ui_util_EventMap.__name__ = "haxe.ui.util.EventMap";
haxe_ui_util_EventMap.prototype = {
	_map: null
	,keys: function() {
		return new haxe_ds__$StringMap_StringMapKeyIterator(this._map.h);
	}
	,add: function(type,listener,priority) {
		if(priority == null) {
			priority = 0;
		}
		if(listener == null) {
			return false;
		}
		var b = false;
		var arr = this._map.h[type];
		if(arr == null) {
			arr = new haxe_ui_util_FunctionArray();
			arr.push(listener,priority);
			this._map.h[type] = arr;
			b = true;
		} else if(arr.contains(listener) == false) {
			arr.push(listener,priority);
		}
		return b;
	}
	,remove: function(type,listener) {
		if(listener == null) {
			return false;
		}
		var b = false;
		var arr = this._map.h[type];
		if(arr != null) {
			arr.remove(listener);
			if(arr.get_length() == 0) {
				var _this = this._map;
				if(Object.prototype.hasOwnProperty.call(_this.h,type)) {
					delete(_this.h[type]);
				}
				b = true;
			}
		}
		return b;
	}
	,contains: function(type,listener) {
		var b = false;
		var arr = this._map.h[type];
		if(arr != null) {
			b = listener != null ? arr.contains(listener) : true;
		}
		return b;
	}
	,invoke: function(type,event,target) {
		if(event.bubble && event.target == null) {
			event.target = target;
		}
		var arr = this._map.h[type];
		if(arr != null && arr.get_length() > 0) {
			arr = arr.copy();
			var listener = arr.iterator();
			while(listener.hasNext()) {
				var listener1 = listener.next();
				if(event.canceled) {
					break;
				}
				var c = event.clone();
				if(c.target == null) {
					c.target = target;
				}
				listener1.callback(c);
				event.canceled = c.canceled;
			}
		}
	}
	,listenerCount: function(type) {
		var n = 0;
		var arr = this._map.h[type];
		if(arr != null) {
			n = arr.get_length();
		}
		return n;
	}
	,listeners: function(type) {
		var arr = this._map.h[type];
		if(arr == null) {
			return null;
		}
		return arr;
	}
	,__class__: haxe_ui_util_EventMap
};
var haxe_ui_util_ExpressionUtil = function() { };
$hxClasses["haxe.ui.util.ExpressionUtil"] = haxe_ui_util_ExpressionUtil;
haxe_ui_util_ExpressionUtil.__name__ = "haxe.ui.util.ExpressionUtil";
haxe_ui_util_ExpressionUtil.stringToLanguageExpression = function(s,localeManager) {
	if(localeManager == null) {
		localeManager = "haxe.ui.locale.LocaleManager";
	}
	var fixedParts = [];
	var beforePos = 0;
	var n1 = s.indexOf("{{");
	while(n1 != -1) {
		var before = s.substring(beforePos,n1);
		if(before.length > 0) {
			fixedParts.push("'" + before + "'");
		}
		var n2 = s.indexOf("}}",n1);
		var code = s.substring(n1 + 2,n2);
		var parts = code.split(",");
		var stringId = parts.shift();
		var callString = localeManager + ".instance.lookupString('";
		callString += stringId;
		callString += "'";
		if(parts.length > 0) {
			callString += ", ";
			callString += parts.join(", ");
		}
		callString += ")";
		fixedParts.push(callString);
		n1 = s.indexOf("{{",n2);
		beforePos = n2 + 2;
	}
	if(beforePos < s.length) {
		var before = s.substring(beforePos,s.length);
		if(before.length > 0) {
			fixedParts.push("'" + before + "'");
		}
	}
	var fixedCode = fixedParts.join(" + ");
	return fixedCode;
};
var haxe_ui_util_FunctionArray = function() {
	this._array = [];
};
$hxClasses["haxe.ui.util.FunctionArray"] = haxe_ui_util_FunctionArray;
haxe_ui_util_FunctionArray.__name__ = "haxe.ui.util.FunctionArray";
haxe_ui_util_FunctionArray.prototype = {
	_array: null
	,get: function(index) {
		return this._array[index].callback;
	}
	,length: null
	,get_length: function() {
		return this._array.length;
	}
	,push: function(x,priority) {
		if(priority == null) {
			priority = 0;
		}
		var this1 = new haxe_ui_util__$Listener_ListenerInternal(x,priority);
		var listener = this1;
		var _g = 0;
		var _g1 = this._array.length;
		while(_g < _g1) {
			var i = _g++;
			if(this._array[i].priority < priority) {
				this._array.splice(i,0,listener);
				return i;
			}
		}
		return this._array.push(listener);
	}
	,pop: function() {
		return this._array.pop().callback;
	}
	,indexOf: function(x,fromIndex) {
		if(fromIndex == null) {
			fromIndex = 0;
		}
		var _g = fromIndex;
		var _g1 = this._array.length;
		while(_g < _g1) {
			var i = _g++;
			if(this._array[i].callback == x) {
				return i;
			}
		}
		return -1;
	}
	,remove: function(x) {
		var index = this.indexOf(x);
		if(index != -1) {
			this._array.splice(index,1);
		}
		return index != -1;
	}
	,contains: function(x) {
		return this.indexOf(x) != -1;
	}
	,iterator: function() {
		return new haxe_iterators_ArrayIterator(this._array);
	}
	,copy: function() {
		var fa = new haxe_ui_util_FunctionArray();
		fa._array = this._array.slice();
		return fa;
	}
	,toString: function() {
		var s = "[";
		var iter = this.iterator();
		while(iter.hasNext()) {
			s += Std.string(iter.next());
			if(iter.hasNext()) {
				s += ", ";
			}
		}
		s += "]";
		return s;
	}
	,__class__: haxe_ui_util_FunctionArray
	,__properties__: {get_length:"get_length"}
};
var haxe_ui_util_ImageLoader = function(resource) {
	this._resource = resource;
};
$hxClasses["haxe.ui.util.ImageLoader"] = haxe_ui_util_ImageLoader;
haxe_ui_util_ImageLoader.__name__ = "haxe.ui.util.ImageLoader";
haxe_ui_util_ImageLoader.prototype = {
	_resource: null
	,load: function(callback) {
		if(haxe_ui_util_Variant.get_isString(this._resource)) {
			var stringResource = haxe_ui_util_Variant.toString(this._resource);
			stringResource = StringTools.trim(stringResource);
			if(StringTools.startsWith(stringResource,"http://") || StringTools.startsWith(stringResource,"https://")) {
				this.loadFromHttp(stringResource,callback);
			} else if(StringTools.startsWith(stringResource,"file://")) {
				var tmp = HxOverrides.substr(stringResource,7,null);
				haxe_ui_Toolkit.get_assets().imageFromFile(tmp,callback);
			} else {
				haxe_ui_Toolkit.get_assets().getImage(stringResource,callback);
			}
		} else if(haxe_ui_util_Variant.get_isImageData(this._resource)) {
			var imageData = haxe_ui_util_Variant.toImageData(this._resource);
			if(callback != null) {
				callback(haxe_ui_ToolkitAssets.get_instance().imageInfoFromImageData(imageData));
			}
		}
	}
	,loadFromHttp: function(url,callback) {
		var request = new XMLHttpRequest();
		request.open("GET",url);
		request.responseType = "arraybuffer";
		request.onreadystatechange = function(_) {
			if(request.readyState != 4) {
				return;
			}
			var s;
			try {
				s = request.status;
			} catch( _g ) {
				s = null;
			}
			if(s == undefined) {
				s = null;
			}
			if(s != null && s >= 200 && s < 400) {
				haxe_ui_Toolkit.get_assets().imageFromBytes(haxe_io_Bytes.ofData(request.response),callback);
			} else if(s == null) {
				callback(null);
			} else {
				if(s == 0) {
					haxe_ui_Toolkit.get_assets().getImage(url,callback);
					return;
				}
				callback(null);
			}
		};
		request.onerror = function(x) {
		};
		request.send();
	}
	,__class__: haxe_ui_util_ImageLoader
};
var haxe_ui_util_Listener = {};
haxe_ui_util_Listener._new = function(callback,priority) {
	var this1 = new haxe_ui_util__$Listener_ListenerInternal(callback,priority);
	return this1;
};
haxe_ui_util_Listener.compareListener = function(a,b) {
	return a.callback == b.callback;
};
haxe_ui_util_Listener.compareFunction = function(a,b) {
	return a.callback == b;
};
haxe_ui_util_Listener.toFunc = function(this1) {
	return this1.callback;
};
var haxe_ui_util__$Listener_ListenerInternal = function(callback,priority) {
	this.callback = callback;
	this.priority = priority;
};
$hxClasses["haxe.ui.util._Listener.ListenerInternal"] = haxe_ui_util__$Listener_ListenerInternal;
haxe_ui_util__$Listener_ListenerInternal.__name__ = "haxe.ui.util._Listener.ListenerInternal";
haxe_ui_util__$Listener_ListenerInternal.prototype = {
	callback: null
	,priority: null
	,__class__: haxe_ui_util__$Listener_ListenerInternal
};
var haxe_ui_util_MathUtil = function() { };
$hxClasses["haxe.ui.util.MathUtil"] = haxe_ui_util_MathUtil;
haxe_ui_util_MathUtil.__name__ = "haxe.ui.util.MathUtil";
haxe_ui_util_MathUtil.distance = function(x1,y1,x2,y2) {
	return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
};
haxe_ui_util_MathUtil.round = function(v,precision) {
	if(precision == null) {
		precision = 0;
	}
	return Math.round(v * Math.pow(10,precision)) / Math.pow(10,precision);
};
haxe_ui_util_MathUtil.roundToNearest = function(v,n) {
	var r = v % n;
	if(r <= n / 2) {
		return Math.round(v - r);
	}
	return Math.round(v + n - r);
};
haxe_ui_util_MathUtil.clamp = function(v,min,max) {
	if(v == null || isNaN(v)) {
		return min;
	}
	if(min != null && v < min) {
		v = min;
	} else if(max != null && v > max) {
		v = max;
	}
	return v;
};
var haxe_ui_util_SimpleExpressionEvaluatorOperation = $hxEnums["haxe.ui.util.SimpleExpressionEvaluatorOperation"] = { __ename__:true,__constructs__:null
	,Add: {_hx_name:"Add",_hx_index:0,__enum__:"haxe.ui.util.SimpleExpressionEvaluatorOperation",toString:$estr}
	,Subtract: {_hx_name:"Subtract",_hx_index:1,__enum__:"haxe.ui.util.SimpleExpressionEvaluatorOperation",toString:$estr}
	,Multiply: {_hx_name:"Multiply",_hx_index:2,__enum__:"haxe.ui.util.SimpleExpressionEvaluatorOperation",toString:$estr}
	,Divide: {_hx_name:"Divide",_hx_index:3,__enum__:"haxe.ui.util.SimpleExpressionEvaluatorOperation",toString:$estr}
	,Equals: {_hx_name:"Equals",_hx_index:4,__enum__:"haxe.ui.util.SimpleExpressionEvaluatorOperation",toString:$estr}
	,NotEquals: {_hx_name:"NotEquals",_hx_index:5,__enum__:"haxe.ui.util.SimpleExpressionEvaluatorOperation",toString:$estr}
	,GreaterThan: {_hx_name:"GreaterThan",_hx_index:6,__enum__:"haxe.ui.util.SimpleExpressionEvaluatorOperation",toString:$estr}
	,GreaterThanOrEquals: {_hx_name:"GreaterThanOrEquals",_hx_index:7,__enum__:"haxe.ui.util.SimpleExpressionEvaluatorOperation",toString:$estr}
	,LessThan: {_hx_name:"LessThan",_hx_index:8,__enum__:"haxe.ui.util.SimpleExpressionEvaluatorOperation",toString:$estr}
	,LessThanOrEquals: {_hx_name:"LessThanOrEquals",_hx_index:9,__enum__:"haxe.ui.util.SimpleExpressionEvaluatorOperation",toString:$estr}
	,LogicalAnd: {_hx_name:"LogicalAnd",_hx_index:10,__enum__:"haxe.ui.util.SimpleExpressionEvaluatorOperation",toString:$estr}
	,LogicalOr: {_hx_name:"LogicalOr",_hx_index:11,__enum__:"haxe.ui.util.SimpleExpressionEvaluatorOperation",toString:$estr}
};
haxe_ui_util_SimpleExpressionEvaluatorOperation.__constructs__ = [haxe_ui_util_SimpleExpressionEvaluatorOperation.Add,haxe_ui_util_SimpleExpressionEvaluatorOperation.Subtract,haxe_ui_util_SimpleExpressionEvaluatorOperation.Multiply,haxe_ui_util_SimpleExpressionEvaluatorOperation.Divide,haxe_ui_util_SimpleExpressionEvaluatorOperation.Equals,haxe_ui_util_SimpleExpressionEvaluatorOperation.NotEquals,haxe_ui_util_SimpleExpressionEvaluatorOperation.GreaterThan,haxe_ui_util_SimpleExpressionEvaluatorOperation.GreaterThanOrEquals,haxe_ui_util_SimpleExpressionEvaluatorOperation.LessThan,haxe_ui_util_SimpleExpressionEvaluatorOperation.LessThanOrEquals,haxe_ui_util_SimpleExpressionEvaluatorOperation.LogicalAnd,haxe_ui_util_SimpleExpressionEvaluatorOperation.LogicalOr];
var haxe_ui_util_SimpleExpressionEvaluator = function() { };
$hxClasses["haxe.ui.util.SimpleExpressionEvaluator"] = haxe_ui_util_SimpleExpressionEvaluator;
haxe_ui_util_SimpleExpressionEvaluator.__name__ = "haxe.ui.util.SimpleExpressionEvaluator";
haxe_ui_util_SimpleExpressionEvaluator.evalCondition = function(condition) {
	return haxe_ui_util_SimpleExpressionEvaluator.eval(condition,{ Backend : haxe_ui_Backend, backend : haxe_ui_Backend.get_id()});
};
haxe_ui_util_SimpleExpressionEvaluator.eval = function(s,context) {
	var result = null;
	var operation = null;
	var token = "";
	var inString = false;
	var _g = 0;
	var _g1 = s.length;
	while(_g < _g1) {
		var i = _g++;
		var ch = s.charAt(i);
		var next = s.charAt(i + 1);
		if(ch == "'" || ch == "\"") {
			inString = !inString;
		}
		if(inString == false) {
			if(ch == "+") {
				operation = haxe_ui_util_SimpleExpressionEvaluatorOperation.Add;
				s = HxOverrides.substr(s,i + 1,null);
				break;
			} else if(ch == "-") {
				operation = haxe_ui_util_SimpleExpressionEvaluatorOperation.Subtract;
				s = HxOverrides.substr(s,i + 1,null);
				break;
			} else if(ch == "*") {
				operation = haxe_ui_util_SimpleExpressionEvaluatorOperation.Multiply;
				s = HxOverrides.substr(s,i + 1,null);
				break;
			} else if(ch == "/") {
				operation = haxe_ui_util_SimpleExpressionEvaluatorOperation.Divide;
				s = HxOverrides.substr(s,i + 1,null);
				break;
			} else if(ch == ">" && next != "=") {
				operation = haxe_ui_util_SimpleExpressionEvaluatorOperation.GreaterThan;
				s = HxOverrides.substr(s,i + 1,null);
				break;
			} else if(ch == "<" && next != "=") {
				operation = haxe_ui_util_SimpleExpressionEvaluatorOperation.LessThan;
				s = HxOverrides.substr(s,i + 1,null);
				break;
			} else if(ch == "=" && next == "=") {
				operation = haxe_ui_util_SimpleExpressionEvaluatorOperation.Equals;
				s = HxOverrides.substr(s,i + 2,null);
				break;
			} else if(ch == "!" && next == "=") {
				operation = haxe_ui_util_SimpleExpressionEvaluatorOperation.NotEquals;
				s = HxOverrides.substr(s,i + 2,null);
				break;
			} else if(ch == ">" && next == "=") {
				operation = haxe_ui_util_SimpleExpressionEvaluatorOperation.GreaterThanOrEquals;
				s = HxOverrides.substr(s,i + 2,null);
				break;
			} else if(ch == "<" && next == "=") {
				operation = haxe_ui_util_SimpleExpressionEvaluatorOperation.LessThanOrEquals;
				s = HxOverrides.substr(s,i + 2,null);
				break;
			} else if(ch == "&" && next == "&") {
				operation = haxe_ui_util_SimpleExpressionEvaluatorOperation.LogicalAnd;
				s = HxOverrides.substr(s,i + 2,null);
				break;
			} else if(ch == "|" && next == "|") {
				operation = haxe_ui_util_SimpleExpressionEvaluatorOperation.LogicalOr;
				s = HxOverrides.substr(s,i + 2,null);
				break;
			}
		}
		token += ch;
		if(i == s.length - 1) {
			s = "";
			break;
		}
	}
	var r = null;
	if(s.length > 0) {
		r = haxe_ui_util_SimpleExpressionEvaluator.eval(s,context);
	}
	var trimmedToken = StringTools.trim(token);
	var v = parseFloat(trimmedToken);
	if(!isNaN(v) && isFinite(v)) {
		result = parseFloat(trimmedToken);
	} else {
		var value = trimmedToken;
		value = value.toLowerCase();
		if(value == "true" || value == "false") {
			result = trimmedToken.toLowerCase() == "true";
		} else if(StringTools.startsWith(trimmedToken,"'") && StringTools.endsWith(trimmedToken,"'") ? true : StringTools.startsWith(trimmedToken,"\"") && StringTools.endsWith(trimmedToken,"\"")) {
			result = HxOverrides.substr(trimmedToken,1,trimmedToken.length - 2);
		} else {
			var token = "";
			var bracketsOpen = 0;
			var call = null;
			var callParams = null;
			var _g = 0;
			var _g1 = trimmedToken.length;
			while(_g < _g1) {
				var i = _g++;
				var ch = trimmedToken.charAt(i);
				if(ch == "(") {
					++bracketsOpen;
					if(bracketsOpen == 1) {
						call = token;
						token = "";
					} else {
						token += ch;
					}
				} else if(ch == ")") {
					--bracketsOpen;
					if(bracketsOpen == 0) {
						callParams = token;
					} else {
						token += ")";
					}
				} else {
					token += ch;
				}
			}
			var prop = null;
			if(call == null) {
				prop = token;
			}
			var parsedCallParams = [];
			if(callParams != null) {
				bracketsOpen = 0;
				token = "";
				var _g = 0;
				var _g1 = callParams.length;
				while(_g < _g1) {
					var i = _g++;
					var ch = callParams.charAt(i);
					if(ch == "(") {
						++bracketsOpen;
					} else if(ch == ")") {
						--bracketsOpen;
					}
					if(ch == ",") {
						if(bracketsOpen == 0) {
							parsedCallParams.push(token);
							token = "";
						} else {
							token += ch;
						}
					} else {
						token += ch;
					}
				}
				if(token.length != 0) {
					parsedCallParams.push(token);
				}
			}
			if(call != null) {
				var trimmedCall = StringTools.trim(call);
				if(trimmedCall.length > 0) {
					var callParts = trimmedCall.split(".");
					var ref = context;
					var prevRef = null;
					var _g = 0;
					while(_g < callParts.length) {
						var callPart = callParts[_g];
						++_g;
						prevRef = ref;
						if(Object.prototype.hasOwnProperty.call(ref,callPart)) {
							ref = Reflect.field(ref,callPart);
						} else {
							ref = Reflect.getProperty(ref,callPart);
						}
						if(ref == null) {
							throw haxe_Exception.thrown(callPart + " not found");
						}
					}
					if(ref != null && Reflect.isFunction(ref)) {
						var paramValues = [];
						var _g = 0;
						while(_g < parsedCallParams.length) {
							var param = parsedCallParams[_g];
							++_g;
							var paramResult = haxe_ui_util_SimpleExpressionEvaluator.eval(param,context);
							paramValues.push(paramResult);
						}
						result = ref.apply(prevRef,paramValues);
					}
				}
			} else if(prop != null) {
				var trimmedProp = StringTools.trim(prop);
				if(trimmedProp.length > 0) {
					var propParts = trimmedProp.split(".");
					var propName = propParts.pop();
					var ref = context;
					var _g = 0;
					while(_g < propParts.length) {
						var propPart = propParts[_g];
						++_g;
						ref = Reflect.field(ref,propPart);
					}
					if(Object.prototype.hasOwnProperty.call(ref,propName)) {
						result = Reflect.field(ref,propName);
					} else {
						result = Reflect.getProperty(ref,propName);
					}
				}
			}
		}
	}
	if(r != null) {
		switch(operation._hx_index) {
		case 0:
			result += r;
			break;
		case 1:
			result -= r;
			break;
		case 2:
			result *= r;
			break;
		case 3:
			result /= r;
			break;
		case 4:
			result = result == r;
			break;
		case 5:
			result = result != r;
			break;
		case 6:
			result = result > r;
			break;
		case 7:
			result = result >= r;
			break;
		case 8:
			result = result < r;
			break;
		case 9:
			result = result <= r;
			break;
		case 10:
			result = result && r;
			break;
		case 11:
			result = result || r;
			break;
		}
	}
	return result;
};
haxe_ui_util_SimpleExpressionEvaluator.isNum = function(value) {
	var v = parseFloat(value);
	if(!isNaN(v)) {
		return isFinite(v);
	} else {
		return false;
	}
};
haxe_ui_util_SimpleExpressionEvaluator.isString = function(value) {
	if(StringTools.startsWith(value,"'") && StringTools.endsWith(value,"'")) {
		return true;
	}
	if(StringTools.startsWith(value,"\"") && StringTools.endsWith(value,"\"")) {
		return true;
	}
	return false;
};
haxe_ui_util_SimpleExpressionEvaluator.isBool = function(value) {
	value = value.toLowerCase();
	if(value != "true") {
		return value == "false";
	} else {
		return true;
	}
};
var haxe_ui_util_StringUtil = function() { };
$hxClasses["haxe.ui.util.StringUtil"] = haxe_ui_util_StringUtil;
haxe_ui_util_StringUtil.__name__ = "haxe.ui.util.StringUtil";
haxe_ui_util_StringUtil.uncapitalizeFirstLetter = function(s) {
	s = HxOverrides.substr(s,0,1).toLowerCase() + HxOverrides.substr(s,1,s.length);
	return s;
};
haxe_ui_util_StringUtil.capitalizeFirstLetter = function(s) {
	s = HxOverrides.substr(s,0,1).toUpperCase() + HxOverrides.substr(s,1,s.length);
	return s;
};
haxe_ui_util_StringUtil.capitalizeHyphens = function(s) {
	return haxe_ui_util_StringUtil.capitalizeDelim(s,"-");
};
haxe_ui_util_StringUtil.capitalizeDelim = function(s,d) {
	var r = s;
	var n = r.indexOf(d);
	while(n != -1) {
		var before = HxOverrides.substr(r,0,n);
		var after = HxOverrides.substr(r,n + 1,r.length);
		r = before + haxe_ui_util_StringUtil.capitalizeFirstLetter(after);
		n = r.indexOf(d,n + 1);
	}
	return r;
};
haxe_ui_util_StringUtil.toDashes = function(s,toLower) {
	if(toLower == null) {
		toLower = true;
	}
	var s1 = new EReg("([a-zA-Z])(?=[A-Z])","g").map(s,function(re) {
		return "" + re.matched(1) + "-";
	});
	if(toLower == true) {
		s1 = s1.toLowerCase();
	}
	return s1;
};
haxe_ui_util_StringUtil.replaceVars = function(s,params) {
	if(params != null) {
		var h = params.h;
		var k_h = h;
		var k_keys = Object.keys(h);
		var k_length = k_keys.length;
		var k_current = 0;
		while(k_current < k_length) {
			var k = k_keys[k_current++];
			s = StringTools.replace(s,"${" + k + "}",params.h[k]);
		}
	}
	return s;
};
haxe_ui_util_StringUtil.rpad = function(s,count,c) {
	if(c == null) {
		c = " ";
	}
	var _g = 0;
	var _g1 = count;
	while(_g < _g1) {
		var i = _g++;
		s += c;
	}
	return s;
};
haxe_ui_util_StringUtil.padDecimal = function(v,precision) {
	var s = v == null ? "null" : "" + v;
	if(precision == null || precision <= 0) {
		return s;
	}
	var n = s.indexOf(".");
	if(n == -1) {
		n = s.length;
		s += ".";
	}
	var delta = precision - (s.length - n - 1);
	return haxe_ui_util_StringUtil.rpad(s,delta,"0");
};
var haxe_ui_util_StyleUtil = function() { };
$hxClasses["haxe.ui.util.StyleUtil"] = haxe_ui_util_StyleUtil;
haxe_ui_util_StyleUtil.__name__ = "haxe.ui.util.StyleUtil";
haxe_ui_util_StyleUtil.styleProperty2ComponentProperty = function(property) {
	return haxe_ui_util_StyleUtil.style2ComponentEReg.map(property,function(re) {
		return re.matched(1).toUpperCase();
	});
};
haxe_ui_util_StyleUtil.componentProperty2StyleProperty = function(property) {
	return haxe_ui_util_StyleUtil.component2StyleEReg.map(property,function(re) {
		return "-" + re.matched(1).toLowerCase();
	});
};
var haxe_ui_util_Timer = function(delay,callback) {
	haxe_ui_backend_TimerImpl.call(this,delay,callback);
};
$hxClasses["haxe.ui.util.Timer"] = haxe_ui_util_Timer;
haxe_ui_util_Timer.__name__ = "haxe.ui.util.Timer";
haxe_ui_util_Timer.delay = function(f,timeMs) {
	var t = null;
	t = new haxe_ui_util_Timer(timeMs,function() {
		t.stop();
		f();
	});
	return t;
};
haxe_ui_util_Timer.__super__ = haxe_ui_backend_TimerImpl;
haxe_ui_util_Timer.prototype = $extend(haxe_ui_backend_TimerImpl.prototype,{
	stop: function() {
		haxe_ui_backend_TimerImpl.prototype.stop.call(this);
	}
	,__class__: haxe_ui_util_Timer
});
var haxe_ui_util_TypeConverter = function() { };
$hxClasses["haxe.ui.util.TypeConverter"] = haxe_ui_util_TypeConverter;
haxe_ui_util_TypeConverter.__name__ = "haxe.ui.util.TypeConverter";
haxe_ui_util_TypeConverter.convertFrom = function(input) {
	var output = input;
	var _g = Type.typeof(input);
	if(_g._hx_index == 6) {
		if(_g.c == String) {
			var s = Std.string(input);
			if(s == "true" || s == "false") {
				output = s == "true";
			} else if(new EReg("^-?[0-9]*$","i").match(s == null ? "null" : "" + s)) {
				output = Std.parseInt(s);
			} else if(new EReg("^-?[0-9]*\\.[0-9]*$","i").match(s == null ? "null" : "" + s)) {
				output = parseFloat(s);
			}
		}
	}
	return output;
};
haxe_ui_util_TypeConverter.convertTo = function(input,type) {
	if(type == null) {
		return input;
	}
	if(type.toLowerCase() == "string") {
		return Std.string(input);
	}
	return input;
};
var haxe_ui_util_VariantType = $hxEnums["haxe.ui.util.VariantType"] = { __ename__:true,__constructs__:null
	,VT_Int: ($_=function(s) { return {_hx_index:0,s:s,__enum__:"haxe.ui.util.VariantType",toString:$estr}; },$_._hx_name="VT_Int",$_.__params__ = ["s"],$_)
	,VT_Float: ($_=function(s) { return {_hx_index:1,s:s,__enum__:"haxe.ui.util.VariantType",toString:$estr}; },$_._hx_name="VT_Float",$_.__params__ = ["s"],$_)
	,VT_String: ($_=function(s) { return {_hx_index:2,s:s,__enum__:"haxe.ui.util.VariantType",toString:$estr}; },$_._hx_name="VT_String",$_.__params__ = ["s"],$_)
	,VT_Bool: ($_=function(s) { return {_hx_index:3,s:s,__enum__:"haxe.ui.util.VariantType",toString:$estr}; },$_._hx_name="VT_Bool",$_.__params__ = ["s"],$_)
	,VT_Array: ($_=function(s) { return {_hx_index:4,s:s,__enum__:"haxe.ui.util.VariantType",toString:$estr}; },$_._hx_name="VT_Array",$_.__params__ = ["s"],$_)
	,VT_DataSource: ($_=function(s) { return {_hx_index:5,s:s,__enum__:"haxe.ui.util.VariantType",toString:$estr}; },$_._hx_name="VT_DataSource",$_.__params__ = ["s"],$_)
	,VT_Component: ($_=function(s) { return {_hx_index:6,s:s,__enum__:"haxe.ui.util.VariantType",toString:$estr}; },$_._hx_name="VT_Component",$_.__params__ = ["s"],$_)
	,VT_Date: ($_=function(s) { return {_hx_index:7,s:s,__enum__:"haxe.ui.util.VariantType",toString:$estr}; },$_._hx_name="VT_Date",$_.__params__ = ["s"],$_)
	,VT_ImageData: ($_=function(s) { return {_hx_index:8,s:s,__enum__:"haxe.ui.util.VariantType",toString:$estr}; },$_._hx_name="VT_ImageData",$_.__params__ = ["s"],$_)
};
haxe_ui_util_VariantType.__constructs__ = [haxe_ui_util_VariantType.VT_Int,haxe_ui_util_VariantType.VT_Float,haxe_ui_util_VariantType.VT_String,haxe_ui_util_VariantType.VT_Bool,haxe_ui_util_VariantType.VT_Array,haxe_ui_util_VariantType.VT_DataSource,haxe_ui_util_VariantType.VT_Component,haxe_ui_util_VariantType.VT_Date,haxe_ui_util_VariantType.VT_ImageData];
var haxe_ui_util_Variant = {};
haxe_ui_util_Variant.__properties__ = {get_isNull:"get_isNull",get_isDataSource:"get_isDataSource",get_isImageData:"get_isImageData",get_isComponent:"get_isComponent",get_isDate:"get_isDate",get_isArray:"get_isArray",get_isBool:"get_isBool",get_isNumber:"get_isNumber",get_isInt:"get_isInt",get_isFloat:"get_isFloat",get_isString:"get_isString"};
haxe_ui_util_Variant.fromString = function(s) {
	return haxe_ui_util_VariantType.VT_String(s);
};
haxe_ui_util_Variant.toString = function(this1) {
	if(this1 == null) {
		return null;
	}
	switch(this1._hx_index) {
	case 0:
		var s = this1.s;
		if(s == null) {
			return "null";
		} else {
			return "" + s;
		}
		break;
	case 1:
		var s = this1.s;
		if(s == null) {
			return "null";
		} else {
			return "" + s;
		}
		break;
	case 2:
		var s = this1.s;
		return s;
	case 3:
		var s = this1.s;
		if(s == null) {
			return "null";
		} else {
			return "" + s;
		}
		break;
	case 4:
		var s = this1.s;
		return Std.string(s);
	case 5:
		var _g = this1.s;
		return "";
	case 6:
		var s = this1.s;
		return Std.string(s);
	case 7:
		var s = this1.s;
		return Std.string(s);
	case 8:
		var s = this1.s;
		return "";
	}
};
haxe_ui_util_Variant.get_isString = function(this1) {
	if(this1._hx_index == 2) {
		var _g = this1.s;
		return true;
	} else {
		return false;
	}
};
haxe_ui_util_Variant.fromFloat = function(s) {
	return haxe_ui_util_VariantType.VT_Float(s);
};
haxe_ui_util_Variant.toFloat = function(this1) {
	if(haxe_ui_util_Variant.get_isNull(this1)) {
		return null;
	}
	switch(this1._hx_index) {
	case 0:
		var s = this1.s;
		return s;
	case 1:
		var s = this1.s;
		return s;
	default:
		throw haxe_Exception.thrown("Variant Type Error");
	}
};
haxe_ui_util_Variant.get_isFloat = function(this1) {
	if(this1._hx_index == 1) {
		var _g = this1.s;
		return true;
	} else {
		return false;
	}
};
haxe_ui_util_Variant.fromInt = function(s) {
	return haxe_ui_util_VariantType.VT_Int(s);
};
haxe_ui_util_Variant.toInt = function(this1) {
	if(haxe_ui_util_Variant.get_isNull(this1)) {
		return null;
	}
	switch(this1._hx_index) {
	case 0:
		var s = this1.s;
		return s;
	case 1:
		var s = this1.s;
		return s | 0;
	default:
		throw haxe_Exception.thrown("Variant Type Error " + Std.string(this1));
	}
};
haxe_ui_util_Variant.get_isInt = function(this1) {
	if(this1._hx_index == 0) {
		var _g = this1.s;
		return true;
	} else {
		return false;
	}
};
haxe_ui_util_Variant.get_isNumber = function(this1) {
	switch(this1._hx_index) {
	case 0:
		var _g = this1.s;
		return true;
	case 1:
		var _g = this1.s;
		return true;
	default:
		return false;
	}
};
haxe_ui_util_Variant.toNumber = function(this1) {
	switch(this1._hx_index) {
	case 0:
		var s = this1.s;
		return s;
	case 1:
		var s = this1.s;
		return s;
	default:
		throw haxe_Exception.thrown("Variant Type Error");
	}
};
haxe_ui_util_Variant.fromBool = function(s) {
	return haxe_ui_util_VariantType.VT_Bool(s);
};
haxe_ui_util_Variant.toBool = function(this1) {
	if(this1 == null) {
		return false;
	}
	switch(this1._hx_index) {
	case 2:
		var s = this1.s;
		return s == "true";
	case 3:
		var s = this1.s;
		return s;
	default:
		throw haxe_Exception.thrown("Variant Type Error");
	}
};
haxe_ui_util_Variant.get_isBool = function(this1) {
	if(this1._hx_index == 3) {
		var _g = this1.s;
		return true;
	}
	return false;
};
haxe_ui_util_Variant.fromArray = function(s) {
	if(s == null) {
		return null;
	} else {
		return haxe_ui_util_VariantType.VT_Array(s);
	}
};
haxe_ui_util_Variant.toArray = function(this1) {
	if(this1 == null) {
		return null;
	}
	if(this1._hx_index == 4) {
		var s = this1.s;
		return s;
	} else {
		throw haxe_Exception.thrown("Variant Type Error");
	}
};
haxe_ui_util_Variant.get_isArray = function(this1) {
	if(this1._hx_index == 4) {
		var _g = this1.s;
		return true;
	}
	return false;
};
haxe_ui_util_Variant.fromDate = function(s) {
	return haxe_ui_util_VariantType.VT_Date(s);
};
haxe_ui_util_Variant.toDate = function(this1) {
	if(this1 == null) {
		return null;
	}
	if(this1._hx_index == 7) {
		var s = this1.s;
		return s;
	} else {
		throw haxe_Exception.thrown("Variant Type Error");
	}
};
haxe_ui_util_Variant.get_isDate = function(this1) {
	if(this1._hx_index == 7) {
		var _g = this1.s;
		return true;
	}
	return false;
};
haxe_ui_util_Variant.fromComponent = function(s) {
	return haxe_ui_util_VariantType.VT_Component(s);
};
haxe_ui_util_Variant.toComponent = function(this1) {
	if(this1 == null) {
		return null;
	}
	if(this1._hx_index == 6) {
		var s = this1.s;
		return s;
	} else {
		throw haxe_Exception.thrown("Variant Type Error");
	}
};
haxe_ui_util_Variant.get_isComponent = function(this1) {
	if(this1._hx_index == 6) {
		var _g = this1.s;
		return true;
	}
	return false;
};
haxe_ui_util_Variant.fromImageData = function(s) {
	return haxe_ui_util_VariantType.VT_ImageData(s);
};
haxe_ui_util_Variant.toImageData = function(this1) {
	if(this1 == null) {
		return null;
	}
	if(this1._hx_index == 8) {
		var s = this1.s;
		return s;
	} else {
		throw haxe_Exception.thrown("Variant Type Error");
	}
};
haxe_ui_util_Variant.get_isImageData = function(this1) {
	if(this1._hx_index == 8) {
		var _g = this1.s;
		return true;
	}
	return false;
};
haxe_ui_util_Variant.fromDataSource = function(s) {
	return haxe_ui_util_VariantType.VT_DataSource(s);
};
haxe_ui_util_Variant.toDataSource = function(this1) {
	if(this1 == null) {
		return null;
	}
	if(this1._hx_index == 5) {
		var s = this1.s;
		return s;
	} else {
		throw haxe_Exception.thrown("Variant Type Error");
	}
};
haxe_ui_util_Variant.get_isDataSource = function(this1) {
	if(this1._hx_index == 5) {
		var _g = this1.s;
		return true;
	}
	return false;
};
haxe_ui_util_Variant.addFloat = function(lhs,rhs) {
	return lhs + haxe_ui_util_Variant.toNumber(rhs);
};
haxe_ui_util_Variant.addInt = function(lhs,rhs) {
	return lhs + haxe_ui_util_Variant.toInt(rhs);
};
haxe_ui_util_Variant.subtractFloat = function(lhs,rhs) {
	return lhs - haxe_ui_util_Variant.toNumber(rhs);
};
haxe_ui_util_Variant.subtractInt = function(lhs,rhs) {
	return lhs - haxe_ui_util_Variant.toInt(rhs);
};
haxe_ui_util_Variant.add = function(this1,rhs) {
	var tmp;
	var tmp1;
	switch(this1._hx_index) {
	case 0:
		var _g = this1.s;
		tmp1 = true;
		break;
	case 1:
		var _g = this1.s;
		tmp1 = true;
		break;
	default:
		tmp1 = false;
	}
	if(tmp1) {
		switch(rhs._hx_index) {
		case 0:
			var _g = rhs.s;
			tmp = true;
			break;
		case 1:
			var _g = rhs.s;
			tmp = true;
			break;
		default:
			tmp = false;
		}
	} else {
		tmp = false;
	}
	if(tmp) {
		return haxe_ui_util_Variant.fromFloat(haxe_ui_util_Variant.toNumber(this1) + haxe_ui_util_Variant.toNumber(rhs));
	} else if(haxe_ui_util_Variant.get_isString(this1) && haxe_ui_util_Variant.get_isString(rhs)) {
		return haxe_ui_util_Variant.fromString(haxe_ui_util_Variant.toString(this1) + haxe_ui_util_Variant.toString(rhs));
	}
	throw haxe_Exception.thrown("Variant operation error");
};
haxe_ui_util_Variant.postInc = function(this1) {
	var tmp;
	switch(this1._hx_index) {
	case 0:
		var _g = this1.s;
		tmp = true;
		break;
	case 1:
		var _g = this1.s;
		tmp = true;
		break;
	default:
		tmp = false;
	}
	if(tmp) {
		var old = this1;
		this1 = haxe_ui_util_VariantType.VT_Float(haxe_ui_util_Variant.toNumber(this1) + 1);
		return old;
	} else {
		throw haxe_Exception.thrown("Variant operation error");
	}
};
haxe_ui_util_Variant.preInc = function(this1) {
	var tmp;
	switch(this1._hx_index) {
	case 0:
		var _g = this1.s;
		tmp = true;
		break;
	case 1:
		var _g = this1.s;
		tmp = true;
		break;
	default:
		tmp = false;
	}
	if(tmp) {
		this1 = haxe_ui_util_VariantType.VT_Float(haxe_ui_util_Variant.toNumber(this1) + 1);
		return this1;
	} else {
		throw haxe_Exception.thrown("Variant operation error");
	}
};
haxe_ui_util_Variant.subtract = function(this1,rhs) {
	var tmp;
	var tmp1;
	switch(this1._hx_index) {
	case 0:
		var _g = this1.s;
		tmp1 = true;
		break;
	case 1:
		var _g = this1.s;
		tmp1 = true;
		break;
	default:
		tmp1 = false;
	}
	if(tmp1) {
		switch(rhs._hx_index) {
		case 0:
			var _g = rhs.s;
			tmp = true;
			break;
		case 1:
			var _g = rhs.s;
			tmp = true;
			break;
		default:
			tmp = false;
		}
	} else {
		tmp = false;
	}
	if(tmp) {
		return haxe_ui_util_Variant.fromFloat(haxe_ui_util_Variant.toNumber(this1) - haxe_ui_util_Variant.toNumber(rhs));
	} else if(haxe_ui_util_Variant.get_isString(this1) && haxe_ui_util_Variant.get_isString(rhs)) {
		return haxe_ui_util_Variant.fromString(StringTools.replace(haxe_ui_util_Variant.toString(this1),haxe_ui_util_Variant.toString(rhs),""));
	}
	throw haxe_Exception.thrown("Variant operation error");
};
haxe_ui_util_Variant.postDeinc = function(this1) {
	var tmp;
	switch(this1._hx_index) {
	case 0:
		var _g = this1.s;
		tmp = true;
		break;
	case 1:
		var _g = this1.s;
		tmp = true;
		break;
	default:
		tmp = false;
	}
	if(tmp) {
		var old = this1;
		this1 = haxe_ui_util_VariantType.VT_Float(haxe_ui_util_Variant.toNumber(this1) - 1);
		return old;
	} else {
		throw haxe_Exception.thrown("Variant operation error");
	}
};
haxe_ui_util_Variant.preDeinc = function(this1) {
	var tmp;
	switch(this1._hx_index) {
	case 0:
		var _g = this1.s;
		tmp = true;
		break;
	case 1:
		var _g = this1.s;
		tmp = true;
		break;
	default:
		tmp = false;
	}
	if(tmp) {
		this1 = haxe_ui_util_VariantType.VT_Float(haxe_ui_util_Variant.toNumber(this1) - 1);
		return this1;
	} else {
		throw haxe_Exception.thrown("Variant operation error");
	}
};
haxe_ui_util_Variant.multiply = function(this1,rhs) {
	var tmp;
	var tmp1;
	switch(this1._hx_index) {
	case 0:
		var _g = this1.s;
		tmp1 = true;
		break;
	case 1:
		var _g = this1.s;
		tmp1 = true;
		break;
	default:
		tmp1 = false;
	}
	if(tmp1) {
		switch(rhs._hx_index) {
		case 0:
			var _g = rhs.s;
			tmp = true;
			break;
		case 1:
			var _g = rhs.s;
			tmp = true;
			break;
		default:
			tmp = false;
		}
	} else {
		tmp = false;
	}
	if(tmp) {
		return haxe_ui_util_Variant.fromFloat(haxe_ui_util_Variant.toNumber(this1) * haxe_ui_util_Variant.toNumber(rhs));
	}
	throw haxe_Exception.thrown("Variant operation error");
};
haxe_ui_util_Variant.divide = function(this1,rhs) {
	var tmp;
	var tmp1;
	switch(this1._hx_index) {
	case 0:
		var _g = this1.s;
		tmp1 = true;
		break;
	case 1:
		var _g = this1.s;
		tmp1 = true;
		break;
	default:
		tmp1 = false;
	}
	if(tmp1) {
		switch(rhs._hx_index) {
		case 0:
			var _g = rhs.s;
			tmp = true;
			break;
		case 1:
			var _g = rhs.s;
			tmp = true;
			break;
		default:
			tmp = false;
		}
	} else {
		tmp = false;
	}
	if(tmp) {
		return haxe_ui_util_Variant.fromFloat(haxe_ui_util_Variant.toNumber(this1) / haxe_ui_util_Variant.toNumber(rhs));
	}
	throw haxe_Exception.thrown("Variant operation error");
};
haxe_ui_util_Variant.gt = function(this1,rhs) {
	var tmp;
	switch(this1._hx_index) {
	case 0:
		var _g = this1.s;
		tmp = true;
		break;
	case 1:
		var _g = this1.s;
		tmp = true;
		break;
	default:
		tmp = false;
	}
	if(tmp) {
		return haxe_ui_util_Variant.toNumber(this1) > haxe_ui_util_Variant.toNumber(rhs);
	} else if(haxe_ui_util_Variant.get_isString(this1)) {
		return haxe_ui_util_Variant.toString(this1) > haxe_ui_util_Variant.toString(rhs);
	}
	throw haxe_Exception.thrown("Variant operation error");
};
haxe_ui_util_Variant.gte = function(this1,rhs) {
	var tmp;
	switch(this1._hx_index) {
	case 0:
		var _g = this1.s;
		tmp = true;
		break;
	case 1:
		var _g = this1.s;
		tmp = true;
		break;
	default:
		tmp = false;
	}
	if(tmp) {
		return haxe_ui_util_Variant.toNumber(this1) >= haxe_ui_util_Variant.toNumber(rhs);
	} else if(haxe_ui_util_Variant.get_isString(this1)) {
		return haxe_ui_util_Variant.toString(this1) >= haxe_ui_util_Variant.toString(rhs);
	}
	throw haxe_Exception.thrown("Variant operation error");
};
haxe_ui_util_Variant.lt = function(this1,rhs) {
	var tmp;
	switch(this1._hx_index) {
	case 0:
		var _g = this1.s;
		tmp = true;
		break;
	case 1:
		var _g = this1.s;
		tmp = true;
		break;
	default:
		tmp = false;
	}
	if(tmp) {
		return haxe_ui_util_Variant.toNumber(this1) < haxe_ui_util_Variant.toNumber(rhs);
	} else if(haxe_ui_util_Variant.get_isString(this1)) {
		return haxe_ui_util_Variant.toString(this1) < haxe_ui_util_Variant.toString(rhs);
	}
	throw haxe_Exception.thrown("Variant operation error");
};
haxe_ui_util_Variant.lte = function(this1,rhs) {
	var tmp;
	switch(this1._hx_index) {
	case 0:
		var _g = this1.s;
		tmp = true;
		break;
	case 1:
		var _g = this1.s;
		tmp = true;
		break;
	default:
		tmp = false;
	}
	if(tmp) {
		return haxe_ui_util_Variant.toNumber(this1) <= haxe_ui_util_Variant.toNumber(rhs);
	} else if(haxe_ui_util_Variant.get_isString(this1)) {
		return haxe_ui_util_Variant.toString(this1) <= haxe_ui_util_Variant.toString(rhs);
	}
	throw haxe_Exception.thrown("Variant operation error");
};
haxe_ui_util_Variant.negate = function(this1) {
	var tmp;
	switch(this1._hx_index) {
	case 0:
		var _g = this1.s;
		tmp = true;
		break;
	case 1:
		var _g = this1.s;
		tmp = true;
		break;
	default:
		tmp = false;
	}
	if(tmp) {
		return haxe_ui_util_Variant.fromFloat(-haxe_ui_util_Variant.toNumber(this1));
	}
	throw haxe_Exception.thrown("Variant operation error");
};
haxe_ui_util_Variant.invert = function(this1) {
	if(haxe_ui_util_Variant.get_isBool(this1)) {
		var v = haxe_ui_util_Variant.toBool(this1);
		v = !v;
		return haxe_ui_util_Variant.fromBool(v);
	}
	throw haxe_Exception.thrown("Variant operation error");
};
haxe_ui_util_Variant.eq = function(this1,rhs) {
	if(haxe_ui_util_Variant.get_isNull(this1) && haxe_ui_util_Variant.get_isNull(rhs)) {
		return true;
	}
	if(haxe_ui_util_Variant.get_isNull(this1) && !haxe_ui_util_Variant.get_isNull(rhs)) {
		return false;
	}
	if(!haxe_ui_util_Variant.get_isNull(this1) && haxe_ui_util_Variant.get_isNull(rhs)) {
		return false;
	}
	var tmp;
	var tmp1;
	switch(this1._hx_index) {
	case 0:
		var _g = this1.s;
		tmp1 = true;
		break;
	case 1:
		var _g = this1.s;
		tmp1 = true;
		break;
	default:
		tmp1 = false;
	}
	if(tmp1) {
		switch(rhs._hx_index) {
		case 0:
			var _g = rhs.s;
			tmp = true;
			break;
		case 1:
			var _g = rhs.s;
			tmp = true;
			break;
		default:
			tmp = false;
		}
	} else {
		tmp = false;
	}
	if(tmp) {
		return haxe_ui_util_Variant.toNumber(this1) == haxe_ui_util_Variant.toNumber(rhs);
	} else if(haxe_ui_util_Variant.get_isBool(this1) && haxe_ui_util_Variant.get_isBool(rhs)) {
		return haxe_ui_util_Variant.toBool(this1) == haxe_ui_util_Variant.toBool(rhs);
	} else if(haxe_ui_util_Variant.get_isString(this1) && haxe_ui_util_Variant.get_isString(rhs)) {
		return haxe_ui_util_Variant.toString(this1) == haxe_ui_util_Variant.toString(rhs);
	}
	return false;
};
haxe_ui_util_Variant.neq = function(this1,rhs) {
	return !haxe_ui_util_Variant.eq(this1,rhs);
};
haxe_ui_util_Variant.get_isNull = function(this1) {
	if(this1 != null) {
		return haxe_ui_util_Variant.toString(this1) == null;
	} else {
		return true;
	}
};
haxe_ui_util_Variant.fromDynamic = function(r) {
	var v = null;
	if(r != null) {
		var tmp;
		if(haxe_ui_util_Variant.containsOnlyDigits(r)) {
			var f = parseFloat(("" + Std.string(r)));
			tmp = isNaN(f) == false;
		} else {
			tmp = false;
		}
		if(tmp) {
			if(Std.string(r).indexOf(".") != -1) {
				v = haxe_ui_util_Variant.fromFloat(parseFloat(("" + Std.string(r))));
			} else {
				v = haxe_ui_util_Variant.fromInt(Std.parseInt("" + Std.string(r)));
			}
		} else if("" + Std.string(r) == "true" || Std.string(r) + "" == "false") {
			v = haxe_ui_util_Variant.fromBool("" + Std.string(r) == "true");
		} else if(typeof(r) == "string") {
			v = haxe_ui_util_Variant.fromString(js_Boot.__cast(r , String));
		} else if(((r) instanceof haxe_ui_core_Component)) {
			v = haxe_ui_util_Variant.fromComponent(js_Boot.__cast(r , haxe_ui_core_Component));
		} else if(((r) instanceof haxe_ui_data_DataSource)) {
			v = r;
		} else if(((r) instanceof Array)) {
			v = r;
		} else if(((r) instanceof Date)) {
			v = haxe_ui_util_Variant.fromDate(js_Boot.__cast(r , Date));
		} else if(((r) instanceof HTMLImageElement)) {
			v = haxe_ui_util_Variant.fromImageData(js_Boot.__cast(r , HTMLImageElement));
		} else {
			v = r;
		}
	}
	return v;
};
haxe_ui_util_Variant.containsOnlyDigits = function(s) {
	if(typeof(s) == "number" && ((s | 0) === s) || typeof(s) == "number") {
		return true;
	}
	var t = Std.string(s);
	var _g = 0;
	var _g1 = t.length;
	while(_g < _g1) {
		var i = _g++;
		var c = t.charAt(i);
		if(c != "0" && c != "1" && c != "2" && c != "3" && c != "4" && c != "5" && c != "6" && c != "7" && c != "8" && c != "9" && c != "." && c != "-") {
			return false;
		}
	}
	return true;
};
haxe_ui_util_Variant.toDynamic = function(v) {
	var d = null;
	if(v != null) {
		switch(v._hx_index) {
		case 0:
			var y = v.s;
			d = y;
			break;
		case 1:
			var y = v.s;
			d = y;
			break;
		case 2:
			var y = v.s;
			d = y;
			break;
		case 3:
			var y = v.s;
			d = y;
			break;
		case 4:
			var y = v.s;
			d = y;
			break;
		case 5:
			var y = v.s;
			d = y;
			break;
		case 6:
			var y = v.s;
			d = y;
			break;
		case 7:
			var y = v.s;
			d = y;
			break;
		case 8:
			var y = v.s;
			d = y;
			break;
		}
	}
	return d;
};
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = "js.Boot";
js_Boot.getClass = function(o) {
	if(o == null) {
		return null;
	} else if(((o) instanceof Array)) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js_Boot.__nativeClassName(o);
		if(name != null) {
			return js_Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var con = e.__constructs__[o._hx_index];
			var n = con._hx_name;
			if(con.__params__) {
				s = s + "\t";
				return n + "(" + ((function($this) {
					var $r;
					var _g = [];
					{
						var _g1 = 0;
						var _g2 = con.__params__;
						while(true) {
							if(!(_g1 < _g2.length)) {
								break;
							}
							var p = _g2[_g1];
							_g1 = _g1 + 1;
							_g.push(js_Boot.__string_rec(o[p],s));
						}
					}
					$r = _g;
					return $r;
				}(this))).join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) {
		return false;
	}
	if(cc == cl) {
		return true;
	}
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g = 0;
		var _g1 = intf.length;
		while(_g < _g1) {
			var i = _g++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) {
				return true;
			}
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) {
		return false;
	}
	switch(cl) {
	case Array:
		return ((o) instanceof Array);
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return o != null;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return ((o | 0) === o);
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(js_Boot.__downcastCheck(o,cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(((o) instanceof cl)) {
					return true;
				}
			}
		} else {
			return false;
		}
		if(cl == Class ? o.__name__ != null : false) {
			return true;
		}
		if(cl == Enum ? o.__ename__ != null : false) {
			return true;
		}
		return o.__enum__ != null ? $hxEnums[o.__enum__] == cl : false;
	}
};
js_Boot.__downcastCheck = function(o,cl) {
	if(!((o) instanceof cl)) {
		if(cl.__isInterface__) {
			return js_Boot.__interfLoop(js_Boot.getClass(o),cl);
		} else {
			return false;
		}
	} else {
		return true;
	}
};
js_Boot.__implements = function(o,iface) {
	return js_Boot.__interfLoop(js_Boot.getClass(o),iface);
};
js_Boot.__cast = function(o,t) {
	if(o == null || js_Boot.__instanceof(o,t)) {
		return o;
	} else {
		throw haxe_Exception.thrown("Cannot cast " + Std.string(o) + " to " + Std.string(t));
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
$hxClasses["Math"] = Math;
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
String.prototype.__class__ = $hxClasses["String"] = String;
String.__name__ = "String";
$hxClasses["Array"] = Array;
Array.__name__ = "Array";
Date.prototype.__class__ = $hxClasses["Date"] = Date;
Date.__name__ = "Date";
var Int = { };
var Dynamic = { };
var Float = Number;
var Bool = Boolean;
var Class = { };
var Enum = { };
haxe_Resource.content = [{ name : "haxeui-core/styles/dark/dropdowns.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogRFJPUERPV05TDQoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLw0KLmRyb3Bkb3duLXBvcHVwIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjUyNzI4Ow0KICAgIGJvcmRlcjogMXB4IHNvbGlkICMxODFhMWI7DQp9DQo"},{ name : "haxeui-core/styles/dark/scrollview.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogU0NST0xMVklFVw0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi5zY3JvbGx2aWV3IHsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjMTgxYTFiOw0KICAgIGJvcmRlci1yYWRpdXM6IDFweDsNCiAgICBwYWRkaW5nOiAxcHg7DQogICAgd2lkdGg6IGF1dG87DQogICAgaGVpZ2h0OiBhdXRvOw0KICAgIGJhY2tncm91bmQtY29sb3I6ICMyNTI3Mjg7DQp9DQo"},{ name : "haxeui-core/styles/default/dialogs/question-small.png", data : "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABLFBMVEUAAAB7e4AzMzNLS0tUVFQ/Pz8lJSVRUVGenp6mprLIyMg6Oj0LCwtqamoLCws+Pj5CQkJVVVU6OjpFRUUmJiZVVVULCwsXFxdRUVENDQ1UVFSqqqyfn6K/v76zs7KZmZlRUVNQUFFzc3NycnIsWdUqVMn////o6Oju7u7a2uvc3NvPz9FJas4nTr0mTLrh4eFfgeFbfd9XedvMzMwrVcs5Wr4xVb5cc7pzlvRtj+4wYuXW1uSjsNeRotVPctVLbdJ1jNBeectBY8qVoshadciJlsYtVMPAwMGJlsBlfMA3V7kfRrZEX7MkSLNOZK08V6wSM5S2wuZ/mOIyYeEwX+GcreDR0dvPz9rY2NgzX9jJydA+ZM+lrsfDw8M+YMN1h8IqUL93iLwmSrQkRq3qyJ1kAAAAJHRSTlMArkdAPRgJB6Hc0pKHfHRubGNhXFxVVE9NHRXX19TUooaGeHiocz46AAAA7ElEQVQY0yXI1XbCUBRF0ROD4K719gbSuAd397oL8P//wA3Mhz3GXuAp0plEIkMX4cRP3wbLWPCO9h9/ni03OpLUaahs3isUq3aNaqVSNbrCFQXARNSBZpSwR33wHmGAuui3tHaz+VB60dv9SwpSwlSTpJ79Z273v1MzBXHR1nvOzhW/l0vH/olDzJy1/mVFEBRZHs3GMUiK7hfHcYqCZ+SOk0CeTZwPZPG8hZA8OSeBuRYX1hPiefTMLT5vGACSeF3PUa2G5us3ggQAX5qoD1ebzWpYJ9I+8EouFLjHAqEc/keFbDQcjmYLgB0Ay8YloSiVm/0AAAAASUVORK5CYII"},{ name : "haxeui-core/styles/default/right_arrow_square.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAIAAABLMMCEAAAABnRSTlMA7QAcACSX3bo6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAMUlEQVQImWN8K6PCwMCQbKIz98wVBhhggrOSTXSwiCJLoIjCJdBFIaYzYQqhiCK7AQAMqA07hk2gSAAAAABJRU5ErkJggg"},{ name : "haxeui-core/styles/default/sortable_asc.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAcAAAAJCAIAAABxOqH0AAAABnRSTlMA7QAcACSX3bo6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA0UlEQVQIHQHGADn/Ae0cJAAAAAAAANannypZYQAAAAAAAAIAAAAAAADWp58AAADWp58AAAAAAAACAAAA1qefAAAAAAAAAAAA1qefAAAAAe0cJAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAI1eVgAAAAAAAAAAAAMDA3CfpwIAAABzoqoAAAADAwMDAwNwn6cAAAACAAAAAAAAc6KqAAAAcJ+nAAAAAAAAAnQX2cErsvcAAAAASUVORK5CYII"},{ name : "styles/default/main.css", data : "LmJ1dHRvbiwgLmxhYmVsLCAudGV4dGFyZWEsIC50ZXh0ZmllbGQgew0KICAgIGZvbnQtbmFtZTogIkFyaWFsIjsNCiAgICBmb250LXNpemU6IDEzcHg7DQp9DQoNCi5jb21wb25lbnQ6ZGlzYWJsZWQgew0KICAgIGN1cnNvcjogbm90LWFsbG93ZWQ7DQp9"},{ name : "haxeui-core/styles/default/right_arrow_white.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAIAAACgB3uHAAAABnRSTlMA7QAcACSX3bo6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAM0lEQVQImWP8////O1lVBgYGBgYGJgYGBqHHtxEcOJ/x////DDDABGe9k1VlgrOgMnDTADWiDmfiE8U7AAAAAElFTkSuQmCC"},{ name : "haxeui-core/styles/default/up_arrow.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAIAAADNpLIqAAAABnRSTlMA7QAcACSX3bo6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAKklEQVQImWN8K6PCwMDAwMCQbKIz98wVCJsJLgQnoaJwDpzNGBAQwIABAOGNCDDIObJsAAAAAElFTkSuQmCC"},{ name : "haxeui-core/styles/global.css", data : ""},{ name : "haxeui-core/styles/default/ranges.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogUkFOR0UNCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovDQoucmFuZ2Ugew0KICAgIGJvcmRlcjogMXB4IHNvbGlkICNBQkFCQUI7DQogICAgcGFkZGluZzogMXB4Ow0KICAgIGJvcmRlci1yYWRpdXM6IDJweDsNCiAgICBmaWx0ZXI6IGRyb3Atc2hhZG93KDEsIDQ1LCAjODg4ODg4LCAwLjIsIDIsIDIsIDEsIDMsIHRydWUpOw0KfQ0KDQoucmFuZ2UtdmFsdWUgew0KICAgIGJvcmRlcjogbm9uZTsNCiAgICBib3JkZXItcmFkaXVzOiAxcHg7DQp9DQoNCi5ob3Jpem9udGFsLXJhbmdlIHsNCiAgICBiYWNrZ3JvdW5kOiAjRjFGMUYxICNGRkZGRkYgdmVydGljYWw7DQogICAgaW5pdGlhbC13aWR0aDogMTUwcHg7DQogICAgaW5pdGlhbC1oZWlnaHQ6IDhweDsNCn0gICAgDQoNCi5ob3Jpem9udGFsLXJhbmdlIC5yYW5nZS12YWx1ZSB7DQogICAgYmFja2dyb3VuZDogIzk4YzRlNiAjNTQ5YmRlIHZlcnRpY2FsOw0KICAgIGhlaWdodDogMTAwJTsNCn0NCg0KLnZlcnRpY2FsLXJhbmdlIHsNCiAgICBiYWNrZ3JvdW5kOiAjRjFGMUYxICNGRkZGRkYgaG9yaXpvbnRhbDsNCiAgICBpbml0aWFsLXdpZHRoOiA4cHg7DQogICAgaW5pdGlhbC1oZWlnaHQ6IDE1MHB4Ow0KfQ0KDQoudmVydGljYWwtcmFuZ2UgLnJhbmdlLXZhbHVlIHsNCiAgICBiYWNrZ3JvdW5kOiAjOThjNGU2ICM1NDliZGUgaG9yaXpvbnRhbDsNCiAgICB3aWR0aDogMTAwJTsNCn0NCg"},{ name : "haxeui-core/styles/default/sortable_arrows.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAcAAAAJCAIAAABxOqH0AAAABnRSTlMA7QAcACSX3bo6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA0UlEQVQIHQHGADn/Ae0cJAAAAAAAAIdYUHmosAAAAAAAAAIAAAAAAACHWFAAAACJWlIAAAAAAAACAAAAh1hQAgICAgICAAAAjV5WAAAAAe0cJAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAI1eVgAAAAAAAAAAAAMDA3CfpwIAAABzoqoAAAADAwMDAwNwn6cAAAACAAAAAAAAc6KqAAAAcJ+nAAAAAAAA2WwUSXgyq8MAAAAASUVORK5CYII"},{ name : "haxeui-core/styles/default/dialogs/cross-circle.png", data : "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"},{ name : "haxeui-core/styles/default/folder.png", data : "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TS1UqDnYQcchQXbQiKuIoVSyChdJWaNXB5NIPoUlDkuLiKLgWHPxYrDq4OOvq4CoIgh8gbm5Oii5S4v+SQosYD4778e7e4+4dINTLTDU7xgFVs4xUPCZmcyti8BVdCCCIMYxIzNQT6YUMPMfXPXx8vYvyLO9zf44eJW8ywCcSzzLdsIjXiac3LZ3zPnGYlSSF+Jx41KALEj9yXXb5jXPRYYFnho1Mao44TCwW21huY1YyVOIp4oiiapQvZF1WOG9xVstV1rwnf2Eory2nuU5zEHEsIoEkRMioYgNlWIjSqpFiIkX7MQ//gONPkksm1wYYOeZRgQrJ8YP/we9uzcLkhJsUigGBF9v+GAKCu0CjZtvfx7bdOAH8z8CV1vJX6sDMJ+m1lhY5Anq3gYvrlibvAZc7QP+TLhmSI/lpCoUC8H5G35QD+m6B7lW3t+Y+Th+ADHW1dAMcHALDRcpe83h3Z3tv/55p9vcDn0tyubRiDR8AAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQflCQUPOBy4URVbAAAARklEQVQ4y2NgoBAwMjAwMMxaseEMmvBzhv//56VFBqwnZAATduH/kgyMDNWzlm9MJdMFxIG0iAATJkrDYNSAYWHAKGBgAABfoBAAMkevhAAAAABJRU5ErkJggg"},{ name : "haxeui-core/styles/default/left_arrow.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAIAAACgB3uHAAAABnRSTlMA7QAcACSX3bo6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVQImWN8K6PCwMDAwMCQbKLDBGcxMDAwwVkMDAzMt5zsGGCAae6ZKwgOAwMDnA81AMIHAN2yC5bbbdIbAAAAAElFTkSuQmCC"},{ name : "haxeui-core/styles/dark/down_arrow_white.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAIAAADNpLIqAAAABnRSTlMA7QAcACSX3bo6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAJElEQVQImWP8//8/AwZgeieriib0TlaVCUIhCzEwMDAhc+DSAPKbCiUI9YmvAAAAAElFTkSuQmCC"},{ name : "haxeui-core/styles/default/buttons.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogQlVUVE9OUw0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi5idXR0b24gew0KICAgIGJhY2tncm91bmQ6ICNFREVERUQgI0U2RTZFNiB2ZXJ0aWNhbDsNCiAgICBjb2xvcjogIzIyMjIyMjsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjQUJBQkFCOw0KICAgIGJvcmRlci1yYWRpdXM6IDJweDsNCiAgICBwYWRkaW5nOiA1cHggOHB4Ow0KICAgIGN1cnNvcjogcG9pbnRlcjsNCiAgICB3aWR0aDogYXV0bzsNCiAgICBoZWlnaHQ6IGF1dG87DQogICAgc3BhY2luZzogNXB4IDVweDsNCiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7DQp9DQoNCi5idXR0b246aG92ZXIgew0KICAgIGJhY2tncm91bmQ6ICNGNUY1RjUgI0YxRjFGMSB2ZXJ0aWNhbDsNCiAgICBjb2xvcjogIzAwMDAwMDsNCn0NCg0KLmJ1dHRvbjpkb3duIHsNCiAgICBiYWNrZ3JvdW5kOiAjRDJEMkQyICNDMkMyQzIgdmVydGljYWw7DQogICAgY29sb3I6ICMwMDAwMDA7DQogICAgYm9yZGVyLWNvbG9yOiAjN0Y3RjdGOw0KfQ0KDQouYnV0dG9uOmFjdGl2ZSB7DQogICAgYm9yZGVyOiAycHggc29saWQgIzc3QzZGRjsNCn0NCg0KLmJ1dHRvbi5lbXBoYXNpemVkIHsNCiAgICBiYWNrZ3JvdW5kOiAjREFFNEVFICNENERFRTggdmVydGljYWw7DQogICAgYm9yZGVyLWNvbG9yOiAjNkNBMUQ3Ow0KfQ0KDQouYnV0dG9uLmVtcGhhc2l6ZWQ6aG92ZXIgew0KICAgIGJhY2tncm91bmQ6ICNFMkVDRjYgI0RFRThGMiB2ZXJ0aWNhbDsNCiAgICBib3JkZXItY29sb3I6ICM2Q0ExRDc7DQp9DQoNCi5idXR0b24uZW1waGFzaXplZDpkb3duIHsNCiAgICBiYWNrZ3JvdW5kOiAjQzJDQ0Q2ICNCNEJFQzggdmVydGljYWw7DQogICAgYm9yZGVyLWNvbG9yOiAjNTY4Q0MxOw0KfQ0KDQouYnV0dG9uOmRpc2FibGVkIHsNCiAgICBiYWNrZ3JvdW5kOiAjRDRENEQ0ICNDQ0NDQ0MgdmVydGljYWw7DQogICAgY29sb3I6ICM5MDkwOTA7DQogICAgY3Vyc29yOiBkZWZhdWx0Ow0KfQ0KDQouYnV0dG9uIC5sYWJlbCB7DQogICAgcG9pbnRlci1ldmVudHM6IG5vbmU7DQp9DQoNCi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCioqIEJVVFRPTiBCQVJTDQoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLw0KLmJ1dHRvbi1iYXIgew0KICAgIHNwYWNpbmc6IDA7DQp9DQoNCi5idXR0b24tYmFyIC5idXR0b24gew0KICAgIGJvcmRlci1yYWRpdXM6IDA7DQogICAgYm9yZGVyLWNvbG9yOiAjQUJBQkFCOw0KfQ0KDQouYnV0dG9uLWJhciAuYnV0dG9uOmRvd24gew0KICAgIGJhY2tncm91bmQtY29sb3I6ICNhN2M0ZTI7DQogICAgY29sb3I6IHdoaXRlOw0KfQ0KDQouaG9yaXpvbnRhbC1idXR0b24tYmFyIC5idXR0b24gew0KICAgIGJvcmRlci1sZWZ0LXNpemU6IDA7DQp9DQoNCi5ob3Jpem9udGFsLWJ1dHRvbi1iYXIgLmJ1dHRvbi5maXJzdCB7DQogICAgYm9yZGVyLWxlZnQtc2l6ZTogMTsNCn0NCg0KLnZlcnRpY2FsLWJ1dHRvbi1iYXIgLmJ1dHRvbiB7DQogICAgYm9yZGVyLXRvcC1zaXplOiAwOw0KfQ0KDQoudmVydGljYWwtYnV0dG9uLWJhciAuYnV0dG9uLmZpcnN0IHsNCiAgICBib3JkZXItdG9wLXNpemU6IDE7DQp9DQo"},{ name : "haxeui-core/styles/default/dialogs/exclamation-small.png", data : "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAwFBMVEUAAACbhQDBqAHk2jj68Jn89avSwBnp3W7l11+4ogbQux67pAXMswG/pwKmjwCchgDErAHJsAG1nQHMswG7owHCqQHHrgGwmQHLsgG+pQHk1ynm22PVzzXr33fUzEzr33jp22zPvy7LuxnSvzfGth7RvCzQuiXPuBLPuBHs3CXm2Sve1jHY0zkAAADz5XjS0D/77Yzs6YL27nh2dnZsbGzw32lgYGDTy0b06Ift4XDv3mnp22Hc1UzU0kUvLy8YGBjuZRp0AAAAKXRSTlMAyRH+/fnm29DBurKro52WkHt0ZVxFLyQdCfz29u/v5eXa2tDQxMSvr6tslocAAACYSURBVBjTdY9FEsJAFESHuLvibpOJC879b0UyFJAUlbfoX/1W/UEPhCQRHWFynNnu3o6m915L6Gwcs/qvOwKVZZTgfIU2C/M8nGufbm9ORVkW4dZ+d1+eXK6PZ1VNZR8La3W+RQhF0X1t4U3iKAiCJKljLDbrjAUJIUQI1iwNAFyePNYg1OSQd4HCHBrSFB9GAeqgg/r39wsyaBDiN04O2AAAAABJRU5ErkJggg"},{ name : "haxeui-core/styles/default/down_arrow.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAIAAADNpLIqAAAABnRSTlMA7QAcACSX3bo6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAJElEQVQImWMMCAhgwABMc89cQROae+YKE4RCFmJgYGBC5sClAQxaDmYcnISCAAAAAElFTkSuQmCC"},{ name : "haxeui-core/styles/default/tabs.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogVEFCQkFSIChUT1ApDQoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLw0KLnRhYmJhciB7DQogICAgcGFkZGluZy1sZWZ0OiAwcHg7DQogICAgcGFkZGluZy1yaWdodDogMHB4Ow0KICAgIGhlaWdodDogYXV0bzsNCiAgICB3aWR0aDogYXV0bzsNCiAgICBib3JkZXItYm90dG9tLXdpZHRoOiAxcHg7DQogICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogI0FCQUJBQjsNCiAgICBib3JkZXItdG9wLXdpZHRoOiAwcHg7DQogICAgY2xpcDogdHJ1ZTsNCn0NCg0KLnRhYmJhciA+IC50YWJiYXItY29udGVudHMgew0KICAgIGJvcmRlcjogbm9uZTsNCiAgICBib3JkZXItYm90dG9tLXdpZHRoOiAxcHg7DQogICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogI0FCQUJBQjsNCiAgICBzcGFjaW5nOiAwOw0KfQ0KDQoudGFiYmFyLWJ1dHRvbiB7DQogICAgYm9yZGVyLXJhZGl1czogMHB4Ow0KICAgIGJhY2tncm91bmQ6ICNFREVERUQgI0U2RTZFNiB2ZXJ0aWNhbDsNCiAgICBwYWRkaW5nOiA2cHggOHB4Ow0KICAgIHZlcnRpY2FsLWFsaWduOiBib3R0b207DQogICAgYm9yZGVyLWxlZnQtd2lkdGg6IDBweDsNCn0NCg0KLnRhYmJhci1idXR0b24uZmlyc3Qgew0KICAgIGJvcmRlci1sZWZ0LXdpZHRoOiAxcHg7DQp9DQoNCi50YWJiYXItYnV0dG9uOmhvdmVyIHsNCiAgICBiYWNrZ3JvdW5kOiAjRjVGNUY1ICNGMUYxRjEgdmVydGljYWw7DQp9DQoNCi50YWJiYXItYnV0dG9uOmRvd24gew0KICAgIGJvcmRlcjogMXB4IHNvbGlkICNBQkFCQUI7DQp9DQoNCi50YWJiYXItYnV0dG9uLXNlbGVjdGVkIHsNCiAgICBib3JkZXItcmFkaXVzOiAwcHg7DQoNCiAgICBib3JkZXItYm90dG9tLXdpZHRoOiAxcHg7DQogICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogd2hpdGU7DQogICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7DQogICAgYm9yZGVyLWxlZnQtd2lkdGg6IDBweDsNCn0NCg0KLnRhYmJhci1idXR0b24tc2VsZWN0ZWQuZmlyc3Qgew0KICAgIGJvcmRlci1sZWZ0LXdpZHRoOiAxcHg7DQp9DQoNCi50YWJiYXItc2Nyb2xsLWxlZnQgew0KICAgIGljb246ICJoYXhldWktY29yZS9zdHlsZXMvZGVmYXVsdC9sZWZ0X2Fycm93LnBuZyI7DQogICAgYm9yZGVyLXJhZGl1czogMDsNCiAgICBwYWRkaW5nOiA1cHg7DQp9DQoNCi50YWJiYXItc2Nyb2xsLXJpZ2h0IHsNCiAgICBpY29uOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RlZmF1bHQvcmlnaHRfYXJyb3cucG5nIjsNCiAgICBib3JkZXItcmFkaXVzOiAwOw0KICAgIHBhZGRpbmc6IDVweDsNCn0NCg0KLnRhYmJhci1idXR0b24tc2VsZWN0ZWQgLmxhYmVsIHsNCn0NCg0KLnRhYmJhci1idXR0b24tc2VsZWN0ZWQgLmljb24gew0KfQ0KDQoudGFiYmFyLWJ1dHRvbiAudGFiLWNsb3NlLWJ1dHRvbiB7DQogICAgcmVzb3VyY2U6ICJoYXhldWktY29yZS9zdHlsZXMvZGVmYXVsdC90aW55LWNsb3NlLWJ1dHRvbi5wbmciOw0KfQ0KDQovKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqDQoqKiBUQUJCQVIgKEJPVFRPTSkNCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovDQoudGFiYmFyOmJvdHRvbSB7DQogICAgcGFkZGluZy1sZWZ0OiAwcHg7DQogICAgcGFkZGluZy1yaWdodDogMHB4Ow0KICAgIGhlaWdodDogYXV0bzsNCiAgICB3aWR0aDogYXV0bzsNCiAgICBib3JkZXItYm90dG9tLXdpZHRoOiAwcHg7DQogICAgYm9yZGVyLXRvcC13aWR0aDogMXB4Ow0KICAgIGJvcmRlci10b3AtY29sb3I6ICNBQkFCQUI7DQogICAgY2xpcDogdHJ1ZTsNCn0NCg0KLnRhYmJhcjpib3R0b20gLnRhYmJhci1jb250ZW50cyB7DQogICAgYm9yZGVyOiBub25lOw0KICAgIGJvcmRlci1ib3R0b20td2lkdGg6IDBweDsNCiAgICBib3JkZXItdG9wLXdpZHRoOiAxcHg7DQogICAgYm9yZGVyLXRvcC1jb2xvcjogI0FCQUJBQjsNCiAgICBzcGFjaW5nOiAwOw0KfQ0KDQoudGFiYmFyLWJ1dHRvbjpib3R0b20gew0KICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7DQogICAgYm9yZGVyLWxlZnQtd2lkdGg6IDBweDsNCn0NCg0KLnRhYmJhci1idXR0b24uZmlyc3Qgew0KICAgIGJvcmRlci1sZWZ0LXdpZHRoOiAxcHg7DQp9DQoNCi50YWJiYXItYnV0dG9uLXNlbGVjdGVkOmJvdHRvbSB7DQogICAgYm9yZGVyLXJhZGl1czogMHB4Ow0KDQogICAgYm9yZGVyOiAxcHggc29saWQgI0FCQUJBQjsNCiAgICBib3JkZXItdG9wLXdpZHRoOiAxcHg7DQogICAgYm9yZGVyLXRvcC1jb2xvcjogd2hpdGU7DQogICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7DQogICAgYm9yZGVyLWxlZnQtd2lkdGg6IDBweDsNCn0NCg0KLnRhYmJhci1idXR0b24tc2VsZWN0ZWQuZmlyc3Qgew0KICAgIGJvcmRlci1sZWZ0LXdpZHRoOiAxcHg7DQp9DQoNCi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCioqIFRBQlZJRVcNCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovDQoudGFidmlldyB7DQogICAgYm9yZGVyOiBub25lOw0KICAgIHdpZHRoOiBhdXRvOw0KICAgIGhlaWdodDogYXV0bzsNCn0NCg0KLnRhYnZpZXcgPiAudGFidmlldy10YWJzIHsNCiAgICBtYXJnaW4tdG9wOiAxcHg7DQp9DQoNCi50YWJ2aWV3OmJvdHRvbSA+IC50YWJ2aWV3LXRhYnMgew0KICAgIG1hcmdpbi10b3A6IDBweDsNCn0NCg0KLnRhYnZpZXcgPiAudGFidmlldy1jb250ZW50IHsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjQUJBQkFCOw0KICAgIHBhZGRpbmc6IDVweDsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsNCn0NCg0KLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogVEFCVklFVyBBTFQgU1RZTEVTDQoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLw0KLmNvbGxhcHNpYmxlLWxhYmVscyAudGFiYmFyLWJ1dHRvbiAubGFiZWwgew0KICAgIGhpZGRlbjogdHJ1ZTsNCn0NCg0KLmNvbGxhcHNpYmxlLWxhYmVscyAudGFiYmFyLWJ1dHRvbi1zZWxlY3RlZCAubGFiZWwgew0KICAgIGhpZGRlbjogZmFsc2U7DQp9DQo"},{ name : "haxeui-core/styles/dark/check.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH5QEaCTskh/mOvAAAAS5JREFUKM+NkbtKA2EQhb/ZrLIGL2BnExDEIr2FguADBLMo/IWFCF7AwiewEkRQ7GwUkXRiY4LZGASLtbIQK4tgo7VWgmBMdrM7FokQxBinO2fmzAczwj8qn78cFzuaCmu1U7vbcLlcHqyH0TUqqR7HweoWqDXiPSAFBBLHd38SCgVvBtW1ppJt13UrHQme5yWxOAZE4SGsV3cBOhIaMTvAGNBIEC/PGRMA2OfF4oSFXBFLMQyqK8aYKO95k8RsAIiwn53N3n8vsiwYRRlGdMl2+g5zvu+IcgJYAo9vA/1b7WRRVbkolo4UVltWBTQNxKIy7bqZ2/aAJSIa1D/XBc6alqZbvYOfw0DzD8aY6PVlZBEotfynpNO7+dsxpF3kfN8Zev9Y0AQ385nM82+BL3sbaMn2+wKIAAAAAElFTkSuQmCC"},{ name : "haxeui-core/styles/dark/tooltips.css", data : "LnRvb2x0aXAgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICMyYzJmMzA7DQogICAgYm9yZGVyOiAxcHggc29saWQgIzE4MWExYjsNCiAgICBmaWx0ZXI6IGRyb3Atc2hhZG93KDEsIDQ1LCAjMDAwMDAwLCAwLjA1LCA2LCAxLCAzMCwgMzUsIGZhbHNlKTsNCiAgICBib3JkZXItcmFkaXVzOiAycHg7DQogICAgcGFkZGluZzogNHB4IDVweDsNCiAgICBtYXJnaW4tbGVmdDogMHB4Ow0KICAgIG1hcmdpbi10b3A6IDMwcHg7DQp9DQoNCi50b29sdGlwIC5sYWJlbCB7DQogICAgY29sb3I6ICNkNGQ0ZDQ7DQp9"},{ name : "haxeui-core/styles/default/dropdowns.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogRFJPUERPV05TDQoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLw0KLmRyb3Bkb3duIHsNCiAgICBpY29uOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RlZmF1bHQvc29ydGFibGVfYXJyb3dzLnBuZyI7DQogICAgaWNvbi1wb3NpdGlvbjogZmFyLXJpZ2h0Ow0KICAgIHRleHQtYWxpZ246IGxlZnQ7DQogICAgcGFkZGluZzogNXB4Ow0KfQ0KDQouZHJvcGRvd24tcG9wdXAgew0KICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlOw0KICAgIGJvcmRlcjogMXB4IHNvbGlkICNBQkFCQUI7DQp9DQoNCi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCioqIE1PQklMRSBWQVJJQU5UUw0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi5kcm9wZG93bjptb2JpbGUgew0KICAgIG1vZGU6IG1vYmlsZTsNCn0NCg0KLmRyb3Bkb3duLXBvcHVwOm1vYmlsZSB7DQogICAgd2lkdGg6IDc1JTsNCn0NCg"},{ name : "haxeui-core/styles/default/small-close-button.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAwAAAANCAMAAACq939wAAAAhFBMVEV4eHj///8AAAAAAAAAAAAbGxsAAAAAAADn5+cAAADv7+8gICAiIiIZGRnr6+sAAADj4+Pm5uYAAAB4eHiOjo4TExMKCgqJiYkfHx/////Jycn09PT////////o6OgAAAD///+QkJCRkZEFBQUAAAAiIiIAAABiYmJtbW0+Pj5OTk4AAAByRYNBAAAALHRSTlMBgGhkXmBbeHd1eHVrW3U2c3FwZmVkZGFOQDc1MBwcDQdralhYVUxLRkY7Ld49hcYAAACESURBVAjXFY1HDoNAEAQnbYLFYHIG5/T//3moU5dUUoOSiws2h4ONXEnMZDcVCpURm3XtXRtX4clkZ6z5B1KaE/oCk0hPcCRqmKSBLTi2WYHoU5IbNKx94tFH28OHOm1Sj1f+wtq0dQwUL8GsAKNhYhE2o57u0+shtn9POxws8zDMi44/AScHBY0KWggAAAAASUVORK5CYII"},{ name : "haxeui-core/styles/dark/main.css", data : "LmxhYmVsLCAuYnV0dG9uLCAudGV4dGZpZWxkLCAudGV4dGFyZWEgew0KICAgIGNvbG9yOiAjYjRiNGI0Ow0KfQ0KDQouZGVmYXVsdC1iYWNrZ3JvdW5kIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmMyZjMwOw0KfQ0KDQoubW9kYWwtYmFja2dyb3VuZCB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7DQogICAgb3BhY2l0eTogMC44NTsNCn0NCg0KLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogTEFCRUwNCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovDQoubGFiZWwgew0KICAgIGNvbG9yOiAjYjRiNGI0Ow0KfQ0KICAgIA0KLmxhYmVsOmRpc2FibGVkIHsNCiAgICBjb2xvcjogIzU5NTk1OTsNCn0NCg0KLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogTElOSw0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi5saW5rIHsNCiAgICBjb2xvcjogIzQwN2RiZjsNCn0NCg"},{ name : "haxeui-core/locale/en/dialog.properties", data : "ZGlhbG9nLnNhdmU9U2F2ZQ0KZGlhbG9nLnllcz1ZZXMNCmRpYWxvZy5ubz1Obw0KZGlhbG9nLmNsb3NlPUNsb3NlDQpkaWFsb2cub2s9T0sNCmRpYWxvZy5jYW5jZWw9Q2FuY2VsDQpkaWFsb2cuYXBwbHk9QXBwbHkNCg"},{ name : "haxeui-core/styles/dark/sliders.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogU0xJREVSUw0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi5ob3Jpem9udGFsLXNsaWRlciB7DQogICAgcGFkZGluZy1sZWZ0OiA1cHg7DQogICAgcGFkZGluZy1yaWdodDogNXB4Ow0KICAgIHBhZGRpbmctdG9wOiAwcHg7DQogICAgcGFkZGluZy1ib3R0b206IDBweDsNCiAgICBoZWlnaHQ6IGF1dG87DQogICAgaW5pdGlhbC13aWR0aDogMTUwcHg7DQp9DQoNCi5ob3Jpem9udGFsLXNsaWRlciAuc2xpZGVyLXZhbHVlIHsNCiAgICB3aWR0aDogMTAwJTsNCiAgICBoZWlnaHQ6IDhweDsNCiAgICBib3JkZXItcmFkaXVzOiAycHg7DQogICAgdmVydGljYWwtYWxpZ246IGNlbnRlcjsNCiAgICBjdXJzb3I6IHBvaW50ZXI7DQp9DQoNCi5ob3Jpem9udGFsLXNsaWRlci53aXRoLWNlbnRlciAucmFuZ2UtdmFsdWUgew0KICAgIGJvcmRlci1yYWRpdXM6IDBweDsNCn0NCg0KLmhvcml6b250YWwtc2xpZGVyIC5taW5vci10aWNrIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTgxYTFiOw0KfQ0KDQouaG9yaXpvbnRhbC1zbGlkZXIgLm1ham9yLXRpY2sgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICMxODFhMWI7DQp9DQoNCi5ob3Jpem9udGFsLXNsaWRlciAuYnV0dG9uIHsNCiAgICB3aWR0aDogMTFweDsNCiAgICBoZWlnaHQ6IDIwcHg7DQogICAgYm9yZGVyLXJhZGl1czogMnB4Ow0KICAgIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7DQogICAgZmlsdGVyOiBub25lOw0KfQ0KICAgIA0KLnZlcnRpY2FsLXNsaWRlciB7DQogICAgcGFkZGluZy10b3A6IDVweDsNCiAgICBwYWRkaW5nLWJvdHRvbTogNXB4Ow0KICAgIHBhZGRpbmctbGVmdDogMHB4Ow0KICAgIHBhZGRpbmctcmlnaHQ6IDBweDsNCiAgICB3aWR0aDogYXV0bzsNCiAgICBpbml0aWFsLWhlaWdodDogMTUwcHg7DQp9DQoNCi52ZXJ0aWNhbC1zbGlkZXIgLnNsaWRlci12YWx1ZSB7DQogICAgaGVpZ2h0OiAxMDAlOw0KICAgIHdpZHRoOiA4cHg7DQogICAgYm9yZGVyLXJhZGl1czogMnB4Ow0KICAgIGhvcml6b250YWwtYWxpZ246IGNlbnRlcjsNCiAgICBjdXJzb3I6IHBvaW50ZXI7DQp9DQoNCi52ZXJ0aWNhbC1zbGlkZXIud2l0aC1jZW50ZXIgLnJhbmdlLXZhbHVlIHsNCiAgICBib3JkZXItcmFkaXVzOiAwcHg7DQp9DQoNCi52ZXJ0aWNhbC1zbGlkZXIgLm1pbm9yLXRpY2sgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICMxODFhMWI7DQp9DQoNCi52ZXJ0aWNhbC1zbGlkZXIgLm1ham9yLXRpY2sgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICMxODFhMWI7DQp9DQoNCi52ZXJ0aWNhbC1zbGlkZXIgLmJ1dHRvbiB7DQogICAgd2lkdGg6IDIwcHg7DQogICAgaGVpZ2h0OiAxMXB4Ow0KICAgIGJvcmRlci1yYWRpdXM6IDJweDsNCiAgICBob3Jpem9udGFsLWFsaWduOiBjZW50ZXI7DQogICAgZmlsdGVyOiBub25lOw0KfQ0KDQo"},{ name : "haxeui-core/styles/dark/left_arrow_white.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAIAAACgB3uHAAAABnRSTlMA7QAcACSX3bo6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVQImWN8K6PCwMDAwMAg9Pg2E5zFwMDABGcxMDAw/v//nwEGmN7JqiI4DAwMcD7UAAgfAMkKDTd2MVgoAAAAAElFTkSuQmCC"},{ name : "haxeui-core/styles/default/right_arrow_circled.png", data : "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAOYHpUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjarZlpdiO5EYT/4xQ+AhI7joP1Pd/Ax/eXQElNLd2jGVt8YpFVWHOJiATN+s+/t/kXf8GVYELMJdWULH+hhuoaH4q9f/cqNpz3++XtmXy8b94fOG55rv5+Tetp37gff3XI4bnfP943eTzjlGcgeR/4/HmdWT8/7cozkHf3vjzfTX36tfCyneffjWfYZ/DP30PGGDMynnfGLS/e8l50Fq//4hvXwLvzTMz3dO5E3oMP39vOvH/8ZLz3T59sZ9tz3380hbHpaZA+2ei5L/HTff8+jfvotV8zf3jQkt329e/FdnvPsve6u2shYalknk29beV8omHHlP50S7wy/5HP+bwqr8IWBx6beLPzGkaqOKy9JciUJlvWuQ4ZLDG45TJX5wY+0HvFZ1fd8OqCoC/ZLvvqp/EF3wy85rnt3tciZ9565hsE7bRTaOmEwYQeX17mu5v/5PU+0N4auiK2vNuKdTmNaZahntN3WuEQ2Y9N47HveZmXuLEvjvV4MB4zFzbYbL9D9Ci/YssfP3vaRRuMvakheT4DYCLmjixGPB6wSXyUJDY7l0WwY8E/jZU7H1zHAxKjm2I2vvE+4ZzidG76ZDltXXT3NtCCIyKJknFN9Q1nhRCJnxwKMdSij8HEGFPMscQaW/IppJhSykkxqmWfQ4455ZxLrrkVX0KJJZVcSqmlVVc9EBZrqtnUUmttjUkbQzd6N1q01l33PfTYU8+99NrbIHxGGHGkkUcZdbTppp+k/0wzm1lmnW3JIpRWWHGllVdZdbVNrG2/w4477bzLrru9e+3x6kevySfP/dlr8nhNPRZOu/zLa9zO+W0IUTiJ6jM85oLg8aweIKCd+swWCcGp59RntgJaPjq8JlGdM0U9hgfDEhe3vPvul+f+6DcTw9/ym/ud54y67v/hOaOuezz31W/feG22wyj+OEizUG1q/QbYaLBKc6UpJ/32umPau2CEpvm9Z9yb1J34Uq8LFql2D++n5M1C2nm8Nni2MXiwMmYevujdKiUtv1ef0vU7Bmd420aa4kHI2diIz23nmLqP0/c+UsLVzA49heJnDbmxoFxTXy2BMzOw0hGVHHk7V/P2wWLl0IBJwmH10VmU13kxqU9nnXGVsxLiZ+bW9h222xz7ttkkNWFcLZIyYRIWiy2UYXFkwKgusFK/OuPDpCiO1vIergfdH7ZIOvTGFkaNQUj78Pn5i610mStmXXpUtv/uar55EPtsLhdMeTbUXe6tx9pmFVLGK+908BHVIGvY3WayZH8rv7yS2/HKmtcrkJ+GTNwlzTZILEtMQnp9n/Z4Hs/sJbGuHo3e8gQJuJ4BDm1QNGps6YvvLYaJK1Kq8NHvN6aU/ZsHJCsOJpePfQg/AmbHugnfsywgRRemfg1AbTdLyCTbIOWVhlf7+33Njys3g9ZNvk50mB+pq6drJBNI7ko26xCInVHgNQg5KVQE8RPThTZEd8YGz4DObXpvEhLbr2IJlbhfAvFLQEaJk97AhnTgyGrKTqJrVO8CFpIaiC90hOMTKJjLIuzysSq79iacpCMqZzgbe+JKTTOrrrwRWmUCmPWPWW3+Mu2/vYa0UI8tV6mNKxY0fmUe9rMeAbCuZfz2eRIQtNXI5v4uPYfQ0yS3YiEIZ9Rgz4W0DqMFw5LdGB7VzBzIcf8pDHLCUSMsgLFnf2M9zZu8jdTTaFt4wIRJO/wBkHdW03Ygz1BDLDI2EOOnmzV/1zpv1wLUJOKMDfYN7xhSk5SYQzRmQzyrAQQVk1i2S4ACIP8Vkdg0cfCW5qsZ3RmZF2LvJxXbHgdjUDmOsRJj5iW16r3S0vqa1mtqGJuDin9Ixm+usXbBhb1WgGV0FVewiNszROhup8D25q54XogEgn3Ch3l3SKoS4Qp8LitKeKgLqgAZNJULF1umKSgrGve66p6kEbENvCsx97UUtSD/mfS5TMjSdhdqgsGzGymAAN7bkTyYPYHDbv0amja58oRtN//DjWJw4hWzodh6z9fIPT5GVoe1Y+TrtJ4vxMO42LhZP3ONJ1aflF0+FnNTFvMBoWtehKyNTwPGc3EAPU1TA+syN5y32FFyLpSBCpWLPLM2RITfHY6EcLDICTfm+NlVS4gMimbqVsPaMdgeI5JBZPQig6VfcCng2dn2YotImLlP2KTayNLasgKZoJbmqt34hL4KFRFGLdOReT6PFYqwctKYdCyaqQUD6pRRDdrppyTYNThA7oncAvwXkydU2FaergSVg2aol9Bxto4EyEzfms9oll605yH1vwI2Am3E3WROBJkPuh03MWx0IdRxkYfVKrYSM2M71+EulTsmwzKseUxmw1X5qh0FkaQjR5WLPSD1/mR6rGcUmEGeBueEXfC0Cx3CHJlinJmUG6fE1vesKKmdW8Ax+kQ+3jG3MRHxg8ZPW9gKj6Vapk8i2MKhOgyed2UvAg9DjhOe5cYrWxyEVw/7hsKN79yJgbZOFnSG2Gux9ConsgVgmwLWEBxjzooIJnSdL6gNjTt1UpmiOkJGDIrt6A/nl1MKx7cMi6yJgyFX0eKkpqFIjqCuqVQ0SIkI4q4IBwFbR+IpQUCaGmKqCnLXuGgBG+GfkHpniq4ki7KG7x3cQhkwmrB958FAlHbMqJikGqgPsmAqPb97znzj0jgUKGC+72GfUhKtRRjJ9H5MVAaFwqbwaw4Enkm1EGGAiTH7EpHDmayja4DBWiqswgYccBuA5azSCPvwXt1p0KThZDJqZZeQVOSv3BTd6Z6PT7+/31t77wivfWyjWv6ttx46ffvsdYT3JuZvzZ2e4dfWXbdxEDJPvRiVA26HpRgD0Hn0he1C/bapn4DHg+lhHXLVmq5SEmkoXVHlIyUWJV5zhokcdgIqAGQoAtck+EmcTZtO+IYCn0pq4Sb1Qe6YHRl7uTfPY+mcIoJ9sjT0QlOVWDrwR0xL2Ayco0qhL8kex3RnQfWlJDEfpSDF6PTEAqGfExmVUEBOSu1ZDyAgsNpqXqRHptpaUWMbaRVpc3INoXqR1F1q6qowRqIQ6qqKCikAxFn61IvlKiEi3Je9v/2FClJhDWKFgoHbdWsSmjCiH0t1/vrVOcwPnV/7mv+l82tf84fO8Xa283NncA2B08QhFiCD6lxDsclAEjXI0WKmjJum03obIwO3WaJ7o/oSFoRuqQcZGQsqtzRqW1JOUjJI0dDKeKRFQZxTfm5VAknOqnc+6eGJ11vD3R1R7eZXGW6ODv8SKzARGJv0o8bJn2mE1a9pNvPmYw0nun03wJKAykMXwcY7EdBUM+6QE/UIQdQPUMOmWFYazBrRHCBkJbTCaS2/aa2o/rTXKPu2g0m3R30ZH7O/3BlJiHRVcd3tbhl7LiUnZFwqM41NzdIps2JWdPQjTxujemGqAKPWpwNgMZTKSPHgGnmhPnzKQq1AayusA47Icxhs4kBnZE0mh9W7AvRredaD61U2+avksfwVOPc0ILikPsICcUN9vYuh0PdlJRsCMnylKEA2mFEnvAFfoSYYBqgg4Ykz+GlrPFCHjP2TMqsuIM6vjVaPt6LtwWslWTd7v/F04Revw4e7GLTb6k1LxoqI4494RrpUXykXS9ETUIlEpcuVkhHq3/NTEXqv5mt1+gZNJIA7VXS+9pn5kYiIP/x+QkGeSjsOg27wEikHlNFwaHNK5tL0l48WfVKNg2p37GgpMpYapZZRJNulJ0FDvNYm0ZQnx0Nc+wu0ETx6fHFPlWbmimacKMMNoKNeGsEmN2BNSYnVpGzH0PNFqF354gdHXI9KXKoS8w4GDF1rImEiOgeZmIgDXbJrI3eEbXlTiUx3RGKPRyT2RyQuLVxAIoNHSqr3qGCh+PSoQLOmAORUv5R0ddup1UYcbxVdf6/oNHH8QQfjavq51AcSK5FQU/UKjJQSWogg3xoBieUWmfUBGoY/ODOP+xcT9/OpskStoUa7oAyKZh4h7bs1yd1SbcZr/cVmum5RmV0rTTg7U6vr6WjXEoF6DIwvp0QY7WgwxFqGRbYeDuDKM+eDPsXhlBkLhV+MP6q9zUgEIeWSboXxSi1elpwi7pZwLwWcVt33JPCUcBrR+6m7rdEqTnPo18lDPicK2OY5U1A/hcdP91yhDwSo4C49ZY6YiOwwS5Pmnk7UXKmYinon/s3K7Xsx+sfrdo39E3jOu9if1HFHZ6+S9ERTVvLwo54/0RLgRECQ6YqPW1tqs8tmn1CiTwIE8F9U4UItBNd1VEecslRd6eFyILJc1RqhqZZSeBMVg8Bb6usmt/h7RmH00PpEn0LscDXImN7V0dWPSjc/PHr56YlWzezilDjsTk+0UQYqQpce4nXUBfL4ZnGDwTeFzaGXnVpHwSjntkIQW5CMUuac1JWdkIup2/RhJvN5aj0kWzLOwcHUzIpbD7AaIZErA2yqnXVqBZtGBXXB3Y5CNLkSqEGrH0yrqCD3jGxRVMGpnnyrqZ/qxoWlR5/OzXaOPpVGNKFiWMf9b5hF6L+i1sWsU9pS5Tj5C0ua3zwIVIL1FMcVdNeDVxBUiYMa5p7YprcT25t1ZkT8TATONvWXQRK05Vt3vIJpIzvrc+Q6T73ETt+OXLVktAbNu7wDo0bwSbEvZ3RKCwkA1FPVGouMQsmdE0rDJdDrn8TR82tI7ffXEFV/d7VP0Cz9MUTNQCm61KcPm59z0KxsfxAF8Vd0C2D/CAKtoZMQuXoaQe0DkSL0zy8MgI9J92CiPXkNGp28PnTSvNJJqoq+esyuZWo7P9RH9cRUweuUnUPTWuT1dgDfcQjsx7p0cQX2a7u66RZQBmLJcpABBNyU/BBFa/iKbjaI8+NY0Qo2gAHpYqJ/DsqmOi3rbwQpHhD0Sw+VtMRa88l8BOMyb8+RxOseO+3bgucogR8dbAHs1fwXvLfmW/4KAEgAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQflBBcOBS2AJWxNAAACvUlEQVRIx62Wz0sUYRjHP+/sMM5ctkVkN69C5MFDKlYHDyGUJpQH8R+IThHEgsiIFC+FoCtIQbcOdcg/oMAfq+GlU0VEekq8ybIlHlZRdtjdmadD65Lur8l8bvN+n/k+7/d93nm+o2gSWutoS0vLTaXUZeBiefmnUmorn8+vaq0PGr2v6gGpVOpKEAQauA1YddIKIrIC6MnJyW+hCmitbcdxXojIfcAgXATAa8/zHmqtvboF5ubm4r7vvwOuc7b47Pv+3ampqV9VBebn551CofAR6OX/4pPneTeOlVSOoFgsPj8HcoBrtm2/PKEglUr1BEHwJcyZJxIJDg8POTo6ataTHtd1vxsAQRA8CUPe2dnJyMgIY2NjxOPxRqkG8AxAaa2jtm3vAi3NCnR3d9PX1/fnfhYKLC0tsbu7Wy+9AMQNx3FuhSEH2NjYYGdnBwDLshgeHm6kxAIGTeBSLbS1tZVYLFa1vr29TVtbG47jVIrUU6KUumSKSPtpIBaLMTo6ilKqqSrLshgaGmJhYQHf909gItJuiEgVi2maocgrHTWMmvkiokylVPY0sLe3x+LiItFotJZsent7cRwHAN/3WVtbo1Qq1crNmkqpLRGpAjOZDJlMpmqnAwMDFfJSqcTy8jLZbLaeuC3DsqwPQDHMUXR1ddHR0VHZeTqdbkReANJGMpnMichymALHSn3fZ2VlpUrhqdxV13X3zfLzU+BOI38A2Nzc5ODggP39fXK5XMNREYlEHp+YprOzs6/KHnAe8dp13Xsnpmk+n38EfD0H8s+e5z2oaTjT09OJSCTyHrh6RvIvhmHcnZiY+Hm8EPkbXV9fP+rv739rmmY7cKVZT/7uKfDGsqyx8fHxXFjT7ymb/mAD0y+KSLps+l//6a/iOGZmZi4opW6KSKeIJMpf6C8R+WHb9loymWx4nX4DbrcWDzBN2ccAAAAASUVORK5CYII"},{ name : "haxeui-core/styles/default/tooltips.css", data : "LnRvb2x0aXAgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZjg7DQogICAgYm9yZGVyOiAxcHggc29saWQgI0FCQUJBQjsNCiAgICBmaWx0ZXI6IGRyb3Atc2hhZG93KDEsIDQ1LCAjMDAwMDAwLCAwLjA1LCA2LCAxLCAzMCwgMzUsIGZhbHNlKTsNCiAgICBib3JkZXItcmFkaXVzOiAycHg7DQogICAgcGFkZGluZzogNHB4IDVweDsNCiAgICBtYXJnaW4tbGVmdDogMHB4Ow0KICAgIG1hcmdpbi10b3A6IDMwcHg7DQp9DQo"},{ name : "haxeui-core/styles/default/blank.png", data : "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QIKDCIwjMBeawAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAHElEQVQ4y2P8//8/AyWAiYFCMGrAqAGjBgwWAwBjmgMd7D3zQQAAAABJRU5ErkJggg"},{ name : "haxeui-core/styles/default/up_arrow_white.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAIAAADNpLIqAAAABnRSTlMA7QAcACSX3bo6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAK0lEQVQImWN8K6PCwMDAwMAg9Pj2O1lVCJsJLgQnoaJwDpzN+P//fwYMAADCtw5xBtAKnQAAAABJRU5ErkJggg"},{ name : "haxeui-core/styles/dark/tiny-close-button.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAEZXpUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjarVdr0uMoDPyvU+wRECAQx8HYVO0N9vjbPGLH5LHfzGxIDJaFJLoluULHP39X+gsfa1jJS9SQQjD4+OSTzVioGZ8xs/H9+ixr9zc5nQ9g1jjMbtyGY+pnyOXaEP2Ub3c5xTLt6DT08DwNuubZYjH1dBpydsh53lOa+7J/Cn3+6iPaOKb13keAsQvsOUv2cOwMrtq8uPZjlzG3q3UBSsYlrKVfrUvvsaNzuYB3rhbsTJ5yd4eCTJgKYcFoylneY9cReo6IL8+3B2U7XbxiV3et9Rinyz4AqUDzUI+j9BUUN0Dp+raAEfETrGMfCUNxxALGdrC5YRTixBZoV/a8c+bKR58LF4To7WEjZmsLOGgyddEmWzoZvg2uNoKGnZyCiQLWHMT2jIW739T9FVZ43hmalmGMseNl0Dvh74zTUK0tdZmNnlghLttyGmE05toVWiCE68RUOr590FPemCdiHRiUDrPigNlsw8QmfOWW6zw76InxZEZpcNynAUAE34Jg2IEBE9gJBzbR2sgMHBX8ZERunbcbGGARuzNVcONQCdGqbb6xJ3LXtWKHGK0FRIgLLoIaFArI8l6QP9ErciiLE08iEiSKSpIcXPBBQggxtB6Vo4s+SgwxRo0pZnXqVTRoVNWkOdnk0MIkhRQpaUopZzjNMJ2xO0Mj581ubvObbGGLm25pywXpU3yREkosWlLJu93djvLfwx5p1z3t+eADqXT4Q45wxEOPdOSKXKuu+io11Fi1pppP1iard9Z4Ye47azxZa4z5rhcv1iCO8WGCWzuRxhkYs57BeGwMIKFt48woe28bc40zkyyKQixYY2nk7NwYA4P+YCuVT+4u5r7yRuJ/iTf7iTlq1P0fzFGjbjL3ytsb1vbc3yiuE9SqsGFqXEVjO9BlMr4Z7acvjJE22aSoFI+vaU2nL1tZTdkyk/nwwFxGAF83gnWTiHnMXi9dum/eugYqt4ekpp21LzNyacrez/TpQTOyjWVW8zjznNNDh0MXeGvovruNscVPmE5BTe7oy3QpPc00lPIDcPPq6+Yqablb8X7gQidAbQwo7RCUUxBLqn2JJF7wPmeKexhrWSG3vBBYwpPlfVg+M4TesYvCayv1i8Cc4IQhKCeVTO+hUH7JRa/5G7+0EjyT+nIui2WzD410j5eeTzBn+5KOiT+CfIJ94vcA3a0l93IU1iW4lhL0yLa5O5nvlfBxpqsSUrIrS2sBl5W1KyGoZF4y4lfnkUB0zyCXl2zgtaxeYxmh0J/HMkKhP49lhEI/9p1mwenqaSQ8XR3DnEnnhiDIf5Xxlf+V0uNM8vvRPBXtn0XTgqF7NI2HffH+sy5MX9rwvQuH6+UzYsRL8umgrWcHtzZqvxzjB22YvvXhLx3h6gBpaBDrd1DF2x+9LemHzQI9goeRku7P8O9o1tqnricLwW2pH1kh84muJ9oGBdsF1GyCJyz4a0E7eiL9C50ommlvGMFPAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH5QEaCDsd2T5sgwAAALJJREFUGNNdi7FKw2AYRc/98j7O1oIuikM1ISk6CAVfwidShIJJ++dvQejS4uTs2wjmuhgonvGec9Wl/ATx1VSzd45YrzfXg3wSlj/E8NymzexIXlp+KYhP/Q1nllcED/rRt+U3y/dNWR40vtqUpqHIGDFQ1/XtHiDGoHBhIf4TAF3OE8sry3eySoJl1/cXAGr7/jSsPKDHeXWzBehSuhLxKquJsM5NLEYJ0FTVzsTC8uQXPKRNkQsV0ywAAAAASUVORK5CYII"},{ name : "haxeui-core/styles/default/dialogs/information-small.png", data : "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABJlBMVEUAAAB7e4CdnZ0REREzMzNUVFQ/Pz8lJSVRUVGmprLIyMg6Oj0LCwtQUFJqampycnILCws+Pj5CQkJVVVU6OjpFRUUmJiZVVVVRUVFISEhOTk4NDQ1UVFSqqqyfn6K/v76zs7IsWdUqVMj////a2utGaM4wVL8nTr3m5ubj4+NfgeFbfd9NcNXMzMwrVcvBwcIlSbMlSLAjRa1zlvTt7e1nievq6uowYuXW1uQxYOHg4N/c3NvQ0NtXedtQctijsNfW1tbPz9B1jNDNzc1LbM1eectBY8qVoshadciJlsYoUMKJlsBlfMA7W7xddLk3V7kmS7kfRrZEX7NOZK08V6wSM5Tu7u5ukO5sju3Y2NgzX9hSdNXOztRMbtHJydA+ZM8+YMMqUL/uhb8yAAAAIXRSTlMArqJRRz0YCQfc0pKHhnx4dG5sY2FcXFVNQj8dFdfX1NTah6qMAAAA7ElEQVQY0yXI02LEUBSF4R2ObRQnaeyMbVs13/8l2tP5rtb6ASsymUQiwxThystE/FVZrvojjPf/Z0m5NxyPhz2FzOKSJ5uTzlOp9NyZtMg8ABtuztWKzvN6RZu/hFnI3c3e1K7A80JX+5jd5yDVWquCMHVcx3W/10YK4oONNhVtY+TYtrix4hAzdvqPtB/195Ik7qwYJAfbL45b9pUlx3FbKwn0zUp8RaZSNhGSVrc0sKH3o9lA5UfU4I6fIRaAJtrnA6rV0OHcJmgA8KSJ+uJ0uZwWdSLtAVyogO/hjy9A4Y8VqGgwGKUKeP8C2jElNUboO20AAAAASUVORK5CYII"},{ name : "haxeui-core/styles/default/haxeui.png", data : "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"},{ name : "haxeui-core/styles/dark/up_arrow.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAIAAADNpLIqAAAABnRSTlMA7QAcACSX3bo6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAK0lEQVQImWN8K6PCwMDAwMBwfMYEy4wCCJsJLgQnoaJwDpzNuGXLFgYMAADK0A4MJuH53gAAAABJRU5ErkJggg"},{ name : "haxeui-core/styles/default/down_arrow_square.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAIAAABLMMCEAAAABnRSTlMA7QAcACSX3bo6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAMUlEQVQImWN8K6PCgAGYMIUYGBhYkk10sKide+YKmtDcM1eYIBSyEMJcCAcuzYjVDQAFcxCadfC9sQAAAABJRU5ErkJggg"},{ name : "haxeui-core/styles/dark/progressbars.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogUFJPR1JFU1MNCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovDQpAa2V5ZnJhbWVzIGluZGV0ZXJtaW5hdGUgew0KICAgIDAlIHsNCiAgICAgICAgc3RhcnQ6IDA7DQogICAgICAgIGVuZDogMjU7DQogICAgfQ0KICAgIDUwJSB7DQogICAgICAgIHN0YXJ0OiA3NTsNCiAgICAgICAgZW5kOiAxMDA7DQogICAgfQ0KICAgIDEwMCUgew0KICAgICAgICBzdGFydDogMDsNCiAgICAgICAgZW5kOiAyNTsNCiAgICB9DQp9DQoNCi5wcm9ncmVzczppbmRldGVybWluYXRlIHsNCiAgICBhbmltYXRpb246IGluZGV0ZXJtaW5hdGUgMXMgZWFzZSAwcyBpbmZpbml0ZTsNCn0NCg0KLnByb2dyZXNzLXZhbHVlIHsNCiAgICBib3JkZXI6IG5vbmU7DQogICAgYm9yZGVyLXJhZGl1czogMXB4Ow0KfQ0KDQouaG9yaXpvbnRhbC1wcm9ncmVzcyB7DQogICAgYmFja2dyb3VuZDogIzI1MjcyOCAjMjUyNzI4IHZlcnRpY2FsOw0KICAgIGluaXRpYWwtd2lkdGg6IDE1MHB4Ow0KICAgIGluaXRpYWwtaGVpZ2h0OiA4cHg7DQp9DQoNCi5ob3Jpem9udGFsLXByb2dyZXNzIC5wcm9ncmVzcy12YWx1ZSB7DQogICAgYmFja2dyb3VuZDogIzQxNTk4MiAjMmYzNzQ2IHZlcnRpY2FsOw0KICAgIGhlaWdodDogMTAwJTsNCn0NCg0KLnZlcnRpY2FsLXByb2dyZXNzIHsNCiAgICBiYWNrZ3JvdW5kOiAjMjUyNzI4ICMyNTI3MjggaG9yaXpvbnRhbDsNCiAgICBpbml0aWFsLXdpZHRoOiA4cHg7DQogICAgaW5pdGlhbC1oZWlnaHQ6IDE1MHB4Ow0KfQ0KDQoudmVydGljYWwtcHJvZ3Jlc3MgLnByb2dyZXNzLXZhbHVlIHsNCiAgICBiYWNrZ3JvdW5kOiAjNDE1OTgyICMyZjM3NDYgaG9yaXpvbnRhbDsNCiAgICB3aWR0aDogMTAwJTsNCn0NCg0K"},{ name : "haxeui-core/styles/dark/propertygrids.css", data : "LnByb3BlcnR5LWdyaWQgew0KfQ0KDQoucHJvcGVydHktZ3JpZCAuc2Nyb2xsdmlldy1jb250ZW50cyB7DQogICAgcGFkZGluZzogMDsNCiAgICB3aWR0aDogMTAwJTsNCiAgICBzcGFjaW5nOiAwOw0KfQ0KDQoucHJvcGVydHktZ3JvdXAgew0KICAgIHdpZHRoOiAxMDAlOw0KICAgIHNwYWNpbmc6IDA7DQp9DQoNCi5wcm9wZXJ0eS1ncm91cC1oZWFkZXIgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICMzRDNGNDE7DQogICAgcG9pbnRlci1ldmVudHM6IHRydWU7DQogICAgd2lkdGg6IDEwMCU7DQogICAgcGFkZGluZzogNXB4Ow0KICAgIGJvcmRlci1jb2xvcjogIzE4MWExYjsNCiAgICBib3JkZXItYm90dG9tLXdpZHRoOiAxcHg7DQogICAgYm9yZGVyLWJvdHRvbS1zaXplOiAxcHg7DQogICAgY3Vyc29yOiBwb2ludGVyOw0KfQ0KDQoucHJvcGVydHktZ3JvdXAtaGVhZGVyLnNjcm9sbGluZyB7DQogICAgYm9yZGVyLXJpZ2h0LXdpZHRoOiAxcHg7DQogICAgYm9yZGVyLXJpZ2h0LXNpemU6IDFweDsNCn0NCg0KLnByb3BlcnR5LWdyb3VwLWhlYWRlcjpob3ZlciB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogIzQzNDY0NzsNCn0NCg0KLnByb3BlcnR5LWdyb3VwLWhlYWRlci1pY29uIHsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyOw0KfQ0KDQoucHJvcGVydHktZ3JvdXAtaGVhZGVyOmV4cGFuZGVkIC5wcm9wZXJ0eS1ncm91cC1oZWFkZXItaWNvbiB7DQogICAgcmVzb3VyY2U6ICJoYXhldWktY29yZS9zdHlsZXMvZGFyay9kb3duX2Fycm93X3NxdWFyZS5wbmciOw0KfQ0KDQoucHJvcGVydHktZ3JvdXAtaGVhZGVyOmNvbGxhcHNlZCAucHJvcGVydHktZ3JvdXAtaGVhZGVyLWljb24gew0KICAgIHJlc291cmNlOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RhcmsvcmlnaHRfYXJyb3dfc3F1YXJlLnBuZyI7DQp9DQoNCi5wcm9wZXJ0eS1ncm91cC1oZWFkZXItbGFiZWwgew0KfQ0KDQoucHJvcGVydHktZ3JvdXAtY29udGVudHMgew0KICAgIHdpZHRoOiAxMDAlOw0KICAgIHNwYWNpbmc6IDE7DQogICAgYmFja2dyb3VuZC1jb2xvcjogIzE4MWExYjsNCiAgICBwYWRkaW5nLWJvdHRvbTogMXB4Ow0KfQ0KDQoucHJvcGVydHktZ3JvdXAtaXRlbS1sYWJlbC1jb250YWluZXIgew0KICAgIHdpZHRoOiA1MCU7DQogICAgYmFja2dyb3VuZC1jb2xvcjogIzI1MjcyODsNCiAgICBoZWlnaHQ6IDEwMCU7DQogICAgcGFkZGluZy1sZWZ0OiA1cHg7DQp9DQoNCi5wcm9wZXJ0eS1ncm91cC1pdGVtLWVkaXRvci1jb250YWluZXIgew0KICAgIHdpZHRoOiA1MCU7DQogICAgYmFja2dyb3VuZC1jb2xvcjogIzI1MjcyODsNCn0gICAgICAgIA0KDQoucHJvcGVydHktZ3JvdXAtaXRlbS1sYWJlbCB7DQogICAgdmVydGljYWwtYWxpZ246IGNlbnRlcjsNCn0NCg0KLnByb3BlcnR5LWdyb3VwLWl0ZW0tZWRpdG9yIHsNCiAgICB3aWR0aDogMTAwJTsNCn0NCg0KLnByb3BlcnR5LWdyb3VwIC50ZXh0ZmllbGQgew0KICAgIGJvcmRlcjogbm9uZTsNCiAgICBmaWx0ZXI6IG5vbmU7DQogICAgYm9yZGVyLXJhZGl1czogMDsNCn0NCg0KLnByb3BlcnR5LWdyb3VwIC5jaGVja2JveCB7DQogICAgcGFkZGluZzogNXB4Ow0KICAgIHBhZGRpbmctbGVmdDogNHB4Ow0KfQ0KDQoucHJvcGVydHktZ3JvdXAgLm51bWJlci1zdGVwcGVyIHsNCiAgICBwYWRkaW5nOiAwOw0KfQ0KDQoucHJvcGVydHktZ3JvdXAgLmRyb3Bkb3duIHsNCiAgICBib3JkZXI6IG5vbmU7DQogICAgYm9yZGVyLXJhZGl1czogbm9uZTsNCn0NCg"},{ name : "haxeui-core/styles/dark/ranges.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogUkFOR0UNCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovDQoucmFuZ2Ugew0KICAgIGJvcmRlcjogMXB4IHNvbGlkICMxODFhMWI7DQogICAgcGFkZGluZzogMXB4Ow0KICAgIGJvcmRlci1yYWRpdXM6IDJweDsNCiAgICBmaWx0ZXI6IGRyb3Atc2hhZG93KDEsIDQ1LCAjMDAwMDAwLCAwLjIsIDIsIDIsIDEsIDMsIHRydWUpOw0KfQ0KDQoucmFuZ2UtdmFsdWUgew0KICAgIGJvcmRlcjogbm9uZTsNCiAgICBib3JkZXItcmFkaXVzOiAycHg7DQp9DQoNCi5ob3Jpem9udGFsLXJhbmdlIHsNCiAgICBiYWNrZ3JvdW5kOiAjMjUyNzI4ICMyNTI3MjggdmVydGljYWw7DQogICAgaW5pdGlhbC13aWR0aDogMTUwcHg7DQogICAgaW5pdGlhbC1oZWlnaHQ6IDhweDsNCn0gICAgDQoNCi5ob3Jpem9udGFsLXJhbmdlIC5yYW5nZS12YWx1ZSB7DQogICAgYmFja2dyb3VuZDogIzQxNTk4MiAjMmYzNzQ2IHZlcnRpY2FsOw0KICAgIGhlaWdodDogMTAwJTsNCn0NCg0KLnZlcnRpY2FsLXJhbmdlIHsNCiAgICBiYWNrZ3JvdW5kOiAjMjUyNzI4ICMyNTI3MjggaG9yaXpvbnRhbDsNCiAgICBpbml0aWFsLXdpZHRoOiA4cHg7DQogICAgaW5pdGlhbC1oZWlnaHQ6IDE1MHB4Ow0KfQ0KDQoudmVydGljYWwtcmFuZ2UgLnJhbmdlLXZhbHVlIHsNCiAgICBiYWNrZ3JvdW5kOiAjNDE1OTgyICMyZjM3NDYgaG9yaXpvbnRhbDsNCiAgICB3aWR0aDogMTAwJTsNCn0NCg"},{ name : "haxeui-core/styles/default/main.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogR0VORVJBTA0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi5jb21wb25lbnQgew0KfQ0KDQouY3VzdG9tLWNvbXBvbmVudCB7DQogICAgd2lkdGg6IGF1dG87DQogICAgaGVpZ2h0OiBhdXRvOw0KfQ0KDQoubW9kYWwtYmFja2dyb3VuZCB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7DQogICAgb3BhY2l0eTogMC43NTsNCn0NCg0KLm1vZGFsLWNvbXBvbmVudCB7DQogICAgZmlsdGVyOiBibHVyKDEpOw0KfQ0KDQoucG9wdXAgew0KICAgIGZpbHRlcjogZHJvcC1zaGFkb3coMiwgNDUsICMwMDAwMDAsIDAuMTUsIDYsIDEsIDMwLCAzNSwgZmFsc2UpOw0KfQ0KDQpAa2V5ZnJhbWVzIGFuaW1hdGlvbkZhZGVJbiB7DQogICAgMCUgew0KICAgICAgICBvcGFjaXR5OiAwOw0KICAgIH0NCiAgICAxMDAlIHsNCiAgICAgICAgb3BhY2l0eTogMTsNCiAgICB9DQp9DQoNCi5mYWRlLWluIHsNCiAgICBhbmltYXRpb246IGFuaW1hdGlvbkZhZGVJbiAwLjFzIGxpbmVhciAwcyAxOw0KfQ0KDQouZmFkZS1vdXQgew0KICAgIGFuaW1hdGlvbjogYW5pbWF0aW9uRmFkZUluIDAuMXMgbGluZWFyIDBzIDEgcmV2ZXJzZTsNCn0NCg0KLmRlZmF1bHQtYmFja2dyb3VuZCB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7DQp9DQoNCi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCioqIENPTlRBSU5FUlMNCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovDQouYm94LCAudmJveCwgLmhib3gsIC5hYnNvbHV0ZSwgLmNvbnRpbnVvdXNoYm94LCAuaGdyaWQsIC52Z3JpZCwgLmdyaWQgew0KICAgIHNwYWNpbmc6IDVweCA1cHg7DQp9DQoNCi5ib3gsIC52Ym94LCAuaGJveCwgLmNvbnRpbnVvdXNoYm94LCAuaGdyaWQsIC52Z3JpZCwgLmdyaWQgew0KICAgIHdpZHRoOiBhdXRvOw0KICAgIGhlaWdodDogYXV0bzsNCn0NCg0KLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogTEFCRUwNCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovDQoubGFiZWwgew0KICAgIHdpZHRoOiBhdXRvOw0KICAgIGhlaWdodDogYXV0bzsNCiAgICBjb250ZW50LXR5cGU6IGF1dG87DQogICAgY29sb3I6IGJsYWNrOw0KfQ0KICAgIA0KLmxhYmVsOmRpc2FibGVkIHsNCiAgICBjb2xvcjogIzkwOTA5MDsNCn0NCg0KLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogTElOSw0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi5saW5rIHsNCiAgICBjb2xvcjogIzQwN2RiZjsNCiAgICBmb250LXVuZGVybGluZTogdHJ1ZTsNCiAgICBjdXJzb3I6IHBvaW50ZXI7DQogICAgcG9pbnRlci1ldmVudHM6IHRydWU7DQp9DQoNCi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCioqIElNQUdFDQoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLw0KLmltYWdlIHsNCiAgICB3aWR0aDogYXV0bzsNCiAgICBoZWlnaHQ6IGF1dG87DQp9DQoNCi5pbWFnZTpkaXNhYmxlZCB7DQogICAgZmlsdGVyOiBncmF5c2NhbGU7DQp9DQoNCi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCioqIERSQUcgJiBEUk9QDQoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLw0KLmRyYWdnYWJsZSB7DQogICAgY3Vyc29yOiBtb3ZlOw0KfQ0KDQouZHJhZ2dpbmcgew0KfQ0KDQovKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqDQoqKiBJVEVNIFJFTkRFUkVSUw0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi5iYXNpY2l0ZW1yZW5kZXJlciB7DQogICAgd2lkdGg6IDEwMCU7DQp9DQoNCi5iYXNpYy1yZW5kZXJlci1jb250YWluZXIgew0KICAgIHdpZHRoOiAxMDAlOw0KfQ0KDQouYmFzaWMtcmVuZGVyZXItbGFiZWwgew0KICAgIHdpZHRoOiAxMDAlOw0KfQ"},{ name : "haxeui-core/styles/default/right_arrow.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAIAAACgB3uHAAAABnRSTlMA7QAcACSX3bo6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAL0lEQVQImWMMCAiYe+YKAwMDAwMDEwMDQ7KJDoID50M5ED6CM/fMFSY4C6oMbhoAEcwMOy/jUHEAAAAASUVORK5CYII"},{ name : "haxeui-core/styles/dark/right_arrow_white.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAIAAACgB3uHAAAABnRSTlMA7QAcACSX3bo6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAM0lEQVQImWP8////O1lVBgYGBgYGJgYGBqHHtxEcOJ/x////DDDABGe9k1VlgrOgMnDTADWiDmfiE8U7AAAAAElFTkSuQmCC"},{ name : "haxeui-core/styles/dark/accordion.css", data : "LmFjY29yZGlvbiB7DQogICAgYm9yZGVyOiAxcHggc29saWQgI2FiYWJhYjsNCiAgICBzcGFjaW5nOiAwOw0KICAgIHBhZGRpbmc6IDFweDsNCiAgICBwYWRkaW5nLWJvdHRvbTogMHB4Ow0KICAgIGNsaXA6IHRydWU7DQp9DQoNCi5hY2NvcmRpb24tYnV0dG9uIHsNCiAgICBib3JkZXItcmFkaXVzOiAwOw0KICAgIGJvcmRlcjogMHB4IHNvbGlkICNhYmFiYWI7DQogICAgd2lkdGg6IDEwMCU7DQogICAgdGV4dC1hbGlnbjogbGVmdDsNCiAgICBpY29uOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RlZmF1bHQvcmlnaHRfYXJyb3dfc3F1YXJlLnBuZyI7DQogICAgaWNvbi1wb3NpdGlvbjogbGVmdDsNCiAgICBib3JkZXI6IG5vbmU7DQogICAgYm9yZGVyLWNvbG9yOiAjYWJhYmFiOw0KICAgIGJvcmRlci1ib3R0b20td2lkdGg6IDFweDsNCn0NCg0KLmFjY29yZGlvbi1idXR0b246ZG93biB7DQogICAgaWNvbjogImhheGV1aS1jb3JlL3N0eWxlcy9kZWZhdWx0L2Rvd25fYXJyb3dfc3F1YXJlLnBuZyI7DQp9DQoNCi5hY2NvcmRpb24tcGFnZSB7DQogICAgd2lkdGg6IDEwMCU7DQogICAgY2xpcDogdHJ1ZTsNCiAgICB3aWR0aDogMTAwJTsNCiAgICBib3JkZXItY29sb3I6ICNhYmFiYWI7DQogICAgYm9yZGVyLWJvdHRvbS13aWR0aDogMXB4Ow0KICAgIG9wYWNpdHk6IDE7DQogICAgcGFkZGluZzogNXB4Ow0KfQ0KDQouYWNjb3JkaW9uLXBhZ2U6ZXhwYW5kZWQgew0KICAgIGFuaW1hdGlvbjogYWNjb3JkaW9uQW5pbWF0ZUV4cGFuZCAwLjNzIGVhc2UgMHMgMTsNCn0NCg0KLmFjY29yZGlvbi1wYWdlOmNvbGxhcHNlZCB7DQogICAgYW5pbWF0aW9uOiBhY2NvcmRpb25BbmltYXRlQ29sbHBhc2UgMC4zcyBlYXNlIDBzIDE7DQp9DQoNCkBrZXlmcmFtZXMgYWNjb3JkaW9uQW5pbWF0ZUV4cGFuZCB7DQogICAgMCUgew0KICAgICAgICBvcGFjaXR5OiAwOw0KICAgICAgICBoZWlnaHQ6IDAlOw0KICAgIH0NCiAgICAxMDAlIHsNCiAgICAgICAgb3BhY2l0eTogMTsNCiAgICAgICAgaGVpZ2h0OiAxMDAlOw0KICAgIH0NCn0NCg0KQGtleWZyYW1lcyBhY2NvcmRpb25BbmltYXRlQ29sbHBhc2Ugew0KICAgIDAlIHsNCiAgICAgICAgb3BhY2l0eTogMTsNCiAgICAgICAgaGVpZ2h0OiAxMDAlOw0KICAgIH0NCiAgICAxMDAlIHsNCiAgICAgICAgb3BhY2l0eTogMDsNCiAgICAgICAgaGVpZ2h0OiAwJTsNCiAgICB9DQp9DQoNCi5hY2NvcmRpb24tcGFnZSAuc2Nyb2xsdmlldyB7DQogICAgYm9yZGVyOiBub25lOw0KICAgIHBhZGRpbmctdG9wOiAwOw0KICAgIHBhZGRpbmctcmlnaHQ6IDA7DQogICAgcGFkZGluZy1sZWZ0OiAwOw0KICAgIHBhZGRpbmctYm90dG9tOiAwOw0KfQ0K"},{ name : "haxeui-core/styles/dark/switches.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogU1dJVENIIChERUZBVUxUKQ0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi5zd2l0Y2gtYnV0dG9uLXN1YiB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogIzI1MjcyODsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjMTgxYTFiOw0KICAgIGZpbHRlcjogZHJvcC1zaGFkb3coMSwgNDUsICMwMDAwMDAsIDAuMiwgMiwgMiwgMSwgMywgdHJ1ZSk7DQp9DQoNCkBrZXlmcmFtZXMgc3dpdGNoQW5pbWF0ZVNlbGVjdGVkIHsNCiAgICAwJSB7DQogICAgICAgIHBvczogMDsNCiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzI1MjcyODsNCiAgICB9DQogICAgMTAwJSB7DQogICAgICAgIHBvczogMTAwOw0KICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDE1OTgyOw0KICAgIH0NCn0NCg"},{ name : "haxeui-core/styles/dark/textinputs.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogVEVYVCBGSUVMRA0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi50ZXh0ZmllbGQgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICMyNTI3Mjg7DQogICAgY29sb3I6ICNiNGI0YjQ7DQogICAgYm9yZGVyOiAxcHggc29saWQgIzE4MWExYjsNCiAgICBib3JkZXItcmFkaXVzOiAycHg7DQogICAgcGFkZGluZzogNXB4IDVweDsNCiAgICBmaWx0ZXI6IGRyb3Atc2hhZG93KDEsIDQ1LCAjMDAwMDAwLCAwLjIsIDIsIDIsIDEsIDMsIHRydWUpOw0KICAgIGluaXRpYWwtd2lkdGg6IDE1MHB4Ow0KICAgIGhlaWdodDogYXV0bzsNCiAgICBzcGFjaW5nOiA1cHg7DQogICAgaWNvbi1wb3NpdGlvbjogcmlnaHQ7DQp9DQoNCi50ZXh0ZmllbGQ6YWN0aXZlIHsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjNDE1OTgyOw0KfQ0KDQoudGV4dGZpZWxkOmVtcHR5IHsNCiAgICBjb2xvcjogIzQ0NDQ0NDsNCn0NCg0KLnRleHRmaWVsZDpkaXNhYmxlZCB7DQogICAgY29sb3I6ICM1OTU5NTk7DQogICAgYmFja2dyb3VuZDogIzJjMmYzMCAjMmMyZjMwIHZlcnRpY2FsOw0KfQ0KDQovKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqDQoqKiBURVhUIEFSRUENCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovDQoudGV4dGFyZWEgew0KICAgIGNvbG9yOiAjYjRiNGI0Ow0KICAgIGJvcmRlcjogMXB4IHNvbGlkICMxODFhMWI7DQogICAgYm9yZGVyLXJhZGl1czogMnB4Ow0KICAgIHBhZGRpbmc6IDFweDsNCiAgICBmaWx0ZXI6IGRyb3Atc2hhZG93KDEsIDQ1LCAjMDAwMDAwLCAwLjIsIDIsIDIsIDEsIDMsIHRydWUpOw0KICAgIGJhY2tncm91bmQtY29sb3I6ICMyNTI3Mjg7DQogICAgaW5pdGlhbC13aWR0aDogMTUwcHg7DQogICAgaW5pdGlhbC1oZWlnaHQ6IDEwMHB4Ow0KfQ0KDQoudGV4dGFyZWE6YWN0aXZlIHsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjNDE1OTgyOw0KfQ0KDQoudGV4dGFyZWE6ZW1wdHkgew0KICAgIGNvbG9yOiAjNDQ0NDQ0Ow0KfQ0KDQoudGV4dGFyZWE6ZGlzYWJsZWQgew0KICAgIGNvbG9yOiAjNTk1OTU5Ow0KICAgIGJhY2tncm91bmQ6ICMyYzJmMzAgIzJjMmYzMCB2ZXJ0aWNhbDsNCn0NCg"},{ name : "haxeui-core/styles/dark/down_arrow_square.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAIAAABLMMCEAAAABnRSTlMA7QAcACSX3bo6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAMUlEQVQImWN8K6PCgAGYMIUYGBgYt2zZgkWtZUYBmpBlRgEThEIWQpgL4cClGbG6AQAStwro4kB3hAAAAABJRU5ErkJggg"},{ name : "haxeui-core/styles/default/sidebars.css", data : "LnNpZGViYXItbW9kYWwtYmFja2dyb3VuZCB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7DQogICAgb3BhY2l0eTogMC42MDsNCn0NCg0KLnNpZGViYXIgew0KICAgIG1hcmdpbjogNTBweDsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRUVFRUVFOw0KICAgIHBhZGRpbmc6IDVweDsNCiAgICBmaWx0ZXI6IGRyb3Atc2hhZG93KDEsIDQ1LCAjMDAwMDAwLCAwLjEsIDMwLCAyLCAxLCAzLCBmYWxzZSk7DQp9DQogICAgDQouc2lkZWJhcjpsZWZ0IHsNCiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjQUJBQkFCOw0KfQ0KDQouc2lkZWJhcjpyaWdodCB7DQogICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjQUJBQkFCOw0KfQ0KDQouc2lkZWJhcjp0b3Agew0KICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjQUJBQkFCOw0KfQ0KDQouc2lkZWJhcjpib3R0b20gew0KICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjQUJBQkFCOw0KfQ0KDQoNCi5zaWRlYmFyOmxlZnQgI2Nsb3NlU2lkZUJhciB7DQogICAgcmVzb3VyY2U6ICJoYXhldWktY29yZS9zdHlsZXMvZGVmYXVsdC9sZWZ0X2Fycm93X2NpcmNsZWQucG5nICI7DQogICAgY3Vyc29yOiBwb2ludGVyOw0KfQ0KDQouc2lkZWJhcjpyaWdodCAjY2xvc2VTaWRlQmFyIHsNCiAgICByZXNvdXJjZTogImhheGV1aS1jb3JlL3N0eWxlcy9kZWZhdWx0L3JpZ2h0X2Fycm93X2NpcmNsZWQucG5nICI7DQogICAgY3Vyc29yOiBwb2ludGVyOw0KfQ0KDQouc2lkZWJhcjp0b3AgI2Nsb3NlU2lkZUJhciB7DQogICAgcmVzb3VyY2U6ICJoYXhldWktY29yZS9zdHlsZXMvZGVmYXVsdC91cF9hcnJvd19jaXJjbGVkLnBuZyAiOw0KICAgIGN1cnNvcjogcG9pbnRlcjsNCn0NCg0KLnNpZGViYXI6Ym90dG9tICNjbG9zZVNpZGVCYXIgew0KICAgIHJlc291cmNlOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RlZmF1bHQvZG93bl9hcnJvd19jaXJjbGVkLnBuZyAiOw0KICAgIGN1cnNvcjogcG9pbnRlcjsNCn0NCg0KLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovDQovKiBBTklNQVRJT05TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi8NCi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLw0KDQouc2lkZUJhck1vZGlmeUNvbnRlbnQgew0KICAgIGFuaW1hdGlvbjogc2lkZUJhck1vZGlmeUNvbnRlbnQgMC4zcyBlYXNlIDBzIDE7DQp9DQoNCi5zaWRlQmFyUmVzdG9yZUNvbnRlbnQgew0KICAgIGFuaW1hdGlvbjogc2lkZUJhclJlc3RvcmVDb250ZW50IDAuM3MgZWFzZSAwcyAxOw0KfQ0KDQogICAgDQpAa2V5ZnJhbWVzIHNpZGVCYXJNb2RpZnlDb250ZW50IHsNCiAgICAwJSB7DQogICAgfQ0KICAgIDEwMCUgew0KICAgIH0NCn0NCiAgICANCkBrZXlmcmFtZXMgc2lkZUJhclJlc3RvcmVDb250ZW50IHsNCiAgICAwJSB7DQogICAgfQ0KICAgIDEwMCUgew0KICAgIH0NCn0NCiAgICANCi5zaG93U2lkZUJhckxlZnQgew0KICAgIGFuaW1hdGlvbjogc2hvd1NpZGVCYXJMZWZ0IDAuM3MgZWFzZSAwcyAxOw0KfQ0KLmhpZGVTaWRlQmFyTGVmdCB7DQogICAgYW5pbWF0aW9uOiBzaG93U2lkZUJhckxlZnQgMC4zcyBlYXNlIDBzIDEgcmV2ZXJzZSBiYWNrd2FyZHM7DQp9DQogICAgDQpAa2V5ZnJhbWVzIHNob3dTaWRlQmFyTGVmdCB7DQogICAgMCUgew0KICAgIH0NCiAgICAxMDAlIHsNCiAgICB9DQp9DQoNCi5zaG93U2lkZUJhclJpZ2h0IHsNCiAgICBhbmltYXRpb246IHNob3dTaWRlQmFyUmlnaHQgMC4zcyBlYXNlIDBzIDE7DQp9DQoNCi5oaWRlU2lkZUJhclJpZ2h0IHsNCiAgICBhbmltYXRpb246IHNob3dTaWRlQmFyUmlnaHQgMC4zcyBlYXNlIDBzIDEgcmV2ZXJzZSBiYWNrd2FyZHM7DQp9DQogICAgDQpAa2V5ZnJhbWVzIHNob3dTaWRlQmFyUmlnaHQgew0KICAgIDAlIHsNCiAgICB9DQogICAgMTAwJSB7DQogICAgfQ0KfQ0KICAgIA0KLnNob3dTaWRlQmFyVG9wIHsNCiAgICBhbmltYXRpb246IHNob3dTaWRlQmFyVG9wIDAuM3MgZWFzZSAwcyAxOw0KfQ0KLmhpZGVTaWRlQmFyVG9wIHsNCiAgICBhbmltYXRpb246IHNob3dTaWRlQmFyVG9wIDAuM3MgZWFzZSAwcyAxIHJldmVyc2UgYmFja3dhcmRzOw0KfQ0KICAgIA0KQGtleWZyYW1lcyBzaG93U2lkZUJhclRvcCB7DQogICAgMCUgew0KICAgIH0NCiAgICAxMDAlIHsNCiAgICB9DQp9DQogICAgDQouc2hvd1NpZGVCYXJCb3R0b20gew0KICAgIGFuaW1hdGlvbjogc2hvd1NpZGVCYXJCb3R0b20gMC4zcyBlYXNlIDBzIDE7DQp9DQouaGlkZVNpZGVCYXJCb3R0b20gew0KICAgIGFuaW1hdGlvbjogc2hvd1NpZGVCYXJCb3R0b20gMC4zcyBlYXNlIDBzIDEgcmV2ZXJzZSBiYWNrd2FyZHM7DQp9DQogICAgDQpAa2V5ZnJhbWVzIHNob3dTaWRlQmFyQm90dG9tIHsNCiAgICAwJSB7DQogICAgfQ0KICAgIDEwMCUgew0KICAgIH0NCn0NCg"},{ name : "haxeui-core/styles/dark/up_arrow_circled.png", data : "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"},{ name : "haxeui-core/styles/default/dialogs/question.png", data : "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"},{ name : "haxeui-core/styles/default/menus.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogTUVOVUJBUg0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi5tZW51YmFyIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRUVFRUVFOw0KICAgIHBhZGRpbmc6IDVweDsNCiAgICBib3JkZXItYm90dG9tLXdpZHRoOiAxcHg7DQogICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogI0FCQUJBQjsNCiAgICBmaWx0ZXI6IGRyb3Atc2hhZG93KDIsIDQ1LCAjMDAwMDAwLCAwLjE1LCA2LCAxLCAzMCwgMzUsIGZhbHNlKTsNCn0NCg0KLm1lbnViYXItYnV0dG9uIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRUVFRUVFOw0KICAgIGJvcmRlcjogbm9uZTsNCiAgICBjb2xvcjogIzY2NjY2NjsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyOw0KfQ0KDQoubWVudWJhci1idXR0b246aG92ZXIgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICNDQ0NDQ0M7DQogICAgY29sb3I6ICM0NDQ0NDQ7DQp9DQoNCi5tZW51YmFyLWJ1dHRvbjpkb3duIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsNCiAgICBjb2xvcjogYmxhY2s7DQogICAgYm9yZGVyOiAxcHggc29saWQgI0FCQUJBQjsNCiAgICBib3JkZXItYm90dG9tLXdpZHRoOiAwcHg7DQogICAgYm9yZGVyLWJvdHRvbS1zaXplOiAwcHg7DQp9DQoNCi5tZW51YmFyLWJ1dHRvbi1uby1jaGlsZHJlbiB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogI0VFRUVFRTsNCiAgICBib3JkZXI6IG5vbmU7DQogICAgY29sb3I6ICM2NjY2NjY7DQogICAgdmVydGljYWwtYWxpZ246IGNlbnRlcjsNCn0NCg0KLm1lbnViYXItYnV0dG9uLW5vLWNoaWxkcmVuOmhvdmVyIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjQ0NDQ0NDOw0KICAgIGNvbG9yOiAjNDQ0NDQ0Ow0KfQ0KDQoubWVudWJhci1idXR0b24tbm8tY2hpbGRyZW46ZG93biB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7DQogICAgY29sb3I6IGJsYWNrOw0KICAgIGJvcmRlcjogMXB4IHNvbGlkICNBQkFCQUI7DQp9DQoNCi5tZW51YmFyLWJ1dHRvbi1uby1jaGlsZHJlbi1hY3RpdmUgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICNFRUVFRUU7DQogICAgYm9yZGVyOiBub25lOw0KICAgIGNvbG9yOiAjNjY2NjY2Ow0KICAgIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7DQp9DQoNCi5tZW51YmFyLWJ1dHRvbi1uby1jaGlsZHJlbi1hY3RpdmU6aG92ZXIgew0KICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlOw0KICAgIGNvbG9yOiBibGFjazsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjQUJBQkFCOw0KfQ0KDQoubWVudWJhci1idXR0b24tbm8tY2hpbGRyZW4tYWN0aXZlOmRvd24gew0KICAgIGJhY2tncm91bmQtY29sb3I6ICNDQ0NDQ0M7DQogICAgY29sb3I6ICM0NDQ0NDQ7DQogICAgYm9yZGVyOiBub25lOw0KfQ0KDQovKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqDQoqKiBNRU5VDQoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLw0KLm1lbnUgew0KICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlOw0KICAgIHBhZGRpbmc6IDFweDsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjQUJBQkFCOw0KICAgIGZpbHRlcjogZHJvcC1zaGFkb3coMiwgNDUsICMwMDAwMDAsIDAuMTUsIDYsIDEsIDMwLCAzNSwgZmFsc2UpOw0KICAgIHNwYWNpbmc6IDA7DQogICAgd2lkdGg6IDIwMHB4Ow0KfQ0KDQoubWVudS5leHBhbmRlZCB7DQogICAgYm9yZGVyLXRvcC13aWR0aDogMHB4Ow0KICAgIGJvcmRlci10b3Atc2l6ZTogMHB4Ow0KfQ0KDQoubWVudS1maWxsZXIgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICNBQkFCQUI7DQogICAgaGVpZ2h0OiAxcHg7DQp9DQoNCi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCioqIE1FTlVJVEVNUw0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi5tZW51aXRlbSB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7DQogICAgd2lkdGg6IDEwMCU7DQogICAgcGFkZGluZzogNXB4Ow0KICAgIGN1cnNvcjogcG9pbnRlcjsNCn0NCg0KLm1lbnVpdGVtLWxhYmVsLCAubWVudWl0ZW0tY2hlY2tib3gsIC5tZW51aXRlbS1vcHRpb25ib3gsIC5tZW51aXRlbS1zaG9ydGN1dC1sYWJlbCB7DQogICAgdmVydGljYWwtYWxpZ246IGNlbnRlcjsNCn0NCg0KLm1lbnVpdGVtLXNob3J0Y3V0LWxhYmVsIHsNCiAgICB0ZXh0LWFsaWduOiByaWdodDsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyOw0KICAgIGhvcml6b250YWwtYWxpZ246IHJpZ2h0Ow0KfQ0KDQoubWVudWl0ZW0taWNvbiB7DQogICAgdmVydGljYWwtYWxpZ246IGNlbnRlcjsNCn0NCg0KLm1lbnVpdGVtOmhvdmVyLCAubWVudWl0ZW06c2VsZWN0ZWQgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICNkOWU1ZjI7DQp9DQoNCi5tZW51aXRlbSAubGFiZWw6aG92ZXIsIC5tZW51aXRlbSAubGFiZWw6c2VsZWN0ZWQgew0KICAgIGNvbG9yOiAjMjIyMjIyOw0KfQ0KDQoubWVudWl0ZW0tZXhwYW5kYWJsZSB7DQogICAgcmVzb3VyY2U6ICJoYXhldWktY29yZS9zdHlsZXMvZGVmYXVsdC9yaWdodF9hcnJvdy5wbmciOw0KICAgIHZlcnRpY2FsLWFsaWduOiAiY2VudGVyIjsNCn0NCg0KLm1lbnVzZXBhcmF0b3Igew0KICAgIGhlaWdodDogMXB4Ow0KICAgIHdpZHRoOiAxMDAlOw0KICAgIGJhY2tncm91bmQtY29sb3I6ICNBQkFCQUI7DQogICAgaG9yaXpvbnRhbC1hbGlnbjogImNlbnRlciI7DQp9DQo"},{ name : "haxeui-core/styles/dark/left_arrow.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAIAAACgB3uHAAAABnRSTlMA7QAcACSX3bo6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVQImWN8K6PCwMDAwMBwfMYEJjiLgYGBCc5iYGBg3LJlCwMMMFlmFCA4DAwMcD7UAAgfAK7lDFY1UPqoAAAAAElFTkSuQmCC"},{ name : "haxeui-core/styles/default/check.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH5QITChsNaCG5cQAAAS5JREFUKM+NkDFLw1AUhb/3DG0Q6pBOdSgI4tBRsaCTP0EcHeSBEpAQkt2lggiKUGg6WMRVhGziILg4CRUnh+KibiVLl06lmPdcglRsrXe5nMP9uJwj+Md4nrckpVwvFotX1rRj3/fnhBD3QLnX6yGnAVLKU6AMDIGnP4EwDDeMMW4mj6Io6kwEXNedTdP0AhDAi+M4JwATM9i2fQwsAp9a691arTYEsIIgWDXG3Akhbrrd7l4cx2kYhmtaaz9jz5rN5vN3JmPMAuAYY1SpVDpXStla60tAAq/9fv9w9PNMu93uVKvVeSHECrCcz+e3gAqggc1Wq/XxozXAJEmyD1xnXiXbUaPRePxVM0Acx+lgMNgBbjP/LZfLHYwrQ4wKpZRdKBS2Lct6qNfr7+OAL7OwYq6nyWzXAAAAAElFTkSuQmCC"},{ name : "haxeui-core/styles/dark/scrollbars.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogU0NST0xMDQoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLw0KLnNjcm9sbCB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogIzJjMmYzMDsNCn0NCg0KLnNjcm9sbCAuYnV0dG9uIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2U0MTQyOw0KICAgIG9wYWNpdHk6IC44Ow0KfQ0KDQouc2Nyb2xsIC5idXR0b246aG92ZXIgew0KICAgIG9wYWNpdHk6IDE7DQp9DQoNCi52ZXJ0aWNhbC1zY3JvbGwgew0KICAgIGJvcmRlci1sZWZ0OiAxcHggc29saWQgIzE4MWExYjsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmMyZjMwOw0KfQ0KDQouaG9yaXpvbnRhbC1zY3JvbGwgew0KICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjMTgxYTFiOw0KICAgIGJhY2tncm91bmQtY29sb3I6ICMyYzJmMzA7DQp9DQoNCi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCioqIENMQVNTSUMgVkFSSUFOVFMNCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovDQouY2xhc3NpYy1zY3JvbGxzIC5zY3JvbGwsDQouc2Nyb2xsLmNsYXNzaWMtc2Nyb2xscyB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogIzJjMmYzMDsNCiAgICBib3JkZXI6bm9uZTsNCn0NCg0KLmNsYXNzaWMtc2Nyb2xscyAuc2Nyb2xsIC5idXR0b24sDQouc2Nyb2xsLmNsYXNzaWMtc2Nyb2xscyAuYnV0dG9uew0KICAgIGJhY2tncm91bmQtY29sb3I6ICMyYzJmMzA7DQogICAgYm9yZGVyOm5vbmU7DQp9DQoNCi5jbGFzc2ljLXNjcm9sbHMgLnNjcm9sbCAudGh1bWIsDQouc2Nyb2xsLmNsYXNzaWMtc2Nyb2xscyAudGh1bWIgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICMzZDQwNDI7DQp9DQoNCi5jbGFzc2ljLXNjcm9sbHMgLnNjcm9sbCAudGh1bWI6aG92ZXIsDQouc2Nyb2xsLmNsYXNzaWMtc2Nyb2xscyAudGh1bWI6aG92ZXIgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICM0NTQ4NGE7DQp9DQoNCi5jbGFzc2ljLXNjcm9sbHMgLnNjcm9sbCAudGh1bWI6ZG93biwNCi5zY3JvbGwuY2xhc3NpYy1zY3JvbGxzIC50aHVtYjpkb3duIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDU0ODRhOw0KfQ0KDQouY2xhc3NpYy1zY3JvbGxzIC5zY3JvbGwgLnRodW1iOmRpc2FibGVkLA0KLnNjcm9sbC5jbGFzc2ljLXNjcm9sbHMgLnRodW1iOmRpc2FibGVkIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzMzNzM4Ow0KfQ0KDQouY2xhc3NpYy1zY3JvbGxzIC52ZXJ0aWNhbC1zY3JvbGwgLmRlaW5jLA0KLnZlcnRpY2FsLXNjcm9sbC5jbGFzc2ljLXNjcm9sbHMgLmRlaW5jIHsNCiAgICBpY29uOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RhcmsvdXBfYXJyb3cucG5nIjsNCn0NCg0KLmNsYXNzaWMtc2Nyb2xscyAudmVydGljYWwtc2Nyb2xsIC5kZWluYzpkb3duLA0KLnZlcnRpY2FsLXNjcm9sbC5jbGFzc2ljLXNjcm9sbHMgLmRlaW5jOmRvd24gew0KICAgIGljb246ICJoYXhldWktY29yZS9zdHlsZXMvZGFyay91cF9hcnJvd193aGl0ZS5wbmciOw0KfQ0KDQouY2xhc3NpYy1zY3JvbGxzIC52ZXJ0aWNhbC1zY3JvbGwgLmluYywNCi52ZXJ0aWNhbC1zY3JvbGwuY2xhc3NpYy1zY3JvbGxzIC5pbmMgew0KICAgIGljb246ICJoYXhldWktY29yZS9zdHlsZXMvZGFyay9kb3duX2Fycm93LnBuZyI7DQp9DQoNCi5jbGFzc2ljLXNjcm9sbHMgLnZlcnRpY2FsLXNjcm9sbCAuaW5jOmRvd24sDQoudmVydGljYWwtc2Nyb2xsLmNsYXNzaWMtc2Nyb2xscyAuaW5jOmRvd24gew0KICAgIGljb246ICJoYXhldWktY29yZS9zdHlsZXMvZGFyay9kb3duX2Fycm93X3doaXRlLnBuZyI7DQp9DQoNCi5jbGFzc2ljLXNjcm9sbHMgLmhvcml6b250YWwtc2Nyb2xsIC5kZWluYywNCi5ob3Jpem9udGFsLXNjcm9sbC5jbGFzc2ljLXNjcm9sbHMgLmRlaW5jIHsNCiAgICBpY29uOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RhcmsvbGVmdF9hcnJvdy5wbmciOw0KfQ0KDQouY2xhc3NpYy1zY3JvbGxzIC5ob3Jpem9udGFsLXNjcm9sbCAuZGVpbmM6ZG93biwNCi5ob3Jpem9udGFsLXNjcm9sbC5jbGFzc2ljLXNjcm9sbHMgLmRlaW5jOmRvd24gew0KICAgIGljb246ICJoYXhldWktY29yZS9zdHlsZXMvZGFyay9sZWZ0X2Fycm93X3doaXRlLnBuZyI7DQp9DQoNCi5jbGFzc2ljLXNjcm9sbHMgLmhvcml6b250YWwtc2Nyb2xsIC5pbmMsDQouaG9yaXpvbnRhbC1zY3JvbGwuY2xhc3NpYy1zY3JvbGxzIC5pbmMgew0KICAgIGljb246ICJoYXhldWktY29yZS9zdHlsZXMvZGFyay9yaWdodF9hcnJvdy5wbmciOw0KfQ0KDQouY2xhc3NpYy1zY3JvbGxzIC5ob3Jpem9udGFsLXNjcm9sbCAuaW5jOmRvd24sDQouaG9yaXpvbnRhbC1zY3JvbGwuY2xhc3NpYy1zY3JvbGxzIC5pbmM6ZG93biB7DQogICAgaWNvbjogImhheGV1aS1jb3JlL3N0eWxlcy9kYXJrL3JpZ2h0X2Fycm93X3doaXRlLnBuZyI7DQp9DQoNCi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCioqIE1PQklMRSBWQVJJQU5UUw0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi5ob3Jpem9udGFsLXNjcm9sbDptb2JpbGUgew0KICAgIGJhY2tncm91bmQtY29sb3I6IG5vbmU7DQp9DQoNCi5ob3Jpem9udGFsLXNjcm9sbDptb2JpbGUgLnRodW1iIHsNCiAgICBoZWlnaHQ6IDRweDsNCiAgICBib3JkZXItcmFkaXVzOiA0cHg7DQp9DQoNCi52ZXJ0aWNhbC1zY3JvbGw6bW9iaWxlIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBub25lOw0KfQ0KDQoudmVydGljYWwtc2Nyb2xsOm1vYmlsZSAudGh1bWIgew0KICAgIHdpZHRoOiA0cHg7DQogICAgYm9yZGVyLXJhZGl1czogNHB4Ow0KfQ0K"},{ name : "haxeui-core/styles/default/option.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAQlBMVEVYWGzW/9EAAACYtdLCqYPP6PTU////9KxYWFhUVlhXVVJ4rthXkMHs1Kxsj6lSYXvElmdYWGeefViUXFhfUVNWUk58LX/QAAAACHRSTlMnCADr69QWFksN2hQAAAA8SURBVAjXY2BiZxDi5OBjYGNiYGTh4OTg4BJkZmTgFeEAA35WBgFOCFOUm0EYyuTiQWYiFCBrQxiGZAUAvXcDb/w8amgAAAAASUVORK5CYII"},{ name : "haxeui-core/styles/default/optionboxes.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogT1BUSU9OQk9YDQoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLw0KLm9wdGlvbmJveCB7DQogICAgd2lkdGg6IGF1dG87DQogICAgaGVpZ2h0OiBhdXRvOw0KICAgIGhvcml6b250YWwtc3BhY2luZzogNHB4Ow0KICAgIGN1cnNvcjogcG9pbnRlcjsNCiAgICBjb2xvcjogIzAwMDAwMDsNCn0NCg0KLm9wdGlvbmJveDpob3ZlciB7DQp9DQoNCi5vcHRpb25ib3g6ZGlzYWJsZWQgew0KICAgIGN1cnNvcjogZGVmYXVsdDsNCiAgICBjb2xvcjogIzkwOTA5MDsNCn0NCg0KLm9wdGlvbmJveC12YWx1ZSB7DQogICAgYm9yZGVyOiAxcHggc29saWQgI0FCQUJBQjsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGOw0KICAgIHdpZHRoOiAxNnB4Ow0KICAgIGhlaWdodDogMTZweDsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyOw0KICAgIGJvcmRlci1yYWRpdXM6IDE4cHg7DQogICAgaWNvbjogbm9uZTsNCiAgICBmaWx0ZXI6IGRyb3Atc2hhZG93KDEsIDQ1LCAjODg4ODg4LCAwLjIsIDIsIDIsIDEsIDMsIHRydWUpOw0KICAgIHBhZGRpbmctdG9wOiAxcHg7DQogICAgY3Vyc29yOiBwb2ludGVyOw0KfQ0KDQoub3B0aW9uYm94LXZhbHVlOmhvdmVyIHsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjMjE2QUFFOw0KfQ0KDQoub3B0aW9uYm94LXZhbHVlOnNlbGVjdGVkIHsNCiAgICBpY29uOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RlZmF1bHQvb3B0aW9uLnBuZyI7DQp9DQoNCi5vcHRpb25ib3gtdmFsdWU6ZGlzYWJsZWQgew0KICAgIGJhY2tncm91bmQ6ICNENEQ0RDQgI0NDQ0NDQyB2ZXJ0aWNhbDsNCiAgICBjdXJzb3I6IGRlZmF1bHQ7DQp9DQoNCi5vcHRpb25ib3gtbGFiZWwgew0KICAgIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7DQogICAgY3Vyc29yOiBwb2ludGVyOw0KfQ0KDQoub3B0aW9uYm94LWljb24gew0KICAgIGhvcml6b250YWwtYWxpZ246IGNlbnRlcjsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyOw0KICAgIGN1cnNvcjogcG9pbnRlcjsNCiAgICBvcGFjaXR5OiAxOw0KfQ0KDQoub3B0aW9uYm94LWljb246ZGlzYWJsZWQgew0KICAgIGN1cnNvcjogZGVmYXVsdDsNCiAgICBvcGFjaXR5OiAwLjU7DQp9DQo"},{ name : "haxeui-core/styles/default/calendars.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogQ0FMRU5EQVINCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovDQouY2FsZW5kYXIgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7DQogICAgcGFkZGluZzogNXB4Ow0KICAgIGJvcmRlcjogMXB4IHNvbGlkICNBQkFCQUI7DQogICAgYm9yZGVyLXJhZGl1czogMXB4Ow0KfQ0KDQouY2FsZW5kYXIgLmJ1dHRvbiB7DQogICAgcGFkZGluZzogOHB4Ow0KfQ0KDQouY2FsZW5kYXIgLmNhbGVuZGFyLW9mZi1kYXkgew0KICAgIGJvcmRlcjogbm9uZTsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsNCiAgICBjdXJzb3I6IGRlZmF1bHQ7DQp9DQoNCi5jYWxlbmRhciAuY2FsZW5kYXItZGF5IHsNCiAgICBib3JkZXI6IG5vbmU7DQogICAgYmFja2dyb3VuZC1jb2xvcjogI2VjZjJmOTsNCn0NCg0KLmNhbGVuZGFyIC5jYWxlbmRhci1kYXk6aG92ZXIgew0KICAgIGJvcmRlcjogbm9uZTsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTdjNGUyOw0KfQ0KDQouY2FsZW5kYXIgLmNhbGVuZGFyLWRheS1zZWxlY3RlZCB7DQogICAgYm9yZGVyOiBub25lOw0KICAgIGJhY2tncm91bmQtY29sb3I6ICNhN2M0ZTI7DQogICAgY29sb3I6IHdoaXRlOw0KfQ0KDQoNCi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCioqIENBTEVOREFSVklFVw0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi5jYWxlbmRhci12aWV3IHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGOw0KICAgIHBhZGRpbmc6IDVweDsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjQUJBQkFCOw0KICAgIGJvcmRlci1yYWRpdXM6IDFweDsNCn0NCg0KLmNhbGVuZGFyLXZpZXcgLmNhbGVuZGFyIHsNCiAgICBib3JkZXI6IG5vbmU7DQogICAgcGFkZGluZzogMHB4Ow0KfQ0KDQouY2FsZW5kYXItdmlldyAuaGJveCB7DQoJc3BhY2luZzogMDsNCn0NCg0KLmNhbGVuZGFyLXZpZXcgI3ByZXYtbW9udGggew0KICAgIGljb246ICJoYXhldWktY29yZS9zdHlsZXMvZGVmYXVsdC9sZWZ0X2Fycm93LnBuZyI7DQogICAgdmVydGljYWwtYWxpZ246IGNlbnRlcjsNCiAgICBib3JkZXI6IG5vbmU7DQogICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7DQp9DQoNCi5jYWxlbmRhci12aWV3ICNuZXh0LW1vbnRoIHsNCiAgICBpY29uOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RlZmF1bHQvcmlnaHRfYXJyb3cucG5nIjsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyOw0KICAgIGJvcmRlcjogbm9uZTsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsNCn0NCg0KLmNhbGVuZGFyLXZpZXcgI2N1cnJlbnQtbW9udGggew0KICAgIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7DQp9DQoNCi5jYWxlbmRhci12aWV3ICNjdXJyZW50LXllYXIgew0KICAgIHRleHQtYWxpZ246IHJpZ2h0Ow0KICAgIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7DQoJYm9yZGVyOiBub25lOw0KCXBhZGRpbmctdG9wOiAxcHg7DQoJYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7DQp9DQouY2FsZW5kYXItdmlldyAjY3VycmVudC15ZWFyIC5idXR0b24gew0KCWJhY2tncm91bmQtY29sb3I6IHdoaXRlOw0KCWJvcmRlcjogbm9uZTsNCn0NCg"},{ name : "haxeui-core/styles/dark/buttons.css", data : "LmJ1dHRvbiB7DQogICAgYmFja2dyb3VuZDogIzNlNDE0MiAjMzYzODNhOw0KICAgIGJvcmRlci1jb2xvcjogIzE4MWExYjsNCiAgICBjb2xvcjogI2I0YjRiNDsNCn0NCg0KLmJ1dHRvbjpob3ZlciB7DQogICAgYmFja2dyb3VuZDogIzQzNDY0NyAjMzkzYjNjOw0KICAgIGJvcmRlci1jb2xvcjogIzE4MWExYjsNCiAgICBjb2xvcjogI2Q0ZDRkNDsNCn0NCg0KLmJ1dHRvbjpkb3duIHsNCiAgICBiYWNrZ3JvdW5kOiAjMmYzMTMyICMyNzI5MmE7DQogICAgYm9yZGVyLWNvbG9yOiAjMTgxYTFiOw0KICAgIGNvbG9yOiAjZDRkNGQ0Ow0KfQ0KDQouYnV0dG9uOmRpc2FibGVkIHsNCiAgICBjb2xvcjogIzU5NTk1OTsNCiAgICBjdXJzb3I6IGRlZmF1bHQ7DQp9DQoNCi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCioqIEJVVFRPTiBCQVJTDQoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLw0KLmJ1dHRvbi1iYXIgew0KICAgIHNwYWNpbmc6IDA7DQp9DQoNCi5idXR0b24tYmFyIC5idXR0b24gew0KICAgIGJvcmRlci1yYWRpdXM6IDA7DQogICAgYm9yZGVyLWNvbG9yOiAjMTgxYTFiOw0KfQ0KDQouYnV0dG9uLWJhciAuYnV0dG9uOmRvd24gew0KICAgIGJhY2tncm91bmQtY29sb3I6ICM0MTU5ODI7DQogICAgY29sb3I6IHdoaXRlOw0KfQ0KDQouaG9yaXpvbnRhbC1idXR0b24tYmFyIC5idXR0b24gew0KICAgIGJvcmRlci1sZWZ0LXNpemU6IDA7DQp9DQoNCi5ob3Jpem9udGFsLWJ1dHRvbi1iYXIgLmJ1dHRvbi5maXJzdCB7DQogICAgYm9yZGVyLWxlZnQtc2l6ZTogMTsNCn0NCg0KLnZlcnRpY2FsLWJ1dHRvbi1iYXIgLmJ1dHRvbiB7DQogICAgYm9yZGVyLXRvcC1zaXplOiAwOw0KfQ0KDQoudmVydGljYWwtYnV0dG9uLWJhciAuYnV0dG9uLmZpcnN0IHsNCiAgICBib3JkZXItdG9wLXNpemU6IDE7DQp9DQo"},{ name : "haxeui-core/styles/dark/right_arrow_square.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAIAAABLMMCEAAAABnRSTlMA7QAcACSX3bo6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAMUlEQVQImWN8K6PCwMBwfMYEy4wCBhhggrOOz5iARRRZAkUULoEuCjGdCVMIRRTZDQD4NA07+SZ5fAAAAABJRU5ErkJggg"},{ name : "haxeui-core/styles/dark/splitters.css", data : "LnNwbGl0dGVyIHsNCiAgICBzcGFjaW5nOiAwOw0KICAgIGJhY2tncm91bmQtY29sb3I6ICMyNTI3MjgNCn0NCg0KLnZlcnRpY2FsLXNwbGl0dGVyLWdyaXBwZXIgew0KICAgIHdpZHRoOiAxMDAlOw0KICAgIGhlaWdodDogNnB4Ow0KICAgIGN1cnNvcjogcm93LXJlc2l6ZTsNCiAgICBfX2JhY2tncm91bmQtY29sb3I6ICMyNTI3Mjg7DQp9DQoNCi52ZXJ0aWNhbC1zcGxpdHRlci1ncmlwcGVyOmhvdmVyIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOThhNmFhOw0KfQ0KDQoudmVydGljYWwtc3BsaXR0ZXItZ3JpcHBlciAuaW1hZ2Ugew0KICAgIHJlc291cmNlOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RlZmF1bHQvc2l6ZXJfZ3JpcHBlcl9ob3Jpem9udGFsLnBuZyI7DQogICAgaG9yaXpvbnRhbC1hbGlnbjogY2VudGVyOw0KICAgIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7DQp9DQoNCi5ob3Jpem9udGFsLXNwbGl0dGVyLWdyaXBwZXIgew0KICAgIHdpZHRoOiA2cHg7DQogICAgaGVpZ2h0OiAxMDAlOw0KICAgIGN1cnNvcjogY29sLXJlc2l6ZTsNCiAgICBfX2JhY2tncm91bmQtY29sb3I6ICMyNTI3Mjg7DQp9DQoNCi5ob3Jpem9udGFsLXNwbGl0dGVyLWdyaXBwZXI6aG92ZXIgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICM5OGE2YWE7DQp9DQoNCi5ob3Jpem9udGFsLXNwbGl0dGVyLWdyaXBwZXIgLmltYWdlIHsNCiAgICByZXNvdXJjZTogImhheGV1aS1jb3JlL3N0eWxlcy9kZWZhdWx0L3NpemVyX2dyaXBwZXJfdmVydGljYWwucG5nIjsNCiAgICBob3Jpem9udGFsLWFsaWduOiBjZW50ZXI7DQogICAgdmVydGljYWwtYWxpZ246IGNlbnRlcjsNCn0NCg"},{ name : "haxeui-core/styles/default/haxeui_tiny.png", data : "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAwFBMVEUAAAA+drJml8uevd7K2+1Ee7c1aaBcjsWfv99RhsA7cKqfvt/J2e01aaHJ3Ow1Z56kweGsxuM5cKxzoM9PhMCnxOJBd7SBqdSTtNp6otG90ui2zeetx+RFerM1a6Rllsiow+JDe7qhvt9jlsqfvt9dj8SzzOaoxeJCd7A5bqhVicKAqdOev95ik8SsyOOivuCmw99ThcJ4pNCnv99kl8tomc1+p9RRiMSUtts8drV0oNFdkcibu96IrtdOhL9Cerg7AHaNAAAANXRSTlMASfTz8fHx5uTh4d/T00RE9PLy8fHw5+bl4uHh4eHh39bW0NC/v7m5ubm4tVROSkpIR0ZAQIt9oOEAAACUSURBVBjTRc1FEsMwEETRjpkdZmZmS5FD979VRjVVce/e3zS8MGyMz6DdpuV2x0X/QTPn++uu9pRSDtAl0wRJL4DFzjIuDqIXm8snRlJhc7FTYMnmsgZwZHMpUTjlRZA6rET+t9oAiSl0YatqiugtqLBpMSyyLmzloCe4sNUQnpaxOFy29S+FAK2Rb0/0G+4zw/WbP+FUKshItzNPAAAAAElFTkSuQmCC"},{ name : "haxeui-core/styles/default/splitters.css", data : "LnNwbGl0dGVyIHsNCiAgICBzcGFjaW5nOiAwOw0KfQ0KDQoudmVydGljYWwtc3BsaXR0ZXItZ3JpcHBlciB7DQogICAgd2lkdGg6IDEwMCU7DQogICAgaGVpZ2h0OiA2cHg7DQogICAgY3Vyc29yOiByb3ctcmVzaXplOw0KICAgIF9fYmFja2dyb3VuZC1jb2xvcjogI0VFRUVFRTsNCn0NCg0KLnZlcnRpY2FsLXNwbGl0dGVyLWdyaXBwZXI6aG92ZXIgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICNEREREREQ7DQp9DQoNCi52ZXJ0aWNhbC1zcGxpdHRlci1ncmlwcGVyIC5pbWFnZSB7DQogICAgcmVzb3VyY2U6ICJoYXhldWktY29yZS9zdHlsZXMvZGVmYXVsdC9zaXplcl9ncmlwcGVyX2hvcml6b250YWwucG5nIjsNCiAgICBob3Jpem9udGFsLWFsaWduOiBjZW50ZXI7DQogICAgdmVydGljYWwtYWxpZ246IGNlbnRlcjsNCn0NCg0KLmhvcml6b250YWwtc3BsaXR0ZXItZ3JpcHBlciB7DQogICAgd2lkdGg6IDZweDsNCiAgICBoZWlnaHQ6IDEwMCU7DQogICAgY3Vyc29yOiBjb2wtcmVzaXplOw0KICAgIF9fYmFja2dyb3VuZC1jb2xvcjogI0VFRUVFRTsNCn0NCg0KLmhvcml6b250YWwtc3BsaXR0ZXItZ3JpcHBlcjpob3ZlciB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogI0RERERERDsNCn0NCg0KLmhvcml6b250YWwtc3BsaXR0ZXItZ3JpcHBlciAuaW1hZ2Ugew0KICAgIHJlc291cmNlOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RlZmF1bHQvc2l6ZXJfZ3JpcHBlcl92ZXJ0aWNhbC5wbmciOw0KICAgIGhvcml6b250YWwtYWxpZ246IGNlbnRlcjsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyOw0KfQ0K"},{ name : "haxeui-core/styles/default/up_arrow_circled.png", data : "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"},{ name : "haxeui-core/styles/dark/right_arrow_circled.png", data : "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"},{ name : "haxeui-core/styles/dark/optionboxes.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogT1BUSU9OQk9YDQoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLw0KLm9wdGlvbmJveCB7DQogICAgd2lkdGg6IGF1dG87DQogICAgaGVpZ2h0OiBhdXRvOw0KICAgIGhvcml6b250YWwtc3BhY2luZzogNHB4Ow0KICAgIGN1cnNvcjogcG9pbnRlcjsNCiAgICBjb2xvcjogI2I0YjRiNDsNCn0NCg0KLm9wdGlvbmJveDpob3ZlciB7DQp9DQoNCi5vcHRpb25ib3g6ZGlzYWJsZWQgew0KICAgIGN1cnNvcjogZGVmYXVsdDsNCiAgICBjb2xvcjogIzU5NTk1OTsNCn0NCg0KLm9wdGlvbmJveC12YWx1ZSB7DQogICAgYm9yZGVyOiAxcHggc29saWQgIzE4MWExYjsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjUyNzI4Ow0KICAgIHdpZHRoOiAxNnB4Ow0KICAgIGhlaWdodDogMTZweDsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyOw0KICAgIGJvcmRlci1yYWRpdXM6IDE4cHg7DQogICAgaWNvbjogbm9uZTsNCiAgICBmaWx0ZXI6IGRyb3Atc2hhZG93KDEsIDQ1LCAjMDAwMDAwLCAwLjIsIDIsIDIsIDEsIDMsIHRydWUpOw0KICAgIHBhZGRpbmctdG9wOiAxcHg7DQogICAgY3Vyc29yOiBwb2ludGVyOw0KfQ0KDQoub3B0aW9uYm94LXZhbHVlOmhvdmVyIHsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjMjE2QUFFOw0KfQ0KDQoub3B0aW9uYm94LXZhbHVlOnNlbGVjdGVkIHsNCiAgICBpY29uOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2Rhcmsvb3B0aW9uLnBuZyI7DQp9DQoNCi5vcHRpb25ib3gtdmFsdWU6ZGlzYWJsZWQgew0KICAgIGJhY2tncm91bmQ6ICMyYzJmMzAgIzJjMmYzMCB2ZXJ0aWNhbDsNCiAgICBjdXJzb3I6IGRlZmF1bHQ7DQp9DQoNCi5vcHRpb25ib3gtbGFiZWwgew0KICAgIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7DQogICAgY3Vyc29yOiBwb2ludGVyOw0KfQ0KDQoub3B0aW9uYm94LWljb24gew0KICAgIGhvcml6b250YWwtYWxpZ246IGNlbnRlcjsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyOw0KICAgIGN1cnNvcjogcG9pbnRlcjsNCiAgICBvcGFjaXR5OiAxOw0KfQ0KDQoub3B0aW9uYm94LWljb246ZGlzYWJsZWQgew0KICAgIGN1cnNvcjogZGVmYXVsdDsNCiAgICBvcGFjaXR5OiAwLjU7DQp9DQo"},{ name : "haxeui-core/styles/default/listview.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogTElTVFZJRVcNCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovDQoubGlzdHZpZXcgew0KICAgIGJvcmRlcjogMXB4IHNvbGlkICNBQkFCQUI7DQogICAgYm9yZGVyLXJhZGl1czogMXB4Ow0KICAgIHBhZGRpbmc6IDFweDsNCiAgICB3aWR0aDogYXV0bzsNCiAgICBoZWlnaHQ6IGF1dG87DQogICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjsNCn0NCg0KLmxpc3R2aWV3IC5saXN0dmlldy1jb250ZW50cyB7DQogICAgc3BhY2luZzogMDsNCiAgICB3aWR0aDogMTAwJTsNCiAgICBwYWRkaW5nOiAwcHg7DQp9DQoNCi5saXN0dmlldyAuaXRlbXJlbmRlcmVyIHsNCiAgICBjdXJzb3I6IHBvaW50ZXI7ICAgIA0KfQ0KDQoubGlzdHZpZXcgLml0ZW1yZW5kZXJlciAubGFiZWwgew0KICAgIGNvbG9yOiBibGFjazsNCn0NCg0KLmxpc3R2aWV3IC5ldmVuIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGOw0KfQ0KDQoubGlzdHZpZXcgLmV2ZW46aG92ZXIgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICNkOWU1ZjI7DQp9DQoNCi5saXN0dmlldyAub2RkIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmOGY4Ow0KfQ0KDQoubGlzdHZpZXcgLm9kZDpob3ZlciB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogI2Q5ZTVmMjsNCn0NCg0KLmxpc3R2aWV3IC5pdGVtcmVuZGVyZXIgew0KICAgIGhlaWdodDogYXV0bzsNCiAgICBwYWRkaW5nOiA1cHg7DQp9DQoNCi5saXN0dmlldyAuaXRlbXJlbmRlcmVyOnNlbGVjdGVkIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTdjNGUyOw0KICAgIGNvbG9yOiB3aGl0ZTsNCn0NCg0KLmxpc3R2aWV3IC5pdGVtcmVuZGVyZXI6c2VsZWN0ZWQgLmxhYmVsIHsNCiAgICBjb2xvcjogd2hpdGU7DQp9DQo"},{ name : "haxeui-core/styles/default/dialogs.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogRElBTE9HUw0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi5kaWFsb2cgew0KICAgIGJvcmRlcjogMXB4IHNvbGlkICNBQkFCQUI7DQogICAgZmlsdGVyOiBkcm9wLXNoYWRvdygxLCA0NSwgIzAwMDAwMCwgMC4yLCAzMCwgMiwgMSwgMywgZmFsc2UpOw0KICAgIGJvcmRlci1yYWRpdXM6IDJweDsNCiAgICB3aWR0aDogYXV0bzsNCiAgICBoZWlnaHQ6IGF1dG87DQogICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7DQogICAgcGFkZGluZzogMXB4Ow0KfQ0KDQouZGlhbG9nLWNvbnRhaW5lciB7DQogICAgc3BhY2luZzogMDsNCn0NCg0KLmRpYWxvZy10aXRsZSB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogI0VFRUVFRTsNCiAgICBwYWRkaW5nOiA1cHg7DQogICAgYm9yZGVyLWJvdHRvbS13aWR0aDogMXB4Ow0KICAgIGJvcmRlci1ib3R0b20tY29sb3I6ICNBQkFCQUI7DQp9DQoNCi5kaWFsb2ctdGl0bGUtbGFiZWwgew0KICAgIHdpZHRoOiAxMDAlOw0KICAgIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7DQogICAgY29sb3I6ICM4ODg4ODg7DQogICAgdmVydGljYWwtYWxpZ246ICJjZW50ZXIiOw0KfQ0KDQouZGlhbG9nLWNvbnRlbnQgew0KICAgIHBhZGRpbmc6IDVweDsNCn0NCg0KLmRpYWxvZy1mb290ZXItY29udGFpbmVyIHsNCiAgICBib3JkZXItdG9wLXdpZHRoOiAxcHg7DQogICAgYm9yZGVyLXRvcC1jb2xvcjogI0FCQUJBQjsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRUVFRUVFOw0KfQ0KDQouZGlhbG9nLWZvb3RlciB7DQogICAgcGFkZGluZzogNXB4Ow0KICAgIGhvcml6b250YWwtYWxpZ246IHJpZ2h0Ow0KfQ0KDQouZGlhbG9nLWNsb3NlLWJ1dHRvbiB7DQogICAgcmVzb3VyY2U6ICJoYXhldWktY29yZS9zdHlsZXMvZGVmYXVsdC9zbWFsbC1jbG9zZS1idXR0b24ucG5nIjsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogImNlbnRlciI7DQogICAgY3Vyc29yOiAicG9pbnRlciI7DQp9DQoNCi5kaWFsb2cgI2ljb25JbWFnZS5pbmZvIHsNCiAgICByZXNvdXJjZTogImhheGV1aS1jb3JlL3N0eWxlcy9kZWZhdWx0L2RpYWxvZ3MvaW5mb3JtYXRpb24ucG5nIjsNCn0NCg0KLmRpYWxvZyAjaWNvbkltYWdlLnF1ZXN0aW9uIHsNCiAgICByZXNvdXJjZTogImhheGV1aS1jb3JlL3N0eWxlcy9kZWZhdWx0L2RpYWxvZ3MvcXVlc3Rpb24ucG5nIjsNCn0NCg0KLmRpYWxvZyAjaWNvbkltYWdlLnllc25vIHsNCiAgICByZXNvdXJjZTogImhheGV1aS1jb3JlL3N0eWxlcy9kZWZhdWx0L2RpYWxvZ3MvcXVlc3Rpb24ucG5nIjsNCn0NCg0KLmRpYWxvZyAjaWNvbkltYWdlLndhcm5pbmcgew0KICAgIHJlc291cmNlOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RlZmF1bHQvZGlhbG9ncy9leGNsYW1hdGlvbi5wbmciOw0KfQ0KDQouZGlhbG9nICNpY29uSW1hZ2UuZXJyb3Igew0KICAgIHJlc291cmNlOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RlZmF1bHQvZGlhbG9ncy9jcm9zcy1jaXJjbGUucG5nIjsNCn0NCg0KLm1lc3NhZ2Vib3ggew0KICAgIGluaXRpYWwtd2lkdGg6IDMwMHB4Ow0KfQ"},{ name : "haxeui-core/styles/default/expanded.png", data : "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH5AoNCwkgHyJHKAAAAJBJREFUOMtjYBgFAw8YkTlrt2xRYv77/+h/BgYJHOpf///LZBMU5H0LJsCELBvs43OPkeGfOwMDw0csmj8z/GP0RNaMYQADAwODv7//JSYGxkAGBoafSMK/Gf8zhgYG+pxFV8+EzZ3+/j77/zMwJjAwMPxjYGD4/5+BMTUgwGcnyQG0fuOW4vUbtxSPJhUaAwCz8idCJS/GkgAAAABJRU5ErkJggg"},{ name : "haxeui-core/styles/default/left_arrow_circled.png", data : "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAACt0lEQVRIiaWVT0sbQRiHn3c3UbdI9dQaxJuYk9Ii9iSUQm3EQnvwC/QDeCiCEgktQ3tQclB6aA+lxQ8gCC3U+ucLpIKlFQ8tguBBbYKHNCA7bt2dHmKCJtm44O+08847z+9lZmde4QotLCx0aq1HRCRpjLkNICJ5EflljNlIp9N/m62XsInZ2dlBQIlICoiHpHnAmmVZanp6+nskg/n5ecfzvLfAs2YF1CgAFrXWE0opHWqQzWa7giD4DAxFBNdq0/f9J5lMJl8JWJUPpVRbEASfrgEHuGfb9hel1I06g7a2tnfAvWvAKxp0HOdNZSAA2Wz2ThAEWxcNa9XZ2UlHRwf7+/tRTIwxZmhmZmbLAvB9/3UzeHd3N+Pj46RSKfr7+6MYCPASQObm5jqAAtASBh8dHcW2bQByuRzb29tRTP61trbesoBUGDyRSJBKparwvb09dnZ2osAB4p7nPYwBfVEqd12Xw8NDkslkXW6pVOLg4KAubozpixljEiKX71MsFmNkZKQKB3Ach+Hh4dByl5eXOT4+rjVIWCJiGjgTBEEorFH+2dlZXVxETExEjoy57OH7Pqurq4yNjdHSUj4e13XJ5XL4vl8HKhaLFIvFRgZHMWPMbqOqCoUCKysrVRPHcejt7WV9fb2hSYh2LWCN8qsYauJ55emenh4GBgaiwk9d1123zt/ztbCsWhPXdaMarCqlSrHzwQvgMSG3uVAosLS0RHt7O/l8vlFKrQLLsl5RAabT6Z/AYrMVJycnUeGIyIdKA6pWrLWeAL5FIjTXVjwef14ZXOwH2vf9p8DmNeA527bHJicnqwd1ac8zmUxea30f+Ei5DUZVICLvtdYPpqamChcnmjX9u5Sb/ighjyHl3/vredP/0SjhyqaulLrpOM4jY0wf0HUe/mOM+X16erqhlCo1W/8f0YsgMTeU8ssAAAAASUVORK5CYII"},{ name : "haxeui-core/styles/default/scrollview.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogU0NST0xMVklFVw0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi5zY3JvbGx2aWV3IHsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjQUJBQkFCOw0KICAgIGJvcmRlci1yYWRpdXM6IDFweDsNCiAgICBwYWRkaW5nOiAxcHg7DQogICAgd2lkdGg6IGF1dG87DQogICAgaGVpZ2h0OiBhdXRvOw0KfQ0KDQouc2Nyb2xsdmlldyAuc2Nyb2xsdmlldy1jb250ZW50cyB7DQogICAgaGVpZ2h0OiBhdXRvOw0KICAgIHNwYWNpbmc6IDVweDsNCiAgICBwYWRkaW5nOiA1cHg7DQogICAgYm9yZGVyOiBub25lOw0KfQ0KDQovKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqDQoqKiBNT0JJTEUgVkFSSUFOVFMNCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovDQouc2Nyb2xsdmlldzptb2JpbGUgew0KICAgIG1vZGU6IG1vYmlsZTsNCn0NCg"},{ name : "haxeui-core/styles/default/sizer_gripper_horizontal.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAABnRSTlMA7QAcACSX3bo6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAJElEQVQImWN8K6PCgBswMTAwTEqOnpQcjZXBhEcrAwMDI37DARkxCkFtOZfXAAAAAElFTkSuQmCC"},{ name : "haxeui-core/styles/dark/calendars.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogQ0FMRU5EQVINCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovDQouY2FsZW5kYXIgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICMyNTI3Mjg7DQogICAgcGFkZGluZzogNXB4Ow0KICAgIGJvcmRlcjogMXB4IHNvbGlkICMxODFhMWI7DQogICAgYm9yZGVyLXJhZGl1czogMXB4Ow0KfQ0KDQouY2FsZW5kYXIgLmJ1dHRvbiB7DQogICAgcGFkZGluZzogOHB4Ow0KfQ0KDQouY2FsZW5kYXIgLmNhbGVuZGFyLW9mZi1kYXkgew0KICAgIGJvcmRlcjogbm9uZTsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjUyNzI4Ow0KICAgIGN1cnNvcjogZGVmYXVsdDsNCn0NCg0KLmNhbGVuZGFyIC5jYWxlbmRhci1kYXkgew0KICAgIGJvcmRlcjogbm9uZTsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmYzNzQ2Ow0KfQ0KDQouY2FsZW5kYXIgLmNhbGVuZGFyLWRheTpob3ZlciB7DQogICAgYm9yZGVyOiBub25lOw0KICAgIGJhY2tncm91bmQtY29sb3I6ICM0MTU5ODI7DQp9DQoNCi5jYWxlbmRhciAuY2FsZW5kYXItZGF5LXNlbGVjdGVkIHsNCiAgICBib3JkZXI6IG5vbmU7DQogICAgYmFja2dyb3VuZC1jb2xvcjogIzQxNTk4MjsNCiAgICBjb2xvcjogd2hpdGU7DQp9DQoNCg0KLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogQ0FMRU5EQVJWSUVXDQoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLw0KLmNhbGVuZGFyLXZpZXcgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICMyNTI3Mjg7DQogICAgcGFkZGluZzogNXB4Ow0KICAgIGJvcmRlcjogMXB4IHNvbGlkICMxODFhMWI7DQogICAgYm9yZGVyLXJhZGl1czogMXB4Ow0KfQ0KDQouY2FsZW5kYXItdmlldyAuY2FsZW5kYXIgew0KICAgIGJvcmRlcjogbm9uZTsNCiAgICBwYWRkaW5nOiAwcHg7DQp9DQoNCi5jYWxlbmRhci12aWV3IC5oYm94IHsNCglzcGFjaW5nOiAwOw0KfQ0KDQouY2FsZW5kYXItdmlldyAjcHJldi1tb250aCB7DQogICAgaWNvbjogImhheGV1aS1jb3JlL3N0eWxlcy9kYXJrL2xlZnRfYXJyb3cucG5nIjsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyOw0KICAgIGJvcmRlcjogbm9uZTsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjUyNzI4Ow0KfQ0KDQouY2FsZW5kYXItdmlldyAjbmV4dC1tb250aCB7DQogICAgaWNvbjogImhheGV1aS1jb3JlL3N0eWxlcy9kYXJrL3JpZ2h0X2Fycm93LnBuZyI7DQogICAgdmVydGljYWwtYWxpZ246IGNlbnRlcjsNCiAgICBib3JkZXI6IG5vbmU7DQogICAgYmFja2dyb3VuZC1jb2xvcjogIzI1MjcyODsNCn0NCg0KLmNhbGVuZGFyLXZpZXcgI2N1cnJlbnQtbW9udGggew0KICAgIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7DQp9DQoNCi5jYWxlbmRhci12aWV3ICNjdXJyZW50LXllYXIgew0KICAgIHRleHQtYWxpZ246IHJpZ2h0Ow0KICAgIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7DQoJYm9yZGVyOiBub25lOw0KCXBhZGRpbmctdG9wOiAxcHg7DQoJYmFja2dyb3VuZC1jb2xvcjogIzI1MjcyODsNCn0NCi5jYWxlbmRhci12aWV3ICNjdXJyZW50LXllYXIgLmJ1dHRvbiB7DQoJYmFja2dyb3VuZC1jb2xvcjogIzI1MjcyODsNCglib3JkZXI6IG5vbmU7DQp9DQo"},{ name : "haxeui-core/styles/dark/listview.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogTElTVFZJRVcNCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovDQoubGlzdHZpZXcgew0KICAgIGJvcmRlcjogMXB4IHNvbGlkICMxODFhMWI7DQogICAgYm9yZGVyLXJhZGl1czogMXB4Ow0KICAgIHBhZGRpbmc6IDFweDsNCiAgICB3aWR0aDogYXV0bzsNCiAgICBoZWlnaHQ6IGF1dG87DQogICAgYmFja2dyb3VuZC1jb2xvcjogIzI1MjcyODsNCn0NCg0KDQoubGlzdHZpZXcgLmxpc3R2aWV3LWNvbnRlbnRzIHsNCiAgICBzcGFjaW5nOiAwOw0KICAgIHdpZHRoOiAxMDAlOw0KICAgIHBhZGRpbmc6IDBweDsNCn0NCg0KLmxpc3R2aWV3IC5pdGVtcmVuZGVyZXIgew0KICAgIGN1cnNvcjogcG9pbnRlcjsgICAgDQp9DQoNCi5saXN0dmlldyAuaXRlbXJlbmRlcmVyIC5sYWJlbCB7DQogICAgY29sb3I6ICNiNGI0YjQ7DQp9DQoNCi5saXN0dmlldyAuZXZlbiB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogIzI1MjcyODsNCn0NCg0KLmxpc3R2aWV3IC5ldmVuOmhvdmVyIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmYzNzQ2Ow0KfQ0KDQoubGlzdHZpZXcgLm9kZCB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogIzJhMmMyZDsNCn0NCg0KLmxpc3R2aWV3IC5vZGQ6aG92ZXIgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICMyZjM3NDY7DQp9DQoNCi5saXN0dmlldyAuaXRlbXJlbmRlcmVyIHsNCiAgICBoZWlnaHQ6IGF1dG87DQogICAgcGFkZGluZzogNXB4Ow0KfQ0KDQoubGlzdHZpZXcgLml0ZW1yZW5kZXJlcjpzZWxlY3RlZCB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogIzQxNTk4MjsNCiAgICBjb2xvcjogd2hpdGU7DQp9DQoNCi5saXN0dmlldyAuaXRlbXJlbmRlcmVyOnNlbGVjdGVkIC5sYWJlbCB7DQogICAgY29sb3I6IHdoaXRlOw0KfQ0KDQoubGlzdHZpZXcgLml0ZW1yZW5kZXJlcjpkaXNhYmxlZCB7DQogICAgY29sb3I6ICM1OTU5NTk7DQp9DQoNCi5saXN0dmlldyAuaXRlbXJlbmRlcmVyOmRpc2FibGVkIC5sYWJlbCB7DQogICAgY29sb3I6ICM1OTU5NTk7DQp9DQo"},{ name : "haxeui-core/styles/default/sliders.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogU0xJREVSUw0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi5ob3Jpem9udGFsLXNsaWRlciB7DQogICAgcGFkZGluZy1sZWZ0OiA1cHg7DQogICAgcGFkZGluZy1yaWdodDogNXB4Ow0KICAgIHBhZGRpbmctdG9wOiAwcHg7DQogICAgcGFkZGluZy1ib3R0b206IDBweDsNCiAgICBoZWlnaHQ6IGF1dG87DQogICAgaW5pdGlhbC13aWR0aDogMTUwcHg7DQp9DQoNCi5ob3Jpem9udGFsLXNsaWRlciAuc2xpZGVyLXZhbHVlIHsNCiAgICB3aWR0aDogMTAwJTsNCiAgICBoZWlnaHQ6IDhweDsNCiAgICBib3JkZXItcmFkaXVzOiAxcHg7DQogICAgdmVydGljYWwtYWxpZ246IGNlbnRlcjsNCiAgICBjdXJzb3I6IHBvaW50ZXI7DQp9DQoNCi5ob3Jpem9udGFsLXNsaWRlci53aXRoLWNlbnRlciAucmFuZ2UtdmFsdWUgew0KICAgIGJvcmRlci1yYWRpdXM6IDBweDsNCn0NCg0KLmhvcml6b250YWwtc2xpZGVyIC5taW5vci10aWNrIHsNCiAgICBtYXJnaW4tdG9wOiAxMHB4Ow0KICAgIGJhY2tncm91bmQtY29sb3I6ICNjY2NjY2M7DQogICAgd2lkdGg6IDFweDsNCiAgICBoZWlnaHQ6IDRweDsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyOw0KfQ0KDQouaG9yaXpvbnRhbC1zbGlkZXIgLm1ham9yLXRpY2sgew0KICAgIG1hcmdpbi10b3A6IDEycHg7DQogICAgYmFja2dyb3VuZC1jb2xvcjogI2NjY2NjYzsNCiAgICB3aWR0aDogMXB4Ow0KICAgIGhlaWdodDogOHB4Ow0KICAgIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7DQp9DQoNCi5ob3Jpem9udGFsLXNsaWRlciAuYnV0dG9uIHsNCiAgICB3aWR0aDogMTFweDsNCiAgICBoZWlnaHQ6IDIwcHg7DQogICAgYm9yZGVyLXJhZGl1czogMnB4Ow0KICAgIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7DQogICAgZmlsdGVyOiBub25lOw0KfQ0KICAgIA0KLnZlcnRpY2FsLXNsaWRlciB7DQogICAgcGFkZGluZy10b3A6IDVweDsNCiAgICBwYWRkaW5nLWJvdHRvbTogNXB4Ow0KICAgIHBhZGRpbmctbGVmdDogMHB4Ow0KICAgIHBhZGRpbmctcmlnaHQ6IDBweDsNCiAgICB3aWR0aDogYXV0bzsNCiAgICBpbml0aWFsLWhlaWdodDogMTUwcHg7DQp9DQoNCi52ZXJ0aWNhbC1zbGlkZXIgLnNsaWRlci12YWx1ZSB7DQogICAgaGVpZ2h0OiAxMDAlOw0KICAgIHdpZHRoOiA4cHg7DQogICAgYm9yZGVyLXJhZGl1czogMnB4Ow0KICAgIGhvcml6b250YWwtYWxpZ246IGNlbnRlcjsNCiAgICBjdXJzb3I6IHBvaW50ZXI7DQp9DQoNCi52ZXJ0aWNhbC1zbGlkZXIud2l0aC1jZW50ZXIgLnJhbmdlLXZhbHVlIHsNCiAgICBib3JkZXItcmFkaXVzOiAwcHg7DQp9DQoNCi52ZXJ0aWNhbC1zbGlkZXIgLm1pbm9yLXRpY2sgew0KICAgIG1hcmdpbi1sZWZ0OiAxMHB4Ow0KICAgIGJhY2tncm91bmQtY29sb3I6ICNjY2NjY2M7DQogICAgd2lkdGg6IDRweDsNCiAgICBoZWlnaHQ6IDFweDsNCiAgICBob3Jpem9udGFsLWFsaWduOiBjZW50ZXI7DQp9DQoNCi52ZXJ0aWNhbC1zbGlkZXIgLm1ham9yLXRpY2sgew0KICAgIG1hcmdpbi1sZWZ0OiAxMnB4Ow0KICAgIGJhY2tncm91bmQtY29sb3I6ICNjY2NjY2M7DQogICAgd2lkdGg6IDhweDsNCiAgICBoZWlnaHQ6IDFweDsNCiAgICBob3Jpem9udGFsLWFsaWduOiBjZW50ZXI7DQp9DQoNCi52ZXJ0aWNhbC1zbGlkZXIgLmJ1dHRvbiB7DQogICAgd2lkdGg6IDIwcHg7DQogICAgaGVpZ2h0OiAxMXB4Ow0KICAgIGJvcmRlci1yYWRpdXM6IDJweDsNCiAgICBob3Jpem9udGFsLWFsaWduOiBjZW50ZXI7DQogICAgZmlsdGVyOiBub25lOw0KfQ0KDQo"},{ name : "haxeui-core/styles/dark/tabs.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogVEFCQkFSIChUT1ApDQoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLw0KLnRhYmJhciB7DQogICAgcGFkZGluZy1sZWZ0OiAwcHg7DQogICAgcGFkZGluZy1yaWdodDogMHB4Ow0KICAgIGhlaWdodDogYXV0bzsNCiAgICB3aWR0aDogYXV0bzsNCiAgICBib3JkZXItYm90dG9tLXdpZHRoOiAxcHg7DQogICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogIzE4MWExYjsNCiAgICBib3JkZXItdG9wLXdpZHRoOiAwcHg7DQogICAgY2xpcDogdHJ1ZTsNCn0NCg0KLnRhYmJhciA+IC50YWJiYXItY29udGVudHMgew0KICAgIGJvcmRlcjogbm9uZTsNCiAgICBib3JkZXItYm90dG9tLXdpZHRoOiAxcHg7DQogICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogIzE4MWExYjsNCiAgICBzcGFjaW5nOiAwOw0KfQ0KDQoudGFiYmFyLWJ1dHRvbiB7DQogICAgYm9yZGVyLXJhZGl1czogMHB4Ow0KICAgIGJhY2tncm91bmQ6ICMzMTMzMzUgIzMxMzMzNSB2ZXJ0aWNhbDsNCiAgICBwYWRkaW5nOiA2cHggOHB4Ow0KICAgIHZlcnRpY2FsLWFsaWduOiBib3R0b207DQogICAgYm9yZGVyLWxlZnQtd2lkdGg6IDBweDsNCiAgICBjb2xvcjogI2I0YjRiNDsNCn0NCg0KLnRhYmJhci1idXR0b24uZmlyc3Qgew0KICAgIGJvcmRlci1sZWZ0LXdpZHRoOiAxcHg7DQp9DQoNCi50YWJiYXItYnV0dG9uOmhvdmVyIHsNCiAgICBiYWNrZ3JvdW5kOiAjMzkzYjNjICMzOTNiM2MgdmVydGljYWw7DQp9DQoNCi50YWJiYXItYnV0dG9uOmRvd24gew0KICAgIGJvcmRlcjogMXB4IHNvbGlkICMxODFhMWI7DQp9DQoNCi50YWJiYXItYnV0dG9uLXNlbGVjdGVkIHsNCiAgICBib3JkZXItcmFkaXVzOiAwcHg7DQoNCiAgICBib3JkZXItYm90dG9tLXdpZHRoOiAxcHg7DQogICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogIzNEM0Y0MTsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM0QzRjQxOw0KICAgIGJvcmRlci1sZWZ0LXdpZHRoOiAwcHg7DQogICAgY29sb3I6ICNkNGQ0ZDQ7DQp9DQoNCg0KLnRhYmJhci1idXR0b24tc2VsZWN0ZWQuZmlyc3Qgew0KICAgIGJvcmRlci1sZWZ0LXdpZHRoOiAxcHg7DQp9DQoNCi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCioqIFRBQkJBUiAoQk9UVE9NKQ0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi50YWJiYXI6Ym90dG9tIHsNCiAgICBwYWRkaW5nLWxlZnQ6IDBweDsNCiAgICBwYWRkaW5nLXJpZ2h0OiAwcHg7DQogICAgaGVpZ2h0OiBhdXRvOw0KICAgIHdpZHRoOiBhdXRvOw0KICAgIGJvcmRlci1ib3R0b20td2lkdGg6IDBweDsNCiAgICBib3JkZXItdG9wLXdpZHRoOiAxcHg7DQogICAgYm9yZGVyLXRvcC1jb2xvcjogIzE4MWExYjsNCiAgICBjbGlwOiB0cnVlOw0KfQ0KDQoudGFiYmFyOmJvdHRvbSAudGFiYmFyLWNvbnRlbnRzIHsNCiAgICBib3JkZXI6IG5vbmU7DQogICAgYm9yZGVyLWJvdHRvbS13aWR0aDogMHB4Ow0KICAgIGJvcmRlci10b3Atd2lkdGg6IDFweDsNCiAgICBib3JkZXItdG9wLWNvbG9yOiAjMTgxYTFiOw0KICAgIHNwYWNpbmc6IDA7DQp9DQoNCi50YWJiYXItYnV0dG9uOmJvdHRvbSB7DQogICAgdmVydGljYWwtYWxpZ246IHRvcDsNCiAgICBib3JkZXItbGVmdC13aWR0aDogMHB4Ow0KfQ0KDQoudGFiYmFyLWJ1dHRvbi5maXJzdCB7DQogICAgYm9yZGVyLWxlZnQtd2lkdGg6IDFweDsNCn0NCg0KLnRhYmJhci1idXR0b24tc2VsZWN0ZWQ6Ym90dG9tIHsNCiAgICBib3JkZXItcmFkaXVzOiAwcHg7DQoNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjMTgxYTFiOw0KICAgIGJvcmRlci10b3Atd2lkdGg6IDFweDsNCiAgICBib3JkZXItdG9wLWNvbG9yOiAjM0QzRjQxOw0KICAgIGJhY2tncm91bmQtY29sb3I6ICMzRDNGNDE7DQogICAgYm9yZGVyLWxlZnQtd2lkdGg6IDBweDsNCn0NCg0KLnRhYmJhci1idXR0b24tc2VsZWN0ZWQuZmlyc3Qgew0KICAgIGJvcmRlci1sZWZ0LXdpZHRoOiAxcHg7DQp9DQoNCi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCioqIFRBQlZJRVcNCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovDQoNCi50YWJ2aWV3ID4gLnRhYnZpZXctY29udGVudCB7DQogICAgYm9yZGVyOiAxcHggc29saWQgIzE4MWExYjsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM0QzRjQxOw0KfQ0KDQoNCi50YWJiYXItc2Nyb2xsLWxlZnQgew0KICAgIGljb246ICJoYXhldWktY29yZS9zdHlsZXMvZGFyay9sZWZ0X2Fycm93LnBuZyI7DQogICAgYm9yZGVyLXJhZGl1czogMDsNCiAgICBwYWRkaW5nOiA1cHg7DQp9DQoNCi50YWJiYXItc2Nyb2xsLXJpZ2h0IHsNCiAgICBpY29uOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RhcmsvcmlnaHRfYXJyb3cucG5nIjsNCiAgICBib3JkZXItcmFkaXVzOiAwOw0KICAgIHBhZGRpbmc6IDVweDsNCn0NCg0KLnRhYmJhci1idXR0b24gLnRhYi1jbG9zZS1idXR0b24gew0KICAgIHJlc291cmNlOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RhcmsvdGlueS1jbG9zZS1idXR0b24ucG5nIjsNCn0NCg"},{ name : "haxeui-core/styles/default/accordion.css", data : "LmFjY29yZGlvbiB7DQogICAgYm9yZGVyOiAxcHggc29saWQgI2FiYWJhYjsNCiAgICBzcGFjaW5nOiAwOw0KICAgIHBhZGRpbmc6IDFweDsNCiAgICBwYWRkaW5nLWJvdHRvbTogMHB4Ow0KICAgIGNsaXA6IHRydWU7DQp9DQoNCi5hY2NvcmRpb24tYnV0dG9uIHsNCiAgICBib3JkZXItcmFkaXVzOiAwOw0KICAgIGJvcmRlcjogMHB4IHNvbGlkICNhYmFiYWI7DQogICAgd2lkdGg6IDEwMCU7DQogICAgdGV4dC1hbGlnbjogbGVmdDsNCiAgICBpY29uOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RlZmF1bHQvcmlnaHRfYXJyb3dfc3F1YXJlLnBuZyI7DQogICAgaWNvbi1wb3NpdGlvbjogbGVmdDsNCiAgICBib3JkZXI6IG5vbmU7DQogICAgYm9yZGVyLWNvbG9yOiAjYWJhYmFiOw0KICAgIGJvcmRlci1ib3R0b20td2lkdGg6IDFweDsNCn0NCg0KLmFjY29yZGlvbi1idXR0b246ZG93biB7DQogICAgaWNvbjogImhheGV1aS1jb3JlL3N0eWxlcy9kZWZhdWx0L2Rvd25fYXJyb3dfc3F1YXJlLnBuZyI7DQp9DQoNCi5hY2NvcmRpb24tcGFnZSB7DQogICAgd2lkdGg6IDEwMCU7DQogICAgY2xpcDogdHJ1ZTsNCiAgICB3aWR0aDogMTAwJTsNCiAgICBib3JkZXItY29sb3I6ICNhYmFiYWI7DQogICAgYm9yZGVyLWJvdHRvbS13aWR0aDogMXB4Ow0KICAgIG9wYWNpdHk6IDE7DQogICAgcGFkZGluZzogNXB4Ow0KfQ0KDQouYWNjb3JkaW9uLXBhZ2U6ZXhwYW5kZWQgew0KICAgIGFuaW1hdGlvbjogYWNjb3JkaW9uQW5pbWF0ZUV4cGFuZCAwLjNzIGVhc2UgMHMgMTsNCn0NCg0KLmFjY29yZGlvbi1wYWdlOmNvbGxhcHNlZCB7DQogICAgYW5pbWF0aW9uOiBhY2NvcmRpb25BbmltYXRlQ29sbHBhc2UgMC4zcyBlYXNlIDBzIDE7DQp9DQoNCkBrZXlmcmFtZXMgYWNjb3JkaW9uQW5pbWF0ZUV4cGFuZCB7DQogICAgMCUgew0KICAgICAgICBvcGFjaXR5OiAwOw0KICAgICAgICBoZWlnaHQ6IDAlOw0KICAgIH0NCiAgICAxMDAlIHsNCiAgICAgICAgb3BhY2l0eTogMTsNCiAgICAgICAgaGVpZ2h0OiAxMDAlOw0KICAgIH0NCn0NCg0KQGtleWZyYW1lcyBhY2NvcmRpb25BbmltYXRlQ29sbHBhc2Ugew0KICAgIDAlIHsNCiAgICAgICAgb3BhY2l0eTogMTsNCiAgICAgICAgaGVpZ2h0OiAxMDAlOw0KICAgIH0NCiAgICAxMDAlIHsNCiAgICAgICAgb3BhY2l0eTogMDsNCiAgICAgICAgaGVpZ2h0OiAwJTsNCiAgICB9DQp9DQoNCi5hY2NvcmRpb24tcGFnZSAuc2Nyb2xsdmlldyB7DQogICAgYm9yZGVyOiBub25lOw0KICAgIHBhZGRpbmctdG9wOiAwOw0KICAgIHBhZGRpbmctcmlnaHQ6IDA7DQogICAgcGFkZGluZy1sZWZ0OiAwOw0KICAgIHBhZGRpbmctYm90dG9tOiAwOw0KfQ0K"},{ name : "haxeui-core/styles/dark/checkboxes.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogQ0hFQ0tCT1gNCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovDQouY2hlY2tib3ggew0KICAgIHdpZHRoOiBhdXRvOw0KICAgIGhlaWdodDogYXV0bzsNCiAgICBob3Jpem9udGFsLXNwYWNpbmc6IDRweDsNCiAgICBjdXJzb3I6IHBvaW50ZXI7DQogICAgY29sb3I6ICNiNGI0YjQ7DQp9DQoNCi5jaGVja2JveDpob3ZlciB7DQp9DQoNCi5jaGVja2JveDpkaXNhYmxlZCB7DQogICAgY3Vyc29yOiBkZWZhdWx0Ow0KICAgIGNvbG9yOiAjNTk1OTU5Ow0KfQ0KDQouY2hlY2tib3gtdmFsdWUgew0KICAgIGJvcmRlcjogMXB4IHNvbGlkICMxODFhMWI7DQogICAgYmFja2dyb3VuZC1jb2xvcjogIzI1MjcyODsNCiAgICB3aWR0aDogMTZweDsNCiAgICBoZWlnaHQ6IDE2cHg7DQogICAgdmVydGljYWwtYWxpZ246IGNlbnRlcjsNCiAgICBib3JkZXItcmFkaXVzOiAycHg7DQogICAgaWNvbjogbm9uZTsNCiAgICBmaWx0ZXI6IGRyb3Atc2hhZG93KDEsIDQ1LCAjMDAwMDAwLCAwLjIsIDIsIDIsIDEsIDMsIHRydWUpOw0KICAgIGN1cnNvcjogcG9pbnRlcjsNCn0NCg0KLmNoZWNrYm94LXZhbHVlOmhvdmVyIHsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjNDE1OTgyOw0KfQ0KDQouY2hlY2tib3gtdmFsdWU6c2VsZWN0ZWQgew0KICAgIGljb246ICJoYXhldWktY29yZS9zdHlsZXMvZGFyay9jaGVjay5wbmciOw0KfQ0KDQouY2hlY2tib3gtdmFsdWU6ZGlzYWJsZWQgew0KICAgIGJhY2tncm91bmQ6ICMyYzJmMzAgIzJjMmYzMCB2ZXJ0aWNhbDsNCiAgICBjdXJzb3I6IGRlZmF1bHQ7DQp9DQoNCi5jaGVja2JveC1sYWJlbCB7DQogICAgdmVydGljYWwtYWxpZ246IGNlbnRlcjsNCn0NCg0KLmNoZWNrYm94LWljb24gew0KICAgIGhvcml6b250YWwtYWxpZ246IGNlbnRlcjsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyOw0KICAgIGN1cnNvcjogcG9pbnRlcjsNCiAgICBvcGFjaXR5OiAxOw0KfQ0KDQouY2hlY2tib3gtaWNvbjpkaXNhYmxlZCB7DQogICAgY3Vyc29yOiBkZWZhdWx0Ow0KICAgIG9wYWNpdHk6IDAuNTsNCn0NCg"},{ name : "haxeui-core/styles/default/tableview.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogSEVBREVSDQoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLw0KLmhlYWRlciB7DQogICAgd2lkdGg6IGF1dG87DQogICAgaGVpZ2h0OiBhdXRvOw0KICAgIHNwYWNpbmc6IDA7DQp9DQoNCi5oZWFkZXIgLmNvbHVtbiB7DQogICAgYm9yZGVyLXJhZGl1czogMDsNCiAgICBpY29uLXBvc2l0aW9uOiBmYXItcmlnaHQ7DQogICAgYm9yZGVyLWxlZnQtd2lkdGg6IDA7DQogICAgdGV4dC1hbGlnbjogbGVmdDsNCn0NCg0KLmhlYWRlciAuY29sdW1uLmxhc3Qgew0KICAgIGJvcmRlci1yaWdodC13aWR0aDogMDsNCn0NCg0KLyoNCi5oZWFkZXIuc2Nyb2xsaW5nIC5jb2x1bW4ubGFzdCB7DQogICAgYm9yZGVyLXJpZ2h0LXdpZHRoOiAxcHg7DQp9DQoqLw0KDQouY29sdW1uLnNvcnRhYmxlIHsNCiAgICBpY29uOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RlZmF1bHQvc29ydGFibGVfYXJyb3dzLnBuZyI7DQogICAgaWNvbi1wb3NpdGlvbjogZmFyLXJpZ2h0Ow0KfQ0KDQouY29sdW1uLnNvcnQtYXNjIHsNCiAgICBpY29uOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RlZmF1bHQvc29ydGFibGVfYXNjLnBuZyI7DQp9DQoNCi5jb2x1bW4uc29ydC1kZXNjIHsNCiAgICBpY29uOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RlZmF1bHQvc29ydGFibGVfZGVzYy5wbmciOw0KfQ0KDQovKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqDQoqKiBUQUJMRVZJRVcNCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovDQoudGFibGV2aWV3IHsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjQUJBQkFCOw0KICAgIGJvcmRlci1yYWRpdXM6IDFweDsNCiAgICBwYWRkaW5nOiAxcHg7DQogICAgd2lkdGg6IGF1dG87DQogICAgaGVpZ2h0OiBhdXRvOw0KICAgIGJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7DQogICAgc3BhY2luZzogMDsNCn0NCg0KLnRhYmxldmlldyAudGFibGV2aWV3LWNvbnRlbnRzIHsNCiAgICBzcGFjaW5nOiAwOw0KICAgIHdpZHRoOiAxMDAlOw0KICAgIHBhZGRpbmc6IDBweDsNCn0NCg0KLnRhYmxldmlldyAuZXZlbiB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7DQogICAgY3Vyc29yOiBwb2ludGVyOw0KfQ0KDQoudGFibGV2aWV3IC5vZGQgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICNmOGY4Zjg7DQogICAgY3Vyc29yOiBwb2ludGVyOw0KfQ0KDQoudGFibGV2aWV3IC5jb21wb3VuZGl0ZW1yZW5kZXJlciAuaXRlbXJlbmRlcmVyIHsNCiAgICBoZWlnaHQ6IGF1dG87DQogICAgcGFkZGluZzogNXB4Ow0KfQ0KDQoudGFibGV2aWV3IC5ldmVuOmhvdmVyIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDllNWYyOw0KfQ0KDQoudGFibGV2aWV3IC5vZGQ6aG92ZXIgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICNkOWU1ZjI7DQp9DQoNCi50YWJsZXZpZXcgLmNvbXBvdW5kaXRlbXJlbmRlcmVyIC5sYWJlbCB7DQogICAgY29sb3I6IGJsYWNrOw0KfQ0KDQoudGFibGV2aWV3IC5jb21wb3VuZGl0ZW1yZW5kZXJlcjpzZWxlY3RlZCB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogI2E3YzRlMjsNCiAgICBjb2xvcjogd2hpdGU7DQp9DQoNCi50YWJsZXZpZXcgLmNvbXBvdW5kaXRlbXJlbmRlcmVyOnNlbGVjdGVkIC5sYWJlbCB7DQogICAgY29sb3I6IHdoaXRlOw0KfQ0K"},{ name : "haxeui-core/styles/default/down_arrow_circled.png", data : "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"},{ name : "haxeui-core/styles/default/progressbars.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogUFJPR1JFU1MNCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovDQpAa2V5ZnJhbWVzIGluZGV0ZXJtaW5hdGUgew0KICAgIDAlIHsNCiAgICAgICAgc3RhcnQ6IDA7DQogICAgICAgIGVuZDogMjU7DQogICAgfQ0KICAgIDUwJSB7DQogICAgICAgIHN0YXJ0OiA3NTsNCiAgICAgICAgZW5kOiAxMDA7DQogICAgfQ0KICAgIDEwMCUgew0KICAgICAgICBzdGFydDogMDsNCiAgICAgICAgZW5kOiAyNTsNCiAgICB9DQp9DQoNCi5wcm9ncmVzczppbmRldGVybWluYXRlIHsNCiAgICBhbmltYXRpb246IGluZGV0ZXJtaW5hdGUgMXMgZWFzZSAwcyBpbmZpbml0ZTsNCn0NCg0KLnByb2dyZXNzLXZhbHVlIHsNCiAgICBib3JkZXI6IG5vbmU7DQogICAgYm9yZGVyLXJhZGl1czogMXB4Ow0KfQ0KDQouaG9yaXpvbnRhbC1wcm9ncmVzcyB7DQogICAgYmFja2dyb3VuZDogI0YxRjFGMSAjRkZGRkZGIHZlcnRpY2FsOw0KICAgIGluaXRpYWwtd2lkdGg6IDE1MHB4Ow0KICAgIGluaXRpYWwtaGVpZ2h0OiA4cHg7DQp9DQoNCi5ob3Jpem9udGFsLXByb2dyZXNzIC5wcm9ncmVzcy12YWx1ZSB7DQogICAgYmFja2dyb3VuZDogIzk4YzRlNiAjNTQ5YmRlIHZlcnRpY2FsOw0KICAgIGhlaWdodDogMTAwJTsNCn0NCg0KLnZlcnRpY2FsLXByb2dyZXNzIHsNCiAgICBiYWNrZ3JvdW5kOiAjRjFGMUYxICNGRkZGRkYgaG9yaXpvbnRhbDsNCiAgICBpbml0aWFsLXdpZHRoOiA4cHg7DQogICAgaW5pdGlhbC1oZWlnaHQ6IDE1MHB4Ow0KfQ0KDQoudmVydGljYWwtcHJvZ3Jlc3MgLnByb2dyZXNzLXZhbHVlIHsNCiAgICBiYWNrZ3JvdW5kOiAjOThjNGU2ICM1NDliZGUgaG9yaXpvbnRhbDsNCiAgICB3aWR0aDogMTAwJTsNCn0NCg0K"},{ name : "haxeui-core/styles/default/tiny-close-button.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TpVUrCnYQcchQXbQgKuIoVSyChdJWaNXB5NIvaNKQpLg4Cq4FBz8Wqw4uzro6uAqC4AeIm5uToouU+L+k0CLWg+N+vLv3uHsHCLUSU82OCUDVLCMRjYjpzKroe0UX/OjHGHokZuqx5GIKbcfXPTx8vQvzrPbn/hy9StZkgEcknmO6YRFvEM9sWjrnfeIgK0gK8TnxuEEXJH7kuuzyG+e8wwLPDBqpxDxxkFjMt7DcwqxgqMTTxCFF1ShfSLuscN7irJYqrHFP/sJAVltJcp3mMKJYQgxxiJBRQRElWAjTqpFiIkH7kTb+IccfJ5dMriIYORZQhgrJ8YP/we9uzdzUpJsUiACdL7b9MQL4doF61ba/j227fgJ4n4Errekv14DZT9KrTS10BPRtAxfXTU3eAy53gMEnXTIkR/LSFHI54P2MvikDDNwC3Wtub419nD4AKepq+QY4OARG85S93ubd/tbe/j3T6O8HZkByogoVjmQAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQflCQgQLBKUV9OZAAAA9klEQVQY012PTU4CQRCFv6qhh7gWdy6N0XtwAhPwEqzMzIJZ9QYIybAh3sEEPAEXgURPQGCv89PlwjQitavUq/e+J36+vA1qU5X6xWfZgbMZT5c3ztmiTdqxmjIB+mbp2pdl75+oY2ugn7TJRMbT1+vUhZVhjxifTW2DtNu0IbgVwoPAh1ANBMCXZS8eMHaAItwLsq1qHc6K0VH+os6cgejk83wPoFHYTb/EzE6PZkhVudOuETwE9/7LJFuMHcJdx8lbLCjnfDHuu75qLwuqWbqITlWdPPk838+K0VGkej45pzLXJmkKYBPbRSafZQfVeghsNGjxAx6fgSyXIE/yAAAAAElFTkSuQmCC"},{ name : "haxeui-core/styles/default/textinputs.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogVEVYVCBGSUVMRA0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi50ZXh0ZmllbGQgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7DQogICAgY29sb3I6ICM0NDQ0NDQ7DQogICAgYm9yZGVyOiAxcHggc29saWQgI0FCQUJBQjsNCiAgICBib3JkZXItcmFkaXVzOiAycHg7DQogICAgcGFkZGluZzogNXB4IDVweDsNCiAgICBmaWx0ZXI6IGRyb3Atc2hhZG93KDEsIDQ1LCAjODg4ODg4LCAwLjIsIDEsIDEsIDEsIDMsIHRydWUpOw0KICAgIGluaXRpYWwtd2lkdGg6IDE1MHB4Ow0KICAgIGhlaWdodDogYXV0bzsNCiAgICBzcGFjaW5nOiA1cHg7DQogICAgaWNvbi1wb3NpdGlvbjogcmlnaHQ7DQogICAgY29udGVudC10eXBlOiBhdXRvOw0KfQ0KDQoudGV4dGZpZWxkOmFjdGl2ZSB7DQogICAgYm9yZGVyOiAxcHggc29saWQgIzIxNkFBRTsNCn0NCg0KLnRleHRmaWVsZDplbXB0eSB7DQogICAgY29sb3I6ICNBMEEwQTA7DQp9DQoNCi50ZXh0ZmllbGQ6ZGlzYWJsZWQgew0KICAgIGNvbG9yOiAjOTA5MDkwOw0KICAgIGJhY2tncm91bmQ6ICNENEQ0RDQgI0NDQ0NDQyB2ZXJ0aWNhbDsNCn0NCg0KLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogVEVYVCBBUkVBDQoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLw0KLnRleHRhcmVhIHsNCiAgICBjb2xvcjogIzQ0NDQ0NDsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjQUJBQkFCOw0KICAgIGJvcmRlci1yYWRpdXM6IDJweDsNCiAgICBwYWRkaW5nOiAxcHg7DQogICAgZmlsdGVyOiBkcm9wLXNoYWRvdygxLCA0NSwgIzg4ODg4OCwgMC4yLCAxLCAxLCAxLCAzLCB0cnVlKTsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsNCiAgICBpbml0aWFsLXdpZHRoOiAxNTBweDsNCiAgICBpbml0aWFsLWhlaWdodDogMTAwcHg7DQogICAgY29udGVudC10eXBlOiBhdXRvOw0KfQ0KDQoudGV4dGFyZWE6YWN0aXZlIHsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjMjE2QUFFOw0KfQ0KDQoudGV4dGFyZWE6ZW1wdHkgew0KICAgIGNvbG9yOiAjQTBBMEEwOw0KfQ0KDQoudGV4dGFyZWE6ZGlzYWJsZWQgew0KICAgIGNvbG9yOiAjOTA5MDkwOw0KICAgIGJhY2tncm91bmQ6ICNENEQ0RDQgI0NDQ0NDQyB2ZXJ0aWNhbDsNCn0"},{ name : "haxeui-core/styles/default/dialogs/cross-circle-small.png", data : "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABFFBMVEUAAABSUlJ7e4CdnZ1AQEAREREzMzM/Pz8lJSVRUVGmprI6Oj0LCwtqampycnILCwtVVVU6OjpFRUUmJiZVVVVRUVFISEgNDQ1UVFSqqqyfn6K/v76zs7LIyMjHx8dRUVNQUFH////c3NzQ0NHm5uba2uvq6urW1tbeVlbNRUWiExPu7u7i4uLf39/Nzc3XUFCuISGwEhKsERHW1uTQ0NvAwMHTqKi9l6DEmpm5kZXGc3Pyamq2ZGTBYWHpYGCuXl+8Xl2iV12pTlCjSk3RSUm9QkKtNTWpMzOIGRrUERHQERHFERG4ERG2ERGdERGUEBD39/fY2NjJydDDw8PDPT3JOzu4Li62Li7BKiqrGhqxGRm0FxcilCapAAAAIXRSTlMAPq6ibVFHGAkH3JKHfHh0Y2FcXFVNQh0V19fU1NLShoYJuWjGAAAA5UlEQVQY0yXI1XbDMBBF0ZExzFSuZNWt7RjDzEzl0P//R6zkPMyafYFVQJlEIoMKcCuIYk8qpepzDAWvzvK02pxMmtUin2UL4s3OuNtqdbUO4RGAHDX7Nv7ww3b/KypD7qGuYYw1dn7rjzlIkbbt4E9qErLdt60UCMp0/K9byjvZ6s70RwDBmv25nu+i551mFQGSSu+wZqbq+tyrJEG6azi+XVc1jGPjXgL5RRnqZLNcbgx9+P0qA0hcebRbLRar3ajMSQAQSHOl2mA+H9RKXDoAbBHDoTe/UFhkZuXFeCQSF/PsvwDvMCJpV4jhMQAAAABJRU5ErkJggg"},{ name : "haxeui-core/styles/default/steppers.css", data : "Lm51bWJlcnN0ZXBwZXIgew0KICAgIHBhZGRpbmc6IDFweDsNCiAgICBzcGFjaW5nOiAwOw0KfQ0KDQouc3RlcHBlciB7DQogICAgc3BhY2luZzogMDsNCn0NCg0KLnN0ZXBwZXItYnV0dG9uIHsNCiAgICBwYWRkaW5nOiAzcHg7DQogICAgcGFkZGluZy10b3A6IDRweDsNCiAgICBwYWRkaW5nLWJvdHRvbTogNHB4Ow0KICAgIGJvcmRlci1yYWRpdXM6IDA7DQogICAgYm9yZGVyOiBub25lOw0KICAgIGJhY2tncm91bmQtY29sb3I6ICNFNkU2RTY7DQogICAgb3BhY2l0eTogMTsNCn0NCg0KLnN0ZXBwZXItYnV0dG9uOmhvdmVyIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjFGMUYxOw0KfQ0KDQouc3RlcHBlci1idXR0b246ZG93biB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogI0MyQzJDMjsNCn0NCg0KLnN0ZXBwZXItYnV0dG9uOmRpc2FibGVkIHsNCiAgICBvcGFjaXR5OiAwLjU7DQogICAgYmFja2dyb3VuZC1jb2xvcjogI0NDQ0NDQzsNCn0NCg0KLnN0ZXBwZXItaW5jIHsNCiAgICBpY29uOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RlZmF1bHQvdXBfYXJyb3cucG5nIjsNCn0NCg0KLnN0ZXBwZXItZGVpbmMgew0KICAgIGljb246ICJoYXhldWktY29yZS9zdHlsZXMvZGVmYXVsdC9kb3duX2Fycm93LnBuZyI7DQp9DQoNCi5zdGVwcGVyLWluYzpkb3duIHsNCiAgICBpY29uOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RlZmF1bHQvdXBfYXJyb3dfd2hpdGUucG5nIjsNCn0NCg0KLnN0ZXBwZXItZGVpbmM6ZG93biB7DQogICAgaWNvbjogImhheGV1aS1jb3JlL3N0eWxlcy9kZWZhdWx0L2Rvd25fYXJyb3dfd2hpdGUucG5nIjsNCn0NCg0KLnN0ZXBwZXItdGV4dGZpZWxkLCAuc3RlcHBlci10ZXh0ZmllbGQ6YWN0aXZlIHsNCiAgICBib3JkZXI6IG5vbmU7DQogICAgd2lkdGg6IDEwMCU7DQogICAgcGFkZGluZzogNHB4Ow0KICAgIHBhZGRpbmctdG9wOiA1cHg7DQogICAgcGFkZGluZy1ib3R0b206IDNweDsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyOw0KICAgIGZpbHRlcjogZHJvcC1zaGFkb3coMSwgNDUsICM4ODg4ODgsIDAuMiwgMSwgMSwgMSwgMywgdHJ1ZSk7DQogICAgYmFja2dyb3VuZC1jb2xvcjogbm9uZTsNCn0NCg0KLnN0ZXBwZXItc3RlcCB7DQogICAgaGVpZ2h0OiAxMDAlOw0KfQ0KDQouc3RlcHBlci1zdGVwIC5zdGVwcGVyLWluYywgLnN0ZXBwZXItc3RlcCAuc3RlcHBlci1kZWluYyB7DQogICAgaGVpZ2h0OiA1MCU7DQp9DQoNCi5udW1iZXItc3RlcHBlciB7DQogICAgaW5pdGlhbC13aWR0aDogNjBweDsNCn0"},{ name : "haxeui-core/styles/default/up_down_arrows.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAcAAAAJCAIAAABxOqH0AAAABnRSTlMA7QAcACSX3bo6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAeklEQVQImWN8K6PCwMDAwMDQHhFQuWIDhM0EF2JgYOiMCkKIQoQgoDcujIGBgZkhI+X///9MTEyMjIwMDAxMTEynjPQY4eYiAxaIFjhgZmZmYGBg3nD/+XF9bQifiYmJgYGhYP5yJgYGhuJFqyBKIEIIl0E4EJKBgQEAK1sc1cc2psYAAAAASUVORK5CYII"},{ name : "haxeui-core/styles/dark/option.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH5QEaCgw0CA+AtQAAAINJREFUGNN9zDEKwlAQRdE781egfdYQV6FgM0WWYpNNSPYRm2ktsgfb9LYSsE7+WAQE4ccDr7rwBMDdqyB1CEcAgkElt2Y2irtXoelBsOfXJLHUGqSuEAF2SLrq97Yg4KT8F0owbHe5q0pugalQX3nWi5rZKLHUAjfgvU76PKdD05yfH881KnTRsBd3AAAAAElFTkSuQmCC"},{ name : "haxeui-core/styles/dark/up_arrow_white.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAIAAADNpLIqAAAABnRSTlMA7QAcACSX3bo6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAK0lEQVQImWN8K6PCwMDAwMAg9Pj2O1lVCJsJLgQnoaJwDpzN+P//fwYMAADCtw5xBtAKnQAAAABJRU5ErkJggg"},{ name : "haxeui-core/styles/default/dialogs/information.png", data : "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"},{ name : "haxeui-core/styles/dark/dialogs.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogRElBTE9HUw0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi5kaWFsb2cgew0KICAgIGJvcmRlcjogMXB4IHNvbGlkICMxODFhMWI7DQogICAgZmlsdGVyOiBkcm9wLXNoYWRvdygxLCA0NSwgIzAwMDAwMCwgMC4yLCAzMCwgMiwgMSwgMywgZmFsc2UpOw0KICAgIGJvcmRlci1yYWRpdXM6IDJweDsNCiAgICB3aWR0aDogYXV0bzsNCiAgICBoZWlnaHQ6IGF1dG87DQogICAgYmFja2dyb3VuZC1jb2xvcjogIzJjMmYzMDsNCiAgICBwYWRkaW5nOiAxcHg7DQp9DQoNCi5kaWFsb2ctY29udGFpbmVyIHsNCiAgICBzcGFjaW5nOiAwOw0KfQ0KDQouZGlhbG9nLXRpdGxlIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2QzZjQxOw0KICAgIHBhZGRpbmc6IDVweDsNCiAgICBib3JkZXItYm90dG9tLXdpZHRoOiAxcHg7DQogICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogIzE4MWExYjsNCn0NCg0KLmRpYWxvZy10aXRsZS1sYWJlbCB7DQogICAgd2lkdGg6IDEwMCU7DQogICAgdmVydGljYWwtYWxpZ246IGNlbnRlcjsNCiAgICBjb2xvcjogI2Q0ZDRkNDsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogImNlbnRlciI7DQp9DQoNCi5kaWFsb2ctY29udGVudCB7DQogICAgcGFkZGluZzogNXB4Ow0KfQ0KDQouZGlhbG9nLWZvb3Rlci1jb250YWluZXIgew0KICAgIGJvcmRlci10b3Atd2lkdGg6IDFweDsNCiAgICBib3JkZXItdG9wLWNvbG9yOiAjMTgxYTFiOw0KICAgIGJhY2tncm91bmQtY29sb3I6ICMzZDNmNDE7DQp9DQoNCi5kaWFsb2ctZm9vdGVyIHsNCiAgICBwYWRkaW5nOiA1cHg7DQogICAgaG9yaXpvbnRhbC1hbGlnbjogcmlnaHQ7DQp9DQoNCi5kaWFsb2ctY2xvc2UtYnV0dG9uIHsNCiAgICByZXNvdXJjZTogImhheGV1aS1jb3JlL3N0eWxlcy9kZWZhdWx0L3NtYWxsLWNsb3NlLWJ1dHRvbi5wbmciOw0KICAgIHZlcnRpY2FsLWFsaWduOiAiY2VudGVyIjsNCiAgICBjdXJzb3I6ICJwb2ludGVyIjsNCn0NCg0KLmRpYWxvZyAjaWNvbkltYWdlLmluZm8gew0KICAgIHJlc291cmNlOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RlZmF1bHQvZGlhbG9ncy9pbmZvcm1hdGlvbi5wbmciOw0KfQ0KDQouZGlhbG9nICNpY29uSW1hZ2UucXVlc3Rpb24gew0KICAgIHJlc291cmNlOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RlZmF1bHQvZGlhbG9ncy9xdWVzdGlvbi5wbmciOw0KfQ0KDQouZGlhbG9nICNpY29uSW1hZ2Uud2FybmluZyB7DQogICAgcmVzb3VyY2U6ICJoYXhldWktY29yZS9zdHlsZXMvZGVmYXVsdC9kaWFsb2dzL2V4Y2xhbWF0aW9uLnBuZyI7DQp9DQoNCi5kaWFsb2cgI2ljb25JbWFnZS5lcnJvciB7DQogICAgcmVzb3VyY2U6ICJoYXhldWktY29yZS9zdHlsZXMvZGVmYXVsdC9kaWFsb2dzL2Nyb3NzLWNpcmNsZS5wbmciOw0KfQ0KDQoubWVzc2FnZWJveCB7DQogICAgaW5pdGlhbC13aWR0aDogMzAwcHg7DQp9"},{ name : "haxeui-core/styles/default/switches.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogU1dJVENIIChERUZBVUxUKQ0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi5zd2l0Y2ggew0KICAgIHdpZHRoOiBhdXRvOw0KICAgIGhlaWdodDogYXV0bzsNCiAgICBob3Jpem9udGFsLXNwYWNpbmc6IDVweDsNCn0NCg0KLnN3aXRjaC1sYWJlbCB7DQogICAgY29sb3I6IGJsYWNrOw0KICAgIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7DQp9DQoNCi5zd2l0Y2gtYnV0dG9uLXN1YiB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjQUJBQkFCOw0KICAgIGJvcmRlci1yYWRpdXM6IDJweDsNCiAgICBjdXJzb3I6IHBvaW50ZXI7DQogICAgcGFkZGluZzogMHB4Ow0KICAgIGluaXRpYWwtd2lkdGg6IDQwcHg7DQogICAgaW5pdGlhbC1oZWlnaHQ6IDIwcHg7DQogICAgZmlsdGVyOiBkcm9wLXNoYWRvdygxLCA0NSwgIzg4ODg4OCwgMC4zLCAxLCAxLCAxLCAzLCB0cnVlKTsNCn0NCg0KLnN3aXRjaC1idXR0b24tc3ViIC5idXR0b24gew0KICAgIGhlaWdodDogMTAwJTsNCiAgICB3aWR0aDogNTAlOw0KICAgIGJvcmRlci1yYWRpdXM6IDJweDsNCiAgICBmaWx0ZXI6IG5vbmU7DQp9DQoNCi5zd2l0Y2gtYnV0dG9uLXN1Yi1leHRyYSB7DQogICAgaGVpZ2h0OiAwOw0KICAgIHdpZHRoOiAwOw0KICAgIGJhY2tncm91bmQtY29sb3I6IG5vbmU7DQogICAgYm9yZGVyOiBub25lOw0KICAgIGZpbHRlcjogbm9uZTsNCn0NCg0KQGtleWZyYW1lcyBzd2l0Y2hBbmltYXRlU2VsZWN0ZWQgew0KICAgIDAlIHsNCiAgICAgICAgcG9zOiAwOw0KICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGOw0KICAgIH0NCiAgICAxMDAlIHsNCiAgICAgICAgcG9zOiAxMDA7DQogICAgICAgIGJhY2tncm91bmQtY29sb3I6ICM5OGM0ZTY7DQogICAgfQ0KfQ0KDQouc3dpdGNoLWJ1dHRvbi1zdWI6c2VsZWN0ZWQgew0KICAgIGFuaW1hdGlvbjogc3dpdGNoQW5pbWF0ZVNlbGVjdGVkIDAuMnMgZWFzZSAwcyAxOw0KfQ0KDQouc3dpdGNoLWJ1dHRvbi1zdWI6dW5zZWxlY3RlZCB7DQogICAgYW5pbWF0aW9uOiBzd2l0Y2hBbmltYXRlU2VsZWN0ZWQgMC4ycyBlYXNlIDBzIDEgcmV2ZXJzZSBiYWNrd2FyZHM7DQp9DQoNCi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCioqIFNXSVRDSCAoQ0lSQ0xFKQ0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi5jaXJjbGUtc3dpdGNoIC5zd2l0Y2gtYnV0dG9uLXN1YiB7DQogICAgYm9yZGVyOiBub25lOw0KICAgIGZpbHRlcjogbm9uZTsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBub25lOw0KICAgIGJvcmRlci1yYWRpdXM6IDJweDsNCiAgICBjdXJzb3I6IHBvaW50ZXI7DQogICAgcGFkZGluZzogMHB4Ow0KICAgIGluaXRpYWwtaGVpZ2h0OiAyMHB4Ow0KICAgIGluaXRpYWwtd2lkdGg6IDQwcHg7DQp9DQoNCi5jaXJjbGUtc3dpdGNoIC5zd2l0Y2gtYnV0dG9uLXN1Yi1leHRyYSB7DQogICAgaGVpZ2h0OiAxNHB4Ow0KICAgIHdpZHRoOiAxMDAlOw0KICAgIGJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7DQogICAgYm9yZGVyOiAxcHggc29saWQgI0FCQUJBQjsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyOw0KICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7DQogICAgZmlsdGVyOiBkcm9wLXNoYWRvdygxLCA0NSwgIzg4ODg4OCwgMC4zLCAxLCAxLCAxLCAzLCB0cnVlKTsNCn0NCg0KLmNpcmNsZS1zd2l0Y2ggLnN3aXRjaC1idXR0b24tc3ViIC5idXR0b24gew0KICAgIHdpZHRoOiAyMHB4Ow0KICAgIGhlaWdodDogMjBweDsNCiAgICBib3JkZXItcmFkaXVzOiA1MHB4Ow0KICAgIGZpbHRlcjogZHJvcC1zaGFkb3coMSwgNDUsICMwMDAwMDAsIDAuMiwgMCwgMCwgMCwgMywgZmFsc2UpOw0KfQ0KDQpAa2V5ZnJhbWVzIHN3aXRjaEFuaW1hdGVTZWxlY3RlZENpcmNsZSB7DQogICAgMCUgew0KICAgICAgICBwb3M6IDA7DQogICAgfQ0KICAgIDEwMCUgew0KICAgICAgICBwb3M6IDEwMDsNCiAgICB9DQp9DQoNCi5jaXJjbGUtc3dpdGNoIC5zd2l0Y2gtYnV0dG9uLXN1YjpzZWxlY3RlZCB7DQogICAgYW5pbWF0aW9uOiBzd2l0Y2hBbmltYXRlU2VsZWN0ZWRDaXJjbGUgMC4ycyBlYXNlIDBzIDE7DQp9DQogDQouY2lyY2xlLXN3aXRjaCAuc3dpdGNoLWJ1dHRvbi1zdWI6dW5zZWxlY3RlZCB7DQogICAgYW5pbWF0aW9uOiBzd2l0Y2hBbmltYXRlU2VsZWN0ZWRDaXJjbGUgMC4ycyBlYXNlIDBzIDEgcmV2ZXJzZSBiYWNrd2FyZHM7DQp9DQoNCg0KQGtleWZyYW1lcyBzd2l0Y2hBbmltYXRlRXh0cmFTZWxlY3RlZENpcmNsZSB7DQogICAgMCUgew0KICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGOw0KICAgIH0NCiAgICAxMDAlIHsNCiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzk4YzRlNjsNCiAgICB9DQp9DQoNCi5jaXJjbGUtc3dpdGNoIC5zd2l0Y2gtYnV0dG9uLXN1Yi1leHRyYTpzZWxlY3RlZCB7DQogICAgYW5pbWF0aW9uOiBzd2l0Y2hBbmltYXRlRXh0cmFTZWxlY3RlZENpcmNsZSAwLjJzIGVhc2UgMHMgMTsNCn0NCg0KLmNpcmNsZS1zd2l0Y2ggLnN3aXRjaC1idXR0b24tc3ViLWV4dHJhOnVuc2VsZWN0ZWQgew0KICAgIGFuaW1hdGlvbjogc3dpdGNoQW5pbWF0ZUV4dHJhU2VsZWN0ZWRDaXJjbGUgMC4ycyBlYXNlIDBzIDEgcmV2ZXJzZSBiYWNrd2FyZHM7DQp9DQoNCi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCioqIFNXSVRDSCAoUElMTCkNCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovDQoucGlsbC1zd2l0Y2ggLnN3aXRjaC1idXR0b24tc3ViIHsNCiAgICBib3JkZXItcmFkaXVzOiAyMHB4Ow0KICAgIGluaXRpYWwtd2lkdGg6IDQwcHg7DQogICAgaW5pdGlhbC1oZWlnaHQ6IDIwcHg7DQogICAgcGFkZGluZzogMHB4Ow0KICAgIGJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7DQogICAgYm9yZGVyOiAxcHggc29saWQgI0FCQUJBQjsNCiAgICBjdXJzb3I6IHBvaW50ZXI7DQogICAgZmlsdGVyOiBkcm9wLXNoYWRvdygxLCA0NSwgIzg4ODg4OCwgMC4zLCAxLCAxLCAxLCAzLCB0cnVlKTsNCn0NCg0KLnBpbGwtc3dpdGNoIC5zd2l0Y2gtYnV0dG9uLXN1YiAuYnV0dG9uIHsNCiAgICBib3JkZXItcmFkaXVzOiA1MHB4Ow0KICAgIHdpZHRoOiAyMHB4Ow0KICAgIGhlaWdodDogMjBweDsNCiAgICBmaWx0ZXI6IG5vbmU7DQp9DQoNCi5waWxsLXN3aXRjaCAuc3dpdGNoLWJ1dHRvbi1zdWItZXh0cmEgew0KICAgIGhlaWdodDogMDsNCiAgICB3aWR0aDogMDsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBub25lOw0KICAgIGJvcmRlcjogbm9uZTsNCiAgICBmaWx0ZXI6IG5vbmU7DQp9DQoNCkBrZXlmcmFtZXMgc3dpdGNoQW5pbWF0ZVNlbGVjdGVkUGlsbCB7DQogICAgMCUgew0KICAgICAgICBwb3M6IDA7DQogICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7DQogICAgfQ0KICAgIDEwMCUgew0KICAgICAgICBwb3M6IDEwMDsNCiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzk4YzRlNjsNCiAgICB9DQp9DQoNCi5waWxsLXN3aXRjaCAuc3dpdGNoLWJ1dHRvbi1zdWI6c2VsZWN0ZWQgew0KICAgIGFuaW1hdGlvbjogc3dpdGNoQW5pbWF0ZVNlbGVjdGVkUGlsbCAwLjJzIGVhc2UgMHMgMTsNCn0NCg0KLnBpbGwtc3dpdGNoIC5zd2l0Y2gtYnV0dG9uLXN1Yjp1bnNlbGVjdGVkIHsNCiAgICBhbmltYXRpb246IHN3aXRjaEFuaW1hdGVTZWxlY3RlZFBpbGwgMC4ycyBlYXNlIDBzIDEgcmV2ZXJzZSBiYWNrd2FyZHM7DQp9DQo"},{ name : "haxeui-core/styles/dark/right_arrow.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAIAAACgB3uHAAAABnRSTlMA7QAcACSX3bo6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVQImWPYsmXLWxkVCGJiYGA4PmMCAwMDAwMDE4SC8Bm3bNnCAANMcJZlRgETnAWVgbAYGBgAg4cO3PCuD3sAAAAASUVORK5CYII"},{ name : "styles/main.css", data : ""},{ name : "haxeui-core/styles/default/down_arrow_white.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAIAAADNpLIqAAAABnRSTlMA7QAcACSX3bo6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAJElEQVQImWP8//8/AwZgeieriib0TlaVCUIhCzEwMDAhc+DSAPKbCiUI9YmvAAAAAElFTkSuQmCC"},{ name : "haxeui-core/styles/default/transparent_px.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAABnRSTlMA7QAcACSX3bo6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAADElEQVQImWN4K6MCAAMnAS7qrFRjAAAAAElFTkSuQmCC"},{ name : "haxeui-core/styles/dark/down_arrow.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAIAAADNpLIqAAAABnRSTlMA7QAcACSX3bo6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAJElEQVQImWPcsmULAwZgsswoQBOyzChgglDIQgwMDEzIHLg0AIkLCIq+gFfgAAAAAElFTkSuQmCC"},{ name : "haxeui-core/styles/dark/sidebars.css", data : "LnNpZGViYXItbW9kYWwtYmFja2dyb3VuZCB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7DQogICAgb3BhY2l0eTogMC42MDsNCn0NCg0KLnNpZGViYXIgew0KICAgIG1hcmdpbjogNTBweDsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2QzZjQxOw0KICAgIHBhZGRpbmc6IDVweDsNCiAgICBmaWx0ZXI6IGRyb3Atc2hhZG93KDEsIDQ1LCAjMDAwMDAwLCAwLjEsIDMwLCAyLCAxLCAzLCBmYWxzZSk7DQp9DQogICAgDQouc2lkZWJhcjpsZWZ0IHsNCiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjMTgxYTFiOw0KfQ0KDQouc2lkZWJhcjpyaWdodCB7DQogICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjMTgxYTFiOw0KfQ0KDQouc2lkZWJhcjp0b3Agew0KICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMTgxYTFiOw0KfQ0KDQouc2lkZWJhcjpib3R0b20gew0KICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjMTgxYTFiOw0KfQ0KDQouc2lkZWJhcjpsZWZ0ICNjbG9zZVNpZGVCYXIgew0KICAgIHJlc291cmNlOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RhcmsvbGVmdF9hcnJvd19jaXJjbGVkLnBuZyAiOw0KICAgIGN1cnNvcjogcG9pbnRlcjsNCn0NCg0KLnNpZGViYXI6cmlnaHQgI2Nsb3NlU2lkZUJhciB7DQogICAgcmVzb3VyY2U6ICJoYXhldWktY29yZS9zdHlsZXMvZGFyay9yaWdodF9hcnJvd19jaXJjbGVkLnBuZyAiOw0KICAgIGN1cnNvcjogcG9pbnRlcjsNCn0NCg0KLnNpZGViYXI6dG9wICNjbG9zZVNpZGVCYXIgew0KICAgIHJlc291cmNlOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RhcmsvdXBfYXJyb3dfY2lyY2xlZC5wbmcgIjsNCiAgICBjdXJzb3I6IHBvaW50ZXI7DQp9DQoNCi5zaWRlYmFyOmJvdHRvbSAjY2xvc2VTaWRlQmFyIHsNCiAgICByZXNvdXJjZTogImhheGV1aS1jb3JlL3N0eWxlcy9kYXJrL2Rvd25fYXJyb3dfY2lyY2xlZC5wbmcgIjsNCiAgICBjdXJzb3I6IHBvaW50ZXI7DQp9"},{ name : "haxeui-core/styles/default/sizer_gripper_vertical.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAQAAAAKCAIAAAAcmWhZAAAABnRSTlMA7QAcACSX3bo6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAH0lEQVQImWN8K6PCAANMDAwMk5KjJyVHQzlwwEg7ZQCDgwyl+MMKdgAAAABJRU5ErkJggg"},{ name : "haxeui-core/styles/dark/menus.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogTUVOVUJBUg0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi5tZW51YmFyIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM0QzRjQxOw0KICAgIHBhZGRpbmc6IDVweDsNCiAgICBib3JkZXItYm90dG9tLXdpZHRoOiAxcHg7DQogICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogIzE4MWExYjsNCiAgICBmaWx0ZXI6IGRyb3Atc2hhZG93KDIsIDQ1LCAjMDAwMDAwLCAwLjE1LCA2LCAxLCAzMCwgMzUsIGZhbHNlKTsNCn0NCg0KLm1lbnViYXItYnV0dG9uIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM0QzRjQxOw0KICAgIGJvcmRlcjogbm9uZTsNCiAgICBjb2xvcjogI2I0YjRiNDsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyOw0KfQ0KDQoubWVudWJhci1idXR0b246aG92ZXIgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICM0MTU5ODI7DQogICAgY29sb3I6IHdoaXRlOw0KfQ0KDQoubWVudWJhci1idXR0b246ZG93biB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogIzM5M2IzYzsNCiAgICBjb2xvcjogI2Q0ZDRkNDsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjMTgxYTFiOw0KICAgIGJvcmRlci1ib3R0b20td2lkdGg6IDBweDsNCiAgICBib3JkZXItYm90dG9tLXNpemU6IDBweDsNCn0NCg0KLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogTUVOVQ0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi5tZW51IHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzkzYjNjOw0KICAgIHBhZGRpbmc6IDFweDsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjMTgxYTFiOw0KICAgIGZpbHRlcjogZHJvcC1zaGFkb3coMiwgNDUsICMwMDAwMDAsIDAuMTUsIDYsIDEsIDMwLCAzNSwgZmFsc2UpOw0KICAgIHNwYWNpbmc6IDA7DQogICAgd2lkdGg6IDIwMHB4Ow0KfQ0KDQoubWVudS5leHBhbmRlZCB7DQogICAgYm9yZGVyLXRvcC13aWR0aDogMHB4Ow0KICAgIGJvcmRlci10b3Atc2l6ZTogMHB4Ow0KfQ0KDQoubWVudS1maWxsZXIgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICMxODFhMWI7DQogICAgaGVpZ2h0OiAxcHg7DQp9DQoNCi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCioqIE1FTlVJVEVNUw0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi5tZW51aXRlbSB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogIzM5M2IzYzsNCiAgICB3aWR0aDogMTAwJTsNCiAgICBwYWRkaW5nOiA1cHg7DQogICAgY3Vyc29yOiBwb2ludGVyOw0KfQ0KDQoubWVudWl0ZW0tbGFiZWwsIC5tZW51aXRlbS1jaGVja2JveCwgLm1lbnVpdGVtLW9wdGlvbmJveCwgLm1lbnVpdGVtLXNob3J0Y3V0LWxhYmVsIHsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyOw0KfQ0KDQoubWVudWl0ZW0tc2hvcnRjdXQtbGFiZWwgew0KICAgIHRleHQtYWxpZ246IHJpZ2h0Ow0KICAgIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7DQogICAgaG9yaXpvbnRhbC1hbGlnbjogcmlnaHQ7DQp9DQoNCi5tZW51aXRlbS1pY29uIHsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyOw0KfQ0KDQoubWVudWl0ZW06aG92ZXIsIC5tZW51aXRlbTpzZWxlY3RlZCB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogIzQxNTk4MjsNCn0NCg0KLm1lbnVpdGVtIC5sYWJlbDpob3ZlciwgLm1lbnVpdGVtIC5sYWJlbDpzZWxlY3RlZCB7DQogICAgY29sb3I6IHdoaXRlOw0KfQ0KDQoubWVudWl0ZW0tZXhwYW5kYWJsZSB7DQogICAgcmVzb3VyY2U6ICJoYXhldWktY29yZS9zdHlsZXMvZGFyay9yaWdodF9hcnJvdy5wbmciOw0KICAgIHZlcnRpY2FsLWFsaWduOiAiY2VudGVyIjsNCn0NCg0KLm1lbnVzZXBhcmF0b3Igew0KICAgIGhlaWdodDogMXB4Ow0KICAgIHdpZHRoOiAxMDAlOw0KICAgIGJhY2tncm91bmQtY29sb3I6ICMyNTI3Mjg7DQogICAgaG9yaXpvbnRhbC1hbGlnbjogImNlbnRlciI7DQp9DQo"},{ name : "haxeui-core/styles/default/left_arrow_white.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAIAAACgB3uHAAAABnRSTlMA7QAcACSX3bo6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVQImWN8K6PCwMDAwMAg9Pg2E5zFwMDABGcxMDAw/v//nwEGmN7JqiI4DAwMcD7UAAgfAMkKDTd2MVgoAAAAAElFTkSuQmCC"},{ name : "haxeui-core/styles/default/rules.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogUlVMRQ0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi5ydWxlIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjREREREREOw0KfQ0KDQouaG9yaXpvbnRhbC1ydWxlIHsNCiAgICBoZWlnaHQ6IDFweDsNCiAgICB3aWR0aDogMTAwJTsNCiAgICBob3Jpem9udGFsLWFsaWduOiAiY2VudGVyIjsNCn0NCg0KLnZlcnRpY2FsLXJ1bGUgew0KICAgIGhlaWdodDogMTAwJTsNCiAgICB3aWR0aDogMXB4Ow0KICAgIHZlcnRpY2FsLWFsaWduOiAiY2VudGVyIjsNCn0"},{ name : "haxeui-core/styles/native/main.css", data : "KiB7DQogICAgbmF0aXZlOiB0cnVlOw0KfQ0KDQouaHNsaWRlcjpuYXRpdmUsIC52c2xpZGVyOm5hdGl2ZSwgLmhwcm9ncmVzczpuYXRpdmUsIC52cHJvZ3Jlc3M6bmF0aXZlIHsNCiAgICB3aWR0aDogYXV0bzsNCiAgICBoZWlnaHQ6IGF1dG87DQogICAgYmFja2dyb3VuZDogbm9uZTsNCiAgICBib3JkZXI6IG5vbmU7DQogICAgYm9yZGVyLXJhZGl1czogbm9uZTsNCn0NCg0KLmJ1dHRvbjpuYXRpdmUsIC5kcm9wZG93bjpuYXRpdmUgew0KICAgIGJhY2tncm91bmQ6IG5vbmU7DQogICAgYm9yZGVyOiBub25lOw0KICAgIGJvcmRlci1yYWRpdXM6IG5vbmU7DQogICAgY29sb3I6IG5vbmU7DQp9DQoNCi50ZXh0ZmllbGQ6bmF0aXZlLCAudGV4dGFyZWE6bmF0aXZlIHsNCiAgICBiYWNrZ3JvdW5kOiBub25lOw0KICAgIGJvcmRlcjogbm9uZTsNCiAgICBib3JkZXItcmFkaXVzOiBub25lOw0KICAgIGNvbG9yOiBub25lOw0KICAgIGZpbHRlcjogbm9uZTsNCn0NCg0KLmRpYWxvZzpuYXRpdmUgew0KICAgIHBhZGRpbmctdG9wOiAwcHg7DQp9"},{ name : "haxeui-core/styles/dark/tableview.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogSEVBREVSDQoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLw0KLmNvbHVtbi5zb3J0YWJsZSB7DQogICAgaWNvbjogImhheGV1aS1jb3JlL3N0eWxlcy9kZWZhdWx0L3NvcnRhYmxlX2Fycm93cy5wbmciOw0KICAgIGljb24tcG9zaXRpb246IGZhci1yaWdodDsNCn0NCg0KLmNvbHVtbi5zb3J0LWFzYyB7DQogICAgaWNvbjogImhheGV1aS1jb3JlL3N0eWxlcy9kZWZhdWx0L3NvcnRhYmxlX2FzYy5wbmciOw0KfQ0KDQouY29sdW1uLnNvcnQtZGVzYyB7DQogICAgaWNvbjogImhheGV1aS1jb3JlL3N0eWxlcy9kZWZhdWx0L3NvcnRhYmxlX2Rlc2MucG5nIjsNCn0NCg0KLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogVEFCTEVWSUVXDQoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLw0KLnRhYmxldmlldyB7DQogICAgYm9yZGVyOiAxcHggc29saWQgIzE4MWExYjsNCiAgICBib3JkZXItcmFkaXVzOiAxcHg7DQogICAgcGFkZGluZzogMXB4Ow0KICAgIHdpZHRoOiBhdXRvOw0KICAgIGhlaWdodDogYXV0bzsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjUyNzI4Ow0KICAgIHNwYWNpbmc6IDA7DQp9DQoNCi50YWJsZXZpZXcgLnRhYmxldmlldy1jb250ZW50cyB7DQogICAgc3BhY2luZzogMDsNCiAgICB3aWR0aDogMTAwJTsNCiAgICBwYWRkaW5nOiAwcHg7DQp9DQoNCi50YWJsZXZpZXcgLmV2ZW4gew0KICAgIGJhY2tncm91bmQtY29sb3I6ICMyNTI3Mjg7DQogICAgY3Vyc29yOiBwb2ludGVyOw0KfQ0KDQoudGFibGV2aWV3IC5vZGQgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICMyYTJjMmQ7DQogICAgY3Vyc29yOiBwb2ludGVyOw0KfQ0KDQoudGFibGV2aWV3IC5jb21wb3VuZGl0ZW1yZW5kZXJlciAuaXRlbXJlbmRlcmVyIHsNCiAgICBoZWlnaHQ6IGF1dG87DQogICAgcGFkZGluZzogNXB4Ow0KfQ0KDQoudGFibGV2aWV3IC5ldmVuOmhvdmVyIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmYzNzQ2Ow0KfQ0KDQoudGFibGV2aWV3IC5vZGQ6aG92ZXIgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICMyZjM3NDY7DQp9DQoNCi50YWJsZXZpZXcgLmNvbXBvdW5kaXRlbXJlbmRlcmVyIC5sYWJlbCB7DQogICAgY29sb3I6ICNiNGI0YjQ7DQp9DQoNCi50YWJsZXZpZXcgLmNvbXBvdW5kaXRlbXJlbmRlcmVyOnNlbGVjdGVkIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDE1OTgyOw0KICAgIGNvbG9yOiB3aGl0ZTsNCn0NCg0KLnRhYmxldmlldyAuY29tcG91bmRpdGVtcmVuZGVyZXI6c2VsZWN0ZWQgLmxhYmVsIHsNCiAgICBjb2xvcjogd2hpdGU7DQp9DQoNCi50YWJsZXZpZXcgLmNvbXBvdW5kaXRlbXJlbmRlcmVyOmRpc2FibGVkIHsNCiAgICBjb2xvcjogIzU5NTk1OTsNCn0NCg0KLnRhYmxldmlldyAuY29tcG91bmRpdGVtcmVuZGVyZXI6ZGlzYWJsZWQgLmxhYmVsIHsNCiAgICBjb2xvcjogIzU5NTk1OTsNCn0NCg"},{ name : "haxeui-core/styles/default/haxeui_small.png", data : "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"},{ name : "haxeui-core/styles/dark/frames.css", data : "LmZyYW1lIHsNCiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7DQogICAgd2lkdGg6IGF1dG87DQogICAgaGVpZ2h0OiBhdXRvOw0KfQ0KDQouZnJhbWUtY29udGVudHMgew0KICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICMyNTI3Mjg7DQogICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjMjUyNzI4Ow0KICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMjUyNzI4Ow0KICAgIHBhZGRpbmc6IDEwcHg7DQogICAgcGFkZGluZy10b3A6IDE1cHg7DQp9DQoNCi5mcmFtZS10aXRsZSB7DQogICAgY29sb3I6ICNiNGI0YjQ7DQp9DQoNCi5mcmFtZS1sZWZ0LWxpbmUsIC5mcmFtZS1yaWdodC1saW5lIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjUyNzI4Ow0KICAgIGhlaWdodDogMXB4Ow0KfQ0K"},{ name : "haxeui-core/styles/default/dialogs/exclamation.png", data : "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAB3VBMVEUAAACVfwD9+7zFrAHGrQGeiAC6owDUxDzr5oDd213v5oft44HZzE/Qwzbr4Ha6pxTo3Gy8qBTk11+WgAC+qhPVwjW+qRHTwCu/qQ7SvSHRuxehiwHQuA/MswHCqgaulwDDqwPGrQG0nAHIrwG3oAHKsQG7owHMswGVfwC+pgGahADMswHBqQGmjwDErAGymgHHrgG2ngHJsAG5oQHLsgHp5XD065Xe22rm1znk0iDz6pTi23Ph1EHdzSHx6JHe0kfYyynu44PZz0vUxzDZyUzBqQy/qAjt3SXn2irp2yfa1Dbk2S3S0D/h1y/d1jLu3WbX0znV0Tvt3ST15Xb043Lw32vv3mjOzkPw4z/v4Tnu3ioiIhoAAADv4TTv3y7++rj8+LX89q379av48aL58Z737JP38o787o716Yr46YLs6YLz5oD453p2dnaXknR4d3BwcHCopWt6eGhoaGh+e2FgYGDi3l6GgVxXV1ff2k3c1k3u40nVz0nT0ULi2j3Bvjbk2TOenC+GhSqVkSNtbSNfXhpIRxUuLg4eHQcdHAcWFgf37pjt4XPf33Dk4Wbr5GLZ0lzh11fl4FXt41OIglHV1FDo30fSyUbX1ETRyETd10A4ODZkYSzp2yglJSNztjb6AAAAR3RSTlMAzPoVDQgF0P7+7eTe3tzc1tPPzMnGw7+8ubKyq6uqoaCVkoiCenNtZmRgX1VORz05LishH/75+fj49fX09PDu7uro6NS0tIfvrv4AAAGdSURBVDjLrZFFWwJhFEZ1DOzu7u7ubtFPRRAkLLq7u8Hu9rc6MIAIDBs9q3ufc3Zvwn+TXF2dHDfoLCjojOeTqiCoKilO0Jp3dJTXiu6HKiAWC6oYQg2ac074/NOcZjQ/UA5xcDjOcfkAStCYSd+HoWc2xvZ9pcc4oUAgxJ2U9sXyqfUZDLxILBbh2fP1qTGCnuJTPEEqk0kJ+LPinmifUjfDBkCuUMgB4GXUpUQFXZgzAgAqtVoFAIGB6YpaqWaCBwB4eP/60D+/3kzWRG7WvnQOwK3e7vXaD2AuMe0RKy2PXGgNWKzV5bJiYR5HV35v1pKVZvAJi9NpwfpIz24J94NladpdHyaHw+Q/XtLLBsOCpqyrHT9KLleJXJrsph/fXzL8thGJpqQ/FDQs3G0j2DweW+A0LjYEfW/RtXkLwU2huLcCGIt6AyvVzj5tBiBTKOTgbZ6rRTbrzr9fCyIhkyVrIfK7/StVTpHWg+iYTF3o+Zyu9G3WkUtcRSO3Aw4Kx4hEIolEolKpNBrtEAY2ewjjhXDQlhiHtoS/8w0/HYkkEMHbQgAAAABJRU5ErkJggg"},{ name : "haxeui-core/styles/default/sortable_desc.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAcAAAAJCAIAAABxOqH0AAAABnRSTlMA7QAcACSX3bo6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA0UlEQVQIHQHGADn/Ae0cJAAAAAAAAIdYUHmosAAAAAAAAAIAAAAAAACHWFAAAACJWlIAAAAAAAACAAAAh1hQAgICAgICAAAAjV5WAAAAAe0cJAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAANannwAAAAAAAAAAAAAAACpZYQIAAAAqWWEAAAAAAAAAAAAqWWEAAAACAAAAAAAAKllhAAAAKllhAAAAAAAAmeIQ3V5WWXgAAAAASUVORK5CYII"},{ name : "haxeui-core/styles/dark/up_down_arrows.png", data : "iVBORw0KGgoAAAANSUhEUgAAAAcAAAAJCAIAAABxOqH0AAAABnRSTlMA7QAcACSX3bo6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAARElEQVQImWN8K6PCwMDAwMBwfMYEy4wCCJsJLgQnoaJwDpzNuGXLFgYMwAg3F0UUq1omuL1wYJlRwAShkIUQLoNw4NIA3UcXw9uo6KsAAAAASUVORK5CYII"},{ name : "haxeui-core/styles/dark/down_arrow_circled.png", data : "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAANq3pUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjarZlpciS5joT/8xRzBG7gchyuZu8Gc/z5QEZlpaQqqfvZKLsUIWYsJBxwd7DN+t//bPM//ERbvImSS6opWX5ijdU3Toq9P/fobDy/7x+/vnMfx83rC89Q4Bjun2k91zfG5fcNOT7j/eO4yeN5Tnke5F4PPj9B36znz3XleVDwd9w9f5v63Nfi23Kef348j30e/vnvmAnGFJ4XvPEruGD5XfQtQf+50DhGfvvAi/lbOI8hn5H859iZ1+mn4L3OPsXOtmc8fAyFsem5IH2K0TPu5NN4eL3Gf0Tt95s/fDGHXfb95y12e8+y97qrazERqWSeRf1ayjnjwk4ow7kt8cn8E87z+VQ+hSUOEJug2fkM46rzRHu76KZrbrt1jsMNphj98pmj9wMMdKyE7KsfQSGI+nHb51DDNKGAxAC1wLB/zcWd99bzvkHSTjsdV3rHwxx3fPmYPw3+N5/Xg/bW1HXOllesmJfXnGYaipz+5ioAcfuJqZz4no95yxv7BmwAQTlhLiyw2X4f0cX9zq1wcA5cJzYae0vD5fk8gBDxbmEyLoCATSS2S85m77NzxLGAT2PmPkTfQcCJ+OnMBpsQEuAUr+/mnuzOtV78HYZaAEJCokgKCDXAilHInxwLOdQkSDQikiRLkSothRSTpJRyUo5qOeSYJaecc8k1txJKLFJSyaWUWlr1NUBhUlPNppZaa2u8tPHoxt2NK1rrvoceu/TUcy+99jZInxGHjDTyKKOONv0Mk/KfaWYzy6yzLbdIpRWXrLTyKquutsm1HXbcstPOu+y62wu1B9WPqLlPyH2PmntQU8TiuS7/Ro3hnH89wimdiGIGYj46EM+KAAntFTNbXIxekVPMbIW0gnhQc6LgTKeIgWBczst2L+x+I/ctbkbiv8LN/w05o9D9fyBnFLoHua+4/QG12Y6ihAOQVqHG1IYNsXHBKs2Xppr01+OWuHeRVFvIe+wx96Z0J1jqcXmTip58vIKH3yuWT4WX5+WyjrKYnoOeMe1zXXNNchszBxOa3SUmlh5mHjvnVIOMPgrAaTilxjKctzuJGxRmb6zX7o7IhlShu8qkOTeA12PS8yaOP7iAVIgEH8okNVYfnZmFZ0Yh7Tuj0u+M+syt7ZpMXy11m6Vv0k7DKasJ5RMnKbIqsxoWUCMB9nFnCavzfFQV99Fa2SXlpqxo9pRPYfM17+UoaX1p2JLP93m7M6uiwd9eF3TW9OtoPg98Oc41HerA85gtcjGF4KZB+LwrQ4NY3Cgo7aYyJ6tLfcaw3AC6wsKhZ/IHaJr1orrrNwGaScqyMmbJCmy+a0h1bmqtjS1kGvHpVr/o5N4JrUahRNm57OnJdzVNvgwlViodaOTtaD4PfDmC5pheT90S4vmXF5vz5lDyCG7e5Bx9At8T4P0EmMSmAnPUSDsQ7cN1xYxsFL/4MaljIudS5YBxEOKKBqzVArEgYSeJFA5gK0rrZFHbg3mhOWRYbS9YzJ/wotaBCRmh7GdrQ6s/bt+8jzbxH7IJUKT6HI5lLk1Z46CEG9ywQwalPBtgOE3r2WaAhMT1KFDjt2Vtfq77Px6FJUeKwoZCITAXY8PKidWQRJrP4wZ8P9Mj4GeC0DmlnHZhjbGnSU1JaXCZLIFDC+Rf4mhRQzxGwDovqgr/osiLet97zClsOylv+LUtdWJ1x6QhnzoF6jqZLVS4pge4nzyF0fuZVTvXWnuvlvRdHYHa+4Bra6FBcWXSLrEoF3BvRZ8ribIXAW4/c119oQ2jUFGIRWoNzi4lcPdu87QiH1f0t2NkDUEFYvu5KV5YctDU0HXAJ1tZhffAR10Xq1lI+HWh+VmoPAtd0G8Zr2UxW1jJ8K33c1LIMy9Ym6uqPgd+g+vGidvg/UoHoL4frj6UgPiRZdQh7GS+D+E9NvRxkzd5dwoKsVsbRRurWSK3zgvgbKvCjG6NXJpOSxyERJWhi2R2r6mT5MxnQcjbByE3RiTisa6npLet6NrqDV3DxFVVFToZhyIntNSy2jYCT1VewzafJTEQW8ehtelGx/bDhHO23k0syf0IFlp+Q0GehQwlXk3p+dEUMt7c0KFpdF4qLCj7IXlIRyeBnjdF04KmiBZyPQ8hUDMRuLyQxL2o/nCeiTXlhqJNQW/b7lWDn1qN1apWhlopHDIGLywRKxWqslV8m7j5Of1QJshQ0Rj+UGvfqF6quJ/VTlJgBVma4ifKPkqbZ9q5HvjigS95SVNZUm9Y6SxM5gNgBUCHtjafDS8CPL3vAEQ7lQgJ17t1BHNzlx69sj/RFfKA2jvTQgsaNu8MmddkdZS26MfsvEeCtF3hjTS6O1XnjDSyYKjMh0JfhYtTEyUlX90sRV1Rdm1cz1OuvKdH+RToUTfchmNruvlA+uILx/xO4b4cn2hrrMnsp1akyR/RIavdifWN9O84S/8AjnlDB2P9K9KKUNwPQvADa33Q+QQO75kT+9LMCjcBnOTVsMiMPUO6BgZpR/+JtBg9gZTVGegpNo2q+vY2fD4WsnekOFPFThM+DGMbDMx3BA0ph+ZoyPdxfSgH5Q1/LHCpLNC1ryMDlDQts4lB+eOoWlDzOudWMxihoSz2+sX+a6kKbfLpT3lu3gD4Uhtv0f+S55+jT9F+AeAV7EIwxhR7ZyDK62TvZFpow+LIUqvPS+83yBPZoz0Gb1GgWaKULZ7bsCB4Jkc7Zef0cSkjaWudmLpGNj+zXITDXOgbnPUjylGdePrLJeaeYJmQVxmXzOd5U1vghnFfFUclUI2MpRLrEoipvlP5e4xJV1MdXTa9YFHLD0nQAq5JIOTQVW7d5TU78cSna13QZjSwLoUOs2DdHlrTUhXT+q0Xjf9vwCbtSO+zevy7LUsdXtJOpNWplNn7cfu59lexGElOZNLgrYqLdh7fUqLjrjGsVuw4Qr1bOccM4mQhf4KtkIICTh1gihkLm0QyJKbGMqJK/FDT0aEU7C6qw9TpEq2m7D6CvXoF3ESnFNqwaAUttSEpMy9DGzYd6qp5NA2s5kr/iS2VvuiMz5D58zX0Z54OCqsCGdHc0cgFLMOii+PLANP6DLZdfZ9ETV/NbLWNWVtFFbEZEpVWYqSm8TQuIZM00uovMY8kQ+maJWUTBYqA5MY6oJOmFk34KkW19di2QZhLS/MRt4WyUK5JQ5UDie1rv1TbO9317n76lbsZuNGKkU5aan1j/c/L8RZeq3oFhe2X0+A1u4VVJagMk6c+4P2029oG2aBG1oQBlrIA6FM61Bi3wOLfKhRtJC0PM62tmVCxTbTRclsfJhyDnCTlBVN7kONoNIOz4CAK0WWC21kmhtVTs2dbLKYGokT/446c0bV6TOsRjz2/lyPI6tpA5cxtRAKOlsU67xfWq2iG0kDBpiyO9WZuGapXvVENsie6fmYcJj5pwDYMSDItp0z3InjC7GrymCWqu8BYjS6oMKsGEOJ/2ZNlg9egu0zHs2CImrVNWobqjBkZ0O3HTlrnOXhjptNVh6V0EauCCZZMramZOQuaQgs53U6wm6RWjW47JVI17DJpm9cPZeE0pad2aQWW6SMRmDnIS9MiPbA+0oXex/JMXKzuYtA0TCxEbLoNsZy2ENBPWDMdBs/j8XrqBzGkBjvBGOleXfZK+30p3BFi3ZS3btKUKzuAcfg/z359/XGUtGtY24ir/dF1OAlrNNSuS0FEUg2BOE4lkUE9xFvB5pZwvSX89NlvFey1gssPFaw8b/xD9LeMB+0V/NF1X0f761OP/Zbj+FiOYNvg0P6Uo1G+09Q8FcnUyLJMV93O/twonpKwEWrdqVEgUDLiMRESbSl0g2JM/2r8XPlrlLzTWKqlGCmPeGsQVOY+qJwGjE4FXMwDDFK9FZZz6bX7zPUa/vwWeGY1yDnCUC/G0ynGIRqeIwo0IJPfy0uvutsQXq1vCsnuDFeUb7f0zLskJ3psunPe1h629DXmqLzTf0qTD3mUK81pHHfij/BM3fCLdLAbtxQQBL2Mqo8U+EQ+O7xDbzPN3RjUK7WFap9mvUrWbRnd5ym56yN0Z4Yeh24LySP/iZtuGjSTETs4Tj2hWvN6vRP6oMKO9BPYwpN8On4f0zWgFCwAMByD8qumzT/rGH48epMRy45dw0lV3RgcwoQQ83mcxtJEIHmhat0nbb3M7dKiuWEclafNk9ZiK0X/j5/u3RHr7B3MmPzduvvWV3/Z17PWvHfyufKQnUpdnpqaWJEK/aBMHR7MOHfdkWkjrki4urs7MmvAU1Nb0dhoyUfDVGETu23Z04WeRvV21lv18gBRj/elns/mYX82D3VjYophDQIQbqkbcv9wc+Rrt0pC0m2VTC0MXg+jpseOK6feBDizIgWQBNKQ0YLufZpV0x2tfDeHNW7p2t2twnV7+BM01O0EDVtPxmuT1lPEr8DtJCUktqI1PvSqW0Ml/JuW7+GC1eaV+UAvIo/O38D2rUyvlOzgltqCe/qOyz3vud5Ors8Wot8um4Vf8bbDqFR4SUt8RIwu0O3+P9eOPGLq51PVIVx6eyck8ghOOpT0nnaDFKrKIkDq76Y7K2lnzD7OnmxhCm7rXl2kUA1zWBF2vnFTnUcxYH+sRHhN4m/UovTQL9amzAfsTzEI93v9+n6pMnW+pKZeIbI/Vb/K8azm/wBbOWEwoq06UwAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+UEFw0vHLzWHgYAAALCSURBVEjHtZZRbxRVFMd/597pdgZW2m4hwBdAHynbFDQm+iASeeA7GH2TB7tJJ5M0mhtM082+NCQ8gn4GTUwofgKKoEYBsSooTWhLC3VTu+OSmeNDt7BLd2ZXiP+nyZxz/v9z7rn33Cv0wNzc3HCz2XxHVY+o6mERURF5ACw2Go0rzrl6XrxkGWZnZ8vApyLyHjCQ4fYPcNkYcy4Mwxt9CTjn9gRBcF5VP8hL4DmkInJxYGDg40ql0sgUmJmZOWit/Roo82K4bq09PTU1tbrzw7Rl7ltrv3oJcoBykiRfOuf8XQK+718AJvKi6/U6m5ubvUROBEFwvmOJarXasTRNr7ULPo+19XWuLnyLiPDmG6+zb98ruT0xxpTDMPzeAKRp6vLIAba2tnunqvy9tdWrCtPiRKrV6hCwChTyIv68v8SPP90E4NjYUQ4fOthLpBnH8QEjIid7kb8gCoODgyeNqr7G/wQRedWoatdaVZW79/7g97v3UNXdXUxTFn/9jftLS3kah7wsy+rDNW7d/hmAjY0NSqVSG3nC9RvfsfpwDYDi3iIjI8NdeTwRWelm2LsnwFpLkiQ8WF5h/dHjp7Zbt+/QbDa3CTyPIPCz8lw2qnqnm6VYLDJeHsNau70lWoTt357ncXxiHN/3s3rwi/F9/xvgSTeH/aOjHSIdpbfIh4eGMrdpo9G4YiYnJzdUdT7La//oKBPj5Q6RPshR1cvOufrO6XWAZjmXSiOMl8fwPEuhUOhJDqQtzmfjulqtfg68nxeVJAkigjGm1xG4FEXRhx3TtFAofARcy4uy1vZDvhDH8dld47pSqTSMMWeAhZc4vFeTJDnjnIt3CQCEYbgcx/FbwBetdewXKXApjuO3p6enV/q69Gu12tEkST4TkXdzhmETmAc+iaLoh//0qmhr/hBwCuh4tqjqIjAfRdFfefH/AvlBBZd2jfWVAAAAAElFTkSuQmCC"},{ name : "haxeui-core/styles/dark/left_arrow_circled.png", data : "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAACtklEQVRIiaWVy04UQRSGv1MzAz0jYRBQYOVlAeJKQDCGGGOiYjTRV/ABXBgSyJCJpqILyCwgLnRhND6DJkbRrTFKGNSFtxjvFwRvkaBTtHSXi2EUZqaHTvhXXVWnvv90V/U5wioaGxurM8YcEJE2a20TgIjMiMgza+3tVCr1s9J+CVoYHh7uArSI9AGxgDAXGFdK6cHBwalQBqOjo3HXdc8DxyslUCQfuGKMOaG1NoEGmUym2ff9a0B3SHCxJjzPO5pOp2cKE6rwoLV2fN+/ugY4QE8kErmutU6UGDiOcwHoWQO8oK54PH6uMBCATCazw/f97HLDYs3Pz/Prd46NGxoRWfVorLW2e2hoKKsAPM87Wwn+9ds37ty9x2R2ijdv34V5CwFOA8jIyEgSmAWqguCT2Qd4ngdA+7Y2tm7ZHMbkT3V19UYF9AXBv3//sQLe0tzEls2bwsABYq7r7o8CrWEyr6qqor6+nvcfPpbEJhJxGhsaSuatta1Ra21L8aF5nkd26j8cwHVdHj95Gpjunt7d1NbWFhu0KBGxxcEiglKRQFj5+NI7IiI2KiLT1q70UErRvbOT+xOTLC4uAvlPtL29razxukSCmpqacgbTUWvti3JZ1SWT7OrZ+c/EdV0+fZqmq7OjbLYBeqGAcfJVMdAkGo0CMPvlKy9fvQ4LX8jlcrfUUj0fD4oqNnGc6rAGN7XWc9GlwSngCAF/c10yyd49veRyhvXr68LAfaXUGQrAVCr1CLhSaYfjOGHhiMilQgP6l7Ex5gRwPxShsrKxWOxkYbC8HxjP844BE2uA34tEIof7+/tzJQYA6XR6xhizF7hMvg2GlS8iF40x+wYGBmaXL1Rq+h3km/4hAooh+et9Y6npPywXsGrn0FrXxuPxg9baVqB5afqztfb5wsLCba31XKX9fwFEFAnZCIfj5AAAAABJRU5ErkJggg"},{ name : "haxeui-core/styles/default/frames.css", data : "LmZyYW1lIHsNCiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7DQogICAgd2lkdGg6IGF1dG87DQogICAgaGVpZ2h0OiBhdXRvOw0KfQ0KDQouZnJhbWUtY29udGVudHMgew0KICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNEREREREQ7DQogICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjREREREREOw0KICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjREREREREOw0KICAgIHBhZGRpbmc6IDEwcHg7DQogICAgcGFkZGluZy10b3A6IDE1cHg7DQp9DQoNCi5mcmFtZS10aXRsZSB7DQogICAgY29sb3I6ICMyMjIyMjI7DQp9DQoNCi5mcmFtZS1sZWZ0LWxpbmUsIC5mcmFtZS1yaWdodC1saW5lIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjREREREREOw0KICAgIGhlaWdodDogMXB4Ow0KfQ0K"},{ name : "haxeui-core/locale/es/dialog.properties", data : "ZGlhbG9nLnNhdmU9R3VhcmRhcg0KZGlhbG9nLnllcz1TaQ0KZGlhbG9nLm5vPU5vDQpkaWFsb2cuY2xvc2U9Q2VycmFyDQpkaWFsb2cub2s9T0sNCmRpYWxvZy5jYW5jZWw9Q2FuY2VsYXINCmRpYWxvZy5hcHBseT1BcGxpY2FyDQoNCg"},{ name : "haxeui-core/styles/default/propertygrids.css", data : "LnByb3BlcnR5LWdyaWQgew0KfQ0KDQoucHJvcGVydHktZ3JpZCAuc2Nyb2xsdmlldy1jb250ZW50cyB7DQogICAgcGFkZGluZzogMDsNCiAgICB3aWR0aDogMTAwJTsNCiAgICBzcGFjaW5nOiAwOw0KfQ0KDQoucHJvcGVydHktZ3JvdXAgew0KICAgIHdpZHRoOiAxMDAlOw0KICAgIHNwYWNpbmc6IDA7DQp9DQoNCi5wcm9wZXJ0eS1ncm91cC1oZWFkZXIgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICNFREVERUQ7DQogICAgcG9pbnRlci1ldmVudHM6IHRydWU7DQogICAgd2lkdGg6IDEwMCU7DQogICAgcGFkZGluZzogNXB4Ow0KICAgIGJvcmRlci1jb2xvcjogI0FCQUJBQjsNCiAgICBib3JkZXItYm90dG9tLXdpZHRoOiAxcHg7DQogICAgYm9yZGVyLWJvdHRvbS1zaXplOiAxcHg7DQogICAgY3Vyc29yOiBwb2ludGVyOw0KfQ0KDQoucHJvcGVydHktZ3JvdXAtaGVhZGVyLnNjcm9sbGluZyB7DQogICAgYm9yZGVyLXJpZ2h0LXdpZHRoOiAxcHg7DQogICAgYm9yZGVyLXJpZ2h0LXNpemU6IDFweDsNCn0NCg0KLnByb3BlcnR5LWdyb3VwLWhlYWRlcjpob3ZlciB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogI0Y1RjVGNTsNCn0NCg0KLnByb3BlcnR5LWdyb3VwLWhlYWRlci1pY29uIHsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyOw0KfQ0KDQoucHJvcGVydHktZ3JvdXAtaGVhZGVyOmV4cGFuZGVkIC5wcm9wZXJ0eS1ncm91cC1oZWFkZXItaWNvbiB7DQogICAgcmVzb3VyY2U6ICJoYXhldWktY29yZS9zdHlsZXMvZGVmYXVsdC9kb3duX2Fycm93X3NxdWFyZS5wbmciOw0KfQ0KDQoucHJvcGVydHktZ3JvdXAtaGVhZGVyOmNvbGxhcHNlZCAucHJvcGVydHktZ3JvdXAtaGVhZGVyLWljb24gew0KICAgIHJlc291cmNlOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RlZmF1bHQvcmlnaHRfYXJyb3dfc3F1YXJlLnBuZyI7DQp9DQoNCi5wcm9wZXJ0eS1ncm91cC1oZWFkZXItbGFiZWwgew0KfQ0KDQoucHJvcGVydHktZ3JvdXAtY29udGVudHMgew0KICAgIHdpZHRoOiAxMDAlOw0KICAgIHNwYWNpbmc6IDE7DQogICAgYmFja2dyb3VuZC1jb2xvcjogI0FCQUJBQjsNCiAgICBwYWRkaW5nLWJvdHRvbTogMXB4Ow0KfQ0KDQoucHJvcGVydHktZ3JvdXAubGFzdCAucHJvcGVydHktZ3JvdXAtY29udGVudHMuc2Nyb2xsaW5nIHsNCiAgICBwYWRkaW5nLWJvdHRvbTogMHB4Ow0KfQ0KDQoucHJvcGVydHktZ3JvdXAtY29udGVudHMuc2Nyb2xsaW5nIHsNCiAgICBwYWRkaW5nLXJpZ2h0OiAxcHg7DQp9DQoNCi5wcm9wZXJ0eS1ncm91cC1pdGVtLWxhYmVsLWNvbnRhaW5lciB7DQogICAgd2lkdGg6IDUwJTsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsNCiAgICBoZWlnaHQ6IDEwMCU7DQogICAgcGFkZGluZy1sZWZ0OiA1cHg7DQp9DQoNCi5wcm9wZXJ0eS1ncm91cC1pdGVtLWVkaXRvci1jb250YWluZXIgew0KICAgIHdpZHRoOiA1MCU7DQogICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7DQp9ICAgICAgICANCg0KLnByb3BlcnR5LWdyb3VwLWl0ZW0tbGFiZWwgew0KICAgIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7DQp9DQoNCi5wcm9wZXJ0eS1ncm91cC1pdGVtLWVkaXRvciB7DQogICAgd2lkdGg6IDEwMCU7DQp9DQoNCi5wcm9wZXJ0eS1ncm91cCAudGV4dGZpZWxkIHsNCiAgICBib3JkZXI6IG5vbmU7DQogICAgZmlsdGVyOiBub25lOw0KICAgIGJvcmRlci1yYWRpdXM6IDA7DQp9DQoNCi5wcm9wZXJ0eS1ncm91cCAuY2hlY2tib3ggew0KICAgIHBhZGRpbmc6IDVweDsNCiAgICBwYWRkaW5nLWxlZnQ6IDRweDsNCn0NCg0KLnByb3BlcnR5LWdyb3VwIC5udW1iZXItc3RlcHBlciB7DQogICAgcGFkZGluZzogMDsNCn0NCg0KLnByb3BlcnR5LWdyb3VwIC5kcm9wZG93biB7DQogICAgYm9yZGVyOiBub25lOw0KICAgIGJvcmRlci1yYWRpdXM6IG5vbmU7DQp9DQo"},{ name : "haxeui-core/styles/dark/rules.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogUlVMRQ0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi5ydWxlIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjUyNzI4Ow0KfQ0K"},{ name : "haxeui-core/styles/dark/steppers.css", data : "Lm51bWJlcnN0ZXBwZXIgew0KICAgIHBhZGRpbmc6IDFweDsNCiAgICBzcGFjaW5nOiAwOw0KfQ0KDQouc3RlcHBlciB7DQogICAgc3BhY2luZzogMDsNCn0NCg0KLnN0ZXBwZXItYnV0dG9uIHsNCiAgICBwYWRkaW5nOiAzcHg7DQogICAgcGFkZGluZy10b3A6IDRweDsNCiAgICBwYWRkaW5nLWJvdHRvbTogNHB4Ow0KICAgIGJvcmRlci1yYWRpdXM6IDA7DQogICAgYm9yZGVyOiBub25lOw0KICAgIGJhY2tncm91bmQtY29sb3I6ICMyYzJmMzA7DQogICAgb3BhY2l0eTogMTsNCn0NCg0KLnN0ZXBwZXItYnV0dG9uOmhvdmVyIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDU0ODRhOw0KfQ0KDQouc3RlcHBlci1idXR0b246ZG93biB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogIzQ1NDg0YTsNCn0NCg0KLnN0ZXBwZXItYnV0dG9uOmRpc2FibGVkIHsNCiAgICBvcGFjaXR5OiAwLjU7DQogICAgYmFja2dyb3VuZC1jb2xvcjogIzMzMzczODsNCn0NCg0KLnN0ZXBwZXItaW5jIHsNCiAgICBpY29uOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RhcmsvdXBfYXJyb3cucG5nIjsNCn0NCg0KLnN0ZXBwZXItZGVpbmMgew0KICAgIGljb246ICJoYXhldWktY29yZS9zdHlsZXMvZGFyay9kb3duX2Fycm93LnBuZyI7DQp9DQoNCi5zdGVwcGVyLWluYzpkb3duIHsNCiAgICBpY29uOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RhcmsvdXBfYXJyb3dfd2hpdGUucG5nIjsNCn0NCg0KLnN0ZXBwZXItZGVpbmM6ZG93biB7DQogICAgaWNvbjogImhheGV1aS1jb3JlL3N0eWxlcy9kYXJrL2Rvd25fYXJyb3dfd2hpdGUucG5nIjsNCn0NCg0KLnN0ZXBwZXItdGV4dGZpZWxkLCAuc3RlcHBlci10ZXh0ZmllbGQ6YWN0aXZlIHsNCiAgICBib3JkZXI6IG5vbmU7DQogICAgd2lkdGg6IDEwMCU7DQogICAgcGFkZGluZzogNHB4Ow0KICAgIHBhZGRpbmctdG9wOiA1cHg7DQogICAgcGFkZGluZy1ib3R0b206IDNweDsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyOw0KICAgIGZpbHRlcjogbm9uZTsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjUyNzI4Ow0KfQ0KDQouc3RlcHBlci10ZXh0ZmllbGQ6ZGlzYWJsZWQgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICMyYzJmMzA7DQp9DQoNCi5zdGVwcGVyLXN0ZXAgew0KICAgIGhlaWdodDogMTAwJTsNCn0NCg0KLnN0ZXBwZXItc3RlcCAuc3RlcHBlci1pbmMsIC5zdGVwcGVyLXN0ZXAgLnN0ZXBwZXItZGVpbmMgew0KICAgIGhlaWdodDogNTAlOw0KfQ0KDQoubnVtYmVyLXN0ZXBwZXIgew0KICAgIGluaXRpYWwtd2lkdGg6IDYwcHg7DQp9"},{ name : "haxeui-core/styles/default/checkboxes.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogQ0hFQ0tCT1gNCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovDQouY2hlY2tib3ggew0KICAgIHdpZHRoOiBhdXRvOw0KICAgIGhlaWdodDogYXV0bzsNCiAgICBob3Jpem9udGFsLXNwYWNpbmc6IDRweDsNCiAgICBjdXJzb3I6IHBvaW50ZXI7DQogICAgY29sb3I6ICMwMDAwMDA7DQp9DQoNCi5jaGVja2JveDpob3ZlciB7DQp9DQoNCi5jaGVja2JveDpkaXNhYmxlZCB7DQogICAgY3Vyc29yOiBkZWZhdWx0Ow0KICAgIGNvbG9yOiAjOTA5MDkwOw0KfQ0KDQouY2hlY2tib3gtdmFsdWUgew0KICAgIGJvcmRlcjogMXB4IHNvbGlkICNBQkFCQUI7DQogICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjsNCiAgICB3aWR0aDogMTZweDsNCiAgICBoZWlnaHQ6IDE2cHg7DQogICAgdmVydGljYWwtYWxpZ246IGNlbnRlcjsNCiAgICBib3JkZXItcmFkaXVzOiAycHg7DQogICAgaWNvbjogbm9uZTsNCiAgICBmaWx0ZXI6IGRyb3Atc2hhZG93KDEsIDQ1LCAjODg4ODg4LCAwLjIsIDIsIDIsIDEsIDMsIHRydWUpOw0KICAgIGN1cnNvcjogcG9pbnRlcjsNCn0NCg0KLmNoZWNrYm94LXZhbHVlOmhvdmVyIHsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjMjE2QUFFOw0KfQ0KDQouY2hlY2tib3gtdmFsdWU6c2VsZWN0ZWQgew0KICAgIGljb246ICJoYXhldWktY29yZS9zdHlsZXMvZGVmYXVsdC9jaGVjay5wbmciOw0KfQ0KDQouY2hlY2tib3gtdmFsdWU6ZGlzYWJsZWQgew0KICAgIGJhY2tncm91bmQ6ICNENEQ0RDQgI0NDQ0NDQyB2ZXJ0aWNhbDsNCiAgICBjdXJzb3I6IGRlZmF1bHQ7DQp9DQoNCi5jaGVja2JveC1sYWJlbCB7DQogICAgdmVydGljYWwtYWxpZ246IGNlbnRlcjsNCn0NCg0KLmNoZWNrYm94LWljb24gew0KICAgIGhvcml6b250YWwtYWxpZ246IGNlbnRlcjsNCiAgICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyOw0KICAgIGN1cnNvcjogcG9pbnRlcjsNCiAgICBvcGFjaXR5OiAxOw0KfQ0KDQouY2hlY2tib3gtaWNvbjpkaXNhYmxlZCB7DQogICAgY3Vyc29yOiBkZWZhdWx0Ow0KICAgIG9wYWNpdHk6IDAuNTsNCn0NCg"},{ name : "haxeui-core/styles/default/collapsed.png", data : "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH5AoNCwocG2BobAAAAHlJREFUOMtjYBi+YP36bcrEqGPCLfP36Pr1W4zJN4CBQZyB6f/B9Zs2eZJrAAMDAwM3w3/GDRs2bI4i1wAGBgYGtv+MDEs2bNpSTq4BeAELEWp+Mf5nSAzw91lGjgFfGRj/hwb4+20nxwUvGf4xegcG+p6laUIaBgAAk1kg6zuyVSkAAAAASUVORK5CYII"},{ name : "haxeui-core/styles/default/scrollbars.css", data : "LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KKiogU0NST0xMDQoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLw0KLnNjcm9sbCB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogbm9uZTsNCiAgICBwYWRkaW5nOiAwcHg7DQogICAgYmFja2dyb3VuZC1jb2xvcjogI0U5RTlFOTsNCn0NCg0KLnNjcm9sbCAuYnV0dG9uIHsNCiAgICB3aWR0aDogN3B4Ow0KICAgIGhlaWdodDogN3B4Ow0KICAgIGJhY2tncm91bmQtY29sb3I6ICNDNkM2QzY7DQogICAgYm9yZGVyLXJhZGl1czogMDsNCiAgICBib3JkZXI6IG5vbmU7DQogICAgb3BhY2l0eTogLjg7DQogICAgZmlsdGVyOiBub25lOw0KfQ0KDQouc2Nyb2xsIC5idXR0b246aG92ZXIgew0KICAgIG9wYWNpdHk6IDE7DQp9DQoNCi52ZXJ0aWNhbC1zY3JvbGwgew0KICAgIHdpZHRoOiA4cHg7DQogICAgcGFkZGluZy1sZWZ0OiAxcHg7DQogICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjYWJhYmFiOw0KfQ0KDQouaG9yaXpvbnRhbC1zY3JvbGwgew0KICAgIGhlaWdodDogOHB4Ow0KICAgIHBhZGRpbmctdG9wOiAxcHg7DQogICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNhYmFiYWI7DQp9DQoNCi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCioqIENMQVNTSUMgVkFSSUFOVFMNCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovDQouY2xhc3NpYy1zY3JvbGxzIC5zY3JvbGwsDQouc2Nyb2xsLmNsYXNzaWMtc2Nyb2xscyB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogI0U5RTlFOTsNCiAgICBib3JkZXI6bm9uZTsNCiAgICBwYWRkaW5nOiAwOw0KfQ0KDQouY2xhc3NpYy1zY3JvbGxzIC5zY3JvbGwgLmJ1dHRvbiwNCi5zY3JvbGwuY2xhc3NpYy1zY3JvbGxzIC5idXR0b257DQogICAgYm9yZGVyLXJhZGl1czogMDsNCiAgICBib3JkZXI6IG5vbmU7DQogICAgYmFja2dyb3VuZC1jb2xvcjogI0U5RTlFOTsNCiAgICBwYWRkaW5nOiAwOw0KICAgIGZpbHRlcjogbm9uZTsNCiAgICBoaWRkZW46IGZhbHNlOw0KICAgIHdpZHRoOiAxN3B4Ow0KICAgIGhlaWdodDogMTdweDsNCiAgICBvcGFjaXR5OiAxOw0KfQ0KDQouY2xhc3NpYy1zY3JvbGxzIC5zY3JvbGwgLmJ1dHRvbjpob3ZlciwNCi5zY3JvbGwuY2xhc3NpYy1zY3JvbGxzIC5idXR0b246aG92ZXIgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICNEN0Q3RDc7DQp9DQoNCi5jbGFzc2ljLXNjcm9sbHMgLnNjcm9sbCAuYnV0dG9uOmRvd24sDQouc2Nyb2xsLmNsYXNzaWMtc2Nyb2xscyAuYnV0dG9uOmRvd24gew0KICAgIGJhY2tncm91bmQtY29sb3I6ICM1MjUyNTI7DQogICAgZmlsdGVyOiBub25lOw0KfQ0KDQouY2xhc3NpYy1zY3JvbGxzIC5zY3JvbGwgLnRodW1iLA0KLnNjcm9sbC5jbGFzc2ljLXNjcm9sbHMgLnRodW1iIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjQzZDNkM2Ow0KfQ0KDQouY2xhc3NpYy1zY3JvbGxzIC5zY3JvbGwgLnRodW1iOmhvdmVyLA0KLnNjcm9sbC5jbGFzc2ljLXNjcm9sbHMgLnRodW1iOmhvdmVyIHsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjQUFBQUFBOw0KfQ0KDQouY2xhc3NpYy1zY3JvbGxzIC5zY3JvbGwgLnRodW1iOmRvd24sDQouc2Nyb2xsLmNsYXNzaWMtc2Nyb2xscyAudGh1bWI6ZG93biB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogIzUyNTI1MjsNCn0NCg0KLmNsYXNzaWMtc2Nyb2xscyAuc2Nyb2xsIC50aHVtYjpkaXNhYmxlZCwNCi5zY3JvbGwuY2xhc3NpYy1zY3JvbGxzIC50aHVtYjpkaXNhYmxlZCB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogI0RERERERDsNCn0NCg0KLmNsYXNzaWMtc2Nyb2xscyAudmVydGljYWwtc2Nyb2xsLA0KLnZlcnRpY2FsLXNjcm9sbC5jbGFzc2ljLXNjcm9sbHMgew0KICAgIHdpZHRoOiAxN3B4Ow0KfQ0KDQouY2xhc3NpYy1zY3JvbGxzIC52ZXJ0aWNhbC1zY3JvbGwgLmRlaW5jLA0KLnZlcnRpY2FsLXNjcm9sbC5jbGFzc2ljLXNjcm9sbHMgLmRlaW5jIHsNCiAgICBpY29uOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RlZmF1bHQvdXBfYXJyb3cucG5nIjsNCn0NCg0KLmNsYXNzaWMtc2Nyb2xscyAudmVydGljYWwtc2Nyb2xsIC5kZWluYzpkb3duLA0KLnZlcnRpY2FsLXNjcm9sbC5jbGFzc2ljLXNjcm9sbHMgLmRlaW5jOmRvd24gew0KICAgIGljb246ICJoYXhldWktY29yZS9zdHlsZXMvZGVmYXVsdC91cF9hcnJvd193aGl0ZS5wbmciOw0KfQ0KDQouY2xhc3NpYy1zY3JvbGxzIC52ZXJ0aWNhbC1zY3JvbGwgLmluYywNCi52ZXJ0aWNhbC1zY3JvbGwuY2xhc3NpYy1zY3JvbGxzIC5pbmMgew0KICAgIGljb246ICJoYXhldWktY29yZS9zdHlsZXMvZGVmYXVsdC9kb3duX2Fycm93LnBuZyI7DQp9DQoNCi5jbGFzc2ljLXNjcm9sbHMgLnZlcnRpY2FsLXNjcm9sbCAuaW5jOmRvd24sDQoudmVydGljYWwtc2Nyb2xsLmNsYXNzaWMtc2Nyb2xscyAuaW5jOmRvd24gew0KICAgIGljb246ICJoYXhldWktY29yZS9zdHlsZXMvZGVmYXVsdC9kb3duX2Fycm93X3doaXRlLnBuZyI7DQp9DQoNCi5jbGFzc2ljLXNjcm9sbHMgLmhvcml6b250YWwtc2Nyb2xsLA0KLmhvcml6b250YWwtc2Nyb2xsLmNsYXNzaWMtc2Nyb2xscyB7DQogICAgaGVpZ2h0OiAxN3B4Ow0KfQ0KDQouY2xhc3NpYy1zY3JvbGxzIC5ob3Jpem9udGFsLXNjcm9sbCAuZGVpbmMsDQouaG9yaXpvbnRhbC1zY3JvbGwuY2xhc3NpYy1zY3JvbGxzIC5kZWluYyB7DQogICAgaWNvbjogImhheGV1aS1jb3JlL3N0eWxlcy9kZWZhdWx0L2xlZnRfYXJyb3cucG5nIjsNCn0NCg0KLmNsYXNzaWMtc2Nyb2xscyAuaG9yaXpvbnRhbC1zY3JvbGwgLmRlaW5jOmRvd24sDQouaG9yaXpvbnRhbC1zY3JvbGwuY2xhc3NpYy1zY3JvbGxzIC5kZWluYzpkb3duIHsNCiAgICBpY29uOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RlZmF1bHQvbGVmdF9hcnJvd193aGl0ZS5wbmciOw0KfQ0KDQouY2xhc3NpYy1zY3JvbGxzIC5ob3Jpem9udGFsLXNjcm9sbCAuaW5jLA0KLmhvcml6b250YWwtc2Nyb2xsLmNsYXNzaWMtc2Nyb2xscyAuaW5jIHsNCiAgICBpY29uOiAiaGF4ZXVpLWNvcmUvc3R5bGVzL2RlZmF1bHQvcmlnaHRfYXJyb3cucG5nIjsNCn0NCg0KLmNsYXNzaWMtc2Nyb2xscyAuaG9yaXpvbnRhbC1zY3JvbGwgLmluYzpkb3duLA0KLmhvcml6b250YWwtc2Nyb2xsLmNsYXNzaWMtc2Nyb2xscyAuaW5jOmRvd24gew0KICAgIGljb246ICJoYXhldWktY29yZS9zdHlsZXMvZGVmYXVsdC9yaWdodF9hcnJvd193aGl0ZS5wbmciOw0KfQ0KDQovKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqDQoqKiBNT0JJTEUgVkFSSUFOVFMNCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovDQouc2Nyb2xsOm1vYmlsZSAuaW5jLCAuc2Nyb2xsOm1vYmlsZSAuZGVpbmMgew0KICAgIGhpZGRlbjogdHJ1ZTsNCn0NCg0KLmhvcml6b250YWwtc2Nyb2xsOm1vYmlsZSB7DQogICAgb3BhY2l0eTogLjU7DQogICAgaGVpZ2h0OiA4cHg7DQogICAgcGFkZGluZzogMnB4Ow0KICAgIGJhY2tncm91bmQtY29sb3I6IG5vbmU7DQp9DQoNCi5ob3Jpem9udGFsLXNjcm9sbDptb2JpbGUgLnRodW1iIHsNCiAgICBoZWlnaHQ6IDRweDsNCiAgICBib3JkZXItcmFkaXVzOiA0cHg7DQp9DQoNCi52ZXJ0aWNhbC1zY3JvbGw6bW9iaWxlIHsNCiAgICBvcGFjaXR5OiAuNTsNCiAgICB3aWR0aDogOHB4Ow0KICAgIHBhZGRpbmc6IDJweDsNCiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBub25lOw0KfQ0KDQoudmVydGljYWwtc2Nyb2xsOm1vYmlsZSAudGh1bWIgew0KICAgIHdpZHRoOiA0cHg7DQogICAgYm9yZGVyLXJhZGl1czogNHB4Ow0KfQ0K"}];
haxe_ds_ObjectMap.count = 0;
haxe_ui_validation_ValidationManager.get_instance().registerEvent("ValidationStop",haxe_ui_backend_html5_HtmlUtils.onValidationStop);
js_Boot.__toStr = ({ }).toString;
haxe_ui_core_ComponentEvents.INTERACTIVE_EVENTS = ["mousemove","mouseover","mouseout","mousedown","mouseup","mousewheel","click","doubleclick","keydown","keyup"];
haxe_ui_core_ComponentBounds.__meta__ = { fields : { percentWidth : { clonable : null, bindable : null}, percentHeight : { clonable : null, bindable : null}, width : { bindable : null}, height : { bindable : null}}};
haxe_ui_backend_ComponentImpl.elementToComponent = new haxe_ds_ObjectMap();
haxe_ui_backend_ComponentImpl._stylesAdded = false;
haxe_ui_core_Component.__meta__ = { fields : { styleNames : { clonable : null}, styleString : { clonable : null}}};
haxe_crypto_Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe_crypto_Base64.BYTES = haxe_io_Bytes.ofString(haxe_crypto_Base64.CHARS);
haxe_ui_backend_BackendImpl.id = "html5";
haxe_ui_util_GenericConfig.cache = new haxe_ds_StringMap();
haxe_ui_Toolkit.styleSheet = new haxe_ui_styles_CompositeStyleSheet();
haxe_ui_Toolkit.properties = new haxe_ds_StringMap();
haxe_ui_Toolkit.nativeConfig = new haxe_ui_util_GenericConfig();
haxe_ui_Toolkit._theme = "default";
haxe_ui_Toolkit._backendProperties = new haxe_ui_util_Properties();
haxe_ui_Toolkit._built = false;
haxe_ui_Toolkit._backendBuilt = false;
haxe_ui_Toolkit._initialized = false;
haxe_ui_Toolkit.pixelsPerRem = 16;
haxe_ui_Toolkit.roundScale = true;
haxe_ui_Toolkit.autoScale = true;
haxe_ui_Toolkit._scaleX = 0;
haxe_ui_Toolkit._scaleY = 0;
haxe_ui_backend_PlatformImpl._vscrollWidth = -1;
haxe_ui_backend_PlatformImpl._hscrollHeight = -1;
haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	_g.h["mousemove"] = "mousemove";
	_g.h["mouseover"] = "mouseover";
	_g.h["mouseout"] = "mouseout";
	_g.h["mousedown"] = "mousedown";
	_g.h["mouseup"] = "mouseup";
	_g.h["click"] = "click";
	_g.h["doubleclick"] = "dblclick";
	_g.h["rightmousedown"] = "mousedown";
	_g.h["rightmouseup"] = "mouseup";
	_g.h["rightclick"] = "contextmenu";
	_g.h["change"] = "change";
	_g.h["keydown"] = "keydown";
	_g.h["keyup"] = "keyup";
	_g.h["scrollchange"] = "scroll";
	$r = _g;
	return $r;
}(this));
haxe_ui_backend_html5_EventMapper.DOM_TO_HAXEUI = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	_g.h["mousemove"] = "mousemove";
	_g.h["mouseover"] = "mouseover";
	_g.h["mouseout"] = "mouseout";
	_g.h["mousedown"] = "mousedown";
	_g.h["mouseup"] = "mouseup";
	_g.h["touchmove"] = "mousemove";
	_g.h["touchstart"] = "mousedown";
	_g.h["touchend"] = "mouseup";
	_g.h["click"] = "click";
	_g.h["contextmenu"] = "rightclick";
	_g.h["dblclick"] = "doubleclick";
	_g.h["change"] = "change";
	_g.h["keydown"] = "keydown";
	_g.h["keyup"] = "keyup";
	_g.h["scroll"] = "scrollchange";
	$r = _g;
	return $r;
}(this));
haxe_ui_backend_html5_EventMapper.MOUSE_TO_TOUCH = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	_g.h["mousemove"] = "touchmove";
	_g.h["mousedown"] = "touchstart";
	_g.h["mouseup"] = "touchend";
	$r = _g;
	return $r;
}(this));
haxe_ui_backend_html5_EventMapper.TOUCH_TO_MOUSE = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	_g.h["touchmove"] = "mousemove";
	_g.h["touchstart"] = "mouseout";
	_g.h["touchend"] = "mousedown";
	$r = _g;
	return $r;
}(this));
haxe_ui_backend_html5_HtmlUtils._dpi = 0;
haxe_ui_backend_html5_util_FontDetect._initialized = false;
haxe_ui_backend_html5_util_FontDetect._aFallbackFonts = ["serif","sans-serif","monospace","cursive","fantasy"];
haxe_ui_core_ItemRenderer.__meta__ = { fields : { allowHover : { clonable : null}}};
haxe_ui_core_Platform.METRIC_VSCROLL_WIDTH = "patform.metrics.vscroll.width";
haxe_ui_core_Platform.METRIC_HSCROLL_HEIGHT = "patform.metrics.hscroll.height";
haxe_ui_data_DataSource.regexAlpha = new EReg("[^a-zA-Z]","g");
haxe_ui_data_DataSource.regexNumeric = new EReg("[^0-9]","g");
haxe_ui_events_UIEvent.READY = "ready";
haxe_ui_events_UIEvent.DESTROY = "destroy";
haxe_ui_events_UIEvent.RESIZE = "resize";
haxe_ui_events_UIEvent.CHANGE = "change";
haxe_ui_events_UIEvent.BEFORE_CHANGE = "beforeChange";
haxe_ui_events_UIEvent.MOVE = "move";
haxe_ui_events_UIEvent.INITIALIZE = "initialize";
haxe_ui_events_UIEvent.RENDERER_CREATED = "rendererCreated";
haxe_ui_events_UIEvent.RENDERER_DESTROYED = "rendererDestroyed";
haxe_ui_events_UIEvent.HIDDEN = "hidden";
haxe_ui_events_UIEvent.SHOWN = "shown";
haxe_ui_events_UIEvent.ENABLED = "enabled";
haxe_ui_events_UIEvent.DISABLED = "disabled";
haxe_ui_events_UIEvent.BEFORE_CLOSE = "beforeClose";
haxe_ui_events_UIEvent.CLOSE = "close";
haxe_ui_events_UIEvent.PROPERTY_CHANGE = "propertyChange";
haxe_ui_events_UIEvent.COMPONENT_ADDED = "componentAdded";
haxe_ui_events_UIEvent.COMPONENT_REMOVED = "componentRemoved";
haxe_ui_events_UIEvent.DRAG_START = "dragStart";
haxe_ui_events_UIEvent.DRAG_END = "dragEnd";
haxe_ui_events_AnimationEvent.START = "animationstart";
haxe_ui_events_AnimationEvent.END = "animationend";
haxe_ui_events_FocusEvent.FOCUS_IN = "focusin";
haxe_ui_events_FocusEvent.FOCUS_OUT = "focusout";
haxe_ui_events_ItemEvent.COMPONENT_EVENT = "itemComponentEvent";
haxe_ui_events_KeyboardEvent.KEY_TAB = 9;
haxe_ui_events_KeyboardEvent.KEY_DOWN = "keydown";
haxe_ui_events_KeyboardEvent.KEY_PRESS = "keypress";
haxe_ui_events_KeyboardEvent.KEY_UP = "keyup";
haxe_ui_events_MouseEvent.MOUSE_MOVE = "mousemove";
haxe_ui_events_MouseEvent.MOUSE_OVER = "mouseover";
haxe_ui_events_MouseEvent.MOUSE_OUT = "mouseout";
haxe_ui_events_MouseEvent.MOUSE_DOWN = "mousedown";
haxe_ui_events_MouseEvent.MOUSE_UP = "mouseup";
haxe_ui_events_MouseEvent.MOUSE_WHEEL = "mousewheel";
haxe_ui_events_MouseEvent.CLICK = "click";
haxe_ui_events_MouseEvent.DBL_CLICK = "doubleclick";
haxe_ui_events_MouseEvent.RIGHT_CLICK = "rightclick";
haxe_ui_events_MouseEvent.RIGHT_MOUSE_DOWN = "rightmousedown";
haxe_ui_events_MouseEvent.RIGHT_MOUSE_UP = "rightmouseup";
haxe_ui_events_ScrollEvent.CHANGE = "scrollchange";
haxe_ui_events_ScrollEvent.START = "scrollstart";
haxe_ui_events_ScrollEvent.STOP = "scrollstop";
haxe_ui_events_ThemeEvent.THEME_CHANGED = "themeChanged";
haxe_ui_events_ValidationEvent.START = "ValidationStart";
haxe_ui_events_ValidationEvent.STOP = "ValidationStop";
haxe_ui_locale_LocaleEvent.LOCALE_CHANGED = "localeChanged";
haxe_ui_locale_LocaleManager._registeredComponents = new haxe_ds_ObjectMap();
haxe_ui_styles_Parser.cssKeyframesRegex = new EReg("@keyframes\\s*(\\w+?)\\s*\\{([\\s\\S]*?\\}\\s*?)\\}","gi");
haxe_ui_styles_Parser.cssKeyframeSelectorRegex = new EReg("([\\w%]+)\\s*\\{\\s*([\\s\\S]*?)\\s*\\}","gi");
haxe_ui_styles_Parser.combinedCSSMediaRegex = new EReg("((\\s*?(?:/\\*[\\s\\S]*?\\*/)?\\s*?@media[\\s\\S]*?)\\{([\\s\\S]*?)\\}\\s*?\\})|(([\\s\\S]*?)\\{([\\s\\S]*?)\\})","gi");
haxe_ui_styles_Parser.cssCommentsRegex = new EReg("(/\\*[\\s\\S]*?\\*/)","gi");
haxe_ui_styles_Parser.cssImportStatementRegex = new EReg("@import .*?;","gi");
haxe_ui_styles_Parser.newlineRegex = new EReg("\n+","g");
haxe_ui_styles_ValueTools.timeEReg = new EReg("^(-?\\d+(?:\\.\\d+)?)(s|ms)$","gi");
haxe_ui_styles_ValueTools.colors = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	_g.h["black"] = 0;
	_g.h["red"] = 16711680;
	_g.h["lime"] = 65280;
	_g.h["blue"] = 255;
	_g.h["white"] = 16777215;
	_g.h["aqua"] = 65535;
	_g.h["fuchsia"] = 16711935;
	_g.h["yellow"] = 16776960;
	_g.h["maroon"] = 8388608;
	_g.h["green"] = 32768;
	_g.h["navy"] = 128;
	_g.h["olive"] = 8421376;
	_g.h["purple"] = 8388736;
	_g.h["teal"] = 32896;
	_g.h["silver"] = 12632256;
	_g.h["gray"] = 8421504;
	_g.h["grey"] = 8421504;
	$r = _g;
	return $r;
}(this));
haxe_ui_styles_animation_AnimationOptions.DEFAULT_DURATION = 0;
haxe_ui_styles_animation_AnimationOptions.DEFAULT_DELAY = 0;
haxe_ui_styles_animation_AnimationOptions.DEFAULT_ITERATION_COUNT = 1;
haxe_ui_styles_animation_AnimationOptions.DEFAULT_EASING_FUNCTION = haxe_ui_styles_EasingFunction.EASE;
haxe_ui_styles_animation_AnimationOptions.DEFAULT_DIRECTION = "normal";
haxe_ui_styles_animation_AnimationOptions.DEFAULT_FILL_MODE = "forwards";
haxe_ui_themes_Theme.DEFAULT = "default";
haxe_ui_themes_Theme.DARK = "dark";
haxe_ui_tooltips_ToolTipManager.defaultDelay = 500;
haxe_ui_tooltips_ToolTipManager.fade = true;
haxe_ui_util_MathUtil.MAX_INT = 2147483647;
haxe_ui_util_MathUtil.MIN_INT = -2147483648;
haxe_ui_util_StyleUtil.style2ComponentEReg = new EReg("-(\\w)","g");
haxe_ui_util_StyleUtil.component2StyleEReg = new EReg("([A-Z])","g");
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
