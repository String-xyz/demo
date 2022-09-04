import {render, fireEvent, screen} from '@testing-library/svelte'
import Address from './Address.svelte'

it('shows proper heading when rendered', () => {
  render(Address)
  const heading = screen.getByText('Send to')
  expect(heading).toBeInTheDocument()
})

// Note: This is as an async test as we are using `fireEvent`
// it('changes button text on click', async () => {
//   render(Comp, {name: 'World'})
//   const button = screen.getByRole('button')

//   // Using await when firing events is unique to the svelte testing library because
//   // we have to wait for the next `tick` so that Svelte flushes all pending state changes.
//   await fireEvent.click(button)

//   expect(button).toHaveTextContent('Button Clicked')
// })