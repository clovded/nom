import {Link} from "react-router-dom";
import Logout from "../features/auth/Logout";
import {useAuth} from "../features/auth/AuthContext";

function Navbar() {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return (
            <nav className="w-full flex justify-between items-center box-border h-[70px]">
                <Link className="no-underline [text-decoration:none]" to="/">
                    <h2 className="font-lobster text-[50px] text-blue m-0">NOM</h2>
                </Link>
                <ul className="flex gap-5 list-none m-0 p-0">
                    <Link className="px-5 py-[5px] no-underline [text-decoration:none] text-background bg-black rounded-[10px] transition-colors duration-200 hover:bg-blue" to="/login">Login</Link>
                    <Link className="px-5 py-[5px] no-underline [text-decoration:none] text-background bg-black rounded-[10px] transition-colors duration-200 hover:bg-blue" to="/">Home</Link>
                    <Link className="px-5 py-[5px] no-underline [text-decoration:none] text-background bg-black rounded-[10px] transition-colors duration-200 hover:bg-blue" to="/about">About</Link>
                    <Link className="px-5 py-[5px] no-underline [text-decoration:none] text-background bg-black rounded-[10px] transition-colors duration-200 hover:bg-blue" to="/timeline">Timeline</Link>
                </ul>
            </nav>
        );
    }

    return (
        <nav className="w-full flex justify-between items-center box-border h-[70px]">
            <Link className="[text-decoration:none]" to="/">
                <h2 className="font-lobster text-[50px] text-blue m-0">NOM</h2>
            </Link>
            <ul className="flex gap-5 list-none m-0 p-0">
                <li><Link className="px-5 py-[5px] [text-decoration:none] text-background bg-black rounded-[10px] transition-colors duration-200 hover:bg-blue" to="/">Home</Link></li>
                <li><Link className="px-5 py-[5px] [text-decoration:none] text-background bg-black rounded-[10px] transition-colors duration-200 hover:bg-blue" to="/about">About</Link></li>
                <li><Link className="px-5 py-[5px] [text-decoration:none] text-background bg-black rounded-[10px] transition-colors duration-200 hover:bg-blue" to="/timeline">Timeline</Link></li>
                <li><Link className="px-5 py-[5px] [text-decoration:none] text-background bg-black rounded-[10px] transition-colors duration-200 hover:bg-blue" to="/settings">Settings</Link></li>
            </ul>
            <Logout />
        </nav>
    );
}

export default Navbar;
