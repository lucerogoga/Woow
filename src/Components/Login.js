// Login component
import "../Assets/Login.css";

const Login = () => {
  return (
    <>
      <div class="login">
        <h1 class="login--title">WOOW</h1>

        <form class="login--form">
          <input
            id="email"
            class="login--input"
            placeholder="User email"
          ></input>
          <input
            id="password"
            class="login--input"
            placeholder="User password"
          ></input>
          <button class="login--submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
