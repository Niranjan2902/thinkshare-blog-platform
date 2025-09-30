import React, { useState,useEffect } from "react";
import appwriteService from '../appwrite/config';
import {Container,PostCard} from '../Components/index';

function Home() {
    const[posts,setPosts]=useState([]);
    console.log("home:Posts State:",posts)
    useEffect(()=>{
            appwriteService.getPosts().then((posts)=>{
                if(posts){
                    setPosts(posts.documents) // may replace .rows
                }
            })
    },[])
    
    if(posts.length===0){
        return (
            <div className="w-full py-38 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="w-full">
                            <h1 className="md:text-4xl font-bold text-gray-900">
                                Welcome to ThinkShare
                            </h1>
                            <p className="mt-6 text-lg text-gray-700 hover:text-gray-900">
                                Login to create and read new posts. <br />
                                Share your ideas, opinions, and stories with
                                the world.
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return(
        <div className="py-8 w-full" >
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post)=>(
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )

}

export default Home