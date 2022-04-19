const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (email === '') {
        return 'Required'
    }
    else if (!re.test(email)){
        return 'Invalid Email'
    }
    return '';
}

const validatePasswords = (password1, password2) => {
    let p1 = '';
    let p2 = '';
    if (password1 === '') {
        p1 = 'Required';
    }    
    else if (password1.length < 6) {
        p1 = 'Password must be atleast 6 characters';
    } 
    else if (password2 != password1){
        p2 = 'Passwords must match';
    }
    return {p1, p2};
}



export const validateSignup = ({email, password1, password2}) => {
    let {p1, p2} = validatePasswords(password1, password2);
    return {
        email: validateEmail(email),
        password1: p1,
        password2: p2
    }
}