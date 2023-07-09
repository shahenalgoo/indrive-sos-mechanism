import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
    precautionsModal: false as boolean,
    rideDetailsModal: false as boolean,
    sosModal: false as boolean,
    sosInitiated: false as boolean
});

export { useGlobalState, setGlobalState };