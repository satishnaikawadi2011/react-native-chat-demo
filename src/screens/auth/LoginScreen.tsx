import React, { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StackNavigationProp } from '@react-navigation/stack';
import jwtDecode from 'jwt-decode';
import useIsMounted from 'react-is-mounted-hook';

import AppButton from '../../components/UI/app/Button';
import { Colors } from '../../../constants/colors';
import { useAuthStore } from '../../store/auth';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import useApi from '../../hooks/useApi';
import authApi from '../../api/auth';
import LogoIcon from '../../svgs/LogoIcon';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

interface LoginScreenProps {
	navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
	const isMounted = useIsMounted();
	const { authenticate } = useAuthStore();
	const { data, error, loading, request: loginUser } = useApi(authApi.loginUser);
	const initialValues = {
		username: '',
		password: ''
	};
	const authSchema = Yup.object({
		username: Yup.string().required().min(4).max(16),
		password: Yup.string().required().min(6).max(12)
	});
	useEffect(
		() => {
			if (data) {
				let loginData = data as any;
				const decodedToken: any = jwtDecode(loginData.token);
				const expiryDate = new Date(decodedToken.exp * 1000);
				authenticate(loginData.user, expiryDate, loginData.token);
			}
		},
		[
			data
		]
	);
	const submitHandler = async (values: any, actions: any) => {
		await loginUser(values.username, values.password);
		if (isMounted()) {
			actions.resetForm();
		}
	};
	return (
		<View style={{ flex: 1, justifyContent: 'space-evenly' }}>
			<ScrollView contentContainerStyle={styles.container}>
				<LogoIcon height={300} width={300} />
				<Formik validationSchema={authSchema} initialValues={initialValues} onSubmit={submitHandler}>
					{(props) => (
						<View style={styles.form}>
							<TextInput
								mode="outlined"
								style={styles.input}
								label="Username"
								left={<TextInput.Icon name="account-circle" />}
								value={props.values.username}
								keyboardType="default"
								onChangeText={props.handleChange('username')}
								placeholder="Enter your username ..."
								onBlur={props.handleBlur('username')}
								underlineColor={Colors.primary}
								selectionColor={Colors.primary}
								error={

										props.touched.username && props.errors.username ? true :
										false
								}
							/>
							{props.errors.username &&
							props.touched.username && (
								<HelperText
									style={{ textAlign: 'center' }}
									type="error"
									visible={

											props.touched.username && props.errors.username ? true :
											false
									}
								>
									{props.errors.username}
								</HelperText>
							)}
							<TextInput
								mode="outlined"
								style={styles.input}
								label="Password"
								value={props.values.password}
								secureTextEntry
								left={<TextInput.Icon name="key-variant" />}
								onChangeText={props.handleChange('password')}
								placeholder="Enter your password ..."
								onBlur={props.handleBlur('password')}
								underlineColor={Colors.primary}
								selectionColor={Colors.primary}
								error={

										props.touched.password && props.errors.password ? true :
										false
								}
							/>
							{props.errors.password &&
							props.touched.password && (
								<HelperText
									style={{ textAlign: 'center' }}
									type="error"
									visible={

											props.touched.password && props.errors.password ? true :
											false
									}
								>
									{props.errors.password}
								</HelperText>
							)}
							{error && (
								<HelperText style={{ textAlign: 'center' }} type="error" visible={error}>
									{`Please check your credentials , either user with this username does not exists or you have entered wrong credentials.`}
								</HelperText>
							)}
							<AppButton
								loading={loading}
								title="sign in"
								onPress={

										!loading ? props.handleSubmit :
										() => {}
								}
							/>
							<AppButton
								bgColor={Colors.accent}
								title="register here"
								disabled={loading}
								onPress={() => {
									navigation.navigate('Register');
								}}
							/>
						</View>
					)}
				</Formik>
			</ScrollView>
		</View>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	logo:
		{
			width: 150,
			height: 150,
			alignSelf: 'center'
		},
	container:
		{
			alignItems: 'center',
			flexGrow: 1
		},
	input:
		{
			width: '90%',
			marginVertical: 10,
			marginLeft: 20
		},
	form:
		{
			width: '90%'
		}
});
