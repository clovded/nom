import useSettings from '../features/auth/hooks/useSettings';

const SettingsPage = () => {
    const {
        currentUser,
        currentPassword, setCurrentPassword,
        newUsername, setNewUsername,
        newPassword, setNewPassword,
        newPasswordConfirm, setNewPasswordConfirm,
        error,
        success,
        isLoading,
        handleSubmit
    } = useSettings();

    return (
        <div className="min-h-[calc(100vh-70px)] flex items-center justify-center">
            <div className="bg-clay rounded-2xl p-10 w-full max-w-[420px] shadow-card">
                <h2 className="font-lobster text-[42px] text-coffee text-center mb-8 mt-0">settings</h2>

                {error && (
                    <div className="bg-[#fce4e4] text-[#c0392b] p-3 rounded-xl text-[14px] text-center mb-4">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="bg-[#e4f5e4] text-[#27ae60] p-3 rounded-xl text-[14px] text-center mb-4">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <label className="text-[12px] font-bold uppercase tracking-wide text-dark-grey">new username <span className="font-normal normal-case">(optional)</span></label>
                        <input
                            type="text"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            placeholder={currentUser?.username}
                            disabled={isLoading}
                            className="w-full p-4 rounded-xl border-2 border-beige-light bg-cream text-black text-[16px] focus:outline-none focus:border-coffee transition-colors disabled:opacity-50"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-[12px] font-bold uppercase tracking-wide text-dark-grey">new password <span className="font-normal normal-case">(optional)</span></label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="min. 8 characters"
                            disabled={isLoading}
                            className="w-full p-4 rounded-xl border-2 border-beige-light bg-cream text-black text-[16px] focus:outline-none focus:border-coffee transition-colors disabled:opacity-50"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-[12px] font-bold uppercase tracking-wide text-dark-grey">confirm new password</label>
                        <input
                            type="password"
                            value={newPasswordConfirm}
                            onChange={(e) => setNewPasswordConfirm(e.target.value)}
                            placeholder="repeat new password"
                            disabled={isLoading}
                            className="w-full p-4 rounded-xl border-2 border-beige-light bg-cream text-black text-[16px] focus:outline-none focus:border-coffee transition-colors disabled:opacity-50"
                        />
                    </div>

                    <div className="border-t border-beige pt-5 flex flex-col gap-1">
                        <label className="text-[12px] font-bold uppercase tracking-wide text-dark-grey">current password <span className="font-normal normal-case text-[#c0392b]">(required)</span></label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="confirm your identity"
                            disabled={isLoading}
                            className="w-full p-4 rounded-xl border-2 border-beige-light bg-cream text-black text-[16px] focus:outline-none focus:border-coffee transition-colors disabled:opacity-50"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full p-4 rounded-xl bg-coffee text-clay font-bold text-[16px] uppercase tracking-wide transition-all duration-200 hover:-translate-y-[2px] hover:shadow-hover disabled:opacity-50 disabled:translate-y-0 mt-2"
                    >
                        {isLoading ? 'saving...' : 'save changes'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SettingsPage;
