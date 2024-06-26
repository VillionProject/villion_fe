import classes from "../../styles/blocks/Chatting.module.css"
import Header from "./Header";

const Chatting = () => {

    return (
        <div className={classes.chattingContainer}>
            <Header>
                <div className={classes.topWrap}>

                </div>
            </Header>


            <div className={classes.chattingWrap}>

            </div>

            <div className={classes.messageWrap}>


            </div>
        </div>
    );


}

export default Chatting;