var made = 0;
var drunk = 0;
var money = 10;
var coffeeSupplies = [];
var drink = false;
var looprate =125;
var madeTotal = 0;
var drunkTotal = 0;

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

var buttons = [{'name':'Make Coffee', 'onClick': 'MakeCoffee(1)', id: "btnMade"},
{'name':'Drink Coffee', 'onClick': 'DrinkCoffee(1)', id: "btnDrink"},
{'name':'Buy Supplies', 'onClick': 'buySupplies()', id: "btnBuySupplies"},
{'name':'Switch to Premium', 'onClick': 'chgpremium()', id: "btnPrem"},
{'name':'Switch to Instant', 'onClick': 'chginstant()', id: "btnInst"}]

function addButtonToContainer(b) {
  console.log(b['name'])
    const container = document.getElementById('CoffeeClicker');
    const button = document.createElement('button');
    button.innerText = b['name'];
    var btnID = document.createAttribute("id");
    btnID.value = b['id'];
    var btnType = document.createAttribute("type");
    btnType.value = "button";
    var btnonclick = document.createAttribute("onclick");
    btnonclick.value = b['onClick'];
    button.setAttributeNode(btnID);
    button.setAttributeNode(btnType);
    button.setAttributeNode(btnonclick);
    container.appendChild(button);
}

for(b in buttons){
  addButtonToContainer(buttons[b])
}

var currentlyDrinking = instant;
checkForSupplies()
checkForDrink()
function MakeCoffee(number){
 made = made + number;
 money = money - currentlyDrinking.cost;
 madeTotal = madeTotal +1;
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
 drunkTotal = drunkTotal + 1;
 updateCounter("Drunk",drunkTotal)
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

function updateCounter(name,counted){
  const container = document.getElementById('counters');
  const word = document.createElement('p');
  container.appendChild(word);
  var pID = document.createAttribute("id");
  pID.value = name;
  word.setAttributeNode(pID);
  var t = document.createTextNode(name+": "+counted);     // Create a text node
  word.appendChild(t);
}

function chgpremium(){currentlyDrinking = premiumInstant;console.log("Currently Drinking: " +currentlyDrinking.name);}
function chginstant(){currentlyDrinking = instant;console.log("Currently Drinking: " +currentlyDrinking.name);}
window.setInterval(function(){
checkForDrink()
checkForSupplies()
}, looprate);
