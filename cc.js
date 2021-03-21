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
{'name':'Switch to Instant', 'onClick': 'chginstant()', id: "btnInst"}
]

function updateMessages(newMsg){
  element = document.getElementById('Messages')
  element = element.childNodes[0]
  var item = document.createElement('li');
  if(messages.length < 5){
    messages.push(newMsg);
    var list = document.createElement('ul');
    for(index = 0; index < messages.length; ++index){
              var item = document.createElement('li');
              // Set its contents:
              item.appendChild(document.createTextNode(messages[index]));
              // Add it to the list:
              list.appendChild(item);
          }
          element.replaceWith(list)
    //document.getElementById('Messages').appendChild(makeUL(messages));
 }else{
  messages.shift();
  messages.push(newMsg)
  var list = document.createElement('ul');
  for(index = 0; index < messages.length; ++index){
            var item = document.createElement('li');
            // Set its contents:
            item.appendChild(document.createTextNode(messages[index]));
            // Add it to the list:
            list.appendChild(item);
        }
        element.replaceWith(list)
}
  //document.getElementById('Messages').appendChild(makeUL(messages));
 }

function makeUL(array) {
if(array.length < 5){type = "append"}else{type = "replace"}
  var list = document.createElement('ul');
  for (var i = 0; i < array.length; i++) {
      // Create the list item:
      var item = document.createElement('li');
      // Set its contents:
      item.appendChild(document.createTextNode(array[i]));
      // Add it to the list:
      list.appendChild(item);
  }
  // Finally, return the constructed list:
  return list;
}
// Add the contents of options[0] to #foo:


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

var currentlyDrinking = instant;
checkForSupplies()
checkForDrink()
function MakeCoffee(number){
 made = made + number;
 madeTotal = madeTotal +1;
 for(redSupply in currentlyDrinking.consumes){
   coffeeSupplies[redSupply] = coffeeSupplies[redSupply] - currentlyDrinking.consumes[redSupply];
 }
};

function checkForDrink(){
  if(made > 0){drink= true; document.getElementById("btnDrink").disabled = false; document.getElementById("btnMade").disabled = true;}else{drink=false; document.getElementById("btnDrink").disabled = true; document.getElementById("btnMade").disabled = false;}
};

function checkForSupplies(y){
  var checksupply = undefined;
 for(checksupply in coffeeSupplies){
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
if (money < currentlyDrinking.cost){
  if(checkForBtn("btnJob") == false){
    btnjob = {'name':'Get a Job', 'onClick': 'getJob()', id: "btnJob"};
    addButtonToContainer(btnjob)
  }else{updateMessages("Get a job!");}
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

function getJob(){job = true;income = income+ 1;}
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

window.setInterval(function(){
earnMoney()
checkForDrink()
checkForSupplies()
}, looprate);
