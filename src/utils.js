/// Custom inheritance function that prevents the super class's constructor
/// from being called on inehritance.
/// Also assigns constructor property of the subclass properly.
function inherit(subclass,base){
    // If the browser or ECMAScript supports Object.create, use it
    // (but don't remember to redirect constructor pointer to subclass)
    if(Object.create){
        subclass.prototype = Object.create(base.prototype);
    }
    else{
        var sub = function(){};
        sub.prototype = base.prototype;
        subclass.prototype = new sub;
    }
    subclass.prototype.constructor = subclass;
}