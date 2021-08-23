import PropTypes from 'prop-types';

function Header({ active = 'person', handleClick }) {
  return (
    <div className="w-full flex p-4 justify-center space-x-4  bg-opacity-80 border-b-1 text-white">
      <a
        className={`cursor-pointer hover:underline ${
          active === 'person' ? 'font-bold underline' : 'no-underline'
        }`}
        onClick={() => handleClick('person')}
        href="#person"
      >
        Characters
      </a>
      <a
        className={`cursor-pointer hover:underline ${
          active === 'planet' ? 'font-bold underline' : 'no-underline'
        }`}
        onClick={() => handleClick('planet')}
        href="#planet"
      >
        Planets
      </a>
      <a
        className={`cursor-pointer hover:underline ${
          active === 'starship' ? 'font-bold underline' : 'no-underline'
        }`}
        onClick={() => handleClick('starship')}
        href="#starship"
      >
        StarShips
      </a>
    </div>
  );
}

Header.propTypes = {
  active: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};

export default Header;
