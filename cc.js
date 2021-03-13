var made = 0;
var drunk = 0;
var automake = false;
var autodrink = false;
var upgradefromInstant = null;

var savegame = JSON.parse(localStorage.getItem("save"));
if (typeof savegame.made !== "undefined") made = savegame.made;
function delsave(){
 localStorage.removeItem("save")
 made = 0;
 drunk =0;
 save()
}

function save(){
var save = {
 made: made,
 drunk: drunk
}
localStorage.setItem("save",JSON.stringify(save));
}

function MakeCoffee(number){
 made = made + number;
 if(made > 9){document.getElementById("made").innerHTML = made + ' AutoMake Enabled!';automake =true;}
 else{document.getElementById("made").innerHTML = made;automake=false;}
};

function DrinkCoffee(number){
 if (drunk < made){
   drunk = drunk + number;document.getElementById("drunk").innerHTML = drunk;
   if(drunk > 9){document.getElementById("drunk").innerHTML = drunk + ' AutoDrink Enabled!';autodrink =true;}
   else{document.getElementById("drunk").innerHTML = drunk;autodrink=false;}
 }
 else{document.getElementById("errors").innerHTML = 'You need to make a drink!';}
};

window.setInterval(function(){
if(automake == true){MakeCoffee(1);}
if(autodrink == true){DrinkCoffee(1);}
if(made > 19){upgradefromInstant = true;document.getElementById("upgrades").innerHTML = 'Upgrade available';}
//Clear Errors
if(made>drunk){document.getElementById("errors").innerHTML = null;}
save()
}, 1000);
