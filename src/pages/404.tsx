import React from 'react';
import { Card, CardBody } from '@paljs/ui/Card';
import { ButtonLink } from '@paljs/ui/Button';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Layout from '../components/layouts';
// import { userIsAuthenticated } from 'components/providers/Auth';

const ErrorStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  small {
    margin-bottom: 3rem;
  }
  h1 {
    margin-bottom: 0.5rem;
  }
  a {
    max-width: 20rem;
  }
`;
export default function Error(): JSX.Element {
  const router = useRouter();
  // const isAuthenticated = userIsAuthenticated();
  const isAuthenticated = true;

  return (
    <Layout>
      <Card>
        <CardBody>
          <ErrorStyle>
            <h1>404 Page Not Found</h1>
            <small>The page you were looking for doesn&apos;t exist</small>
            <ButtonLink
              fullWidth
              appearance="hero"
              onClick={() => router.push('/')}
              shape="Rectangle"
            >
              {isAuthenticated ? 'Return to dashboard' : 'Return to login'}
            </ButtonLink>
          </ErrorStyle>
        </CardBody>
      </Card>
    </Layout>
  );
}
