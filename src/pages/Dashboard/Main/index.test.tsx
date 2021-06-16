import { renderWithRouter } from '../../../test-utils/renderWithRouter';

import Main from './index';

describe('[Dashboard] Main', () => {
  it('should renders', () => {
    const { container } = renderWithRouter(<Main />);

    expect(container).toBeInTheDocument();
  });
});
