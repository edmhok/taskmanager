import React from 'react';
import Link from 'next/link';
import { cookies } from "next/headers";
import CountCard from './tasks/_components/CountCard';

export async function getDashboardData() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const endPoint = `${process.env.domain}/api/dashboard`;
    const response = await fetch(endPoint, {
      cache: "no-cache",
      headers: {
        Cookie: `token=${token}`
      },
    });
    const { data } = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const dashboardData = await getDashboardData();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-600">
        Welcome To Next- Task Manager
      </h1>

      <div className="grid grid-cols-4 mt-5 gap-10">
        <CountCard
          title="Total Tasks"
          count={dashboardData.totalTasks}
          path="/tasks"
          queryParams={{
            status: "",
          }}
        />

        <CountCard
          title="Open Tasks"
          count={dashboardData.openTasks}
          path="/tasks"
          queryParams={{
            status: "open",
          }}
        />

        <CountCard
          title="Completed Tasks"
          count={dashboardData.completedTasks}
          path="/tasks"
          queryParams={{
            status: "completed",
          }}
        />

        <CountCard
          title="In Progress Tasks"
          count={dashboardData.inProgressTasks}
          path="/tasks"
          queryParams={{
            status: "inprogress",
          }}
        />

        <CountCard
          title="High Priority Tasks"
          count={dashboardData.highPriorityTasks}
          path="/tasks"
          queryParams={{
            status: "high",
          }}
        />

        <CountCard
          title="Medium Priority Tasks"
          count={dashboardData.highPriorityTasks}
          path="/tasks"
          queryParams={{
            status: "medium",
          }}
        />

        <CountCard
          title="Low Priority Tasks"
          count={dashboardData.lowPriorityTasks}
          path="/tasks"
          queryParams={{
            status: "low",
          }}
        />
      </div>

    </div>
  )
}
