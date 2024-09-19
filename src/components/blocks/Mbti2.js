import React, { useEffect, useState } from 'react';
import '../../styles/blocks/Mbti2.css';
import { useNavigate } from 'react-router-dom';
import classes from "../../styles/blocks/Home.module.css";
import SmallLogo from "../atoms/SmallLogo";
import ArrowDown from "../../asset/images/Arrow_Down.svg";
import Bell from "../../asset/images/Bell.svg";
import Heart from "../../asset/images/Heart_Outlined.svg";
import Bag from "../../asset/images/Shopping_Bag_Outlined.svg";
import Header from "./Header";
import axios from "axios";
import {categoryGetProduct, getProducts, mbtiCategoryResult, mbtiMethods1} from "../../common/api/ApiGetService";
import {mbtiMethods2, mbtiMethods3, userMbtiSave} from "../../common/api/ApiPostService";
import {useSelector} from "react-redux";

const Mbti2 = () => {
    const [questions, setQuestions] = useState([]);
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [mbti, setMbti] = useState('');
    const [mbtiType, setMbtiType] = useState({});
    const [bookArray, setBookArray] = useState([]);
    const nav = useNavigate();
    const userInfo = useSelector(state => state.loginCheck.loginInfo);

    useEffect(() => {
        mbtiMethods1()
            .then((res) => {
                if(res.status == 200) {
                    setQuestions(res.data.questions);
                }
            })
            .catch((err) => {

            })

    }, []);


    const handleChoiceSelect = (choice) => {
        setSelectedChoice(choice);

        const currentCategory = questions[currentCategoryIndex];
        const currentQuestion = currentCategory.questions[currentQuestionIndex];

        // 카테고리질문/질문번호/선택번호
        mbtiMethods2(currentCategoryIndex,currentQuestionIndex,choice)
            .then((response) => {
                // 질문의 번호가 (카테고리의 개수 - 1)와 같다면 .. ?

                console.log(currentQuestionIndex)
                console.log(currentCategory.questions.length - 1)
                console.log("===============")

                // 현재 질문 번호와 카테고리 질문 번호가 같으면
                // 카테고리 질문이 끝나면(I/E 카테고리의 질문이 끝나면)
                if (currentQuestionIndex === currentCategory.questions.length - 1) {
                    console.log("## " + currentQuestionIndex)
                    console.log("## " + questions.length - 1);
                    console.log("===============")
                    // 카테고리의 번호가 (질문의 개수 - 1)와 같다면 .. ? ( 마지막 질문이 마치고 난 후 )
                    // 마지막 카테고리인 P/J 인덱스()와 질문 인덱스(2)가 같다면, 결과 받기(질문 끝)
                    if (currentCategoryIndex === questions.length - 1) {

                        // mbti 결과받기
                        fetchMbtiResult();

                        // 카테고리의 개수를 질문의 개수랑 같게 맞춰주면.. 결과값이 보여주게 해놨음..
                        setCurrentCategoryIndex(currentCategoryIndex + 1);
                    } else {
                        // 카테고리가 변경될 때.

                        mbtiMethods1().then((res) => {
                            setQuestions(res.data.questions);
                            setCurrentCategoryIndex(currentCategoryIndex + 1);
                            setCurrentQuestionIndex(0);
                        }).catch((err) => {

                        });
                    }

                } else {

                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                }
            })
            .catch((error) => {
                // Handle error
            });


        // Mocking the POST request response
        // const mockPostResponse = {
        //     data: {
        //         // Simulate response data here if needed
        //     },
        // };


    };

    const fetchMbtiResult = () => {
        mbtiMethods1()
            .then((res) => {
                setMbti(res.data.type);

                // 사용자 MBTI 저장
                userMbtiSave(userInfo.userId, res.data.type)
                    .then((res2) => {

                        // MBTI 카테고리 결과 받아오기
                        mbtiCategoryResult(res.data.type)
                            .then((res3) => {
                                const productPromises = res3.data.map(item =>
                                    categoryGetProduct(item.category)
                                );

                                // 모든 categoryGetProduct 호출이 완료된 후 결과를 bookArray에 추가
                                Promise.all(productPromises)
                                    .then(results => {
                                        // 결과들을 한 배열로 합치기
                                        const allProducts = results.flatMap(res4 => res4.data);
                                        setBookArray(allProducts);
                                    })
                                    .catch((err4) => {
                                        console.error('Error fetching products:', err4);
                                    });

                            })
                            .catch((err) => {
                                console.error("Error fetching MBTI category result:", err);
                            });

                    })
                    .catch((err) => {
                        console.error("Error saving user MBTI:", err);
                    });

            })
            .catch((err) => {
                console.error("Error fetching MBTI data:", err);
            });
    };


    const cleanQuestionHeader = (question) => {
        const headerEndIndex = question.indexOf('1.') !== -1 ? question.indexOf('1.') : question.indexOf('2.');
        return question.substring(0, headerEndIndex).trim();
    };

    const cleanQuestionText = (question, type) => {
        const headerEndIndex = question.indexOf('1.') !== -1 ? question.indexOf('1.') : question.indexOf('2.');
        const msg = question.substring(headerEndIndex).trim().split('//');

        if (type === 'left') {
            return msg[0];
        } else {
            return msg[1];
        }
    };

    const reloadPage = async () => {

        const data = await mbtiMethods3();

        nav('/mbtiStart');
        // window.location.reload();
    };

    const productDetail = (productValue) => {
        nav(`/detail?detail=${JSON.stringify(productValue)}`)
    }

    return (
        <>
            <Header>
            <div className={classes.topWrap}>
                <SmallLogo></SmallLogo>
                <div className={classes.mainIconWrap}>
                    <div className={classes.addressWrap}>
                        <h1 className={classes.address}>인계동</h1>
                        <svg className={classes.svgContainer} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 24"
                             fill="none">
                            <image href={ArrowDown}/>
                        </svg>
                    </div>
                    <div className={classes.topSvgWrap}>
                        {/*<div style={{width: '35px', height: '35px', borderRadius : '50%', background : 'black'}}></div>*/}
                        {/*<div style={{width: '35px', height: '35px', borderRadius : '50%', background : 'black'}}></div>*/}
                        {/*<div style={{width: '35px', height: '35px', borderRadius : '50%', background : 'black'}}></div>*/}
                        <svg className={classes.svgRightContainer} xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 25 24"
                             fill="none">
                            <image href={Bell}/>
                        </svg>
                        <svg className={classes.svgRightContainer} xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 25 24"
                             fill="none">
                            <image href={Heart}/>
                        </svg>
                        <svg className={classes.svgRightContainer} xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 25 24"
                             fill="none">
                            <image href={Bag}/>
                        </svg>
                    </div>
                </div>
            </div>
        </Header>
            {currentCategoryIndex !== questions.length && <h2 style={{padding: '20px 40px', fontWeight: '500', fontSize: '20px', letterSpacing: '1px', paddingBottom: '10px'}}>상상해보세요. 💭</h2>}
            {questions.length > 0 &&
                questions.map((category, categoryIndex) => (
                    <div key={categoryIndex} className={`category_mbti ${currentCategoryIndex === categoryIndex ? 'active' : ''}`}>
                        {category.questions.map((question, questionIndex) => (
                            <div key={questionIndex} className={`mbti_container question ${currentQuestionIndex === questionIndex ? 'active' : ''}`}>
                                <div className="question-p question-header">
                                    <p style={{paddingLeft: '40px', fontSize: '16px', textAlign: 'left', marginBottom: '40px', cursor: 'pointer', fontWeight: '400' }}>
                                        {cleanQuestionHeader(question.question)}
                                    </p>
                                </div>
                                <div style={{padding: '0px 40px'}} className="question-p question-text">
                                    <p onClick={() => handleChoiceSelect(1)} className='choice-button' style={{ fontSize: '16px', textAlign: 'center', marginBottom: '20px', cursor: 'pointer' }}>
                                        <span style={{fontSize: '30px'}}>🪑</span>
                                        <span>{cleanQuestionText(question.question, 'left')}</span>
                                    </p>
                                    <p onClick={() => handleChoiceSelect(2)} className='choice-button' style={{ fontSize: '16px', textAlign: 'center', marginBottom: '20px', cursor: 'pointer' }}>
                                        <span style={{fontSize: '30px'}}>🙋</span>
                                        <span>{cleanQuestionText(question.question, 'right')}</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            <div className='mbti_result_container' style={{ display: currentCategoryIndex === questions.length ? 'block' : 'none', position: 'none', padding: '40px' }}>
                <div className="mbti_result_container_2">
                    {/*style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', marginBottom: '10px' }}*/}
                    <h1 className="mbti-result" style={{ color: 'black', textAlign: 'center' }}>Your MBTI</h1>
                    <p style={{ color: 'black', textAlign: 'center', fontWeight: '700', fontSize: '50px' }} className="mbti-result_yourmbti">{mbti}</p>
                    <p style={{ textAlign: 'center' }}>
                        {mbtiType.hashtag != undefined && mbtiType.hashtag.split(',').map((tag, index) => (
                            <span key={index}> #{tag}</span>
                        ))}
                    </p>
                    <p style={{ textAlign: 'center' }}><strong style={{ fontSize: '24px', fontWeight: 'normal' }}>{mbtiType.subTitle}</strong></p>
                    <img style={{ width: '50%' }} src={"https://spti.snackpot.kr/images/type/1_1.png"} alt="MBTI type" />
                    <p style={{ textAlign: 'justify' }}>{mbtiType.trait}</p>
                    <div className="result_jobTitle">
                        {mbtiType.jobRecommend != undefined && mbtiType.jobRecommend.map((item, idx) => (
                            <p key={idx} className="p_jobTitle">{item.jobTitle}</p>
                        ))}
                    </div>
                    <div className="Compatibility" style={{ textAlign: 'center' }}>
                        <h2 style={{fontWeight: '600', marginBottom : '15px', fontSize: '18px'}}>{mbti}가 즐겨보는 책</h2>

                        <div style={{display: 'flex', gap : '15px'}}>
                            {bookArray.slice(0, 3).map((item, idx) => (
                                <img onClick={() => {productDetail(item)}} style={{width : '110px', height: '140px', cursor : 'pointer'}} src={item.productImg} />
                            ))}
                        </div>

                        {/*<p className="option_Compatibility" style={{ marginBottom: '10px', fontWeight: '700' }}>*/}
                        {/*    환상의 케미 <br />*/}
                        {/*    <img style={{ width: '50%' }} src={"https://spti.snackpot.kr/images/type/5_1.png"} alt="Best compatibility" /> <br />*/}
                        {/*    {mbtiType.bestCompatibility}*/}
                        {/*</p>*/}
                        {/*<p className="option_Compatibility" style={{ marginBottom: '10px', fontWeight: '700' }}>*/}
                        {/*    환장의 케미 <br />*/}
                        {/*    <img style={{ width: '50%' }} src={"https://spti.snackpot.kr/images/type/7_1.png"} alt="Worst compatibility" /> <br />*/}
                        {/*    {mbtiType.worstCompatibility}*/}
                        {/*</p>*/}
                    </div>
                    <button style={{ width: '100%', height: '50px', cursor: 'pointer'}} className='replay' onClick={reloadPage}>다시하기</button>
                </div>
            </div>
        </>
    );
};

export default Mbti2;
