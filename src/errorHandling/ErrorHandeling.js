const NameHandling = async name => {
  name += "";
  var error = {
    massage: '',
    status: true,
  };
  if (name) {
    if (name != 'undefined') {
      if (name == '' || name.length == 0) {
        error.massage = 'this field is required';
        error.status = false;
      } else if (name.length < 3) {
        error.massage = 'enter at least 3 characters';
        error.status = false;
      } else if (name.length >= 128) {
        error.massage = 'maximum length is 128';
        error.status = false;
      } else {
        error.massage = '';
        error.status = true;
      }
    } else {
      error.massage = 'this field is required';
      error.status = false;
    }
  } else {
    error.massage = 'this field is required';
    error.status = false;
  }


  return error;
};


const state = async name => {
  var error = {
    massage: '',
    status: true,
  };
  if (name) {
    if (name == '' || name.length == 0) {
      error.massage = 'this field is required';
      error.status = false;
    } else if (name.length != 2) {
      error.massage = 'enter 2 char';
      error.status = false;
    } else {
      error.massage = '';
      error.status = true;
    }
  } else {
    error.massage = 'this field is required';
    error.status = false;
  }

  return error;
};

const PostalCode = async name => {
  var error = {
    massage: '',
    status: true,
  };
  name += ""
  if (name) {
    if (name == '' || name.length == 0) {
      error.massage = 'this field is required';
      error.status = false;
    } else if (name.length != 5) {
      error.massage = 'enter 5 char';
      error.status = false;
    } else {
      error.massage = '';
      error.status = true;
    }
  } else {
    error.massage = 'this field is required';
    error.status = false;
  }

  return error;
};

const PhoneHandling = async name => {
  var error = {
    massage: '',
    status: true,
  };
  if (name) {
    if (name.length == 0) {
      error.massage = 'this field is required';
      error.status = false;
    } else if (name.length != 10) {
      error.massage = 'enter valid phone number(len = 10)';
      error.status = false;
    } else {
      error.massage = '';
      error.status = true;
    }
  } else {
    error.massage = 'this field is required';
    error.status = false;
  }


  return error;
};
const ssn = async name => {
  var error = {
    massage: '',
    status: true,
  };
  if (name) {
    if (name == "") {
      error.massage = 'this field is required';
      error.status = false;
    } else if (name.length != 4) {
      error.massage = 'enter valid ssn';
      error.status = false;
    } else {
      error.massage = '';
      error.status = true;
    }
  } else {
    error.massage = 'this field is required';
    error.status = false;
  }


  return error;
};

const EmailHandling = async name => {
  var error = {
    massage: '',
    status: true,
  };
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (name) {
    if (name.match(mailformat)) {
      error.massage = '';
      error.status = true;
    } else {
      error.massage = 'enter valid email address';
      error.status = false;
    }
  } else {
    error.massage = 'enter valid email address';
    error.status = false;
  }

  return error;
};

const AmountHandlingAccept1 = async name => {
  name = eval(name);
  var error = {
    massage: '',
    status: true,
  };
  if (name) {
    if (name.length == 0) {
      error.massage = 'this field is required';
      error.status = false;
    } else if (name <= 0) {
      error.massage = 'enter a number greater than 0';
      error.status = false;
    } else if (name >= 10000) {
      error.massage = 'enter a number smaller than 10000';
      error.status = false;
    } else {
      error.massage = '';
      error.status = true;
    }
  } else {
    error.massage = 'this field is required';
    error.status = false;
  }

  return error;
};

const AmountHandling = async name => {
  name = eval(name);
  var error = {
    massage: '',
    status: true,
  };
  if (name) {
    if (name.length == 0) {
      error.massage = 'this field is required';
      error.status = false;
    } else if (name <= 1) {
      error.massage = 'enter a number greater than 1';
      error.status = false;
    } else if (name >= 10000) {
      error.massage = 'enter a number smaller than 10000';
      error.status = false;
    } else {
      error.massage = '';
      error.status = true;
    }
  } else {
    error.massage = 'this field is required';
    error.status = false;
  }

  return error;
};

const PercentHandling = async name => {
  name = eval(name);
  var error = {
    massage: '',
    status: true,
  };
  if (name) {
    if (name.length == 0) {
      error.massage = 'this field is required';
      error.status = false;
    } else if (isNaN(name)) {
      error.massage = 'Please enter Numeric value';
      error.status = false;

    } else if (name <= 0) {
      error.massage = 'enter a number greater than 0%';
      error.status = false;
    } else if (name > 100) {
      error.massage = 'enter a number smaller than 100%';
      error.status = false;
    } else {
      error.massage = '';
      error.status = true;
    }
  } else {
    error.massage = 'this field is required';
    error.status = false;
  }

  return error;
};

