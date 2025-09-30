// src/appwrite/service.js

import Conf from "../Conf/Conf";
import { Client, ID, Query, Databases, Storage, Permission, Role } from 'appwrite';

class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(Conf.appwriteUrl)
      .setProject(Conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

 

  // ✅ createPost: matched Appwrite field names
  async createPost({ title, slug, content, status, userId, featuredImage }) {
    try {
      const permissions = [
        Permission.read(Role.any()),               // public read
        Permission.write(Role.user(userId)),       // creator can write (update/delete)
      ];

      const response = await this.databases.createDocument(
        Conf.appwriteDatabseId,
        Conf.appwriteCollectionId,
        slug,
        {
          title,
          Content: content,               // ✅ "Content" field in Appwrite
          status,
          userid:userId,
          featuredImage // ✅ featuredImage field in Appwrite
        },
        permissions
      );
      console.log("createPost response:", response);
      return response;
    } catch (error) {
      console.error("createPost error:", error);
      return null;
    }
  }

  // ✅ updatePost: matched Appwrite field names
  async updatePost(slug, { title,content, status, featuredImage }) {
    try {
      const response = await this.databases.updateDocument(
        Conf.appwriteDatabseId,
        Conf.appwriteCollectionId,
        slug,
        {
          title,
          Content: content,               // ✅ "Content"
          status,
          featuredImage: featuredImage // ✅ featuredImage
        }
      );
      console.log("updatePost response:", response);
      return response;
    } catch (error) {
      console.error("updatePost error:", error);
      return null;
    }
  }

      async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                Conf.appwriteDatabseId,
                Conf.appwriteCollectionId,
                slug,
            )
            return true

        } catch (error) {
            console.log("Appwrite service::Deletepost::error", error)
            return false
        }
    }

   async getPost(slug) {
        try {
            return await this.databases.getDocument(//getDocument change to listDocuments
                Conf.appwriteDatabseId,
                Conf.appwriteCollectionId,
                slug//in case of error replace with documentId
            )
        } catch (error) {
            console.log("Appwrite service::Getepost::error", error)
            return false
        }
    }


  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      const resp = await this.databases.listDocuments(
        Conf.appwriteDatabseId,
        Conf.appwriteCollectionId,
        queries,
      );
      console.log("getPosts response:", resp);
      return resp;
    } catch (error) {
      console.error("getPosts error:", error);
      return null;
    }
  }


  //FILE UPLOAD SERVICE

    async uploadFile (file) {
        try {
            return await this.bucket.createFile(
            Conf.appwriteBucketId,
            ID.unique(),
            file
            )
        } catch (error) {
            console.log("Appwrite service::uploadFile::error",error)
            return false
        }
    }
    async deleteFile (fileId) {
        try {
            await this.bucket.deleteFile(
            Conf.appwriteBucketId,
            fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite service::deleteFile::error",error)
            return false
        }
    }
  //    async uploadFile(file) {
  //   try {
  //     const response = await this.bucket.createFile(
  //       Conf.appwriteBucketId,
  //       ID.unique(),
  //       file
  //     );
  //     console.log("uploadFile response:", response);
  //     return response;
  //   } catch (error) {
  //     console.error("uploadFile error:", error);
  //     return null;
  //   }
  // }

  // async deleteFile(fileId) {
  //   try {
  //     await this.bucket.deleteFile(Conf.appwriteBucketId, fileId);
  //     console.log("deleteFile success:", fileId);
  //   } catch (error) {
  //     console.error("deleteFile error:", error);
  //   }
  // }

    getFilePreview(fileId){
        return this.bucket.getFileView(
            Conf.appwriteBucketId,
            fileId,
        )
    }

    getFileView(fileId){
      return this.bucket.getFileView(
        Conf.appwriteBucketId,
        fileId,
      )
    }
    
}

const service = new Service();
export default service;