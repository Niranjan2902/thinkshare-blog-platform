import conf from '../Conf/Conf'

import {Client,Account,ID} from 'appwrite';

export class Authservice{
    Client=new Client();
    account;

    constructor(){
        this.Client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account=new Account(this.Client)
    }

    async createAccount({email,password,name}) {
        // const name=this.name; //IF EVER ERROR APPERAPED REMOVE THIS LINE OF CODE AND INSTEAD "TRY TO" USE BELOW ONE
        // //const name = this.getName(); // Assuming there's a new method like `getName()` for fetching the user's name.
        try {
            const userAccount=await this.account.create(ID.unique(),email,password,name);// updated {and userId:}

            if (userAccount) {
                //Another method
                return this.login({email,password});

            } else {
                return userAccount
            }

        } catch (error) {
            throw error;
        }
    }
    async login (email,password) {
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            console.log("AppWrite Service :: login :: error", error)
        }
    }
    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("AppWrite Service :: logout :: error", error)
        }
    }

    async getCurrentUser(){
        try {
           return await this.account.get();
        } catch (error) {
        
            console.log("Appwrite service::getCurrentUser::error",error);
        }

        return null;
    }
}

const authService = new Authservice();

export default authService;

// const authService= new Authservice();

// export default authService;

// import conf from '../Conf/Conf'
// import { Client, Account, ID } from 'appwrite';

// export class Authservice {
//     Client = new Client();
//     account;

//     constructor() {
//         this.Client
//             .setEndpoint(conf.appwriteUrl)
//             .setProject(conf.appwriteProjectId);

//         this.account = new Account(this.Client);
//     }

//     async createAccount({ email, password, name }) {
//         try {
//             // Fix: ID.unique() is the first param, not inside object
//             const userAccount = await this.account.create(ID.unique(), email, password, name);

//             if (userAccount) {
//                 return this.login(email, password); // Fix: pass email, password correctly
//             } else {
//                 return userAccount;
//             }
//         } catch (error) {
//             throw error;
//         }
//     }

//     async login(email, password) {
//         try {
//             // Fix: method is createEmailSession(email, password) - no object param
//             return await this.account.createEmailSession(email, password);
//         } catch (error) {
//             console.log("AppWrite Service :: login :: error", error);
//         }
//     }

//     async logout() {
//         try {
//             // Fix: deleteSession('current') deletes current session, better than deleteSessions()
//             await this.account.deleteSession('current');
//         } catch (error) {
//             console.log("AppWrite Service :: logout :: error", error);
//         }
//     }

//     async getCurrentUser() {
//         try {
//             return await this.account.get();
//         } catch (error) {
//             console.log("Appwrite service::getCurrentUser::error", error);
//         }
//         return null;
//     }
// }

// authService.js

// import conf from '../Conf/Conf';
// import { Client, Account, ID } from 'appwrite';

// class Authservice {
//   client = new Client();
//   account;

//   constructor() {
//     this.client
//       .setEndpoint(conf.appwriteUrl)
//       .setProject(conf.appwriteProjectId);
//     this.account = new Account(this.client);
//   }

//   async createAccount({ email, password, name }) {
//     try {
//       const userAccount = await this.account.create(ID.unique(), email, password, name);
//       console.log("createAccount:", userAccount);
//       // login after signup
//       return this.login({ email, password });
//     } catch (err) {
//       console.error("createAccount error:", err);
//       throw err;
//     }
//   }

//   async login({ email, password }) {
//     try {
//       const session = await this.account.createEmailPasswordSession(email, password);
//       console.log("login:", session);
//       return session;
//     } catch (err) {
//       console.error("login error:", err);
//       return null;
//     }
//   }

//   async logout() {
//     try {
//       await this.account.deleteSession('current');
//       console.log("logout success");
//     } catch (err) {
//       console.error("logout error:", err);
//     }
//   }

//   async getCurrentUser() {
//     try {
//       console.log("Authservice.getCurrentUser called");
//       const user = await this.account.get();
//       console.log("Authservice.getCurrentUser result:", user);
//       return user;
//     } catch (err) {
//       console.error("Authservice.getCurrentUser error:", err);
//       return null;
//     }
//   }
// }

// const authService = new Authservice();
// export default authService;
