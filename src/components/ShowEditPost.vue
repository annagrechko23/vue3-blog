<template>
<Suspense>
    <template #default>
        <post-editor v-if="isEditMode" />
        <post-view v-else />
    </template>
    <template #fallback>
        <Spinner />
    </template>
</Suspense>
</template>

<script lang="ts">
import {
    defineComponent,
    computed
} from "vue";
import {
    useRoute
} from 'vue-router'
import PostView from './PostView.vue'
import Spinner from './Spinner.vue'
import PostEditor from './PostEditor.vue'

export default defineComponent({
    components: {
        PostView,
        Spinner,
        PostEditor
    },
    setup() {
        const isEditMode = computed(() => {
            return useRoute().meta.edit
        })
        return {
            isEditMode
        }
    }

});
</script>
