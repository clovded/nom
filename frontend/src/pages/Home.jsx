import Map from "../features/map/Map";
import {useAuth} from "../features/auth/AuthContext";

function Home() {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return (
            <main>
                <h1>hi, you are currently logged out ദ്ദി(˵ •̀ ᴗ - ˵ ) ✧</h1>
                <div className="text-[0.9rem] text-coffee mb-[1.5rem]">
                    search for a food spot and rate it! (you need to be logged in for that)
                </div>
                <Map />
            </main>
        )
    }

    return (
        <main>
            <h1>hi, {currentUser.username}  ദ്ദി(˵ •̀ ᴗ - ˵ ) ✧</h1>
            <div className="text-[0.9rem] text-coffee mb-[1.5rem]">
                search for a food spot and rate it!
            </div>
            <Map />
        </main>
    )
}

export default Home
