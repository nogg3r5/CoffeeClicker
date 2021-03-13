var made = 0
var drunk = 0
function MakeCoffee(number){
    made = made + number;
};

function DrinkCoffee(number){
  if (drunk < made){drunk = drunk + number;}
  else{console.log('You need to make a drink, you have only made '+made);}
};
