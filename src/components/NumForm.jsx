import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

import store from "../store/store";

import { Autocomplete, Input } from "@mui/joy";

import cl from "./style.module.sass";

const NumForm = observer(({ keys, disabled = false }) => {
  const [num, setNum] = useState();
  const [currencieShortName, setCurrencieShortName] = useState();

  useEffect(() => {
    if (!disabled) {
      if (num !== undefined) store.selectCurrencie(num, keys[1]);
      if (currencieShortName !== undefined)
        store.selectCurrencie(currencieShortName, keys[0]);
    } else store.selectCurrencie(currencieShortName, keys[0]);
  }, [currencieShortName, num]);

  return (
    <div className={cl.numForm}>
      <Autocomplete
        placeholder="Currency"
        options={store.currenciesNames}
        getOptionLabel={(data) => data.fullName}
        size="lg"
        onChange={(event, currencie) => {
          currencie
            ? setCurrencieShortName(currencie.shortName)
            : setCurrencieShortName("");
        }}
        className={cl.Currencie}
        loading={store.isLoading}
      />
      {!disabled ? (
        <Input
          size="lg"
          type="number"
          onChange={(e) => setNum(e.target.value)}
          value={num}
          disabled={disabled}
        />
      ) : (
        <Input
          size="lg"
          onChange={(e) => setNum(e.target.value)}
          value={store.selectedCurrencies.exchangeRate}
          disabled={disabled}
          style={{ color: "#000", borderСolor: "#D8D8DF" }}
        />
      )}
    </div>
  );
});

export default NumForm;
