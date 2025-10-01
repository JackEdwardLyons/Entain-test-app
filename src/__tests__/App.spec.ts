import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'
import App from '../App.vue'

describe('App', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders the main title correctly', () => {
    const app = createApp(App)
    app.use(createPinia())
    app.use(VueQueryPlugin)

    const wrapper = mount(App, {
      global: {
        plugins: [createPinia(), VueQueryPlugin],
      },
    })
    expect(wrapper.find('h1').text()).toBe('Next To Go Races')
  })
})
