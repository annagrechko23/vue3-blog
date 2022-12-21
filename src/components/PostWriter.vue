<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">New Post</div>
        <input v-model="title" data-test="title" type="text" class="input" />
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <div contenteditable data-test="content" ref="contentEditable" @input="handleInput" />
    </div>
    <div class="column">
      <div v-html="html"></div>
    </div>
  </div>
  <div class="columns">
    <div class="column">
    <button data-test="submit" @click="save" class="button is-primary is-pulled-right">Submit</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Post } from "../mocks";
import { defineComponent, onMounted, ref, watchEffect, watch } from "vue";
import { parse } from "marked";
import highlight from "highlight.js";
import debounce from "lodash/debounce";
import { useStore } from "@/store";
import { createTSUnionType } from "@babel/types";

export default defineComponent({
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
  emits: {
    save: (post: Post) => {
        return true
    }
  },

  setup(props, ctx) {
    const title = ref(props.post.title);
    const content = ref("## Title\nEnter your post content...");
    const contentEditable = ref<HTMLDivElement | null>(null);
    const html = ref("new");

    const parseHtml = (str: string) => {
      html.value = parse(str, {
        gfm: true,
        breaks: true,
        highlight: (code: string) => {
          return highlight.highlightAuto(code).value;
        },
      });
    };

    watch(
      content,
      debounce((newVal) => {
        parseHtml(newVal);
      }, 300),
      {
        immediate: true,
      }
    );
    onMounted(() => {
      if (!contentEditable.value) {
        throw Error("never happend");
      }
      contentEditable.value.innerText = content.value;
    });
    const handleInput = () => {
      if (!contentEditable.value) {
        throw Error("never happend");
      }
      content.value = contentEditable.value.innerText || "";
    };
    const save = () => {

        const newPost: Post = {
            ...props.post,
            html: html.value,
            title: title.value,
            markdown: content.value
        }

        ctx.emit('save', newPost)
    }
    return {
      html,
      title,
      content,
      contentEditable,
      save,
      handleInput,
    };
  },
});
</script>
<style>
.column {
  overflow: scroll;
}
</style>
