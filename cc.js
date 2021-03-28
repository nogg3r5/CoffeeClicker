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

var equipment={
  aeropressBrewer: {purchased:false,cost: 30,btn: "btnAero"},
  mokaPot: {purchased: false,cost: 25, btn: "btnMoka"},
  pouroverBrewer:{purchased: false,cost:15, btn: "btnPourover"},
}

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
  cost: 2,
  pretentiousness: 2,
  taste: 5,
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
  time: 10,
  cost: 2,
  pretentiousness: 4,
  taste: 5,
  requireskit: true,
  requires: req={
    kit1: equipment.pouroverBrewer,
  },
  consumes: aeropessConsumes={
  groundCoffee: 1,
  pouroverFilters: 1,
  water: 1}
};

var supplyCosts = {
 water: 1,
 instant: 1,
 premiumInstant: 2,
 pouroverFilters: 2,
 aeropressFilters: 2
}

var supplyNames = {
  water : "Water",
  instantCoffee : "Instant Coffee",
  premiumInstantCoffee : "Premium Instant Coffee",
  groundCoffee: "Ground Coffee",
  aeropressFilters : "Paper Aeropress Filters",
  pouroverFilters: "Unbleached Paper Pourover Filters"
}

var currentlyDrinking = instant;
var buttons = [{'name':'Make Coffee', 'onClick': 'MakeCoffee(1)', id: "btnMade"},
{'name':'Drink Coffee', 'onClick': 'DrinkCoffee(1)', id: "btnDrink"},
{'name':'Buy Supplies', 'onClick': 'buySupplies()', id: "btnBuySupplies"}
]


function buyKit(kit,btn){
  if(equipment.hasOwnProperty(kit)){
    //console.log("Kit is valid")
   if(equipment[kit]["purchased"] == false){
     //console.log("Kit is not yet purchased")
      if(equipment[kit]["cost"] < money){
      //console.log("You can afford it!")
      money = money - equipment[kit]["cost"]
        equipment[kit]["purchased"] = true;

      }else{//console.log("you cannot afford it")
      }
 }else{//console.log("Kit is already purchased");
 }
}else{//console.log("Not valid kit")
}
if(document.getElementById(btn)){document.getElementById(btn).remove()}
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
  //for(checksupply in coffeeSupplies){
  //if(y>0){console.log(checksupply +" "+ coffeeSupplies[checksupply])}
 //}
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

function buySupplies(multiplier){
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
  if(job == true){updateCounter("LifetimeEarnings",moneyTotal,"£")}
}else{tickCount = tickCount -1;updateCounter("Money",money,"£")}
}

function chgpremium(){currentlyDrinking = premiumInstant;updateMessages("Currently Drinking: " +currentlyDrinking.name);}
function chginstant(){currentlyDrinking = instant;updateMessages("Currently Drinking: " +currentlyDrinking.name);}
function chgaero(){currentlyDrinking = aeropress;updateMessages("Currently Drinking: " +currentlyDrinking.name);}
function chgMoka(){currentlyDrinking = mokapot;updateMessages("Currently Drinking: " +currentlyDrinking.name);}
function chgPourover(){currentlyDrinking = pourover;updateMessages("Currently Drinking: " +currentlyDrinking.name);}

function unlocks(){
  if(income>100 && cafeUnlocked == false && money > 10000){
    cafeUnlocked=true;
    updateMessages("Time to open your own coffee shop!")
  }
  if(income>5){
    premiumInstantUnlocked=true;
    if(checkForBtn("btnPrem") == false){
      updateMessages("You can buy Premium Instant Coffee!");
      btnPrem = {'name':'Switch to Premium', 'onClick': 'chgpremium()', id: "btnPrem"};
      btnInst={'name':'Switch to Instant', 'onClick': 'chginstant()', id: "btnInst"};
      addButtonToContainer(btnInst);
      addButtonToContainer(btnPrem);
    }
  }
  if(income>20){
    aeropressUnlocked=true;
    if(checkForBtn("btnAero") == false){
      updateMessages("You can buy Aeropress!");
      btnAero = {'name':'Switch to Aeropress', 'onClick': 'chgaero()', id: "btnAero"};
      btnBuyAero = {'name':'Buy Aeropress', 'onClick': 'buyKit("aeropressBrewer","btnBuyAero")', id: "btnBuyAero"};
      addButtonToContainer(btnAero)
      addButtonToContainer(btnBuyAero)
    }
      //document.getElementById("btnAero").disabled = true;
    }
  if(income>35){
    mokapotUnlocked=true;
    if(checkForBtn("btnMoka") == false){
      updateMessages("You can buy Moka Pot!");
      btnMoka = {'name':'Switch to Mokapot', 'onClick': 'chgMoka()', id: "btnMoka"};
      btnBuyMoka = {'name':'Buy Mokapot', 'onClick': 'buyKit("mokaPot","btnBuyMoka")', id: "btnBuyMoka"};
      addButtonToContainer(btnMoka)
      addButtonToContainer(btnBuyMoka)
    }
  }
  if(income>60){
    pouroverUnlocked=true;
    if(checkForBtn("btnPourover") == false){
      updateMessages("You can buy Pourover Brewer!");
      btnPourover = {'name':'Switch to Pourover', 'onClick': 'chgPourover()', id: "btnPourover"};
      btnBuyPouroverBrewer = {'name':'Buy Pourover Brewer', 'onClick': 'buyKit("pouroverBrewer","btnBuyPouroverBrewer")', id: "btnBuyPouroverBrewer"};
      addButtonToContainer(btnPourover)
      addButtonToContainer(btnBuyPouroverBrewer)
    }
  }
}

window.setInterval(function(){
earnMoney()
checkForDrink()
checkForSupplies()
jobTimer()
showSupplies()
unlocks()
for(kit in equipment){checkForKit(kit)}
}, looprate);
