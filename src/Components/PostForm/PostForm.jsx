import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from '../index';
import appwriteService from '../../appwrite/config';  // for createPost, uploadFile etc
import authService from '../../appwrite/auth';         // correct auth service with getCurrentUser
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../Storage/authSlice";

export default function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || "active",
    }
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  // On mount, fetch userData if not present
  useEffect(() => {
    if (!userData) {
      authService.getCurrentUser().then(user => {
        console.log("PostForm: getCurrentUser result:", user);
        if (user) {
          dispatch(login({ userData: user }));
        } else {
          dispatch(logout());
        }
      }).catch(err => {
        console.error("Error in getCurrentUser in PostForm:", err);
      });
    }
  }, [userData, dispatch]);

  // Debug logs
  console.log("PostForm userData:", userData);
  console.log("IDs:", userData?._id, userData?.$id, userData?.id);

  const slugTransform = useCallback((value) => {
    if (typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]+/g, "-")
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
    }
    return '';
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        const newSlug = slugTransform(value.title || "");
        setValue("slug", newSlug, { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const submit = async (data) => {
    try {
      const userId = userData?._id || userData?.$id || userData?.id;
      console.log("submit userId:", userId, "userData:", userData);

      if (!userId) {
        console.error("User data not available; cannot proceed", userData);
        return;
      }

      let fileId = null;
      if (data.image && data.image.length > 0) {
        const uploadResp = await appwriteService.uploadFile(data.image[0]);
        console.log("uploadResp:", uploadResp);
        if (!uploadResp || !(uploadResp.$id || uploadResp._id)) {
          console.error("Image upload failed:", uploadResp);
          return;
        }
        fileId = uploadResp.$id || uploadResp._id;
      }

      const payload = {
        title: data.title,
        slug: data.slug,
        content: data.content,
        status: data.status,
        userId,
        featuredImage: fileId
      };

      console.log("Payload for post:", payload);

      let result;
      if (post) {
        result = await appwriteService.updatePost(post.$id, payload);
      } else {
        result = await appwriteService.createPost(payload);
      }

      console.log("Result from create/update:", result);

      if (!result || !(result.$id || result._id)) {
        console.error("Post creation/update failed:", result);
        return;
      }

      const newId = result.$id || result._id;
      navigate(`/post/${newId}`);
    } catch (error) {
      console.error("Error in submit:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      {/* form fields */}
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: "Slug is required" })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
          }
        />
        {errors.slug && <p className="text-red-500">{errors.slug.message}</p>}

        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}

        {post?.featuredImage && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title || 'Featured Image'}
              className="rounded-lg"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: "Status is required" })}
        />
        {errors.status && <p className="text-red-500">{errors.status.message}</p>}

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}