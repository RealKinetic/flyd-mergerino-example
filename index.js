import flyd from "flyd";
import merge from "mergerino";

// merge : (state, val) => state
window.merge = merge;

// State
const state = flyd.stream();

const initialState = {
  user: {
    name: "John",
    weight: 180,
    age: 34,
    height: 177,
  },
  other: {
    many: true,
    properties: true,
  },
};

const states = flyd.scan(merge, initialState, state);

// Actions
const addAction = (state) => ({ ...state, counter: state.counter + 1 });
const subtractAction = (state) => ({ ...state, counter: state.counter - 1 });

// View
const addButton = document.getElementById("add");
const subtractButton = document.getElementById("subtract");
const viewState = document.getElementById("state");
addButton.onclick = () => state(addAction);
subtractButton.onclick = () => state(subtractAction);

states.map((state) => {
  viewState.innerText = state.counter;
  console.log(state);
  return state;
});
