
// function declaration
function todo(){
    // execute code
}

var dongyeon = function company(){
    // execute code
}

var company = function(){
    // execute code
}

(function dongyeon(){
    // execute code
}());

(function(){
    // execute code
}());

(
    function()
    {
        // execute code
    }()
);

//////////////////////////////////////////////////////////////////////////////////////////

class person{
    constructor(varA, varB)
    {
        this.varA = varA;
        this.varB = varB;
    }

    #privateVar = "privateValue";
    publicVar = "publicValue";
}

var jongil = new person("aa","bb");
console.log(jongil.publicVar);

