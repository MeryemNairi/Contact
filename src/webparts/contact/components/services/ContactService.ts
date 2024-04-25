import { sp } from '@pnp/sp';

export interface IComment {
  comment: string;
  date: Date;
  User: string;
}

export default class ContactService {
  async postComment(comment: string, userEmail: string): Promise<void> {
    try {
      await sp.web.lists.getByTitle("ContactV3").items.add({
        comment: comment,
        date: new Date(),
        User: userEmail, 
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
