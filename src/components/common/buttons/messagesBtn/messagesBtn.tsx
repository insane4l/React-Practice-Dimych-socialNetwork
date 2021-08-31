import { Link } from "react-router-dom"


const MessagesBtn: React.FC<MessagesBtnPropsType> = ({linkTo}) => {
    return (
        <Link to={linkTo} className="user__messages-btn">Write message</Link>
    )
}

export default MessagesBtn



type MessagesBtnPropsType = {
    linkTo: string
}