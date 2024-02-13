import { INewPost, INewUser, IUpdatePost } from "@/types";
import { ID, Models, Query } from "appwrite";
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

export const signInAccount = async (user: { email?: string, password?: string }) => {
  if (!user.email || !user.password) return;
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
    await acount.deleteSession('current');
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
    if (!newPost) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }
    return newPost;
  } catch (error) {
    console.log(error);
  }
}

export const getRecentPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.orderDesc('$createdAt'), Query.limit(20)]
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

export const likePost = async (postId: string, likeArray: string[]) => {
  try {
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId,
      {
        likes: likeArray
      }
    );

    if (!updatedPost) throw Error;

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

export const savePost = async (postId: string, userId: string) => {
  try {
    const savedPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId
      }
    );

    if (!savedPost) throw Error;

    return savedPost;
  } catch (error) {
    console.log(error);
  }
}

export const deleteSavedPost = async (savedRecordId: string) => {
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savedRecordId
    );

    if (!statusCode) throw Error;

    return { status: 'ok' };
  } catch (error) {
    console.log(error);
  }
}

export const getPostById = async (postId: string) => {
  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    );

    return post;
  } catch (error) {
    console.log(error);
  }
}

export const updatePost = async (post: IUpdatePost) => {
  const hasFileToUpdate = post.file.length > 0;
  try {
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId
    };

    if (hasFileToUpdate) {
      // upload file to appwrite storage
      const uploadedFile = await uploadFile(post.file[0]);

      if (!uploadedFile) throw Error;
  
      // get file url
      const fileUrl = await getFilePreview(uploadedFile.$id);
  
      if(!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = { 
        ...image,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id
      }
    }

    // convert tags into array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    // create post
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      post.postId,
      {
        caption: post.caption,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        location: post.location,
        tags
      }
    );
    if (!updatedPost) {
      await deleteFile(post.imageId);
      throw Error;
    }
    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

export const getInfinitePosts = async ({ pageParam }: { pageParam: number }) => {
  const queries: any[] = [Query.orderDesc('$updatedAt'), Query.limit(10)];
  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam.toString()));
  }
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      queries
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

export const searchPosts = async (searchTerm: string) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.search('caption', searchTerm)]
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

export const getUsers = async (limit?: number) => {
  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.orderDesc('$createdAt'), Query.limit(limit || 10)]
    );

    if (!users) throw Error;

    return users;
  } catch (error) {
    console.log(error);
  }
}

export const getInfiniteUsers = async ({ pageParam }: { pageParam: number }) => {
  const queries: any[] = [Query.orderDesc('$createdAt'), Query.limit(10)];
  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam.toString()));
  }
  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      queries
    );

    if (!users) throw Error;

    return users;
  } catch (error) {
    console.log(error);
  }
}

export const getInfiniteSavedPosts = async ({ pageParam }: { pageParam: number | null }) => {
  const queries: any[] = [Query.orderDesc('$updatedAt'), Query.limit(10)];
  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam.toString()));
  }
  try {
    let savedPostIds = [];
    // get current user
    const currentUser = await getCurrentUser();
    if (currentUser) {
      savedPostIds = currentUser?.save?.reduce((acc: string[], item: { post: Models.Document })=> {
        if (item.post.$id) acc.push(item.post.$id);
        return acc;
      }, []);
      if (savedPostIds.length) {
        queries.push(Query.equal('$id', savedPostIds));
      }
    }

    const savedPosts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      queries
    );

    if (!savedPosts) throw Error;

    return savedPosts;
  } catch (error) {
    console.log(error);
  }
}
