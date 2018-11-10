import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { databasePosts } from 'DBconfig/DB_CONFIG';
import styles from './PostEditor.module.css';
import 'react-quill/dist/quill.snow.css';

class PostEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  addPost = value => {
    let date = new Date().getTime();
    databasePosts.push().set({
      title: value.title,
      txt: this.state.text,
      time: date,
    });
  };

  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
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

  handleChange(value) {
    this.setState({ text: value });
  }

  render() {
    const { admin } = this.props;
    if (!admin) return <Redirect to="/" />;
    return (
      <Form
        onSubmit={this.addPost}
        render={({ handleSubmit, invalid }) => (
          <form className={styles.root} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <Field className={styles.title} name="title" component="input" type="text" placeholder="Заголовок" />
              <ReactQuill
                theme="snow"
                value={this.state.text}
                modules={this.modules}
                formats={this.formats}
                onChange={this.handleChange}
              />
            </div>
            <button className={styles.btn} type="submit">
              отправить
            </button>
          </form>
        )}
      />
    );
  }
}

const mapStateToProps = state => ({
  admin: state.userReducer.admin,
});

export default connect(
  mapStateToProps,
  {},
)(PostEditor);
