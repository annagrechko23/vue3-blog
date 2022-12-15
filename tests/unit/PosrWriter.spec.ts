import { nextTick } from 'vue';
import { flushPromises, mount } from "@vue/test-utils";
import PostWriter from '../../src/components/PostWriter.vue'
import { today, thisWeek, thisMonth } from '../../src/mocks'



describe('Timeline', () => {
  it('emit save event', async (done) => {
    const wrapper = mount(PostWriter, {
      props: {
        post: {
          title: 'New Test'
        }
      }
    })
    await wrapper.find('[data-test="title"]').setValue('New Test')
    const $content = wrapper.find<HTMLDivElement>('[data-test="content"]')
    $content.element.innerText = '## New'
    await $content.trigger('input')
    setTimeout(async () => {
      await wrapper.find('[data-test="submit"]').trigger('click')
      const emitted = (wrapper.emitted()['save'] as any)[0][0]
      expect(emitted.title).toBe('New Test')
      expect(emitted.markdown).toBe('## New')
      expect(emitted.html).toBe('new')

      done()
    })
  

  },400)
})