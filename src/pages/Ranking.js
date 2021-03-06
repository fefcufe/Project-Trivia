import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GiCrownedSkull } from 'react-icons/gi';
import { resetPlayer } from '../actions';
import '../Styles/ranking.css';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rankingList: [],
    };
  }

  componentDidMount() {
    const rankingList = JSON.parse(localStorage.getItem('ranking'));
    const sortedList = rankingList.sort((a, b) => (b.score - a.score));
    this.setState({ rankingList: sortedList });
  }

  onClickLogin = () => {
    const { history, restartGame } = this.props;
    history.push('./');
    restartGame();
  };

  render() {
    const { rankingList } = this.state;
    return (
      <div>
        <div className="ranking-head">
          <p data-testid="ranking-title">Ranking</p>
          <span role="img" aria-labelledby="trophy">
            <GiCrownedSkull />
          </span>

        </div>
        <div className="ranking-container">
          {rankingList.map((element, index) => (
            <div className="ranking-card" key={ index }>
              <img alt="player" src={ element.picture } />
              <div className="ranking-player-info">
                <span data-testid={ `player-name-${index}` }>{element.name}</span>
                <span data-testid={ `player-score-${index}` }>{element.score}</span>
              </div>
            </div>
          ))}
          <button
            className="ranking-go-home"
            type="button"
            data-testid="btn-go-home"
            onClick={ () => this.onClickLogin() }
          >
            Home
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  restartGame: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  restartGame: () => dispatch(resetPlayer()),
});

export default connect(null, mapDispatchToProps)(Ranking);
