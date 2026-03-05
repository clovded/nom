import { Link } from "react-router-dom";
import useLogin from "./hooks/useLogin";

const Login = () => {
    const { formData, error, loading, showPassword, setShowPassword, handleChange, handleSubmit } = useLogin();

    return (
        <div className="flex flex-col justify-center items-center m-0">
            <h2 className="text-center mb-5 font-lobster text-black text-[48px]">login</h2>
            {error && <div className="text-[palevioletred] text-center text-[16px]">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center w-full max-w-[500px] relative">
                    <div className="my-[15px] w-full relative">
                        <input
                            name="identity"
                            className="w-full min-w-[350px] p-[15px] rounded-[15px] border-2 border-grey transition-colors duration-300 text-[18px] box-border focus:outline-none focus:border-blue"
                            type="text"
                            value={formData.identity}
                            onChange={handleChange}
                            autoFocus
                            placeholder="username"
                            disabled={loading}
                        />
                    </div>

                    <div className="my-[15px] mb-[5px] w-full relative">
                        <input
                            name="password"
                            className="w-full min-w-[350px] p-[15px] rounded-[15px] border-2 border-grey transition-colors duration-300 text-[18px] box-border focus:outline-none focus:border-blue"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="password"
                            disabled={loading}
                        />
                        <button
                            type="button"
                            className="self-end rounded-[15px] border border-solid transition-all duration-300 text-black shadow-[0_2px_5px_rgba(0,0,0,0.1)] px-[15px] py-2 text-[16px] mt-[10px] hover:-translate-y-[1px] hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
                            onClick={() => setShowPassword(prev => !prev)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? "(⊙_⊙)" : "(ᴗ_ ᴗ。)"}
                        </button>
                    </div>
                </div>

                <div className="text-right mt-[15px]">
                    <Link className="text-blue [text-decoration:none] text-[16px]" to="/forgot-password">forgot password?</Link>
                </div>

                <div className="text-right mt-[15px]">
                    <Link className="text-blue [text-decoration:none] text-[16px]" to="/register">no account yet?</Link>
                </div>

                <button
                    className="w-full p-[15px] rounded-[15px] bg-blue border border-solid transition-all duration-300 text-white font-bold shadow-[0_2px_5px_rgba(0,0,0,0.1)] mt-[15px] text-[18px] hover:-translate-y-[1px] hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "logging in..." : "login"}
                </button>
            </form>
        </div>
    );
};

export default Login;
