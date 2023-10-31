// import { cookies } from 'next/headers';
// import axios from 'axios';

// export async function getData() {
//   try {

//     const cookiesStore = cookies();
//     const token = cookiesStore.get('token')?.value;
//     const endPoint = `${process.env.domain}/api/users/currentuser`;
//     const response = await axios.get(endPoint, {
//       headers: {
//         Cookie: `token=${token}`
//       }
//     });
//     return response.data.data;
//   } catch (error: any) {

//     console.log("Error :", new Error);
//     throw new Error(error.message);
//   }
// };


export default async function Home() {
  // const user: any = await getData();
  return (
    <div>
      <h1>Homepage</h1>
      {/* {user && (
        <div>
          <h1>Username : {user.username}</h1>
          <h1>Email : {user.email}</h1>
        </div>
      )} */}
    </div>
  )
}
