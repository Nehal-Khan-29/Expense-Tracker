let sendChatBtn=document.querySelector(".chat-input span");
let chatInput=document.querySelector(".chat-input textarea");
let chatbox=document.querySelector(".chatbox");
let userMessage;
let inputInitHeight = chatInput.scrollHeight;
let API_KEY = "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";
let createChatLi=(message,className)=>{
    // create a chat <li> element with passed message and className
    let chatLi=document.createElement("li");
    chatLi.classList.add("chat",className);
    let chatContent=className==="outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p>/p>`;
    chatLi.innerHTML=chatContent;
    chatLi.querySelector("p").textContent=message;
    return chatLi;
}
let generateResponse=(incomingChatLi)=>{
    let API_URL = "https://api.openai.com/v1/chat/completions";
    let messageElement = incomingChatLi.querySelector("p");
    let requestOptions= {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}]
        })
    }

    // send POST request to API, get response
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
    }).finally(()=>chatbox.scrollTo(0,chatbox.scrollHeight));
}
let handleChat=()=>{
    userMessage=chatInput.value.trim();
    if(!userMessage){
        return ;
    }
    chatInput.value="";
    chatInput.computedStyleMap.height = `${inputInitHeight}`;
    // append the users messgae to chatbox
    chatbox.appendChild(createChatLi(userMessage,"outgoing"));
    chatbox.scrollTo(0,chatbox.scrollHeight);
    setTimeout(() => {
        // display "typing..." message while waiting for the response
        let incomingChatLi = createChatLi("typing...","incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0,chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input",() => {
    // adjust the height of the input textarea based on its content
    chatInput.computedStyleMap,height = `${inputInitHeight}px`;
    chatInput.computedStyleMap,height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown",(e) => {
    // If enter key is pressed without Shift key and the window width is greater than 800 px , handle the chat
    if(e.key==="Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);