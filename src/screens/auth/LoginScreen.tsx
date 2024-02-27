import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faApple, faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { AppUserContext } from '../../contexts/AppUserContext';
import AuthenticationService from '../../services/AuthenticationService';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/types';


type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;



const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
    const { setUser } = useContext(AppUserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        setError(''); // Clear any existing errors
        try {
            const appUser = await AuthenticationService.signInWithEmailAndPassword(email, password);
            if (appUser) {
                setUser(appUser); // Update the user context with the logged-in user
                navigation.navigate('Home'); // Navigate to the Home screen
            } else {
                setError('User not found.'); // Set error if user data was not fetched
            }
        } catch (error) {
            const errorMessage = (error instanceof Error) ? error.message : 'An unexpected error occurred';
            setError(errorMessage);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Log in</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity
                    style={styles.visibilityToggle}
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                    <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} size={20} color="grey" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('PasswordReset')}>
                <Text style={styles.forgotPassword}>Forgot password? Reset</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Log in</Text>
            </TouchableOpacity>

            <Text style={styles.orContinueWith}>Or continue with:</Text>

            <View style={styles.socialLoginContainer}>
                <TouchableOpacity onPress={() => { /* Implement Apple login logic */ }}>
                    <FontAwesomeIcon icon={faApple} size={30} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { /* Implement Google login logic */ }}>
                    <FontAwesomeIcon icon={faGoogle} size={30} color="#DB4437" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { /* Implement Facebook login logic */ }}>
                    <FontAwesomeIcon icon={faFacebookF} size={30} color="#3B5998" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        padding: 10,
        marginBottom: 10,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    visibilityToggle: {
        padding: 10,
    },
    forgotPassword: {
        textAlign: 'right',
        color: 'blue',
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: 'limegreen',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    orContinueWith: {
        textAlign: 'center',
        marginBottom: 10,
    },
    socialLoginContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
});

export default LoginScreen;
