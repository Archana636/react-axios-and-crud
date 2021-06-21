import React from 'react';
import axios from 'axios';
import './style.css';


const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      userId: '',
      title: '',
      body: '',
      posts: []
    };
  }

  componentDidMount() {
    this.getPosts();
  }
  // Create
  createPosts = async () => {
    const { data } = await axios.post(API_URL, {
      userId: this.state.userId,
      title: this.state.title,
      body: this.state.body
    });
    const posts = [...this.state.posts];
    posts.push(data);

    this.setState({ posts, userId: '', title: '', body: '' });
  };

  // Read
  getPosts = async () => {
    const { data } = await axios.get(API_URL);
    this.setState({ posts: data });
  };

  //updatePosts

  updatePosts = async () => {
    const { data } = await axios.put(`${API_URL}/${this.state.id}`, {
      userId: this.state.userId,
      title: this.state.title,
      body: this.state.body
    });
    console.log(data);

    const posts = [...this.state.posts];
    const postIndex = posts.findIndex(post => post.id === this.state.id);
    posts[postIndex] = data;

    this.setState({ posts, userId: '', title: '', body: '', id: '' });
  };

  //View comments
  viewPosts = async () => {
 const { data } = await axios.Posts(`${API_URL}/${postId}`);

 let posts = [...this.state.posts];
 posts = posts.get(post => post.id != postId);

 this.setState({ posts });
 console.log(data);
  }
  

  //Delete
  deletePosts = async postId => {
    await axios.delete(`${API_URL}/${postId}`);

    let posts = [...this.state.posts];
    posts = posts.filter(post => post.id != postId);

    this.setState({ posts });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.state.id) {
      this.updatePosts();
    } else {
      this.createPosts();
    }
  };

  selectPost = post => {
    this.setState({ ...post });
  };

  render() {
    
return (
      <div class="formcenter">
        <h1 style={{textAlign:"center",color:"purple"}}>CRUD OPERATION!</h1>

        <form onSubmit={this.handleSubmit}>
          <div>
            <label>UserId:</label>
            <input
              type="text"
              name="userId"
              value={this.state.userId}
              onChange={this.handleChange}
              required
            />
          </div>
          <br />
          <div>
            <label> Title :</label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              required
            />
          </div>
          <br />
          <div>
            <label>Body:</label>
            <input
              type="text"
              name="body"
              value={this.state.body}
              onChange={this.handleChange}
              required
            />
          </div>
          <br />

          <div>
            <input style={{color:"#006b16"}} type="Submit" />
          </div>
          <br />
          <br />
        </form>
        <table>
          <thead>
            <tr class="header">
              <th scope="col">Id</th>
              <th scope="col">User Id</th>
              <th scope="col">Title</th>
              <th scope="col">Body</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => {
              return (
                <tr key={post.id}>
                  <th scope="row">{post.id}</th>
                  <td>{post.UserId}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                  <td style={{ display: "flex", gap: "5px"}}

>                    <button style={{backgroundColor:"red"}}
                 onClick={() => this.selectPost(post)}>Edit</button>

                    <button type="button" className="btn btn-danger" onClick={() => this.deletePosts(post.id)}> 
                      Delete
                    </button>

                    <button style={{backgroundColor:"red"}}
                 onClick={() => this.viewPosts(post.id)}>View</button>

                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

