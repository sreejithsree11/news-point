import React, { Component } from 'react';
import { Card, CardMenu, IconButton, CardTitle, CardText, CardActions, Button } from 'react-mdl';
import './Feed.css';

class Feed extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
    }

    componentDidMount() {
      fetch("https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=dde19f86657f4750ace801c80aee32d5&page=2")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result.articles
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }

    render() {
      const { error, isLoaded, items } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        let newsList = items.map((item, i) => {
                let imageUrl = '#888';
                if(item.urlToImage){
                  imageUrl = `url(${item.urlToImage}) center / cover`;
                }
                return <Card
                  key ={i}
                  className ="feed-container"
                   shadow={0} style={{width: '512px', margin: 'auto'}}
                   >
                  <CardTitle style={{
                    background: imageUrl,
                    color: '#fff', 
                    height: '176px'
                }}>{item.title}</CardTitle>
                  <CardText>
                      {item.description}
                  </CardText>
                  <CardActions border>
                      <Button colored><a target="_blank" className="btn-href"href={item.url}>Read More</a></Button>
                  </CardActions>
                  <CardMenu style={{color: '#fff'}}>
                      {/* <IconButton name="share" /> */}
                  </CardMenu>
                </Card>
        });

        return  <div>{ newsList }</div>
      }
    }
}

export default Feed;