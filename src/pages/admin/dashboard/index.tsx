import React from 'react';
import Layout from '../../../components/layouts';
import { withAuth } from '../../../components/hocs';

const Home: React.FC = (): JSX.Element => {
  return <Layout />;
};

export default withAuth(Home);
