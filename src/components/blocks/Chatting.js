import {useEffect, useRef, useState} from 'react';
import axios from "axios";
import Stomp from 'stompjs';
import SockJS from "sockjs-client";
import classes from "../../styles/blocks/Chatting.module.css";
import Header from "./Header";
import Footer from "./Footer";
import sendPlaneIcon from "../../../src/asset/images/Send.png";
import bookImg3 from "../../../src/asset/books/image 3.png";
import {useSelector} from "react-redux";

const Chatting = () => {
    const [userId, setUserId] = useState('');
    const [libraryName, setLibraryName] = useState('');
    const [stompClient, setStompClient] = useState(null);
    const [greetings, setGreetings] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const messageBoxRef = useRef(null); // useRef로 메시지 박스를 참조
    const maxLength = 100; // 최대 글자 수
    const userInfo = useSelector(state => state.loginCheck.loginInfo);
    const [pastMessages, setPastMessages] = useState([]);

    useEffect(() => {
        const socket = new SockJS('http://34.121.58.202:8088/stomp-endpoint');
        const stomp = Stomp.over(socket);

        stomp.connect({}, (frame) => {
            setStompClient(stomp);
            console.log('Connected: ' + frame);

            stomp.subscribe(`/user/${userInfo.userId}/queue/messages`, (greetings) => {
                const parseMessage = JSON.parse(greetings.body);
                console.log(parseMessage)
                setGreetings((prevState) => [...prevState, parseMessage]);
            });
        });

        // 컴포넌트가 언마운트될 때 WebSocket 연결 해제
        return () => {
            if (stompClient !== null) {
                stompClient.disconnect();
            }
        };
    }, []); // 빈 배열을 사용하여 한 번만 실행되도록 설정

    useEffect(() => {
        // 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
        if (messageBoxRef.current) {
            messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
            console.log(messageBoxRef.current.scrollHeight)
        }
    }, [greetings]);



    const sendMessage = () => {
        const obj = {
            senderId: userInfo.userId,
            // senderId: "140",
            senderLibraryName: userInfo.libraryName,
            content: inputMessage,

            recipientId: 147, // target user ID / 책 주인 ID
            recipientLibraryName: "떼바떼바떼바바", // target user name
            timestamp: new Date()
        };


        stompClient.send('/app/chat', {}, JSON.stringify(obj));
        setInputMessage(''); // 메시지 전송 후 입력 필드 초기화


    };

    const handleInputChange = (event) => {
        const text = event.target.value;
        setInputMessage(text);
        if (text.length <= maxLength) {
            setInputMessage(text);
        } else {
            alert('100자를 초과하였습니다.'); // 100자를 초과한 경우 알림
        }
    };

    return (
        <div className={classes.chattingContainer}>
            <Header>
                <div className={classes.topWrap}>
                    <div>Brooke Davis</div>
                </div>
            </Header>

            {/*<div className={classes.EndBtnBox}>*/}
            {/*    <p>거래가 완료되었다면 '거래완료 버튼'을 눌러주세요!</p>*/}
            {/*    <button className={classes.EndBtn}>거래완료</button>*/}
            {/*</div>*/}
            <div className={classes.chattingWrap} ref={messageBoxRef}>
                <div className={classes.messageBox}>
                    <div className={classes.firstMessage}>
                        <p>대여(or구매)할게요!</p>
                        <div className={classes.bookDetailWrap}>
                            <img src={bookImg3} alt="책 이미지" />
                            <div className={classes.bookDetailElement}>
                                <div className={classes.bookName}>여기는 책제목</div>
                                <div className={classes.bookPublisher}>
                                    <div>이동명 지음</div>
                                    <div>|</div>
                                    <div>반바지스킨 펴냄</div>
                                </div>
                                <div className={classes.bookStatus}>
                                    <div>최상</div>
                                    <div>|</div>
                                    <div>4,200원</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {greetings.map((item, idx) => (
                        <div key={idx} className={item.userId === userInfo.userId ? classes.sendMassageBox : classes.bringMassageBox}>
                            <div className={item.userId === userInfo.userId  ? classes.sendUserName : classes.bringUserName}>
                                {item.senderLibraryName}
                            </div>
                            <div className={item.userId === userInfo.userId  ? classes.sendMassage : classes.bringMassage}>
                                {item.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer>
                <div className={classes.messageWrap}>
                    <input className={classes.inputMessage} onChange={handleInputChange} value={inputMessage} type="text" placeholder="메세지를 입력하세요" />
                    <img onClick={sendMessage} className={classes.inputIcon} src={sendPlaneIcon} alt="메세지 보내기" />
                </div>
            </Footer>
        </div>
    );
}

export default Chatting;