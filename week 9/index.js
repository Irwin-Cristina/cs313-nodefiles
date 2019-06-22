
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  //.set('views', __dirname + '/views')
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/math', calculateShipping)

  
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))




//Gather input from user
function calculateShipping(request, response) {
  var weight = Number(request.query.weight); //from input on form
  var mailtype = request.query.mailtype;
  
  computeShipping(response, mailtype, weight); //call function and pass variables
}  
    



  //Compute result
function computeShipping(response, ml, wt){ //function called from above
    //var result ;
    var price =0;
    
  if (ml == "Letters(Stamped)") {
      price = stampedLetters(wt); //call function stampedLetters and pass the wt variable
    } else if (ml == "Letters(Metered)"){
      price = meteredLetters(wt); //call function meteredLetters and pass the wt variable
    } else if (ml == "Large Envelopes(Flat)") { 
      price = largeEnvelopes(wt); //call function largeEnvelopes and pass the wt variable
    } else if (ml == "First-Class Package Service-Retail") {
      price = package(wt); //call function package and pass the wt variable

    } else{
      
    }

    //Set up a JSON object of the values we want to pass along to the EJS results page
    const params= {weight: wt, mail: ml, price:price};
      
    //Render response, using EJS page "results.ejs" in page directory
    //make sure to pas it the parameters we need
    response.render('pages/results', params);
}


//Determine price for each package type

//Letters(Stamped) increase .15 per oz with 3.5 max
function stampedLetters(wt) {   
  var price;
  var wt;
  
  if (wt < 1)
    price = .55;
  
  if (wt > 1 && wt < 2)
    price = .70;
  
  if (wt > 2 && wt < 3)
    price = .85;
  
  if (wt == 3.5)
    price = 1.00;
  
  return price;
}


//Letters(Metered) increase .15 per oz with 3.5 max
function meteredLetters(wt) {
  var price;
  var wt;
  if (wt < 1)
    price = .50;
  if (wt > 1 && wt < 2)
    price = .65;
  if (wt > 2 && wt < 3)
    price = .80;
  if (wt == 3.5)
    price = .95;
  return price;
}



//Large Envelopes(Flat) increase .15 per oz with 13 oz max
function largeEnvelopes(wt) {
  var price;
  var wt;
  if (wt < 1)
    price = 1.00;
  
  if (wt > 1 &&  wt < 2)
    price = 1.15;
  
  if (wt > 2 && wt < 3);
    price = 1.30;
  
  if (wt > 3 && wt < 4)
    price =  1.45;
  
  if (wt > 4 && wt < 5)
    price =  1.60;
  
  if (wt > 5 && wt < 6)
    price =  1.75;
  
  if (wt > 6 && wt < 7)
    price =  1.90;
  
  if (wt > 7 && wt <  8)
    price =  2.05;
  
  if (wt > 8 && wt < 9)
    price =  2.20;
  
  if (wt > 9 && wt < 10)
    price =  2.35;
  
  if (wt > 10 && wt < 11)
    price =  2.50;
  
  if (wt > 11 && wt < 12)
    price =  2.65;
  
  if (wt == 13)
    price = 2.80;
  
  return price;
}

//packages

function package(wt){
  var price;
  var wt;
  
  if (wt < 1)
    price = 3.66;
  
  if (wt > 1 && wt < 4)
    price = 3.66;
  
  if (wt > 4 && wt < 8);
    price = 4.39;
  
  if (wt == 13)
    price = 5.71;
  
  return price;
  
  
}


