import flyd from "flyd";
import merge from "mergerino";

// merge : (state, val) => state
window.merge = merge;

// State
const stateStream = flyd.stream();

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

const states = flyd.scan(merge, initialState, stateStream);

// Actions
const addAction = (state) => ({ ...state, user: { age: state.user.age + 1 } });

const subtractAction = (state) => ({
  ...state,
  user: { age: state.user.age - 1 },
});

// View
const addButton = document.getElementById("add");
const subtractButton = document.getElementById("subtract");
const viewState = document.getElementById("state");
addButton.onclick = () => stateStream(addAction);
subtractButton.onclick = () => stateStream(subtractAction);

states.map((state) => {
  viewState.innerText = state.user.age;
  console.log(state);
  return state;
});
