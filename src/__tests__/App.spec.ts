import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App', () => {
  it('renders the main title correctly', () => {
    const wrapper = mount(App)
    expect(wrapper.find('h1').text()).toBe('Next To Go Races')
  })

  it('renders the main container with correct class', () => {
    const wrapper = mount(App)
    const mainElement = wrapper.find('main')
    expect(mainElement.exists()).toBe(true)
    expect(mainElement.classes()).toContain('main-container')
  })
})
