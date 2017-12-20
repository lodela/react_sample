import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactModal from 'react-modal';

const musicData = [
  { artist: 'Adele', name: '25', sales: 1731000 },
  { artist: 'Drake', name: 'Views', sales: 1608000 },
  { artist: 'Beyonce', name: 'Lemonade', sales: 1554000 },
  { artist: 'Chris Stapleton', name: 'Traveller', sales: 1085000 },
  { artist: 'Pentatonix', name: 'A Pentatonix Christmas', sales: 904000 },
  { artist: 'Original Broadway Cast Recording', name: 'Hamilton: An American Musical', sales: 820000 },
  { artist: 'Twenty One Pilots', name: 'Blurryface', sales: 738000 },
  { artist: 'Prince', name: 'The Very Best of Prince', sales: 668000 },
  { artist: 'Rihanna', name: 'Anti', sales: 603000 },
  { artist: 'Justin Bieber', name: 'Purpose', sales: 554000 }
];

var totalSales = 0;
for(var a in musicData){
  totalSales = (totalSales + musicData[a].sales);
}
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      musicData,
      shouldHide:true,
    };
    this.handleFilterMusicData = this.handleFilterMusicData.bind(this);
    this.handleNameLength      = this.handleNameLength.bind(this);
    this.handleAddArtist       = this.handleAddArtist.bind(this);
  }
  handleAddArtist(artist){
    this.setState({musicData:[...this.state.musicData, artist]})
  }
  handleRemoveArtist(index){
    // console.log(index);
    this.setState({
      musicData:this.state.musicData.filter(function(e,i){
        return i !== index;
      })
    })
  }
  handleFilterMusicData(filterBy){
    // console.log(filterBy);
    this.setState({
      musicData:this.state.musicData.filter(function(e,i){
        return e.sales >= filterBy;
      })
    });
    if(!this.state.shouldHide){
      this.setState({
        shouldHide: true
      })
    }else{
      this.setState({
        shouldHide: false
      })
    }
  }
  handleNameLength(nameLength){
    // console.log(nameLength);
    this.setState({
      musicData:this.state.musicData.filter(function(e,i){
        return e.name.length >= nameLength;
      }),
      shouldHide:true
    })
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <h4><span className="glyphicon glyphicon-music"></span> Lista de Discos <small> <span className="badge">{this.state.musicData.length}</span></small></h4>
          <FilterSales onFilterArtist={this.handleFilterMusicData} onNameLength={this.handleNameLength}></FilterSales>
          <h5>Total de discos vendidos: <span className="badge">{totalSales}</span></h5>
          <hr/>
          <ul className="list-group">
            {this.state.musicData.map((musicData,index)=>
              <li className="list-group-item" key={index}>
                <h5 className="list-group-item-heading" id="ArtistName"><span className="glyphicon glyphicon-user"></span> {musicData.artist} <span className={this.state.shouldHide ? 'hidden' : ''} id="great">es un gran artista</span>  </h5>
                <p><span className="glyphicon glyphicon-star-empty"></span>album name: <b> {musicData.name}</b></p>
                <p><span className="glyphicon glyphicon-cd"></span> sales: <span className="badge">{musicData.sales}</span></p>
                <button type="button" className="btn btn-danger btn-xs" onClick={this.handleRemoveArtist.bind(this, index)}><small><span className="glyphicon glyphicon-trash"></span></small> Borrar</button>
              </li>
            )}
          </ul>
        </div>
        <div className="row">
          <AgregaArtista onAddArtist={this.handleAddArtist}></AgregaArtista>
        </div>
      </div>
    );
  }
}

class FilterSales extends Component{
  constructor () {
    super();
    this.state = {
      showModal: false,
    };
    this.handleOpenModal  = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  handleOpenModal () {
    this.setState({ showModal: true });
  }
  handleCloseModal () {
    this.setState({ showModal: false });
  }
  filterArtist(event){
    event.preventDefault();
    const filterBy = 1000000;
    this.props.onFilterArtist(filterBy);
  }
  nameLenght(event){
    event.preventDefault();
    const nameLength = 8;
    this.props.onNameLength(nameLength);
  }
  render(){
    return(
      <div className="btn-group" role="group" aria-label="actions">
        <ReactModal
           isOpen={this.state.showModal}
           ariaHideApp={false}
           contentLabel="Agregar Artista a la lista..."
        >
        <div className="modal-header">
          <button type="button" className="close" onClick={this.handleCloseModal}>×</button>
        </div>
          <AgregaArtista onAddArtist={this.handleAddArtist}></AgregaArtista>
        </ReactModal>
        <button type="button" className="btn btn-primary btn-xs" onClick={this.filterArtist.bind(this)}>¿quienes vendieron mas de 1,000,000 de copias?</button>
        <button type="button" className="btn btn-defaul btn-xs"  onClick={this.nameLenght.bind(this)}>more than 8 chars</button>
      </div>
    );
  }
}
/*<button type="button" className="btn btn-default btn-xs" onClick={this.handleOpenModal}>Agregar Artista</button>*/
class AgregaArtista extends Component{
  constructor(props){
    super(props);
    this.state={
      artist:'',
      name  :'',
      sales :''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit      = this.handleSubmit.bind(this);
  }
  handleInputChange(event){
    const target = event.target;
    const value  = target.value;
    const name   = target.name;

    this.setState({
      [name]:value
    })
  }
  handleSubmit(event){
    event.preventDefault();
    this.props.onAddArtist(this.state);
    this.setState({
      artist:'',
      name:'',
      sales:''
    });
  }

  render(){
    return(
      <div>
        <h4>Agregar Nuevo Artista</h4>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="inputMusicDataArtist" className="col-sm-2 control-label">Artista</label>
            <div className="col-sm-10">
              <input name="artist"
                     type="text"
                     className="form-control"
                     id="inputMusicDataArtist"
                     value={this.state.artist}
                     onChange={this.handleInputChange}
                     placeholder="Nombre Artista">
              </input>
            </div>
            <label htmlFor="inputMusicDataName" className="col-sm-2 control-label">Album</label>
            <div className="col-sm-10">
              <input name="name"
                     type="text"
                     className="form-control"
                     id="inputMusicDataName"
                     value={this.state.name}
                     onChange={this.handleInputChange}
                     placeholder="Album">
              </input>
            </div>
            <label htmlFor="inputMusicDataSales" className="col-sm-2 control-label">Ventas</label>
            <div className="col-sm-10">
              <input name="sales"
                     type="number"
                     className="form-control"
                     id="inputMusicDataSales"
                     value={this.state.sales}
                     onChange={this.handleInputChange}
                     placeholder="No. de copias vendidas">
              </input>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10 btn-group" role="group" aria-label="actions">
              <button type="submit" className="btn btn-success">Agregar Artista</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
