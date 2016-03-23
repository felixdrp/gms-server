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
    let data = JSON.parse(JSON.stringify( this.props.data ));

    if ( this.state.showAllStory == false && data.story.length > 0 ) {
      let temp = data.story.split(' ');

      if ( temp.length > 34 ) {
        data.story = data.story.match(/([\w\'\"\%\&]+\s){34}/);
      }
    }

    return (
      <div className={'story-item'}>
        <a href={ data.url } target={'_blank'}><h3>{ data.title }</h3></a>
        <p className="url">{ data.url }</p>
        <h4 onClick={ () => this.onClickShowFullStory() } >
          { data.story }
          <span
            style={{
              color: '#BABAFD',
              cursor: 'pointer',
            }}
          >
            { ( this.state.showAllStory )? ' ...less' : ' ...more' }
          </span>
        </h4>
      </div>
    );
  }
}
