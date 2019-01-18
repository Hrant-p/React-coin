import React from 'react';
import { handleResponse } from '../../helpers';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import './Table.css';
import Table from './Table';
import Pagination from './pagination';



class List extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      currencies: [],
      error: null,
      page: 1
    };

    this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });

    const { page } = this.state;
    
    fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
      .then(handleResponse)
      .then((data) => {
        this.setState({
          currencies: data.currencies,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.errorMessage,
          loading: false,
        });
      });
  }

    renderChangePercent(percent) {

    

      if (percent > 0) {
        return <span className="percent-raised">{percent}% &uarr;</span>
      } else if (percent < 0) {
        return <span className="percent-fallen">{percent}% &darr;</span>
      } else {
        return <span>{percent}</span>
      }
    }

    handlePaginationClick(direction){
      let nextPage = this.state.page;
      nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;
      this.setState({page: nextPage})
    }


  render() {
    console.log(this.state.page)
    
    const { loading, error, currencies } = this.state;

    // render only loading component, if loading state is set to true
    if (loading) {
      return <div className="loading-container"><Loading /></div>
    }

    // render only error message, if error occurred while fetching data
    if (error) {
      return <div className="error">{error}</div>
    }

    return (
       <div>
         <Table 
            currencies = {currencies} 
            renderChangePercent = {this.renderChangePercent} 
            />
        <Pagination handlePaginationClick = {this.handlePaginationClick}/>

       </div>

    )
      
  }
}

export default List;
