'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import TaskForm from '@/components/TaskForm';
import { taskInterface } from '@/interfaces';
import { useSearchParams } from 'next/navigation';
import { SetLoading } from '@/redux/loaderSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import axios from 'axios';

function EditTask() {
    const searchParams = useSearchParams();
    const taskid = searchParams.get("taskid");
    const [task, setTask] = useState<taskInterface>({
        title: "",
        description: "",
        status: "open",
        category: "personal",
        priority: "low",
        dateToStart: "",
        dateToFinish: "",
        reference: "",
    });
    const router = useRouter();
    const dispatch = useDispatch();

    const onSave = async () => {
        try {
            dispatch(SetLoading(true));
            await axios.put(`/api/tasks/${taskid}`, task);
            toast.success("Task Updated successfully");
            //clear the router cache
            router.refresh();
            router.push("/tasks");
        } catch (error: any) {
            toast.error(error.message || error.message.data.message)
        } finally {
            dispatch(SetLoading(false));
        }
    }

    const getTasks = async () => {
        try {
            dispatch(SetLoading(true));
            const response = await axios.get(`/api/tasks/${taskid}`);
            setTask(response.data.data)
        } catch (error: any) {
            toast.error(error.response.data.message || error.message)
        } finally {
            dispatch(SetLoading(false));
        }
    }

    useEffect(() => {
        getTasks();
    }, [taskid])


    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Task</h1>
                <button
                    className="btn-outlined"
                    onClick={() => router.push("/tasks")}
                >Back
                </button>
            </div>
            <TaskForm task={task} setTask={setTask} onSave={onSave} />
        </div>
    )
}

export default EditTask


