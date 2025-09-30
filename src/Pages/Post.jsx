import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../Components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    useEffect(() => {
    console.log("Post userId:", post?.userid);
    console.log("Logged in user id:", userData?.$id);
    console.log("isAuthor:", post?.userid === userData?.$id);
  }, [post, userData]);
    const isAuthor = post && userData ? post.userid === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    console.log("Fetched post:", post); //For debugging:TO check post object
                    setPost(post);
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 bg-white mx-40">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl">
                    {post.featuredImage ? (
                        <img
                            src={String(appwriteService.getFilePreview(post.featuredImage))}
                            alt={post.title}
                            className="rounded-xl w-screen w-md"
                        />
                    ) : (
                        <img
                            src="/default.jpg"
                            alt="No image available"
                            className="rounded-xl"
                        />
                    )}

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>

                <div className="browser-css">
                    {typeof post.Content === "string" ? (
                        parse(post.Content)
                    ) : (
                        <p className="text-gray-500">No content available</p>
                    )}
                </div>
            </Container>
        </div>
    ) : null;
}