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
    
        //check if the user is already exist 
        const user = await User.findOne({email});

        if(user){
            return NextResponse.json(
                { error: "user is already exist" }, 
                { status: 400}
            )
        }

        //hash the password 
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)
        //this password is coming from the reqBody which has()username, email, password

        //creating new user to store in the database
        const newUser = new User({ 
                            username, 
                            email, 
                            password: hashedPassword //this is not the password we got from reqBody 
                            }); //then save this new user in to the database 
        const savedUser = newUser.save();
        console.log(savedUser);

        return NextResponse.json({
             message: "New user created successfully" , 
             success: true, 
             savedUser
            }); 

    }catch(error: any){
        return NextResponse.json(
            {error: error.message}, 
            { status: 500 });
    }
}