/* eslint-disable no-alert */

/**************
 *   SLICE 1
 **************/

/*The updateCoffeeView function takes in a coffeeCount parameter and sets the inner text of the DOM element with the ID "coffee_counter" to the coffeeCount value.*/
function updateCoffeeView(coffeeCount) {
  const coffeeCounter = document.getElementById('coffee_counter');
  coffeeCounter.innerText = coffeeCount;
}
/*The clickCoffee function takes in a data object as a parameter and increments the coffee property of the data object by 1. It then calls the updateCoffeeView function, passing in the updated coffee value as a parameter, to update the coffee count displayed in the HTML.*/
function clickCoffee(data) {
  data.coffee += 1;
  updateCoffeeView(data.coffee);
}

/**************
 *   SLICE 2
 **************/

const code = {
  unlockProducers(producers, coffee) {
    producers.forEach(producer => {
      if (coffee >= producer.price / 2) {
        producer.unlocked = true;
      }
    });
  },

  getUnlockedProducers(data) {
    return data.producers.filter(producer => producer.unlocked);
  },

  makeDisplayNameFromId(id) {
    return id
      .replace(/_/g, ' ')
      .replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  },

  makeProducerDiv(producer) {
    const div = document.createElement('div');
    div.className = 'producer';
    div.innerHTML = `
      <div class="producer-column">
        <div class="producer-title">${this.makeDisplayNameFromId(producer.id)}</div>
      </div>
      <div class="producer-column">
        <div>Quantity: ${producer.qty}</div>
        <div>Coffee/second: ${producer.cps}</div>
        <div>Cost: ${producer.price} coffee</div>
        <button id="buy_${producer.id}">Buy</button>
      </div>
    `;
    return div;
  },

  deleteAllChildNodes(node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  },

  renderProducers(data) {
    this.unlockProducers(data.producers, data.coffee);

    const producerContainer = document.getElementById('producer_container');
    this.deleteAllChildNodes(producerContainer);

    const unlockedProducers = this.getUnlockedProducers(data);

    unlockedProducers.forEach(producer => {
      const producerDiv = this.makeProducerDiv(producer);
      producerContainer.appendChild(producerDiv);
    });
  },

  clickCoffee(data) {
    data.coffee++;
    this.renderProducers(data);
  }
};

/**************
 *   SLICE 3
 **************/

function getProducerById(data, producerId) {
  // your code here
}

function canAffordProducer(data, producerId) {
  // your code here
}

function updateCPSView(cps) {
  // your code here
}

function updatePrice(oldPrice) {
  // your code here
}

function attemptToBuyProducer(data, producerId) {
  // your code here
}

function buyButtonClick(event, data) {
  // your code here
}

function tick(data) {
  // your code here
}

/*************************
 *  Start your engines!
 *************************/

// You don't need to edit any of the code below
// But it is worth reading so you know what it does!

// So far we've just defined some functions; we haven't actually
// called any of them. Now it's time to get things moving.

// We'll begin with a check to see if we're in a web browser; if we're just running this code in node for purposes of testing, we don't want to 'start the engines'.

// How does this check work? Node gives us access to a global variable /// called `process`, but this variable is undefined in the browser. So,
// we can see if we're in node by checking to see if `process` exists.
if (typeof process === 'undefined') {
  // Get starting data from the window object
  // (This comes from data.js)
  const data = window.data;

  // Add an event listener to the giant coffee emoji
  const bigCoffee = document.getElementById('big_coffee');
  bigCoffee.addEventListener('click', () => clickCoffee(data));

  // Add an event listener to the container that holds all of the producers
  // Pass in the browser event and our data object to the event listener
  const producerContainer = document.getElementById('producer_container');
  producerContainer.addEventListener('click', event => {
    buyButtonClick(event, data);
  });

  // Call the tick function passing in the data object once per second
  setInterval(() => tick(data), 1000);
}
// Meanwhile, if we aren't in a browser and are instead in node
// we'll need to exports the code written here so we can import and
// Don't worry if it's not clear exactly what's going on here;
// We just need this to run the tests in Mocha.
else if (process) {
  module.exports = {
    updateCoffeeView,
    clickCoffee,
    unlockProducers,
    getUnlockedProducers,
    makeDisplayNameFromId,
    makeProducerDiv,
    deleteAllChildNodes,
    renderProducers,
    updateCPSView,
    getProducerById,
    canAffordProducer,
    updatePrice,
    attemptToBuyProducer,
    buyButtonClick,
    tick
  };
}
