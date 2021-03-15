var made = 0;
var drunk = 0;
var money = 10;
var coffeeSupplies = [];
var drink = false;
var looprate =125;

var coffees = {
  instant: instant,
  premiumInstant: premiumInstant
};

var instant = {
  name: "Instant",
  time: 5,
  cost: 1,
  pretentiousness: 0,
  taste: 1,
  consumes: instantConsumes={
  instantCoffee: 1,
  water: 1}
};

var premiumInstant = {
  name: "Premium Instant",
  time: 5,
  cost: 2,
  pretentiousness: 0,
  taste: 2,
  consumes: premiumInstantConsumes={
  premiumInstantCoffee: 1,
  water: 1}
};

var supplyCosts = {
 water: 1,
 instant: 1,
 premiumInstant: 2
}

var currentlyDrinking = instant;
checkForSupplies()
checkForDrink()
function MakeCoffee(number){
 made = made + number;
 money = money - currentlyDrinking.cost
 for(redSupply in currentlyDrinking.consumes){
   coffeeSupplies[redSupply] = coffeeSupplies[redSupply] - currentlyDrinking.consumes[redSupply];
 }
};

function checkForDrink(){
  if(made > 0){drink= true; document.getElementById("btnDrink").disabled = false; document.getElementById("btnMade").disabled = true;}else{drink=false; document.getElementById("btnDrink").disabled = true; document.getElementById("btnMade").disabled = false;}
};

function checkForSupplies(y){
  var checksupply = null;
 for(checksupply in coffeeSupplies){
//calling function with 1 outputs to console
  if(y>0){console.log(checksupply +" "+ coffeeSupplies[checksupply])}
 }
 for(cDSupply in currentlyDrinking.consumes){
   cDSupplyValue = coffeeSupplies[checksupply];
 if(!(cDSupply in coffeeSupplies) || cDSupplyValue < 1){haveSupplies = false;document.getElementById("btnMade").disabled = true;}else{haveSupplies = true;document.getElementById("btnMade").disabled = false;}
}
return haveSupplies
}

function DrinkCoffee(){
 made = made - 1;
};

function buySupplies(){
//Add supplies, if the supply doesnt exist already
var supply = null;
  for(supply in currentlyDrinking.consumes){
    if(!(supply in coffeeSupplies)){coffeeSupplies[supply] = 1;}
    else{
      coffeeSupplies[supply] = coffeeSupplies[supply] + 1;
    }
  }checkForSupplies(1)
};

function chgpremium(){currentlyDrinking = premiumInstant;console.log("Currently Drinking: " +currentlyDrinking.name);}
function chginstant(){currentlyDrinking = instant;console.log("Currently Drinking: " +currentlyDrinking.name);}
window.setInterval(function(){
checkForDrink()
checkForSupplies()
}, looprate);
