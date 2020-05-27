import { mount, createLocalVue } from '@vue/test-utils'
import FeedItem from '@/components/feed/FeedItem'
import Vuetify from '@/plugins/vuetify'

const localVue = createLocalVue()
localVue.use(Vuetify)

const factory = propsData =>
  mount(FeedItem, {
    localVue: localVue,
    propsData,
    sync: false,
    computed: {
      getDateString() {
        return ''
      }
    }
  })

window.resizeTo = function resizeTo(width, height) {
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height
  }).dispatchEvent(new this.Event('resize'))
}

// prettier-ignore
describe('FeedItem.vue', () => {
  const wrapper = factory({
    title: 'Tropical Island',
    smallDescription:
      'Check weather and things to do on a Tropical Island with this brand new app!',
    image: undefined,
    createdBy: 'Tim Freezer',
    createdAt: new Date(),
    tags: ['Android', 'iOS'],
    likes: 2,
    status: 'CONCEPT'
  })
  it('is initialized correctly', () => {
    expect(wrapper.props().title).toBe('Tropical Island')
    expect(wrapper.props().smallDescription).toBe(
      'Check weather and things to do on a Tropical Island with this brand new app!'
    )
    expect(wrapper.props().image).toBe(undefined)
    expect(wrapper.props().createdBy).toBe('Tim Freezer')
    expect(wrapper.props().tags.length).toBe(2)
    expect(wrapper.props().likes).toBe(2)
    expect(wrapper.props().status).toBe('CONCEPT')
  })
})
