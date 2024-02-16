import { useRef, useEffect } from "react"

function App() {

  const videoRef = useRef(null)
  const photoRef = useRef(null)

  const getUserCamera = () => {
    navigator.mediaDevices.getUserMedia({
      video: true,
    })
      .then((stream) => {
        let video = videoRef.current
        video.srcObject = stream
        video.play()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const takePicture = () => {
    let width = 500
    let height = width / (16 / 9)
    let photo = photoRef.current
    let video = videoRef.current

    photo.width = width
    photo.height = height

    let context = photo.getContext("2d")
    context.drawImage(video, 0, 0, photo.width, photo.height)
  }

  const clearImage = () => {
    let photo = photoRef.current

    let context = photo.getContext("2d")
    context.clearRect(0, 0, photo.width, photo.height)
  }

  useEffect(() => {
    getUserCamera()
  }, [videoRef])


  return (
    <div className="container">
      <h1>Web cam app in react.js</h1>
      <video ref={videoRef}></video>
      <button onClick={takePicture}>Take a Photo</button>
      <canvas ref={photoRef}></canvas>
      <button className="clear-btn" onClick={clearImage}>Clear Image</button>
    </div>
  )
}

export default App