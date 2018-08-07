// Create your own Event Tracker system:
//
// 1. create an `EventTracker` object
//    • it should accept a name when constructed
// 2. extend the `EventTracker` prototype with:
//    • an `on` method
//    • a `notify` method
//    • a `trigger` method



var eventSplitter = /\s+/;

function EventTracker (name){
    if(!name) throw new error("should pass one argument as name of event")
    this.name=name;
    this.events=null;
    this.listeners =null; 
}




EventTracker.prototype.on = function(name, callback) {
    if(!(typeof callback =='function'))throw new error("callback should  be a function not "+ typeof callback )
    if (name && eventSplitter.test(name)) {
        // Handle space-separated event names by delegating them individually.
        for (names = name.split(eventSplitter); i < names.length; i++) {
            events = makeEvents(events, names[i], callback);
        }
    }
    else {
        events = makeEvents.call(this , name, callback);
    }
  return events;
}

function makeEvents(name, callback){
    if(!this.events) this.events= new Map();
    this.events.set(name , {callback:callback});
    return this.events ;
}


EventTracker.prototype.off = function(name, callback, context) {
}

EventTracker.prototype.trigger = function(name ,args) {
    if (!this.events) return this;
    
    if(this.events.has(name)){
        let event = this.events.get(name) ;
        event.callback.call(this , args);
        //notify all listener that wana this event 
        if(this.listeners && this.listeners.has(name)){
            listeners= this.listeners.get(name);
            for(let listener of listeners){
                listener.trigger(name);
            }
        }
    }
    else{
        throw error('there is no event with name '+ name);
    }
    return this;
};

EventTracker.prototype.notify = function(obj , eventName) {
    if (!this.listeners)  this.listeners= new Map(); 
    if(! (typeof obj =='object'))throw new error("first paramter should be object and not  "+ typeof callback )
    //if there is old listeners for special eveny =  eventName
    if(this.listeners.has(eventName)){
        listeners= this.listeners.get(eventName);
        listeners.push(obj);
    }
    else{
        this.listeners.set( eventName ,[ obj ]);
    }
};

// EXAMPLE:
 function purchase(item) { console.log( 'purchasing ' + item); }
 function celebrate() { console.log( this.name + ' says birthday parties are awesome!' ); }

 var nephewParties = new EventTracker( 'nephews ');
 var richard = new EventTracker( 'Richard' );

 nephewParties.on( 'mainEvent', purchase );
 richard.on( 'mainEvent', celebrate );

 nephewParties.notify( richard, 'mainEvent' );
 nephewParties.trigger( 'mainEvent', 'ice cream' );