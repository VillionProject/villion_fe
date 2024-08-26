import React, {useEffect, useState} from 'react';
import classes from '../../styles/blocks/RentalConfirm.module.css';
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import {getProductsByCategory, getProductsByUser} from "../../common/api/ApiGetService";


const RentalConfirm = () => {

    const [currData, setCurrData] = useState('');

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const currData = JSON.parse(urlParams.get('data'));
        setCurrData(currData)
        console.log(currData)

    }, []);

    return (
        <div className={classes.wrap}>
            <div className={classes.topArea}>
                <p>{currData.title}</p>
            </div>

            <div className={classes.styleBlock}>
                <p>빌런배송</p>
            </div>

            <div className={classes.contentArea}>
                <Input value="이름" placeholder="이름을 입력하세요. 변경 불가능합니다." type="text"/>
                <Input value="핸드폰 번호" placeholder="핸드폰번호를 입력하세요. 변경 불가능합니다." type="text"/>
                <Input value="배송유의사항" placeholder="배송유의사항을 입력하세요. 변경 불가능합니다." type="text"/>
                {currData.title == '대여하기' &&
                    <>
                        <Input value="대여시작날짜" placeholder="20240808" type="text"/>
                        <Input value="대여종료날짜" placeholder="20240810" type="text"/>
                    </>
                }

            </div>

            <div className={classes.summary}>
                <div className={classes.summaryTitle}>
                    <p>주문내역</p>
                </div>

                <div className={classes.tradeHistory}>
                    <div>
                        <div className={classes.innerDiv}>
                            <p>1</p>
                            <p>{currData.bookName}</p>
                        </div>
                        <p>{currData.productStatus} <span>|</span> {currData.rentalPrice}원</p>
                    </div>

                </div>

                <div className={classes.payTitle}>
                    <p>결제금액</p>
                </div>


                <div className={classes.payHistory}>

                    {currData.title == '대여하기' &&
                        <div>
                            <p>대여기간</p>
                            <p>15일</p>
                        </div>
                    }


                    <div>
                        <p>권수</p>
                        <p>1권</p>
                    </div>

                    <div>
                        <p>배송비</p>
                        <p>3000원</p>
                    </div>
                </div>
            </div>

            <div className={classes.totalPrice}>
                <Input value="사용할 포인트" placeholder="사용할 포인트를 입력하세요." type="text"/>
                <p>사용 가능한 포인트 <span>0</span></p>
            </div>

            <Button value="결제하기"></Button>

        </div>
    );
};

export default RentalConfirm;