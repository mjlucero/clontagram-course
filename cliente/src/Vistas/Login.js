import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Main from '../Componentes/Main';

export default function Login({ login, mostrarError }) {
	const [loginData, setLoginData] = useState({ email: '', password: '' });

	function handleInputChange(e) {
		setLoginData({
			...loginData,
			[e.target.name]: e.target.value
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			await login(loginData.email, loginData.password);
		} catch (error) {
			console.log(error);
			mostrarError(error.response.data);
		}
	}

	return (
		<Main center={true}>
			<div className="FormContainer">
				<h1 className="Form__titulo">Clontagram</h1>
				<div>
					<form onSubmit={handleSubmit}>
						<input type="email" name="email" placeholder="Email" className="Form__field" value={loginData.email} onChange={handleInputChange} required />
						<input type="password" name="password" placeholder="Contraseña" className="Form__field" value={loginData.password} required onChange={handleInputChange} />
						<button className="Form__submit">Login</button>
						<p className="FormContainer__info">
							No tienes cuenta? <Link to="/signup">Signup</Link>
						</p>
					</form>
				</div>
			</div>
		</Main>
	);
}
