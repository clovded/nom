import { Link } from "react-router-dom";
import useRegistration from "./hooks/useRegistration";

const Registration = () => {
    const {
        email, setEmail,
        username, setUsername,
        password, setPassword,
        passwordConfirm, setPasswordConfirm,
        error,
        showPassword, setShowPassword,
        isLoading,
        handleSubmit
    } = useRegistration();

    return (
        <div className="flex flex-col justify-center items-center m-0">
            <h2 className="text-center mb-5 font-lobster text-black text-[48px]">register</h2>

            {error && <div className="text-[palevioletred] text-center text-[16px]">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center w-full max-w-[500px] relative">
                    <div className="my-[15px] w-full relative">
                        <input
                            className="w-full min-w-[350px] p-[15px] rounded-[15px] border-2 border-grey transition-colors duration-300 text-[18px] box-border focus:outline-none focus:border-blue"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="my-[15px] w-full relative">
                        <input
                            className="w-full min-w-[350px] p-[15px] rounded-[15px] border-2 border-grey transition-colors duration-300 text-[18px] box-border focus:outline-none focus:border-blue"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="username"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="my-[15px] mb-[5px] w-full relative">
                        <input
                            className="w-full min-w-[350px] p-[15px] rounded-[15px] border-2 border-grey transition-colors duration-300 text-[18px] box-border focus:outline-none focus:border-blue"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="my-[15px] mb-[5px] w-full relative">
                        <input
                            className="w-full min-w-[350px] p-[15px] rounded-[15px] border-2 border-grey transition-colors duration-300 text-[18px] box-border focus:outline-none focus:border-blue"
                            type={showPassword ? 'text' : 'password'}
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            placeholder="confirm password"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="text-right mt-[15px]">
                        <Link className="text-blue [text-decoration:none] text-[16px]" to="/login">already have an account?</Link>
                    </div>

                    <button
                        className="self-end rounded-[15px] border border-solid transition-all duration-300 text-black shadow-[0_2px_5px_rgba(0,0,0,0.1)] px-[15px] py-2 text-[16px] mt-[10px] hover:-translate-y-[1px] hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "(⊙_⊙)" : "(ᴗ_ ᴗ。)"}
                    </button>
                </div>

                <button
                    className="w-full p-[15px] rounded-[15px] bg-blue border border-solid transition-all duration-300 text-white font-bold shadow-[0_2px_5px_rgba(0,0,0,0.1)] mt-[15px] text-[18px] hover:-translate-y-[1px] hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
                    type="submit"
                >
                    register
                </button>
            </form>
        </div>
    );
};

export default Registration;
