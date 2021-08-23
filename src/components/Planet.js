import React from 'react';
import PropTypes from 'prop-types';
import Image from './Image';
import { loadPlanet } from '../services/sw-service';
import Loading from './Loading';

class Planet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialId: 1,
      planet: {},
      isLoading: true,
      type: 'planet',
    };
  }

  handleNext() {
    this.setState(({ state }) => ({
      isLoading: true,
    }));

    setTimeout(async () => {
      let response = await loadPlanet(this.state.initialId);
      this.setState(state => ({
        planet: response.data,
        initialId: ++state.initialId,
        isLoading: false,
      }));
    }, 500);
  }

  async componentDidMount() {
    this.handleNext();
  }

  render() {
    const { planet, isLoading } = this.state;
    const planetCard = (
      <>
        <div className="bg-gray-50 max-w-max m-0 rounded-lg">
          <Image
            class={'max-w-sm rounded-t-lg'}
            type={this.state.type}
            id={this.state.initialId - 1}
          />
          <h3 className="ml-2 text-center">{planet.name}</h3>
          <ul className="ml-2 pb-2">
            <li>
              <span className="font-bold">Climate: </span>
              {planet.climate}
            </li>
            <li>
              <span className="font-bold">Gravity: </span>
              {planet.gravity}
            </li>
            <li>
              <span className="font-bold">Terrain: </span>
              {planet.terrain}
            </li>
          </ul>
          <button
            className="w-full bg-green-100 py-1 px-4 rounded hover:bg-green-300 hover:bg-green-300 font-bold"
            onClick={this.handleNext.bind(this)}
          >
            Next
          </button>
        </div>
      </>
    );
    return <>{isLoading ? <Loading /> : planetCard}</>;
  }
}

Planet.defaultProps = {
  initialId: 1,
};

Planet.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    climate: PropTypes.string.isRequired,
    gravity: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }),
  initialId: PropTypes.number.isRequired,
  isLoading: PropTypes.bool,
};

export default Planet;
