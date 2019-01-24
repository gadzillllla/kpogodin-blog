import React, { Component } from 'react';
import { isEmpty } from 'ramda';
import UploadFile from 'components/UploadFile';
import { storage } from 'DBconfig/DB_CONFIG';
import styles from './Uploader.module.css';

class Uploader extends Component {
  state = {
    files: [],
  };

  files = e => this.setState({ files: [...e.target.files] });

  handleUpload = () => {
    const { files } = this.state;
    files.map((file, i) => {
      storage
        .ref(`images/${file.name}`)
        .put(file)
        .on(
          'state_changed',
          snap => {
            let tempArr = files;
            tempArr[i].percent = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
            this.setState({ files: tempArr });
          },
          error => {
            console.log(error);
          },
          () => {
            storage
              .ref('images')
              .child(file.name)
              .getDownloadURL()
              .then(url => {
                let tempArr = files;
                tempArr[i].url = url;
                this.setState({ files: tempArr });
              });
          },
        );
    });
  };

  renderUploadFiles = () => {
    const { files } = this.state;
    if (!isEmpty(files)) {
      console.log(files[0].progress);
      return (
        <div className={styles.files}>
          {files.map(file => (
            <UploadFile percent={file.percent} url={file.url} />
          ))}
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <input type="file" onChange={this.files} multiple />
        <button onClick={this.handleUpload}>asd</button>
        {this.renderUploadFiles()}
      </div>
    );
  }
}

export default Uploader;
