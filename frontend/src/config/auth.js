export const isAuthenticated = () => {
	if (!localStorage.getItem('token')) {
		return false;
	} else {
		return true;
	}
};
