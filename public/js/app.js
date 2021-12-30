console.log('Client Side Javascript is loading...')



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#mess-1')
const messageTwo = document.querySelector('#mess-2')

messageOne.textContent = 'Loading...'
messageTwo.textContent = ''

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = search.value
    if(!location){
        console.log('Invalid user input')
    }else{
        fetch('/weather?address='+location).then((response) => {
            response.json().then(data => {
                console.log(data)
                if(data.error){
                     messageOne.textContent = data.error
                }else{
                    messageOne.textContent = data.forecast
                    messageTwo.textContent = data.location
                }
                
            })
        }).catch((error) => {
            console.log(error)
        })
    }
    
})