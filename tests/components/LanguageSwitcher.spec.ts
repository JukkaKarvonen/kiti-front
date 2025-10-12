import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import LanguageSwitcher from '../../src/components/LanguageSwitcher.vue'

describe('LanguageSwitcher', () => {
  it('renders language options', () => {
    const wrapper = mount(LanguageSwitcher, {
      props: {
        customClass: 'test-class',
      },
    })
    expect(wrapper.findAll('.q-btn').length).toBe(2)
    expect(wrapper.text()).toContain('en')
    expect(wrapper.text()).toContain('fi')
  })

  it('emits an event when a language is selected', async () => {
    const wrapper = mount(LanguageSwitcher)
    const buttons = wrapper.findAll('.q-btn')

    // @ts-expect-error: Ignore undefined
    await buttons[0].trigger('click')
    expect(localStorage.getItem('language')).toBe('en')
  })
})
