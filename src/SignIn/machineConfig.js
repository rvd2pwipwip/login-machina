//https://css-tricks.com/using-react-and-xstate-to-build-a-sign-in-form/

const machineConfig = {
  id: "signIn",
  context: {
    email: "",
    password: ""
  },
  initial: "dataEntry",
  states: {
    // On submit, target the two fields (actions)
    dataEntry: {
      on: {
        ENTER_EMAIL: {
          actions: "cacheEmail"
        },
        ENTER_PASSWORD: {
          actions: "cachePassword"
        },
        EMAIL_BLUR: {
          cond: "isBadEmailFormat",
          target: "emailErr.badFormat"
        },
        PASSWORD_BLUR: {
          cond: "isPasswordShort",
          target: "passwordErr.tooShort"
        },
        SUBMIT: [
          {
            cond: "isBadEmailFormat",
            target: "emailErr.badFormat"
          },
          {
            cond: "isPasswordShort",
            target: "passwordErr.tooShort"
          },
          {
            target: "awaitingResponse"
          }
        ]
      }
    },
    // awaitingResponse: {},
    // We’re in a state of waiting for a response
    awaitingResponse: {
      // Make a call to the authentication service
      invoke: {
        src: "requestSignIn",
        // If successful, move to the signedIn state
        onDone: {
          target: "signedIn"
        },
        // If email input is unsuccessful, move to the emailErr.noAccount sub-state
        onError: [
          {
            cond: "isNoAccount",
            target: "emailErr.noAccount"
          },
          {
            // If password input is unsuccessful, move to the passwordErr.incorrect sub-state
            cond: "isIncorrectPassword",
            target: "passwordErr.incorrect"
          },
          {
            // If the service itself cannot be reached, move to the serviceErr state
            cond: "isServiceErr",
            target: "serviceErr"
          }
        ]
      }
    },
    // If there’s an email error on that field, trigger email cache action
    emailErr: {
      on: {
        ENTER_EMAIL: {
          actions: "cacheEmail",
          target: "dataEntry"
        }
      },
      initial: "badFormat",
      states: {
        badFormat: {},
        noAccount: {}
      }
    },
    // If there’s a password error on that field, trigger password cache action
    passwordErr: {
      on: {
        ENTER_PASSWORD: {
          actions: "cachePassword",
          target: "dataEntry"
        }
      },
      initial: "tooShort",
      states: {
        tooShort: {},
        incorrect: {}
      }
    },
    serviceErr: {
      on: {
        SUBMIT: {
          target: "awaitingResponse"
        }
      }
    },
    signedIn: {
      type: "final"
    },
    onDone: {
      actions: "onAuthentication"
    }
  }
};

export default machineConfig;
