import * as React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
//Link not belong browserRouter
import doAxios from 'utils/doAxios'
interface IForm {
    email: string
    password: string
}
interface IMessenge {
    text: string
    isWarning: boolean
}
const LoginAndSignUp = () => {
    console.log('login render')
    const history = useHistory()
    React.useEffect(() => {
        const validateToken = async () => {
            if (!localStorage.getItem('token')) {
                return
            }
            const result = await doAxios('post', 'register', { data: form })
            if (result.isSuccess) {
                history.push('/')
            }
        }
        validateToken()
    }, [])
    const [form, setForm] = React.useState<IForm>({
        password: '',
        email: ''
    })
    const [isSignUp, setIsSignUp] = React.useState<string>('')
    const [isPasswordSame, setIsPasswordSame] = React.useState<boolean>(false)
    const [messenge, setMessenge] = React.useState<IMessenge>({
        text: '',
        isWarning: false
    })
    const handleConfirmPassword = (confirmPassword: string) => {
        if (confirmPassword === form.password) {
            setIsPasswordSame(true)
            setMessenge({ isWarning: false, text: '' })
            return
        }
        setMessenge({ isWarning: true, text: '密碼不相符' })
    }
    const handleSignUp = async () => {
        if (!isPasswordSame) {
            return
        }
        const result = await doAxios('post', 'register', { data: form })
        if (!result.isSuccess) {
            setMessenge({ isWarning: true, text: result.content })
            return
        }
        setMessenge({ isWarning: false, text: '註冊成功' })
        history.go(0)
    }
    const handleLogin = async () => {
        const result = await doAxios('post', 'login', { data: form })
        if (!result.isSuccess) {
            setMessenge({ isWarning: true, text: result.content })
            return
        }
        localStorage.setItem('token', result.content)
        setMessenge({ isWarning: false, text: '登入成功' })
        history.go(0)

    }
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <>
            {messenge.text !== '' ? <div>{messenge.text}</div> : null}
            <div>電子郵件: <input type="text" name="email" onChange={e => handleFormChange(e)} /></div>
            <div>密碼: <input type="text" name="password" onChange={e => handleFormChange(e)} /></div>
            {
                isSignUp ? <div>確認密碼:<input type="text" name="confirmPassword" onChange={e => handleConfirmPassword(e.target.value)} /> </div> : null
            }
            {
                isSignUp ? <button>註冊</button> : <button>登入</button>
            }
        </>
    )
}


export default LoginAndSignUp;
