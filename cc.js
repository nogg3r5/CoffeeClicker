var made = 0;
var drunk = 0;
var drink = false;
var looprate =125;

function MakeCoffee(number){
 made = made + number;
};

function checkForDrink(){
  if(made > 0){drink= true; document.getElementById("btnDrink").disabled = false; document.getElementById("btnMade").disabled = true;}else{drink=false; document.getElementById("btnDrink").disabled = true; document.getElementById("btnMade").disabled = false;}
}

function DrinkCoffee(number){
 made = made - 1;
};

window.setInterval(function(){
checkForDrink()
}, looprate);
