import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


export class News extends Component {   
  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general',
  }  
  static PropTypes = {
    country: PropTypes.string,
    pageSizez: PropTypes.number,
    category: PropTypes.string,
  }

  capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  constructor(props){
    super(props);
      this.state = { 
      articles : [],
      loading: true,
      page:1,
      totalResults: 0
      
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - Top Headlines`;
  }

  async updateNews(){
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    this.props.setProgress(30)
    let parsedData = await data.json()
    this.props.setProgress(70)
    this.setState({articles:parsedData.articles, totalResults: parsedData.totalResults, loading: false})

    this.props.setProgress(100)
  }

  async componentDidMount(){
    this.updateNews();

  }

//  handlePrevClick =  async ()=>{
 
//     this.setState({page: this.state.page - 1});
//     this.updateNews();
//   }
//   handleNextClick = async ()=>{
    
//   this.setState({page: this.state.page + 1});
//   this.updateNews();

//   }
  fetchMoreData = async()=> {
    this.setState({page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3721098669714c2ea5d88a6eff1fd5cc&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: this.state.articles.concat (parsedData.articles), totalResults: parsedData.totalResults})

  };

  render() {
    
    return (
      <>
        <h1 className='text-center' style={{margin: '17px'}}>React News App </h1>
        <h4 style={{margin: '27px ', color: 'blue'}}> Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h4>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner/>}>
         
        < div className='container my-3'>
        <div className="row">
        {this.state.articles.map((element) => {
          return  <div className="col md-4"key={element.url} >
          <NewsItems  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
        </div>
        })}
      </div>
      </div> 
       </InfiniteScroll>
              
     </>
    )
  }
}

export default News
