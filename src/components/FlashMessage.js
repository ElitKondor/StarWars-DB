import PropTypes from 'prop-types';

function FlashMessage({ message, handleDeleteMessage }) {
  const getCss = type => {
    switch (type) {
      case 'danger':
        return 'bg-red-600';
      case 'success':
        return 'bg-green-500';
      case 'info':
        return 'bg-blue-500';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-200';
    }
  };
  return (
    <div
      className={`flex mb-10 justify-between shadow-lg p-2 rounded ${getCss(
        message.type,
      )}`}
    >
      <div>{message.text}</div>
      <div
        onClick={() => handleDeleteMessage(message.id)}
        className="cursor-pointer"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.001 0C5.37162 0 0 5.37243 0 12.0022C0 18.6279 5.37162 24 12.001 24C18.6314 24 24 18.6279 24 12.0022C24 5.3721 18.6314 0 12.001 0ZM17.2487 15.5117C17.7056 15.9834 17.5645 16.8627 16.9309 17.477C16.2978 18.0912 15.4144 18.2088 14.9565 17.737L11.9655 14.6576L8.88478 17.6482C8.41395 18.1051 7.53458 17.962 6.92029 17.3299C6.30599 16.6977 6.18936 15.8145 6.66019 15.3566L9.74095 12.3659L6.74998 9.28546C6.29307 8.81468 6.43654 7.9344 7.06872 7.32016C7.69992 6.70692 8.58525 6.58997 9.04117 7.06009L12.0321 10.1402L15.1139 7.15087C15.5857 6.693 16.4651 6.83613 17.0784 7.46826C17.6937 8.10038 17.8093 8.98463 17.3385 9.4425L14.2587 12.4322L17.2487 15.5117Z"
            fill="#231F20"
          />
        </svg>
      </div>
    </div>
  );
}

FlashMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.any.isRequired,
    type: PropTypes.oneOf(['danger', 'success', 'info', 'warning']),
    text: PropTypes.string.isRequired,
  }),
  handleDeleteMessage: PropTypes.func,
};

export default FlashMessage;
