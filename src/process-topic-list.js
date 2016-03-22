import Immutable from 'immutable'
import ProcessTopicFile from './process-topic-file';

var fs = require('fs');

const PATH_TOPIC_FILES = '/home/rp/Downloads/forLong/';

const topicFilesPath = {
  WORDS: PATH_TOPIC_FILES + 'news_representative_words_output.txt',
  NEWS: PATH_TOPIC_FILES + 'news_documents_output.txt',
  TWEETS: PATH_TOPIC_FILES + 'tweets_documents_output.txt',
};

const outputFilename = './src/graphql/data-topic-list-real.json';


async function processWords() {
  var topicFile = new ProcessTopicFile( topicFilesPath.WORDS );
  let final = {};
  let data = await topicFile.getData();
  data.map(
    (obj) => {
      if (!final[obj.topic]) {
        final[obj.topic] = { words: [] };
      }
      final[obj.topic].words.push(obj.word)
    }
  )
  // console.log( { topics: final } );
  return final;
};

async function processNews() {
  let topicFile = new ProcessTopicFile( topicFilesPath.NEWS );
  let final = {};
  let data = await topicFile.getData();
  data.map(
    (obj) => {
      if (!final[obj.topic]) {
        final[obj.topic] = {
          urls: [],
          documents: [],
        };
      }
      final[obj.topic].urls.push(obj.url);
      final[obj.topic].documents.push(obj.document);
    }
  )
  // console.log( { topics: final } );
  return final;
};

async function processTweets() {
  let topicFile = new ProcessTopicFile( topicFilesPath.TWEETS );
  let final = {};
  let data = await topicFile.getData();
  data.map(
    (obj) => {
      if (!final[obj.topic]) {
        final[obj.topic] = { tweets: [] };
      }
      final[obj.topic].tweets.push(obj.document)
    }
  )
  // console.log( { topics: final } );
  return final;
};

(async () => {

  console.time('Processin Files');
  let topicList = (
    Immutable.fromJS( {} )
    .mergeDeep( await processWords() )
    .mergeDeep( await processNews() )
    .mergeDeep( await processTweets() )
  );
  console.timeEnd('Processin Files');

  // console.log(
  //   topicList
  // )

  topicList.toObject()
  topicList.toArray()
  topicList.toJS()

  // console.log(
  //   JSON.stringify( topicList , null, 2 )
  // )

  fs.writeFile(outputFilename, JSON.stringify( { topics: topicList } , null, 2), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to " + outputFilename);
      }
  });

})();

// print process.argv
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});
