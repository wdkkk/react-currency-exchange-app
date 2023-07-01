import { useEffect } from "react";
import store from "../store/store";

const useFetchingCurrencies = () => {
  useEffect(() => {
    store.getCurrencies();
  }, []);
};

export default useFetchingCurrencies;
