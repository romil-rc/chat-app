import { useEffect } from "react";
import "../styles/chat.css";
import sent from "../assets/sent.png";
const Chat = () => {
  const sendMessage = () => {
    let currentMessage = document.getElementById("currentMessage");
    let storedMessages = localStorage.getItem("storedMessages");
    let mesObj;
    if (storedMessages == null) {
      mesObj = [];
    } else {
      mesObj = JSON.parse(storedMessages);
    }
    mesObj.push(currentMessage.value);
    localStorage.setItem("storedMessages", JSON.stringify(mesObj));
    currentMessage.value = "";
    showMessages();
    scroll();
  };
  const showMessages = () => {
    let storedMessages = localStorage.getItem("storedMessages");
    let mesObj;
    if (storedMessages == null) {
      mesObj = [];
    } else {
      mesObj = JSON.parse(storedMessages);
    }
    let html = "";
    mesObj.forEach((element, i) => {
      html += `
        <div>
          <h4 id="chatMsg" style="position: relative; ">${element}<p style="padding: 0px; margin: 0px; font-size: 8px; text-align: right;">You</p></h4>
          <h4 id="chatRepeatMsg">${element}<p style="padding: 0px; margin: 0px; font-size: 8px; text-align: left; font-weight: bold">Bot</p></h4>
        </div>`;
    });
    let mesElement = document.getElementById("allMessages");
    if (mesObj.length > 0) {
      mesElement.innerHTML = html;
    } else {
      mesElement.innerHTML = `Start Conversation`;
    }
  };
  const scroll = () => {
    var targetDiv = document.querySelector("#allMessages");
    targetDiv.scrollTop = targetDiv.scrollHeight;
  };

  useEffect(() => {
    showMessages();
    scroll();
  }, []);

  return (
    <div className="box">
      <div className="chatbox">
        <div className="header">
          Chat Bot
          <img
            src="https://cdn.dribbble.com/users/1721726/screenshots/4287439/bobo_one.png"
            style={{ height: "20px", float: "right" }}
            alt="chat"
          />
        </div>
        <div id="allMessages"> </div>
      </div>
      <div className="type">
        <input id="currentMessage" placeholder="Type your message here" />
        <img id="sentButton" onClick={sendMessage} src={sent} alt="sent" />
      </div>
    </div>
  );
};

export default Chat;
