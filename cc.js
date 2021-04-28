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
var jobTickCount = undefined;
var multiplier = 0;
var makeCoffeeTime = 0;
var pretentiousness = 0;
var caffeine = 0;
var gods = ['James Hoffman', 'Scott Rao', 'Carol from WholeLatteLove']

var equipment={
  aeropressBrewer: {purchased:false,cost: 30,btn: "btnAero"},
  mokaPot: {purchased: false,cost: 25, btn: "btnMoka"},
  pouroverBrewer:{purchased: false,cost:15, btn: "btnPourover"},
  espressoMachine:{purchased: false, cost:1500, btn: "btnEspresso"}
}

var instant = {
  name: "Instant",
  time: 5,
  cost: 2,
  pretentiousness: 0,
  taste: 1,
  caffeine: 50,
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
  caffeine: 50,
  requireskit: false,
  consumes: premiumInstantConsumes={
  premiumInstantCoffee: 1,
  water: 1}
};

var aeropress = {
  name: "Aeropress",
  time: 15,
  cost: 2,
  pretentiousness: 2,
  taste: 5,
  caffeine: 70,
  requireskit: true,
  requires: req={
    kit1: equipment.aeropressBrewer,
  },
  consumes: aeropessConsumes={
  groundCoffee: 1,
  aeropressFilters: 1,
  water: 1}
};

var mokapot = {
  name: "Moka Pot",
  time: 10,
  cost: 2,
  pretentiousness: 1,
  taste: 2,
  caffeine: 70,
  requireskit: true,
  requires: req={
    kit1: equipment.mokaPot,
  },
  consumes: mokaPotConsumes={
  groundCoffee: 1,
  water: 1}
};

var pourover = {
  name: "Pourover",
  time: 20,
  cost: 2,
  pretentiousness: 4,
  taste: 5,
  caffeine:90,
  requireskit: true,
  requires: req={
    kit1: equipment.pouroverBrewer,
  },
  consumes: pouroverConsumes={
  groundCoffee: 1,
  pouroverFilters: 1,
  water: 1}
};

var espresso = {
  name: "Espresso",
  time: 50,
  cost: 5,
  pretentiousness: 10,
  taste: 15,
  caffeine: 110,
  requireskit: true,
  requires: req={
    kit1: equipment.espressoMachine,
  },
  consumes: espressoConsumes={
  groundCoffee: 1,
  milk: 1,
  water: 1}
};

var supplyCosts = {
 water: 1,
 instantCoffee: 1,
 premiumInstantCoffee: 2,
 pouroverFilters: 2,
 aeropressFilters: 2,
 groundCoffee: 5,
 milk: 2
}

var supplyNames = {
  water : "Water",
  instantCoffee : "Instant Coffee",
  premiumInstantCoffee : "Premium Instant Coffee",
  groundCoffee: "Ground Coffee",
  aeropressFilters : "Paper Aeropress Filters",
  pouroverFilters: "Unbleached Paper Pourover Filters",
  milk: "Milk"
}

var currentlyDrinking = instant;
var buttons = [{'name':'Make Coffee', 'onClick': 'MakeCoffee(1)', id: "btnMade", container:"CoffeeClicker"},
{'name':'Drink Coffee', 'onClick': 'DrinkCoffee(1)', id: "btnDrink", container:"CoffeeClicker"},
{'name':'Buy Supplies', 'onClick': 'buySupplies()', id: "btnBuySupplies", container:"CoffeeClicker"}
]


function buyKit(kit,btn){
  if(equipment.hasOwnProperty(kit)){
    console.log("Kit is valid")
   if(equipment[kit]["purchased"] == false){
     console.log("Kit is not yet purchased")
      if(equipment[kit]["cost"] < money){
      console.log("You can afford it!")
      money = money - equipment[kit]["cost"]
        equipment[kit]["purchased"] = true;
if(document.getElementById(btn)){document.getElementById(btn).remove()}
      }else{console.log("you cannot afford it")
      }
 }else{console.log("Kit is already purchased");
 }
}else{console.log("Not valid kit")
}

}

