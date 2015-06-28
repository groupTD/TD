/// Custom inheritance function that prevents the super class's constructor
/// from being called on inehritance.
/// Also assigns constructor property of the subclass properly.
function inherit(subclass, base) {
    // If the browser or ECMAScript supports Object.create, use it
    // (but don't remember to redirect constructor pointer to subclass)
    if (Object.create) {
        subclass.prototype = Object.create(base.prototype);
    }
    else {
        var sub = function () {
        };
        sub.prototype = base.prototype;
        subclass.prototype = new sub;
    }
    subclass.prototype.constructor = subclass;
}

function matvp(m,v){ // Matrix Vector product
    return [m[0] * v[0] + m[1] * v[1], m[2] * v[0] + m[3] * v[1]];
}

function mattvp(m,v){ // Matrix Transpose Vector product
    return [m[0] * v[0] + m[2] * v[1], m[1] * v[0] + m[3] * v[1]];
}