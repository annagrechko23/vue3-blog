
import { mount } from "@vue/test-utils";
import NewPost from '../../src/components/NewPost.vue'
import { Store } from '../../src/store'
import { useRouter } from 'vue-router';
let routes: string[] = []
jest.mock('vue-router', () => ({
  useRouter: () => {
    return {
      push: (route: string) => {
        routes.push(route)
      }
    }
  }
}))
jest.mock('axios', () => ({
  post: (url: string, payload: any) => {
    return {
      data: payload
    }
  }
}))
describe('NewPost', () => {
  const store = new Store({
    posts: {
      ids: [],
      all: new Map(),
      loaded: false
    },
    authors: {
      ids: [],
      all: new Map([['100', {username: 'username', id: '100'}]]),
      loaded: false,
      currentUserId: '100'
    }
  })
  beforeEach(() => {
    routes = []
  })
  it('create a post and redirect', async () => {
    const wrapper = mount(NewPost, {
      global: {
        plugins: [store]
      }
    })
    expect(store.getState().posts.ids).toHaveLength(0)
    await wrapper.find('[data-test="submit"]').trigger('click')
    expect(store.getState().posts.ids).toHaveLength(1)
    expect(routes).toEqual(['/'])
  })
})