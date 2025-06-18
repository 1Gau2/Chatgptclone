import "./App.css"
import gptlogo from "./assets/chatgpt.svg"
import midbtn from "./assets/add-30.png"
import queryicon from "./assets/message.svg"
import home from"./assets/home.svg"
import saved from "./assets/bookmark.svg"
import rocket from "./assets/rocket.svg"
import sendbtn from "./assets/send.svg"
import usericon from"./assets/user-icon.png"
import chatgptlogo from "./assets/chatgptLogo.svg"
import { sendMsgToOpenAI } from "./openai"
import { useEffect, useRef, useState } from "react"


function App () {
  const msgEnd=useRef(null)

  let[input,setInput]=useState("")
  let [messages,setMessages]=useState([{
    text: "Hi I am ChatGPT , a state-of-the-art language model developed by OpenAI.I'm designed to understand and genrate human-like text based on Input I recieved",
    isBot:true
  }])

  useEffect(()=>{
    msgEnd.current.scrollIntoView()
  },[messages])
  
   let handlesend=async()=>{
    const text= input;
    setInput('')
    setMessages([
      ...messages,
      {text,isBot:false}
    ])
    const resp=  await sendMsgToOpenAI(input)
    setMessages([
      ...messages,
      {text:input, isBot:false},
      {text:resp , isBot:true}
    ])
   };
  
 const handleEnter=async(e)=>{
if(e.key=="Enter") await handlesend();
 }   
  
 const handleQuery=async(e)=>{
 const text= e.target.value;
    
    setMessages([
      ...messages,
      {text,isBot:false}
    ])
    const resp=  await sendMsgToOpenAI(text)
    setMessages([
      ...messages,
      {text:input, isBot:false},
      {text:resp , isBot:true}
    ])
 }

  return (
   <div className="App">

   <div className="sidebar">
    <div className="upperbar">
      <div className="upperSideTop" ><img src={gptlogo} alt="" className="logo" /><span className="brand">ChatGpt</span></div>
      <button className="midbtn" onClick={()=> {window.location.reload()}}><img src={midbtn} alt="btn" className="addbtn"  />New Chat</button>
      <div className="upperSidebottom">
        <button className="query" onClick={handleQuery} value={"What is Programming?"}><img src={queryicon} alt="message" />What is Programming?</button>
      
        <button className="query"onClick={handleQuery} value={"How to use an API?"}><img src={queryicon} alt="message" />How to use an API?</button>
      </div>
    </div>
    <div className="lowerbar">
      <div className="listItems"><img src={home} alt="Itemimages" /> Home</div>
       <div className="listItems"><img src={saved} alt="Itemimages" /> Saved</div>
        <div className="listItems"><img src={rocket} alt="Itemimages" /> Upgrade to pro</div>
    </div>
   </div>
   
   <div className="main">
   <div className="chats">
    {messages.map((message,i)=>
   <div key= {i}className={message.isBot?"chat bot":"chat"}>
     <img className="chatimg" src={message.isBot? chatgptlogo: usericon} alt="icon" /><p className="txt">{message.text}</p>
   </div>
   
   )}
   <div ref={msgEnd}/> 
   </div>
    
    <div className="chatfooter">
      <div className="inp">
        <input type="text" placeholder="Send a message" value={input} onKeyDown={handleEnter} onChange={(e)=>{setInput(e.target.value)}} /><button className="send" onClick={handlesend} ><img src={sendbtn} alt="sendbtn"  /></button>
      </div>
      <p className="txt">ChatGPT may produce inaccurate information about people,places,or facts .ChatGPT August 20 Version.</p>
    </div>
   

   






   </div>
  </div>
)
}

export default App;
