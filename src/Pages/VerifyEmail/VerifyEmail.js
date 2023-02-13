import { signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import AppContext from 'store/AppContext';
import { auth } from 'utils/Firebase/Config/firebase';

export default function VerifyEmail() {
  const { setIsLogged } = useContext(AppContext);
  const handleLogout = () => {
    setIsLogged(false);
    signOut(auth);
  };

  return (
    <div className="notFoundBox" style={{ padding: '0 50px' }}>
      <h2
        className="notFoundBox--heading notFoundBox--heading__2"
        style={{ textTransform: 'unset' }}
      >
        Verify your account
      </h2>
      <h3
        className="notFoundBox--heading notFoundBox--heading__3"
        style={{
          textTransform: 'unset',
          textAlign: 'justify',
          marginTop: '30px',
        }}
      >
        A verification link has been sent to your email. Please check your
        mailbox to verify the account before you sign in.
      </h3>
      <button className="notFoundBox--button" onClick={handleLogout}>
        Go back
      </button>
    </div>
  );
}
