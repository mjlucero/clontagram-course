import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Main from '../Componentes/Main';
import Axios from 'axios';
import Loading from '../Componentes/Loading';
import Post from '../Componentes/Post';

async function cargarPosts(fechaUltimoPost) {
	const query = fechaUltimoPost ? `?fecha=${fechaUltimoPost}` : '';

	const { data: nuevosPosts } = await Axios.get(`/api/posts/feed${query}`);

	return nuevosPosts;
}

export default function Feed({ mostrarError, usuario }) {
	const [posts, setPosts] = useState([]);
	const [cargandoPostsIniciales, setCargandoPostsIniciales] = useState(true);

	useEffect(() => {
		async function cargarPostsIniciales() {
			try {
				const nuevosPosts = await cargarPosts();
				setPosts(nuevosPosts);
				setCargandoPostsIniciales(false);
			} catch (error) {
				mostrarError('Hubo un problema cargando tu feed');
			}
		}

		cargarPostsIniciales();
	}, []);

	function actualizarPost(postOriginal, postActualizado) {
		setPosts(posts => {
			const postActualizados = posts.map(post => {
				if (post !== postOriginal) {
					return post;
				}

				return postActualizado;
			});

			return postActualizados;
		});
	}

	if (cargandoPostsIniciales) {
		return (
			<Main center>
				<Loading />
			</Main>
		);
	}

	if (!cargandoPostsIniciales && posts.length === 0) {
		return (
			<Main>
				<NoSiguesANadie />
			</Main>
		);
	}

	return (
		<Main center>
			<div className="Feed">
				{posts.map(post => (
					<Post key={post._id} post={post} actualizarPost={actualizarPost} mostrarError={mostrarError} usuario={usuario} />
				))}
			</div>
		</Main>
	);
}

function NoSiguesANadie() {
	return (
		<div className="NoSiguesANadie">
			<p className="NoSiguesANadie__mensaje">Tu feed no tiene fotos porque no sigues a nadie, o porque no han publicado fotos</p>
			<div className="text-center">
				<Link to="/explore" className="NoSiguesANadie__boton">
					Explora Clontagram
				</Link>
			</div>
		</div>
	);
}
