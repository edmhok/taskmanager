'use client'
import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SetCurrentUser } from '@/redux/usersSlice';
import Spinner from './Spinner';
import { SetLoading } from '@/redux/loaderSlice';

function LayoutProvider({ children }: { children: React.ReactNode }) {
    const { currentUser } = useSelector((state: any) => state.users);
    const pathname = usePathname();
    const router = useRouter();
    const isPublicRoute = pathname === "/login" || pathname === "/register";
    const dispatch = useDispatch();
    const { loading } = useSelector((state: any) => state.loaders);

    const getData = async () => {
        try {
            dispatch(SetLoading(true));
            const response = await axios.get("/api/users/currentuser");
            dispatch(SetCurrentUser(response.data.data));
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            dispatch(SetLoading(false));
        }
    };

    const onLogout = async () => {
        try {
            dispatch(SetLoading(true));
            await axios.post('/api/users/logout');
            dispatch(SetCurrentUser(null));
            router.push("/login");
            toast.success("Logout Successful")
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            dispatch(SetLoading(false));
        }
    }

    useEffect(() => {
        if (!isPublicRoute) {
            getData();
        }
    }, [pathname]);

    return (
        <html lang="en">
            <head>
                <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet"></link>
            </head>
            <body>
                {loading && <Spinner />}
                <Toaster position="top-center" reverseOrder={false} />

                {!isPublicRoute ? (
                    <div>
                        <div className="mx-10 bg-primary text-white p-5 flex justify-between items-center rounded-b">
                            <h1 className='text-2xl font-bold'>Next - TM</h1>
                            <div className="flex gap-2">
                                <h1 className="underline cursor-pointer ">
                                    {currentUser?.username}
                                </h1>
                                <i className="ri-logout-box-r-line cursor-pointer"
                                    onClick={onLogout}></i>
                            </div>
                        </div>
                        <div className="h-[85vh] mx-10 mt-5 p-2">
                            {children}
                        </div>
                    </div>
                ) : (
                    <div>{children}</div>
                )}

            </body>
        </html>
    )
}

export default LayoutProvider;
