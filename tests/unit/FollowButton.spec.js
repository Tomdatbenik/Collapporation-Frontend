import { mount, createLocalVue } from '@vue/test-utils'
import FollowButton from '@/components/buttons/FollowButton'
import Vuetify from '@/plugins/vuetify'

const localVue = createLocalVue()
localVue.use(Vuetify)

const factory = propsData =>
  mount(FollowButton, {
    localVue: localVue,
    propsData,
    sync: false
  })

// prettier-ignore
describe('FollowButton.vue', () => {
  const wrapper = factory()
  it('change to true when clicked at', async () => {
    expect(wrapper.vm.$data.followed).toBe(false)
    wrapper.find('v-chip').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.followed).toBe(true)
  }),
  it('change to false when at true', async () => {
    expect(wrapper.vm.$data.followed).toBe(true)
    wrapper.find('v-chip').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.followed).toBe(false)
  })
})
