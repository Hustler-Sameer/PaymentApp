"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransaction( amount:number,provider:string) {
    //extract user id from next ATUH
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    //whenever we send a user to external bank server we already inform the bank that we are sending a user ,
    //hence to identify that user bank gives us the token to send with the user 
    const token = Math.random().toString();
    if(!userId){
        return {
            message:"user not logged in"
        }
    }
    const res = await prisma.onRampTransaction.create({
        data:{
            userId:Number(userId),
            amount:amount*100,
            status:"Processing",
            startTime: new Date(),
            provider,
            token
    }
});

    return {
        message:"On ramp transaction added"
    }

}