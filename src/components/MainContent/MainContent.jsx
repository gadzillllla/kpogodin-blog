import React, { Component } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';


import { database_posts } from "../config/DB_CONFIG";
import { blogLoaded, blogLoading } from '../../actions/blogActions';
import Post from "shared/Post";
import Loader from "shared/Loader";
import moment from "moment";
import styles from './MainContent.module.scss';

class MainContent extends Component {
    state = {
        posts: [],
    }


    componentDidMount() {
        const previousPosts = this.state.posts;
        this.props.blogLoading;
        database_posts.on("child_added", snap => {
            previousPosts.push({
                id: snap.key,
                txt: snap.val().txt,
                author: snap.val().author,
                time: snap.val().time
            });
            this.setState(
                {
                    posts: previousPosts
                }, this.props.blogLoaded
            );

        })

        database_posts.on("child_removed", snap => {
            previousPosts.forEach((elem, index) => {
                if (elem.id === snap.key) {
                    previousPosts.splice(index, 1);
                }
            });

            this.setState({
                posts: previousPosts
            });
        });

    }





    render() {
        if (!this.props.loaded) {
            return <Loader />
        }
        else return (
            <div>
                {this.state.posts.map(elem =>
                    <Post
                        date={elem.time}
                        author={elem.author}
                        text={elem.txt}
                        key={elem.id}
                        postId={elem.id}
                    />

                )}
            </div>
        )
    }
}




const mapStateToProps = state => ({
    loaded: state.blogReducer.loaded
});

export default connect(mapStateToProps, { blogLoaded, blogLoading })(MainContent);
