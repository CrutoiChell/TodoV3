// import s from "./SignIn.module.scss"
import { useState } from "react"
import { Header } from "../../components/Header/Header"
import { useFetchSignInMutation } from "../../store/apiSlice"
import { useNavigate } from "react-router-dom"
export function SignIn() {

  let nav = useNavigate()

  let [userData, setUserData] = useState({ email: '', password: '' })
  let [fetchSignIn] = useFetchSignInMutation()
  async function SignIn(e: React.FormEvent) {
    e.preventDefault()
    try {
      let clearData = { email: userData.email.trim(), password: userData.password.trim() }
      let token = await fetchSignIn(clearData)
      localStorage.setItem('token', token.data)
      nav('/')
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Header />
      <form onSubmit={SignIn}>
        <input type="text" placeholder="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
        <input type="text" placeholder="password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
        <button>Sign In</button>
      </form>
    </>
  )
};