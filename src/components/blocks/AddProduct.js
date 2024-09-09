import React, { useState } from 'react';
import Logo from "../atoms/Logo";
import Center from "./Center";
import Input from "../atoms/Input";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import classes from "../../styles/blocks/SignUp.module.css";
import Loading from "./Loading";
import PopupDom from "./PopupDom";
import MsgPopup from "./MsgPopup";
import ConfirmPopup from "./ConfirmPopup";
import {emailCheck, passCheck} from "../../common/Reg";
import {registerBook, userSignUp} from "../../common/api/ApiPostService";
import {useSelector} from "react-redux";
import {categoryMenu, rentalMenu, statusMenu} from "../../common/Menus";
import CategorySelect from "./CategorySelect";

const AddProduct = () => {
    const navigate = useNavigate();
    const [bookName, setBookName] = useState('');
    const [productStatus, setProductStatus] = useState('');
    const [rentalAvailability, setRentalAvailability] = useState(false);
    const [rentalAvailability2, setRentalAvailability2] = useState(false);
    const [category, setCategory] = useState('');
    const [category2, setCategory2] = useState('');
    const [stockQuantity, setStockQuantity] = useState(0);
    const [rentalPrice, setRentalPrice] = useState(0);
    const [rentalMethod, setRentalMethod] = useState('');
    const [rentalLocation, setRentalLocation] = useState('');
    const [description, setDescription] = useState('');
    const [imgPath, setImgPath] = useState('');
    const [isMsgPopupOpen, setIsMsgPopupOpen] = useState({ show: false, msg: '', gb: '' });
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState({ show: false, msg: '' });
    const [loading, setLoading] = useState(false);
    const userInfo = useSelector(state => state.loginCheck.loginInfo);

    const bookNameChangeMethod = (e) => setBookName(e.target.value);
    const productStatusChangeMethod = (e) => setProductStatus(e.target.value);
    const rentalAvailabilityChangeMethod = (e) => setRentalAvailability(e.target.checked);
    const rentalAvailabilityChangeMethod2 = (e) => setRentalAvailability2(e.target.checked);
    const categoryChangeMethod = (e) => setCategory(e.target.value);
    const stockQuantityChangeMethod = (e) => setStockQuantity(e.target.value);
    const rentalPriceChangeMethod = (e) => setRentalPrice(e.target.value);
    const rentalMethodChangeMethod = (e) => setRentalMethod(e.target.value);
    const rentalLocationChangeMethod = (e) => setRentalLocation(e.target.value);
    const descriptionChangeMethod = (e) => setDescription(e.target.value);
    const imgChangeMethod = (e) => setImgPath(e.target.value);

    const signUpHandler = () => {
        setLoading(true);

        // if (!emailCheck(id)) {
        //     setIsMsgPopupOpen({show: true, msg: '아이디를 이메일형식으로 입력해 주세요.', gb : ''});
        //     return ;
        // }
        //
        // if (!passCheck(password)) {
        //     setIsMsgPopupOpen({show: true, msg: '비밀번호는 대,소문자 특수문자 포함 8글자 이상으로 입력해 주세요.', gb : ''});
        //     return ;
        // }

        setLoading(true);

        setTimeout(() => {
            setLoading(false);

            registerBook(
                userInfo.userId,
                bookName,
                category,
                productStatus,
                stockQuantity,
                rentalPrice,
                rentalMethod,
                rentalLocation,
                description,
                rentalAvailability,
                rentalAvailability2,
                imgPath
            )
            .then((res) => {
                if(res.status === 200) {
                    setIsMsgPopupOpen({show: true, msg: '책 등록이 완료 되었습니다.', gb : 'success'});
                }
            }).catch((err) => {
                setIsMsgPopupOpen({ show: true, msg: "책 등록 중 오류가 발생했습니다.", gb: 'error' });
            })

        }, 700);
    }

    const closeMsgPopup = () => {
        if (isMsgPopupOpen.gb === 'success') {
            navigate('/home');
        }
        setIsMsgPopupOpen({ show: false, msg: '', gb: '' });
    }

    const confirmHandler = () => {
        alert("asdsad");
    }

    const closeConfirmPopup = () => {
        setIsConfirmPopupOpen({ show: false, msg: '' });
    }

    return (
        <div>
            <Logo />
            <Center>
                <div className={classes.signUpDetail}>
                    <Input value="책 이름" placeholder="책 이름을 입력하세요. 변경 불가능합니다." type="text" onChange={bookNameChangeMethod} />

                    <div className={classes.selectWrap}>
                        <p>카테고리</p>
                        <CategorySelect setCategory={setCategory} menuList={categoryMenu} />
                    </div>

                    {/*<Input value="카테고리" placeholder="카테고리를 입력하세요." type="text" onChange={categoryChangeMethod} />*/}
                    {/*<Input value="책의 상태" placeholder="책 상태를 입력하세요." type="text" onChange={productStatusChangeMethod} />*/}
                    <div className={classes.selectWrap}>
                        <p>책의 상태</p>
                        <CategorySelect setCategory={setProductStatus} menuList={statusMenu} />
                    </div>


                    <Input value="개수" placeholder="5" type="text" onChange={stockQuantityChangeMethod} />
                    <Input value="대여 가격" placeholder="4000" type="text" onChange={rentalPriceChangeMethod} />
                    <div className={classes.selectWrap}>
                        <p>대여 방법</p>
                        <CategorySelect setCategory={setRentalMethod} menuList={rentalMenu} />
                    </div>
                    {/*<Input value="대여 방법" placeholder="만나서 할래요" type="text" onChange={rentalMethodChangeMethod} />*/}
                    <Input value="거래 지역" placeholder="인계동" type="text" onChange={rentalLocationChangeMethod} />
                    <Input value="설명" placeholder="설명을 입력하세요" type="text" onChange={descriptionChangeMethod} />
                    <Input value="이미지 주소" placeholder="이미지주소를 입력하세요" type="text" onChange={imgChangeMethod} />



                    <div className={classes.rentalWrap}>
                        <div className={classes.checkboxContainer}>
                            <input type="checkbox" className={classes.customCheckbox} id="rentalAvailability" checked={rentalAvailability} onChange={rentalAvailabilityChangeMethod} />
                            <label className={classes.checkboxLabel} htmlFor="rentalAvailability">대여 가능 여부</label>
                        </div>
                        <div className={classes.checkboxContainer}>
                            <input type="checkbox" className={classes.customCheckbox} id="rentalAvailability2" checked={rentalAvailability2} onChange={rentalAvailabilityChangeMethod2} />
                            <label className={classes.checkboxLabel} htmlFor="rentalAvailability2">구매 가능 여부</label>
                        </div>
                    </div>

                </div>
                <Button value="등록하기" onClick={signUpHandler} />
            </Center>
            {loading && <Loading />}
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

export default AddProduct;
