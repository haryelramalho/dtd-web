import { renderWithRouter } from '../../test-utils/renderWithRouter';

import Home from './index';

describe('Home', () => {
  it('should renders', () => {
    const { container } = renderWithRouter(<Home />);

    expect(container).toBeInTheDocument();
  });
});
