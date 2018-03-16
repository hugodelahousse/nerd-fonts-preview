import React, {Component} from 'react';
import SyntaxHighlighter from 'react-code-highlighter';
import gruvbox_dark from 'react-code-highlighter/dist/styles/gruvbox-dark';
import ReactLoading from 'react-loading';

export default class Font extends Component {
  constructor (props) {
    super(props);
    this.state = {loaded: false};
    const font_url = encodeURI(`https://rawgit.com/ryanoasis/nerd-fonts/master/${this.props.data.path}`);
    // let font_style = document.createElement('style');
    // font_style.type = 'text/css';
    // font_style.innerText = `@font-face {
    //   font-family: '${this.props.data.name}';
    //   font-style: normal;
    //   font-weight: 400;
    //   src: local('${this.props.data.name}'), url(${font_url}) format('truetype');
    // }`;
    // font_style.onload = () => {
    //   console.log(`${this.props.name} loaded !`);
    //   this.setState({loaded: true});
    // };
    //
    // document.head.appendChild(font_style);
    if (document.fonts)
    {
      const font = new FontFace(this.props.data.name, `url(${font_url})`);
      document.fonts.add(font);
      font.load();
      font.loaded.then(fontFace => {
        this.setState({loaded: true});
        console.info(font);
        });
    }

  }
  render() {
    if (!this.state.loaded)
      return <div>
        <hr/>
        <ReactLoading type="bars" color="#EBDBB2" className="loader" delay="0"/>
      </div>;
    return (<div style={{fontFamily: this.props.data.name}} className="font-preview">
      <hr/>
      <h2> {this.props.data.name}</h2>
      <SyntaxHighlighter style={gruvbox_dark}
                         language="javascript"
                         codeTagProps={{style: {textAlign: 'left',
                             fontFamily: this.props.data.name,
                             fontSize: '1.3em',
                             display: 'inline-block'
                           }}}
      >
        {
          `import {Component} from 'react';
class App extends Component {
    // I am a comment

    count = 0x00002A
    regex = /[abc]/
    name = 'App'

    function foo(parameter) {
        const countSquared = count * count;
        this.bar(countSquared);
    }
}`
        }
      </SyntaxHighlighter>
    </div>);
  }
}

