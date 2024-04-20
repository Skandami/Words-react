import { action, observable, makeObservable } from "mobx";

class WordStore {
  words = [];
  loading = false;

  constructor() {
    makeObservable(this, {
      words: observable,
      loading: observable,
      fetchWords: action,
    });
  }

  fetchWords = async () => {
    this.loading = true;
    try {
      const response = await fetch(
        "http://itgirlschool.justmakeit.ru/api/words"
      );
      const data = await response.json();
      this.words = data;
    } catch (error) {
      console.error("Error fetching words:", error);
    } finally {
      this.loading = false;
    }
  };
}

export default new WordStore();
