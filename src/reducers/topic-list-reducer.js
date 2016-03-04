import {
  ADD_TOPIC_LIST
} from '../actions/actions'

function addTopicList(state, action) {
  let data = action.topicList;
  return {
    ...state,
    [data.offset] : {
      timestamp: data.timestamp,
      topicList: data.topics
    }
  }
}

export default function topicListPage(state = [], action) {
  switch (action.type) {
    case ADD_TOPIC_LIST:
      return addTopicList(state, action);
    default:
      return state
  }
}
