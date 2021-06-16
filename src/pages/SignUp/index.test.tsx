import { renderWithRouter } from '../../test-utils/renderWithRouter';

import SignUp from './index';

describe('SignUp', () => {
  it('should renders', () => {
    const { container } = renderWithRouter(<SignUp />);

    expect(container).toBeInTheDocument();
  });
});
