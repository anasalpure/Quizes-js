function template(str, delims) {
  // Fill this in
  

  return function (...params) {
    let times = 1;

    let result;
    //if ther is only one argument then it must be the number of times  and params is empty
    //other wise the last argument must be the number of times and params the rest elements
    if( params.length === 1 )
      times=params[0] 
    else 
      times = params[params.length-1] ;
    //remove last element 
    params.splice( -1 , 1);

    //there is no params
    if(params.length===0)
      result= repeat(str , times);
    else{
      str= apply(str , params ,delims  )   ;
      result= repeat(str , times);
    }

    for(let item of result)
        console.log (item);
    return result; // template renderer usually returns a string
  };

}


function repeat (srt ,times){
  let result= [];
  for(let i=0 ; i<times ; i++){
    result.push(srt);
  }
  return result;
}

function apply (str , params , delims ) {
  if(delims) return apply_custom(str , params , delims );

  for(let i=0 ; i<params.length ; i++){
    str=str.replace(/\*\([\w.]+\)\*/i , params[i]);
  }
  return str;
}

function apply_custom (str , params , delims ){
    //delims = {open:'*(', close:')*'}
    let { open , close } = delims ;
  
    let regex = new RegExp(open + "[a-zA-Z]+" + close  , 'i');
    for(let i=0 ; i<params.length ; i++){
      str=str.replace(regex , params[i]);
    }
    return str;
}


