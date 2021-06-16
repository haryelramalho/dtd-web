import { render } from '@testing-library/react';

import Main from './index';

describe('[Dashboard] Main', () => {
  it('should renders', () => {
    const { container } = render(<Main />);

    expect(container).toBeInTheDocument();
  });
});
