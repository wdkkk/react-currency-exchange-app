import store from "./store/store";
import { observer } from "mobx-react-lite";

import NumForm from "./components/NumForm";

import "./constants/style.sass";
import cl from "./style.module.sass";

import useFetchingCurrencies from "./hooks/useFetchingCurrencies";

const swapCurrencies = () => store.swapCurrencies();
const App = observer(() => {
  useFetchingCurrencies();
  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>
        The information not reliable. Made with{" "}
        <a href="https://github.com/fawazahmed0/currency-api">currency-api</a>
      </h1>

      <div className={cl.Content}>
        <NumForm keys={["firstCurrencie", "num"]} />
        {/* <div className={cl.Swap} onClick={swapCurrencies}>
          Swap
        </div> */}
        <NumForm keys={["secondCurrencie"]} disabled={true} />
      </div>
    </div>
  );
});

export default App;
