import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

import store from "../store/store";

import { Autocomplete, Input } from "@mui/joy";

import cl from "./style.module.sass";

const NumForm = observer(({ keys, disabled = false }) => {
  return (
    <div className={cl.numForm}>
      {!disabled ? (
        <div className={cl.numForm}>
          <Autocomplete
            placeholder="Currency"
            options={store.currenciesNames}
            getOptionLabel={(data) => data.fullName}
            size="lg"
            onChange={(event, currencie) => {
              currencie
                ? store.selectCurrencie(currencie.shortName, keys[0])
                : store.selectCurrencie("", keys[0]);
            }}
            className={cl.Currencie}
            loading={store.isLoading}
            value={
              store.selectedCurrencies.firstCurrencie === undefined
                ? ""
                : store.selectedCurrencies.firstCurrencie
            }
          />
          <Input
            size="lg"
            type="number"
            onChange={(e) =>
              store.selectCurrencie(parseInt(e.target.value, 10), keys[1])
            }
            value={
              store.selectedCurrencies.num === NaN
                ? ""
                : store.selectedCurrencies.num
            }
            disabled={disabled}
          />
        </div>
      ) : (
        <div className={cl.numForm}>
          <Autocomplete
            placeholder="Currency"
            options={store.currenciesNames}
            getOptionLabel={(data) => data.fullName}
            size="lg"
            onChange={(event, currencie) => {
              currencie
                ? store.selectCurrencie(currencie.shortName, keys[0])
                : store.selectCurrencie("", keys[0]);
            }}
            className={cl.Currencie}
            loading={store.isLoading}
            value={
              store.selectedCurrencies.secondCurrencie === undefined
                ? ""
                : store.selectedCurrencies.secondCurrencie
            }
          />
          <Input
            size="lg"
            value={
              store.selectedCurrencies.exchangeRate === NaN
                ? ""
                : store.selectedCurrencies.exchangeRate
            }
            disabled={disabled}
            style={{ color: "#000", borderColor: "#D8D8DF" }}
          />
        </div>
      )}
    </div>
  );
});

export default NumForm;
