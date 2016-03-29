import React from 'react'

export default class TopicItemWords extends React.Component {

  constructor() {
    super()
    this.state = {
      showAllWords: false,
    };
  }

  onClickShowFullStory(e) {
    this.setState({ showAllWords: !this.state.showAllWords });
  }

  render() {
    // Create a data copy
    let data = JSON.parse(JSON.stringify( this.props.data )),
        words = data.wordsByFrequency,
        wordFreq = [],
        max = words.length,
        j = 0;

    const numberWords = 21;

    if (
      this.state.showAllWords == false &&
      words.length > numberWords
    ) {
      max = numberWords;
    }

    for (j = 0|0; j < max; j++) {
      wordFreq.push(
        <span
          key={j}
          title={ 'Freq ' + words[j].frequency }
          style={{
          }}
        >
          { words[j].word + ' ' }
        </span>
      );
    }

    return (
      <div className={'word-freq'}>
        { wordFreq }
        <span
          onClick={ () => this.onClickShowFullStory() }
          className="show-more"
          style={{
          }}
        >
          { ( this.state.showAllWords )? ' ...less' : ' ...more' }
        </span>
      </div>
    );
  }
}
