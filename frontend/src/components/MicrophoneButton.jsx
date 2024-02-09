const MicrophoneButton = (props) => {
  const { toggleMicrophone, isMicrophoneOn } = props;

  return (
    <button
      onClick={toggleMicrophone}
      className="toggle-button microphone-button"
    >
      {isMicrophoneOn ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-mic-fill"
          viewBox="0 0 16 16"
          id="IconChangeColor"
        >
          {" "}
          <path
            d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"
            id="mainIconPathAttribute"
          ></path>{" "}
          <path
            d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"
            id="mainIconPathAttribute"
          ></path>{" "}
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          id="IconChangeColor"
          height="30"
          width="30"
        >
          {" "}
          <g>
            {" "}
            <path
              fill="none"
              d="M0 0h24v24H0z"
              id="mainIconPathAttribute"
            ></path>{" "}
            <path
              d="M16.425 17.839A8.941 8.941 0 0 1 13 18.945V23h-2v-4.055A9.004 9.004 0 0 1 3.055 11H5.07a7.002 7.002 0 0 0 9.87 5.354l-1.551-1.55A5 5 0 0 1 7 10V8.414L1.393 2.808l1.415-1.415 19.799 19.8-1.415 1.414-4.767-4.768zm2.95-2.679l-1.443-1.442c.509-.81.856-1.73.997-2.718h2.016a8.95 8.95 0 0 1-1.57 4.16zm-2.91-2.909l-8.78-8.78A5 5 0 0 1 17 6l.001 4a4.98 4.98 0 0 1-.534 2.251z"
              id="mainIconPathAttribute"
            ></path>{" "}
          </g>{" "}
        </svg>
      )}
    </button>
  );
};

export default MicrophoneButton;
