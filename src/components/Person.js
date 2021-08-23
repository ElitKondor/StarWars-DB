import React from 'react';
import PropTypes from 'prop-types';
import Image from './Image';
import Loading from './Loading';
import { loadPerson } from '../services/sw-service';

class Person extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialId: 1,
      person: {},
      isLoading: true,
      type: 'character',
    };
  }

  handleNext() {
    this.props.handleClearMessages();
    this.setState(({ state }) => ({
      isLoading: true,
    }));

    setTimeout(async () => {
      let response = await loadPerson(this.state.initialId);
      this.setState(state => ({
        person: response.data,
        initialId: ++state.initialId,
        isLoading: false,
      }));
    }, 500);
  }

  async componentDidMount() {
    this.handleNext();
  }

  render() {
    const { person, isLoading } = this.state;
    const personCard = (
      <>
        <div className="bg-gray-50 max-w-max m-0 rounded-lg">
          <Image
            class={'max-w-sm rounded-t-lg'}
            type={this.state.type}
            id={this.state.initialId - 1}
          />
          <h3 className="ml-2 text-center">{person.name}</h3>
          <ul className="ml-2 pb-2">
            <li>
              <span className="font-bold">Gender: </span>
              {person.gender}
            </li>
            <li>
              <span className="font-bold">Birth Year: </span>
              {person.birth_year}
            </li>
            <li>
              <span className="font-bold">Eye Color: </span>
              {person.eye_color}
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
    return <>{isLoading ? <Loading /> : personCard}</>;
  }
}

Person.defaultProps = {
  initialId: 1,
};

Person.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    eye_color: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }),
  initialId: PropTypes.number.isRequired,
  isLoading: PropTypes.bool,
};

export default Person;
