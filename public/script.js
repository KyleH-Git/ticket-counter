const counterElement = document.querySelector('.counters');
const selectedPlayerElements = document.querySelectorAll('.selected-player');
const currentPlayerElement = document.querySelector('.current-player');


counterElement.addEventListener('click', (event) => {
    console.log(event.target)
    console.log(selectedPlayerElements)
    
        currentPlayerElement.innerText = `Current Player: ${event.target.getAttribute('key')}`;
        for(element of selectedPlayerElements){
            element.setAttribute('value', event.target.getAttribute('key'));
        }
    
});
