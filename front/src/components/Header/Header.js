import './Header.css';
import CreatePost from '../CreatePost/CreatePost';
import { useSelector, useDispatch } from "react-redux";
import { toggleCreatePost } from "../../store/store";

function Header() {
    let isCreatePostVisible = useSelector(state => state.createPostVisible)
    let dispatch = useDispatch();
    // const [isCreatePostVisible, setCreatePostVisible] = useState(false);

    // const toggleCreatePost = () => {
    //     setCreatePostVisible(!isCreatePostVisible);
    // }
    return (
        <div className="header">
            <div className="header_content">
                <div className="logo">
                    <span><a href="/">memories</a></span>
                </div>

                <div className="search">
                    <input type="text" placeholder="검색" />
                </div>

                <div className="service">
                    <a href="/">
                        <i class="fa-solid fa-house-chimney fa-xl"></i>
                    </a>
                    <i class="fa-regular fa-square-plus fa-2x" onClick={ () => { dispatch(toggleCreatePost()) }}></i>
                    <a href="/mypage">
                        <i class="fa-regular fa-circle-user fa-2x"></i>
                    </a>
                </div>
            </div>
            {isCreatePostVisible && <CreatePost />}
        </div>
    )

}

export default Header;