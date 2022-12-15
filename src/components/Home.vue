<template>
  <Suspense>
          <template #default> 
            <Timeline />
  
          </template>
          <template #fallback>
          <Spinner/>
          </template>
      </Suspense>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import Timeline from "./Timeline.vue";
  import Spinner from './Spinner.vue'
  export default defineComponent({
    name: "App",
    components: {
      Timeline,
      Spinner,
    },
  });
  </script>
  
