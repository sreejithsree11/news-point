import React from "react";
// import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card, CardMenu, IconButton, CardTitle, CardText, CardActions, Button } from 'react-mdl';

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

class TestInfinte1 extends React.Component {
  state = {
    items: Array.from({ length: 20 })
  };
  constructor(props) {
    super(props);
    this.state = {
        items: []
    };
  }
  async componentDidMount() {
    await this.fetchTheNews(1);
  };
  fetchTheNews = (pageCount) => {
    fetch(`https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=dde19f86657f4750ace801c80aee32d5&page=${pageCount}`)
    .then(res => res.json())
    .then(
      (result) => {
          // Getting the data response length
          let responseLength = result.articles.length;
          let previousPageCount = pageCount-1;
          let previousDataCount = 20*previousPageCount;
          let currentDataLenght = previousDataCount + responseLength;

          const hasMore = (result.totalResults > currentDataLenght && true) || false
          this.setState({
              items: this.state.items.concat(result.articles),
              totalResults: result.totalResults,
              hasMore: hasMore,
              pageNumber: pageCount
            });
      });
  };
  fetchMoreData = () => {
    let pageCount = this.state.pageNumber + 1;
    this.fetchTheNews(pageCount);
  };

     render() {
        const { error, hasMore } = this.state;
        if(error) {
          return <div>Error: {error.message}</div>;
        }
        return (
          <div>
            <h1>demo: react-infinite-scroll-component</h1>
            <hr />
            <InfiniteScroll
              dataLength={this.state.items.length}
              next={this.fetchMoreData}
              hasMore={this.state.hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{textAlign: 'center'}}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {this.state.items.map((item, i) => (
                <Card
                 key ={i}
                 className ="feed-container"
                  shadow={0} style={{width: '512px', margin: 'auto'}}
                  >
                 <CardTitle style={{
                   background: `url(${item.urlToImage}) center / cover`,
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

              ))}
            </InfiniteScroll>
          </div>
        );
    }
}

export default TestInfinte1;
