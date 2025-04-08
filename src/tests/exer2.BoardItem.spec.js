import { mount } from '@vue/test-utils'
import BoardItem from '../components/exercise2/BoardItem.vue'

describe('BoardItem.vue', () => {
  const props = {
    title: 'Test Title',
    user: 'John Doe',
    date: '2025-04-08'
  }

  function mountFactory(props, provide = {search: ''}) {
    return mount(BoardItem, {
      props: props,
      global: {
        provide: provide
      }
    })
  }

  it('renders props correctly', () => {
    const wrapper = mountFactory(props);
    
    expect(wrapper.findAll('span').at(0).text()).toBe('Test Title')
    expect(wrapper.findAll('span').at(1).text()).toBe('John Doe')
    expect(wrapper.findAll('span').at(2).text()).toBe('2025-04-08')
  })

  it('gets highlighted when search matches', async () => {
    // Simulate a search match by providing a search term
    const provide = {
      search: 'Test Title'
    }

    const wrapper = mountFactory(props, provide)
    // await wrapper.setProps({ title: 'Test Title' })
    const boardItem = wrapper.find('.board-item')
    expect(boardItem.classes()).toContain('highlight')
  })

  it('does not get highlighted when search does not match', async () => {
    const provide = {
      search: 'xyz'
    }

    const wrapper = mountFactory(props, provide)
    // await wrapper.setProps({ title: 'Test Title' })
    const boardItem = wrapper.find('.board-item')
    expect(boardItem.classes()).not.toContain('highlight')
  })
})