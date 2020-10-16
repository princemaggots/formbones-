import { loadComponents } from 'next/dist/next-server/server/load-components'
import Link from 'next/link'
import { signIn, signOut, useSession } from '../node_modules/next-auth/client'
import styles from './header.module.css'
import Profile from '../components/profile/menu'

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header () {
  const [ session, loading ] = useSession()
  
  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p className={`nojs-show ${(!session && loading) ? styles.loading : styles.loaded}`}>
          {!session && <>
            <span className={styles.notSignedInText}>You are not signed in</span>
            <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
          </>}
          {session && <>
            {session.user.image && <span style={{backgroundImage: `url(${session.user.image})` }} className={styles.avatar}/>}
            <span className={styles.signedInText}>
              <small>Signed in as</small><br/>
              <strong>{session.user.email || session.user.name}</strong>
              </span>
            <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
          </>}
        </p>
      </div>
      <div className="header">

{/* make sign in part of the profile button */}

<div className="logo">
<h1>  <a href="/">Bare Bones</a></h1>
</div>

 <div className="nav">
    <div className="support">
    <a href="/directory/donate">donate</a>
    </div>
    <div className="post">
      <a href="/directory/character/post">post</a>
    </div> 
{/*     <Profile/> */}
{/*     <div className="profile">
        <div className="proimg">
        <img src="https://via.placeholder.com/30" alt="profile"></img>
        </div>  
        <div className="txt">
        <p> Profile </p>
      </div>
    </div> */}
</div> 
</div>
    </header>
  )
}
