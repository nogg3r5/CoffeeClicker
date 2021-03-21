var made = 0;
var drunk = 0;
var money = 10;
var units = undefined;
var coffeeSupplies = [];
var drink = false;
var looprate =125;
var madeTotal = 0;
var drunkTotal = 0;
var income = 0;
var tickCount = 10;
var perTicks = 10;
var moneyTotal = 0;
var messages = [];
var job = false;
var cafeUnlocked = false;
var jobTickCount


var aeropressBrewer = undefined;

var coffees = {
  instant: instant,
  premiumInstant: premiumInstant,
  aeropress: aeropress
};

var instant = {
  name: "Instant",
  time: 5,
  cost: 1,
  pretentiousness: 0,
  taste: 1,
  requireskit: false,
  consumes: instantConsumes={
  instantCoffee: 1,
  water: 1}
};

var premiumInstant = {
  name: "Premium Instant",
  time: 5,
  cost: 2,
  pretentiousness: 1,
  taste: 2,
  requireskit: false,
  consumes: premiumInstantConsumes={
  premiumInstantCoffee: 1,
  water: 1}
};

var aeropress = {
  name: "Aeropress",
  time: 10,
  cost: 1,
  pretentiousness: 2,
  taste: 5,
  requireskit: true,
  requires: req={
    kit1: aeropressBrewer,
  },
  consumes: aeropessConsumes={
  groundCoffee: 1,
  aeropressFilters: 1,
  water: 1}
};

var supplyCosts = {
 water: 1,
 instant: 1,
 premiumInstant: 2,
 filters: 1
}

var supplyNames = {
  water : "Water",
  instantCoffee : "Instant Coffee",
  premiumInstantCoffee : "Premium Instant Coffee",
  groundCoffee: "Ground Coffee",
  aeropressFilters : "Paper Aeropress Filters"
}

var kitCosts = {
  aeropress: 30,
  mokapot: 25
}

var currentlyDrinking = instant;
var buttons = [{'name':'Make Coffee', 'onClick': 'MakeCoffee(1)', id: "btnMade"},
{'name':'Drink Coffee', 'onClick': 'DrinkCoffee(1)', id: "btnDrink"},
{'name':'Buy Supplies', 'onClick': 'buySupplies()', id: "btnBuySupplies"}
]
function showSupplies(){
  elementParent = document.getElementById('Supplies')
  elementChild = elementParent.childNodes[0]
  var list = document.createElement('ul')
  for(supply in coffeeSupplies){
    var item = document.createElement('li')
    item.appendChild(document.createTextNode(supplyNames[supply]+": "+coffeeSupplies[supply]))
    list.appendChild(item)

  }
  elementChild.replaceWith(list)
}

function updateMessages(newMsg){
  element = document.getElementById('Messages')
  element = element.childNodes[0]
//  var item = document.createElement('li');
  if(messages.length < 5){
    messages.push(newMsg);
    var list = document.createElement('ul');
    for(index = messages.length -1; index >= 0; --index){
              var item = document.createElement('li');
              // Set its contents:
              item.appendChild(document.createTextNode(messages[index]));
              // Add it to the list:
              list.appendChild(item);
          }
          element.replaceWith(list)
 }else{
  messages.shift();
  messages.push(newMsg)
  var list = document.createElement('ul');
  for(index = messages.length-1; index >= 0; --index){
            var item = document.createElement('li');
            // Set its contents:
            item.appendChild(document.createTextNode(messages[index]));
            // Add it to the list:
            list.appendChild(item);
        }
        element.replaceWith(list)
}
 }

function checkForBtn(checkForBtnName){
  var check = undefined;
  qname = !!document.querySelector("#"+checkForBtnName)
if(qname == true){check = true;}else{check = false;}
return check;
  }
