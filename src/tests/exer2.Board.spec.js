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

  it('changes board color', () => {
    function hexToRgb(hex) {
      var bigint = parseInt(hex, 16);
      var r = (bigint >> 16) & 255;
      var g = (bigint >> 8) & 255;
      var b = bigint & 255;
  
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  
    const wrapper = mountFactory(props);
    const colorSelect = wrapper.find('select');
  
    const selectedOption = colorSelect.findAll('option').at(1);
    colorSelect.element.value = selectedOption.element.value;
    const expectedColor = selectedOption.element.value;
    colorSelect.trigger('change');  // trigger color change on component
    
    // extract color of <h6> tag
    const actualColor = wrapper.find('h6').element.style.color;
  
    // Compare the colors
    expect(actualColor).toBe(hexToRgb(expectedColor));
  });
  
})