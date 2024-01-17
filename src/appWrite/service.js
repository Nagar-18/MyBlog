import { Client, Account, ID } from "appwrite";
import secret from "../config/config";

class AuthService {
  client = new Client();

  account;

  constructor() {
    console.log(secret.appwriteUrl);
    this.client.setEndpoint(secret.appwriteUrl);
    this.client.setProject(secret.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, name, password }) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      // call login
      if (user) return this.login({ email, password });
      return user;
    } catch (error) {
      console.log("config:service:createaccount", error);
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("config:service:getUser", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log("config:service:login", error);
    }
    return null;
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("config:service:logout", error);
    }
  }
}

const authService = new AuthService();
export default authService;
