const pesquisa = document.querySelector('#pesquisa');
const numero = document.querySelector('#numero');
const pokeImagem = document.querySelector('#poke-imagem');
const tipos = document.querySelector('.tipos');
const pokedex = document.querySelector('.container');
const nomePokemon = document.querySelector('.nome-pokemon');

const form = document.querySelector('.form');

const btnVolt = document.querySelector('.btn-volt');
const btnProx = document.querySelector('.btn-prox');

const coresTipos = {
    "rock":     [182, 158,  49],
    "ghost":    [112,  85, 155],
    "steel":    [183, 185, 208],
    "water":    [100, 147, 235],
    "grass":    [116, 203,  72],
    "psychic":  [251,  85, 132],
    "ice":      [154, 214, 223],
    "dark":     [117,  87,  76],
    "fairy":    [230, 158, 172],
    "normal":   [170, 166, 127],
    "fighting": [193,  34,  57],
    "flying":   [168, 145, 236],
    "poison":   [164,  62, 158],
    "ground":   [222, 193, 107],
    "bug":      [167, 183,  35],
    "fire":     [245, 125,  49],
    "electric": [249, 207,  48],
    "dragon":   [112,  55, 255]
};

let searchPokemon = 1;

const buscaPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  console.log(APIResponse)

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  } else {
    alert('Esse pokemon não existe!')
  }
}

//mostrar todos os dados no html
const renderPokemon = async (pokemon) => {
    nomePokemon.innerHTML = 'Carregando ...';
    numero.innerHTML = '';

  const data = await buscaPokemon(pokemon);

  if (data) {
    pokeImagem.style.display = 'block';
    nomePokemon.innerHTML = data.name; //nome pokemon
    numero.innerHTML = '#' + data.id; //id pokemon
    pokeImagem.src = data['sprites']['other']['home']['front_default']; //imagem pokemon
    searchPokemon = data.id;
    //tipo do pokemon
  tipos.innerHTML = ''; //tipo do pokemon
  data.types.forEach((t) => {
      let novoTipo = document.createElement('span');
      let color   = coresTipos[t.type.name];
  
      novoTipo.innerHTML = t.type.name;
      novoTipo.classList.add('tipo');
      novoTipo.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`; 
  
      tipos.appendChild(novoTipo);
  });
  }
  
  console.log(renderPokemon)
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(pesquisa.value.toLowerCase());
});

btnVolt.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

btnProx.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);