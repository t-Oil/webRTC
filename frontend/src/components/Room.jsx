import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";
import MicrophoneButton from "./MicrophoneButton";
import CameraButton from "./CameraButton";

const socket = io.connect("http://localhost:5555");

function Room() {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const myVideo = useRef(null);
  const userVideo = useRef(null);
  const connectionRef = useRef();
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
  const [isCameraOn, setIsWebcamOn] = useState(true);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);

        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error(
          "Error cannot access you camera and/or microphone:",
          error
        );
      });

    socket.on("me", (id) => setMe(id));

    socket.on("joinRoom", (data) => {
      setCaller(data.from);
      setCallerSignal(data.signal);
    });
  }, []);

  const joinRoom = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("joinRoom", {
        userToCall: id,
        signalData: data,
        from: me,
      });
    });
    peer.on("stream", (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  useEffect(() => {
    if (!callerSignal || !caller) return;

    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  }, [callerSignal, caller, stream]);

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  const toggleMicrophone = () => {
    const stream = myVideo.current.srcObject;
    const audioTracks = stream.getAudioTracks();

    audioTracks.forEach((track) => {
      track.enabled = !track.enabled;
      setIsMicrophoneOn(track.enabled);
    });
  };

  const toggleCamera = () => {
    const stream = myVideo.current.srcObject;
    const videoTracks = stream.getVideoTracks();

    videoTracks.forEach((track) => {
      track.enabled = !track.enabled;
      setIsWebcamOn(track.enabled);
    });
  };

  return (
    <>
      <h3 className="head-title">WebRTC</h3>
      <div className="container">
        {stream && (
          <div className="main-block">
            <span className="sub-title">ID : {me}</span>
            <div className="vdo-block">
              <div className="vdo-main">
                {stream && (
                  <video
                    playsInline
                    muted
                    ref={myVideo}
                    autoPlay
                    className="vdo-main"
                  />
                )}
                {callAccepted && !callEnded && (
                  <div className="vdo-join-block">
                    <video
                      playsInline
                      ref={userVideo}
                      autoPlay
                      className="vdo-join"
                    />
                  </div>
                )}
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 10,
                  width: "100%",
                  margin: "0 auto",
                }}
              >
                <CameraButton
                  isCameraOn={isCameraOn}
                  toggleCamera={toggleCamera}
                />
                <MicrophoneButton
                  isMicrophoneOn={isMicrophoneOn}
                  toggleMicrophone={toggleMicrophone}
                />
              </div>
            </div>
          </div>
        )}
        <div className="form-block">
          {callAccepted && !callEnded ? (
            <button onClick={leaveCall} className="end-button">
              End Call
            </button>
          ) : (
            <>
              <input
                id="filled-basic"
                placeholder="Call ID"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
              />
              <button
                onClick={() => joinRoom(idToCall)}
                className="join-button"
              >
                Join
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Room;
