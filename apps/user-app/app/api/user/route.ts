
import db from "@repo/db/client";
import { NextResponse } from "next/server";

// export const GET = async () => {
//     await client.user.create({
//         data: {
//             email: "asd",
//             name: "adsads"
//         }
//     })
//     return NextResponse.json({
//         message: "hi there"
//     })
// }

export const GET= async()=>{
    const response=await db.user.create({
        data:{
            name:"Dwaip",
            number:"123456",
            password:"password",
            email:"hini@hihi.com"
        }
    })
    return NextResponse.json(response)
}
// import { getServerSession } from "next-auth"
// import { authOptions } from "../../lib/auth";
// import { NextResponse } from "next/server"
// export const GET = async () => {
//     const session = await getServerSession(authOptions);
//     if (session?.user) {
//         return NextResponse.json({
//             user: session.user
//         })
//     }
//     return  NextResponse.json({
//         message: "You are not logged in!!!"
//     }, {
//         status: 403
//     })

// }