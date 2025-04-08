import { mount } from '@vue/test-utils'
import Board from '../components/exercise3/Board.vue'

describe('Board.vue', () => {
  const originalAlert = window.alert
  beforeAll(() => { window.alert = jest.fn() }) // mock window.alert
  afterAll(() => { window.alert = originalAlert }) // restore alert after tests
  afterEach(() => { jest.clearAllMocks() }) // clear mock data between tests

  const mockValidateUniqueBoardTitle = jest.fn().mockImplementation(title => 
    title === 'Invalid Title' ? 'Title already exists' : true
  )

  const props = {
    id: 1,
    title: "Board 1",
    color: "#000000",
    items: [
      { title: 'Post 1', user: 'User1', date: '2025-04-01' },
      { title: 'Post 2', user: 'User2', date: '2025-04-02' },
      { title: 'Post 3', user: 'User3', date: '2025-04-03' }
    ],
    validateUniqueBoardTitle: mockValidateUniqueBoardTitle
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

  it('emits when validation succeeds', async () => {
    const wrapper = mountFactory(props);
    const editButton = wrapper.find('h6');
    await editButton.trigger('click');
    const titleInput = wrapper.find('input[type="text"]');
    await titleInput.setValue('Valid Title');
    
    await titleInput.trigger('keyup.enter');  // simulate enter key to save
    
    // assertions
    expect(mockValidateUniqueBoardTitle).toHaveBeenCalledWith('Valid Title');
    expect(wrapper.emitted()['edit-board-title']).toBeTruthy();  // should emit
    
    expect(wrapper.vm.newBoardTitle).toBe('Valid Title');    // board title should have been updated
    expect(wrapper.vm.isEditing).toBe(false);
  })

  it('does not emit when validation fails', async () => {
    const wrapper = mountFactory(props);
    const editButton = wrapper.find('h6');
    await editButton.trigger('click');
    const titleInput = wrapper.find('input[type="text"]');
    await titleInput.setValue('Invalid Title');
    
    await titleInput.trigger('keyup.enter');  // simulate enter key to save
    
    // assertions
    expect(mockValidateUniqueBoardTitle).toHaveBeenCalledWith('Invalid Title');
    expect(wrapper.emitted()['edit-board-title']).toBeFalsy();  // should NOT emit
    
    expect(wrapper.vm.newBoardTitle).toBe(props.title); // title should revert to original
    expect(wrapper.vm.isEditing).toBe(false);
    expect(window.alert).toHaveBeenCalledWith('Title already exists'); // verify alert was called
  })
})