tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, ActivityIndicator } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/contexts/AuthContext';

const Login = () => {
  const { signIn, loading, session } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();
  const [signInError, setSignInError] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      {signInError ? (
        <Text style={styles.errorText}>{signInError}</Text>
      )}
      {loading ? (
        <ActivityIndicator animating={true} style={styles.loadingIndicator} />
      ) : (
        <Button
          mode="contained"
          style={styles.button}
          onPress={async () => {
            setSignInError(null);
            const error = await signIn(email, password);
            if (error) {
              setSignInError(error.error.message);
            } else {
              setSignInError(null);
            }
          }}
        >
          Sign In
        </Button>
      )}
      <Button
        onPress={() => router.push('/Signup')}
      >
        Don't have an account? Sign Up
      </Button>
    </View>
  );
};

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
    marginBottom: 10
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  loadingIndicator: {
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },

});

export default Login;