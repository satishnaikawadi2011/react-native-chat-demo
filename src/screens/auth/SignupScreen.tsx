import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StackNavigationProp } from '@react-navigation/stack';
import jwtDecode from 'jwt-decode';
import useIsMounted from 'react-is-mounted-hook';

import { Colors } from '../../../constants/colors';
import AppButton from '../../components/UI/app/Button';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { useAuthStore } from '../../store/auth';
import authApi from '../../api/auth';
import useApi from '../../hooks/useApi';

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

interface RegisterScreenProps {
	navigation: RegisterScreenNavigationProp;
}

const SignupScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
	const isMounted = useIsMounted();
	const { authenticate } = useAuthStore();
	const { data, error, loading, request: registerUser } = useApi(authApi.registerUser);
	const initialValues = {
		firstName: '',
		lastName: '',
		password: '',
		username: ''
	};
	const authSchema = Yup.object({
		firstName: Yup.string().required(),
		lastName: Yup.string().required(),
		password: Yup.string().required().min(6).max(12),
		username: Yup.string().required().min(4).max(16)
	});
	useEffect(
		() => {
			if (data) {
				let registerData = data as any;
				const decodedToken: any = jwtDecode(registerData.token);
				const expiryDate = new Date(decodedToken.exp * 1000);
				authenticate(registerData.user, expiryDate, registerData.token);
			}
		},
		[
			data
		]
	);
	const submitHandler = async (values: any, actions: any) => {
		await registerUser(values.firstName, values.lastName, values.username, values.password);
		if (isMounted()) {
			actions.resetForm();
		}
	};
	return (
		<View style={{ flex: 1, justifyContent: 'space-evenly' }}>
			<View style={styles.container}>
				<Formik validationSchema={authSchema} initialValues={initialValues} onSubmit={submitHandler}>
					{(props) => (
						<View style={styles.form}>
							<TextInput
								mode="outlined"
								style={styles.input}
								label="First Name"
								left={<TextInput.Icon name="account-outline" />}
								value={props.values.firstName}
								keyboardType="default"
								onChangeText={props.handleChange('firstName')}
								placeholder="Enter your first name ..."
								onBlur={props.handleBlur('firstName')}
								underlineColor={Colors.primary}
								selectionColor={Colors.primary}
								error={

										props.touched.firstName && props.errors.firstName ? true :
										false
								}
							/>
							{props.errors.firstName &&
							props.touched.firstName && (
								<HelperText
									style={{ textAlign: 'center' }}
									type="error"
									visible={

											props.touched.firstName && props.errors.firstName ? true :
											false
									}
								>
									{props.errors.firstName}
								</HelperText>
							)}
							<TextInput
								mode="outlined"
								style={styles.input}
								label="Last Name"
								left={<TextInput.Icon name="account-outline" />}
								value={props.values.lastName}
								keyboardType="default"
								onChangeText={props.handleChange('lastName')}
								placeholder="Enter your last name ..."
								onBlur={props.handleBlur('lastName')}
								underlineColor={Colors.primary}
								selectionColor={Colors.primary}
								error={

										props.touched.lastName && props.errors.lastName ? true :
										false
								}
							/>
							{props.errors.lastName &&
							props.touched.lastName && (
								<HelperText
									style={{ textAlign: 'center' }}
									type="error"
									visible={

											props.touched.lastName && props.errors.lastName ? true :
											false
									}
								>
									{props.errors.lastName}
								</HelperText>
							)}
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
									{`User with this username already exists,please ensure that your username and email is unique.`}
								</HelperText>
							)}
							<AppButton
								loading={loading}
								title="sign up"
								onPress={

										!loading ? props.handleSubmit :
										() => {}
								}
							/>
							<AppButton
								bgColor={Colors.accent}
								title="login here"
								disabled={loading}
								onPress={() => {
									navigation.navigate('Login');
								}}
							/>
						</View>
					)}
				</Formik>
			</View>
		</View>
	);
};

export default SignupScreen;

const styles = StyleSheet.create({
	logo:
		{
			width: 150,
			height: 150,
			alignSelf: 'center'
		},
	container:
		{
			alignItems: 'center'
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
