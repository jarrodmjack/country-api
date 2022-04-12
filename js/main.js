// COUNTRY DATABASE API



// display country information  variables
let country = document.querySelector('#country')
let capital = document.querySelector('#capitalDisplay')
let region = document.querySelector('#regionDisplay')
let population = document.querySelector('#popDisplay')
let language = document.querySelector('#nativeLangDisplay')
let unMem = document.querySelector('#unMemDisplay')
let currency = document.querySelector('#currencyDisplay')
let timezone = document.querySelector('#timezoneDisplay')
let borders = document.querySelector('#bordersDisplay')
let flag = document.querySelector('img');


  document.querySelector('#search').addEventListener('click', getCountryInfo)

  function getCountryInfo(){

//getting value from input
  let countryInput = document.querySelector('#countryInput').value;

    if(countryInput === null){
      alert('Please enter a valid country')
    }else if(countryInput.toLowerCase() === 'us' || countryInput.toLowerCase() === 'usa'){
        countryInput = 'United States of America'
      }
      //   countryInput = countryInput
      // }
    
    
  // FETCH API
    fetch(`https://restcountries.com/v3.1/name/${countryInput}?fullText=true`)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
          console.log(data) 
          // console.log(data[0].population)
          // console.log(Number(data[0].population).toLocaleString())
          // console.log(data[0].flags) //flag
          // console.log(data[0].languages)
          // console.log(Object.values(data[0].languages))
          // console.log(data[0].name.official)
          
          // CURRENY INFO
          let currency1 = Object.values(data[0].currencies)
          console.log(currency1)
          console.log(Array.from(Object.values(currency1[0])))
          let currencyFinal = Array.from(Object.values(currency1[0]))
          currency.innerText = currencyFinal[0]
          

          
          country.innerText = data[0].name.official
          capital.innerText = data[0].capital //capital city
          region.innerText = data[0].region //region
          population.innerText = Number(data[0].population).toLocaleString() // population
          

          // timezone
          if(data[0].timezones.length > 2){
            timezone.innerText = data[0].timezones
            timezone.style.fontSize = '2rem'
            timezone.style.padding = '2rem'
          }else{
            timezone.innerText = data[0].timezones
          }


          // language
          if(Object.values(data[0].languages).length > 3 && Object.values(data[0].languages).length < 6){
            language.innerText = Object.values(data[0].languages)
            language.style.fontSize = '2rem'
          }else if(Object.values(data[0].languages).length >=6){
            language.innerText = Object.values(data[0].languages)
            language.style.fontSize = '1.5rem'
            language.style.lineHeight = '3rem'
            
          }else{
          language.innerText = Object.values(data[0].languages)
          language.style.fontSize = '4rem'//language
          }

           //un member?
          if(data[0].unMember === true){ //changing true === yes
            unMem.innerText = 'Yes' 
          }else{
            unMem.innerText = 'No'
          }
          
          
          // borders
          if(data[0].borders.length > 3){
            borders.innerText = data[0].borders
            borders.style.fontSize = '2.5rem'
            borders.style.padding = '2rem'
            borders.innerText = data[0].borders.join(', ')
          }else{
            borders.innerText = data[0].borders

          }
         
          

          

          document.querySelector('img').src = data[0].flags.png
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
      
    
  }