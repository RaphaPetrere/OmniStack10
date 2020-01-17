import React from 'react';

import './styles.css';

function DevItem({ dev }){
    //const {dev} = props; pode fazer assim ou como iremos fazer com a desestruturação 
    return (
        <li className="dev-item">
            <header>
              <img src={dev.avatar_url} alt={dev.name} />
              <div className="user-info">
                <strong>{dev.name}</strong>
                <span>{dev.techs.join(', ')}</span>
              </div>
            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
          </li>
    );
}

export default DevItem;