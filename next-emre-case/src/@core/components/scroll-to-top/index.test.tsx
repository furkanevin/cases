import { render, fireEvent, screen } from '@testing-library/react'
import ScrollToTop from '.' // Adjust the import path as needed

describe('ScrollToTop Component', () => {
  it('is not visible when the page is at the top', () => {
    render(
      <body>
        <ScrollToTop>
          <div>Scroll to top</div>
        </ScrollToTop>
      </body>
    )
    expect(screen.queryByText('Scroll to top')).not.toBeVisible()
  })

  it('becomes visible when scrolled past 400px', () => {
    // Mocking scroll position
    window.pageYOffset = 500

    render(
      <body>
        <ScrollToTop>
          <div>Scroll to top</div>
        </ScrollToTop>
      </body>
    )
    expect(screen.getByText('Scroll to top')).toBeVisible()

    // Resetting scroll position
    window.pageYOffset = 0
  })

  it('scrolls to the top when clicked', () => {
    window.pageYOffset = 500

    render(
      <body>
        <ScrollToTop>
          <div>Scroll to top</div>
        </ScrollToTop>
      </body>
    )

    // scrollIntoView is not implemented in jsdom.
    // Here's the issue: https://github.com/jsdom/jsdom/issues/1695
    window.HTMLElement.prototype.scrollIntoView = function () {}

    fireEvent.click(screen.getByText('Scroll to top'))

    // Wait 1s for the scroll to complete
    setTimeout(() => {
      expect(window.pageYOffset).toBe(0)
    }, 1000)
  })
})
