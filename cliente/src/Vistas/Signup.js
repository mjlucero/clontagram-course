import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Main from '../Componentes/Main';
import imagenSignup from '../imagenes/signup.png';

export default function Signup({ signup, mostrarError }) {
	const [usuario, setUsuario] = useState({
		email: '',
		username: '',
		password: '',
		bio: '',
		nombre: ''
	});

	function handleInputChange(e) {
		setUsuario({
			...usuario,
			[e.target.name]: e.target.value
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			await signup(usuario);
		} catch (error) {
			mostrarError(error.response.data);
			console.log(error);
		}
	}

	return (
		<Main center={true}>
			<div className="Signup">
				<img src={imagenSignup} alt="" className="Signup__img"></img>
				<div className="FormContainer">
					<h1 className="Form__titulo">Clontagram</h1>
					<p className="FormContainer__info">Registrate para que veas el clon de Instagram</p>
					<form onSubmit={handleSubmit}>
						<input type="email" name="email" placeholder="Email" className="Form__field" value={usuario.email} onChange={handleInputChange} required />
						<input type="text" name="nombre" placeholder="Nombre y Apellido" className="Form__field" value={usuario.nombre} required minLength="3" maxLength="100" onChange={handleInputChange} />
						<input type="text" name="username" placeholder="Username" className="Form__field" value={usuario.username} required minLength="3" maxLength="30" onChange={handleInputChange} />
						<input type="text" name="bio" placeholder="Cuentanos de ti..." className="Form__field" value={usuario.bio} required maxLength="150" onChange={handleInputChange} />
						<input type="password" name="password" placeholder="Contraseña" className="Form__field" value={usuario.password} required onChange={handleInputChange} />
						<button type="submit" className="Form__submit">
							Signup
						</button>
						<p className="FormContainer__info">
							Ya tienes cuenta? <Link to="/login">Login</Link>
						</p>
					</form>
				</div>
			</div>
		</Main>
	);
}
