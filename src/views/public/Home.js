import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {client} from '../../client';
import Promo from '../includes/Promo';

const moment = require('moment');
const showdown  = require('showdown'),
    converter = new showdown.Converter()

export default class HomePage extends Component {
    constructor(){
        super();
        this.state = {
            posts: []
        }
    }
    fetchDevelopmentLog(){
        client.getEntries().then((response) => {
            let posts = response.items.filter((entry) => {
                return entry.sys.contentType.sys.id === 'post'
            });
            this.setState({
                posts: formatPosts(posts)
            })
        }).catch(console.error)
    }
    formatDevelopmentLog(posts){
        return posts.map((post) => {
            return PostPreview(post)
        })
    }
    componentDidMount(){
        this.fetchDevelopmentLog()
    }
    render() {
        let developmentLog = this.formatDevelopmentLog(this.state.posts);
        return (
            <div className="home-page">
                <Helmet>
                    <title>WoW Passport - Player Lookup and Analysis</title>
                </Helmet>
                <div className="home-banner">
                    <div className="splash-content">
                        <h1>Search the Frontlines</h1>
                        <h2>Quick Player Lookup &amp; Analysis</h2>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <Promo/>
                        </div>
                        <div className="col-md-6">
                            <article>
                                <h3>Development Log</h3>
                                <div className={`development-log`}>
                                    {developmentLog}
                                </div>
                            </article>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function formatPosts(posts){
    let filtered = posts.filter((post) => {
        if(post.fields.relatedProject){
            return post.fields.relatedProject.fields.title === 'WoW Passport'
        }else{
            return false;
        }
    });
    let sortedPosts = filtered.sort( (a,b) => {
        return moment(b.fields.published).isAfter(moment(a.fields.published));
    });
    return sortedPosts
}

function PostPreview(post){
    const { sys, fields } = post;

    let raw = converter.makeHtml(post.fields.content)
    let preview = (raw.split('<p>')[1]).split('</p>')[0].slice(0, 200) + ' [...]'

    return(
            <div className="post" key={sys.id}>
                <h5><a href={`https://www.ryanmckenna.io/blog/${fields.slug}`} target={`_blank`}>{fields.title}</a></h5>
                <p className="published">Published: {moment(fields.published).format('D MMMM YYYY')}</p>
                <p>{preview}</p>
            </div>
    );
}
