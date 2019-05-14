import React from "react";
// import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card, CardMenu, IconButton, CardTitle, CardText, CardActions, Button } from 'react-mdl';
import API from '../../api/api';  

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        items: [],
        hasMore: true
    };
  }
  async componentDidMount() {
    // initila news fetching.
    await this.fetchTheNews(1);
  };
  
  /**
   * Functon to fetch the newses.
   */
  fetchTheNews = async (pageCount) => {
    const params = { params:{
      country: 'de' ,
      category: 'business',
      apiKey: 'dde19f86657f4750ace801c80aee32d5',
      page: pageCount
    }};
    // API Call
    const result = await API.get(`/top-headlines`, params)
    .then(res => res.data)
    .catch((error)=>{
      // on error
      alert('There is an error in API call!')
    });
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
    return;
  };
  fetchMoreData = async () => {
    let pageCount = this.state.pageNumber + 1;
    await this.fetchTheNews(pageCount);
  };

     render() {
        const { error, hasMore } = this.state;
        if(error) {
          return <div>Error: {error.message}</div>;
        }
        return (
          <div>
           
            <InfiniteScroll
              dataLength={this.state.items.length}
              next={this.fetchMoreData}
              hasMore={this.state.hasMore}
              loader={<p style={{textAlign: 'center'}}>
                        <b>Loading..!!</b>
                      </p>}
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

export default Feed;
