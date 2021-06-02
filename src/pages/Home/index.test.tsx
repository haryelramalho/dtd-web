import { render } from '@testing-library/react';

import Home from './index';

describe('Home', () => {
  it('should renders', () => {
    const { container } = render(<Home />);

    expect(container).toBeInTheDocument();
  });
});
