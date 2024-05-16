import { useDBStore } from "~/stores/db";
const tableName = "session";
export default defineNuxtPlugin({
  name: "indexDB",
  parallel: true,
  enforce: "post",
  async setup() {
    const request = window.indexedDB.open("db", 1);
    const store = useDBStore();

    request.onerror = (event) => {
      useToast().add({
        title: "Une erreur est survenu avec la base de données",
        icon: "i-heroicons-x-circle",
        color: "red",
      });
      store.open = false;
    };

    request.onsuccess = (e) => {
      console.log("DB open");
      store.open = true;
      store.db = e.target.result;
      store.fetch();
    };
    request.onupgradeneeded = (e) => {
      store.db = e.target.result;
      if (!store.db.objectStoreNames.contains(tableName)) {
        store.db.createObjectStore(tableName, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };
  },
});
