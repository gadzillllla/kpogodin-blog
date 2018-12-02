import React from 'react';
import { connect } from 'react-redux';
import { changeTag } from 'actions/blogActions';
import styles from './Tag.module.css';

const Tag = props => {
  const selectTag = () => props.changeTag(props.tag);
  return (
    <button onClick={selectTag} className={styles.tag}>
      #{props.tag}
    </button>
  );
};

const mapStateToProps = state => ({
  selected: state.blogReducer.tag,
});

// Tag.propTypes = {
//   loaded: PropTypes.bool.isRequired,
//   blogLoaded: PropTypes.func.isRequired,
// };

export default connect(
  mapStateToProps,
  { changeTag },
)(Tag);
