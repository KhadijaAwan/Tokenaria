"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTokenRefreshTimer } from "../lib/logics";
import { useEffect, useRef } from "react";

const Header = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const hasInitialized = useRef(false);
    console.log({ session });

    useEffect(() => {
        if (!hasInitialized.current && session) {
            startTokenRefreshTimer();
            localStorage.setItem("authToken", session?.user.access_token);
            localStorage.setItem("refreshToken", session?.user.refresh_token);
            hasInitialized.current = true;
        }
    }, [session]);

    useEffect(() => {
        if (!session) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("refreshToken");
        }
    }, [session]);

    return (
        <div className="bg-purple-800 px-5 md:px-10 py-[1.5] flex justify-between items-center h-[43px] text-white">
            <Link href={"/"}>Home</Link>
            <div className="flex items-center w-[65%] lg:w-[40%] justify-end">
                {session?.user ? (
                    <>
                        <p className="text-gray-200 mr-4 text-sm"> {session.user.user.username}</p>
                        <button className="bg-red-500 text-white text-sm px-4 py-1 rounded-md" onClick={() => signOut()}>
                            Sign Out
                        </button>
                    </>
                ) : (
                    <button className="bg-green-600 text-white text-sm px-4 py-1 rounded-md" onClick={() => { signIn(); router.refresh(); }}>
                        Sign In
                    </button>
                )}
            </div>
        </div>
    );
};

export default Header;
