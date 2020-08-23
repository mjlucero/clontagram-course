import React, { useState, useEffect } from 'react'
import Main from '../Componentes/Main'
import Loading from '../Componentes/Loading';
import Axios from 'axios';
import RecursoNoExiste from '../Componentes/RecursoNoExiste';
import Avatar from '../Componentes/Avatar';
import BotonLike from '../Componentes/BotonLike';
import Comentar from '../Componentes/Comentar';

export default function PostVista({ mostrarError, match }) {
    const postId = match.params.id;
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [postNoExiste, setPostNoExiste] = useState(false);

    useEffect(() => {
        async function cargarPost() {
            try {
                const { data: post } = await Axios(`/api/posts/${postId}`);
                setPost(post);
                setLoading(false);
            } catch (error) {
                if (error.response && (error.response.status === 404 || error.response.status ===400)) {
                    setPostNoExiste(true);
                }else {
                    mostrarError("Hubo un problema cargando este post.")
                }
                setLoading(false);
            }
        }
        
        cargarPost();
    }, [postId])

    if (loading) {
        return (<Main center>
            <Loading/>
        </Main>)
    }

    if (postNoExiste) {
        return <RecursoNoExiste mensaje="El post que estas intentando ver no existe"></RecursoNoExiste>
    }

    if (!post) {
        return null;
    }

    return (
        <Main center>
            <Post {...post}/>
        </Main>
    )
}

function Post({ comentarios, caption, url, usuario, estaLike, onSubmitLike, onSubmitComentario }) {
    return(
        <div className="Post">
            <div className="Post__image-container">
                <img src={url} alt={caption}/>
            </div>
            <div className="Post__side-bar">
                <Avatar usuario={usuario} />
                <div className="Post__comentarios-y-like">
                    <Comentarios />
                    <div className="Post__like">
                        <BotonLike onSubmitLike={onSubmitLike} like={estaLike}/>
                    </div>
                    <Comentar onSubmitComentario={onSubmitComentario}></Comentar>
                </div>
            </div>
        </div>
    )
}

function Comentarios({ usuario, caption, comentarios }) {
    return null;
}
