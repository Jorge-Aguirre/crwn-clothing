import React from 'react';
import Directory from '../../components/directory/directory.component';

import './homepage.styles.scss';

const HomePage = ({ history }) => (
  <Directory history={history} />
);

export default HomePage;