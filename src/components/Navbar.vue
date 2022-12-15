<template>
    <div class="navbar">
        <div class="navbar-end">
            <div class="buttons">
            <button class="button" @click="show">Sign Up</button>
                <router-link 
                :to="{ name: 'NewPost' }"
                class="button">
                New Post
                </router-link>
            </div>
        </div>
    </div>

    <teleport to="#modal">
       <sign-up />
    </teleport>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import {useModal} from '../useModal'
import SignUp from "./SignUp.vue";

export default defineComponent({
  components: {
    SignUp
  },
  setup() {
    const modal = useModal()
   
    return {
      show: () => {
        modal.showModal()
      }
    }
  }
});
</script>