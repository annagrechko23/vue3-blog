<template>
<div class="message is-primary is-marginless">
    <div class="message-header">
        <div>
            Posts for {{currentPeriod.toLowerCase()}}
        </div>
    </div>
</div>
<nav class="is-primary panel">
    <span class="panel-tabs">
        <a v-for="period in periods" :key="period" :data-test="period" :class="{'is-active': period === currentPeriod}" @click="setPeriod(period)">
            {{period}}
        </a>
    </span>
    <TimelinePost v-for="post in posts" :post="post" :key="post.id" class="panel-block" />
</nav>
</template>

<script lang="ts">
import moment from 'moment'
import TimelinePost from './TimelinePost.vue'
import {
    Post
} from '../mocks'
import {
    defineComponent,
    ref,
    computed
} from 'vue';
import {
    useStore
} from './../store'

type Period = 'Today' | 'This Week' | 'This Month'

export default defineComponent({
    name: 'Timeline',
    components: {
        TimelinePost
    },
    async setup() {
        const periods: Period[] = ['Today', 'This Week', 'This Month']
        const currentPeriod = ref < Period > ('Today')
        const store = useStore()

        if (!store.getState().posts.loaded) {
            await store.fetchPosts()
        }
        const allPosts: Post[] = store.getState().posts.ids.reduce < Post[] > ((acc, id) => {
            const thePost = store.getState().posts.all.get(id)
            if (!thePost) {
                throw Error('This Post was not found')
            }
            return acc.concat(thePost)
        }, [])
        const posts = computed(() => {
            return allPosts.filter(post => {
                if (currentPeriod.value === 'Today') {
                    return post.created.isAfter(moment().subtract(1, 'day'))
                }
                if (currentPeriod.value === 'This Week') {
                    return post.created.isAfter(moment().subtract(1, 'week'))
                }
                if (currentPeriod.value === 'This Month') {
                    return post.created.isAfter(moment().subtract(1, 'month'))
                }
                return false
            })
        })
        const setPeriod = (period: Period) => {
            currentPeriod.value = period
        }

        return {
            periods,
            currentPeriod,
            setPeriod,
            posts,
            moment
        }
    }
});
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

</style>
