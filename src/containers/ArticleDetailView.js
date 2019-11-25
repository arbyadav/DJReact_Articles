import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Button, Card } from "antd";
import CustomForm from "../components/Form";


const API_URL = 'https://django-reactify-articles-app.herokuapp.com'

class ArticleDetail extends React.Component {
  state = {
    article: {}
  };

  componentDidMount() {
    const articleID = this.props.match.params.articleID;
    axios.get(`${API_URL}/api/${articleID}`).then(res => {
      this.setState({
        article: res.data
      });
    });
  }

  handleDelete = event => {
    event.preventDefault();
    const articleID = this.props.match.params.articleID;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios.delete(`${API_URL}/api/${articleID}/delete/`)
      .then(res => {
        if (res.status === 204) {
          this.props.history.push(`/`);
        }
      })
  };

  render() {
    return (
      <div>
        <Card title={this.state.article.title}>
          <p> {this.state.article.content} </p>
        </Card>
        <CustomForm
          {...this.props}
          token={this.props.token}
          requestType="put"
          articleID={this.props.match.params.articleID}
          btnText="Update"
        />
        <form onSubmit={this.handleDelete}>
          <Button type="danger" htmlType="submit">
            Delete
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(ArticleDetail);
