import { SignIn } from "@clerk/clerk-react";

const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-black">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-secondary/20 rounded-full blur-[100px]"></div>
            </div>

            <div className="z-10">
                <SignIn
                    appearance={{
                        elements: {
                            rootBox: "mx-auto",
                            card: "glass-card border-none shadow-2xl",
                        }
                    }}
                    redirectUrl="/"
                    signUpUrl="/signup"
                />
            </div>
        </div>
    );
};

export default Login;
