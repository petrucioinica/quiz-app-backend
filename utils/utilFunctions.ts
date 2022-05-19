export const validateEmail = (emailAdress: string) => {
	const regexEmail = /.+\@.+\..*/;
	if (emailAdress.match(regexEmail)) {
		return true;
	}
	return false;
};

export const validatePassword = (password: string) => {
	const passowrdRegex =
		/^(?=.*([A-Z]){1,})(?=.*[!@#$&*]{1,})(?=.*[0-9]{1,})(?=.*[a-z]{1,}).{8,100}$/;
	if (password.match(passowrdRegex)) {
		return true;
	}
	return false;
};
