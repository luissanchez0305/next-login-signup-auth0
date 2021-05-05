/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from '../../components/layouts';
import AuthLayout, { Group } from '../../components/auth';
import { APIClient } from '../../core';

const ResetPassword: React.FC = (): JSX.Element => {
  const router = useRouter();
  const [password, setPassword] = React.useState('');
  const changePassword = (e: { target: { value: React.SetStateAction<string> } }): void => {
    setPassword(e.target.value);
  };

  const [confirmPassword, setConfirmPassword] = React.useState('');
  const changeConfirmPassword = (e: { target: { value: React.SetStateAction<string> } }): void => {
    setConfirmPassword(e.target.value);
  };

  const submit = async (aPassword: string, aConfirmPassword: string): Promise<void> => {
    const apiClient = APIClient.getInstance();
    const result = await apiClient.users.resetPassword(aPassword, aConfirmPassword);
    if (result === true) {
      router.push('/admin/dashboard');
    }
  };

  return (
    <Layout>
      <AuthLayout title="Change Password" subTitle="Please set a new password">
        <form>
          <InputGroup fullWidth>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={changePassword}
            />
          </InputGroup>
          <InputGroup fullWidth>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={changeConfirmPassword}
            />
          </InputGroup>
          <Button
            onClick={() => submit(password, confirmPassword)}
            status="Success"
            type="button"
            shape="SemiRound"
            fullWidth
          >
            Change Password
          </Button>
        </form>
        <Group>
          <Link href="/auth/login">
            <a>Back to Log In</a>
          </Link>
        </Group>
      </AuthLayout>
    </Layout>
  );
};

export default ResetPassword;
