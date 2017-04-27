import React, {Component} from 'react';


class Comment extends Component{
    render(){
        return (
            <div className="comment">
              <h2 className="commentAuthor">{ this.props.author }</h2>
              { this.props.children }
            </div>
        )
    }
}

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state = {author: '', text: ''};
    }
    handleAuthorChange(e){
        this.setState({author: e.target.value});
    }
    handleTextChange(e){
        this.setState({text: e.target.value});
    }
    handleSubmit(e){
        e.preventDefault();
        let author = this.state.author.trim();
        let text = this.state.text.trim();
        if (!text || !author) {
          return;
        }
        this.props.onMySubmit({author: author, text: text});
        this.setState({author: '', text: ''});
    }
    render(){
        return (
            <form className="commentForm" onSubmit={e=>this.handleSubmit(e)}>
                <input type="text" placeholder="Your name"
                value={this.state.author}
                onChange={e=>this.handleAuthorChange(e)}/>
                <input type="text" placeholder="Say something..."
                value={this.state.text}
                onChange={e=>this.handleTextChange(e)}/>
                <input type="submit" value="Post" />
            </form>
        )
    }
}

class CommentList extends Component{
    render(){
        let comments = this.props.data.map((comment)=>{
            return(
                <Comment author={comment.author} key={comment.id}>{comment.text}</Comment>
            )
        })
        return (
            <div className="commentList">
                {comments}
            </div>
        )
    }
}


class CommentBox extends Component{
    constructor(props){
        super(props);
        this.state = {data: []};

    }
    setData(){
        if (this.state.data.length < 10){
            let date = new Date();
            let data = this.state.data.concat({'id': this.state.data.length, 'author': 'god', 'text': date.toString()});
            this.setState({data: data});
        }
    }
    getSubmit(comment){
        let data = this.state.data.concat({id: this.state.data.length, author: comment.author, text: comment.text});
        this.setState({data: data});
    }
    componentDidMount() {
        this.setData();
        setInterval(this.setData.bind(this), this.props.flushtime);
    }
    render(){
        return (
            <div className="commentBox">
              <h1>Comments</h1>
              <CommentForm onMySubmit={e=>this.getSubmit(e)}/>
              <CommentList data={this.state.data}/>
            </div>
        )
    }
}

export default CommentBox
