import React, { Fragment, Component } from "react";
import axios from "axios";
import config from "react-global-configuration";
import "./Stylesheets/UserProfileOfficial.css";
import { Tabs, Tab } from "react-bootstrap";
import Source from "./Source";
import NoticeShrinked from "./NoticeShrinked";

class StudentPofile extends Component {
  /* state variable for the class */
  state = {
    placeholder: "",
    name: "",
    key: "Home",
    username: "",
    type: "",
    starList: [],
    sourceSubscription: [],
    sources: []
  };

  /* lifecycle methods of the class */
  componentDidMount() {
    this.setState({
      name: localStorage.getItem(`name`),
      type: localStorage.getItem(`type`),
      username: localStorage.getItem(`username`)
    });

    axios
      .post(config.get("host_url") + config.get("routes.user_profile"), {
        username: localStorage.getItem(`username`),
        type: localStorage.getItem(`type`)
      })
      .then(res => {
        var data = res.data;
        this.setState({
          starList: data.starList,
          sourceSubscription: data.sourceSubscription
        });
      })
      .catch(error => {
        this.setState({
          error: error,
          placeholder: error.message,
          submitting: false
        });
      });

    axios
      .get(config.get("host_url") + config.get("routes.sources"))
      .then(res => {
        this.setState({
          sources: res.data.source_list
        });
      });
  }

  /* render method enclosing jsx expression */
  render() {
    const source_list = this.state.sources.map((item, index) => {
      return (
        <Source
          index={index}
          source={item.username}
          subscribed={
            this.state.sourceSubscription.indexOf(item.username) != -1
          }
        />
      );
    });
    const starred = this.state.starList.map((item, index) => {
      return <NoticeShrinked key={index} id={index} notice_id={item} />;
    });
    return (
      <Fragment>
        <div className="container-fluid cont">
          <div className="row" />
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col col-lg-2" />
            <div className="col col-lg-2">
              <img
                src="https://picsum.photos/200/300?image=1062"
                className="avatar"
                alt="avatar"
              />
              <hr className="my-4" />
              <div className="text-center">
                <h4>{this.state.name}</h4>
              </div>
            </div>
            <div className="col col-lg-8">
              <Tabs
                id="controlled-tab-example"
                activeKey={this.state.key}
                onSelect={key => this.setState({ key })}
              >
                <Tab eventKey="Home" title="Home">
                  <h3>Name: {this.state.name} </h3>
                  <br />
                  <h3>User Type: {localStorage.getItem(`type`)}</h3>
                </Tab>
                <Tab eventKey="sources" title="Sources">
                  {source_list}
                </Tab>
                <Tab eventKey="starred" title="Starred Notices">
                  {starred}
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default StudentPofile;
