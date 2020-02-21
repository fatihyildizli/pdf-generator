import React, {Component} from 'react';
import axios from 'axios';
const FileDownload = require('js-file-download');
const API_URL='http://localhost:9999/api/generatePdfFromHtml/';

class App extends Component {

    constructor(props) {
        super(props)

        this.onChangeHtml = this.onChangeHtml.bind(this);
        
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            html: ''
        }
    }

    onChangeHtml(e) {
        this.setState({ html: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()

        const html = this.state.html;
       
        axios.post(API_URL, html)
            .then((res) => {
                console.log(res.data)
            
                FileDownload(new Blob([res.data]), 'result.pdf');
                
            }).catch((error) => {
                console.log(error)
            });

           
        this.setState({ html: ''})
    }
    
    render() {
        return (
            <div className="wrapper">
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>HTML Input</label>
                    <input type="text" value={this.state.html} onChange={this.onChangeHtml}  className="form-control" />
                </div>
               
                <div className="form-group">
                    <input type="submit" value="Generate PDF" className="btn btn-success btn-block" />
                </div>
            </form>
        </div>
        )
    }

    

  
}

export default App;