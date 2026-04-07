class StateManager {
  #state = {};

  get state() {
    return this.#state;
  }

  setState(newState) {
    this.#state = { ...this.#state, ...newState };
    this.#notifyChange();
  }

  #changeCallbacks = [];

  subscribe(callback) {
    this.#changeCallbacks.push(callback);
  }

  unsubscribe(callback) {
    this.#changeCallbacks = this.#changeCallbacks.filter(
      (cb) => cb !== callback,
    );
  }

  #notifyChange() {
    this.#changeCallbacks.forEach((callback) => callback(this.#state));
  }
}

class Router {
  constructor(routes, stateManager) {
    this.routes = routes;
    this.stateManager = stateManager;
    window.addEventListener("hashchange", this.handleRouteChange.bind(this));
  }

  navigate(path) {
    const route = this.routes.find((r) => r.path === path);
    if (route && route.loader) {
      route.loader(this.stateManager);
    }
    if (route && route.action) {
      route.action(this.stateManager);
    }
    window.location.hash = path;
  }

  handleRouteChange() {
    console.log("Route changed:", window.location.hash);
    const path = window.location.hash.slice(1);
    const route = this.routes.find((r) => r.path === path);
    if (route) {
      new route.component(this.stateManager).render();
    }
  }
}

class Component {
  constructor(stateManager) {
    this.stateManager = stateManager;
    this.stateManager.subscribe(this.render.bind(this));
  }

  render() {
    throw new Error("Render method must be implemented by subclass");
  }
}

class App extends Component {
  constructor(stateManager) {
    super(stateManager);
    this.stateManager.setState({
      title: "Todo List",
      todos: [],
    });
  }

  render() {
    const { title } = this.stateManager.state;
    const appElement = document.getElementById("app");
    appElement.innerHTML = `
    <h1>${title}</h1>
    <div id="outlet" />
    `;
  }
}

class ToDoList extends Component {
  render() {
    const { todos } = this.stateManager.state;
    const outlet = document.getElementById("outlet");
    outlet.innerHTML = `
      <h2>List</h2>
      <ul>
        ${todos.map((todo) => `<li>${todo.title}</li>`).join("")}
      </ul>
      <button id="create-btn">Create Todo</button>
    `;

    document.getElementById("create-btn").addEventListener("click", () => {
      router.navigate("create");
    });
  }
}

class ToDoForm extends Component {
  render() {
    const outlet = document.getElementById("outlet");
    outlet.innerHTML = `
      <input type="text" value="${this.stateManager.state.newTodo || ""}" id="todo-input" placeholder="Enter todo" />
      <button id="add-btn">Add Todo</button>
    `;

    document.getElementById("todo-input").addEventListener("input", (e) => {
      this.stateManager.setState({ newTodo: e.target.value });
    });

    document.getElementById("add-btn").addEventListener("click", async () => {
      const input = document.getElementById("todo-input");
      const newTodo = input.value.trim();
      if (newTodo) {
        const { todos } = this.stateManager.state;
        this.stateManager.setState({ todos: [...todos, newTodo] });
        const res = await fetch("http://localhost:3000/api/todos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: stateManager.state.newTodo, completed: false }),
        });
        router.navigate("");
      }
    });
  }
}

const stateManager = new StateManager();
const router = new Router(
  [
    {
      path: "",
      component: ToDoList,
      loader: async (stateManager) => {
        const res = await fetch("http://localhost:3000/api/todos");
        const todos = await res.json();
        stateManager.setState({ todos });
      },
    },
    {
      path: "create",
      component: ToDoForm,
      
    },
  ],
  stateManager,
);
const app = new App(stateManager, router);
app.render();
router.handleRouteChange();
router.navigate("");
