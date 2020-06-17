import '@testing-library/jest-dom/extend-expect'

import Notify from '../src'


describe('blah', () => {
  it('works', () => {
    const containerNotify = document.getElementById('notifyContainer');
    Notify.success("Click Success", { time: 5000 })


    expect(containerNotify).toBeInTheDocument()
  });
});
