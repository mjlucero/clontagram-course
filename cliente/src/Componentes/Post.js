import React from 'react';

export default function Post({ post, actualizarPost }) {
	const { numLikes, numComentarios, _id, caption, url, usuario, estaLike } = post;
	return (
		<div className="Post-Componente">
			<img src={url} alt={caption} className="Post-Componente__img" />
		</div>
	);
}
