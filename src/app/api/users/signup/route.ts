import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';


connect()

interface reqBody{
    username: string;
    email: string;
    password: string;
}

export async function POST(request: NextRequest){

    try{
        const reqBody = request.json();
        const { username, email, password } = reqBody // reqBody has the value of usernam, pass, email , so I need to extract it from the reqBody
        console.log(reqBody);
    
    }catch(error: any){
        return NextResponse.json(
            {error: error.message}, 
            { status: 500 }
            
            );
    }
}