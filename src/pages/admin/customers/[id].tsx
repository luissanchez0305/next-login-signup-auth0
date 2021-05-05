import React from 'react';
import Layout from 'components/layouts';
import { withAuth } from 'components/hocs';

const CustomerDetails: React.FC = (): JSX.Element => {
  return (
    <Layout>
      <h1>Customer Details</h1>
    </Layout>
  );
};

export default withAuth(CustomerDetails);
