
//to make it Server Component
// export const dynamic = 'force-dynamic'
// export const revalidate = 0
import React from 'react';
import Link from 'next/link';
import { cookies } from "next/headers";
import { taskInterface } from '@/interfaces';
import DeleteTaskBtn from './_components/DeleteTask';

export async function getTasks() {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("token")?.value;
        const endPoint = `${process.env.domain}/api/tasks`;
        const response = await fetch(endPoint, {
            cache: "no-cache",
            headers: {
                Cookie: `token=${token}`
            },
        });
        const { data } = await response.json();
        return data;
    } catch (error) {
        return [];
    }
}



async function Tasks() {
    const tasks = await getTasks();

    const getProperty = (key: string, value: any) => (
        <div className="flex flex-col">
            <span className="text-gray-700 font-semi-bold">{key}</span>
            <span className="text-gray-600 uppercase">{value}</span>
        </div>
    );
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Tasks</h1>
                <button className="btn-primary">
                    <Link href="/tasks/addTask">New Task</Link>
                </button>
            </div>

            <div className="flex flex-col gap-5 mt-5">
                {tasks.map((task: taskInterface) => (
                    <div
                        key={task._id}
                        className="p-5 border border-gray-200 rounded flex flex-col gap-2"
                    >
                        <h1 className='text-xl text-gray-700'>{task.title}</h1>
                        <p className='text-gray-500 text-sm'>{task.description}</p>
                        {/* <div className="flex gap-5">
                            <span className='text-gray-700 font-semibold'>Status</span>
                            <span className='text-gray-600 uppercase'>{task.status}</span>
                        </div>
                        <div className="flex gap-5">
                            <span className='text-gray-700 font-semibold'>Category</span>
                            <span className='text-gray-600 uppercase'>{task.category}</span>
                        </div>
                        <div className="flex gap-5">
                            <span className='text-gray-700 font-semibold'>Start Date</span>
                            <span className='text-gray-600 uppercase'>
                                {new Date(task.dateToStart).toLocaleDateString()}</span>
                        </div>
                        <div className="flex gap-5">
                            <span className='text-gray-700 font-semibold'>Finish Date</span>
                            <span className='text-gray-600 uppercase'>
                                {new Date(task.dateToFinish).toLocaleDateString()}</span>
                        </div> */}
                        <hr />
                        <div className="grid grid-cols-3 gap-5">
                            {getProperty("Status", task.status)}
                            {getProperty("Category", task.category)}
                            {getProperty("Date to Start", new Date(task.dateToStart).toLocaleDateString('en'))}
                            {getProperty("Date to Finish", new Date(task.dateToFinish).toLocaleDateString('en'))}
                            {getProperty("Reference", task.reference)}
                            {getProperty("Priority", task.priority)}

                            {getProperty(
                                "Created at",
                                new Date(task.createdAt || '').toLocaleDateString()
                            )}
                            {getProperty(
                                "Updated at",
                                new Date(task.updatedAt || '').toLocaleDateString()
                            )}
                        </div>

                        <div className="flex justify-end gap-5">
                            <DeleteTaskBtn taskid={task._id || ""} />
                            <button className="btn-primary">
                                <Link href={`/tasks/editTask?taskid=${task._id}`}>Edit</Link>
                            </button>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Tasks;





//Previous Test
// 'use client'
// import { useRouter } from 'next/navigation'
// import React from 'react'

// function Tasks() {
//     const router = useRouter();
//     return (
//         <div>
//             <div className="flex justify-between items-center">
//                 <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Tasks</h1>
//                 <button
//                     className="btn-primary"
//                     onClick={() => router.push("/tasks/addTask")}
//                 >Add Task
//                 </button>
//             </div>
//         </div>
//     )
// }
