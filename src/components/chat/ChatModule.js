import React, { useEffect, useRef, useState } from 'react';
import classes from '../../styles/blocks/ChatPage.module.css'
import SockJS from "sockjs-client";
import Stomp from 'stompjs';
import '../../styles/blocks/Chatting.css';
import testImg from '../../asset/images/user_icon.png'
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import PopupDom from "../blocks/PopupDom";
import MsgPopup from "../blocks/MsgPopup";
import ConfirmPopup from "../blocks/ConfirmPopup";
import productDetail from "../blocks/ProductDetail";

const ChatModule = () => {
    const chatPagePageRef = useRef();
    const messageFormRef = useRef();
    const messageInputRef = useRef();
    const chatAreaRef = useRef();
    const connectingElement = useRef();
    const connectedUserFullnameRef = useRef();

    const stompClientRef = useRef(null);
    const [nickname, setNickname] = useState(null);
    const [fullname, setFullname] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const userInfo = useSelector(state => state.loginCheck.loginInfo);
    const [yourId, setYourId] = useState('');
    const [text, setText] = useState('');
    const [productId, setProductId] = useState('');
    const nav = useNavigate();

    const [isMsgPopupOpen, setIsMsgPopupOpen] = useState({show : false, msg: '', gb : ''});
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState({show : false, msg: ''});


    let nickNameTest = null;
    let selectedUserIdTest = null;

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        setYourId(urlParams.get('test'))
        setProductId(urlParams.get('productId'))

        if (urlParams.get('gb')) {
            setIsConfirmPopupOpen({show: true, msg: '구매채팅을 전송할까요 ?', gb : 'trade', data : ''});
        }


        connect(userInfo.libraryName, userInfo.email);
    }, []);

    const connect = (nick, fullName) => {

        const nicknameValue = nick.trim();
        const fullnameValue = fullName.trim();

        if (nicknameValue && fullnameValue) {
            const stompClient = Stomp.over(new SockJS('http://34.121.58.202:8088/stomp-endpoint'));
            stompClient.connect({}, () => onConnected(stompClient, nicknameValue, fullnameValue), onError);
        }
    }

    const onConnected = (stompClient, nicknameValue, fullnameValue) => {
        stompClient.subscribe(`/user/${nicknameValue}/queue/messages`, onMessageReceived);
        stompClient.subscribe(`/user/public`, onMessageReceived);

        stompClient.send("/app/user.addUser",
            {},
            JSON.stringify({ nickName: nicknameValue, fullName: fullnameValue, status: 'ONLINE' })
        );
        stompClientRef.current = stompClient;

        chatRoomDisplay().then();
    }

    const onMessageReceived = async (payload) => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const message = JSON.parse(payload.body);

        if (urlParams.get('test') && urlParams.get('test') === message.senderId) {
            displayMessage(message.senderId, message.content);
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }

        if (urlParams.get('test')) {
            if(document.querySelector(`#${urlParams.get('test')}`) != null ){
                document.querySelector(`#${urlParams.get('test')}`).classList.add('active');
            }

        } else {
            messageFormRef.current.classList.add('hidden');
        }

        const notifiedUser = document.querySelector(`#${message.senderId}`);
        if (notifiedUser && !notifiedUser.classList.contains('active')) {
            const nbrMsg = notifiedUser.querySelector('.nbr-msg');
            nbrMsg.classList.remove('hidden');
            nbrMsg.textContent = '';
        }
    }

    const chatRoomDisplay = async () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const myRoom = await fetch(`http://34.121.58.202:8088/room/${userInfo.libraryName}`);
        const myRoomDisplay = await myRoom.json();
        // let flag = true;

        const connectedUsersList = document.getElementById('connectedUsers');

        // myRoomDisplay.forEach((item, value) => {
        //     if(item.recipientId !== urlParams.get('test')) {
        //         flag = false;
        //     }
        // })

        if(urlParams.get('gb')) {
            const testObj = {
                chatId:`${userInfo.libraryName}_${urlParams.get('test')}`,
                id:"testId",
                recipientId:urlParams.get('test'),
                senderId:userInfo.libraryName
            }

            appendUserElement2(testObj, connectedUsersList)
        }

        myRoomDisplay.forEach(user => {
            appendUserElement2(user, connectedUsersList);
            if (myRoomDisplay.indexOf(user) < myRoomDisplay.length - 1) {
                const separator = document.createElement('li');
                separator.classList.add('separator');
                connectedUsersList.appendChild(separator);
            }
        });




    }

    const findAndDisplayConnectedUsers = async () => {

        // 온라인인 유저 조회
        const connectedUsersResponse = await fetch('http://34.121.58.202:8088/users');
        let connectedUsers = await connectedUsersResponse.json();

        // 내가 아닌 유저만
        connectedUsers = connectedUsers.filter(user => user.nickName !== nickNameTest);
        const connectedUsersList = document.getElementById('connectedUsers');
        connectedUsersList.innerHTML = '';

        connectedUsers.forEach(user => {
            appendUserElement(user, connectedUsersList);

            if (connectedUsers.indexOf(user) < connectedUsers.length - 1) {
                const separator = document.createElement('li');
                separator.classList.add('separator');
                connectedUsersList.appendChild(separator);
            }
        });
    }

    const appendUserElement2 = (room, connectedUsersList) => {

        const listItem = document.createElement('li');
        listItem.classList.add('user-item');
        listItem.id = room.senderId;

        const userImage = document.createElement('img');
        userImage.src = testImg;
        userImage.alt = room.chatId;
        userImage.height = '20';

        const usernameSpan = document.createElement('span');
        usernameSpan.textContent = room.chatId;
        usernameSpan.classList.add("testSpan");

        const receivedMsgs = document.createElement('span');
        receivedMsgs.textContent = '0';
        receivedMsgs.classList.add('nbr-msg', 'hidden');

        listItem.appendChild(userImage);
        listItem.appendChild(usernameSpan);
        listItem.appendChild(receivedMsgs);

        listItem.addEventListener('click', userItemClick);

        connectedUsersList.appendChild(listItem);
    }

    const appendUserElement = (user, connectedUsersList) => {
        const listItem = document.createElement('li');
        listItem.classList.add('user-item');
        listItem.id = user.nickName;

        const userImage = document.createElement('img');
        userImage.src = testImg;
        userImage.alt = user.fullName;
        userImage.height = '20';

        const usernameSpan = document.createElement('span');
        usernameSpan.textContent = user.fullName;

        const receivedMsgs = document.createElement('span');
        receivedMsgs.textContent = '0';
        receivedMsgs.classList.add('nbr-msg', 'hidden');

        listItem.appendChild(userImage);
        listItem.appendChild(usernameSpan);
        listItem.appendChild(receivedMsgs);

        listItem.addEventListener('click', userItemClick);

        connectedUsersList.appendChild(listItem);
    }

    const userItemClick = (event) => {
        const clickedUser = event.currentTarget;

        const parts = clickedUser.getElementsByClassName('testSpan')[0].innerHTML.split("_");
        const yourId = parts.find(part => part !== userInfo.libraryName);

        nav(`/chatTest3?test=${yourId}`);

        document.querySelectorAll('.user-item').forEach(item => {
            item.classList.remove('active');
        });
        messageFormRef.current.classList.remove('hidden');

        // const clickedUser = event.currentTarget;
        clickedUser.classList.add('active');

        console.log(clickedUser.getElementsByClassName('testSpan'))
        setSelectedUserId(clickedUser.getAttribute('id'));
        selectedUserIdTest = clickedUser.getAttribute('id');

        fetchAndDisplayUserChat().then();

        const nbrMsg = clickedUser.querySelector('.nbr-msg');
        nbrMsg.classList.add('hidden');
        nbrMsg.textContent = '0';
    }

    const fetchAndDisplayUserChat = async () => {

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const userChatResponse = await fetch(`http://34.121.58.202:8088/messages/${userInfo.libraryName}/${urlParams.get('test')}`);

        const userChat = await userChatResponse.json();


        chatAreaRef.current.innerHTML = '';
        userChat.forEach(chat => {
            displayMessage(chat.senderId, chat.content);
        });
        chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }

    const displayMessage = (senderId, content) => {

        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message');

        if (senderId === userInfo.libraryName) {
            messageContainer.classList.add('sender');
        } else {
            messageContainer.classList.add('receiver');
        }


        const message = document.createElement('p');
        message.textContent = content;
        messageContainer.appendChild(message);


        chatAreaRef.current.appendChild(messageContainer);
    }

    const onError = () => {
        connectingElement.current.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
        connectingElement.current.style.color = 'red';
    }

    const sendMessage = (event) => {

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const messageContent = text;

        if (messageContent && stompClientRef.current) {

            const chatMessage = {
                senderId: userInfo.libraryName,
                recipientId: urlParams.get('test'),
                content: messageContent,
                timestamp: new Date()
            };
            stompClientRef.current.send("/app/chat", {}, JSON.stringify(chatMessage));


            // displayMessage(localStorage.getItem("nick"), messageInputRef.current.value.trim());
            displayMessage(userInfo.libraryName, messageContent);
            messageInputRef.current.value = '';
        }
        chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        event.preventDefault();
    }

    const tradeSendMessage = (text) => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const messageContent = text;

        if (messageContent && stompClientRef.current) {

            const chatMessage = {
                senderId: userInfo.libraryName,
                recipientId: urlParams.get('test'),
                content: messageContent,
                timestamp: new Date()
            };
            stompClientRef.current.send("/app/chat", {}, JSON.stringify(chatMessage));


            // displayMessage(localStorage.getItem("nick"), messageInputRef.current.value.trim());
            displayMessage(userInfo.libraryName, messageContent);
            messageInputRef.current.value = '';
        }
        chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }

    const onLogout = () => {

        stompClientRef.current.send("/app/user.disconnectUser",
            {},
            JSON.stringify({ nickName: nickname, fullName: fullname, status: 'OFFLINE' })
        );
        window.location.reload();
    }

    const textMethods = (e) => {
        setText(e.target.value)
    }

    useEffect(() => {
        window.onbeforeunload = () => onLogout();
    }, []);

    const closeMsgPopup = () => {

        if (isMsgPopupOpen.gb === 'success') {

        }

        setIsMsgPopupOpen({show: false, msg: '', gb : ''});
    }

    const confirmHandler = () => {

        if (isConfirmPopupOpen.gb === 'trade') {

            tradeSendMessage(`${productId} 번 책살게요`)
            setIsConfirmPopupOpen({show: false, msg: ''});
        }
    }

    const closeConfirmPopup = () => {
        setIsConfirmPopupOpen({show: false, msg: ''});
    }

    return (
        <div className={classes.test}>
                <div className={classes.chatContainer} ref={chatPagePageRef}>
                    <div className={classes.usersList}>
                        <div className={classes.usersListContainer}>
                            <h2>채팅방 리스트</h2>
                            <ul id="connectedUsers">
                            </ul>
                        </div>
                        <div>
                            <p ref={connectedUserFullnameRef}>{userInfo.libraryName} 님의 채팅 목록 입니다.</p>
                            {/*<a onClick={onLogout} className={classes.logout} id="logout">Logout</a>*/}
                        </div>
                    </div>

                    <div className={classes.chatArea}>
                        <div className={classes.chatArea} ref={chatAreaRef}>
                        </div>

                        <form onSubmit={sendMessage} ref={messageFormRef} name="messageForm">
                            <div className={classes.messageInput}>
                                <input onChange={textMethods} autoComplete="off" type="text" className={classes.chatMessage} ref={messageInputRef} placeholder="Type your message..." />
                                <button>Send</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div id='popupDom'>
                    {isMsgPopupOpen.show && <PopupDom>
                        <MsgPopup onClick={closeMsgPopup} msg={isMsgPopupOpen.msg} />
                    </PopupDom>}
                    {isConfirmPopupOpen.show && <PopupDom>
                        <ConfirmPopup onConfirm={confirmHandler} onClick={closeConfirmPopup} msg={isConfirmPopupOpen.msg} />
                    </PopupDom>}
                </div>
        </div>
    );
};

export default ChatModule;
