import { sp } from '@pnp/sp';

export interface IComment {
  comment: string;
  date: Date;
  User: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString(); 
};

export default class ContactService {
  async getComments(): Promise<IComment[]> {
    try {
      const response = await sp.web.lists.getByTitle("ContactV3").items.select("comment", "date", "User").get();
      
      const formattedComments = response.map((comment) => ({
        ...comment,
        date: formatDate(comment.date) 
      }));
      return formattedComments;
    } catch (error) {
      throw new Error('Error fetching comments');
    }
  }

  async postComment(comment: string, userEmail: string): Promise<void> {
    try {
      await sp.web.lists.getByTitle("ContactV3").items.add({
        comment: comment,
        date: new Date(),
        User: userEmail, // Utilisez l'e-mail de l'utilisateur actuel à la place de currentUser.Title
      });
    } catch (error) {
      throw new Error('Error submitting comment');
    }
  }

  async getCurrentUserEmail(): Promise<string> {
    try {
      const currentUser = await sp.web.currentUser.get();
      return currentUser.Email;
    } catch (error) {
      throw new Error('Error getting current user email');
    }
  }
}
