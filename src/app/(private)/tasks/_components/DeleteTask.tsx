'use client'

import React from 'react'
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { SetLoading } from '@/redux/loaderSlice';
import { useDispatch } from 'react-redux'
import axios from 'axios';

function DeleteTaskBtn({ taskid }: { taskid: string }) {
    const dispatch = useDispatch();
    const router = useRouter();

    const onDelete = async () => {
        try {
            dispatch(SetLoading(true));
            await axios.delete(`/api/tasks/${taskid}`);
            toast.success("Task deleted successfully");
            // clear the router cache
            router.refresh();
            router.push("/tasks");
        } catch (error: any) {
            toast.error(error.message || error.response.data.message);

        } finally {
            dispatch(SetLoading(false));
        }
    };

    return (
        <button className='btn-outlined'
            onClick={onDelete}
        >Delete</button>
    )
}

export default DeleteTaskBtn
