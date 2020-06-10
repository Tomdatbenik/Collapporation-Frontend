import { shallowMount, createLocalVue } from '@vue/test-utils'
import AddTitle from '@/components/add-project/AddTitle'
import Vuetify from 'vuetify/lib'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

describe('AddTitle.vue', () => {
  let vuetify
  let store
  let getters

  beforeEach(() => {
    vuetify = new Vuetify()
    getters = {
      getAddProject: () => {
        return {
          title: 'Title'
        }
      }
    }
    store = new Vuex.Store({
      modules: {
        project: { namespaced: true, getters }
      }
    })
  })

  const factory = () =>
    shallowMount(AddTitle, {
      localVue,
      vuetify,
      store,
      sync: false
    })

  it('sets title in store', () => {
    const wrapper = factory()
    const textField = wrapper.find('v-text-field')
    expect(wrapper.vm.$data.title).toBe('Title')
    expect(textField.text()).toBe('Title')
  })
})
