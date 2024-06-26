import classes from "../../styles/blocks/Chatting.module.css"
import Header from "./Header";
import Footer from "./Footer";
import sendPlaneIcon from "../../../src/asset/images/Send.png"
import bookImg3 from "../../../src/asset/books/image 3.png"
import { useRef } from 'react';

const Chatting = () => {
    const messageBoxRef = useRef(null);


    return (
        <div className={classes.chattingContainer}>
            <Header>
                <div className={classes.topWrap}>
                    <div>Brooke</div>
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
                            <img src={bookImg3}/>
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

                    <div className={classes.bringMassageBox}>
                        <div className={classes.bringUserName}>
                            Brooke
                        </div>
                        <div className={classes.bringMassage}>
                            Hey Lucas!
                        </div>
                    </div>
                    <div className={classes.bringMassageBox}>
                        <div className={classes.bringUserName}>
                            Brooke
                        </div>
                        <div className={classes.bringMassage}>
                            Hey Lucas!
                        </div>
                    </div>
                    <div className={classes.bringMassageBox}>
                        <div className={classes.bringUserName}>
                            Brooke
                        </div>
                        <div className={classes.bringMassage}>
                            No worries. Let me know if you
                            need any help 😉
                        </div>
                    </div>
                    <div className={classes.bringMassageBox}>
                        <div className={classes.bringUserName}>
                            Brooke
                        </div>
                        <div className={classes.bringMassage}>
                            Hey Lucas!
                        </div>
                    </div>
                    <div className={classes.bringMassageBox}>
                        <div className={classes.bringUserName}>
                            Brooke
                        </div>
                        <div className={classes.bringMassage}>
                            Hey Lucas!
                        </div>
                    </div>

                    <div className={classes.sendMassageBox}>
                        <div className={classes.sendUserName}>
                            Lucas
                        </div>
                        <div className={classes.sendMassage}>
                            It's going well. Thanks for asking!
                        </div>
                    </div>
                    <div className={classes.sendMassageBox}>
                        <div className={classes.sendUserName}>
                            Lucas
                        </div>
                        <div className={classes.sendMassage}>
                            It's going well. Thanks for asking!
                        </div>
                    </div>
                    <div className={classes.sendMassageBox}>
                        <div className={classes.sendUserName}>
                            Lucas
                        </div>
                        <div className={classes.sendMassage}>
                            It's going well. Thanks for asking!
                        </div>
                    </div>
                    <div className={classes.bringMassageBox}>
                        <div className={classes.bringUserName}>
                            Brooke
                        </div>
                        <div className={classes.bringMassage}>
                            Hey Lucas!
                        </div>
                    </div>
                    <div className={classes.bringMassageBox}>
                        <div className={classes.bringUserName}>
                            Brooke
                        </div>
                        <div className={classes.bringMassage}>
                            Hey Lucas!
                        </div>
                    </div>

                    <div className={classes.bringMassageBox}>
                        <div className={classes.bringUserName}>
                            Brooke
                        </div>
                        <div className={classes.bringMassage}>
                            Hey Lucas!
                        </div>
                    </div>


                </div>


            </div>

            <Footer>
                <div className={classes.messageWrap}>
                    <input className={classes.inputMessage} type="text" placeholder="메세지를 입력하세요"/>
                    <img className={classes.inputIcon} src={sendPlaneIcon} alt="메세지 보내기"/>
                </div>
            </Footer>

        </div>
    );


}

export default Chatting;