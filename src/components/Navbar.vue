<template>
<div class="navbar">
    <div class="navbar-end">
        <div class="buttons" v-if="auth">

            <router-link :to="{ name: 'NewPost' }" class="button">
                New Post
            </router-link>
            <button class="button" @click="signOut">Sign Out</button>
        </div>
        <div class="buttons" v-else>
            <button class="button" @click="signUp">Sign Up</button>
        </div>

    </div>
</div>

<teleport to="#modal">
    <component :is="component" />
</teleport>
</template>

<script lang="ts">
import {
    defineComponent,
    computed,
    h,
    markRaw
} from "vue";
import {
    useModal
} from '../useModal'
import SignUp from "./SignUp.vue";
import {useRouter} from 'vue-router'
import {
    useStore
} from '../store'

export default defineComponent({
    components: {
        SignUp
    },
    setup() {
        const modal = useModal()
        const store = useStore()
        const router = useRouter()
        const auth = computed(() => {
            return !!store.getState().authors.currentUserId
        })
      
        const signUp = () => {
            modal.component.value = markRaw(SignUp)
            modal.showModal()
        }
        const signOut = async() => {
         await store.signOut()
           router.push('/')
        }

        return {
            component: modal.component,
            signUp,
            signOut,
            auth
        }
    }
});
</script>
