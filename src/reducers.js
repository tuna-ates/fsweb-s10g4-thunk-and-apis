import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
} from "./actions";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: true,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:

    const favAdded={...state,favs:[...state.favs,action.payload]};
    writeFavsToLocalStorage(favAdded)
      return favAdded

    case FAV_REMOVE:
      const remoFav={...state,favs:[...state.favs.filter((item)=>item.id!==action.payload)]};
      writeFavsToLocalStorage(remoFav)
      return remoFav

    case FETCH_SUCCESS:
      return {...state,current:action.payload,loading:false,error:null};

    case FETCH_LOADING:
      return {...state,loading:true};

    case FETCH_ERROR:
      return {...state,error:action.payload,loading:false};

    case GET_FAVS_FROM_LS:
      return {...state,favs:readFavsFromLocalStorage()||[]};

    default:
      return state;
  }
}
