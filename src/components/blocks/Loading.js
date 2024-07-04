
import classes from "../../styles/blocks/Loading.module.css"
import loading from "../../asset/images/load.gif";
const Loading = () => {
    return (
        <div className={classes.loadWrap}>
            <img className={classes.img} src={loading} />
        </div>
    )
}

export default Loading;