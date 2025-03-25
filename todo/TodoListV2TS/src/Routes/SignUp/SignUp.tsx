// import s from "./SignUp.module.scss"
import React, { useState } from "react"
import { Header } from "../../components/Header/Header"
import { useFetchSignUpMutation } from "../../store/apiSlice"
import { useNavigate } from "react-router-dom"

export function SignUp() {

  let [fetchSignUp] = useFetchSignUpMutation()
  let [user, setUser] = useState({ username: '', email: '', password: '' })
  let [passwordR, setPasswordR] = useState('')
  let nav = useNavigate()
  async function handleSendUserData(e: React.FormEvent) {
    e.preventDefault()
    try {
      if (passwordR == user.password) {
        let clearData = { username: user.username.trim(), email: user.email.trim(), password: user.password.trim() }
        await fetchSignUp(clearData)
        nav('/')
      } else {
        console.log('пароли не одинковые');
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <section>
      <Header />
      <form onSubmit={handleSendUserData}>
        <input type="text" placeholder="UserName" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
        <input type="text" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
        <input type="text" placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
        <input type="text" placeholder="Password retype" value={passwordR} onChange={(e) => setPasswordR(e.target.value)} />
        <button type="submit">Sign up</button>
      </form>
    </section>
  )
};

