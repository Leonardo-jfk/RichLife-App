import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../src/context/AuthContext';
import BackgroundImage from '../src/components/BackgroundImage';
import { useTheme } from '../src/context/ThemeContext';
import { useLanguage } from '../src/context/LanguageContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { colors } = useTheme();
  const { t } = useLanguage();

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    const { error } = isLogin
      ? await signIn(email, password)
      : await signUp(email, password);

    if (error) {
      Alert.alert('Erreur', error.message);
    } else if (!isLogin) {
      Alert.alert('Succès', 'Compte créé ! Vérifiez vos emails.');
    }
    setLoading(false);
  };

  return (
    <BackgroundImage imageTheme="default" opacity={0.6} blurRadius={2}>
      <View style={styles.container}>
        <View style={[styles.card, { backgroundColor: colors.background }]}>
          <Text style={[styles.title, { color: colors.text, fontFamily: 'FrenchScript', fontSize: 36 }]}>
            RichLife
          </Text>
          <Text style={[styles.subtitle, { color: colors.textLight }]}>
            {isLogin ? 'Connectez-vous' : 'Créez un compte'}
          </Text>

          <TextInput
            style={[styles.input, { color: colors.text, borderColor: colors.icon + '30' }]}
            placeholder="Email"
            placeholderTextColor={colors.textLight}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={[styles.input, { color: colors.text, borderColor: colors.icon + '30' }]}
            placeholder="Mot de passe"
            placeholderTextColor={colors.textLight}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>
                {isLogin ? 'Se connecter' : "S'inscrire"}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={[styles.switchText, { color: colors.primary }]}>
              {isLogin ? "Pas de compte ? S'inscrire" : 'Déjà un compte ? Se connecter'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  switchText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
  },
});