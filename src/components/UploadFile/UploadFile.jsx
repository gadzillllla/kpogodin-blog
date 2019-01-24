import React, { Component } from 'react';
import { Progress } from 'antd';
import styles from './UploadFile.module.css';

class UploadFile extends Component {
  state = {};

  getUrl = url => (url ? url : '');

  render() {
    return (
      <div className={styles.root} style={{ backgroundImage: `url(${this.getUrl(this.props.url)}` }}>
        <div className={styles.container}>
          <Progress className={styles.progress} percent={this.props.percent} />
        </div>
      </div>
    );
  }
}

export default UploadFile;