function checkForKit(kit){
  if(equipment.hasOwnProperty(kit)){
   if(equipment[kit]["purchased"] == true){
     if(checkForBtn(equipment[kit]["btn"]) == true){
     document.getElementById(equipment[kit]["btn"]).disabled = false;
   }
   }else{
     if(checkForBtn(equipment[kit]["btn"]) == true){
     document.getElementById(equipment[kit]["btn"]).disabled = true;
   }
   }
 }
}

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
function hideButton(checkforBtnState){
 var flipState = undefined;
 flipState = document.querySelector("#"+checkforBtnState)
 if(flipState.disabled == false){flipState.disabled = true;}
}
function showButton(checkforBtnState){
 var flipState = undefined;
 flipState = document.querySelector("#"+checkforBtnState)
 if(flipState.disabled == true){flipState.disabled = false;}
}
function addButtonToContainer(b) {
    const container = document.getElementById(b['container']);
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
    //ONly add the button if it doesnt exist.
    if(checkForBtn(b['id']) == false){
    container.appendChild(button);
  }
}

for(b in buttons){
  addButtonToContainer(buttons[b])
}

function MakeCoffee(number){
 made = made + number;
 madeTotal = madeTotal +1;
 updateCounter("Made",madeTotal)
 for(redSupply in currentlyDrinking.consumes){
   coffeeSupplies[redSupply] = coffeeSupplies[redSupply] - currentlyDrinking.consumes[redSupply];
 }
 checkForSupplies()
 makeCoffeeTime = currentlyDrinking.time;
};

//make drinks coldown timer
function makeCoffeeTimer(){
  if(makeCoffeeTime != 0){
        makeCoffeeTime = makeCoffeeTime -1;
      }
}

function checkForDrink(){
  if(made > 0){
    drink= true;
    document.getElementById("btnDrink").disabled = false;
    //document.getElementById("btnMade").disabled = true;
  }else{
    drink=false;
    document.getElementById("btnDrink").disabled = true;
    //document.getElementById("btnMade").disabled = false;
  }
};

function checkForSupplies(y){
  var checksupply = undefined;
  for(checksupply in coffeeSupplies){
  if(y>0){console.log(checksupply +" "+ coffeeSupplies[checksupply])}
 }
 for(cDSupply in currentlyDrinking.consumes){
   cDSupplyValue = coffeeSupplies[cDSupply];
 if(!(cDSupply in coffeeSupplies) || cDSupplyValue < 1 || makeCoffeeTime > 0){
   haveSupplies = false;
   document.getElementById("btnMade").disabled = true;
   return haveSupplies;
 }else{
   haveSupplies = true;
   document.getElementById("btnMade").disabled = false;}
}
return haveSupplies
}

function DrinkCoffee(){
 made = made - 1;
 drunkTotal = drunkTotal + 1;
 pretentiousness = pretentiousness +currentlyDrinking.pretentiousness;
 updateCounter("Drunk",drunkTotal)
 updateCounter("Pretentiousness",pretentiousness)
 decaffeinate(currentlyDrinking.caffeine)
};


function buySupplies(multiplier){
  var cost = 0
  for(supply in currentlyDrinking.consumes){cost = cost + supplyCosts[supply]}
if (money < cost){
  if(checkForBtn("btnJob") == false){
    btnjob = {'name':'Get a Job', 'onClick': 'getJob()', id: "btnJob", container:"CoffeeClicker"};
    addButtonToContainer(btnjob)
  }else{if(job == false){updateMessages("Get a job!");}else{updateMessages("You're broke, wait for some more money to come in.")}}
  }else{
  for(supply in currentlyDrinking.consumes){
    if(!(supply in coffeeSupplies)){
      coffeeSupplies[supply] = 1;
      money = money - supplyCosts[supply];
  }else{
      coffeeSupplies[supply] = coffeeSupplies[supply] + 1;
      money = money - supplyCosts[supply];
    }
  }checkForSupplies();

};
updateCounter("Money",money,"£");
};

function updateCounter(name,counted,units){
  if(units == undefined){units = ""};
  counted = +counted.toFixed(2)
  //if(counted == 0){return}
var qname = !!document.querySelector("#"+name);
var selName = document.querySelector("#"+name)
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
  if(income == 0){income = 1}else{
  income = income + (income/3);
  income = +income.toFixed(2)}
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
  money = +money.toFixed(5)
  updateCounter("Money",money,"£")
  tickCount = perTicks;
  moneyTotal = moneyTotal + income;
  if(job == true){updateCounter("LifetimeEarnings",moneyTotal,"£");  updateCounter('Pay',income,"£")}
}else{tickCount = tickCount -1;updateCounter("Money",money,"£")}
}

