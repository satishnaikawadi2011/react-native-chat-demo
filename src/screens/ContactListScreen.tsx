import { getFocusedRouteNameFromRoute, RouteProp } from '@react-navigation/core';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { FlatList, Text, StyleSheet, View } from 'react-native';
import ContactListItem from '../components/contacts/ContactListItem';
import ExitButton from '../components/headerButtons/ExitButton';

// import CartButton from '../components/headerButtons/CartButton';
import useApi from '../hooks/useApi';
import { HomeStackParamList } from '../navigation/AppNavigator';
// import { useProductStore } from '../store/product';
// import { centered } from '../utils/commonStyles';
// import productsApi from '../api/products'
// import categoriesApi from '../api/categories'
import { useAuthStore } from '../store/auth';
import { centered } from '../utils/commonStyles';
// import ErrorScreen from './ErrorScreen';
// import AppActivityIndicator from '../animations/AppActivityIndicator';

type ContactListScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'ContactList'>;

type ContactListScreenRouteProp = RouteProp<HomeStackParamList, 'ContactList'>;

interface ContactLisScreenProps {
	navigation: ContactListScreenNavigationProp;
	route: ContactListScreenRouteProp;
}

const ContactListScreen: React.FC<ContactLisScreenProps> = ({ navigation, route }) => {
	// const { products,  categories, selectedCategory,setCategories,setProducts } = useProductStore();
	const { token } = useAuthStore();
	// const categoriesRes = useApi(categoriesApi.getCategories)
	// const productsRes = useApi(productsApi.getProducts)
	// useEffect(() => {
	// 	if (token) {
	// 		request()
	// 	}
	// }, [token]);
	// useEffect(() => {
	// 	if (productsRes.data && categoriesRes.data) {
	// 		setCategories(categoriesRes.data as any)
	// 	setProducts(productsRes.data as any);
	// 	}
	// },[categoriesRes.data,productsRes.data])
	// const request = () => {
	// 	categoriesRes.request(token);
	// 	productsRes.request(token);
	// }
	// const filteredProducts:any[]|null = selectedCategory ? products!.filter(product => product.categoryId === selectedCategory?._id) : products;
	// if (categoriesRes.loading || productsRes.loading) {
	// 	return (
	// 		<AppActivityIndicator visible={true}/>
	// 	);
	// }
	// if (categoriesRes.error || productsRes.error) {
	// 	return <ErrorScreen errorMessage='Could not load product listings !!' icon='alert' ButtonComponent={<Button mode='contained' onPress={request}>Try Again</Button>}/>
	// }
	return (
		<ContactListItem
			onPress={() => console.log('Pressed!')}
			username="saty"
			latestMessage="Hi , How u doin ?"
			avatar={require('../../assets/user.png')}
		/>
	);
};

export default ContactListScreen;

const styles = StyleSheet.create({
	title:
		{
			fontSize: 20,
			marginVertical: 20
		}
});

export const screenOptions:
	| StackNavigationOptions
	| ((
			props: {
				route: RouteProp<HomeStackParamList, 'ContactList'>;
				navigation: any;
			}
		) => StackNavigationOptions)
	| undefined = ({ route }) => {
	return {
		title: 'GupShup',
		headerRight: () => <ExitButton />
	};
};
