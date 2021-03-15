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

function MakeCoffee(number){
  console.log("Making Coffee")
  checkForSupplies()
 made = made + number;
 money = money - currentlyDrinking.cost
 for(supply in currentlyDrinking.consumes){
   coffeeSupplies[supply] = coffeeSupplies[supply] - 1;
 }
 console.log("Made Coffee")
 checkForSupplies()
};

function checkForDrink(){
  if(made > 0){drink= true; document.getElementById("btnDrink").disabled = false; document.getElementById("btnMade").disabled = true;}else{drink=false; document.getElementById("btnDrink").disabled = true; document.getElementById("btnMade").disabled = false;}
};

function checkForSupplies(){
   console.log("Checking Supplies:")
 for(checksupply in coffeeSupplies){
  console.log(checksupply +" "+ coffeeSupplies[checksupply])
 }
 for(cDSupply in currentlyDrinking.consumes){
 if(!(cDSupply in coffeeSupplies)){haveSupplies = false;}else{haveSupplies = true;}
}
//FOr some reason this doesnt quite work.
console.log("Do we have the supplies: "+haveSupplies)
}

function DrinkCoffee(number){
 made = made - 1;
};

function buySupplies(number){
  console.log("Currently Drinking Consumes");
  console.log(currentlyDrinking.consumes)
//Add supplies, if the supply doesnt exist already
var supply = null;
  for(supply in currentlyDrinking.consumes){
    if(!(supply in coffeeSupplies)){coffeeSupplies[supply] = 1;}
    else{
      coffeeSupplies[supply] = coffeeSupplies[supply] + 1;
    }
  }checkForSupplies()
};

function chgpremium(){currentlyDrinking = premiumInstant;console.log("Currently Drinking: " +currentlyDrinking.name);}
function chginstant(){currentlyDrinking = instant;console.log("Currently Drinking: " +currentlyDrinking.name);}
window.setInterval(function(){
checkForDrink()
}, looprate);
