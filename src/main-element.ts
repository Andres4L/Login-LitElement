import { LitElement, html, css, property } from 'lit-element';
class Login extends LitElement {
  @property({ type: String }) username = '';
  @property({ type: String }) password = '';
  @property({ type: Boolean }) isLoggedIn = false;
  @property({ type: String }) errorMessage = '';
  @property({ type: Number }) userId = 0;

  render() {
    if (this.isLoggedIn) {
      return html`<p>Bienvenido, has iniciado sesión con éxito.</p>`;
    }
    

    return html`
    <div class="back">
    <div class="card">
    <form @submit=${this.onSubmit}>
        <h1 class="titulo">Iniciar sesión</h1>
        <label for="username">Usuario:</label>
        <input
          type="text"
          id="username"
          .value=${this.username}
          @input=${(e: InputEvent) => (this.username = (e.target as HTMLInputElement).value)}
        /><br />

        <label for="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          .value=${this.password}
          @input=${(e: InputEvent) => (this.password = (e.target as HTMLInputElement).value)}
        /><br />

        <button type="submit">Iniciar sesión</button>
      </form>
      </div>
    </div>
      <p>${this.errorMessage}</p>
    `;
  }

  async onSubmit(e: Event) {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.username,
        password: this.password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      this.isLoggedIn = true;
      this.errorMessage = '';
      this.userId = data.user.id;
    } else {
      this.isLoggedIn = false;
      this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
    }
  }

  static styles = css`
   .back{
    width: 100%;
    height: 100vh;
    background-color: #DDFFBB;
    }
   
   .titulo{
      text-align: center;
      font-family: 'Roboto', sans-serif;
      margin-bottom: 30px;
    }
    .card {
      position: relative;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 16px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      background-color: #fff;
      top: 20%;
      margin-left: 30%;
      margin-right: 30%;
    }

     form {
      width: 100%;
      margin: 0 auto;
      max-width: 200px;
    }

    label{
      font-size: 15px;
      font-weight: bold;
      font-family: 'Roboto', sans-serif;
    } 
    input {
      display: block;
      margin-bottom: 10px;
      border-radius: 20px;
      height: 30px;
      width: 100%;
      background: #e6e6e6;
      border: none;
      font-family: 'Roboto', sans-serif;
    }

    button {
      
      background-color: #57B846;
      color: #ffff;
      padding: 10px 20px;
      border-radius: 20px;
      cursor: pointer;
      border: none;
      font-family: 'Roboto', sans-serif;
    }
  `;
}

customElements.define('login-component', Login);
