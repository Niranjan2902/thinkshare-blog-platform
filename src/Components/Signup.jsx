import React from "react";
import authService from "../appwrite/auth";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import{Button,Input,Logo} from './index'
import { useForm } from "react-hook-form";
import { login } from "../Storage/authSlice";
import { useDispatch } from "react-redux";

function Signup() {
    const navigate=useNavigate()
    const [error,setError]=useState("")
    const dispatch=useDispatch()
    const {register,handleSubmit}=useForm()

    const create=async (data)=>{
        setError("")
        try {
            const userData=await authService.createAccount(data)
            if(userData){
                const userData=await authService.getCurrentUser();

                if (userData) {
                    dispatch(login(userData));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return(
        <div className="flex item-center justify-center w-full">
                    <div className={`mx-auto w-full max-w-lg bg-gray-300
                        rounded-xl p-10 border border-black/10`}>
                            <div className="mb-2 flex justify-center">
                                <span className="inline-block w-full max-w-[100px]">
                                    <Logo width='100%'/>
                                </span>
                            </div>
                            <h2 className="text-center text-2xl font-bold
                                leading-tight">Sign up to create account</h2>
                                    <p className="mt-2 text-center text-base text-black/60">
                                        Already have any account?&nbsp;
                                        <Link className="font-medium text-primary transition-all
                                        duration-200 hover:underline"
                                        to='/login'>
                                        Sign in</Link>
                                    </p>
                                {error && <p className="text-red-600 mt-8 text-center">
                                {error}</p>}
                            <form onSubmit={handleSubmit(create)}>
                                <div className="space-y-5">
                                    <Input type="text" 
                                    label="Full Name:"
                                    placeholder="Enter Your full name"
                                        {...register("name",{
                                            required:true,
                                        })}/>
                                    <Input
                                    label="Email:"
                                    placeholder="Enter your email"
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Please enter a valid email address",
                                        },
                                    })}
                                    />

                                        <Input label='Password'
                                        type='password'
                                        placeholder='Create password'
                                        {...register('password',{
                                            required:true
                                        })} />
                                        <Button type="submit hover:bg-cyan-700"
                                        className="w-full">
                                            Create Account
                                        </Button>
                                </div>
                            </form>
                    </div>
        </div>
    )
    
}

export default Signup