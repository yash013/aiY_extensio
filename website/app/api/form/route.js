import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET(request, context) {
    try {
        const contacts = await prisma.contact.findMany()
        return NextResponse.json(contacts, { status: 200 })
    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const res = await request.json()
        const { email } = res;
        const contact = await prisma.contact.create({
            data: {
                email
            }
        })
        return NextResponse.json({ contact }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: error.message}, { status: 500 })
    }
}

// await prisma.contact.delete({
//     where: {
//         "id": "clktncgsg0000eqxgyqdu5d18",
//         email: 'champdecay@gmail.com',
//     },
// })

  // await prisma.contact.deleteMany({
    //     where: {
    //       email: {
    //         contains: 'gmail.com',
    //       },
    //     },
    //   })