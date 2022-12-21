import {Post, today} from '../../src/mocks'
import {State, Store} from '../../src/store'

import moment from "moment";
jest.mock('moment', () => {
    return () => jest.requireActual('moment')('2020-01-01T00:00:00.000Z');
  });
const mockPost: Post = {
 ...today
}
jest.mock('axios', () => ({
    get: () => {
        return {
            data: [mockPost]
        }
    },
    post: (url: string, payload: any) => {
        return {
          data: payload
        }
      }
}))
describe('store/fetchPost', () => {
    it('fetch posts', async () => {
        const store = new Store( {
            posts: {
                ids: ['1'],
                all: new Map([['1', mockPost]]),
                loaded: true
            },
            authors: {
                ids: [],
                all: new Map(),
                loaded: true,
                currentUserId: undefined
            }
        })
        store.fetchPosts()
        const expected: State = {
            posts: {
                ids: ['1'],
                all: new Map([['1', mockPost]]),
                loaded: true
            },
            authors: {
                ids: [],
                all: new Map(),
                loaded: true,
                currentUserId: undefined
            }
        }
        expect(expected).toEqual(store.getState())
    })
    it('create posts', async () => {
        const store = new Store( {
            posts: {
                ids: ['1'],
                all: new Map([['1', mockPost]]),
                loaded: true
            },
            authors: {
                ids: [],
                all: new Map(),
                loaded: true,
                currentUserId: undefined
            }
        })
        const newPost: Post = {
            id: '1',
            title: "Today",
            created:  moment().subtract('1', 'second'),
            authorId: '1'
          };
        store.createPosts(newPost)
        const expected: State = {
            posts: {
            ids: ['1'],
                all: new Map([['1', newPost]]),
                loaded: true
            },
            authors: {
                ids: [],
                all: new Map(),
                loaded: true,
                currentUserId: undefined
            }
        }
        expect(expected).toEqual(store.getState())
    })
  })