import { Client, Databases, ID, Query, Storage } from "appwrite";
import secret from "../config/config";
class Service {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client.setEndpoint(secret.appwriteUrl);
    this.client.setProject(secret.appwriteProjectId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    console.log("reques");
    try {
      return await this.database.createDocument(
        secret.appwriteDatabaseId,
        secret.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("createPost", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.database.updateDocument(
        secret.appwriteDatabaseId,
        secret.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("updatePost", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.database.deleteDocument(
        secret.appwriteDatabaseId,
        secret.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("deletePost", error);
    }
  }

  async getPost(slug) {
    try {
      return await this.database.getDocument(
        secret.appwriteDatabaseId,
        secret.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("getPost");
    }
    return false;
  }

  async getPosts() {
    try {
      return await this.database.listDocuments(
        secret.appwriteDatabaseId,
        secret.appwriteCollectionId,
        [Query.equal("status", "active")]
      );
    } catch (error) {
      console.log("getPost", error);
    }
  }

  //file upload

  async uploadFile(file) {
    try {
      // console.log(file);

      return await this.bucket.createFile(
        secret.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(secret.appwriteBucketId, fileId);
    } catch (error) {
      console.log("delete file", error);
    }
  }
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(secret.appwriteBucketId, fileId);
  }
}
const service = new Service();
export default service;