const TermHandling = async name => {
  name = eval(name);
  var error = {
    massage: '',
    status: true,
  };
  if (name) {
    if (name.length == 0) {
      error.massage = 'this field is required';
      error.status = false;
    } else if (name <= 0) {
      error.massage = 'enter a number greater than 0';
      error.status = false;
    } else if (name > 100) {
      error.massage = 'enter a number smaller than 500';
      error.status = false;
    } else {
      error.massage = '';
      error.status = true;
    }
  } else {
    error.massage = 'this field is required';
    error.status = false;
  }

  return error;
};

const MemberHandling = async name => {
  //name = eval (name);
  var error = {
    massage: '',
    status: true,
  };
  if (name) {
    if (name.length == 0) {
      error.massage = 'SELECT ANY MEMBER';
      error.status = false;
    }
  } else {
    error.massage = 'SELECT ANY MEMBER';
    error.status = false;
  }

  return error;
};
const DateHandling = async name => {
  //name = eval (name);
  console.log(name)
  var error = {
    massage: '',
    status: true,
  };
  if (name) {
    if (name.length == 0) {
      error.massage = 'this field is required';
      error.status = false;
    }
  } else {
    error.massage = 'this field is required';
    error.status = false;
  }

  return error;
};
const ServiceHandling = async name => {
  //name = eval (name);
  console.log(name)
  var error = {
    massage: '',
    status: true,
  };
  if (name) {

    if (name.length <= 0) {

      error.massage = 'Select any service';
      error.status = false;
    }

  }


  else {

    error.massage = 'Select any item';
    error.status = false;
  }

  return error;
};
const SelectItem = async name => {
  //name = eval (name);
  console.log(name)
  var error = {
    massage: '',
    status: true,
  };
  if (name) {

    if (name.length == 0) {

      error.massage = 'Select any item';
      error.status = false;
    }

  }


  else {

    error.massage = 'Select any item';
    error.status = false;
  }

  return error;
};
const UploadFileIMG = async name => {
  //name = eval (name);
  if (name)
    console.log(name.name)
  var error = {
    massage: '',
    status: true,
  };
  if (name) {
    if (name.name.search(".jpg") == -1 && name.name.search(".png") == -1) {
      error.massage = 'Select *.jpg or *.png File';
      error.status = false;
    }
  } else {
    error.massage = 'Select any image';
    error.status = false;
  }

  return error;
};
const UploadFilePDF = async name => {
  //name = eval (name);
  if (name)
    console.log(name.name)
  var error = {
    massage: '',
    status: true,
  };
  if (name) {
    if (name.name.search(".pdf") == -1) {
      error.massage = 'Select PDF File';
      error.status = false;
    }
  } else {
    error.massage = 'Select any file';
    error.status = false;
  }

  return error;
};

const PasswordHandling = async name => {

  name = name + ""

  var error = {
    massage: '',
    status: true,
  };

  if (name != 'undefined') {


    if (name == '' || name.length == 0) {

      error.massage = 'this field is required';
      error.status = false;
    } else if (name.length < 8) {

      error.massage = 'enter at least 8 characters';
      error.status = false;
    } else if (name.length >= 128) {

      error.massage = 'maximum length is 128';
      error.status = false;
    } else {

      error.massage = '';
      error.status = true;
    }
  } else {

    error.massage = 'this field is required';
    error.status = false;
  }

  if (name.length == 3) {
    error.massage = '';
    error.status = true;
  }

  return error;
};


const BirthDateHandling = async name => {
  var error = {
    massage: '',
    status: true,
  };

  if (name) {

    var year = name.split("-")[0]
    var month = name.split("-")[1]
    var day = name.split("-")[2]


    const age = new Date().getFullYear() - year;
    if (name == '' || name.length == 0) {
      error.massage = 'this field is required';
      error.status = false;
    } else if (age <= 18) {
      error.massage = 'Enter a valid birthDate';
      error.status = false;
    } else if ((age) >= 100) {
      error.massage = 'Enter a valid birthDate';
      error.status = false;
    } else {
      error.massage = '';
      error.status = true;
    }
  } else {
    error.massage = 'this field is required';
    error.status = false;
  }

  return error;
};

const BankAccounts = async name => {
  //name = eval (name);
  console.log(name)
  console.log(typeof (name))
  var error = {
    massage: '',
    status: true,
  };
  if (name) {
    if (name.length == 0) {
      error.massage = 'this field is required';
      error.status = false;
    }
    if (isNaN(name)) {
      error.massage = 'value should be a number';
      error.status = false;
    }
  } else {
    error.massage = 'this field is required';
    error.status = false;
  }

  return error;
};

export const Error = {
  NameHandling,
  PhoneHandling,
  EmailHandling,
  AmountHandling,
  AmountHandlingAccept1,
  PercentHandling,
  TermHandling,
  MemberHandling,
  PasswordHandling,
  ssn,
  state,
  BirthDateHandling,
  PostalCode,
  SelectItem,
  UploadFilePDF,
  UploadFileIMG,
  DateHandling,
  BankAccounts,
  ServiceHandling
};