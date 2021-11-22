//dashboard displaying possible workouts to browze  
//option to select only if logged in
// import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearchengin} from '@fortawesome/free-brands-svg-icons'

// import * as Fa from '@fortawesome/react-fontawesome' 
//import * as FaIcons from 'react-icons/fa';

import { MDBCol } from "mdbreact";
import React, { useEffect, useState } from "react";
import {  Container, Card, CardColumns, Form, Button, Col } from 'react-bootstrap';
import Auth from '../utils/Auth';
import { useMutation } from '@apollo/react-hooks';
import { GET_ME } from '../utils/queries';
import { SAVE_ARTICLE } from "../utils/mutations";
import { saveArticleIds, getSavedArticleIds } from "../utils/localStorage";
import { searchArticles } from '../utils/API';
const Home = () => {
//create state to hold articles from api data
    const [displayArticles, setDisplayArticles] =  useState([]);
    //search initially empty
    const [searchInput, setSearchInput] = useState('');
    const [savedArticleIds, setSavedArticleIds] = useState(getSavedArticleIds());
    const [saveArticle, { error }] = useMutation(SAVE_ARTICLE);
    // set up useEffect hook to save `savedarticles` 
    //list to localStorage on component unmount too keep pwa functionality
    //method to display api data 

  //pusher vars for news feed if !searchinput
  //START

  state = {
    newsItems: [],
  }
  const pusher = new Pusher('<your app key>', {
    cluster: '<your app cluster>',
    encrypted: true,
  });

  const channel = pusher.subscribe('news-channel');
  channel.bind('update-news', data => {
    this.setState({
      newsItems: [...data.articles, ...this.state.newsItems],
    });
  });
}
//END







    useEffect(() => {
        return () => saveArticleIds(savedArticleIds);
    });

 //called onclick of save this article btn
 const handleSaveArticle= async(articleId) => {
    console.log(articleId);
    const articleToSave = displayArticles.find((article) => article.articleId === articleId);
   
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if(!token){
        return false;
    }

    try {
      console.log(articleToSave);
      //when i give the articletosave to savearticle() it dumps the articleid to null
      //wai?
       const { data } = await saveArticle({ 
           variables: {input: articleToSave}
       });
       //saveArticle(articleId);
       console.log(data);
       if(error){
        throw new Error('something went wrong!');
       }
             // if article  saves to useraccount save id to state
      setSavedArticleIds([...savedArticleIds, articleToSave.articleId]);
    } catch (err) {
      console.error(err);
    }
  };

    const handleShowArticles = async (event) => {
        //are we keeping the search option? if so this becomes a search btn handler 
        //could be cool to have articles populate the homepage at random for browsing until user searches for one
        event.preventDefault();

        if (!searchInput) {
            //return false;
            render() {
              const NewsItem = (article, id) => (
                <li key={id}><a href={`${article.url}`}>{article.title}</a></li>
              );
              const newsItems = this.state.newsItems.map(e => NewsItem(e, pushid()));
    
        return (
          <div className="App">
            <h1 className="App-title">Live Bitcoin Feed</h1>
    
            <ul className="news-items">{newsItems}</ul>
          </div>
        );
      }
    }
    
}
      
          try {
              //response == api fetch + query
            const response = await searchArticles(searchInput);
      
            if (!response.ok) {
              throw new Error('something went wrong!');
            }
      
            const { articles } = await response.json();
            console.log(articles);
            const articleData = articles.map((article) => ({
                articleId: article.url,
                author: article.author,
                title: article.title,
                description: article.description,
                url: article.url,
                urlToImage: article.urlToImage
              }))
          
              //if not search, just display a bunch of fetched articles of a certain type?
              setDisplayArticles(articleData);
              setSearchInput('');
          } catch (err) {
            console.error(err);
          }
    };

       return (
          <>
        <Container>
          <h1>Search for Endless Articles!</h1>
          <Form onSubmit={handleShowArticles}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for an article'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='dark' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
        <CardColumns>
            {displayArticles.map((article) => {
                return(
                    <Card key = {article.articleId}>
                        <Card.Title>{article.title}</Card.Title>
                        <Card.Subtitle className='mb-2 text-muted'> Author(s): {article.author}</Card.Subtitle>
                        <Card.Text>{article.description}</Card.Text>
                        <Card.Link href={article.url}>{article.url}</Card.Link>
                        {Auth.loggedIn() && (
                    <Button
                      disabled={savedArticleIds?.some((savedArticleId) => savedArticleId === article.articleId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveArticle(article.articleId)}>
                      {savedArticleIds?.some((savedArticleId) => savedArticleId === article.articleId)
                        ? 'Article saved to dashboard!'
                        : 'Save Article!'}
                    </Button>
                  )}
                    </Card>
                );
            })}
        </CardColumns>
        </>
      )
};

export default Home;

