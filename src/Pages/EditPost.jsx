import { useEffect,useState } from "react";
import {Container,PostForm} from '../Components/index';
import appwriteService from '../appwrite/config';
import { useParams,useNavigate} from "react-router-dom";

function EditPost() {
    const [post,setPost]=useState(null)
    const navigate=useNavigate()
    const {slug}=useParams()

    useEffect(()=>{
            if(slug){
                appwriteService.getPost(slug).then((post)=>{
                    if(post){   //If err change to param name as (slug)
                    setPost(post)
                    }
                })
                .catch((err)=>{
                    console.log(err)
                })
            } else{
                navigate('/')
            }
    },[slug,navigate])

    return post?(
        <div className="py-8">
            <Container>
                <PostForm post={post}></PostForm>
            </Container>
        </div>
    ):null
}

export default EditPost