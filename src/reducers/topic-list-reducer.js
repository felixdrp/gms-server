import {
  ADD_TOPIC_LIST
} from '../actions/actions'

function addTopicList(state, action) {
  return {
    ...state,
    [action.offset] : {
      timestamp: action.timestamp,
      topicList: action.topics
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
