import { StyleSheet } from "react-native";

export const TEXT_COLOR = '#141414';

export const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: '#dee2e6',
		flex: 1,
	},
	cardBackground: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
	},
	card: {
		backgroundColor: 'white',
		minHeight: 80,
		padding: 16,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	text: {
		fontSize: 24,
		color: TEXT_COLOR
	},
	title: {
		fontSize: 32,
		color: TEXT_COLOR,
		paddingVertical: 16,
		textAlign: 'center'
	},
	separator: {
		height: 1,
		backgroundColor: '#f1f3f5'
	}
})
