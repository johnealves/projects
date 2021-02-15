import React, { Component } from 'react'
import './poke.css'

class Pokemon extends Component {
  render() {
    const { value, measurementUnit } = this.props.pokemons.averageWeight
    return (
      <div className='pokediv'>
        <img src={this.props.pokemons.image} alt={"Imagem-do-Pokemon"}></img>
        <div className='pokeInfo'>
          <p>#{this.props.pokemons.id}    {this.props.pokemons.name}</p> 
          <p>Type: {this.props.pokemons.type}</p>
          <p>Average Weight: {value} {measurementUnit}</p>
        </div>
      </div>
    )
  }
} 

export default Pokemon
