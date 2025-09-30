import appwriteService from '../appwrite/config'
import { Container,PostCard } from "../Components";
import { useState,useEffect } from "react";
function AllPost() {
    const[posts,setPosts]=useState([])
//     useEffect(() => {}, []);
// appwriteService.getPosts([]).then((posts) => { ... });  //ORIGINAL CODE

    useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents);//IN FUTURE MAY REPLACE .rows

          //BY USING BELOW CODE WE CAN MAKE USER TO SEE ONLY WHAT DID HE POSTED UNTIL NOW  
            // setPosts(posts.documents.filter((post) => {
            // if (post.userId === userData.$id) {
            //   return post;
            // }
        }
    });
}, []);
useEffect(()=>{ },[])
    appwriteService.getPosts([]).then((posts)=>{
        if(posts){
            setPosts(posts.documents)
        }
    })
    return(
        <div className="w-full py-8">
         <Container>
           <div className="flex flex-wrap">
            {posts.map((post)=>(
                <div key={post.$id}className="p-2 w-1/4">
                     <PostCard {...post}/>  
                </div>
            ))}
           </div>
        </Container>   
        </div>
    )
}

export default AllPost