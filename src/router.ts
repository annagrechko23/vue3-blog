import {
    createRouter,
    createWebHistory
} from 'vue-router'
import Home from './components/Home.vue'
import NewPost from './components/NewPost.vue'
import ShowEditPost from './components/ShowEditPost.vue'

import { Store } from './store'


export function routerWithStore(store: Store) {

    const router = createRouter({
        history: createWebHistory(),
        routes: [
            {
                path: '/',
                component: Home
            },
            {
                path: '/posts/:id/',
                component: ShowEditPost,
                meta: {
                    edit: false,
                }
            },

            {
                path: '/posts/:id/edit',
                component: ShowEditPost,
                meta: {
                    edit: true,
                    requiredAuth: true
                }

            },
            {
                path: '/posts/new',
                name: 'NewPost',
                component: NewPost,
                meta: {
                    requiredAuth: true
                }
            }
        ]
    })

    router.beforeEach((to, from, next) => {
        const auth = !!store.getState().authors.currentUserId
        if (!to.meta.requiredAuth) {
            next()
            return
        }
        if (to.meta.requiredAuth && auth) {
            next()
        } else {
            next({
                path: '/'
            })
        }
    })
    return router
}