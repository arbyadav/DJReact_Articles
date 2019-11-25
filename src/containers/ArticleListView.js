import React from "react";
import axios from "axios";
import Articles from "../components/Article";
import CustomForm from "../components/Form";

const API_URL = 'https://django-reactify-articles-app.herokuapp.com'

class ArticleList extends React.Component {
  state = {
    articles: []
  };

  fetchArticles = () => {
    axios.get(`${API_URL}/api/`).then(res => {
      this.setState({
        articles: res.data
      });
    });
  }

  componentDidMount() {
    this.fetchArticles();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token) {
      this.fetchArticles();
    }
  }

  render() {
    return (
      <div>
        <Articles data={this.state.articles} /> <br />
        <h2> Create an article </h2>
        <CustomForm requestType="post" articleID={null} btnText="Create" />
      </div>
    );
  }
}

export default ArticleList;
