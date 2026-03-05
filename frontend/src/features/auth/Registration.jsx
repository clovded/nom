import { Link } from "react-router-dom";
import useRegistration from "./hooks/useRegistration";

const Registration = () => {
    const {
        username, setUsername,
        password, setPassword,
        passwordConfirm, setPasswordConfirm,
        error,
        showPassword, setShowPassword,
        isLoading,
        handleSubmit
    } = useRegistration();

    return (
        <div className="min-h-[calc(100vh-70px)] flex items-center justify-center">
            <div className="bg-clay rounded-2xl p-10 w-full max-w-[420px] shadow-card">
                <h2 className="font-lobster text-[42px] text-coffee text-center mb-8 mt-0">register</h2>

                {error && (
                    <div className="bg-[#fce4e4] text-[#c0392b] p-3 rounded-xl text-[14px] text-center mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <label className="text-[12px] font-bold uppercase tracking-wide text-dark-grey">username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="choose a username"
                            disabled={isLoading}
                            className="w-full p-4 rounded-xl border-2 border-beige-light bg-cream text-black text-[16px] focus:outline-none focus:border-coffee transition-colors disabled:opacity-50"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-[12px] font-bold uppercase tracking-wide text-dark-grey">password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="min. 8 characters"
                                disabled={isLoading}
                                className="w-full p-4 pr-12 rounded-xl border-2 border-beige-light bg-cream text-black text-[16px] focus:outline-none focus:border-coffee transition-colors disabled:opacity-50"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-grey hover:text-coffee transition-colors text-[18px]"
                            >
                                {showPassword ? "(⊙_⊙)" : "(ᴗ_ ᴗ。)"}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-[12px] font-bold uppercase tracking-wide text-dark-grey">confirm password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            placeholder="repeat your password"
                            disabled={isLoading}
                            className="w-full p-4 rounded-xl border-2 border-beige-light bg-cream text-black text-[16px] focus:outline-none focus:border-coffee transition-colors disabled:opacity-50"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full p-4 rounded-xl bg-coffee text-clay font-bold text-[16px] uppercase tracking-wide transition-all duration-200 hover:-translate-y-[2px] hover:shadow-hover disabled:opacity-50 disabled:translate-y-0 mt-2"
                    >
                        {isLoading ? "registering..." : "register"}
                    </button>

                    <div className="text-center">
                        <Link className="text-[14px] text-dark-grey hover:text-coffee transition-colors [text-decoration:none]" to="/login">
                            already have an account?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registration;
