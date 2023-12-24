import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
export const GET_FAVS_FROM_LS = "GET_FAVS_FROM_LS";
export const FAV_ADD = "FAV_ADD";
export const FAV_REMOVE = "FAV_REMOVE";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_LOADING = "FETCH_LOADING";
export const FETCH_ERROR = "FETCH_ERROR";

export const getFavsFromLocalStorage = () => {
  return { type: GET_FAVS_FROM_LS }
}

export const addFav = (info) => {
  toast.info("Favorilere Eklendi",{
    theme:"colored"
  })
  const data={
  ...info,id:Date.now()
  }
  return { type: FAV_ADD, payload: data }
  
}

export const removeFav = (id) => {
  toast.warning("Favorilerden Çıkarıldı",{
    theme:"colored"
  })
  return { type: FAV_REMOVE, payload: id }
}

export const fetchAnother = () => (dispatch) => {
  const id = toast.loading("Please wait...")
  dispatch({type:FETCH_LOADING})
  axios.get('https://www.boredapi.com/api/activity')
  .then(function (response) {
    // handle success
    console.log("data:",response);
     dispatch({type:FETCH_SUCCESS,payload:response.data})
      toast.update(id, { render: "Sayfa Yüklendi", type: "success", isLoading: false });
  })
  .catch(function (error) {
    // handle error
    console.log("error");
    dispatch({type:FETCH_ERROR,payload:error.message})
    toast.update(id, { render: "Sayfa yüklenemedi", type: "error", isLoading: false,theme:"colored"});
  })
}