function chgpremium(){currentlyDrinking = premiumInstant;updateMessages("Currently Drinking: " +currentlyDrinking.name);}
function chginstant(){currentlyDrinking = instant;updateMessages("Currently Drinking: " +currentlyDrinking.name);}
function chgaero(){currentlyDrinking = aeropress;updateMessages("Currently Drinking: " +currentlyDrinking.name);}
function chgMoka(){currentlyDrinking = mokapot;updateMessages("Currently Drinking: " +currentlyDrinking.name);}
function chgPourover(){currentlyDrinking = pourover;updateMessages("Currently Drinking: " +currentlyDrinking.name);}
function chgEspresso(){currentlyDrinking = espresso;updateMessages("Currently Drinking: " +currentlyDrinking.name);}

function unlocks(){
  if(income>100 && cafeUnlocked == false && money > 10000){
    cafeUnlocked=true;
    updateMessages("Time to open your own coffee shop!")
  }
  if(income>5){
    premiumInstantUnlocked=true;
    if(checkForBtn("btnPrem") == false){
      updateMessages("You can buy Premium Instant Coffee!");
      btnPrem = {'name':'Switch to Premium', 'onClick': 'chgpremium()', id: "btnPrem", container:"CoffeeClicker"};
      btnInst={'name':'Switch to Instant', 'onClick': 'chginstant()', id: "btnInst", container:"CoffeeClicker"};
      addButtonToContainer(btnInst);
      addButtonToContainer(btnPrem);
    }
  }
  if(income>20){
    aeropressUnlocked=true;
    if(checkForBtn("btnAero") == false){
      updateMessages("You can buy Aeropress!");
      btnAero = {'name':'Switch to Aeropress', 'onClick': 'chgaero()', id: "btnAero", container:"CoffeeClicker"};
      btnBuyAero = {'name':'Buy Aeropress', 'onClick': 'buyKit("aeropressBrewer","btnBuyAero")', id: "btnBuyAero", container:"Upgrades"};
      addButtonToContainer(btnAero)
      addButtonToContainer(btnBuyAero)
    }
      //document.getElementById("btnAero").disabled = true;
    }
  if(income>35){
    mokapotUnlocked=true;
    if(checkForBtn("btnMoka") == false){
      updateMessages("You can buy Moka Pot!");
      btnMoka = {'name':'Switch to Mokapot', 'onClick': 'chgMoka()', id: "btnMoka", container:"CoffeeClicker"};
      btnBuyMoka = {'name':'Buy Mokapot', 'onClick': 'buyKit("mokaPot","btnBuyMoka")', id: "btnBuyMoka", container:"Upgrades"};
      addButtonToContainer(btnMoka)
      addButtonToContainer(btnBuyMoka)
    }
  }
  if(income>60){
    pouroverUnlocked=true;
    if(checkForBtn("btnPourover") == false){
      updateMessages("You can buy Pourover Brewer!");
      btnPourover = {'name':'Switch to Pourover', 'onClick': 'chgPourover()', id: "btnPourover", container:"CoffeeClicker"};
      btnBuyPouroverBrewer = {'name':'Buy Pourover Brewer', 'onClick': 'buyKit("pouroverBrewer","btnBuyPouroverBrewer")', id: "btnBuyPouroverBrewer", container:"Upgrades"};
      addButtonToContainer(btnPourover)
      addButtonToContainer(btnBuyPouroverBrewer)
    }
  }
  if(income>100){
    espressoUnlocked=true;
    if(checkForBtn("btnEspresso") == false){
    updateMessages("You can buy an Espresso Machine!")
    btnEspresso = {'name':'Switch to Espresso', 'onClick': 'chgEspresso()', id: "btnEspresso", container:"CoffeeClicker"};
    btnBuyEspressoMachine = {'name':'Buy Espresso Machine', 'onClick': 'buyKit("espressoMachine","btnBuyEspressoMachine")', id: "btnBuyEspressoMachine", container:"Upgrades"};
    addButtonToContainer(btnEspresso)
    addButtonToContainer(btnBuyEspressoMachine)
  }
}
}

function decaffeinate(addCaffeine){
    if(addCaffeine > 0){caffeine = caffeine + addCaffeine}
    if(caffeine > 10500){die()}
  if(caffeine == 0){return}else{
    caffeine = caffeine - 1;
    updateCounter("Caffeine",caffeine,"mg")
  }
}
function die(){
  god = gods[Math.floor(Math.random() * gods.length)];
alert("You drank too much coffee! You died.");
alert("The ghost of "+god+" appeared and informed you of the virtues of moderate caffeine consumption.")
  location.reload()
}
window.setInterval(function(){
earnMoney()
checkForDrink()
checkForSupplies()
jobTimer()
showSupplies()
unlocks()
makeCoffeeTimer()
decaffeinate()
updateCounter("Money",money,"£");
for(kit in equipment){checkForKit(kit)}
}, looprate);
