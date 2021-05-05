import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { userIsAuthenticated } from '../components/providers/Auth';

export default function Index(): JSX.Element {
  const isAuthenticated = userIsAuthenticated();

  const router = useRouter();
  const path = isAuthenticated ? '/admin/dashboard' : '/auth/login';
  useEffect(() => {
    router.push(path);
  });
  return <div />;
}
