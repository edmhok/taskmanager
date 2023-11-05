import React from 'react'
import { taskInterface } from '@/interfaces'
import { useRouter } from 'next/navigation'


function TaskForm({ task, setTask, onSave }: { task: taskInterface, setTask: any, onSave: any }) {
    const router = useRouter();
    const getIsSavedBtnDisabled = () => {
        return (
            task.title === "" ||
            task.description === "" ||
            task.dateToStart === "" ||
            task.dateToFinish === ""
        );
    }

    return (
        <div className='grid grid-cols-3 mt-3 gap-5'>
            <div className='col-span-3 flex flex-col mt-5'>
                <label htmlFor="title">Title</label>
                <input type="text"
                    value={task.title}
                    onChange={(e) => setTask({ ...task, title: e.target.value })}
                />
            </div>

            <div className="col-span-3 flex flex-col">
                <label htmlFor="reference">Reference</label>
                <input
                    type="text"
                    value={task.reference}
                    onChange={(e) => setTask({ ...task, reference: e.target.value })}
                />
            </div>

            <div className="col-span-3 flex flex-col">
                <label htmlFor="description">Description</label>
                <textarea
                    value={task.description}
                    onChange={(e) => setTask({ ...task, description: e.target.value })}
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor='status'>Status</label>
                <select value={task.status} onChange={(e) => setTask({ ...task, status: e.target.value })}>
                    <option value='open'>Open</option>
                    <option value='in-progress'>In-progress</option>
                    <option value='closed'>Closed</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label htmlFor='category'>Category</label>
                <select value={task.category} onChange={(e) => setTask({ ...task, category: e.target.value })}>
                    <option value='personal'>Personal</option>
                    <option value='work'>Work</option>
                    <option value='hobby'>Hobby</option>
                    <option value='others'>Others</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label htmlFor='priority'>Priority</label>
                <select value={task.priority} onChange={(e) => setTask({ ...task, priority: e.target.value })}>
                    <option value='low'>Low</option>
                    <option value='medium'>Medium</option>
                    <option value='high'>High</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label htmlFor='dateToStart'>Date to Start</label>
                <input type="date" value={task.dateToStart} onChange={(e) => setTask({ ...task, dateToStart: e.target.value })} />
            </div>

            <div className="flex flex-col">
                <label htmlFor='dateToFinish'>Date to Finish</label>
                <input type="date" value={task.dateToFinish} onChange={(e) => setTask({ ...task, dateToFinish: e.target.value })} />
            </div>

            <div className="col-span-3 flex justify-end gap-10">
                <button
                    className="btn-outlined"
                    onClick={() => { router.push("/tasks") }}
                >Cancel
                </button>
                <button
                    className={
                        getIsSavedBtnDisabled() ? "btn-disabled" : "btn-primary"
                    }
                    onClick={onSave}
                    disabled={getIsSavedBtnDisabled()}
                >Save
                </button>
            </div>
        </div>
    )
}

export default TaskForm
