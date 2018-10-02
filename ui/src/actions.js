import { createActions, handleActions } from 'redux-actions';
import fetch from 'cross-fetch';

const defaultState = {
  subdomain: '', // The VICE subdomain we're working with.
  job: '',       // The job UUID from the database.

  // entities contains the objects retrieved from the server stored in a map
  // for easy reference in other objects.
  entities : {

    // updates contains the job status updates returned by the server. An
    // individual status update looks like the following:
    // {
    //   status: '',  one of Running, Completed, Failed, Submitted, Canceled
    //   message: '', the actual message from the job
    //   sentOn: ''   the date the message was sent, as milliseconds since the epoch
    // }
    updates: {},
  }
}

// Synchronous actions.
export const { addUpdate, setSubdomain, getJob, setJob } = createActions({
  ADD_UPDATE:      (update = {})    => update,
  //REQUEST_UPDATES: (job = '')       => job,
  // RECEIVE_UPDATES: (json = {
  //   job_status_updates: []
  // }) => ({
  //   updates: json.job_status_updates
  // }),
  SET_SUBDOMAIN:   (subdomain = '') => subdomain,
  GET_JOB:         (subdomain = '') => subdomain,
  SET_JOB:         (job = '')       => job
});


// Async actions that dispatch actions defined above, so it needs to be set up
// separately.
export let fetchUpdates = () => {
  return dispatch => {
    // let proto = window.location.protocol;
    // let host = window.location.host;
    return fetch(`/api/jobs/status-updates?url=${encodeURI(window.location.href)}`)
      .then(
        response => {
          if (response.status >= 400) {
            throw new Error(`error from server: ${response.status}: `, response.text());
          }
          return response.json();
        },
        error => console.log('error fetching status updates', error)
      ).then(
        json => {
          json.job_status_updates.forEach(i => dispatch(addUpdate(i)));
        }
      ).catch(function(error) {
        console.log('error from server: ', error.message);
      })
  };
}

export const reducer = handleActions(
  {
    ADD_UPDATE: (state, action) => {
      return Object.assign({}, state, {
        entities: Object.assign({}, state.entities, {
          updates: Object.assign({}, state.entities.updates, {
            [Object.keys(state.entities.updates).length]: action.payload
          })
        })
      })
    },
    SET_SUBDOMAIN: (state, action) => {
      return Object.assign({}, state, {
        subdomain: action.payload
      })
    },
    SET_JOB: (state, action) => {
      return Object.assign({}, state, {
        job: action.payload
      })
    }
  },
  defaultState
)
