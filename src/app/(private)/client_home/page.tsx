'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ClientHome() {
    const [user, setUser] = useState<any>(null);
    const getData = async () => {
        try {
            const response = await axios.get("/api/users/currentuser");
            setUser(response.data.data);
        } catch (error: any) {
            console.log(error.message);
        }
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <h1>Homepage with client side rendering</h1>
            {user && (
                <div>
                    <h1>Username : {user.username}</h1>
                    <h1>Email : {user.email}</h1>
                </div>
            )}
        </div>
    );
}

export default ClientHome;
