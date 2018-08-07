const { test ,module  } = QUnit;

//module EventTracker
module( "EventTracker" );
test( "EventTracker should be  constructor function", assert => {
  assert.equal(typeof EventTracker, 'function', '(EventTracker) Isa function');
  assert.equal(typeof new EventTracker("Name"), 'object', '(new EventTracker) Isa object');
});

test( "EventTracker should have one argument as name of event ", assert => {
  assert.throws( ()=>new EventTracker(), 'should pass one argument as name of event');
});


test( "EventTracker.on(args) args should be 2 params  ", assert => {
  let args =["eventName" , "str"]
  assert.throws( ()=>new EventTracker("name").on(...args), 'callback should not  be a Srting ' );
  args =["eventName" , ()=>{} ]
  assert.ok( ()=>new EventTracker("name").on(...args), 'callback should  be a function');
});

test( "events map attribute ", assert => {
  var args =["eventName" , ()=>{} ]
  var events= new EventTracker("name").on(...args);
  assert.deepEqual(events.has(args[0]), true , 'when call on function shoud eventName add to events map attribute');
});



test( "notify function should have two args ", assert => {
  var args =["eventName" , ()=>{} ]
  var fly= new EventTracker("name");
  var dive= new EventTracker("name2");
  fly.on(...args);
 

  assert.throws( ()=>fly.notify("not object" , 'eventName'), 'the first argument should be object');
  assert.ok( ()=>fly.notify(dive , 'eventName'), 'the first argument should be object');

});

test( "trigger function should call the callback ", assert => {
  var exetued =false;
  var args =['eventName' , ()=>{exetued=true} ]
  var fly= new EventTracker("name");
  var dive= new EventTracker("name2");
  fly.on(...args);
  fly.trigger('eventName');

  assert.deepEqual( exetued ,true , 'callcack should be called');

});

test( "trigger function should notify all listeners  ", assert => {
  var listenersCalled1 =false;
  var listenersCalled2 =false;
  var args0 =['eventName' , ()=>{} ]
  var fly= new EventTracker("name");

  fly.on(...args0);
//first listener
  var dive1= new EventTracker("name2");
  var args1 =['eventName' , ()=>{listenersCalled1=true} ]
  dive1.on(...args1)
//secound listener
  var dive2= new EventTracker("name2");
  var args2 =['eventName' , ()=>{listenersCalled2=true} ]
  dive2.on(...args2)

  fly.notify(dive1 , 'eventName')
  fly.notify(dive2 , 'eventName')
  fly.trigger('eventName');

  assert.deepEqual( listenersCalled1  , true , 'listeners\' callcack should be called');
  assert.deepEqual( listenersCalled2  , true , 'listeners\' callcack should be called');
});