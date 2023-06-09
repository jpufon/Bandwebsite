
let form = document.querySelector('form')


form.addEventListener('submit', async (e) => { 
    
 
    //prevent the default for the form submission 
    e.preventDefault()


    //make a fetch call with a payload 
    // name, title, message 

    let newMessage = {
        name: document.querySelector('#feedback-form-name').value,
        title: document.querySelector('#feedback-form-title').value,
        message: document.querySelector('#feedback-form-message').value,
    }


    //reconfigure fetch to accepat a post and a payload 

    let results = await fetch('/api', {
        method: 'POST',
        headers: {'Content-type': 'application/json; charset=UTF-8'},
        body: JSON.stringify(newMessage)
    })

    let messages = await results.json() //[{}, {},]


    console.log(messages);

    //display our messages on the screen

    updateFeedback(messages)

 })


const updateFeedback = (messagesArr) => {

    let htmlBlock = "";


        for( let index =0; index< messagesArr.length; index ++){
            let item = messagesArr[index]
        htmlBlock += '     <div class="feedback-item item-list media-list">';
        htmlBlock += '       <div class="feedback-item media">';
        htmlBlock += '       <div class="media-left"><button class="feedback-delete btn btn-xs btn-danger"><span id="' + index + '" class="glyphicon glyphicon-remove">&times;</span></button></div>';
        htmlBlock += '         <div class="feedback-info media-body">';
        htmlBlock += '           <div class="feedback-head">';
        htmlBlock += '             <div class="feedback-title">' + item.title + ' <small class="feedback-name label label-info">' + item.name + '</small></div>';
        htmlBlock += '           </div>';
        htmlBlock += '           <div class="feedback-message">' + item.message + '</div>';
        htmlBlock += '         </div>'; 
        htmlBlock += '       </div>';
        htmlBlock += '     </div>';
    }
    

    //attach to thte dom element 

    let feedbackMessages = document.querySelector('.feedback-messages'); 

    feedbackMessages.innerHTML = htmlBlock;



}
// getting the id's -------- of button 
let feedBackMe = document.querySelector('.feedback-messages'); 

feedBackMe.addEventListener('click', async (e)=>{
    
    let targetteSpan = e.target.querySelector('span')
   let clickIndex = targetteSpan.getAttribute('id')
   deletMessages(clickIndex)
} )

//delete function object
const deletMessages = async (i) => {

    try{
        let ObjectIndex = {
            index : i 
        }

        let results = await fetch(`/api/${i}`,{
            method: 'DELETE',
            headers: {'Content-type': 'application/json; charset=UTF-8'},
            body: JSON.stringify(ObjectIndex)
        })

        let messages = await results.json()

        displayMessages()
    }
    catch{

    }
}
   

const displayMessages = async () => {

    try{
        let result = await fetch('/api')

        let messages = await result.json(); 

        updateFeedback(messages)
    }
    catch{

    }
}

displayMessages()