import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
    sosModal: false as boolean,
    sosInitiated: false as boolean
});

export { useGlobalState, setGlobalState };