import { makeAutoObservable, toJS } from "mobx";
import axios from "axios";
import constants from "../constants/constants";

class Store {
  currencies = {};
  currenciesNames = [];
  isLoading = true;

  selectedCurrencies = {
    exchangeRate: NaN,
    num: NaN,
    firstCurrencie: undefined,
    secondCurrencie: undefined,
  };

  constructor() {
    makeAutoObservable(this);
  }

  async getCurrencies() {
    const res = await axios(constants.CURRENCIES_URL);

    this.currencies = res.data;

    for (let currencie in this.currencies) {
      const newCurrencieName = {
        shortName: currencie.toString(),
        fullName: this.currencies[currencie].toString(),
        id: Date.now(),
      };

      if (newCurrencieName.fullName !== "")
        this.currenciesNames.push(newCurrencieName);
    }

    this.isLoading = false;
  }

  async selectCurrencie(data, key) {
    const fetchExchangeRate = async () => {
      if (
        this.selectedCurrencies.num === 0 ||
        this.selectedCurrencies.firstCurrencie === undefined ||
        this.selectedCurrencies.secondCurrencie === undefined
      )
        return false;
      this.selectedCurrencies.exchangeRate = "Loading...";
      const res = await axios(
        `${constants.EXCHANGE_RATE_URL}/${this.selectedCurrencies.firstCurrencie}/${this.selectedCurrencies.secondCurrencie}.json`
      );

      this.selectedCurrencies.exchangeRate =
        res.data[this.selectedCurrencies.secondCurrencie] *
        this.selectedCurrencies.num;
    };

    this.selectedCurrencies[key] = data;
    console.log(toJS(this.selectedCurrencies));

    if (Object.keys(this.selectedCurrencies).length === 4) fetchExchangeRate();
  }

  swapCurrencies() {
    const swap = (x, y) => [y, x];

    [this.selectedCurrencies.num, this.selectedCurrencies.exchangeRate] = swap(
      this.selectedCurrencies.num,
      this.selectedCurrencies.exchangeRate
    );

    [
      this.selectedCurrencies.firstCurrencie,
      this.selectedCurrencies.secondCurrencie,
    ] = swap(
      this.selectedCurrencies.firstCurrencie,
      this.selectedCurrencies.secondCurrencie
    );

    console.log(toJS(this.selectedCurrencies));
  }
}

export default new Store();
