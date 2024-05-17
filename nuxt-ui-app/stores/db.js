function serialize(element) {
  const serialisedElement = { ...element };
  Object.keys(serialisedElement).forEach((key) => {
    if (
      typeof serialisedElement[key] !== "number" &&
      typeof serialisedElement[key] !== "string"
    ) {
      serialisedElement[key] = JSON.stringify(serialisedElement[key]);
    }
  });
  return serialisedElement;
}
export const useDBStore = defineStore("DBStore", {
  state: () => ({
    open: false,
    db: null,
    data: null,
  }),
  actions: {
    async fetch() {
      this.data = [];
      const table = this.session();
      return new Promise((resolve) => {
        table.openCursor().onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor) {
            if (
              cursor.value.actions &&
              typeof cursor.value.actions == "string"
            ) {
              cursor.value.actions = JSON.parse(cursor.value.actions);
            }
            this.data.push(cursor.value);
            cursor.continue();
          } else {
            console.log("No more entries!");
            resolve();
          }
        };
      });
    },
    session() {
      return this.db
        .transaction(["session"], "readwrite")
        .objectStore("session");
    },
    async addSession(element) {
      return new Promise((resolve) => {
        const request = this.session().add(serialize(element));
        request.onsuccess = (e) => {
          element.id = e.target.result;
          this.data.push(element);
          resolve();
        };
        request.onerror = () => {
          console.log("erreur à l'ajout");
        };
      });
    },
    getSession(id) {
      return this.data.find((e) => e.id == id);
    },
    async removeSession(id) {
      return new Promise((resolve, reject) => {
        const request = this.session().delete(+id);
        request.onsuccess = () => {
          this.data = this.data.filter((e) => e.id != id);
          resolve();
        };
        request.onerror = () => {
          console.log("erreur à l'ajout");
          reject();
        };
      });
    },
    async putSession(element) {
      element.id = +element.id;
      return new Promise((resolve, reject) => {
        const objectStore = this.session();
        const request = objectStore.get(element.id);
        request.onsuccess = (e) => {
          const newRequest = objectStore.put(serialize(element));

          newRequest.onsuccess = (e) => {
            this.fetch().then(resolve);
          };
          newRequest.onerror = () => {
            console.log("erreur à l'ajout");
            reject();
          };
        };
        request.onerror = () => {
          console.log("erreur à l'ajout");
          reject();
        };
      });
    },
  },
});
