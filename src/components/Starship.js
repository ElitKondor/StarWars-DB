import React from 'react';
import PropTypes from 'prop-types';
import Image from './Image';
import { loadStarship } from '../services/sw-service';
import Loading from './Loading';

class Starship extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialId: 2,
      starship: {},
      isLoading: true,
      type: 'starship',
    };
  }

  handleNext() {
    this.props.handleClearMessages();
    this.setState(({ state }) => ({
      isLoading: true,
    }));

    setTimeout(async () => {
      try {
        let response = await loadStarship(this.state.initialId);
        this.setState(state => ({
          starship: response.data,
          initialId: ++state.initialId,
          isLoading: false,
        }));
      } catch (error) {
        this.props.handleAddMessage({
          type: 'danger',
          text: `Item with ID[${this.state.initialId}] has been skipped. Because of ${error.message}`,
        });
        this.setState(state => ({
          isLoading: false,
          initialId: ++state.initialId,
        }));
      }
    }, 500);
  }

  async componentDidMount() {
    this.handleNext();
  }

  render() {
    const { starship, isLoading } = this.state;
    const starshipCard = (
      <>
        <div className="bg-gray-50 max-w-max m-0 rounded-lg">
          <Image
            class={'max-w-sm rounded-t-lg'}
            type={this.state.type}
            id={this.state.initialId - 1}
          />
          <h3 className="ml-2 text-center">{starship.name}</h3>
          <ul className="ml-2 pb-2">
            <li>
              <span className="font-bold">Manufacturer: </span>
              {starship.manufacturer}
            </li>
            <li>
              <span className="font-bold">Passengers: </span>{' '}
              {starship.passengers}
            </li>
            <li>
              <span className="font-bold">Class:</span>{' '}
              {starship.starship_class}
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
    return <>{isLoading ? <Loading /> : starshipCard}</>;
  }
}

Starship.defaultProps = {
  initialId: 1,
};

Starship.propTypes = {
  starship: PropTypes.shape({
    name: PropTypes.string.isRequired,
    manufacturer: PropTypes.string.isRequired,
    passengers: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }),
  initialId: PropTypes.number.isRequired,
  isLoading: PropTypes.bool,
};

export default Starship;
