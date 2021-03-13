var made = 0
var drunk = 0
function MakeCoffee(number){
 made = made + number;
 document.getElementById("made").innerHTML = made;
};

function DrinkCoffee(number){
  if (drunk < made){drunk = drunk + number;document.getElementById("drunk").innerHTML = drunk;}
  else{document.getElementById("errors").innerHTML = 'You need to make a drink!';}
};
