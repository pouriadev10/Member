const validatePhone = (rule, value, callback) => {
    if (value && !/^\d{10}$/.test(value)) {
        callback('Phone number must be 10 digits');
    } else {
        callback();
    }
};

const validateName = (rule, value, callback) => {
    if (value && !/^[a-zA-Z0-9\s]{2,30}$/.test(value)) {
        callback('Enter valid input');
    } else {
        callback();
    }
};

const validateState = (rule, value, callback) => {
    if (value && !/^[a-zA-Z0-9\s]{2,30}$/.test(value)) {
        callback('Enter valid input');
    } else {
        callback();
    }
};

const validateEmail = (rule, value, callback) => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        callback(new Error('Email is invalid'));
    } else {
        callback();
    }
};

const validateZipCode = (rule, value, callback) => {
    if (value && !/^\d{5}$/.test(value)) {
        callback(new Error('Zip code must be 5 digits'));
    } else {
        callback();
    }
};

const validateCount = (rule, value, callback) => {
    // write here
    if (value <= 0) {
        callback(new Error('Enter valid number'));
    } else {
        callback();
    }
};


export const Rules = {
    validatePhone,
    validateName,
    validateState,
    validateEmail,
    validateZipCode,
    validateCount
}