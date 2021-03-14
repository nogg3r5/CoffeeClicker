var made = 0;
var drunk = 0;
var automake = false;
var autodrink = false;
var upgradefromInstant = null;
var makerate = 1;
var drinkrate =1;
var looprate =1000;

var savegame = JSON.parse(localStorage.getItem("save"));
if (typeof savegame.made !== "undefined") made = savegame.made;
function delsave(){
 localStorage.removeItem("save")
 made = 0;
 drunk =0;
 document.getElementById("drunk").innerHTML = null;
 document.getElementById("made").innerHTML = null;
 document.getElementById("upgrades").innerHTML = null;
 document.getElementById("errors").innerHTML = null;
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

function upgrades(){
//if(made > 19&& made < 50){upgradefromInstant = true;document.getElementById("upgrades").innerHTML = 'Upgrade available';}
}

function premcoffee(){makerate = 2;}
function addfriend(){drinkrate = 2;}

var forms = document.forms[0];
var i = 0;
function checkboxes(){
  for (i = 0; i < forms.length; i++){
    if (forms[i].checked){console.log(forms[i])}
  }
}
document.querySelector('#premcoffee')
        .addEventListener('change', function()
{
    if (this.checked)
    {
        premcoffee();
    }
    if (this.checked == false){
      makerate = 1;
    }
}, false);


window.setInterval(function(){
save()
upgrades()
checkboxes()
if(automake == true&&made > 9){MakeCoffee(makerate);}
if(autodrink == true&& drunk > 9){DrinkCoffee(drinkrate);}
//Clear Errors
if(made>drunk){document.getElementById("errors").innerHTML = null;}
}, looprate);
