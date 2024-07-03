import classes from "../../styles/blocks/Chatting.module.css";
import Header from "./Header";
import Footer from "./Footer";
import sendPlaneIcon from "../../../src/asset/images/Send.png";
import bookImg3 from "../../../src/asset/books/image 3.png";
import { useEffect, useState } from 'react';
import axios from "axios";
import Stomp from 'stompjs';
import SockJS from "sockjs-client";

const Chatting = () => {
    const [userId, setUserId] = useState('');
    const [libraryName, setLibraryName] = useState('');
    const [stompClient, setStompClient] = useState(null);
    const [greetings, setGreetings] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/v1/user/findByID/1')
            .then((res) => {
                setUserId(res.data.userId);
                setLibraryName(res.data.libraryName);
            })
            .catch((err) => {
                console.log(err);
            });

        const socket = new SockJS('http://localhost:8082/stomp-endpoint');
        const stomp = Stomp.over(socket);

        stomp.connect({}, (frame) => {
            setStompClient(stomp);
            console.log('Connected: ' + frame);

            stomp.subscribe('/topic/greetings', (greeting) => {
                console.log("메세지도착함")
                const parseMessage = JSON.parse(greeting.body);
                setGreetings((prevState) => [...prevState, parseMessage]);
            });
        });

        // 컴포넌트가 언마운트될 때 WebSocket 연결 해제
        return () => {
            if (stompClient !== null) {
                stompClient.disconnect();
                console.log('Disconnected');
            }
        };
    }, []); // 빈 배열을 사용하여 한 번만 실행되도록 설정

    // Feat : 메시지 보내기
    const sendName = () => {
        const obj = {
            userId: userId,
            libraryName: "libraryName",
            message: "message"
        };
        stompClient.send('/app/hello', {}, JSON.stringify(obj));
    };

    return (
        <div className={classes.chattingContainer}>
            <Header>
                <div className={classes.topWrap}>
                    <div>{libraryName}</div>
                </div>
            </Header>

            <div className={classes.EndBtn}>
                <button>거래완료</button>
            </div>
            <div className={classes.chattingWrap}>
                <div className={classes.messageBox}>
                    <div className={classes.firstMessage}>
                        <p>대여(or구매)할게요!</p>
                        <div className={classes.bookDetailWrap}>
                            <img src={bookImg3} alt="책 이미지" />
                            <div className={classes.bookDetailElement}>
                                <div>여기는 책제목</div>
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
                        <div  key={idx}  className={item.userId === 6 ? classes.sendMassageBox : classes.bringMassageBox}>
                            <div className={classes.bringUserName}>
                                {item.libraryName}
                            </div>
                            <div className={classes.bringMassage}>
                                {item.message}
                            </div>
                        </div>
                    ))}

                    {/*<div className={classes.sendMassageBox}>*/}
                    {/*    <div className={classes.sendUserName}>*/}
                    {/*        Lucas*/}
                    {/*    </div>*/}
                    {/*    <div className={classes.sendMassage}>*/}
                    {/*        It's going well. Thanks for asking!*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>

            <Footer>
                <div className={classes.messageWrap}>
                    <input className={classes.inputMessage} type="text" placeholder="메세지를 입력하세요" />
                    <img onClick={sendName} className={classes.inputIcon} src={sendPlaneIcon} alt="메세지 보내기" />
                </div>
            </Footer>
        </div>
    );
}

export default Chatting;
