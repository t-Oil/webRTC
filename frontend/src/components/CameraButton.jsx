const CameraButton = (props) => {
  const { toggleCamera, isCameraOn } = props;

  return (
    <button onClick={toggleCamera} className="toggle-button camera-button">
      {" "}
      {isCameraOn ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-camera-fill"
          viewBox="0 0 16 16"
          id="IconChangeColor"
        >
          {" "}
          <path
            d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"
            id="mainIconPathAttribute"
          ></path>{" "}
          <path
            d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"
            id="mainIconPathAttribute"
          ></path>{" "}
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-camera-off"
          id="IconChangeColor"
        >
          <line x1="1" y1="1" x2="23" y2="23"></line>
          <path
            d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56"
            id="mainIconPathAttribute"
          ></path>
        </svg>
      )}
    </button>
  );
};

export default CameraButton;
