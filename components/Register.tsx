import { FunctionComponent } from "preact";

const Register: FunctionComponent = () => {
  return (
    <div class="register-container">
      <h2>Register</h2>
      <form action="/register" method="POST">
        <label for="name">Nombre:</label>
        <input type="text" id="name" name="name" required />
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <button type="Añadir">Añadir</button>
        <p class="register-link"></p>
      </form>
    </div>
  );
};

export default Register;
