

const readline = require('readline');
const fs = require('fs');
const FILE_PATH = process.argv[3] || '/home/rp/Downloads/forLong/news_representative_words_output.txt';

export default class ProcessTopicFile {
  constructor( filePath ) {
    this.filePath = filePath || FILE_PATH;
  }

  async getData() {

    let result = {};

    try {
      result = await extractDataFromFile( this.filePath );
    }
    catch (e) {
      console.error(e);
    }

    return result;
  }
}

function extractDataFromFile( filePath ) {
  return new Promise(
    (resolve, reject) => {
      const rl = readline.createInterface({
        input: fs.createReadStream( filePath )
      });

      let data = [],
          cache = '';

      rl.on('line', (line) => {
        cache += line;

        if (line == '}') {
          // console.log('Line from file:', JSON.stringify( JSON.parse(cache) ) );
          data.push( JSON.parse(cache) );
          cache = '';
        }
      });

      rl.on('close', () => {
        resolve(data);
      });
    }
  );
}
