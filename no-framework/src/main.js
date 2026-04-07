class StateManager {
  #state = {
    todos: [
        {
            id: 1,
            title: 'aaa',
            completed: false
        }
    ],
    newToDo: ''
  };
  get state() {
    return {...this.#state};
  }
  set state(newState) {
    this.#state = { ...this.#state, ...newState };
    this.#notifyStateChanged();
  }

  #stateChangedCallbacks = [];
  subscribeStateChanged(cb) {
    this.#stateChangedCallbacks.push(cb);
  }
  unsubscribeStateChanged(cb) {
    this.#stateChangedCallbacks = this.#stateChangedCallbacks.filter(
      (c) => c !== cb,
    );
  }

  #notifyStateChanged() {
    for(const cb of this.#stateChangedCallbacks) cb({...this.#state})
  }
}

class Router {
    constructor(routes, stateManager) {
        this.routes = routes
        this.stateManager = stateManager
        window.addEventListener("hashchange", this.handleHashChange.bind(this))
    }

    navigate(path) {
        location.hash = path
    }

    handleHashChange() {
            const outlet = document.getElementById("outlet")
            const hash = location.hash.split('#')[1] ?? ""
            const route = this.routes.find(r => r.path === hash)
            const componentInstance = new route.component(stateManager, this)
            componentInstance.render(outlet)
            if(route.loader) {
                route.loader(this.stateManager)
            }
        }
}

class Component {
    constructor(stateManager, router) {
        this.stateManager = stateManager
        this.router = router
        stateManager.subscribeStateChanged(() => { this.render() })
    }
    render() {
        throw new Error('Overide in derived classes')
    }
}

class ToDoList extends Component {
    // constructor(stateManager, router) {
    //     super(stateManager, router)
    // }
    render() {
        const outlet = document.getElementById('outlet')
        outlet.innerHTML = `
            <h2>List</h2>
            <button id="add-button">Add</button>
            <ul>
            ${this.stateManager.state.todos.map(todo => `<li>${todo.title}</li>`).join("")}
            </ul>
        `
        const addButton = document.getElementById('add-button')
        addButton.addEventListener("click", () => {
            this.router.navigate("new")
        })
    }
}

class ToDoForm extends Component {
    render() {
        const outlet = document.getElementById('outlet')
        outlet.innerHTML = `
            <h2>New todo</h2>
            <form id="todo-form">
                <input value="${this.stateManager.state.newToDo}" id="new-todo-input" name="new-todo" />
                <button>Save</button>
            </form>
        `

        const todoForm = document.getElementById('todo-form')
        todoForm.addEventListener("submit", async (e) => {
            e.preventDefault()
            await fetch('http://localhost:3000/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: this.stateManager.state.newToDo,
                    completed: false
                })
            })
            this.router.navigate("")
        })

        const input = document.getElementById('new-todo-input')
        input.addEventListener("change", ()=>{
            this.stateManager.state = {newToDo: input.value}
        })
    }
}

const stateManager = new StateManager()
const router = new Router([
    {
        path: "",
        component: ToDoList,
        loader: async (stateManager) => {
            const res = await fetch('http://localhost:3000/api/todos')
            stateManager.state = {
                todos: await res.json()
            }
        }
    },
    {
        path: "new",
        component: ToDoForm
    }
], stateManager)
router.handleHashChange()
router.navigate("")




