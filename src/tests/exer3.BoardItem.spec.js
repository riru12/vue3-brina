import { mount } from '@vue/test-utils'
import BoardItem from '../components/exercise3/BoardItem.vue'

describe('BoardItem.vue', () => {
  const originalAlert = window.alert
  beforeAll(() => { window.alert = jest.fn() }) // mock window.alert
  afterAll(() => { window.alert = originalAlert }) // restore alert after tests
  afterEach(() => { jest.clearAllMocks() }) // clear mock data between tests

  const mockValidateUniqueItemTitle = jest.fn().mockImplementation(title => 
    title === 'Invalid Title' ? 'Title already exists' : true
  )

  const props = {
    title: 'Test Title',
    user: 'John Doe',
    date: '2025-04-08',
    validateUniqueItemTitle: mockValidateUniqueItemTitle
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

  it('emits when validation succeeds', async () => {
    const wrapper = mountFactory(props);
    const editButton = wrapper.findAll('.maintenance-button').find(btn => btn.text() === 'Edit');
    await editButton.trigger('click');
    await wrapper.find('input[type="text"]').setValue('Valid Title');
    await wrapper.find('.maintenance-button').trigger('click');
    
    // assertion
    expect(mockValidateUniqueItemTitle).toHaveBeenCalledWith('Valid Title');
    expect(wrapper.emitted('edit-board-item')).toBeTruthy();    // must emit

    expect(wrapper.vm.newItemTitle).toBe('Valid Title');    // item title should have been updated
    expect(wrapper.vm.isEditing).toBe(false);
  })

  it('does not emit when validation fails', async () => {
    const wrapper = mountFactory(props);
    const editButton = wrapper.findAll('.maintenance-button').find(btn => btn.text() === 'Edit');
    await editButton.trigger('click');
    await wrapper.find('input[type="text"]').setValue('Invalid Title');
    await wrapper.find('.maintenance-button').trigger('click');
    
    // assertion
    expect(mockValidateUniqueItemTitle).toHaveBeenCalledWith('Invalid Title');
    expect(wrapper.emitted('edit-board-item')).toBeFalsy();     // must NOT emit
    
    expect(wrapper.vm.newItemTitle).toBe('Test Title'); // item title should have been reverted
    expect(wrapper.vm.isEditing).toBe(false);
    expect(window.alert).toHaveBeenCalledWith('Title already exists'); // verify alert was called since validation failed
  })
})