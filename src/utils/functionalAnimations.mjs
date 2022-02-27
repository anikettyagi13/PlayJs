// handling functional values
export function handleFunctionAsAnimationParameter(value){
    if(value.length===0)
      return value();
    else
      return value;
  }
  
  // handle functional value when called
export function getValueFromFunction(value,timePassed){
    return value(timePassed);
}
  