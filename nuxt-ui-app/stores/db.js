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
        const serialisedElement = { ...element };
        Object.keys(serialisedElement).forEach((key) => {
          if (
            typeof serialisedElement[key] !== "number" &&
            typeof serialisedElement[key] !== "string"
          ) {
            serialisedElement[key] = JSON.stringify(serialisedElement[key]);
          }
        });
        console.log(serialisedElement);
        const request = this.session().add(serialisedElement);
        request.onsuccess = () => {
          this.data.push(element);
          resolve();
        };
        request.onerror = () => {
          console.log("erreur à l'ajout");
        };
      });
    },
  },
});
