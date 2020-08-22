import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { toggleLike, comentar } from '../Helpers/post-helpers';

import Avatar from './Avatar';
import BotonLike from './BotonLike';
import Comentar from './Comentar';

export default function Post({ post, actualizarPost, mostrarError, usuario }) {
	const { numLikes, numComentarios, _id, caption, url, usuario: usuarioPost, estaLike, comentarios } = post;

	const [enviandoLike, setEnviandoLike] = useState(false);

	async function onSubmitLike() {
		if (enviandoLike) {
			return;
		}

		try {
			setEnviandoLike(true);

			const postActualizado = await toggleLike(post);
			actualizarPost(post, postActualizado);

			setEnviandoLike(false);
		} catch (error) {
			setEnviandoLike(false);
			mostrarError('Hubo un problema modificando el like. Intenta de nuevo');
		}
	}

	async function onSubmitComentario(mensaje) {
		const postActualizado = await comentar(post, mensaje, usuario);

		actualizarPost(post, postActualizado);
	}

	return (
		<div className="Post-Componente">
			<Avatar usuario={usuarioPost} />
			<img src={url} alt={caption} className="Post-Componente__img" />
			<div className="Post-Componente__acciones">
				<div className="Post-Componente__like-container">
					<BotonLike onSubmitLike={onSubmitLike} like={estaLike} />
				</div>
				<p>Liked por {numLikes} personas</p>
				<ul>
					<li>
						<Link to={`/perfil/${usuarioPost.username}`}>
							<b>{usuarioPost.username}</b>
						</Link>{' '}
						{caption}
					</li>
					<VerTodosLosComentarios _id={_id} numComentarios={numComentarios} />
					<Comentarios comentarios={comentarios} />
				</ul>
			</div>
			<Comentar onSubmitComentario={onSubmitComentario} />
		</div>
	);
}

function VerTodosLosComentarios({ _id, numComentarios }) {
	if (numComentarios < 4) {
		return null;
	}

	return (
		<li className="text-grey-dark">
			<Link to={`/post/${_id}`}>Ver los {numComentarios} comentarios</Link>
		</li>
	);
}

function Comentarios({ comentarios }) {
	if (comentarios.lenght === 0) {
		return null;
	}

	return comentarios.map(comentario => (
		<li key={comentario._id}>
			<Link to={`/perfil/${comentario.usuario.username}`}>
				<b>{comentario.usuario.username}</b>
			</Link>{' '}
			{comentario.mensaje}
		</li>
	));
}
