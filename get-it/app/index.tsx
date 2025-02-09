import { Redirect } from 'expo-router';
import { useSelector } from 'react-redux';
import { selectAuth } from '../features/authentication/authSlice';

export default function Default() {

  const { username } = useSelector(selectAuth);

  return (
    <>
    { username ? 
      <Redirect href="/(tabs)" />
      :
      <Redirect href="/(onboarding)/login" />
    }
    </>    
  );
}