export default function TestPage() {
  return (
    <div>
      <video width="600" controls autoPlay loop muted>
        <source src="/background-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}