import * as React from 'react';
import { Stack } from '@fluentui/react';
import ContactService, { IComment } from './services/ContactService';
import styles from './Contact.module.scss';


export interface ICommentV1Props {
  description: string;
}

export interface ICommentV1State {
  newComment: string;
  comments: IComment[];
  userEmail: string; // Ajoutez userEmail à l'état

}

export default class Contact extends React.Component<{}, ICommentV1State> {
  private contactService: ContactService;

  constructor(props: {}) {
    super(props);
    this.state = {
      newComment: '',
      comments: [],
      userEmail: '' 
    };
    this.contactService = new ContactService();
  }

  componentDidMount() {
    this.fetchComments();
    setInterval(this.fetchComments, 10000);
  }

  fetchComments = async () => {
    try {
      const comments = await this.contactService.getComments();
      this.setState({ comments });
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newComment: event.target.value });
  };

  handleSubmit = async () => {
    const { newComment } = this.state;
    if (!newComment) return;
  
    try {
      const currentUserEmail = await this.contactService.getCurrentUserEmail(); 
      await this.contactService.postComment(newComment, currentUserEmail);
      this.fetchComments();
      this.setState({ newComment: '' });
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };
  
  render() {
    const { newComment, userEmail } = this.state; // Récupérez userEmail de l'état

    return (
      <Stack className={`container mt-5 ${styles.container}`}>
        <h2 className={styles.contactTitle}>Contact</h2>
        <p className={styles.text}>texxxxxxxxxxxxxxxxxxxxxttttttttt</p>
        <div >
          <h1 className={styles.title}>E-mail</h1>
          <p>{userEmail}</p> 
        </div>
        <div >
          <h1 className={styles.title}>Message</h1>
          <div className={`coment-bottom bg-white p-2 px-4 ${styles.commentButton}`}>
            <div className={`d-flex flex-row align-items-center ${styles.addCommentSection}`}>
              <input type="text" className={`form-control ${styles.commentInput}`} placeholder="Commencez votre évaluation..." value={newComment} onChange={this.handleCommentChange} />
              <div style={{ marginBottom: '20px' }}></div>
              <button className={`btn btn-primary ${styles.commentButton}`} type="button" onClick={this.handleSubmit}>Comment</button>
            </div>
          </div>
        </div>
      </Stack>
    );
  }
}
