console.log('Client side javascript loaded!')

fetch('http://puzzle.mead.io/puzzle').then(res=>{
    res.json().then(data=>{
        console.log('data', data)
    })
    // console.log('response', res)
})


fetch('http://localhost:4000/weather?address=mancherial').then(res=>{
console.log('res',res)  
res.json().then(data=>{
    if(data.error){
        console.log(error);
    }
    else{
        console.log('weather data',data)

    }

    })
})

const weatherForm = document.querySelector('form')
const searchData = document.querySelector('input')
const messageData1 = document.querySelector('#message-1')
const messageData2 = document.querySelector('#message-2')



weatherForm.addEventListener('submit',(e)=>{
    const location = searchData.value
    messageData1.textContent = 'Loading...'
messageData2.textContent = ''
    e.preventDefault()
console.log(location)
fetch('/weather?address='+location).then(res=>{
console.log('res',res)  
res.json().then(data=>{
    if(data.error){
        console.log(error);
        messageData1.textContent = error

    }
    else{

        console.log('temperature',data.temp)
        console.log('Location',data.location)
        messageData1.textContent = data.temp
        messageData2.textContent =  data.location

    }

    })
})
})