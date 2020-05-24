import React, { Component } from 'react'
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";
import './Auth.css'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Error from '../../components/UI/Error/Error'
import * as actions from '../../store/actions/index'
import RedirectToPrevious from './RedirectToPrevious'

class Auth extends Component {
    state = {
        controlsLogin: {
            Email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Podaj adres email'
                },
                value: 'a@t.pl',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            Password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Podaj hasło'
                },
                value: 'aaa123',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        controlsRegister: {
            Email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Podaj adres email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            Password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Podaj hasło'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            PhoneNumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Podaj numer telefonu'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignup: true,
        customer: true
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        })
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandlerLogin = (event, controlName) => {
        const updatedControls = {
            ...this.state.controlsLogin,
            [controlName]: {
                ...this.state.controlsLogin[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controlsLogin[controlName].validation),
                touched: true
            }
        };
        this.setState({controlsLogin: updatedControls});
    }

    inputChangedHandlerRegister = (event, controlName) => {
        const updatedControls = {
            ...this.state.controlsRegister,
            [controlName]: {
                ...this.state.controlsRegister[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controlsRegister[controlName].validation),
                touched: true
            }
        };
        this.setState({controlsRegister: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault()
        if(this.state.isSignup) {
            this.props.onAuthLogin(this.state.controlsLogin.Email.value, this.state.controlsLogin.Password.value)
        } else {
            if(this.state.customer){
                this.props.onAuthRegister(
                    this.state.controlsRegister.Email.value,
                    this.state.controlsRegister.Password.value,
                    this.state.controlsRegister.PhoneNumber.value
                )
            } else {
                this.props.onAuthRegister(
                    this.state.controlsRegister.Email.value,
                    this.state.controlsRegister.Password.value,
                    this.state.controlsRegister.PhoneNumber.value,
                )
            }
        }
    }

    render() {
        const formElementsArrayLogin = []
        for(let key in this.state.controlsLogin) {
            formElementsArrayLogin.push({
                id: key,
                config: this.state.controlsLogin[key]
            })
        }

        const formLogin = formElementsArrayLogin.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandlerLogin( event, formElement.id )}
            />
        ))

        const formElementsArrayRegister = []
        for(let key in this.state.controlsRegister) {
            formElementsArrayRegister.push({
                id: key,
                config: this.state.controlsRegister[key]
            })
        }

        const formRegister = formElementsArrayRegister.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandlerRegister( event, formElement.id )}
            />
        ))

        return (
            <Aux>
                {this.props.error ? <Error message={this.props.message}/> : null}
                <div className='form-style'>
                    <form onSubmit={this.submitHandler}> 
                            {this.state.isSignup ? formLogin: formRegister}
                    <Button>{this.state.isSignup? 'ZALOGUJ' : 'ZAREJESTRUJ'}</Button>
                    </form>
                    <Button
                        clicked={this.switchAuthModeHandler}
                        >{this.state.isSignup ? 'Zarejestruj się' : 'Zaloguj się'}</Button>
                </div>
                {this.props.isAuthenticated?
                <RedirectToPrevious></RedirectToPrevious>
                :null
                }
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
      error: state.auth.error,
      message: state.auth.message,
      isAuthenticated : state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthLogin: (email, password) => dispatch(actions.authLogin(email, password)),
        onAuthRegister: (email, password, phoneNumber) => {
            dispatch(actions.authRegister(email, password, phoneNumber))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)