import { shallowMount, createLocalVue } from '@vue/test-utils'
import AddImage from '@/components/add-project/AddImage'
import Vuetify from 'vuetify/lib'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

describe('AddImage.vue', () => {
  let vuetify
  let store
  let getters

  beforeEach(() => {
    vuetify = new Vuetify()
    getters = {
      getAddProject: () => {
        return {
          img: ''
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
    shallowMount(AddImage, {
      localVue,
      vuetify,
      store,
      sync: false
    })

  it('renders image when uploaded', () => {
    const wrapper = factory()
    const fileInput = wrapper.find('v-file-input')
    expect(wrapper.vm.$data.image).toBe(null)
    expect(fileInput).toBeDefined()
  })
})
