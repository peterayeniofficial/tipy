// Selection
        const menuImages = document.querySelectorAll('.item > img');
        const menuPrices = document.querySelectorAll('.item > p');
        const listItems = document.querySelectorAll('div.item');
        const stars = document.querySelectorAll('.actions > span');
        const showTip = document.querySelector('span.tip');
        //const mealId = document.querySelector('.item[data-selected]').getAttribute("data-meal-id")
        
        
        // Array of menus
        let menu = [];
        // Get rating function
        const getRating = (star) => {
          star = star.getAttribute("data-rate")
          let starInt = parseInt(star)
          return starInt
        }
        
        // A function to format Money
        const formatMoney = (figure) => {
          return figure.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        }
        
        // TipWith Function
        const tipWith = (tip) => {
          tip = formatMoney(tip);
          return showTip.textContent = `${tip}`;
        }

        const maximumRating = () => {
            let holder = []
            const stars = document.querySelectorAll('span.rated')
            let starsArr = Array.from(stars)
            for ( let index = 0; index < stars.length; index++) {
                holder.push(starsArr[index].getAttribute("data-rate"))
            }
           console.log(holder)
            return parseInt(Math.max(...holder))
        }

        // Calulate Tip
        const calculateTip = () => {
          let tip = 0;

            const mealId = document.querySelector('.item[data-selected]').getAttribute("data-meal-id");
            
            const meal = menu.find((food) => food.id === mealId);
            
            console.log(maximumRating())
            const maximum = maximumRating()
            console.log(maximum)
            if (maximum >= 3){
                tip = Math.round((maximum / 50) * meal.price)
            }
            
        
          
          return tipWith(tip)
        }
        
        // selected meal 
        const mealChoosen = ({target}) => {
          console.log("click meal", target);
         
          listItems.forEach((item, index) => {
            item.removeAttribute("data-selected")
            if (target) {
              target.parentElement.setAttribute("data-selected", "")
            }
          })
         
          
          // Calculate Tip
          calculateTip()
        }
        
        // Rate Meal
        const rateMeal = ({target})	=> {
          
          const rating = getRating(target)
          
          if (!selected()) return;
        
      	  if (selected()){
          stars.forEach((star, index) => {
            
            starNumber = star.getAttribute("data-rate")
            starNumberInt = parseInt(starNumber)
            star.classList.remove('rated')
  
            
            if ( starNumberInt <= rating){
              star.classList.add('rated')
            }
          })
          }
          
          calculateTip()
        
        }
        
        // check image selection
        const selected = () => {
          let imageSelected = false;
          listItems.forEach((item) => {
            if (item.hasAttribute('data-selected')) imageSelected = true;
          })
          return imageSelected;
        }
        
        // check rating was selected
        const rated = () => {
          let ratingSelected = false;
          stars.forEach((star) => {
            if (star.classList.contains(".rated")) ratingSelected = true;
          })
          return ratingSelected;
        }
        
        // UI Interaction
        const uiCanInteract = () => {
          console.log(listItems)
          listItems.forEach((item) => item.addEventListener('click', mealChoosen))
          
          stars.forEach((star) => star.addEventListener('click', rateMeal))
        }
        
        // Display Function
        const displayMenu = ({results}) => {
          const [data] = results;
          menu = Object.values(data);
         
          menu.forEach((meal, index) => {
           
            console.log(meal.sample)
            menuImages[index].src = `${meal.sample}`;
            console.log(meal.price)
           
            
           	let formattedPrice = formatMoney(meal.price)
          
            menuPrices[index].textContent = `${formattedPrice}`;
            
           
            listItems[index].setAttribute("data-meal-id", meal.id)
            //listItems[index].removeAttribute("data-selected")
          })
          
          uiCanInteract();
        }
        
        // API Call function
        const fetchAndDisplayMenu = () => {
          const api =   			'https://randomapi.com/api/d12c99b82acfefae33f7ce9239b57811';
          fetch(api)
            .then((response) => response.json())
          	.then((data) => displayMenu(data))
          
        }
        
        
        const startApp = () => {
          fetchAndDisplayMenu()
        }
        
        
      
      
      startApp();
