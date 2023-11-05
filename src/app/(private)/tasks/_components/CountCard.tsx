import Link from 'next/link'
import React from 'react'

function CountCard({ title, count, path, queryParams }:
    { title: string, count: number, path: string, queryParams: any }) {
    return (
        <Link
            href={{
                pathname: path,
                query: queryParams,
            }}
        >
            <div className='flex flex-col gap-5 border border-gray-300 p-5 rounded-lg items-center justify-center'>
                <h1 className='text-xl font-semibold text-gray-600 '>{title}</h1>
                <h1 className='text-7xl font-semibold text-gray-600'>{count}</h1>

            </div>
        </Link>
    )
}

export default CountCard
