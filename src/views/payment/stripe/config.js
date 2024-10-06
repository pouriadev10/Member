const local = {
  apiGateway: {
  
      URL: "https://api.memberpoint.io"
  },
  mediaGateway: {
    URL: "https://api.memberpoint.io"

  },
  stripe: {
    key: 'pk_test_Osu2iYG3m8zmTD1xI1vljmJN00jDeQAy6a'
  },
};

const staging = {
  apiGateway: {
    URL: "https://api.memberpoint.io"

  },
  mediaGateway: {
    URL: "https://api.memberpoint.io"

  },
  stripe: {
    key: 'pk_test_Osu2iYG3m8zmTD1xI1vljmJN00jDeQAy6a'
    //key: process.env.STRIPE_STAGING_PUBLISHABLE_KEY
  },
};

const production = {
  apiGateway: {
    URL: "https://api.memberpoint.io"

  },
  mediaGateway: {
    URL: "https://api.memberpoint.io"

  },
  stripe: {
    URL: "https://api.memberpoint.io"

  },
}


const config = process.env.REACT_APP_DEPLOYMENT === 'production' ? production : ((process.env.REACT_APP_DEPLOYMENT === 'staging')? staging : local);

export default {
  someCommonConfig: '',
  ...config
};






