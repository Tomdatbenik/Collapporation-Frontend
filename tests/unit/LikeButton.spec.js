import { mount, createLocalVue } from '@vue/test-utils'
import LikeButton from '@/components/buttons/LikeButton'
import Vuetify from '@/plugins/vuetify'

const localVue = createLocalVue()
localVue.use(Vuetify)

const factory = propsData =>
  mount(LikeButton, {
    localVue: localVue,
    propsData,
    sync: false
  })

// prettier-ignore
describe('LikeButton.vue', () => {
  const wrapper = factory({
      likes: 2
  })
  it('is initialized correctly', () => {
    expect(wrapper.props().likes).toBe(2)
  }),
  it('change to true when clicked at', async () => {
    expect(wrapper.vm.$data.liked).toBe(false)
    wrapper.find('v-chip').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.liked).toBe(true)
  }),
  it('change to false when at true', async () => {
    expect(wrapper.vm.$data.liked).toBe(true)
    wrapper.find('v-chip').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.liked).toBe(false)
  })
})
