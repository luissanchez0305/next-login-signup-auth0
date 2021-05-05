/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import React from 'react';
import { useRouter } from 'next/router';

import AuthLayout from '../../components/auth';
import Layout from '../../components/layouts';
import { withoutAuth } from '../../components/hocs';
import { APIClient } from '../../core';

const Login: React.FC = (): JSX.Element => {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const changeEmail = (e: { target: { value: React.SetStateAction<string> } }): void => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = React.useState('');
  const changePassword = (e: { target: { value: React.SetStateAction<string> } }): void => {
    setPassword(e.target.value);
  };

  const submit = async (email: string, password: string): Promise<void> => {
    const apiClient = APIClient.getInstance();
    const result = await apiClient.users.login(email, password);

    // const route =
    //   result.data && result.data.changePassword === true
    //     ? '/auth/reset-password'
    //     : '/admin/dashboard';
    const route = '/admin/dashboard';
    router.push(route);
  };

  return (
    <Layout>
      <AuthLayout title="Login" subTitle="Esfera Soluciones">
        <form>
          <InputGroup fullWidth>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={changeEmail}
            />
          </InputGroup>
          <InputGroup fullWidth>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={changePassword}
            />
          </InputGroup>
          <Button
            onClick={() => submit(email, password)}
            status="Success"
            type="button"
            shape="SemiRound"
            fullWidth
          >
            Login
          </Button>
        </form>
      </AuthLayout>
    </Layout>
  );
};

export default withoutAuth(Login);
