import { INewPost, INewUser } from "@/types";
import { ID, Query } from "appwrite";
import { acount, avatars, databases, appwriteConfig, storage } from './config';

export const createUserAccount = async (user: INewUser) => {
  try {
    const newAccount = await acount.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const saveUserToDB = async (user: {
  accountId: string,
  email: string,
  name: string,
  imageUrl: URL,
  username: string
}) => {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );

    if(!newUser) throw Error;

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const signInAccount = async (user: { email: string, password: string }) => {
  try {
    const session = await acount.createEmailSession(user.email, user.password);

    return session;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await acount.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );
    
    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}

export const signOutAccount = async () => {
  try {
    const session = await acount.deleteSession('current');
    return session;
  } catch (error) {
    console.log(error);
  }
}

export const uploadFile = async (file: File) => {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );
    
    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
};

export const getFilePreview = async (fileId: string) => {
  try {
    const fileUrl = await storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

export const deleteFile = async (fileId: string) => {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

    return { status: "ok" }
  } catch (error) {
    console.log(error);
  }
}

export const deletePost = async (postId: string, imageId: string) => {
  if (!postId || !imageId) return;
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    );

    if (!statusCode) throw Error;

    await deleteFile(imageId);

    return { status: 'ok' };
  } catch (error) {
    console.log(error);
  }
}

export const createPost = async (post: INewPost) => {
  try {
    // upload file to appwrite storage
    const uploadedFile = await uploadFile(post.file[0]);

    if (!uploadedFile) throw Error;

    // get file url
    const fileUrl = await getFilePreview(uploadedFile.$id);

    if(!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    // convert tags into array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    // create post
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        location: post.location,
        tags
      }
    );
    if (!newPost) throw Error;
    return newPost;
  } catch (error) {
    console.log(error);
  }
}