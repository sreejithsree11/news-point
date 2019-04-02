import React, { Component } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import { Card, CardMenu, IconButton, CardTitle, CardText, CardActions, Button } from 'react-mdl';
// import './feed/feed.css';

const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8
  };
class TestInfinte extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          totalResults: 0,
          pageNumber: 0
        };
      }
    async componentDidMount() {
            await this.fetchTheNews(1);
        // fetch("https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=dde19f86657f4750ace801c80aee32d5&page=1")
        //   .then(res => res.json())
        //   .then(
        //     (result) => {
        //         const hasMore = (result.totalResults > 10 && true) || false
        //       this.setState({
        //         isLoaded: true,
        //         items: result.articles,
        //         totalResults: result.totalResults,
        //         hasMore: hasMore
        //       });
        //     },
        //     // Note: it's important to handle errors here
        //     // instead of a catch() block so that we don't swallow
        //     // exceptions from actual bugs in components.
        //     (error) => {
        //       this.setState({
        //         isLoaded: true,
        //         error
        //       });
        //     }
        //   )
      };

      fetchTheNews = async (pageCount) => {
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
              isLoaded: true,
              items: [...this.state.items, ...result.articles],
              totalResults: result.totalResults,
              hasMore: hasMore,
              pageNumber: pageCount
            });
            console.log(this.state, 'state');
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
        );
      }

      fetchMoreData = async() => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        // setTimeout(() => {
        //   this.setState({
        //     items: this.state.items.concat(Array.from({ length: 20 }))
        //   });
        // }, 1500);
        let pageCount = this.state.pageNumber + 1;
        await this.fetchTheNews(pageCount);
        return;
      };
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
  
        //   return  <div>{ newsList }</div>
        console.log(this.state.hasMore);
            return <InfiniteScroll
                dataLength={this.state.totalResults}
                next={this.fetchMoreData}
                hasMore= {this.state.hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                  <p style={{textAlign: 'center'}}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
                >
                { newsList }
            </InfiniteScroll>
        }


        // return (
        //     <div>
        //       <h1>demo: react-infinite-scroll-component</h1>
        //       <hr />
        //       <InfiniteScroll
        //         dataLength={this.state.items.length}
        //         next={this.fetchMoreData}
        //         hasMore={true}
        //         loader={<h4>Loading...</h4>}
        //       >
        //         {this.state.items.map((i, index) => (
        //           <div style={style} key={index}>
        //             div - #{index}
        //           </div>
        //         ))}
        //       </InfiniteScroll>
        //     </div>
        //   );
    }
}

export default TestInfinte;