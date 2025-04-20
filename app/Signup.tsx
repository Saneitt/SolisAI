import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/contexts/AuthContext';

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signUp, loading, session } = useAuth();
  const [signUpError, setSignUpError] = useState<string | null>(null);

  React.useEffect(() => {
    if (session) {
      router.replace('/');
    }
  }, [session]);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setSignUpError('Passwords do not match');
      return;
    }
    setSignUpError(null);
    const error = await signUp(email, password);
    if (error) {
      setSignUpError(error.error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      {errorMessage && (
        <Text style={styles.error}>{errorMessage}</Text>
      )signUpError && (<Text style={styles.errorText}>{signUpError}</Text>)}
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleSignUp}
        disabled={loading}
        style={styles.button}
      >
        {loading ? <ActivityIndicator color="white" /> : 'Sign Up'}
      </Button>
      <Button onPress={() => router.push('/Login')}>
        Already have an account? Log In
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});