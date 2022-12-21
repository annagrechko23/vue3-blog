import { Post, today, thisMonth, thisWeek } from './mocks';
import { reactive, readonly, provide, inject, App } from "vue";
import axios from 'axios'


export interface User {
    id: string
    username: string
    password: string
}

export type Author = Omit<User, 'password'>

interface BaseState<T> {
    ids: string[]

    all: Map<string, T>

    loaded: boolean
}
type PostsState = BaseState<Post>

interface AuthorState extends BaseState<Author> {
    currentUserId: string | undefined
}
export const storKey = Symbol('store')
export interface State {
    authors: AuthorState,
    posts: PostsState
}
export class Store {
    private state: State

    constructor(initial: State) {
        this.state = reactive(initial)
    }
    install(app: App) {
        app.provide(storKey, this)
    }
    getState() {
        return readonly(this.state)
    }
    async fetchPosts() {
        const response = await axios.get<Post[]>('/posts')

        const postsState: PostsState = {
            ids: [],
            all: new Map,
            loaded: true
        }
        for (const post of response.data) {
            postsState.ids.push(post.id)
            postsState.all.set(post.id, post)
        }
        this.state.posts = postsState
    }
    async createPosts(post: Post) {
        const response = await axios.post<Post>('/posts', post)
        this.state.posts.all.set(response.data.id, response.data)
        this.state.posts.ids.push(response.data.id)

    }
    async updatePosts(post: Post) {
        const response = await axios.put<Post>('/posts', post)
        this.state.posts.all.set(response.data.id, response.data)
    }
    
    async createUser(user: User) {
        const response = await axios.post<Author>('/users', user)
        this.state.authors.all.set(response.data.id, response.data)
        this.state.authors.ids.push(response.data.id)
        this.state.authors.currentUserId = response.data.id
    }
    async signOut() {
        const response = await axios.delete<Author>('/users')
        this.state.authors.currentUserId = undefined
    }
}
const all = new Map<string, Post>()


export const store = new Store({
    authors: {
        all: new Map<string, Author>(),
        ids: [],
        loaded: false,
        currentUserId: undefined
    },
    posts: {
        all,
        ids: [],
        loaded: false
    }
})
export function useStore(): Store {
    const _store = inject<Store>(storKey)
    if(!_store) {
        throw Error ( 'Provide store'
        
        )
    }
    return _store
}

store.getState().posts.loaded