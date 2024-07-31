import React, { Component } from 'react';
import Editor from 'markdown-latex';
import { MathpixMarkdownModel as MM } from 'mathpix-markdown-it';

interface AppState {
  value: string;
}

export default class Second extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value: string){
    this.setState({
        value
    });
  }

  render() {
    const { value } = this.state;
    return(
      <div>
        <Editor value={value} onChange={this.handleChange} language='en'/>
        {/* <textarea value={(this.state.value)}></textarea> */}
      </div>
    )
  }
}