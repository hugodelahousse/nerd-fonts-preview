import React, {Component} from 'react';
import Font from './Font';
import axios from  'axios'

export default class Fonts extends Component {
  constructor(props) {
    super(props);
    this.state = {fonts: [], token: ""};
    this.getFonts()
  }


  getFonts = () => {
    console.log();
    axios('https://api.github.com/repos/ryanoasis/nerd-fonts/git/trees/master', {
      params: {
        "recursive": 1
      }
    }).then(response => {
      const template = RegExp(/^patched-fonts\/([^\/]*)\/(Regular\/)?complete\/.*Nerd Font Complete\.ttf/);
      let fonts = response.data.tree.filter(file => template.test(file.path));
      fonts.forEach(font => {
        const match = template.exec(font.path);
        font.name = match[1];
      });
      this.setState({fonts: fonts});
    }).catch(response => {
      alert(response.data.message);
    });
  };

  render() {
    return <div>
      <h1>Nerd Fonts Preview</h1>
      {this.state.fonts.map(data => <Font key={data.path} data={data}/>)}
    </div>;
  }
}