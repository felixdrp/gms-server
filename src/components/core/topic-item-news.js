import React from 'react'

export default class TopicItemNews extends React.Component {

  constructor() {
    super()
    this.state = {
      showAllStory: false,
    };
  }

  onClickShowFullStory(e) {
    this.setState({ showAllStory: !this.state.showAllStory });
  }

  render() {
    // Create a data copy
    let data = JSON.parse(JSON.stringify( this.props.data )),
        phraseNumberWords = 34;

    // Show a maximun number of words of each news.
    if ( this.state.showAllStory == false && data.story.length > 0 ) {
      let temp = data.story.split(' ');

      if ( temp.length > phraseNumberWords ) {
        data.story = data.story.match( RegExp( '([\\w' + "\\'" + '\\"\\%\\&]+\\s){' + phraseNumberWords + '}' ) )[0];
      }
    }

    return (
      <div className={'story-item'}>
        <a href={ data.url } target={'_blank'}><h3>{ data.title }</h3></a>
        <p className="url">{ data.url }</p>
        <h4>
          { data.story }
          <span
            onClick={ () => this.onClickShowFullStory() }
            className="show-more"
            style={{
            }}
          >
            { ( this.state.showAllStory )? ' ...less' : ' ...more' }
          </span>
        </h4>
      </div>
    );
  }
}
