import { mount } from '@vue/test-utils'
import Board from '../components/exercise2/Board.vue'

describe('Board.vue', () => {
  const props = {
    id: 1,
    title: "Board 1",
    color: "#000000",
    items: [
      { title: 'Post 1', user: 'User1', date: '2025-04-01' },
      { title: 'Post 2', user: 'User2', date: '2025-04-02' },
      { title: 'Post 3', user: 'User3', date: '2025-04-03' }
    ]
  }

  function mountFactory(props, provide = {search: ''}) {
    return mount(Board, {
      props: props,
      global: {
        provide: provide
      }
    })
  }

  it('renders props correctly', () => {
    const wrapper = mountFactory(props);
    expect(wrapper.find('h6').text()).toBe('Board 1')
  })

  it('gets highlighted when search matches', () => {
    // Simulate a search match by providing a search term
    const provide = {
      search: 'Board 1'
    }

    const wrapper = mountFactory(props, provide)
    const boardItem = wrapper.find('.board-title')
    expect(boardItem.classes()).toContain('highlight')
  })

  it('does not get highlighted when search does not match', () => {
    const provide = {
      search: 'xyz'
    }

    const wrapper = mountFactory(props, provide)
    const boardItem = wrapper.find('.board-title')
    expect(boardItem.classes()).not.toContain('highlight')
  })

  it('renders BoardItem children', () => {
    const wrapper = mountFactory(props)
    const boardItem = wrapper.find('ul')
    const listItems = boardItem.findAll('li')
    expect(listItems).toHaveLength(3)
  })
})