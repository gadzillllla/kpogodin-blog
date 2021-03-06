import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Uploader from 'components/Uploader';
import { editorOn, editorOff } from 'actions/blogActions';
import { Form, Field } from 'react-final-form';
import { databasePosts, databaseAutosave } from 'DBconfig/DB_CONFIG';
import styles from './PostEditor.module.css';
import './editorStyles.css';

class PostEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '', files: [] };
  }

  componentDidMount() {
    databaseAutosave.on('child_added', snap => {
      this.setState({ text: snap.val() });
    });
  }

  componentWillUnmount() {
    this.props.editorOff();
  }

  save = () => {
    try {
      databaseAutosave.set({
        txt: this.state.text,
      });
    } catch (error) {}
  };

  addPost = value => {
    const { history, imagesList } = this.props;
    let date = new Date().getTime();
    databasePosts.push().set({
      title: value.title || '',
      images: imagesList,
      tags: value.tags || '',
      txt: this.state.text || '',
      time: date,
    });
    history.push('/');
  };

  modules = {
    toolbar: [
      [{ header: [2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code'],
      ['link', 'image', 'video'],
    ],
  };

  formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'code',
    'video',
  ];

  handleChange = value => {
    this.setState({ text: value });
  };

  validate = values => {
    const errors = {};
    if (values.title.length < 1) {
      errors.title = 'нужен заголовок';
    }
    return errors;
  };

  render() {
    const { admin } = this.props;
    if (!admin) return <Redirect to="/" />;
    return (
      <div className={styles.container}>
        <Form
          onSubmit={this.addPost}
          // validate={this.validate}
          render={({ handleSubmit, invalid }) => (
            <form className={styles.root} onSubmit={handleSubmit}>
              <Field className={styles.title} name="title" component="input" type="text" placeholder="Заголовок" />
              <Field
                className={styles.title}
                name="tags"
                component="input"
                type="text"
                placeholder="теги, через запятую!"
              />
              <ReactQuill
                theme="snow"
                value={this.state.text}
                modules={this.modules}
                formats={this.formats}
                onChange={this.handleChange}
              />

              <button className={styles.mainButton} disabled={invalid} type="submit">
                PUBLISH
              </button>
            </form>
          )}
        />
        <button className={styles.mainButton} onClick={this.save}>
          SAVE DRAFT
        </button>
        <Uploader />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  editorAvailable: state.blogReducer.editorAvailable,
  admin: state.userReducer.admin,
  imagesList: state.blogReducer.imagesList,
});

export default connect(
  mapStateToProps,
  { editorOn, editorOff },
)(PostEditor);
