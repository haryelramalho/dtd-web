import { render } from '@testing-library/react';

import SignUp from './index';

describe('SignUp', () => {
  it('should renders', () => {
    const { container } = render(<SignUp />);

    expect(container).toBeInTheDocument();
  });
});