function addButtonToContainer(b) {
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

function MakeCoffee(number){
 made = made + number;
 madeTotal = madeTotal +1;
 for(redSupply in currentlyDrinking.consumes){
   coffeeSupplies[redSupply] = coffeeSupplies[redSupply] - currentlyDrinking.consumes[redSupply];
 }
 checkForSupplies()
};

function checkForDrink(){
  if(made > 0){
    drink= true;
    document.getElementById("btnDrink").disabled = false;
    document.getElementById("btnMade").disabled = true;
  }else{
    drink=false;
    document.getElementById("btnDrink").disabled = true;
    document.getElementById("btnMade").disabled = false;
  }
};

function checkForSupplies(y){
  var checksupply = undefined;
  for(checksupply in coffeeSupplies){
  if(y>0){console.log(checksupply +" "+ coffeeSupplies[checksupply])}
 }
 for(cDSupply in currentlyDrinking.consumes){
   cDSupplyValue = coffeeSupplies[cDSupply];
 if(!(cDSupply in coffeeSupplies) || cDSupplyValue < 1){
   haveSupplies = false;
   document.getElementById("btnMade").disabled = true;
 }else{
   haveSupplies = true;
   document.getElementById("btnMade").disabled = false;}
}
return haveSupplies
}

function DrinkCoffee(){
 made = made - 1;
 drunkTotal = drunkTotal + 1;
 updateCounter("Drunk",drunkTotal)
};

function buySupplies(){
if (money < currentlyDrinking.cost){
  if(checkForBtn("btnJob") == false){
    btnjob = {'name':'Get a Job', 'onClick': 'getJob()', id: "btnJob"};
    addButtonToContainer(btnjob)
  }else{if(job == false){updateMessages("Get a job!");}else{updateMessages("You're broke, wait for some more money to come in.")}}
  }else{
  var supply = undefined;
  for(supply in currentlyDrinking.consumes){
    if(!(supply in coffeeSupplies)){coffeeSupplies[supply] = 1;
    money = money - currentlyDrinking.cost;}
    else{
      coffeeSupplies[supply] = coffeeSupplies[supply] + 1;
      money = money - currentlyDrinking.cost;
    }
  }checkForSupplies(1);
  updateCounter("Money",money,"£");
};
};

function updateCounter(name,counted,units){
  if(units == undefined){units = ""}
qname = !!document.querySelector("#"+name)
selName = document.querySelector("#"+name)
if(qname == true){selName.innerHTML= name+": "+units+counted}else{
const container = document.getElementById('counters');
  const word = document.createElement('p');
  container.appendChild(word);
  var pID = document.createAttribute("id");
  pID.value = name;
  word.setAttributeNode(pID);
  var t = document.createTextNode(name+": "+units+counted);     // Create a text node
  word.appendChild(t);
}
}

function getJob(){
  job = true;
  income = income+ 1;
  const container = document.getElementById('btnJob');
  document.getElementById("btnJob").disabled = true;
  container.innerText = "Get a better job";
  jobTickCount = 100;
}
function jobTimer(){
  if(jobTickCount == 0){
    document.getElementById("btnJob").disabled = false;
  }else{
    jobTickCount = jobTickCount - 1;
  }

}
function earnMoney(){
  if(tickCount == 0){
  money = money + income;
  updateCounter("Money",money,"£")
  tickCount = perTicks;
  moneyTotal = moneyTotal + income;
}else{tickCount = tickCount -1;updateCounter("Money",money,"£")}
}

function chgpremium(){currentlyDrinking = premiumInstant;console.log("Currently Drinking: " +currentlyDrinking.name);}
function chginstant(){currentlyDrinking = instant;console.log("Currently Drinking: " +currentlyDrinking.name);}
function chgaero(){currentlyDrinking = aeropress;console.log("Currently Drinking: " +currentlyDrinking.name);}

function unlocks(){

  if(moneyTotal>100000){cafeUnlocked=true;updateMessages("Time to open your own coffee shop!")}
  if(moneyTotal>100){premiumInstantUnlocked=true;if(checkForBtn("btnPrem") == false){updateMessages("You can buy Premium Instant Coffee!");btnPrem = {'name':'Switch to Premium', 'onClick': 'chgpremium()', id: "btnPrem"};btnInst={'name':'Switch to Instant', 'onClick': 'chginstant()', id: "btnInst"};addButtonToContainer(btnInst);addButtonToContainer(btnPrem);}}
  if(moneyTotal>200){aeropressUnocked=true;if(checkForBtn("btnAero") == false){updateMessages("You can buy Aeropress!");btnAero = {'name':'Switch to Aeropress', 'onClick': 'chgaero()', id: "btnAero"};addButtonToContainer(btnAero)}}
}

window.setInterval(function(){
earnMoney()
checkForDrink()
checkForSupplies()
jobTimer()
showSupplies()
}, looprate);
