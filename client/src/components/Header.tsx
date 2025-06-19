import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div >
            <div className=" bg-slate-200 ">
                <div className="flex items-center justify-between p-5">
                    <div>
                        <Link to="/">
                            <h1>Mern Auth</h1>
                        </Link>
                    </div>
                    <div className="flex items-center gap-5 font-bold cursor-pointer">
                        <ul className="flex items-center gap-5">
                            <Link to="/">
                                <li>Home</li>
                            </Link>
                            <Link to="about">
                                <li>About</li>
                            </Link>
                            <Link to="signin">
                                <li>Sign In</li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;
