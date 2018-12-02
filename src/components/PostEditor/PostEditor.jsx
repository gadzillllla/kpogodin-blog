import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Icon } from 'antd';
import { editorOn, editorOff } from 'actions/blogActions';
import { Form, Field } from 'react-final-form';
import { databasePosts, databaseAutosave } from 'DBconfig/DB_CONFIG';
import styles from './PostEditor.module.css';
import './test.css';
import { compose } from 'redux';

class PostEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.handleChange = this.handleChange.bind(this);
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
      console.log('save');
    } catch (error) {
      console.log(error);
    }
  };

  addPost = value => {
    const { history } = this.props;
    let date = new Date().getTime();
    databasePosts.push().set({
      title: value.title || '',
      tags: value.tags || '',
      txt: this.state.text || '',
      time: date,
    });
    history.push('/');
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
      <div>
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
                POST
              </button>
            </form>
          )}
        />
        <Icon type="save" onClick={this.save} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  editorAvailable: state.blogReducer.editorAvailable,
  admin: state.userReducer.admin,
});

export default connect(
  mapStateToProps,
  { editorOn, editorOff },
)(withRouter(PostEditor));
