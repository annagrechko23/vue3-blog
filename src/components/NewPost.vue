<template>
  <div>
    <post-writer :post="newPost" 
    @save="save"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PostWriter from "./PostWriter.vue";
import { Post } from "../mocks";
import moment from "moment";
import { useStore } from '../store'
import {useRouter} from 'vue-router'

export default defineComponent({
  components: { PostWriter },
  setup() {
     const store = useStore()
    const router = useRouter()
    const authorId = store.getState().authors.currentUserId
    if(!authorId) {
      throw Error('User not found')
    }
    const newPost: Post = {
      id: "-1",
      title: "Enter title",
      created: moment().subtract(1, 'second'),
      authorId: authorId
    };
   
    const save = async(post: Post) => {
    await  store.createPosts(post)
      router.push('/')
    }
    return {
      newPost,
      save,
    };
  },
});
</script>
